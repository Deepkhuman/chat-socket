const { getPastMessages } = require("../controllers/message");
const { ensureAuthenticated } = require("../middlewares/Auth");

const router = require("express").Router();

router.post("/getAllMessages", ensureAuthenticated, getPastMessages);

module.exports = router;
