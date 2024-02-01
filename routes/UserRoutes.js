const express = require("express");
const router = express.Router();
const { Auth } = require("../middlewares/auth");

const {
  Register,
  Login,
  Dashboard,
  Posts,
} = require("../controllers/UserController");

router.post("/register", Register);
router.post("/login", Login);
router.get("/dashboard", Auth, Dashboard);
router.get("/getposts", Auth, Posts);

module.exports = router;
