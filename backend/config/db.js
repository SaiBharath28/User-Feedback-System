const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Debug log to verify environment variable
    console.log('Connecting to MongoDB with URI:', process.env.MONGODB_URI);

    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is missing in .env file');
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📁 Database: ${conn.connection.name}`);
    
  } catch (error) {
    console.error('\n❌ MongoDB Connection Failed:');
    console.error(`Error: ${error.message}`);
    
    if (error.name === 'MongooseServerSelectionError') {
      console.error('\n👉 Solutions to try:');
      console.error('1. Ensure MongoDB service is running:');
      console.error('   - Windows: Run "net start MongoDB" as Administrator');
      console.error('   - Mac/Linux: Run "sudo systemctl start mongod"');
      console.error('2. Verify MongoDB URI in .env file is correct');
      console.error('3. Check firewall settings if connection times out');
    }
    
    process.exit(1);
  }
};

module.exports = connectDB;