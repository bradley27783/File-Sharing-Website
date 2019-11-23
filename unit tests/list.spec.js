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
			const endDate = new Date('2019-11-24 10:00:00')

			const days = list.calcDaysLeft(startDate,endDate)

			expect(days).toBe(1)
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

	test('err if start date > end date', async done => {
		expect.assertions(1)
		try {
			const list = await new List()
			const startDate = new Date('2019-11-25 10:00:00')
			const endDate = new Date('2019-11-24 10:00:00')

			list.calcDaysLeft(startDate,endDate)

			done.fail('test failed')
		} catch (err) {
			expect(err.message).toEqual('Start date is greater than end date')
		} finally {
			done()
		}
	})

	test('expect if days = 0 to be 0', async done => {
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

	test('expect if invalid start date throw err', async done => {
		expect.assertions(1)
		try {
			const list = await new List()
			const startDate = new Date('2019-11-24 1a:0:00')
			const endDate = new Date('2019-11-24 10:00:00')

			list.calcDaysLeft(startDate,endDate)

			done.fail('test failed')
		} catch (err) {
			expect(err.message).toEqual('Start date is NaN')
		} finally {
			done()
		}
	})

	test('expect if invalid end date throw err', async done => {
		expect.assertions(1)
		try {
			const list = await new List()
			const startDate = new Date('2019-11-24 10:00:00')
			const endDate = new Date('2019-11-24 1a:00:00')

			list.calcDaysLeft(startDate,endDate)

			done.fail('test failed')
		} catch (err) {
			expect(err.message).toEqual('End date is NaN')
		} finally {
			done()
		}
	})
})

describe('calcHoursLeft()', () => {

	test('correct amount of hours returned', async done => {
		expect.assertions(1)
		try {
			const list = await new List()
			const startDate = new Date('2019-11-23 10:00:00')
			const endDate = new Date('2019-11-23 11:00:00')

			const hours = list.calcHoursLeft(startDate,endDate)

			expect(hours).toBe(1)
		} catch (err) {
			done.fail(err)
		} finally {
			done()
		}
	})

	test('correct amount of hours returned if 2 days 3 hours ahead', async done => {
		expect.assertions(1)
		try {
			const list = await new List()
			const startDate = new Date('2019-11-23 09:00:00')
			const endDate = new Date('2019-11-25 12:00:00')

			const hours = list.calcHoursLeft(startDate,endDate)

			expect(hours).toBe(3)
		} catch (err) {
			done.fail(err)
		} finally {
			done()
		}
	})

	test('err if start date > end date', async done => {
		expect.assertions(1)
		try {
			const list = await new List()
			const startDate = new Date('2019-11-24 11:00:00')
			const endDate = new Date('2019-11-24 10:00:00')

			list.calcHoursLeft(startDate,endDate)

			done.fail('test failed')
		} catch (err) {
			expect(err.message).toEqual('Start date is greater than end date')
		} finally {
			done()
		}
	})

	test('expect if hours = 0 to be 0', async done => {
		expect.assertions(1)
		try {
			const list = await new List()
			const startDate = new Date('2019-11-23 10:00:00')
			const endDate = new Date('2019-11-23 10:00:00')

			const hours = list.calcHoursLeft(startDate,endDate)

			expect(hours).toBe(0)
		} catch (err) {
			done.fail(err)
		} finally {
			done()
		}
	})

	test('expect if invalid start date throw err', async done => {
		expect.assertions(1)
		try {
			const list = await new List()
			const startDate = new Date('2019-11-24 1a:0:00')
			const endDate = new Date('2019-11-24 10:00:00')

			list.calcHoursLeft(startDate,endDate)

			done.fail('test failed')
		} catch (err) {
			expect(err.message).toEqual('Start date is NaN')
		} finally {
			done()
		}
	})

	test('expect if invalid end date throw err', async done => {
		expect.assertions(1)
		try {
			const list = await new List()
			const startDate = new Date('2019-11-24 10:00:00')
			const endDate = new Date('2019-11-24 1a:00:00')

			list.calcHoursLeft(startDate,endDate)

			done.fail('test failed')
		} catch (err) {
			expect(err.message).toEqual('End date is NaN')
		} finally {
			done()
		}
	})
})

describe('calcMinutesLeft()', () => {

	test('correct amount of minutes returned', async done => {
		expect.assertions(1)
		try {
			const list = await new List()
			const startDate = new Date('2019-11-23 10:30:00')
			const endDate = new Date('2019-11-23 10:31:00')

			const min = list.calcMinutesLeft(startDate,endDate)

			expect(min).toBe(1)
		} catch (err) {
			done.fail(err)
		} finally {
			done()
		}
	})

	test('correct amount of minutes returned if 3 hours and 20 mins ahead', async done => {
		expect.assertions(1)
		try {
			const list = await new List()
			const startDate = new Date('2019-11-23 09:00:00')
			const endDate = new Date('2019-11-25 12:20:00')

			const min = list.calcMinutesLeft(startDate,endDate)

			expect(min).toBe(20)
		} catch (err) {
			done.fail(err)
		} finally {
			done()
		}
	})

	test('correct amount of minutes returned if 1 day and 39 mins ahead', async done => {
		expect.assertions(1)
		try {
			const list = await new List()
			const startDate = new Date('2019-11-23 09:00:00')
			const endDate = new Date('2019-11-24 09:39:00')

			const min = list.calcMinutesLeft(startDate,endDate)

			expect(min).toBe(39)
		} catch (err) {
			done.fail(err)
		} finally {
			done()
		}
	})

	test('err if start date > end date', async done => {
		expect.assertions(1)
		try {
			const list = await new List()
			const startDate = new Date('2019-11-24 11:00:00')
			const endDate = new Date('2019-11-24 10:00:00')

			list.calcMinutesLeft(startDate,endDate)

			done.fail('test failed')
		} catch (err) {
			expect(err.message).toEqual('Start date is greater than end date')
		} finally {
			done()
		}
	})

	test('expect if min = 0 to be 0', async done => {
		expect.assertions(1)
		try {
			const list = await new List()
			const startDate = new Date('2019-11-23 10:00:00')
			const endDate = new Date('2019-11-23 10:00:00')

			const min = list.calcMinutesLeft(startDate,endDate)

			expect(min).toBe(0)
		} catch (err) {
			done.fail(err)
		} finally {
			done()
		}
	})

	test('expect if invalid start date throw err', async done => {
		expect.assertions(1)
		try {
			const list = await new List()
			const startDate = new Date('2019-11-24 1a:0:00')
			const endDate = new Date('2019-11-24 10:00:00')

			list.calcMinutesLeft(startDate,endDate)

			done.fail('test failed')
		} catch (err) {
			expect(err.message).toEqual('Start date is NaN')
		} finally {
			done()
		}
	})

	test('expect if invalid end date throw err', async done => {
		expect.assertions(1)
		try {
			const list = await new List()
			const startDate = new Date('2019-11-24 10:00:00')
			const endDate = new Date('2019-11-24 1a:00:00')

			list.calcMinutesLeft(startDate,endDate)

			done.fail('test failed')
		} catch (err) {
			expect(err.message).toEqual('End date is NaN')
		} finally {
			done()
		}
	})
})

describe('calcSecondsLeft()', () => {

	test('correct amount of seconds returned', async done => {
		expect.assertions(1)
		try {
			const list = await new List()
			const startDate = new Date('2019-11-23 10:30:00')
			const endDate = new Date('2019-11-23 10:30:10')

			const sec = list.calcSecondsLeft(startDate,endDate)

			expect(sec).toBe(10)
		} catch (err) {
			done.fail(err)
		} finally {
			done()
		}
	})

	test('correct amount of seconds returned if 20 mins and 45 seconds ahead', async done => {
		expect.assertions(1)
		try {
			const list = await new List()
			const startDate = new Date('2019-11-23 09:00:00')
			const endDate = new Date('2019-11-25 12:20:45')

			const sec = list.calcSecondsLeft(startDate,endDate)

			expect(sec).toBe(45)
		} catch (err) {
			done.fail(err)
		} finally {
			done()
		}
	})

	test('correct amount of seconds returned if 2 hours and 39 seconds ahead', async done => {
		expect.assertions(1)
		try {
			const list = await new List()
			const startDate = new Date('2019-11-23 09:00:00')
			const endDate = new Date('2019-11-23 11:00:39')

			const sec = list.calcSecondsLeft(startDate,endDate)

			expect(sec).toBe(39)
		} catch (err) {
			done.fail(err)
		} finally {
			done()
		}
	})

	test('err if start date > end date', async done => {
		expect.assertions(1)
		try {
			const list = await new List()
			const startDate = new Date('2019-11-24 11:00:00')
			const endDate = new Date('2019-11-24 10:00:00')

			list.calcSecondsLeft(startDate,endDate)

			done.fail('test failed')
		} catch (err) {
			expect(err.message).toEqual('Start date is greater than end date')
		} finally {
			done()
		}
	})

	test('expect if seconds = 0 to be 0', async done => {
		expect.assertions(1)
		try {
			const list = await new List()
			const startDate = new Date('2019-11-23 10:00:00')
			const endDate = new Date('2019-11-23 10:00:00')

			const sec = list.calcSecondsLeft(startDate,endDate)

			expect(sec).toBe(0)
		} catch (err) {
			done.fail(err)
		} finally {
			done()
		}
	})

	test('expect if invalid start date throw err', async done => {
		expect.assertions(1)
		try {
			const list = await new List()
			const startDate = new Date('2019-11-24 1a:0:00')
			const endDate = new Date('2019-11-24 10:00:00')

			list.calcSecondsLeft(startDate,endDate)

			done.fail('test failed')
		} catch (err) {
			expect(err.message).toEqual('Start date is NaN')
		} finally {
			done()
		}
	})

	test('expect if invalid end date throw err', async done => {
		expect.assertions(1)
		try {
			const list = await new List()
			const startDate = new Date('2019-11-24 10:00:00')
			const endDate = new Date('2019-11-24 1a:00:00')

			list.calcSecondsLeft(startDate,endDate)

			done.fail('test failed')
		} catch (err) {
			expect(err.message).toEqual('End date is NaN')
		} finally {
			done()
		}
	})
})
