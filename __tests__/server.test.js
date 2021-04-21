'use strict';

const { server } = require('../src/server.js');
const supertest = require('supertest'); // mock request engine
const mockRequest = supertest(server); // start and initialize our server in memory (for testing)

describe('***WEB SERVER:***', () => {
	it('404 on a bad route', async () => {
		return mockRequest.get('/no-thing').then((data) => {
			expect(data.status).toBe(404);
		});
	});

    it("404 on some bad meth", () => {
        return mockRequest.post("/person").then((data) => {
            expect(data.status).toEqual(404);
        });
    });

    //500
	it('should respond with a 500 on an error', () => {
		return mockRequest.get('/person').then((data) => {
			expect(data.status).toEqual(500);
		});
	});

	it('should respond properly to a GET: /hello', async () => {
		const response = await mockRequest.get('/hello');
		expect(response.status).toBe(200); // test for status code
		expect(response.text).toBe('hello world!'); // test your output
		// HINT: test for shape/type of data
	});
});
