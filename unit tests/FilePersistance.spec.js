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
