const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect(process.env.MONOGO_URI)

module.exports = connectDB;
