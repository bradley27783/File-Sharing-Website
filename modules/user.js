'use strict'
const bcrypt = require('bcrypt-promise')
const saltRounds = 10

class User {
	setUser(user) {
		if (user === undefined || user.length === 0) throw new Error('No username given')
		this.user = user
	}

	async setPassword(pass) {
		if (pass === undefined || pass.length === 0) throw new Error('No password given')
		this.pass = await bcrypt.hash(pass, saltRounds)
	}

	getUser() {
		return this.user
	}

	getPassword() {
		return this.pass
	}
}

module.exports = User
