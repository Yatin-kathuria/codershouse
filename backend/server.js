require("dotenv").config();
const express = require("express");
const app = express();
const DBConnect = require("./database");

// routes
const authRoutes = require("./routes/auth");

const PORT = process.env.PORT || 5500;
DBConnect();

app.use(express.json());
app.use(authRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
