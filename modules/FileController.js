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

	/**
	 * Saving an uploaded file
	 *
	 * @async
	 * @param {String} path - Where the file exists
	 * @param {String} fileName - The name of the file e.g. example.txt
	 * @param {String} user - The username of the person uploading
	 * @returns {boolean} - Returns true when the function completes
	 */
	async uploadFile(path,filename,user,filesize,filetype) {
		try {
			if(path === undefined || path === null || path.length === 0)
				throw new Error('Could not locate uploaded files source path')

			const file = await new File()
			file.init(filename,user,filesize,filetype)

			await fs.copy(path, file.getDirectory())
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

	async downloadFile(path) {
		try {
			//Need to check if file exists here
			return await fs.createReadStream(path)
		} catch (err) {
			throw err
		}
	}
	/*
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
	}*/
}
