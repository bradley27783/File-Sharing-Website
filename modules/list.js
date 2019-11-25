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
				const leftData = this.diffToLeft(diffData,maxDays,file.timestamp,endDate)
				file['timeleft'] = leftData
			})
			this.files = files
		} catch (err) {
			throw err
		}
	}

	daysLeft(daysDiff, maxDays) {
		console.log(daysDiff)
		console.log(maxDays)
		if (daysDiff === 0) return maxDays - 1 //return max days because there is 0 difference
		else if (daysDiff === maxDays) return 0
		else return maxDays - daysDiff - 1
	}

	hoursLeft(hours) {
		console.log(hours)
		const hoursInDay = 24
		if (hours === 0) return hoursInDay - 1 //if difference is 0 then 24 - 1
		else if (hours === hoursInDay) return 0
		else return hoursInDay - hours - 1
	}

	minutesLeft(min) {
		const minInHour = 60
		if (min === 0) return minInHour - 1
		else if (min === minInHour) return 0
		else return minInHour - min - 1
	}

	secondsLeft(sec) {
		const secInMin = 60
		if (sec === 0) return secInMin - 1
		else if (sec === secInMin) return 0
		else return secInMin - sec - 1
	}

	diffToLeft(diffData,maxDays,startDay, currentDay) {
		startDay = new Date(startDay).getTime()
		currentDay = new Date(currentDay).getTime()
		const msInDay = 86400000
		const endDay = startDay + maxDays * msInDay

		if (currentDay === endDay) {
			diffData['days'] = 0
			diffData['hours'] = 0
			diffData['minutes'] = 0
			diffData['seconds'] = 0
		} else {
			diffData['days'] = this.daysLeft(diffData['days'],maxDays)
			diffData['hours'] = this.hoursLeft(diffData['hours'])
			diffData['minutes'] = this.minutesLeft(diffData['minutes'])
			diffData['seconds'] = this.secondsLeft(diffData['seconds'])
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
