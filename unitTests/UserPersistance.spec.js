'use strict'

const Accounts = require('../modules/UserPersistance')

describe('register()', () => {

	test('register a valid account', async done => {
		expect.assertions(1)
		//ARRANGE
		const account = await new Accounts()
		//ACT
		const register = await account.register('doej', 'password')
		//ASSERT
		expect(register).toBe(true)
		done()
	})

	test('register a duplicate username', async done => {
		expect.assertions(1)
		//ARRANGE
		const account = await new Accounts()
		//ACT
		await account.register('doej', 'password')
		//ASSERT
		await expect( account.register('doej', 'password') )
			.rejects.toEqual( Error('username "doej" already in use') )
		done()
	})

	test('error if blank username', async done => {
		expect.assertions(1)
		//ARRANGE
		const account = await new Accounts()
		//ACT
		//ASSERT
		await expect( account.register('', 'password') )
			.rejects.toEqual( Error('No username given') )
		done()
	})

	test('error if blank password', async done => {
		expect.assertions(1)
		//ARRANGE
		const account = await new Accounts()
		//ACT
		//ASSERT
		await expect( account.register('doej', '') )
			.rejects.toEqual( Error('No password given') )
		done()
	})

})

describe('login()', () => {
	test('log in with valid credentials', async done => {
		expect.assertions(1)
		//ARRANGE
		const account = await new Accounts()
		//ACT
		await account.register('doej', 'password')
		const valid = await account.login('doej', 'password')
		//ASSERT
		expect(valid).toBe(true)
		done()
	})

	test('invalid username', async done => {
		expect.assertions(1)
		//ARRANGE
		const account = await new Accounts()
		//ACT
		await account.register('doej', 'password')
		//ASSERT
		await expect( account.login('roej', 'password') )
			.rejects.toEqual( Error('username "roej" not found') )
		done()
	})

	test('invalid password', async done => {
		expect.assertions(1)
		//ARRANGE
		const account = await new Accounts()
		//ACT
		await account.register('doej', 'password')
		//ASSERT
		await expect( account.login('doej', 'bad') )
			.rejects.toEqual( Error('invalid password for account "doej"') )
		done()
	})

})

describe('login()', () => {
	test('return user', async done => {
		expect.assertions(1)
		//ARRANGE
		const account = await new Accounts()
		//ACT
		await account.register('user', 'password')
		//ASSERT
		await expect(account.checkUser('user')).resolves.toEqual('user')
		done()
	})

	test('return false if user doesnt exist', async done => {
		expect.assertions(1)
		//ARRANGE
		const account = await new Accounts()
		//ACT
		await account.register('user', 'password')
		//ASSERT
		await expect(account.checkUser('test')).resolves.toBe(false)
		done()
	})
})
