#!/usr/bin/env node

//Routes File

'use strict'

/* MODULE IMPORTS */
const Koa = require('koa')
const Router = require('koa-router')
const views = require('koa-views')
const staticDir = require('koa-static')
const bodyParser = require('koa-bodyparser')
const koaBody = require('koa-body')({multipart: true, uploadDir: '.'})
const session = require('koa-session')
const cron = require('node-cron')

/* IMPORT CUSTOM MODULES */
const FileController = require('./modules/FileController')
const FilePersistance = require('./modules/FilePersistance')
const EmailController = require('./modules/EmailController')


const app = new Koa()
const router = new Router()

/* CONFIGURING THE MIDDLEWARE */
app.keys = ['darkSecret']
app.use(staticDir('public'))
app.use(bodyParser())
app.use(session(app))
app.use(views(`${__dirname}/views`, { extension: 'handlebars' }, {map: { handlebars: 'handlebars' }}))

const defaultPort = 8080
const port = process.env.PORT || defaultPort
const dbname = 'file.db'
const timepassed = 259200 // <- 3 Days in seconds
const maxDays = 3
const email = 'harri361340ctwork@gmail.com'
const pass = 'a@auy&&Azz>X?;;aa'

/**
 * The secure home page.
 *
 * @name Home Page
 * @route {GET} /
 * @authentication This route requires cookie-based authentication.
 */
router.get('/', koaBody, async ctx => {
	try {
		//Sets authorised to true and username for testing
		ctx.session.authorised = true
		ctx.session.user = 'test'

		const control = await new FileController()
		const persist = await new FilePersistance(dbname)
		let files = await persist.readAllFiles(ctx.session.user)
		const currentDate = new Date()
		files = control.listFiles(files,currentDate,maxDays)

		await ctx.render('index', {'files': files})
	} catch(err) {
		await ctx.render('error', {message: err.message})
	}
})

app.use(router.routes())
module.exports = app.listen(port, async() => console.log(`listening on port ${port}`))
