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

	/**
	 * Saving an uploaded file
	 *
	 * @async
	 * @param {String} path - Where the file exists
	 * @param {String} fileName - The name of the file e.g. example.txt
	 * @param {String} user - The username of the person uploading
	 * @returns {boolean} - Returns true when the function completes
	 */
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

	/**
	 * Checks if a path was passed. Otherwise throws error
	 *
	 * @param {String} path - Where the file exists
	 * @throws - file must have a path
	 */
	checkPath(path) {
		if(path === undefined || path.length === 0 || path === null)
			throw new Error('file must have a path')
	}

	/**
	 * Checks if a filenname was passed. Otherwise throws error
	 *
	 * @param {String} fileName - The files name e.g. example.txt
	 * @throws - file must have a filename
	 */
	checkFileName(fileName) {
		if(fileName === undefined || fileName.length === 0 || fileName === null)
			throw new Error('file must have a filename')
	}


	/**
	 * Checks if a user was passed. Otherwise throws error
	 *
	 * @param {String} user - The user to store the file for
	 * @throws - file must have a user
	 */
	checkUser(user) {
		if(user === undefined || user.length === 0 || user === null)
			throw new Error('file must have a user')
	}
}
