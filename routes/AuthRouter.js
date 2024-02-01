const express = require("express");
const router = express.Router();

const { RefreshToken } = require("../controllers/AuthController");
const { RefreshAuth } = require("../middlewares/auth");

router.get("/refresh", RefreshAuth, RefreshToken);

module.exports = router;
