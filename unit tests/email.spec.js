'use strict'

const Email = require('../modules/email')

describe('setTransporter()', () => {

	test('correctly set transporter', async done => {
		expect.assertions(2)
		try {
			const email = new Email()

			email.setTransporter('fakeemail@gmail.com','password')
			const user = email.transporter.options.auth.user
			const pass = email.transporter.options.auth.pass

			expect(user).toEqual('fakeemail@gmail.com')
			expect(pass).toEqual('password')
		} catch (err) {
			done.fail(err)
		} finally {
			done()
		}
	})

	test('throw err if no @ in email', async done => {
		expect.assertions(1)
		try {
			const email = new Email()

			email.setTransporter('fakeemail.com','password')

			done.fail('test failed')
		} catch (err) {
			expect(err.message).toBe('Not a valid email')
		} finally {
			done()
		}
	})

	test('throw err empty string email', async done => {
		expect.assertions(1)
		try {
			const email = new Email()

			email.setTransporter('','password')

			done.fail('test failed')
		} catch (err) {
			expect(err.message).toBe('Not a valid email')
		} finally {
			done()
		}
	})

	test('throw err if no . in email', async done => {
		expect.assertions(1)
		try {
			const email = new Email()

			email.setTransporter('fakeemail@emailcom','password')

			done.fail('test failed')
		} catch (err) {
			expect(err.message).toBe('Not a valid email')
		} finally {
			done()
		}
	})

	test('throw err if no password entered email', async done => {
		expect.assertions(1)
		try {
			const email = new Email()

			email.setTransporter('fakeemail@email.com','')

			done.fail('test failed')
		} catch (err) {
			expect(err.message).toBe('No password entered')
		} finally {
			done()
		}
	})
})

describe('setMailingOptions()', () => {

	test('correctly set options', async done => {
		expect.assertions(4)
		try {
			const email = new Email()

			email.setMailingOptions('fakeemail@gmail.com','fakeemail2@gmail.com','Subject Title','Some message')
			const from = email.mailOptions.from
			const to = email.mailOptions.to
			const subject = email.mailOptions.subject
			const msg = email.mailOptions.text

			expect(from).toEqual('fakeemail@gmail.com')
			expect(to).toEqual('fakeemail2@gmail.com')
			expect(subject).toEqual('Subject Title')
			expect(msg).toEqual('Some message')
		} catch (err) {
			done.fail(err)
		} finally {
			done()
		}
	})

	test('throw err if invalid email - from', async done => {
		expect.assertions(1)
		try {
			const email = new Email()

			email.setMailingOptions('fakeemail@gmailcom','fakeemail2@gmail.com','Subject Title','Some message')

			done.fail('test failed')
		} catch (err) {
			expect(err.message).toBe('from email is invalid')
		} finally {
			done()
		}
	})

	test('throw err if invalid email - to', async done => {
		expect.assertions(1)
		try {
			const email = new Email()

			email.setMailingOptions('fakeemail@gmail.com','fakeemail2@gmailcom','Subject Title','Some message')

			done.fail('test failed')
		} catch (err) {
			expect(err.message).toBe('to email is invalid')
		} finally {
			done()
		}
	})

	test('throw err if subject is empty', async done => {
		expect.assertions(1)
		try {
			const email = new Email()

			email.setMailingOptions('fakeemail@gmail.com','fakeemail2@gmail.com','','Some message')

			done.fail('test failed')
		} catch (err) {
			expect(err.message).toBe('No subject entered')
		} finally {
			done()
		}
	})

	test('throw err if message is empty', async done => {
		expect.assertions(1)
		try {
			const email = new Email()

			email.setMailingOptions('fakeemail@gmail.com','fakeemail2@gmail.com','Subject Title','')

			done.fail('test failed')
		} catch (err) {
			expect(err.message).toBe('No message entered')
		} finally {
			done()
		}
	})
})
