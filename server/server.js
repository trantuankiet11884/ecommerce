const express = require("express");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", (req, res) => res.send("hello world"));

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
