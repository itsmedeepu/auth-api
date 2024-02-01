const jwt = require("jsonwebtoken");

const Auth = async (req, res, next) => {
  const accessheader = req.header("accesstoken");

  if (!accessheader) {
    return res
      .status(401)
      .json({ message: "access token not found! Access Forbidden" });
  }

  const access_token = accessheader.split(" ")[1];

  if (!access_token) {
    return res
      .status(401)
      .json({ message: "access token not found! Access Forbidden" });
  }

  try {
    jwt.verify(access_token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "token expired" });
      }
      next();
    });
    //
  } catch (e) {
    return res.status(500).json({ error: "Something went wrong at the server" });
  }
};

const RefreshAuth = (req, res, next) => {
  const refreshheader = req.header("refreshtoken");
  if (!refreshheader) {
    return res
      .status(401)
      .json({ message: "token not found Access forbidden" });
  }
  const refresh_token = refreshheader.split(" ")[1];
  if (!refresh_token) {
    return res
      .status(401)
      .json({ message: "token not found Access forbidden" });
  }

  next();
};
module.exports = { Auth, RefreshAuth };
