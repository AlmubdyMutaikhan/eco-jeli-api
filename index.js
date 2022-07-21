const express = require('express');
const app = express();
const DB = require('./db');
const PORT = process.env.PORT || 3001;
const morgan = require('morgan');
const AuthRoute = require('./routes/auth.route');
const ClubRoute = require('./routes/club.route');
const bodyParser = require('body-parser');
const cors = require('cors');
DB.connectDB()
    .then(status => {
        app.listen(PORT, () => {
            console.log('server is on PORT 3001!');
        })
    })
    .catch(err => {
        console.log(err);
    })


app.use(cors({
        origin : '*'
}));


app.use(bodyParser.json());
app.use(morgan('dev'));
app.use('/auth', AuthRoute);
app.use('/club', ClubRoute);