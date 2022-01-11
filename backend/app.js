// Import des packages
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();

// Immport routes
const userRoutes = require('./routes/user');
const saucesRoutes = require('./routes/sauces');

// MongoDB
mongoose.connect(`${process.env.MONGOLOG}`, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log('Connected to MongoDB'))
	.catch(() => console.log('Connection failed'));

// CORS
app.use((req, res, next) => {
	// Accéder à l'API depuis n'importe où
	res.setHeader('Access-Control-Allow-Origin', '*')
	// Ajouter les headers sur nos réponses
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
	)
	// Permet d'utiliser le CRUD
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
	next()
})

// Middleware
// Utilisation du body sur req
app.use(express.json());

// Routes
app.use('/api/auth', userRoutes);
app.use('/api/sauces', saucesRoutes);

module.exports = app;