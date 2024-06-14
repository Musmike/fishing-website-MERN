const Post = require('../models/postModel');

const getPosts = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const perPage = 5;

    try {
        const posts = await Post.find()
            .skip((page - 1) * perPage)
            .limit(perPage)
            .sort({ createdAt: -1 });

        res.json(posts);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getPosts };