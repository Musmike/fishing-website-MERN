const router = require('express').express.Router();
const { tokenVerification } = require('../middleware/tokenVerification');
const postController = require('../controllers/postController');
const reviewController = require('../controllers/reviewController');

router.get("/posts", postContoller.getPosts);
router.get("/post/:id", postController.getPostById);

router.get("/reviews", reviewContoller.getAllReviews);

router.use(tokenVerification);

router.post("/createReview", reviewController.createReview);
router.get("/review/:id", reviewController.getReviewById);
router.put("/review/:id", reviewController.updateReview);
router.delete("/review/:id", reviewController.deleteReview);


module.exports = router