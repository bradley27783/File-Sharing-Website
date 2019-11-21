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

		await ctx.render('index', {test: '%242b%2410%24zTtZP%2FWJuxxpc04bgg7LreKqvYJC4dMDj43zxC.FcjhECoIaWWDpW'})
	} catch(err) {
		await ctx.render('error', {message: err.message})
	}
})

router.get('/download/:user/:filename', async ctx => {

	try {
		//Get parameters
		//Encode this because the hash in the db is url encoded
		const filename = encodeURIComponent(ctx.params.filename)
		const user = ctx.params.user
		const control = await new FileController()
		const persist = await new FilePersistance(dbname)
		const data = await persist.readFile(filename,user)
		//Set body header and attachment to the file to force download
		ctx.body = await control.downloadFile(data.directory)
		await control.deleteFile(data.directory)
		await persist.deleteFile(data.id)
		ctx.attachment(data.filename)

	} catch (err) {
		await ctx.render('error', {message: err.message})
	}
})

/**
 * The secure upload page.
 *
 * @name Upload Page
 * @route {GET} /upload
 * @authentication This route requires cookie-based authentication.
 */

router.get('/upload', async ctx => {
	try {
		if(ctx.session.authorised !== true) return ctx.redirect('/login?msg=you need to log in')
		await ctx.render('upload')
	} catch(err) {
		await ctx.render('error', {message: err.message})
	}
})


/**
 * The script to process a user uploading a file.
 *
 * @name Upload Scipt
 * @route {POST} /upload
 */

router.post('/upload', koaBody, async ctx => {
	try {
		// extract the user
		const user = ctx.session.user
		// call the functions in the module
		const {path,name,size,type} = ctx.request.files.upload

		const control = await new FileController()
		const persist = await new FilePersistance(dbname)

		await control.uploadFile(path,name,user,size,type)
		await persist.writeFile(name,user,size,type)

		// redirect to the home page
		ctx.redirect('/')
	} catch(err) {
		await ctx.render('error', {message: err.message})
	}
})

cron.schedule('29,59 * * * *', () => {
	console.log(new Date())
})

app.use(router.routes())
module.exports = app.listen(port, async() => console.log(`listening on port ${port}`))
