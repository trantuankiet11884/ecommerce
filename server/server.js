const express = require("express");
const connectDB = require("./config/db.js");
const initRoutes = require("./routes/index.js");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDB();
initRoutes(app);

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
