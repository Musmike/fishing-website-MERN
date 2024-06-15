const router = require('express').express.Router();
const { authenticateToken } = require('../middleware/authMiddleware');
const { checkReviewOwnership } = require('../middleware/permissionMiddleware');
const postController = require('../controllers/postController');
const reviewController = require('../controllers/reviewController');

router.get("/posts", postContoller.getPosts);
router.get("/post/:id", postController.getPostById);

router.get("/reviews", reviewContoller.getAllReviews);


router.use(authenticateToken);

router.post("/createReview", reviewController.createReview);
router.get("/review/:id", checkReviewOwnership, reviewController.getReviewById);
router.put("/updateReview/:id", checkReviewOwnership, reviewController.updateReview);
router.delete("/deleteReview/:id", checkReviewOwnership, reviewController.deleteReview);

module.exports = router