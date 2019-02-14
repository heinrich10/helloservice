
const { readFile } = require('fs').promises;
const path = require('path');
const request = require('supertest');
const { expect } = require('chai');
const jwt = require('jsonwebtoken');
const app = require('../../src/app');
const registry = require('../../src/lib/registry');

const privKeyPath = './fixtures/jwt.key';
const pubKeyPath = './fixtures/jwt.pub.key';
const anotherPubKeyPath = '../../sec/pub_key.pem';

const USER = 'thisUser';
const thisApp = app();
let privKey, pubKey, anotherPubKey;
const generateToken = (payload) => {
	return new Promise((resolve, reject) => {
		jwt.sign(
			payload,
			privKey,
			{ algorithm: 'RS256' },
			(err, token) => {
				if (err) return reject(err);
				resolve(token);
			}
		);
	});
};
describe('Get username', () => {
	before(async () => {
		privKey = await readFile(path.join(__dirname, privKeyPath));
		pubKey = await readFile(path.join(__dirname, pubKeyPath));
		anotherPubKey = await readFile(path.join(__dirname, anotherPubKeyPath));

	});
	describe('Greet user', () => {
		before(async () => {
			registry.pubKey = pubKey;
		});
		it('should return the username field as the body', async () => {
			const payload = {
				username: USER,
				exp: Math.floor(Date.now() / 1000) + 120,
			};
			const token = await generateToken(payload);
			return request(thisApp)
				.get('/hello')
				.set('Authorization', 'Bearer ' + token)
				.expect('Content-Type', /json/)
				.expect(200)
				.then((res) => {
					const { hello } = res.body;
					expect(hello).to.be.equal(USER);
				});
		});
		it('should return empty body if username is not present', async () => {
			const payload = {
				exp: Math.floor(Date.now() / 1000) + 120,
			};
			const token = await generateToken(payload);
			return request(thisApp)
				.get('/hello')
				.set('Authorization', 'Bearer ' + token)
				.expect('Content-Type', /json/)
				.expect(200)
				.then((res) => {
					const { body } = res;
					expect(body).to.be.deep.equal({});
				});
		});
	});
	describe('Not greet the user', () => {
		it('should return 401 if token is expired', async () => {
			const payload = {
				username: USER,
				exp: 120,
			};
			const token = await generateToken(payload);
			return request(thisApp)
				.get('/hello')
				.set('Authorization', 'Bearer ' + token)
				.expect('Content-Type', /json/)
				.expect(401)
				.then((res) => {
					const { message, name } = res.body;
					expect(message).to.be.equal('jwt expired');
					expect(name).to.be.equal('Error');
				});
		});
		it('should return 401 if token is invalid', async () => {
			const payload = {
				username: USER,
				exp: Math.floor(Date.now() / 1000) + 120,
			};
			const token = await generateToken(payload);
			registry.pubKey = anotherPubKey;
			return request(thisApp)
				.get('/hello')
				.set('Authorization', 'Bearer ' + token)
				.expect('Content-Type', /json/)
				.expect(401)
				.then((res) => {
					const { message, name } = res.body;
					expect(message).to.be.equal('invalid signature');
					expect(name).to.be.equal('Error');
				});
		});
		it('should return 401 if no token is present', async () => {
			return request(thisApp)
				.get('/hello')
				.expect(401);
		});
	});
});
