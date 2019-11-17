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
		const file = await new File()
		file.init('file.jpeg','test',1024,'image/jpeg')
		const save = await file.uploadFile('test/directory')
		expect(save).toBe(true)
		done()
	})

	test('error if empty source path', async done => {
		expect.assertions(1)
		const file = await new File()
		await expect( file.uploadFile(''))
			.rejects.toEqual( Error('Could not locate uploaded files source path') )
		done()
	})

	test('error if undefined source path', async done => {
		expect.assertions(1)
		const file = await new File()
		await expect( file.uploadFile(undefined) )
			.rejects.toEqual( Error('Could not locate uploaded files source path') )
		done()
	})

	test('error if null source path', async done => {
		expect.assertions(1)
		const file = await new File()
		await expect( file.uploadFile(null) )
			.rejects.toEqual( Error('Could not locate uploaded files source path') )
		done()
	})
})

/*describe('writeFile()', () => {

	test('error if null source path', async done => {
		expect.assertions(1)
		const file = await new File()
		await expect( file.uploadFile(null) )
			.rejects.toEqual( Error('Could not locate uploaded files source path') )
		done()
	})
})*/

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
		const file = await new File()
		await file.init('file.docx','user',2123,'filetype')
		/** Checking if i recieved an readstream object and the
		 * one by checking the object for the path i passed
		*/
		await expect( file.downloadFile() )
			.resolves.toMatchObject( {'path': 'files/user/file.docx'} )
		done()
	})

	/*test('fake download', async done => {
		expect.assertions(1)
		const file = await new File()
		await file.init('file.docx','fake',2123,'filetype')

		await expect( file.downloadFile() )
			.rejects.toEqual( Error('file doesnt exist') )
		done()
	})*/
})