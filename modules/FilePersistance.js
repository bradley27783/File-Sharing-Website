/* eslint-disable no-unused-vars */
'use strict'

const bcrypt = require('bcrypt-promise')
const fs = require('fs-extra')
const mime = require('mime-types')
const sqlite = require('sqlite-async')
const saltRounds = 10

const File = require('./file.js')

/**
 * Class that handles processing of files.
 * @class
 * @name FileController
 */
module.exports = class FileController {

	constructor(dbName = ':memory:') {

		return (async() => {
			this.db = await sqlite.open(dbName)
			const sql = 'CREATE TABLE IF NOT EXISTS files(id INTEGER PRIMARY KEY AUTOINCREMENT,' +
                'filename TEXT, directory TEXT, user TEXT, filesize INTEGER, timestamp TEXT)'
			await this.db.run(sql)
			return this
		})()
	}

	async writeFile(file) {
		try {
			let sql = `SELECT * FROM files WHERE filename = "${file.getFilename()}" AND user = "${file.getUser()}"`
			const data = await this.db.all(sql)
			if(data.length === 0) {
				sql = 'INSERT INTO files(filename, directory, user, filesize, timestamp)' +
                    `VALUES("${file.getFilename()}", "${file.getDirectory()}","${file.getUser()}",`+
                    `${file.getFilesize()}, "${file.getTimestamp()}");`

				await this.db.run(sql)
				return true
			} else {
				throw new Error('File already exists')
			}

		} catch(err) {
			throw err
		}
	}
}
