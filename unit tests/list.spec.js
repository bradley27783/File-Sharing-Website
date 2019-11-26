'use strict'

const List = require('../modules/list')

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

	test('expect if days = 1 to be 1', async done => {
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

	test('err if hours < 0', async done => {
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

	test('err if days < 0', async done => {
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
			const startDate = new Date('2019-11-23 00:00:00')
			const endDate = new Date('2019-11-23 00:00:00')

			const hours = list.calcHoursLeft(startDate,endDate)

			expect(hours).toBe(0)
		} catch (err) {
			done.fail(err)
		} finally {
			done()
		}
	})
	test('expect if hours = 1 to be 1', async done => {
		expect.assertions(1)
		try {
			const list = await new List()
			const startDate = new Date('2019-11-23 00:00:00')
			const endDate = new Date('2019-11-23 01:00:00')

			const hours = list.calcHoursLeft(startDate,endDate)

			expect(hours).toBe(1)
		} catch (err) {
			done.fail(err)
		} finally {
			done()
		}
	})

	test('expect if hours = 23 to be 23', async done => {
		expect.assertions(1)
		try {
			const list = await new List()
			const startDate = new Date('2019-11-23 00:00:00')
			const endDate = new Date('2019-11-23 23:00:00')

			const hours = list.calcHoursLeft(startDate,endDate)

			expect(hours).toBe(23)
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

	test('err if mins < 0', async done => {
		expect.assertions(1)
		try {
			const list = await new List()
			const startDate = new Date('2019-11-24 10:30:00')
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

	test('expect if min = 1 to be 1', async done => {
		expect.assertions(1)
		try {
			const list = await new List()
			const startDate = new Date('2019-11-23 10:00:00')
			const endDate = new Date('2019-11-23 10:01:00')

			const min = list.calcMinutesLeft(startDate,endDate)

			expect(min).toBe(1)
		} catch (err) {
			done.fail(err)
		} finally {
			done()
		}
	})

	test('expect if min = 59 to be 59', async done => {
		expect.assertions(1)
		try {
			const list = await new List()
			const startDate = new Date('2019-11-23 10:00:00')
			const endDate = new Date('2019-11-23 10:59:00')

			const min = list.calcMinutesLeft(startDate,endDate)

			expect(min).toBe(59)
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

	test('err if sec < 0', async done => {
		expect.assertions(1)
		try {
			const list = await new List()
			const startDate = new Date('2019-11-24 10:00:30')
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

	test('expect if seconds = 1 to be 1', async done => {
		expect.assertions(1)
		try {
			const list = await new List()
			const startDate = new Date('2019-11-23 10:00:00')
			const endDate = new Date('2019-11-23 10:00:01')

			const sec = list.calcSecondsLeft(startDate,endDate)

			expect(sec).toBe(1)
		} catch (err) {
			done.fail(err)
		} finally {
			done()
		}
	})

	test('expect if seconds = 59 to be 59', async done => {
		expect.assertions(1)
		try {
			const list = await new List()
			const startDate = new Date('2019-11-23 10:00:00')
			const endDate = new Date('2019-11-23 10:00:59')

			const sec = list.calcSecondsLeft(startDate,endDate)

			expect(sec).toBe(59)
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

describe('formatTimeLeft()', () => {

	test('format and assign timeleft', async done => {
		expect.assertions(4)
		try {
			const obj = [{'name1': 'file1','timestamp': '2019-11-23 12:30:00'}]

			const currentDate = new Date('2019-11-26 12:30:00')
			const list = new List()
			list.formatTimeLeft(obj, currentDate, 5)

			const expectDays = 1
			const expectHours = 23
			const expectMinutes = 59
			const expectSeconds = 59

			const recievedDays = list.files[0].timeleft.days
			const recievedHours = list.files[0].timeleft.hours
			const recievedMinutes = list.files[0].timeleft.minutes
			const recievedSeconds = list.files[0].timeleft.seconds

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

	test('correct return correct data - max edge case', async done => {
		expect.assertions(4)
		try {
			const obj = [{'name1': 'file1','timestamp': '2019-11-23 00:00:00'}]

			const endDate = new Date('2019-11-25 00:00:00')
			const list = new List()
			list.formatTimeLeft(obj, endDate, 5)

			const expectDays = 2
			const expectHours = 23
			const expectMinutes = 59
			const expectSeconds = 59

			const recievedDays = list.files[0].timeleft.days
			const recievedHours = list.files[0].timeleft.hours
			const recievedMinutes = list.files[0].timeleft.minutes
			const recievedSeconds = list.files[0].timeleft.seconds

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

	test('correct return correct data - all min edgecase', async done => {
		expect.assertions(4)
		try {
			const obj = [{'name1': 'file1','timestamp': '2019-11-23 00:00:00'}]

			const endDate = new Date('2019-11-28 00:00:00')
			const list = new List()
			list.formatTimeLeft(obj, endDate, 5)

			const expectDays = 0
			const expectHours = 0
			const expectMinutes = 0
			const expectSeconds = 0

			const recievedDays = list.files[0].timeleft.days
			const recievedHours = list.files[0].timeleft.hours
			const recievedMinutes = list.files[0].timeleft.minutes
			const recievedSeconds = list.files[0].timeleft.seconds

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


	test('err if files undefined', async done => {
		expect.assertions(1)
		try {

			const endDate = new Date('2019-11-29 00:00:00')
			const list = new List()
			list.formatTimeLeft(undefined, endDate, 5)

			done.fail('test failed')

		} catch (err) {
			expect(err.message).toEqual('No files exist')
		} finally {
			done()
		}
	})

	test('err if file timestamp is undefined', async done => {
		expect.assertions(1)
		try {
			const obj = [{'name1': 'file1'}]

			const endDate = new Date('2019-11-29 00:00:00')
			const list = new List()
			list.formatTimeLeft(obj, endDate, 5)

			done.fail('test failed')

		} catch (err) {
			expect(err.message).toEqual('No timestamp exist')
		} finally {
			done()
		}
	})

	test('err if file endDate is undefined', async done => {
		expect.assertions(1)
		try {
			const obj = [{'name1': 'file1','timestamp': '2019-11-23 00:00:00'}]

			const list = new List()
			list.formatTimeLeft(obj, undefined,5)

			done.fail('test failed')

		} catch (err) {
			expect(err.message).toEqual('No endDate')
		} finally {
			done()
		}
	})

	test('err if file endDate < startDate', async done => {
		expect.assertions(1)
		try {
			const obj = [{'name1': 'file1','timestamp': '2019-11-23 00:00:00'}]

			const endDate = new Date('2019-11-22 00:00:00')
			const list = new List()
			list.formatTimeLeft(obj, endDate, 5)

			done.fail('test failed')

		} catch (err) {
			expect(err.message).toEqual('Start date is greater than end date')
		} finally {
			done()
		}
	})
})

describe('daysLeft()', () => {

	test('return correct value if daysDiff === 0', async done => {
		expect.assertions(1)
		try {
			const list = new List()

			const val = list.daysLeft(0,5)

			expect(val).toEqual(4)
		} catch (err) {
			done.fail('test failed')
		} finally {
			done()
		}
	})

	test('return correct value if daysDiff = 0 and max days = 1', async done => {
		expect.assertions(1)
		try {
			const list = new List()

			const val = list.daysLeft(0,1)

			expect(val).toEqual(0)
		} catch (err) {
			done.fail('test failed')
		} finally {
			done()
		}
	})

	test('return correct value if daysDiff = 0 and max days = 0', async done => {
		expect.assertions(1)
		try {
			const list = new List()

			const val = list.daysLeft(0,0)

			expect(val).toEqual(0)
		} catch (err) {
			done.fail('test failed')
		} finally {
			done()
		}
	})

	test('return correct value', async done => {
		expect.assertions(1)
		try {
			const list = new List()

			const val = list.daysLeft(2,6)

			expect(val).toEqual(3)
		} catch (err) {
			done.fail('test failed')
		} finally {
			done()
		}
	})
})

describe('hoursLeft()', () => {

	test('return correct value if hours = hoursInDay', async done => {
		expect.assertions(1)
		try {
			const list = new List()

			const val = list.hoursLeft(24)

			expect(val).toEqual(0)
		} catch (err) {
			done.fail('test failed')
		} finally {
			done()
		}
	})

	test('return correct value if hours = 0', async done => {
		expect.assertions(1)
		try {
			const list = new List()

			const val = list.hoursLeft(0)

			expect(val).toEqual(23)
		} catch (err) {
			done.fail('test failed')
		} finally {
			done()
		}
	})

	test('return correct value', async done => {
		expect.assertions(1)
		try {
			const list = new List()

			const val = list.hoursLeft(4)

			expect(val).toEqual(19)
		} catch (err) {
			done.fail('test failed')
		} finally {
			done()
		}
	})

	test('return correct value - min case', async done => {
		expect.assertions(1)
		try {
			const list = new List()

			const val = list.hoursLeft(1)

			expect(val).toEqual(22)
		} catch (err) {
			done.fail('test failed')
		} finally {
			done()
		}
	})

	test('return correct value - max case', async done => {
		expect.assertions(1)
		try {
			const list = new List()

			const val = list.hoursLeft(23)

			expect(val).toEqual(0)
		} catch (err) {
			done.fail('test failed')
		} finally {
			done()
		}
	})
})

describe('minutesLeft()', () => {

	test('return correct value if minutes = minInHour', async done => {
		expect.assertions(1)
		try {
			const list = new List()

			const val = list.minutesLeft(60)

			expect(val).toEqual(0)
		} catch (err) {
			done.fail('test failed')
		} finally {
			done()
		}
	})

	test('return correct value if minutes = 0', async done => {
		expect.assertions(1)
		try {
			const list = new List()

			const val = list.minutesLeft(0)

			expect(val).toEqual(59)
		} catch (err) {
			done.fail('test failed')
		} finally {
			done()
		}
	})

	test('return correct value', async done => {
		expect.assertions(1)
		try {
			const list = new List()

			const val = list.minutesLeft(30)

			expect(val).toEqual(29)
		} catch (err) {
			done.fail('test failed')
		} finally {
			done()
		}
	})

	test('return correct value - min case', async done => {
		expect.assertions(1)
		try {
			const list = new List()

			const val = list.minutesLeft(1)

			expect(val).toEqual(58)
		} catch (err) {
			done.fail('test failed')
		} finally {
			done()
		}
	})

	test('return correct value - max case', async done => {
		expect.assertions(1)
		try {
			const list = new List()

			const val = list.minutesLeft(59)

			expect(val).toEqual(0)
		} catch (err) {
			done.fail('test failed')
		} finally {
			done()
		}
	})
})

describe('secondsLeft()', () => {

	test('return correct value if seconds = secInMin', async done => {
		expect.assertions(1)
		try {
			const list = new List()

			const val = list.secondsLeft(60)

			expect(val).toEqual(0)
		} catch (err) {
			done.fail('test failed')
		} finally {
			done()
		}
	})

	test('return correct value if seconds = 0', async done => {
		expect.assertions(1)
		try {
			const list = new List()

			const val = list.secondsLeft(0)

			expect(val).toEqual(59)
		} catch (err) {
			done.fail('test failed')
		} finally {
			done()
		}
	})

	test('return correct value', async done => {
		expect.assertions(1)
		try {
			const list = new List()

			const val = list.secondsLeft(30)

			expect(val).toEqual(29)
		} catch (err) {
			done.fail('test failed')
		} finally {
			done()
		}
	})

	test('return correct value - min case', async done => {
		expect.assertions(1)
		try {
			const list = new List()

			const val = list.secondsLeft(1)

			expect(val).toEqual(58)
		} catch (err) {
			done.fail('test failed')
		} finally {
			done()
		}
	})

	test('return correct value - max case', async done => {
		expect.assertions(1)
		try {
			const list = new List()

			const val = list.secondsLeft(59)

			expect(val).toEqual(0)
		} catch (err) {
			done.fail('test failed')
		} finally {
			done()
		}
	})
})
