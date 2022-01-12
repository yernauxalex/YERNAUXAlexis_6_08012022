const Sauce = require('../models/Sauce');
const file = require('file-system');

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    // Crée une instance de sauce selon son model
    const sauce = new Sauce({
		...sauceObject,
		imageUrl: `${req.protocol}://${req.get('host')}/images/${
			req.file.filename
		}`,
	});
    sauce
        .save()
        .then(() => res.status(201).json({message: 'Sauce enregistrée'}))
        .catch((error) => res.status(400).json({message: error}))
};

exports.getOneSauce = (req, res, next) => {

};

exports.modifySauce = (req, res, next) => {

};

exports.deleteSauce = (req, res, next) => {

};

exports.getAllSauces = (req, res, next) => {

};