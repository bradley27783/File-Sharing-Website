'use strict'

const FilePersistance = require('../modules/FilePersistance.js')
const File = require('../modules/file.js')

describe('writeFile()', () => {

	test('successfully write file', async done => {
		expect.assertions(1)
		const persist = await new FilePersistance()

		const val = await persist.writeFile('test.jpeg','user',1000,'image/jpeg')
		expect(val).toBe(true)
		done()
	})

	test('throw error if file already exists', async done => {
		expect.assertions(1)
		const persist = await new FilePersistance()

		await persist.writeFile('test.jpeg','user',1000,'image/jpeg')

		await expect( persist.writeFile('test.jpeg','user',1000,'image/jpeg') )
			.rejects.toEqual( Error('File already exists') )
		done()
	})
})

describe('readFile()', () => {

	test('successfully read file', async done => {
		expect.assertions(1)

		//ARRANGE
		const persist = await new FilePersistance()
		await persist.writeFile('test.jpeg','user',1000,'image/jpeg')

		//ASSERT
		await expect( await persist.readFile('files/user/test.jpeg') )
			.toMatchObject( {'directory': 'files/user/test.jpeg'} )
		done()
	})

	test('throw error if file does not exists', async done => {
		expect.assertions(1)

		const persist = await new FilePersistance()
		persist.writeFile('test.jpeg','user',1000,'image/jpeg')

		await expect( persist.readFile('files/user/test.jpeg') )
			.rejects.toEqual( Error('File does not exist') )
		done()
	})
})
