const router = require("express").Router();

const {
  loginController,
  registerController,
  getLoginController,
  getQuestionController,
  getQuestion,
} = require("../controller/userController");

router.get("/getQuestion",getQuestion)
router.get("/question",getQuestionController);
router.get("/login", getLoginController);
router.post("/login", loginController);
router.post("/register", registerController);


module.exports = router;
