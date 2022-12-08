const mongoose = require('mongoose');

const baseName = 'mind-blog';
const CONNECTION_STR = `mongodb://localhost:27017/${baseName}`

module.exports = async (app) => {
    try {
        await mongoose.connect(CONNECTION_STR, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log('Database connected successfully.')
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}