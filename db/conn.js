const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI)
  .then((resp) => {
    console.log("database connected ");
  })
  .catch((err) => console.log(err + "connection failed"));
