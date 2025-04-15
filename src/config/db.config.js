const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB đã được kết nối")
  } catch (err) {
    console.log(`MongDB chưa được kết nối: ${err}`)
  }
}

module.exports = connectDB;