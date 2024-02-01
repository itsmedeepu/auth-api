const express = require("express");
const router = express.Router();
const { Auth, RefreshAuth } = require("../middlewares/auth");

const {
  Register,
  Login,
  Dashboard,
  Posts,
  RefreshToken,
} = require("../controllers/UserController");

router.post("/register", Register);
router.post("/login", Login);
router.get("/dashboard", Auth, Dashboard);
router.get("/getposts", Auth, Posts);
router.get("/refresh", RefreshAuth, RefreshToken);

module.exports = router;
