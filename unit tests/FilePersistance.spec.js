'use strict'

const FilePersistance = require('../modules/FilePersistance.js')
const File = require('../modules/file.js')

describe('writeFile()', () => {

	test('successfully write file', async done => {
		expect.assertions(1)
		const persist = await new FilePersistance()

		const file = await new File()
		file.init('test.jpeg','user',1000,'image/jpeg')

		const write = await persist.writeFile(file)
		expect(write).toBe(true)
		done()
	})

	test('throw error if file already exists', async done => {
		expect.assertions(1)
		const persist = await new FilePersistance()

		const file = await new File()
		file.init('test.jpeg','user',1000,'image/jpeg')

		await persist.writeFile(file)

		await expect( persist.writeFile(file) )
			.rejects.toEqual( Error('File already exists') )
		done()
	})
})

describe('readFile()', () => {

	test('successfully read file', async done => {
		expect.assertions(1)

		//ARRANGE
		const persist = await new FilePersistance()
		const file = await new File()
		file.init('test.jpeg','user',1000,'image/jpeg')
		await persist.writeFile(file)
		const path = file.getDirectory()

		//ASSERT
		await expect( persist.readFile(path) )
			.resolve.toEqual( 'something' )
		done()
	})

	test('throw error if file does not exists', async done => {
		expect.assertions(1)

		//ARRANGE
		const persist = await new FilePersistance()
		const file = await new File()
		file.init('test.jpeg','user',1000,'image/jpeg')
		//await persist.writeFile(file)
		const path = file.getDirectory()

		//ASSERT
		await expect( persist.readFile(path) )
			.rejects.toEqual( Error('File does not exist') )
		done()
	})
})
