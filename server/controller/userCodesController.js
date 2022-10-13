var Sequelize = require("sequelize");
var fetch = require('node-fetch');
var Users = require("../models/users");
var sequelize = require("../../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Func = require("../functions/functions");
const UserCodes = require("../models/userCodes");
const Op = Sequelize.Op;

const mailSend = require("../functions/mailSend");

 const userCodes_tb = async (req, res) => {
  console.log("requested")
    const response = await sequelize
      .sync()
      .then(function () {
        const data = UserCodes.findAll();
        console.log("connection connected");
        return data;
      })
      .catch((err) => {
        return err; 
      });
    res.json(response);
  };


  const SendCode = async(req,res)=>{
        const {email} = req.body;
        const userCode = UserCodes.findOne({where:{email:email}});
        if(userCode){
            UserCodes.destroy({
                where:{
                    email:email
                }
            }).then(()=>{
                let randomNumber = Math.floor(100000+Math.random() * 900000);
                UserCodes.create({
                    email:email,
                    code:randomNumber
                }).then(()=>{
                    let data = {
                        email:email,
                        subject:"Email verification code: "+randomNumber,
                        text:"Siziň Tassyklaýyş kodyňyz: "+randomNumber+"\n"+" Türkmen Demirýollary Express web saýtyna agza bolmak üçin ulanyp bilersiňiz!",
                    }
                
                    mailSend.SendMail(data);
                    res.send("Successfully!")
                }).catch((err)=>{
                    console.log(err);
                    res.json({error:err});
                })
            }).catch((err)=>{
                console.log(err);
                res.json({error:err});
            })
        }else{
            let randomNumber = Math.floor(100000+Math.random() * 900000);
                UserCodes.create({
                    email:email,
                    code:randomNumber
                }).then(()=>{
                    let data = {
                        email:email,
                        subject:"Email verification code: "+randomNumber,
                        text:"Siziň Tassyklaýyş kodyňyz: "+randomNumber+"\n"+" Türkmen Demirýollary Express web saýtyna agza bolmak üçin ulanyp bilersiňiz!",
                    }
                
                    mailSend.SendMail(data);
                    res.send("Successfully!")
                }).catch((err)=>{
                    console.log(err);
                    res.json({error:err});
                })
        }
  }

  const CheckCode = async(req,res)=>{
    const { code,email} = req.body;
    const usercode = await UserCodes.findOne({where:{
        [Op.and]:[{code:code},{email:email}]
    }});

    if(usercode){
        res.send(true);
    }else{
        res.send(false);
    }
  }

  exports.userCodes_tb = userCodes_tb;
  exports.SendCode = SendCode;
  exports.CheckCode = CheckCode;