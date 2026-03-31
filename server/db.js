const mongoose = require('mongoose');

/**
 * Database Connection Utility
 * This handles the connection to MongoDB Atlas or local MongoDB.
 */
const connectDB = async () => {
  try {
    // 1. Check if the Environment Variable exists
    const mongoURI = process.env.MONGO_URI;
    
    if (!mongoURI) {
      console.error('Error: MONGODB_URI is not defined in environment variables.');
      process.exit(1);
    }

    // 2. Configure Mongoose Options
    const options = {
      autoIndex: true, // Build indexes (useful for dev, might disable in high-scale prod)
      connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
      socketTimeoutMS: 45000,  // Close sockets after 45 seconds of inactivity
    };

    // 3. Attempt Connection
    const conn = await mongoose.connect(mongoURI, options);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    
  } catch (error) {
    console.error(`❌ Error connecting to MongoDB: ${error.message}`);
    
    // Exit process with failure
    process.exit(1);
  }
};

// Handle connection events for better debugging
mongoose.connection.on('disconnected', () => {
  console.warn('⚠️ MongoDB disconnected. Attempting to reconnect...');
});

mongoose.connection.on('error', (err) => {
  console.error(`🔴 MongoDB connection error: ${err}`);
});

module.exports = connectDB;