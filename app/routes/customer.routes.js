const express = require('express');
const customerRouter = express.Router();
const Customer = require('../controller/customer.controller');
const auth = require('../middleware/auth.middleware');

customerRouter.post('/register',Customer.register);
customerRouter.post('/login',Customer.login);

customerRouter.get('/viewProfile',auth,Customer.viewProfile);
customerRouter.post('/editProfile',auth,Customer.editProfile);
customerRouter.get('/logout',auth,Customer.logout);
customerRouter.get('/logoutAll',auth,Customer.logoutAll);
customerRouter.post('/addToBalance',auth,Customer.addToBalance);
customerRouter.post('/withdraw',auth,Customer.withDraw);

module.exports = customerRouter;