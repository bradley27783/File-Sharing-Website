'use strict'

const FileController = require('../modules/FileController.js')
const mock = require('mock-fs')

describe('deleteStaleFiles()', () => {

	beforeEach(async() => {
		mock({
			'files/user/file.docx': 'File content'
		})
	})

	afterEach(async() => {
		afterEach(mock.restore)
	})

	test('successfully delete file', async done => {
		expect.assertions(1)
		const control = await new FileController()
		await expect(control.deleteStaleFiles([{'directory': 'files/user/file.docx'}]))
			.resolves.toBe(true)
		done()
	})

	test('expect false if file is undefined/length = 0 delete file', async done => {
		expect.assertions(1)
		const control = await new FileController()
		await expect(control.deleteStaleFiles([]))
			.resolves.toBe(false)
		done()
	})
})

describe('uploadSharedFile()', () => {

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

		const val = await controller.uploadSharedFile('test/directory','file.jpeg','test',1000,'image/jpeg','sharer')

		expect(val).toBe(true)
		done()
	})

	test('expect false if user = false', async done => {
		expect.assertions(1)
		const controller = await new FileController()

		await expect(controller.uploadSharedFile('test/directory','file.jpeg',false,1000,'image/jpeg','sharer'))
			.resolves.toBe(false)
		done()
	})

	test('error if user is sharing with themselfs', async done => {
		expect.assertions(1)
		const controller = await new FileController()

		// eslint-disable-next-line max-len
		await expect(controller.uploadSharedFile('test/directory','file.jpeg','user',1000,'image/jpeg','user'))
			.rejects.toEqual(Error('Cannot share to yourself'))
		done()
	})
})


describe('listFiles()', () => {

	test('format and assign timeleft', async done => {
		expect.assertions(4)
		try {
			const obj = [{'name1': 'file1','timestamp': '2019-11-23 00:00:00','filename': 'file.jpeg'}]

			const endDate = new Date('2019-11-26 00:00:00')
			const control = await new FileController()
			const list = control.listFiles(obj, endDate, 5)

			const expectDays = 1
			const expectHours = 23
			const expectMinutes = 59
			const expectSeconds = 59

			const recievedDays = list[0].timeleft.days
			const recievedHours = list[0].timeleft.hours
			const recievedMinutes = list[0].timeleft.minutes
			const recievedSeconds = list[0].timeleft.seconds

			expect(recievedDays).toEqual(expectDays)
			expect(recievedHours).toEqual(expectHours)
			expect(recievedMinutes).toEqual(expectMinutes)
			expect(recievedSeconds).toEqual(expectSeconds)

		} catch (err) {
			done.fail(err)
		} finally {
			done()
		}
	})

	test('throw error if maxDay <= 0', async done => {
		expect.assertions(1)
		try {
			const obj = [{'name1': 'file1','timestamp': '2019-11-23 00:00:00','filename': 'file.jpeg'}]

			const endDate = new Date('2019-11-26 00:00:00')
			const control = await new FileController()
			control.listFiles(obj, endDate, 0)

			done.fail('test failed')

		} catch (err) {
			expect(err.message).toEqual('Must be atleast one day')
		} finally {
			done()
		}
	})

	test('throw error if maxDay <= -1', async done => {
		expect.assertions(1)
		try {
			const obj = [{'name1': 'file1','timestamp': '2019-11-23 00:00:00','filename': 'file.jpeg'}]

			const endDate = new Date('2019-11-26 00:00:00')
			const control = await new FileController()
			control.listFiles(obj, endDate, -1)

			done.fail('test failed')

		} catch (err) {
			expect(err.message).toEqual('Must be atleast one day')
		} finally {
			done()
		}
	})

	test('format and assign timeleft if maxDays > 0', async done => {
		expect.assertions(4)
		try {
			const obj = [{'name1': 'file1','timestamp': '2019-11-23 00:00:00','filename': 'file.jpeg'}]

			const endDate = new Date('2019-11-23 00:00:00')
			const control = await new FileController()
			const list = control.listFiles(obj, endDate, 1)

			const expectDays = 0
			const expectHours = 23
			const expectMinutes = 59
			const expectSeconds = 59

			const recievedDays = list[0].timeleft.days
			const recievedHours = list[0].timeleft.hours
			const recievedMinutes = list[0].timeleft.minutes
			const recievedSeconds = list[0].timeleft.seconds

			expect(recievedDays).toEqual(expectDays)
			expect(recievedHours).toEqual(expectHours)
			expect(recievedMinutes).toEqual(expectMinutes)
			expect(recievedSeconds).toEqual(expectSeconds)

		} catch (err) {
			done.fail(err)
		} finally {
			done()
		}
	})
})


