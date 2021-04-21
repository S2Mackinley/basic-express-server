'use strict'; // JS "strict mode"

const express = require('express');
const app = express();

const notFound = require('./error-handlers/404.js');
const errors = require('./error-handlers/500.js');
const logger = require('./middleware/logger.js');
const validator = require('./middleware/validator');


app.use(express.json());

app.use(logger);

//ROUTES
app.get('/person', validator, (req, res) => {
	res.status(200).json({ name: req.query.name });
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

module.exports = {
	server: app,
	start: (port) => {
		app.listen(port, () => {
			console.log(`Your server is up and running on ${port}`);
		});
	},
};
