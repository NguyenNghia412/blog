require('dotenv').config();
const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser');
const passport = require('passport');
const passportLocal = require('./config/local.passport');
const { default: mongoose } = require('mongoose');
const morgan = require('morgan');
const env = require('./config/env');
const jwtPassport = require('./config/jwt.passport');

const app = express();
const port = env.PORT;
const connectionString = env.CONNECTION_STRING;

// body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// log morgan
app.use(morgan('dev'));

// connect db
mongoose.connect(connectionString).then(res => {
    console.log('connected mongodb');
}).catch(err => {
    console.error('connect mongodb error: ', err);
})

// passport
passport.use(passportLocal);
passport.use(jwtPassport);
app.use(passport.initialize());

// route
app.use(routes.healthRoutes);
app.use(routes.blogRoutes);
app.use(routes.categoryRoutes);
app.use(routes.userRoutes);

// index
app.get('/', (req, res) => {
    res.end('blog-api')
});

// error handle
app.use((err, req, res, next) => {
    console.error('ERROR => ', err.stack);
    res.status(500).json(err);
})

// run
app.listen(port, () => {
    console.log(`listening on localhost: ${port}`);
})