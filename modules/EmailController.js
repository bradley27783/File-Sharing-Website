'use strict'

const Email = require('./email.js')

class EmailController {
	sendEmail(user,pass,to,subject,message) {
		try {
			const email = new Email()
			email.setTransporter(user,pass)
			email.setMailingOptions(user,to,subject,message)
			email.sendEmail()
		} catch (err) {
			throw err
		}
	}
}

module.exports = EmailController
