// models/registers.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt=require("bcryptjs");//for hashing
const jwt=require("jsonwebtoken");
const registerSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    confirmpassword: {
        type: String,
        required: true
    },
    phone: {
        type: String, // Changed from Number to String to avoid issues with phone numbers
        required: true,
        unique: true
    },
    gender: {
        type: String,
        required: true
    },
    tokens:[{
        token:{
            type: String,
            required: true
        }
    }]
});
//generating token
registerSchema.methods.generateAuthTocken=async function(){
    try{
        //console.log(this._id);
        const chandutocken=jwt.sign({_id:this._id.toString()},"thiswillbeofanythingwhichisminimum32charcter");
        this.tokens=this.tokens.concat({token:chandutocken});
        //console.log(chandutocken);
        await this.save();
        return chandutocken;
    }catch(err){
        res.send("the error part"+err);
        console.log("the error part"+err);
    }
}
//converting password into hash
registerSchema.pre("save",async function (next){
    //console.log(`the current passord is ${this.password}`);//yaha per wo password show karega jo tum dale ho
    if(this.isModified("password")){
        this.password=await bcrypt.hash(this.password,10);
        //console.log(`the modefied passord is ${this.password}`);//encrypted password
       this.confirmpassword=await bcrypt.hash(this.password,10);
    }
    next();
})
module.exports = mongoose.model('Register', registerSchema);