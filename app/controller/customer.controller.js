const customerModel = require('../database/models/customer.model');
class Customer{
    static register = async (req,res)=>{
        try{
            const customer = new customerModel(req.body);
            await customer.save();
            res.send({apiStatus:true,message:'registered',data:customer});
        }catch(e){
            res.send({apiStatus:false,message:e.message,data:e});
        }
    }
    static login = async (req,res)=>{
        try{
            const customer = await customerModel.login(req.body.username,req.body.password);
            const token = await customer.generateToken();
            res.send({apiStatus:true,message:'logged successfully',data:customer,token});
        }catch(e){
            res.send({apiStatus:false,message:e.message,data:e});
        }
    }
    static viewProfile = (req,res)=>{
        res.send({
            apiStatus:true,
            message:'return customer',
            data:req.customer
        });
    }
    static editProfile = async (req,res)=>{
        try{
            const customer = req.customer;
            for(let prop in req.body){
                customer[prop] = req.body[prop];
            }
            await customer.save();
            res.send({apiStatus:true,message:'updated successfully',data:customer});
        }catch(e){
            res.send({apiStatus:false,message:e.message,data:e});
        }
    }
    static logout = async (req,res)=>{
        try{
            const customer = req.customer;
            const token = req.header('auth');
            const allTokens = customer.tokens;
            const index = allTokens.findIndex((t)=> t.token == token);
            customer.tokens.splice(index,1);
            await customer.save();
            res.send({apiStatus:true,message:'logged out successfully',data:customer});
        }catch(e){
            res.send({apiStatus:false,message:e.message,data:e});
        }
    }
    static logoutAll = async (req,res)=>{
        try{
            const customer = req.customer;
            customer.tokens = [];
            await customer.save();
            res.send({apiStatus:true,message:'logout all',data:customer});
        }catch(e){
            res.send({apiStatus:false,message:e.message,data:e});
        }
    }
    static addToBalance = async (req,res)=>{
        try{
            const customer = req.customer;
            customer.balance += Number(req.body.balance);
            await customer.save();
            res.send({apiStatus:true,message:'added to balance',data:customer});
        }catch(e){
            res.send({apiStatus:false,message:e.message,data:e});
        }
    }
    static withDraw = async (req,res)=>{
        try{
            const customer = req.customer;
            customer.balance -= Number(req.body.balance);
            await customer.save();
            res.send({apiStatus:true,message:'withdraw',data:customer});
        }catch(e){
            res.send({apiStatus:false,message:e.message,data:e});
        }
    }
}

module.exports = Customer;