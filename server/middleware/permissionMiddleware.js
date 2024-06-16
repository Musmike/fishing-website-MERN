const Review = require('../models/reviewModel');

const checkReviewOwnership = async (req, res, next) => {
    const { id } = req.params;

    try {
        const review = await Review.findById(id);

        if (!review) {
            return res.status(404).send({ message: 'Opinia nie została znaleziona!' });
        }

        if (review.author.equals(req.user._id) || req.user.status == 'admin') {
            return next();
        }
        else {
            return res.status(403).send({ message: 'Brak uprawnień!' });
        }
    }
    catch (error) {
        res.status(500).send({ message: 'Błąd wewnętrzny serwera!' });
    }
}

module.exports = { checkReviewOwnership };