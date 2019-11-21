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

describe('deleteStaleFile()', () => {

	test('throw error if time passed is negative - large number', async done => {
		expect.assertions(1)

		const persist = await new FilePersistance()
		const timepassed = -9241212

		await expect( persist.deleteStaleFiles(timepassed) )
			.rejects.toEqual( Error('Invalid time passed') )
		done()
	})

	test('throw error if time passed is negative - edge case', async done => {
		expect.assertions(1)

		const persist = await new FilePersistance()
		const timepassed = -1

		await expect( persist.deleteStaleFiles(timepassed) )
			.rejects.toEqual( Error('Invalid time passed') )
		done()
	})

	test('successfully delete file', async done => {
		expect.assertions(1)

		const persist = await new FilePersistance()
		const file = await persist.writeFile('test.jpeg', 'user', 1000, 'image/jpeg')
		const timepassed = 0

		await persist.deleteStaleFiles(timepassed)

		await expect( persist.readFile(file.getHashedName(),file.getUser()) )
			.rejects.toEqual( Error('File does not exist') )
		done()
	})

	test('successfully run but dont delete', async done => {
		expect.assertions(1)

		const persist = await new FilePersistance()
		const file = await persist.writeFile('test.jpeg', 'user', 1000, 'image/jpeg')
		const timepassed = 259200 // <- 3 Days in seconds

		await persist.deleteStaleFiles(timepassed)

		await expect( persist.readFile(file.getHashedName(),file.getUser()) )
			.resolves.toMatchObject( {directory: 'files/user/test.jpeg'} )
		done()
	})
})

describe('readAllFiles()', () => {

	test('correctly get 3 objects', async done => {
		expect.assertions(1)

		const persist = await new FilePersistance()
		await persist.writeFile('test1.jpeg', 'user', 1000, 'image/jpeg')
		await persist.writeFile('test2.jpeg', 'user', 1000, 'image/jpeg')
		await persist.writeFile('test3.jpeg', 'user', 1000, 'image/jpeg')

		await expect(persist.readAllFiles('user'))
			.resolves.toHaveLength(3)
		done()
	})

	test('throw error if user has no files', async done => {
		expect.assertions(1)

		const persist = await new FilePersistance()

		await expect(persist.readAllFiles('user'))
			.rejects.toEqual( Error('You have no files') )
		done()
	})
})
