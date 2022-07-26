const express = require('express');
const app = express();
const DB = require('./db');
const PORT = process.env.PORT || 3001;
const morgan = require('morgan');
const AuthRoute = require('./routes/auth.route');
const ClubRoute = require('./routes/club.route');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoute = require('./routes/user.route');
const blogRoute = require('./routes/blog.route');
const eventRoute = require('./routes/event.route');
const TestRoute = require('./routes/test.route');
const reversoRoute = require('./routes/reverso.route');

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
app.use('/user', userRoute);
app.use('/blog', blogRoute);
app.use('/event', eventRoute);
app.use('/funcode', TestRoute);
app.use('/reverso', reversoRoute);
// good luck on testing!