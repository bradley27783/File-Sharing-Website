
'use strict'

const File = require('../modules/file.js')
const mock = require('mock-fs')

describe('setFilename()', () => {

	test('throw error if filename undefined', async done => {
		expect.assertions(1)
		try {
			const file = await new File()
			file.setFilename(undefined)
			done.fail()
		} catch (err) {
			expect(err.message).toBe('file must have a filename')
		} finally {
			done()
		}
	})

	test('throw error if filename null', async done => {
		expect.assertions(1)
		try {
			const file = await new File()
			file.setFilename(null)
			done.fail()
		} catch (err) {
			expect(err.message).toBe('file must have a filename')
		} finally {
			done()
		}
	})

	test('throw error if filename empty', async done => {
		expect.assertions(1)
		try {
			const file = await new File()
			file.setFilename('')
			done.fail()
		} catch (err) {
			expect(err.message).toBe('file must have a filename')
		} finally {
			done()
		}
	})
})

describe('setUser()', () => {

	test('throw error if user undefined', async done => {
		expect.assertions(1)
		try {
			const file = await new File()
			file.setUser(undefined)
			done.fail()
		} catch (err) {
			expect(err.message).toBe('file must have a user')
		} finally {
			done()
		}
	})

	test('throw error if user null', async done => {
		expect.assertions(1)
		try {
			const file = await new File()
			file.setUser(null)
			done.fail()
		} catch (err) {
			expect(err.message).toBe('file must have a user')
		} finally {
			done()
		}
	})

	test('throw error if user empty', async done => {
		expect.assertions(1)
		try {
			const file = await new File()
			file.setUser('')
			done.fail()
		} catch (err) {
			expect(err.message).toBe('file must have a user')
		} finally {
			done()
		}
	})
})

describe('setFilesize()', () => {

	test('throw error if filesize undefined', async done => {
		expect.assertions(1)
		try {
			const file = await new File()
			file.setFilesize(undefined)
			done.fail()
		} catch (err) {
			expect(err.message).toBe('file must have a filesize')
		} finally {
			done()
		}
	})

	test('throw error if filesize null', async done => {
		expect.assertions(1)
		try {
			const file = await new File()
			file.setFilename(null)
			done.fail()
		} catch (err) {
			expect(err.message).toBe('file must have a filename')
		} finally {
			done()
		}
	})

	test('throw error if filesize empty', async done => {
		expect.assertions(1)
		try {
			const file = await new File()
			file.setFilesize(0)
			done.fail()
		} catch (err) {
			expect(err.message).toBe('file must have a filesize')
		} finally {
			done()
		}
	})
})

describe('setFiletype()', () => {

	test('throw error if filetype undefined', async done => {
		expect.assertions(1)
		try {
			const file = await new File()
			file.setFiletype(undefined)
			done.fail()
		} catch (err) {
			expect(err.message).toBe('file must have a filetype')
		} finally {
			done()
		}
	})

	test('throw error if filetype null', async done => {
		expect.assertions(1)
		try {
			const file = await new File()
			file.setFiletype(null)
			done.fail()
		} catch (err) {
			expect(err.message).toBe('file must have a filetype')
		} finally {
			done()
		}
	})

	test('throw error if filetype empty', async done => {
		expect.assertions(1)
		try {
			const file = await new File()
			file.setFiletype('')
			done.fail()
		} catch (err) {
			expect(err.message).toBe('file must have a filetype')
		} finally {
			done()
		}
	})
})

describe('setDirectory()', () => {

	test('expect to create correct directory', async done => {
		expect.assertions(1)
		try {
			const file = await new File()
			file.setFilename('test.jpeg')
			file.setUser('user')
			file.setDirectory()
			expect(file.path).toBe('files/user/test.jpeg')
		} catch (err) {
			done.fail('test failed')
		} finally {
			done()
		}
	})
})


describe('getFilename()', () => {

	test('throw error if filename undefined', async done => {
		expect.assertions(1)
		try {
			const file = await new File()
			file.filename = undefined
			file.getFilename()
			done.fail()
		} catch (err) {
			expect(err.message).toBe('file does not have a filename')
		} finally {
			done()
		}
	})

	test('throw error if filename null', async done => {
		expect.assertions(1)
		try {
			const file = await new File()
			file.filename = null
			file.getFilename()
			done.fail()
		} catch (err) {
			expect(err.message).toBe('file does not have a filename')
		} finally {
			done()
		}
	})

	test('throw error if filename empty', async done => {
		expect.assertions(1)
		try {
			const file = await new File()
			file.filename = ''
			file.getFilename()
			done.fail()
		} catch (err) {
			expect(err.message).toBe('file does not have a filename')
		} finally {
			done()
		}
	})

	test('return correct filename', async done => {
		expect.assertions(1)
		try {
			const file = await new File()
			file.setFilename('test.jpeg')

			expect(file.getFilename()).toEqual('test.jpeg')
		} catch (err) {
			done.fail()
		} finally {
			done()
		}
	})
})

describe('getUser()', () => {

	test('throw error if user undefined', async done => {
		expect.assertions(1)
		try {
			const file = await new File()
			file.user = undefined
			file.getUser()
			done.fail()
		} catch (err) {
			expect(err.message).toBe('file does not have a user')
		} finally {
			done()
		}
	})

	test('throw error if user null', async done => {
		expect.assertions(1)
		try {
			const file = await new File()
			file.user = null
			file.getUser()
			done.fail()
		} catch (err) {
			expect(err.message).toBe('file does not have a user')
		} finally {
			done()
		}
	})

	test('throw error if user empty', async done => {
		expect.assertions(1)
		try {
			const file = await new File()
			file.user = ''
			file.getUser()
			done.fail()
		} catch (err) {
			expect(err.message).toBe('file does not have a user')
		} finally {
			done()
		}
	})

	test('return correct user', async done => {
		expect.assertions(1)
		try {
			const file = await new File()
			file.setUser('user')

			expect(file.getUser()).toEqual('user')
		} catch (err) {
			done.fail()
		} finally {
			done()
		}
	})
})

describe('getFilesize()', () => {

	test('throw error if filesize undefined', async done => {
		expect.assertions(1)
		try {
			const file = await new File()
			file.filesize = undefined
			file.getFilesize()
			done.fail()
		} catch (err) {
			expect(err.message).toBe('file does not have a filesize')
		} finally {
			done()
		}
	})

	test('throw error if filesize null', async done => {
		expect.assertions(1)
		try {
			const file = await new File()
			file.filesize = null
			file.getFilesize()
			done.fail()
		} catch (err) {
			expect(err.message).toBe('file does not have a filesize')
		} finally {
			done()
		}
	})

	test('throw error if filesize empty', async done => {
		expect.assertions(1)
		try {
			const file = await new File()
			file.filesize = 0
			file.getFilesize()
			done.fail()
		} catch (err) {
			expect(err.message).toBe('file does not have a filesize')
		} finally {
			done()
		}
	})

	test('return correct filesize', async done => {
		expect.assertions(1)
		try {
			const file = await new File()
			file.setFilesize(1000)

			expect(file.getFilesize()).toEqual(1000)
		} catch (err) {
			done.fail()
		} finally {
			done()
		}
	})
})


describe('getFiletype()', () => {

	test('throw error if filetype undefined', async done => {
		expect.assertions(1)
		try {
			const file = await new File()
			file.filetype = undefined
			file.getFiletype()
			done.fail()
		} catch (err) {
			expect(err.message).toBe('file does not have a filetype')
		} finally {
			done()
		}
	})

	test('throw error if filetype null', async done => {
		expect.assertions(1)
		try {
			const file = await new File()
			file.filetype = null
			file.getFiletype()
			done.fail()
		} catch (err) {
			expect(err.message).toBe('file does not have a filetype')
		} finally {
			done()
		}
	})

	test('throw error if filetype empty', async done => {
		expect.assertions(1)
		try {
			const file = await new File()
			file.filetype = ''
			file.getFiletype()
			done.fail()
		} catch (err) {
			expect(err.message).toBe('file does not have a filetype')
		} finally {
			done()
		}
	})

	test('return correct filetype', async done => {
		expect.assertions(1)
		try {
			const file = await new File()
			file.setFiletype('image/jpeg')

			expect(file.getFiletype()).toEqual('image/jpeg')
		} catch (err) {
			done.fail()
		} finally {
			done()
		}
	})
})

describe('getTimestamp()', () => {

	test('throw error if timestamp undefined', async done => {
		expect.assertions(1)
		try {
			const file = await new File()
			file.timestamp = undefined
			file.getTimestamp()
			done.fail()
		} catch (err) {
			expect(err.message).toBe('file does not have a timestamp')
		} finally {
			done()
		}
	})

	test('throw error if timestamp null', async done => {
		expect.assertions(1)
		try {
			const file = await new File()
			file.timestamp = null
			file.getTimestamp()
			done.fail()
		} catch (err) {
			expect(err.message).toBe('file does not have a timestamp')
		} finally {
			done()
		}
	})

	test('throw error if timestamp empty', async done => {
		expect.assertions(1)
		try {
			const file = await new File()
			file.timestamp = ''
			file.getTimestamp()
			done.fail()
		} catch (err) {
			expect(err.message).toBe('file does not have a timestamp')
		} finally {
			done()
		}
	})

	test('return correct timestamp', async done => {
		expect.assertions(1)
		try {
			const file = await new File()
			file.setTimestamp()
			const date = new Date()
			const checkDate = `${date.getUTCDate()}/${date.getUTCMonth()+1}/${date.getUTCFullYear()}`

			expect(file.getTimestamp()).toEqual(checkDate)
		} catch (err) {
			done.fail()
		} finally {
			done()
		}
	})
})

describe('getDirectory()', () => {

	test('throw error if path undefined', async done => {
		expect.assertions(1)
		try {
			const file = await new File()
			file.path = undefined
			file.getDirectory()
			done.fail()
		} catch (err) {
			expect(err.message).toBe('file does not have a path')
		} finally {
			done()
		}
	})

	test('throw error if path null', async done => {
		expect.assertions(1)
		try {
			const file = await new File()
			file.path = null
			file.getDirectory()
			done.fail()
		} catch (err) {
			expect(err.message).toBe('file does not have a path')
		} finally {
			done()
		}
	})

	test('throw error if path empty', async done => {
		expect.assertions(1)
		try {
			const file = await new File()
			file.path = ''
			file.getDirectory()
			done.fail()
		} catch (err) {
			expect(err.message).toBe('file does not have a path')
		} finally {
			done()
		}
	})

	test('return correct path', async done => {
		expect.assertions(1)
		try {
			const file = await new File()
			file.setFilename('test.jpeg')
			file.setUser('user')
			file.setDirectory()

			expect(file.getDirectory()).toEqual('files/user/test.jpeg')
		} catch (err) {
			done.fail()
		} finally {
			done()
		}
	})
})

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
