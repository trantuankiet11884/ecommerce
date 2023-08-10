const jwt = require("jsonwebtoken");

const generateAT = (uid, role) =>
  jwt.sign({ id: uid, role }, process.env.JWT_SECRET, { expiresIn: "2d" });

const generateRT = (uid) =>
  jwt.sign({ id: uid }, process.env.JWT_SECRET, { expiresIn: "7d" });

module.exports = {
  generateAT,
  generateRT,
};
