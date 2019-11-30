'use strict'

const puppeteer = require('puppeteer')
const PuppeteerHar = require('puppeteer-har')
const shell = require('shelljs')

const width = 800
const height = 600
const delayMS =50

let browser
let page
let har

beforeAll( async() => {
	browser = await puppeteer.launch({ headless: true, slowMo: delayMS, args: [`--window-size=${width},${height}`] })
	page = await browser.newPage()
	har = new PuppeteerHar(page)
	await page.setViewport({ width, height })
	await shell.exec('acceptanceTests/scripts/beforeAll.sh')
})

afterAll( async() => {
	browser.close()
	await shell.exec('acceptanceTests/scripts/afterAll.sh')
})

beforeEach(async() => {
	await shell.exec('acceptanceTests/scripts/beforeEach.sh')
})

describe('Downloading', () => {
	test('downloading a file', async done => {
		//ARRANGE
		await page.goto('http://localhost:8080/register', { timeout: 30000, waitUntil: 'load' })
		//ACT
		await page.type('input[name=user]', 'NewUser')
		await page.type('input[name=pass]', 'password')
		await page.click('input[type=submit]')
		await page.goto('http://localhost:8080/login', { timeout: 30000, waitUntil: 'load' })
		await page.type('input[name=user]', 'NewUser')
		await page.type('input[name=pass]', 'password')
		await page.click('input[type=submit]')
		await page.click('#upload')
		const input = await page.$('input[name=upload]')
		await input.uploadFile('/home/student/Downloads/sample files/image.jpeg')
		await page.click('input[type=submit]')
		await page.goto('http://localhost:8080/', { timeout: 30000, waitUntil: 'load' })
		await page.click('.download')
		//ASSERT
		await page.waitForSelector('h1')
		expect( await page.evaluate( () => document.querySelector('h1').innerText ) )
			.toBe('Home')

		done()
	}, 16000)
})
