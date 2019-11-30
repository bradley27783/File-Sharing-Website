'use strict'
const User = require('../modules/user.js')

describe('getUser()', () => {

	test('correctly get user', async done => {
		expect.assertions(1)
		try {
			//ARRANGE
			const user = await new User()
			//ACT
			user.setUser('user')
			//ASSERT
			expect(user.getUser()).toEqual(user.user)
		} catch (err) {
			done.fail()
		} finally {
			done()
		}
	})
})

describe('setUser()', () => {

	test('correctly set user', async done => {
		expect.assertions(1)
		try {
			//ARRANGE
			const user = await new User()
			//ACT
			user.setUser('user')
			//ASSERT
			expect(user.getUser()).toEqual('user')
		} catch (err) {
			done.fail()
		} finally {
			done()
		}
	})

	test('throw error if user undefined', async done => {
		expect.assertions(1)
		try {
			//ARRANGE
			const user = await new User()
			//ACT
			user.setUser(undefined)
			done.fail()
		} catch (err) {
			//ASSERT
			expect(err.message).toBe('No username given')
		} finally {
			done()
		}
	})

	test('throw error if user empty', async done => {
		expect.assertions(1)
		try {
			//ARRANGE
			const user = await new User()
			//ACT
			user.setUser('')
			done.fail()
		} catch (err) {
			//ASSERT
			expect(err.message).toBe('No username given')
		} finally {
			done()
		}
	})
})

describe('setPassword()', () => {

	test('correctly set password', async done => {
		expect.assertions(1)
		//ARRANGE
		const user = await new User()
		//ACT
		await user.setPassword('password')
		//ASSERT
		expect(user.getPassword()).toEqual(user.pass)
		done()
	})

	test('error if password is undefined', async done => {
		expect.assertions(1)
		//ARRANGE
		const user = await new User()
		//ACT
		//ASSERT
		await expect(user.setPassword(undefined))
			.rejects.toEqual(Error('No password given'))
		done()
	})

	test('error if password is empty', async done => {
		expect.assertions(1)
		//ARRANGE
		const user = await new User()
		//ACT
		//ASSERT
		await expect(user.setPassword(''))
			.rejects.toEqual(Error('No password given'))
		done()
	})
})
