const mongoose = require('mongoose');

// > Connect to database
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ServiceTodo', { useNewUrlParser: true });

module.exports = { mongoose };