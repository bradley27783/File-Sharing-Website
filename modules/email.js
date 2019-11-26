'use strict'
const nodemailer = require('nodemailer')
const validator = require('email-validator')

//user: 'harri361340ctwork@gmail.com',
//pass: 'a@auy&&Azz>X?;;aa'

class Email {
	setTransporter(user,pass) {
		if(!validator.validate(user)) throw new Error('Not a valid email')
		else if(pass.length === 0) throw new Error('No password entered')
		this.transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: user,
				pass: pass
			}
		})
	}

	setMailingOptions(from,to,subject,msg) {
		if(!validator.validate(from)) throw new Error('from email is invalid')
		else if(!validator.validate(to)) throw new Error('to email is invalid')
		else if(subject.length === 0) throw new Error('No subject entered')
		else if(msg.length === 0) throw new Error('No message entered')
		this.mailOptions = {
			from: from,
			to: to,
			subject: subject,
			text: msg
		}
	}

	async sendEmail() {
		try {
			await this.transporter.sendMail(this.mailOptions)
		} catch (err) {
			throw new Error('Failed to send email')
		}
	}
}

module.exports = Email
