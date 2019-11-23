'use strict'

const List = require('../modules/list')

describe('List()', () => {

	test('add list of objects', async done => {
		expect.assertions(1)
		try {
			const obj = [{'key1': 'val1'},{'key2': 'val2'}]
			const list = await new List(obj)

			expect(list.files).toMatchObject(obj)

		} catch (err) {
			done.fail()
		} finally {
			done()
		}
	})
})

describe('calcDaysLeft()', () => {

	test('correct amount of days returned', async done => {
		expect.assertions(1)
		try {
			const list = await new List()
			const startDate = new Date('2019-11-23 10:00:00')
			const endDate = new Date('2019-11-23 10:00:00')

			const days = list.calcDaysLeft(startDate,endDate)

			expect(days).toBe(0)
		} catch (err) {
			done.fail(err)
		} finally {
			done()
		}
	})

	test('correct amount of days returned if 1 day 23 hours ahead', async done => {
		expect.assertions(1)
		try {
			const list = await new List()
			const startDate = new Date('2019-11-23 09:00:00')
			const endDate = new Date('2019-11-24 10:00:00')

			const days = list.calcDaysLeft(startDate,endDate)

			expect(days).toBe(1)
		} catch (err) {
			done.fail(err)
		} finally {
			done()
		}
	})

	test('correct amount of days returned if 1 day 50 mins ahead', async done => {
		expect.assertions(1)
		try {
			const list = await new List()
			const startDate = new Date('2019-11-23 10:00:00')
			const endDate = new Date('2019-11-24 10:50:00')

			const days = list.calcDaysLeft(startDate,endDate)

			expect(days).toBe(1)
		} catch (err) {
			done.fail(err)
		} finally {
			done()
		}
	})
})
