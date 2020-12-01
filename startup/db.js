const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();

function db() {
  let MONGODB_URI = process.env.MONGODB_URI;

  if (process.env.NODE_ENV === "test") {
    MONGODB_URI = process.env.TEST_MONGODB_URI;
  }
  console.log(MONGODB_URI);
  mongoose
    .connect(MONGODB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() => console.log("Connected to MongoDB..."))
    .catch((err) => console.error(`Could not connect to MongoDB: ${err}...`));
}

module.exports = { db };
