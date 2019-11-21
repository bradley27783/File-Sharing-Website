'use strict'

const FilePersistance = require('../modules/FilePersistance.js')

describe('writeFile()', () => {

	test('successfully write file', async done => {
		expect.assertions(1)
		const persist = await new FilePersistance()

		const val = await persist.writeFile('test.jpeg', 'user', 1000, 'image/jpeg')
		expect(val).toMatchObject({'filename': 'test.jpeg'})
		done()
	})

	test('throw error if file already exists', async done => {
		expect.assertions(1)
		const persist = await new FilePersistance()

		await persist.writeFile('test.jpeg', 'user', 1000, 'image/jpeg')

		await expect( persist.writeFile('test.jpeg','user',1000,'image/jpeg') )
			.rejects.toEqual( Error('File already exists') )
		done()
	})
})

describe('readFile()', () => {

	test('successfully read file', async done => {
		expect.assertions(1)

		const persist = await new FilePersistance()

		const file = await persist.writeFile('test.jpeg', 'user', 1000, 'image/jpeg')

		await expect( persist.readFile(file.getHashedName(),'user') )
			.resolves.toMatchObject( {'directory': 'files/user/test.jpeg'} )
		done()
	})

	test('throw error if file does not exists', async done => {
		expect.assertions(1)

		const persist = await new FilePersistance()
		await persist.writeFile('test.jpeg','user',1000,'image/jpeg')

		await expect( persist.readFile('files/user/fake.jpeg','user') )
			.rejects.toEqual( Error('File does not exist') )
		done()
	})
})

describe('deleteFile()', () => {

	test('successfully delete file', async done => {
		expect.assertions(1)

		const persist = await new FilePersistance()
		const file = await persist.writeFile('test.jpeg', 'user', 1000, 'image/jpeg')
		const data = await persist.readFile(file.getHashedName(),file.getUser())

		await persist.deleteFile(data.id)

		await expect( persist.readFile(file.getFilename(),file.getUser()) )
			.rejects.toEqual( Error('File does not exist') )
		done()
	})

	test('throw error if file does not exists', async done => {
		expect.assertions(1)

		const persist = await new FilePersistance()

		await expect( persist.deleteFile(1) )
			.rejects.toEqual( Error('File does not exist') )
		done()
	})
})
