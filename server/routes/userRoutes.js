const router = require('express').Router();
const { authenticateToken } = require('../middleware/authMiddleware');
const { checkReviewOwnership } = require('../middleware/permissionMiddleware');
const postController = require('../controllers/postController');
const reviewController = require('../controllers/reviewController');

router.get("/posts", postController.getPosts);
router.get("/post/:id", postController.getPostById);

router.get("/reviews", reviewController.getAllReviews);


router.use(authenticateToken);

router.post("/review", reviewController.createReview);
router.get("/review/:id", checkReviewOwnership, reviewController.getReviewById);
router.patch("/review/:id", checkReviewOwnership, reviewController.updateReview);
router.delete("/review/:id", checkReviewOwnership, reviewController.deleteReview);

module.exports = router;