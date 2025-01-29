const { default: mongoose } = require("mongoose");
require("dotenv").config();

const dbConnect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL || "");
    if (conn) {
      console.log("Database Connected Successfully");
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = dbConnect;
