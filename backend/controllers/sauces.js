const Sauce = require('../models/Sauce');
const fs = require('fs');

// Création d'une nouvelle sauce dans la DB
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
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
        .catch((error) => res.status(400).json({message: error}));
};

// Recherche d'une sauce dans la DB
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id }) 
		.then((sauce) => {
			res.status(200).json(sauce)
		})
		.catch((error) => {
			res.status(404).json({ error })
		});
};

// Modification d'une sauce dans la DB
exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file
		? {
				...JSON.parse(req.body.sauce),
				imageUrl: `${req.protocol}://${req.get('host')}/images/${
					req.file.filename
				}`,
		  }
		: { ...req.body }
	Sauce.updateOne(
		{ _id: req.params.id },
		{ ...sauceObject, _id: req.params.id }
	)
		.then(() => res.status(200).json({ message: 'Sauce modifiée' }))
		.catch((error) => res.status(400).json({ error }));
};

// Suppression d'une sauce dans la DB
exports.deleteSauce = (req, res, next) => {

};

// Récupération de toutes les sauces présentes dans la DB
exports.getAllSauces = (req, res, next) => {

};