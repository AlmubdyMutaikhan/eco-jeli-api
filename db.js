const mongoose = require('mongoose');
const DB_URI = `mongodb+srv://admin:tU1tKDAhbQgSyrL3@ecojelicluster.ao1vbyd.mongodb.net/?retryWrites=true&w=majority`;

const connectDB = async () => {
    mongoose.connect(DB_URI,
        {
        useNewUrlParser: true,
        useUnifiedTopology: true
        }
    ).then(res => {
        console.log('DB is successfully estabilished!')
        return true;
    })
    .catch(err => {
        console.log(err);
        return false;
    })
}

module.exports = {
    connectDB
}
