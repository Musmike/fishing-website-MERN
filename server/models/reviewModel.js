const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    user_id: { type: Number, required: true },
    message: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

const Review = mongoose.model('Review', reviewSchema);