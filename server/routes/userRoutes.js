const router = require("express").Router()
const userController = require('../controllers/userController');

router.post("/register", userController.createUser);
router.delete("/deleteUser", userController.deleteUser);

module.exports = router