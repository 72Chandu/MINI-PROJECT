const express=require("express");
const port=process.env.PORT ||3000; //jahi par v ye host hoga wgai pe isko port miljayega
const app=express();
require("./db/conn");
const path=require("path");
const hbs=require("hbs");
const Register=require("./models/registers");
const { error } = require("console");
const bcrypt=require("bcryptjs");//npm i bcryptjs->for hashing
// const securePassword=async (password)=>{
//     const passwordHash=await bcrypt.hash(password,10);//more round more secure
// }
const jwt=require("jsonwebtoken");
app.use(express.json());
app.use(express.urlencoded({extended:false}));

const static_path=path.join(__dirname, "../public");//console.log(path.join(__dirname, "../public"))
app.use(express.static(static_path));

const templates_path=path.join(__dirname, "../templates/views");
app.set("view engine","hbs")
app.set("views",templates_path);

const patial_path=path.join(__dirname, "../templates/partials");
hbs.registerPartials(patial_path);

//hbs fils ko server nahi chala pata hai so, add hbs in json file in script->dev me now you should run the nodemon as ->npm run dev 
app.get("/",(req,res)=>{
    res.render("index");
});
app.get("/register",(req,res)=>{
    res.render("register");
});
app.post("/register",async (req,res)=>{//creating a new user in our database
    try{
        const password=req.body.password;
        const cpassword=req.body.confirmpassword;
        if(password===cpassword){//then save to database
            const registerEmployee=new Register({
                firstname: req.body.firstname,
                lastname:req.body.lastname,
                email:req.body.email,
                password:req.body.password,
                confirmpassword:req.body.confirmpassword,
                phone:req.body.phone,
                gender:req.body.gender
            });
            //console.log("the sucess part"+registerEmployee);
            const tocken=await registerEmployee.generateAuthTocken();//define in register.js
            //password hash -> yahi pe pre methode call hoga which is inside register.js
            const registered=await registerEmployee.save();
            res.status(201).render("index");
        }else{
            res.send("password are not matching")
        }
    }
    catch(error){
        res.status(400).send(error);
    }
});

app.get("/login",(req,res)=>{
    res.render("login");
});

app.post("/login",async (req,res)=>{
   try {
    const email=req.body.email;
    const password=req.body.password;
    const useremail=await Register.findOne({email:email});//database se extract kiye hai
    const isMatch=bcrypt.compare(password,useremail.password); //compare the user password and database password. return boolean value
    if(isMatch){
        res.status(201).render("index");
    }else{
        res.send("password are not matching");
    }
   } catch (error) {
    res.status(400).send("invalid email");
   }
});
app.listen(port ,()=>{
    console.log(`serving is running at port no ${port}`)
});
/*
Encryption is for securely transmitting data by converting it into an unreadable format, with the possibility of reversing the process (decrypting).
Hashing is for verifying data integrity by converting data into a fixed-size hash, which cannot be reversed to retrieve the original data.
*/