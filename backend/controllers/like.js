const Sauce = require('../models/Sauce');

// Etat du bouton like
exports.likeStatus = (req, res) => {
    const like = req.body.like
	const userId = req.body.userId

	// on cherche la sauce sélectionnée
	Sauce.findOne({ _id: req.params.id })
		.then((sauce) => {
			switch (like) {
				// like
				case 1:
					sauce.likes += 1;
					sauce.usersLiked.push(userId);
					break;

				// neutral
				case 0:
					if (userLike) {
						sauce.likes -= 1;
						sauce.usersLiked = sauce.usersLiked.filter((id) => id !== userId);
					};
					if (userDislike) {
						sauce.dislikes -= 1;
						sauce.usersDisliked = sauce.usersDisliked.filter(
							(id) => id !== userId
						);
					};
					break

				// dislike
				case -1:
					sauce.dislikes += 1;
					sauce.usersDisliked.push(userId);
			};
			sauce
				.save()
				.then(() => res.status(201).json({ message: 'save sauce' }))
				.catch((error) => res.status(400).json({ error }))
		})
		.catch((error) => res.status(500).json({ error }));
};