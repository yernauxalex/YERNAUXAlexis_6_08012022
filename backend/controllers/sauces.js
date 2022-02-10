const Sauce = require('../models/Sauce');
const fs = require('fs');

// Création d'une nouvelle sauce dans la DB
exports.createSauce = (req, res, next) => {
	const sauceObject = JSON.parse(req.body.sauce);
	delete sauceObject._id;
	// Crée une instance de sauce selon son model
	const sauce = new Sauce({
		...sauceObject,
		imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
	});
	sauce
		.save()
		.then(() => res.status(201).json({ message: 'Sauce enregistrée' }))
		.catch((error) => res.status(400).json({ message: error }));
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
	// Si import d'une nouvelle image on supprime l'ancienne du serveur
	if(req.file){
		Sauce.findOne({ _id: req.params.id })
		.then((sauce) => {
			const filename = sauce.imageUrl.split('/images/')[1];
			fs.unlink(`images/${filename}`, () => {});
		})
		.catch((error) => res.status(500).json({ error }));
	}
	const sauceObject = req.file
		? {
			...JSON.parse(req.body.sauce),
			imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
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
	Sauce.findOne({ _id: req.params.id })
		.then((sauce) => {
			const filename = sauce.imageUrl.split('/images/')[1];
			fs.unlink(`images/${filename}`, () => {
				Sauce.deleteOne({ _id: req.params.id })
					.then(() => res.status(200).json({ message: 'Sauce supprimé !' }))
					.catch((error) => res.status(400).json({ error }));
			});
		})
		.catch((error) => res.status(500).json({ error }));
};

// Récupération de toutes les sauces présentes dans la DB
exports.getAllSauces = (req, res, next) => {
	Sauce.find()
		.then((sauces) => {
			res.status(200).json(sauces);
		})
		.catch((error) => {
			res.status(400).json({
				error: error,
			});
		});
};