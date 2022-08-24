const express = require('express');
const app = express();
const customerRouter = require('./routes/customer.routes');
require('./database/connect');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/customers',customerRouter);

module.exports = app;