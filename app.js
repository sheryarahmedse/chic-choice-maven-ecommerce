const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const product = require('./routes/routeProducts');
const users = require('./routes/routeUser');
const orders = require('./routes/routeOrder');
const payment = require('./routes/routePayment');
const { errorHanlder } = require('./middleware/errormiddleware');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const app = express();

app.use(cors({ origin: `${process.env.REACT_APP_BASE_URL}`, credentials: true }));
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ limit: '25mb', extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);
app.use(fileUpload());

app.use('/api/v1', product);
app.use('/api/v1', users);
app.use('/api/v1', orders);
app.use('/api/v1', payment);
app.use(errorHanlder);
//static client side

app.use(express.static(path.join(__dirname, './client/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './client/build/index.html'));
});

module.exports = app;
