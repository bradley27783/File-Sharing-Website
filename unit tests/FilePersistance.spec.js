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
})
