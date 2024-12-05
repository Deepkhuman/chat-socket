const { getuser, postdata, login } = require("../controllers/authUser");
const { ensureAuthenticated } = require("../middlewares/Auth");
const {
  loginValidation,
  signupValidation,
} = require("../middlewares/serverValidation");

const router = require("express").Router();

router.get("/", ensureAuthenticated, getuser);
router.post("/signup", signupValidation, postdata);
router.post("/login", loginValidation, login);

module.exports = router;
