const express = require('express');
const app = express();

app.use((req, res, next) => {
	res.status(200).json({
		message: 'Testing 1 2 3'
	});
});

module.exports = app;