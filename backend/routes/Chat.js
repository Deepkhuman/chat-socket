const { getMessages, updateReadMessage } = require("../controllers/getMessage");
const { getPastMessages } = require("../controllers/message");
const { ensureAuthenticated } = require("../middlewares/Auth");

const router = require("express").Router();

router.post("/getAllMessages", ensureAuthenticated, getPastMessages);
router.get("/getmessage", ensureAuthenticated, getMessages);
router.post("/updateReadMessage", ensureAuthenticated, updateReadMessage);

module.exports = router;
