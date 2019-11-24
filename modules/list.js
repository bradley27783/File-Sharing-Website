'use strict'

class List {

	formatTimeLeft(files,endDate,maxDays) {
		try {
			if(files === undefined) throw new Error('No files exist')
			if(endDate === undefined) throw new Error('No endDate')
			files.forEach(file => {
				if(file.timestamp === undefined) throw new Error('No timestamp exist')
				const startDate = new Date(file.timestamp)
				const days = this.calcDaysLeft(startDate,endDate)
				const hours = this.calcHoursLeft(startDate,endDate)
				const minutes = this.calcMinutesLeft(startDate,endDate)
				const seconds = this.calcSecondsLeft(startDate,endDate)
				const diffData = {'days': days,'hours': hours,'minutes': minutes,'seconds': seconds}
				const leftData = this.diffToLeft(diffData,maxDays)
				file['timeleft'] = leftData
			})
			this.files = files
		} catch (err) {
			throw err
		}
	}

	diffToLeft(diffData,days) {
		const hours = 24; const minutes = 60; const seconds = 60
		const sameDay = diffData['days'] === days
		if(sameDay) {
			diffData['days'] = days - diffData['days']
			if(diffData['hours'] === 0) diffData['hours'] = 0
			else diffData['hours'] = hours - diffData['hours'] - 1
			if(diffData['minutes'] === 0) diffData['minutes'] = 0
			else diffData['minutes'] = minutes - diffData['minutes'] - 1
			if(diffData['seconds'] === 0) diffData['seconds'] = 0
			else diffData['seconds'] = seconds - diffData['seconds'] - 1
		} else {
			diffData['days'] = days - diffData['days'] - 1
			diffData['hours'] = hours - diffData['hours'] - 1
			diffData['minutes'] = minutes - diffData['minutes'] - 1
			diffData['seconds'] = seconds - diffData['seconds'] - 1
		}
		return diffData
	}

	calcDaysLeft(startDate, endDate) {
		try {
			startDate = startDate.getTime()
			endDate = endDate.getTime()
			this.checkDates(startDate, endDate)
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
			this.checkDates(startDate, endDate)
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

	calcMinutesLeft(startDate, endDate) {
		try {
			startDate = startDate.getTime()
			endDate = endDate.getTime()
			this.checkDates(startDate, endDate)
			const sec = 1000 //1000 ms in sec
			const min = 60 // 60 sec in a min
			const hour = 60 // 60 min in a hr
			const diffTime = Math.floor((endDate - startDate)/sec/min) //get minutes
			if(diffTime > hour) return diffTime % hour
			return diffTime
		} catch (err) {
			throw err
		}
	}


	calcSecondsLeft(startDate, endDate) {
		try {
			startDate = startDate.getTime()
			endDate = endDate.getTime()
			this.checkDates(startDate, endDate)
			const sec = 1000 //1000 ms in sec
			const min = 60 // 60 sec in a min
			const diffTime = Math.floor((endDate - startDate)/sec) //get seconds
			if(diffTime > min) return diffTime % min
			return diffTime
		} catch (err) {
			throw err
		}
	}

	checkDates(startDate, endDate) {
		if (Number.isNaN(startDate)) throw new Error('Start date is NaN')
		if (Number.isNaN(endDate)) throw new Error('End date is NaN')
		if (startDate > endDate) throw new Error('Start date is greater than end date')
	}
}

module.exports = List
