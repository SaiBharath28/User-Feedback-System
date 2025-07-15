const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Check for required env variable
    const mongoURI = process.env.MONGODB_URI;
    if (!mongoURI) {
      throw new Error('⚠️ MONGODB_URI is missing in the .env file');
    }

    // Optional: strict query to avoid deprecation warnings
    mongoose.set("strictQuery", true);

    // Attempt MongoDB connection
    console.log('📡 Connecting to MongoDB...');
    const conn = await mongoose.connect(mongoURI);

    // Successful connection
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📁 Database Name: ${conn.connection.name}`);
    
  } catch (error) {
    // Log failure message
    console.error('\n❌ MongoDB Connection Failed!');
    console.error(`🔍 Error: ${error.message}\n`);

    // Provide actionable hints
    if (error.name === 'MongooseServerSelectionError') {
      console.error('👉 Troubleshooting Tips:');
      console.error('• Is MongoDB running?');
      console.error('• Is your MongoDB URI correct and accessible?');
      console.error('• If using MongoDB Atlas, is your IP whitelisted?');
      console.error('• Are you connected to the internet?');
    }

    // Exit the process to prevent app from starting
    process.exit(1);
  }
};

module.exports = connectDB;
