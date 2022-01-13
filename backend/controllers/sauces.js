const Sauce = require('../models/Sauce');
const fs = require('fs');

// Création d'une nouvelle sauce dans la DB
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    // Crée une instance de sauce selon son model
    const sauce = new Sauce({
		...sauceObject,
		imageUrl: `${req.protocol}://${req.get('host')}/images/${
			req.fs.filename
		}`,
	});
    sauce
        .save()
        .then(() => res.status(201).json({message: 'Sauce enregistrée'}))
        .catch((error) => res.status(400).json({message: error}))
};

// Recherche d'une sauce dans la DB
exports.getOneSauce = (req, res, next) => {

};

// Modification d'une sauce dans la DB
exports.modifySauce = (req, res, next) => {

};

// Suppression d'une sauce dans la DB
exports.deleteSauce = (req, res, next) => {

};

// Récupération de toutes les sauces présentes dans la DB
exports.getAllSauces = (req, res, next) => {

};