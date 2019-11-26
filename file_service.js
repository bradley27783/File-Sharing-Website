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

router.get('/email/:user/:filename', async ctx => {
	try {
		if(ctx.session.authorised !== true) return ctx.redirect('/login?msg=you need to log in')

		const user = ctx.params.user
		const filename = ctx.params.filename

		await ctx.render('email', {user: user, file: filename})
	} catch (err) {
		await ctx.render('error', {message: err.message})
	}
})

router.post('/sendemail/:user/:filename', koaBody, async ctx => {
	try {
		if(ctx.session.authorised !== true) return ctx.redirect('/login?msg=you need to log in')
		const toEmail = ctx.request.body.email

		const url = ctx.request.origin
		const user = ctx.params.user
		const filename = ctx.params.filename
		const link = `${url}/download/${user}/${filename}`

		const emailControl = await new EmailController()
		emailControl.sendEmail(email,pass,toEmail,`Shared File from ${user}`,`Click the link to download: ${link}`)

		await ctx.redirect('/', {success: `File successfully sent to ${toEmail}`})
	} catch (err) {
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
		ctx.redirect('/')
	} catch(err) {
		await ctx.render('error', {message: err.message})
	}
})

cron.schedule('0,30 * * * *', async() => {
	const persist = await new FilePersistance(dbname)
	const data = await persist.deleteStaleFiles(timepassed)
	if (data[0] !== undefined || data.length !== 0) {
		data.forEach(async file => {
			await new FileController().deleteFile(file.directory)
		})
	}
})

app.use(router.routes())
module.exports = app.listen(port, async() => console.log(`listening on port ${port}`))
