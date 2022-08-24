const jsonwebtoken = require('jsonwebtoken');
const customerModel = require('../database/models/customer.model');
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzA1ZTMwYzZhMGMwODAzNjlhNzliNzgiLCJpYXQiOjE2NjEzMzMzNDF9.Mhgf2Xc1sKR7xl_pXiMjmJGEGxn1CN_75D0qFXCh3Ec
//6305e30c6a0c080369a79b78
const auth = async (req,res,next)=>{
    try{
        const token = req.header('auth');
        const decoded = jsonwebtoken.verify(token,process.env.JWTKEY);
        const customer = await customerModel.findOne({_id:decoded._id,"tokens.token":token});
        if(!customer) throw new Error('unauth');
        req.customer = customer;
        req.token = token;
        next();
    }catch(e){
        res.send({apiStatus:false,message:e.message,data:e});
    }
}

module.exports = auth;