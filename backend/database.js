const mongoose = require("mongoose");

const DBConnect = () => {
  const DB_URL = process.env.DB_URL;
  // Database connection
  mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", () => {
    console.log("DB connected...");
  });
};

module.exports = DBConnect;
