'use strict'

class List {

	constructor(files) {
		this.files = files
	}

	calcDaysLeft(startDate, endDate) {
		try {
			startDate = startDate.getTime()
			endDate = endDate.getTime()
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
}

module.exports = List
