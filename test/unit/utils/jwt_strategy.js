
const jwt = require('jsonwebtoken');
const jwtStrategy = require('../../../src/utils/jwt_strategy');
const sinon = require('sinon');
const { expect } = require('chai');

describe('testing jwtStrategy', () => {
	it('should return a user info when token is valid', (done) => {
		const stub = sinon.stub(jwt, 'verify');
		const user = {
			username: 'user1',
		};
		stub.callsArgWith(2, null, user);
		jwtStrategy(null, (err, u) => {
			expect(err).to.be.null;
			expect(u).to.be.deep.equal(user);
			done();
		});
		stub.restore();
	});
	it('should return an error when token is invalid', (done) => {
		const stub = sinon.stub(jwt, 'verify');
		stub.callsArgWith(2, 'something went wrong');
		jwtStrategy(null, (err, u) => {
			expect(err).to.be.instanceOf(Error);
			expect(u).to.be.undefined;
			done();
		});
		stub.restore();
	});
});
