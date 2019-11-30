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
//const jimp = require('jimp')

/* IMPORT CUSTOM MODULES */
const User = require('./modules/user')
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
const dbName = 'website.db'
const filedb = 'file.db'
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
router.get('/', async ctx => {
	try {
		if(ctx.session.authorised !== true) return ctx.redirect('/login?msg=you need to log in')
		const data = {}
		if(ctx.query.msg) data.msg = ctx.query.msg

		const persist = await new FilePersistance(filedb)
		const files = await persist.listFiles(ctx.session.user,maxDays)

		await ctx.render('index', {'files': files})
	} catch(err) {
		await ctx.render('index', {msg: err.message})
	}
})

/**
 * The user registration page.
 *
 * @name Register Page
 * @route {GET} /register
 */
router.get('/register', async ctx => await ctx.render('register'))

/**
 * The script to process new user registrations.
 *
 * @name Register Script
 * @route {POST} /register
 */
router.post('/register', koaBody, async ctx => {
	try {
		// extract the data from the request
		const body = ctx.request.body
		console.log(body)
		// call the functions in the module
		const user = await new User(dbName)
		await user.register(body.user, body.pass)

		// redirect to the home page
		ctx.redirect(`/?msg=new user "${body.name}" added`)
	} catch(err) {
		await ctx.render('error', {message: err.message})
	}
})

router.get('/login', async ctx => {
	const data = {}
	if(ctx.query.msg) data.msg = ctx.query.msg
	if(ctx.query.user) data.user = ctx.query.user
	await ctx.render('login', data)
})

router.post('/login', async ctx => {
	try {
		const body = ctx.request.body
		const user = await new User(dbName)
		await user.login(body.user, body.pass)
		ctx.session.authorised = true
		ctx.session.user = body.user
		return ctx.redirect('/?msg=you are now logged in...')
	} catch(err) {
		await ctx.render('error', {message: err.message})
	}
})

router.get('/logout', async ctx => {
	ctx.session.authorised = null
	ctx.redirect('/?msg=you are now logged out')
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

		const persist = await new FilePersistance(filedb)
		const data = await persist.readFile(filename,user)
		//Set body header and attachment to the file to force download
		ctx.body = await persist.downloadFile(data.directory)
		//await control.deleteFile(data.directory)
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
		let sharedUser = ctx.request.body.user
		// call the functions in the module
		const {path,name,size,type} = ctx.request.files.upload

		const persist = await new FilePersistance(filedb)
		const account = await new User(dbName)

		await persist.writeFile(path,name,user,size,type)
		sharedUser = await account.checkUser(sharedUser)
		await persist.writeSharedFile(path,name,sharedUser,size,type,user)
		ctx.redirect('/')
	} catch(err) {
		await ctx.render('error', {message: err.message})
	}
})

cron.schedule('* * * * * *', async() => {
	const persist = await new FilePersistance(filedb)
	//await persist.deleteStaleFiles(timepassed)
	await persist.deleteStaleFiles(60) //Done for screencast
})

app.use(router.routes())
module.exports = app.listen(port, async() => console.log(`listening on port ${port}`))
