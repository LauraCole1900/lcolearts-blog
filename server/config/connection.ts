const mongoose: any = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/lcoleartsblog_db', {});

module.exports = mongoose.connection;