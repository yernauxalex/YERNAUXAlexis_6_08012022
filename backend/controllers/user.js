const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const emailValidator = require('email-validator');
const passwordValidator = require('password-validator');
const User = require('../models/User');

// Création du schéma pour le mot de passe
const schema = new passwordValidator();
schema
    .is().min(8)
    .is().max(100)
    .has().uppercase()
    .has().lowercase()
    .has().symbols()
    .has().digits(1)
    .has().not().spaces()

// Création d'un nouveau compte
exports.signup = (req, res) => {
    if (emailValidator.validate(req.body.email)){
        if (schema.validate(req.body.password)){
            bcrypt
                .hash(req.body.password, 10)
                .then((hash) => {
                    const user = new User({
                        email: req.body.email,
                        password: hash,
                    });
                user
                    .save()
                    .then(() => res.status(201).json({ message: 'Utilisateur crée' }))
                    .catch((error) => res.status(400).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
        }
        else{
            return res.status(400).json({ message: 'Format du  mot de passe invalide, 8 caratères minimum, dont une majuscule, une minuscule, un caractrère spécial (#?!@$%^&*-.) et un chiffre'})

        }
    }
    else{
        return res.status(400).json({ message: 'Format du mail invalide'})
    }
    
};

// Connection à un compte existant
exports.login = (req, res) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé' });
            }
            bcrypt
                // Comparaison mdp de l'user et son hash
                .compare(req.body.password, user.password)
                .then((valid) => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign({ userId: user._id }, 'RANDOM_TOKEN_SECRET', {
                            expiresIn: '24h',
                        }),
                    });
                })
                .catch((error) => res.status(500).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
};