
'use strict'

const File = require('../modules/file.js')
const mock = require('mock-fs')


describe('upload()', () => {

    beforeEach(async () => {
        mock({
            'test/directory':'file.docx'
        })
    })

    afterEach(async () => {
        afterEach(mock.restore)
    })

	test('processed upload', async done => {
        expect.assertions(1)
		const file = await new File()
		const upload = await file.upload('test/directory', 'file.docx', 'user')
		expect(upload).toBe(true)
		done()
	})

	test('error if empty path', async done => {
		expect.assertions(1)
		const file = await new File()
        await expect( file.upload('', 'file.docx', 'user') )
			.rejects.toEqual( Error('file must have a path') )
		done()
    })
    
    test('error if undefined path', async done => {
		expect.assertions(1)
		const file = await new File()
        await expect( file.upload(undefined, 'file.docx', 'user') )
			.rejects.toEqual( Error('file must have a path') )
		done()
	})

	test('error if empty filename', async done => {
		expect.assertions(1)
		const file = await new File()
        await expect( file.upload('test/directory', '', 'user') )
			.rejects.toEqual( Error('file must have a filename') )
		done()
    })
    
    test('error if undefined filename', async done => {
		expect.assertions(1)
		const file = await new File()
        await expect( file.upload('test/directory', undefined, 'user') )
			.rejects.toEqual( Error('file must have a filename') )
		done()
    })
    
    test('error if empty user', async done => {
		expect.assertions(1)
		const file = await new File()
        await expect( file.upload('test/directory', 'file.docx', '') )
			.rejects.toEqual( Error('file must have a user') )
		done()
    })
    
    test('error if undefined user', async done => {
		expect.assertions(1)
		const file = await new File()
        await expect( file.upload('test/directory', 'file.docx', undefined) )
			.rejects.toEqual( Error('file must have a user') )
		done()
	})

})
