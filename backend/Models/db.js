const mongoose = require('mongoose');

const mongo_url = process.env.MONGO_URL || 'mongodb://localhost:27017/expense_tracker';

mongoose.connect(mongo_url, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 10000,
})
    .then(() => {
        console.log('✅ MongoDB Connected...');
    }).catch((err) => {
        console.error('❌ MongoDB Connection Error: ', err.message);
        console.log('⚠️  Server will continue running. Database will reconnect automatically.');
    })

// Handle connection events
mongoose.connection.on('disconnected', () => {
    console.warn('⚠️  MongoDB disconnected');
});

mongoose.connection.on('reconnected', () => {
    console.log('✅ MongoDB reconnected');
});