const express = require('express');
const morgan = require('morgan');
const path = require('path');
const favicon = require('serve-favicon');
const moment = require('moment');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const userSeed = require('./seeds/UserSeeder');
const dashboardRoutes = require('./routes/dashboard');
const webRoutes = require('./routes/web');

require('dotenv').config();

const app = express();

app.locals.moment = moment;

// view folder setup
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));
app.use(express.static(path.join(__dirname, 'public')));
//DB CONNECT
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
userSeed();

app.use(favicon(__dirname + '/public/favicon.png'));
app.use('/', webRoutes);
app.use('/dashboard', dashboardRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
// no stacktraces leaked to user unless in development environment
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: (app.get('env') === 'development') ? err : {}
    });
});

module.exports = app;
