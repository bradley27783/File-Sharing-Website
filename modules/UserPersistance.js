'use strict'

const sqlite = require('sqlite-async')
const bcrypt = require('bcrypt-promise')
const Account = require('./user')

module.exports = class UserPersistance {

	constructor(dbName = ':memory:') {
		return (async() => {
			this.db = await sqlite.open(dbName)
			// we need this table to store the user accounts
			const sql = 'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, user TEXT, pass TEXT);'
			await this.db.run(sql)
			return this
		})()
	}

	async register(user, pass) {
		try {
			const account = await new Account()
			account.setUser(user)
			await account.setPassword(pass)
			let sql = `SELECT COUNT(id) as records FROM users WHERE user="${account.getUser()}";`
			const data = await this.db.get(sql)
			if(data.records !== 0) throw new Error(`username "${account.getUser()}" already in use`)
			sql = `INSERT INTO users(user, pass) VALUES("${account.getUser()}", "${account.getPassword()}")`
			await this.db.run(sql)
			return true
		} catch(err) {
			throw err
		}
	}

	async login(user, pass) {
		try {
			const account = await new Account()
			account.setUser(user)
			let sql = `SELECT count(id) AS count FROM users WHERE user="${account.getUser()}";`
			const records = await this.db.get(sql)
			if(!records.count) throw new Error(`username "${account.getUser()}" not found`)
			sql = `SELECT pass FROM users WHERE user = "${account.getUser()}";`
			const record = await this.db.get(sql)
			const valid = await bcrypt.compare(pass, record.pass)
			if(valid === false) throw new Error(`invalid password for account "${account.getUser()}"`)
			return true
		} catch(err) {
			throw err
		}
	}

	async checkUser(user) {
		let sql = `SELECT count(id) AS count FROM users WHERE user="${user}";`
		const records = await this.db.get(sql)
		if(!records.count) return false

		sql = `SELECT user FROM users WHERE user="${user}";`
		const data = await this.db.get(sql)
		return data.user
	}

}
