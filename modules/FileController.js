/* eslint-disable no-unused-vars */
'use strict'

const bcrypt = require('bcrypt-promise')
const fs = require('fs-extra')
const mime = require('mime-types')
const sqlite = require('sqlite-async')
const saltRounds = 10

const File = require('./file')

/**
 * Class that handles processing of files.
 * @class
 * @name FileController
 */
module.exports = class FileController {

	constructor(dbname) {
		this.dbname = dbname
	}

	/**
	 * Saving an uploaded file
	 *
	 * @async
	 * @param {String} path - Where the file exists
	 * @param {String} fileName - The name of the file e.g. example.txt
	 * @param {String} user - The username of the person uploading
	 * @param {Integer} filesize - The size of the file uploaded in bytes
	 * @param {String} filetype - The filetype of the file e.g. image/jpeg
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
			return await fs.createReadStream(path)
		} catch (err) {
			throw err
		}
	}
}
