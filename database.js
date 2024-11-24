const mongoose = require('mongoose');

const connectDB = async () => {
  const conn = await mongoose.connect('mongodb+srv://batol:batol123@cluster0.jzw5z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
  console.log(`mongo connected: ${conn.connection.host}`);
};

module.exports = connectDB;
