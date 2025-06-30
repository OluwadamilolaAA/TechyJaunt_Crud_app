const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async() => {
    await mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('MongoDB connected successfully');
    }).catch((error) => {
        console.log('MongoDb failed to connect:', error.message )
        process.exit(1)
    })
}

module.exports = connectDB