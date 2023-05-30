const express = require('express');

const {chat} = require("../controllers/chat")

const chatRouter = express.Router();

chatRouter.post("/",chat)

module.exports = chatRouter