
'use strict'

const File = require('../modules/file.js')
const mock = require('mock-fs')


describe('uploadFile()', () => {

	beforeEach(async() => {
		mock({
			'test/directory': 'file.docx'
		})
	})

	afterEach(async() => {
		afterEach(mock.restore)
	})

	test('processed upload', async done => {
		expect.assertions(1)
		const file = await new File()
		const save = await file.uploadFile('test/directory', 'file.docx', 'user')
		expect(save).toBe(true)
		done()
	})

	test('error if empty path', async done => {
		expect.assertions(1)
		const file = await new File()
		await expect( file.uploadFile('', 'file.docx', 'user') )
			.rejects.toEqual( Error('file must have a path') )
		done()
	})

	test('error if undefined path', async done => {
		expect.assertions(1)
		const file = await new File()
		await expect( file.uploadFile(undefined, 'file.docx', 'user') )
			.rejects.toEqual( Error('file must have a path') )
		done()
	})

	test('error if null path', async done => {
		expect.assertions(1)
		const file = await new File()
		await expect( file.uploadFile(undefined, 'file.docx', 'user') )
			.rejects.toEqual( Error('file must have a path') )
		done()
	})

	test('error if empty filename', async done => {
		expect.assertions(1)
		const file = await new File()
		await expect( file.uploadFile('test/directory', '', 'user') )
			.rejects.toEqual( Error('file must have a filename') )
		done()
	})

	test('error if undefined filename', async done => {
		expect.assertions(1)
		const file = await new File()
		await expect( file.uploadFile('test/directory', undefined, 'user') )
			.rejects.toEqual( Error('file must have a filename') )
		done()
	})

	test('error if null filename', async done => {
		expect.assertions(1)
		const file = await new File()
		await expect( file.uploadFile('test/directory', undefined, 'user') )
			.rejects.toEqual( Error('file must have a filename') )
		done()
	})

	test('error if empty user', async done => {
		expect.assertions(1)
		const file = await new File()
		await expect( file.uploadFile('test/directory', 'file.docx', '') )
			.rejects.toEqual( Error('file must have a user') )
		done()
	})

	test('error if undefined user', async done => {
		expect.assertions(1)
		const file = await new File()
		await expect( file.uploadFile('test/directory', 'file.docx', undefined) )
			.rejects.toEqual( Error('file must have a user') )
		done()
	})

	test('error if null user', async done => {
		expect.assertions(1)
		const file = await new File()
		await expect( file.uploadFile('test/directory', 'file.docx', undefined) )
			.rejects.toEqual( Error('file must have a user') )
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

	test('error if non-existant user', async done => {
		expect.assertions(1)
		const file = await new File()
		await expect( file.downloadFile('file.docx','fakeuser') )
			.rejects.toEqual( Error('file doesnt exist') )
		done()
	})

	test('error if undefined user', async done => {
		expect.assertions(1)
		const file = await new File()
		await expect( file.downloadFile('file.docx',undefined) )
			.rejects.toEqual( Error('file must have a user') )
		done()
	})

	test('error if null user', async done => {
		expect.assertions(1)
		const file = await new File()
		await expect( file.downloadFile('file.docx',null) )
			.rejects.toEqual( Error('file must have a user') )
		done()
	})

	test('error if empty user', async done => {
		expect.assertions(1)
		const file = await new File()
		await expect( file.downloadFile('file.docx','') )
			.rejects.toEqual( Error('file must have a user') )
		done()
	})


	test('error if non-existant file', async done => {
		expect.assertions(1)
		const file = await new File()
		await expect( file.downloadFile('fakefile.docx','user') )
			.rejects.toEqual( Error('file doesnt exist') )
		done()
	})

	test('error if undefined file', async done => {
		expect.assertions(1)
		const file = await new File()
		await expect( file.downloadFile(undefined,'user') )
			.rejects.toEqual( Error('file must have a filename') )
		done()
	})

	test('error if null file', async done => {
		expect.assertions(1)
		const file = await new File()
		await expect( file.downloadFile(null,'user') )
			.rejects.toEqual( Error('file must have a filename') )
		done()
	})


	test('error if empty file', async done => {
		expect.assertions(1)
		const file = await new File()
		await expect( file.downloadFile('','user') )
			.rejects.toEqual( Error('file must have a filename') )
		done()
	})

	test('error if completely incorrect file and user', async done => {
		expect.assertions(1)
		const file = await new File()
		await expect( file.downloadFile('nofile.void','voiduser') )
			.rejects.toEqual( Error('file doesnt exist') )
		done()
	})
})
