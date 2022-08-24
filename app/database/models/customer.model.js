const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');

const customerSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        minlength:6,
    },
    name:{
        type:String,
        required:true,
        minlength:3,
    },
    balance:{
        type:Number,
        required:true,
    },
    address:{
        addressType:{
            type:String,
            required:true,
        },
        addressDetails:{
            type:String,
            required:true,
        }
    },
    tokens:[
        {
            token:{
                type:String,
            }
        }
    ]

},{
    timestamps:true,
});

customerSchema.methods.toJSON = function(){
    const deleted = ["password","__v","tokens"];
    const userData = this.toObject();
    deleted.forEach((d)=> delete userData[d]);
    return userData;
}

customerSchema.pre('save',async function(){
    const userData = this;
    if(userData.isModified('password')){
        userData.password = await bcryptjs.hash(userData.password,12);
    }
});

customerSchema.statics.login = async (username,password)=>{
    const customer = await customerModel.findOne({username});
    if(!customer) throw new Error('invalid username or password');
    const isValid = await bcryptjs.compare(password,customer.password);
    if(!isValid) throw new Error('invalid username or password');
    return customer;
}

customerSchema.methods.generateToken = async function(){
    const customer = this;
    const token = jsonwebtoken.sign({_id:customer._id},process.env.JWTKEY);
    customer.tokens = customer.tokens.concat({token});
    await customer.save();
    return token;
}

const customerModel = mongoose.model('Customer',customerSchema);

module.exports = customerModel;