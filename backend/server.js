require("dotenv").config();
const express = require("express");
const app = express();

// routes
const authRoutes = require("./routes/auth");

const PORT = process.env.PORT || 5500;

app.use(express.json());
app.use(authRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
