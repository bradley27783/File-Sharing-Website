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


/*describe('writeFile()', () => {

	test('error if null source path', async done => {
		expect.assertions(1)
		const file = await new File()
		await expect( file.uploadFile(null) )
			.rejects.toEqual( Error('Could not locate uploaded files source path') )
		done()
	})
})*/
