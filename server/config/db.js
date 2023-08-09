const { default: mongoose } = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    if (conn.connection.readyState === 1) console.log("DB connect successly");
    else console.log("DB connecing ");
  } catch (error) {
    console.log(`Connect error : ${error}`);
  }
};

module.exports = connectDB;
