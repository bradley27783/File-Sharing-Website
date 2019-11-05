'use strict'

const bcrypt = require('bcrypt-promise')
const fs = require('fs-extra')
const mime = require('mime-types')
const sqlite = require('sqlite-async')
const saltRounds = 10


module.exports = class File {

    async upload(path, fileName, user){
        try{
            if(path === undefined || path.length === 0) throw new Error('file must have a path')
            if(fileName === undefined || fileName.length === 0) throw new Error('file must have a filename')
            if(user === undefined || user.length === 0) throw new Error('file must have a user')

            await fs.copy(path, `private/files/${user}/${fileName}`)

            return true
        } catch(err){
            throw(err)
        }
    }
}