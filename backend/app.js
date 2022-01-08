// Import des packages
const express = require('express');
const app = express();
const mongoose = require('mongoose');

// Récupération des logs de la DB
const log = require ('./log_DB');

// mongoDB
mongoose.connect(`${log.MONGOLOG}`, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log('Connected to MongoDB'))
	.catch(() => console.log('Connection failed'));



module.exports = app;