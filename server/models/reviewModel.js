const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    author: {    
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true 
    },
    content: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;