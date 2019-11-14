/* eslint-disable no-unused-vars */
'use strict'

const bcrypt = require('bcrypt-promise')
const fs = require('fs-extra')
const mime = require('mime-types')
const sqlite = require('sqlite-async')
const saltRounds = 10


module.exports = class File {

	async uploadFile(path, fileName, user) {
		try {
			this.checkPath(path)
			this.checkFileName(fileName)
			this.checkUser(user)

			await fs.copy(path, `files/${user}/${fileName}`)
			return true

		} catch(err) {
			throw err
		}
	}

	checkPath(path) {
		if(path === undefined || path.length === 0 || path === null)
			throw new Error('file must have a path')
	}

	checkFileName(fileName) {
		if(fileName === undefined || fileName.length === 0 || fileName === null)
			throw new Error('file must have a filename')
	}

	checkUser(user) {
		if(user === undefined || user.length === 0 || user === null)
			throw new Error('file must have a user')
	}
}
