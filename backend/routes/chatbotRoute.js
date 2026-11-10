const express = require("express");
const { sendChatMessage } = require("../controllers/chatbotController");
const { optionalProtect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/message", optionalProtect, sendChatMessage);

module.exports = router;
