'use strict'

class List {

	constructor(files) {
		this.files = files
	}

	calcDaysLeft(startDate, endDate) {
		try {
			startDate = startDate.getTime()
			endDate = endDate.getTime()
			if (Number.isNaN(startDate)) throw new Error('Start date is NaN')
			if (Number.isNaN(endDate)) throw new Error('End date is NaN')
			if (startDate > endDate) throw new Error('Start date is greater than end date')
			const sec = 1000 //1000 ms in sec
			const min = 60 // 60 sec in a min
			const hour = 60 // 60 min in a hr
			const day = 24 // 24 hr in a day
			const diffTime = Math.floor((endDate - startDate)/sec/min/hour/day) //get days

			return diffTime
		} catch (err) {
			throw err
		}
	}

	calcHoursLeft(startDate, endDate) {
		try {
			startDate = startDate.getTime()
			endDate = endDate.getTime()
			if (Number.isNaN(startDate)) throw new Error('Start date is NaN')
			if (Number.isNaN(endDate)) throw new Error('End date is NaN')
			if (startDate > endDate) throw new Error('Start date is greater than end date')
			const sec = 1000 //1000 ms in sec
			const min = 60 // 60 sec in a min
			const hour = 60 // 60 min in a hr
			const day = 24 // 24 hrs in a day
			const diffTime = Math.floor((endDate - startDate)/sec/min/hour) //get hours
			if(diffTime > day) return diffTime % day
			return diffTime
		} catch (err) {
			throw err
		}
	}
}

module.exports = List
