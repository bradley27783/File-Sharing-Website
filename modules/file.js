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

	constructor(dbName) {

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
			this.checkPath(path)
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

	async downloadFile(filename, user) {
		const path = `files/${user}/${filename}`
		try {
			this.checkFileName(filename)
			this.checkUser(user)
			await this.fileExists(path)

			return await fs.createReadStream(path)
		} catch (err) {
			throw err
		}
	}


	/**
	 * Checks if a file exists on the server
	 *
	 * @async
	 * @param {String} path - Where the file exists
	 * @throws - Directory doesnt exist
	 */
	async fileExists(path) {
		try {
			await fs.access(path)
		} catch (err) {
			throw Error('file doesnt exist')
		}
	}

	/**
	 * Checks if a path was passed. Otherwise throws error
	 *
	 * @param {String} path - Where the file exists
	 * @throws - file must have a path
	 */
	checkPath(path) {
		if(path === undefined || path === null || path.length === 0)
			throw new Error('file must have a path')
	}

	init(filename,user,filesize,filetype) {
		try {
			this.setFilename(filename)
			this.setUser(user)
			this.setFilesize(filesize)
			this.setFiletype(filetype)
			this.setDirectory()
		} catch (err) {
			throw err
		}
	}

	/**
	 * Checks if a filename was passed.
	 * If yes then stores it in this
	 * If no then throws error
	 *
	 * @param {String} fileName - The files name e.g. example.txt
	 * @throws - file must have a filename
	 */

	setFilename(filename) {
		if(filename === undefined || filename === null || filename.length === 0)
			throw new Error('file must have a filename')
		else
			this.filename = filename
	}


	/**
	 * Checks if a user was passed. 
	 * If yes then stores it in this
	 * If no then throws error
	 *
	 * @param {String} user - The user to store the file for
	 * @throws - file must have a user
	 */

	setUser(user) {
		if(user === undefined || user === null || user.length === 0)
			throw new Error('file must have a user')
		else
			this.user = user
	}

	setDirectory() {
		this.path = `files/${this.user}/${this.filename}`
	}

	setFilesize(filesize) {
		if(filesize === undefined || filesize === null || filesize.length === 0)
			throw new Error('file must have a filesize')
		else
			this.filesize = filesize
	}

	setFiletype(filetype) {
		if(filetype === undefined || filetype === null || filetype.length === 0)
			throw new Error('file must have a filetype')
		else
			this.filetype = filetype
	}

	setTimestamp() {
		throw new Error('build')
	}


	getFilename() {
		throw new Error('build')
	}

	getUser() {
		throw new Error('build')
	}

	getDirectory() {
		throw new Error('build')
	}

	getFilesize() {
		throw new Error('build')
	}

	getTimestamp() {
		throw new Error('build')
	}
}
