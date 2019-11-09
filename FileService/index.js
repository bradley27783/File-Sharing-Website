#!/usr/bin/env node

//Routes File

'use strict'

/* MODULE IMPORTS */
const Koa = require('koa');
const Router = require('koa-router')
const views = require('koa-views')
const staticDir = require('koa-static')
const bodyParser = require('koa-bodyparser')
const koaBody = require('koa-body')({multipart: true, uploadDir: '.'})
const session = require('koa-session')
//const jimp = require('jimp')

/* IMPORT CUSTOM MODULES */
const File = require('./modules/file')



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
const dbName = 'website.db'	

/**
 * The secure home page.
 *
 * @name Home Page
 * @route {GET} /
 * @authentication This route requires cookie-based authentication.
 */
router.get('/', async ctx => {
	try {
		//Sets authorised to true and username for testing
		ctx.session.authorised = true
		ctx.session.user = "test"
		await ctx.render('index')
	} catch(err) {
		await ctx.render('error', {message: err.message})
	}
})

/**
 * The user registration page.
 *
 * @name Register Page
 * @route {GET} /register
 */

router.get('/upload', async ctx => {
	try {
		if(ctx.session.authorised !== true) return ctx.redirect('/login?msg=you need to log in')
		await ctx.render('upload')
	} catch(err) {
		await ctx.render('error', {message: err.message})
	}
})


router.post('/upload',koaBody , async ctx => {
	try {
		// extract the user
		const user = ctx.session.user
		
		// call the functions in the module
		const file = await new File()	
		const {path,name} = ctx.request.files.upload
		await file.saveFile(path, name, user)
		// redirect to the home page
		ctx.redirect(`/`)
	} catch(err) {
		await ctx.render('error', {message: err.message})
	}
})

app.use(router.routes())
module.exports = app.listen(port, async() => console.log(`listening on port ${port}`))
