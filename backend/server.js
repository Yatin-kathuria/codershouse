require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const DBConnect = require("./database");

const corsOption = {
  origin: ["http://localhost:3000"],
};
app.use(cors(corsOption));
// routes
const authRoutes = require("./routes/auth");

const PORT = process.env.PORT || 5500;
DBConnect();

app.use(express.json());
app.use(authRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
