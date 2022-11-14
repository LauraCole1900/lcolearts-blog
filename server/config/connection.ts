const mongoose: any = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1/lcoleartsblog_db', {});

module.exports = mongoose.connection;