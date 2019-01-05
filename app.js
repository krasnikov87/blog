express = require('express');
morgan = require('morgan');
path = require('path');
favicon = require('serve-favicon');
moment = require('moment');
bodyParser = require('body-parser');

const app = express();

app.locals.moment = moment;

// view folder setup
app.set('views', path.join(__dirname, 'views'));

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(favicon(__dirname + '/public/favicon.png'));
app.get('/', function (req, res) {
    res.send('hello, world!')
});

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
