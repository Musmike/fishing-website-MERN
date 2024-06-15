const Review = require('../models/reviewModel');

const getAllReviews = async (req, res) => {
    Review.find().exec()
        .then(async () => {
            const reviews = await Review.find();
            res.status(200).send({ data: reviews });
        })
        .catch(error => {
            res.status(500).send({ message: error.message });
        });
};

const getReviewById = async (req, res) => {
    const reviewId = req.params.id;

    try {
        const review = await Review.findById(reviewId);

        if (!review) {
            return res.status(404).send({ message: "Nie znaleziono opinii." })
        }

        res.json(review);
    }
    catch (error) {
        res.status(500).send({ message: "Błąd wewnętrzny serwera!" });
    }
};

const createReview = async (req, res) => {
    const { message } = req.body;
    const author = req.user._id;

    try {
        const newReview = new Review({
            author,
            message,
        });

        const savedReview = await newReview.save();

        res.status(201).send({ message: "Pomyślnie utworzono opinię." });
    }
    catch (error) {
        res.status(500).send({ message: "Błąd wewnętrzny serwera!" });
    }
};


const updateReview = async (req, res) => {
    const { id } = req.params;
    const { message } = req.body;

    try {
        const review = await Review.findByIdAndUpdate(id, { message }, { new: true });

        if (!review) {
            return res.status(404).send({ message: 'Opinia nie została znaleziona!' });
        }

        res.json(review);
    }
    catch (error) {
        res.status(500).send({ message: "Błąd wewnętrzny serwera!" });
    }
};

const deleteReview = async (req, res) => {
    const { id } = req.params;

    try {
        const review = await Review.findByIdAndDelete(id);

        if (!review) {
            return res.status(404).send({ message: 'Opinia nie została znaleziona!' });
        }
        res.json({ message: 'Usunięto opinię.' });
    }
    catch (error) {
        res.status(500).send({ message: "Błąd wewnętrzny serwera!" });
    }
};

module.exports = { 
    getAllReviews, 
    getReviewById, 
    createReview,
    updateReview, 
    deleteReview 
};