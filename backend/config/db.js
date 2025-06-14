const mongoose = require('mongoose');

const connectDB = async () =>{
    const conn = await mongoose.connect(process.env.MONGO_URI);
    try {
        console.log(`MongoDB Connected Successfully : ${conn.connection.host}`);
    }
    catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

module.exports = connectDB;