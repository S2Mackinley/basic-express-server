'use strict'; // JS "strict mode"

const express = require('express');
const app = express();

const notFound = require('./error-handlers/404.js');
const errors = require('./error-handlers/500.js');
const logger = require('./middleware/logger.js');
const validator = require('./middleware/validator');

// global middleware for:
// handling the parsing of a req.body
app.use(express.json());
// log the req path and method on every incoming request
// we are missing some key API server constructs:
// - express global middleware for handling incoming req
// - custom 500 and 404 error handling middleware
app.use(logger);

//ROUTES
app.get('/person', validator, (req, res) => {
	let output = { name: req.query.name };
	res.status(200).json(output);
});

//PROOF OF LIFE
app.get('/hello', (req, res) => {
	console.log(req.query);
	res.send('hello world!');
});

// catch all route handles routes that arent found
app.use('*', notFound);
// handles generic server errors
app.use(errors);

// module.exports is a global object in nodejs
// it allows us to add things to it, so that we can use these things
// in another file -> we add stuff as an object or a method
// (for example, we will require this server file in our index and use it there)
module.exports = {
	server: app,
	start: (port) => {
		app.listen(port, () => {
			console.log(`Your server is up and running on ${port}`);
		});
	},
};
