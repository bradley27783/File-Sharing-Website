/* eslint-disable no-unused-vars */
'use strict'

const bcrypt = require('bcrypt-promise')
const fs = require('fs-extra')
const mime = require('mime-types')
const sqlite = require('sqlite-async')
const saltRounds = 10

/**
 * Class that handles processing of files.
 * @class
 * @name File
 */
module.exports = class File {

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
			let sql = `SELECT * FROM files WHERE ITEM = "${file.getFilename()}" AND "${file.getUser()}"`
			const data = await this.db.all(sql)
			if(data.length === 0) {
				sql = 'INSERT INTO files(filename, directory, user, filesize, timestamp)' +
                    `VALUES("${file.getFilename()}", "${file.getDirectory()}","${file.getUser()}",`+
                    `${file.getFilesize()}, "${file.getTimestamp()}",)`

				await this.db.run(sql)
			} else {
				throw new Error('File already exists')
			}

		} catch(err) {
			throw err
		}
	}

	/**
	 * Saving an uploaded file
	 *
	 * @async
	 * @param {String} path - Where the file exists
	 * @param {String} fileName - The name of the file e.g. example.txt
	 * @param {String} user - The username of the person uploading
	 * @returns {boolean} - Returns true when the function completes
	 */
	async uploadFile(path) {
		try {
			if(path === undefined || path === null || path.length === 0)
				throw new Error('Could not locate uploaded files source path')
			await fs.copy(path, this.path)
			return true

		} catch(err) {
			throw err
		}
	}

	/**
	 * Downloading a file from server
	 *
	 * @async
	 * @param {String} path - Where the file exists
	 * @returns file - Returns a file read stream
	 */

	async downloadFile() {
		try {
			this.fileExists(this.path)
			return await fs.createReadStream(this.path)
		} catch (err) {
			throw err
		}
	}
}
