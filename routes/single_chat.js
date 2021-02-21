const express = require("express");

const router  = express.Router();

const chatController  = require("../controllers/ChatController");

router.get("/:username", chatController.singleChat);

module.exports = router;