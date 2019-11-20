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
class File {

	async init(filename,user,filesize,filetype) {
		try {
			this.setFilename(filename)
			this.setUser(user)
			this.setFilesize(filesize)
			this.setFiletype(filetype)
			this.setDirectory()
			this.setTimestamp()
			await this.setHashedName()
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
		else {
			this.filename = filename
		}
	}

	async setHashedName() {
		const hashedName = await bcrypt.hash(this.filename, saltRounds)
		const hashedNameUTF8 = encodeURIComponent(hashedName)
		this.hashedName = hashedNameUTF8
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
		try {
			const user = this.getUser()
			const filename = this.getFilename()
			this.path = `files/${user}/${filename}`
		} catch (err) {
			throw err
		}
	}

	setFilesize(filesize) {
		if(filesize === undefined || filesize === null || filesize === 0)
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
		const date = new Date()
		this.timestamp = date.toUTCString()
	}


	getFilename() {
		try {
			const filename = this.filename
			if(filename === undefined || filename === null || filename.length === 0)
				throw new Error('file does not have a filename')
			return filename
		} catch (err) {
			throw err
		}
	}

	getUser() {
		try {
			const user = this.user
			if(user === undefined || user === null || user.length === 0)
				throw new Error('file does not have a user')
			return user
		} catch (err) {
			throw err
		}
	}

	getDirectory() {
		try {
			const path = this.path
			if(path === undefined || path === null || path.length === 0)
				throw new Error('file does not have a path')
			return path
		} catch (err) {
			throw err
		}
	}

	getFilesize() {
		try {
			const filesize = this.filesize
			if(filesize === undefined || filesize === null || filesize === 0)
				throw new Error('file does not have a filesize')
			return filesize
		} catch (err) {
			throw err
		}
	}

	getFiletype() {
		try {
			const filetype = this.filetype
			if(filetype === undefined || filetype === null || filetype.length === 0)
				throw new Error('file does not have a filetype')
			return filetype
		} catch (err) {
			throw err
		}
	}

	getTimestamp() {
		try {
			const timestamp = this.timestamp
			if(timestamp === undefined || timestamp === null || timestamp.length === 0)
				throw new Error('file does not have a timestamp')
			return timestamp
		} catch (err) {
			throw err
		}
	}

	getHashedName() {
		try {
			const hashedName = this.hashedName
			if(hashedName === undefined || hashedName === null || hashedName.length === 0)
				throw new Error('file does not have a hashed filename')
			return hashedName
		} catch (err) {
			throw err
		}
	}
}

module.exports = File
