require('newrelic');
require('./lib/init/init_app.js');

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const cors = require('cors');
const routes = require('./routes/index');
// const users = require('./routes/users');
const apiRouter = require('./routes/api_router');

const app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
// app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// maxAge: 600000 - 10 minutes
app.use(express.static(path.join(__dirname, 'public'), {maxAge: 600000}));
app.use(express.static(path.join(__dirname, 'dist')));

// remove this for security when deploying to prod
app.use(cors({origin:true,credentials: true}));

app.use('/', routes);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
