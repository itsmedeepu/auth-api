const jwt = require("jsonwebtoken");
const RefreshToken = async (req, res) => {
  const refresheader = req.header("refreshtoken");
  const refresh_token = refresheader.split(" ")[1];
  try {
    jwt.verify(refresh_token, process.env.SECRET_KEY, (err, deocded) => {
      if (err) {
        return res
          .status(401)
          .json({ message: "invalid token Access Denied " });
      }
      const payload = {
        id: deocded.id,
        email: deocded.email,
      };
      const access_token = jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: "1m",
      });

      return res.status(200).json({
        accesstoken: access_token,
        message: "new access token genrated ",
      });
    });
  } catch (err) {
    res.status(500).json({ message: "something went bad at server" });
  }
};

module.exports = { RefreshToken };
