const router = require('express').Router();
const { authenticateToken } = require('../middleware/authMiddleware');
const { checkReviewOwnership } = require('../middleware/permissionMiddleware');
const postController = require('../controllers/postController');
const reviewController = require('../controllers/reviewController');

router.get("/posts", postController.getPosts);
// router.get("/post/:id", postController.getPostById);

// router.get("/reviews", reviewController.getAllReviews);

// router.post("/createReview", authenticateToken, reviewController.createReview);
// router.get("/review/:id", authenticateToken, checkReviewOwnership, reviewController.getReviewById);
// router.put("/updateReview/:id", authenticateToken, checkReviewOwnership, reviewController.updateReview);
// router.delete("/deleteReview/:id", authenticateToken, checkReviewOwnership, reviewController.deleteReview);

module.exports = router;