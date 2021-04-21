'use strict';

const { server } = require('../src/server');
const supertest = require('supertest');
const mockRequest = supertest(server);

describe('***VALIDATOR TEST***', () => {
	it('should give a response of 500', () => {
		return mockRequest.get('/person').then((data) => {
			expect(data.status).toEqual(500);
		});
	});
});
