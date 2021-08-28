require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const DBConnect = require("./database");
const cookieParser = require("cookie-parser");

app.use(cookieParser());
const corsOption = {
  origin: ["http://localhost:3000"],
  credentials: true,
};
app.use(cors(corsOption));
app.use("/storage", express.static("storage"));
// routes
const routes = require("./routes");

const PORT = process.env.PORT || 5500;
DBConnect();

app.use(express.json({ limit: "8mb" }));
app.use(routes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
