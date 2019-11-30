/* eslint-disable no-unused-vars */
'use strict'

const bcrypt = require('bcrypt-promise')
const fs = require('fs-extra')
const mime = require('mime-types')
const sqlite = require('sqlite-async')
const saltRounds = 10

const File = require('./file')
const List = require('./list')

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

	// eslint-disable-next-line max-params
	async uploadSharedFile(path,filename,user,filesize,filetype,originalUser) {
		try {
			if(!user) return false
			if (user === originalUser) throw new Error('Cannot share to yourself')
			const file = await new File()
			await file.init(filename,user,filesize,filetype)

			await fs.copy(path, file.getDirectory())
			return true
		} catch (err) {
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

	listFiles(files,endDate,maxDays) {
		try {
			if (maxDays <= 0) throw new Error('Must be atleast one day')
			const list = new List()
			list.formatTimeLeft(files,endDate,maxDays)
			list.formatFiletype(files)
			return list.files
		} catch (err) {
			throw err
		}
	}

	async deleteStaleFiles(data) {
		if (data[0] !== undefined || data.length !== 0) {
			data.forEach(async file => {
				await this.deleteFile(file.directory)
			})
			return true
		}
		return false
	}

}
