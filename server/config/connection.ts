const mongoose: any = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/gcpm_db', {});

module.exports = mongoose.connection;