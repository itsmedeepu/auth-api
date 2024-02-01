const UserModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(409).json({ error: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ name, email, password: hashedPassword });
    const saveUser = await newUser.save();
    res
      .status(201)
      .json({ message: "User registered successfully", user: saveUser });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong at the server" });
  }
};

const Login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "Invalid login details" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid login credentials" });
    }
    const payload = {
      id: user.id,
      email: user.email,
    };
    const accessToken = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "1m",
    });
    const refreshToken = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "10d",
    });

    res.status(200).json({
      message: "login sucessfull",
      isLogged: "true",
      data: payload,
      accesstoken: accessToken,
      refreshtoken: refreshToken,
    });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong at the server" });
  }
};

const Dashboard = async (req, res) => {
  res.status(200).json({ message: "Welcome to the dashboard" });
};

const Posts = async (req, res) => {
  res.status(200).json({ message: "post request" });
};

module.exports = { Register, Login, Dashboard, Posts };
