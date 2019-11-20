'use strict'

const FileController = require('../modules/FileController.js')
const mock = require('mock-fs')


describe('uploadFile()', () => {

	beforeEach(async() => {
		mock({
			'test/directory': 'file.jpeg'
		})
	})

	afterEach(async() => {
		afterEach(mock.restore)
	})

	test('processed upload', async done => {
		expect.assertions(1)
		const controller = await new FileController()

		const val = await controller.uploadFile('test/directory','file.jpeg','test',1000,'image/jpeg')

		expect(val).toBe(true)
		done()
	})

	test('error if empty source path', async done => {
		expect.assertions(1)
		const control = await new FileController()
		await expect( control.uploadFile('','file.jpeg','test',1000,'image/jpeg'))
			.rejects.toEqual( Error('Could not locate uploaded files source path') )
		done()
	})

	test('error if undefined source path', async done => {
		expect.assertions(1)
		const control = await new FileController()
		await expect( control.uploadFile(undefined,'file.jpeg','test',1000,'image/jpeg') )
			.rejects.toEqual( Error('Could not locate uploaded files source path') )
		done()
	})

	test('error if null source path', async done => {
		expect.assertions(1)
		const control = await new FileController()
		await expect( control.uploadFile(null,'file.jpeg','test',1000,'image/jpeg') )
			.rejects.toEqual( Error('Could not locate uploaded files source path') )
		done()
	})
})

describe('downloadFile()', () => {

	beforeEach(async() => {
		mock({
			'files/user/file.docx': 'File content'
		})
	})

	afterEach(async() => {
		afterEach(mock.restore)
	})

	test('processed download', async done => {
		expect.assertions(1)
		const control = await new FileController()

		/** Checking if i recieved an readstream object and the
		 * one by checking the object for the path i passed
		*/
		await expect( control.downloadFile('files/user/file.docx') )
			.resolves.toMatchObject( {'path': 'files/user/file.docx'} )
		done()
	})

	test('expect error if directory does not exist', async done => {
		expect.assertions(1)
		const control = await new FileController()
		await expect( control.downloadFile('fake/dir/file.docx') )
			.rejects.toEqual( Error('unable to locate file') )
		done()
	})

	test('expect error if file does not exist', async done => {
		expect.assertions(1)
		const control = await new FileController()
		await expect( control.downloadFile('files/user/fakefile.docx') )
			.rejects.toEqual( Error('unable to locate file') )
		done()
	})
})
