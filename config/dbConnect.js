const mongoose = require("mongoose");
const dbConnect = () => {
  try {
    const conn = mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database Connected Successfully");
  } catch (error) {
    console.log("Error connecting to database");
  }
};
module.exports = dbConnect;
