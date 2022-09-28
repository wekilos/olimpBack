var Sequelize = require("sequelize");
var fetch = require('node-fetch');
var sequelize = require("../../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Func = require("../functions/functions");
const Admin = require("../models/admin");
const Op = Sequelize.Op;

 const admin_tb = async (req, res) => {
    const response = await sequelize
      .sync()
      .then(function () {
        const data = Admin.findAll();
        console.log("connection connected");
        return data;
      })
      .catch((err) => {
        return err;
        console.log("connection connected");
      });
    res.json(response);
  };


  const create = async (req, res) => {
  
    const {fname,
      lastname,
      phoneNumber,
      email,
      password,
      admin,
      subAdmin,
      operator,} = req.body;

    const existUser = await Admin.findOne({
      where:{
        email:email,
      }
    });

    const salt = bcrypt.genSaltSync();
    bcrypt.hash(password, salt, (err, hashpassword) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: "Error", err: err });
      } else {
        
    if(existUser){
      let text = "Bu emailde ulanyjy onden bar.";
      res.json({
        msg:text
      })
    }else{
      Admin.create({
        fname,
        lastname,
        phoneNumber,
        email,
        password:hashpassword,
        admin,
        subAdmin,
        operator,
        active:true,
        deleted:false,
      }).then(async(data) => {
        
        let role = {
          admin:data.admin,
          subAdmin:data.subAdmin,
          operator:data.operator
        }
        jwt.sign(
          {
            id: data.id,
            role: role,
            name: data.fname,
            phoneNumber:data.phoneNumber,
            email:data.email
          },
          Func.Secret(),
          (err, token) => {
            res.status(200).json({
              msg: "Suссessfully",
              token: token,
              id:data.id,
              name: data.fname,
              role:role,
              phoneNumber:data.phoneNumber,
              email:data.email
            });
          }
        );
      }).catch((err) => {
        console.log(err);
        res.json("create user",err)
      });
    }


      }
    });

  };

  const login = async(req,res)=>{
  
  const { email, password } = req.body;

  
  
   await Admin.findOne({
   
    where: { email: email },
  }).then(async(data)=>{

    if(!data.active){
      res.json("You DisActived!");
      return 0;
    }
    let role = {
      admin:data.admin,
      subAdmin:data.subAdmin,
      operator:data.operator
    }

   if (await bcrypt.compare(password, data.password)) {
        const token = jwt.sign(
          {
            id: data.id,
            role: role,
            name: data.fname,
            phoneNumber:data.phoneNumber,
            email:data.email
          },
          Func.Secret()
        );
        
        return res.json({
          id: data.id,
          token: token,
          id:data.id,
          name: data.fname,
          role:role,
          phoneNumber:data.phoneNumber,
          email:data.email,  
          login: true,
        });
      } else {
        let text = "Siziň ulanyjy adyňyz ýa-da açar sözüňiz nädogry!";
        res.send({
          msg: text,
          login: false,
        });
      }
    
  }).catch((err)=> {
   let text = "Hasaba alynmadyk ulanyjy!";
    res.send({ login: false, msg: text,err:err });
  }) 

  }

  const update = async (req, res) => {
  
    const {fname,
      lastname,
      phoneNumber,
      id,
      password,
      admin,
      subAdmin,
      operator,} = req.body;

   
      const salt = bcrypt.genSaltSync();
      bcrypt.hash(password, salt, (err, hashpassword) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ msg: "Error", err: err });
        } else {

      Admin.update({
        fname,
        lastname,
        phoneNumber,
        password:hashpassword,
        admin,
        subAdmin,
        operator,
        active:true,
        deleted:false,
      },{
        where:{
          id:id
        }
      }).then(async(data) => {
        
      res.json("updated")
        
      }).catch((err) => {
        console.log(err);
        res.json("create user",err)
      });

    }
  });

    }


    const disActive = async(req,res)=>{
      const { id } = req.params;
      let user = await Admin.findOne({where:{id}});
      if(user){
        Admin.update({
            active:false
          },{
            where:{
              id
            }
          }).then(()=>{
            res.json("DisActived!")
          }).catch((err)=>{
            console.log(err);
            res.json({err:err});
          })
      }else{
        res.json("Bu Id Boyuncha Admin yok!")
      }
    }

    const Active = async(req,res)=>{
      const { id } = req.params;
      let user = await Admin.findOne({where:{id}});
      if(user){
        Admin.update({
            active:true
          },{
            where:{
              id
            }
          }).then(()=>{
            res.json("Actived!")
          }).catch((err)=>{
            console.log(err);
            res.json({err:err});
          })
      }else{
        res.json("Bu Id Boyuncha Admin yok!")
      }
    }



  


  exports.admin_tb=admin_tb;
  exports.create = create;
  exports.login = login;
  exports.update = update;
  exports.disActive = disActive;
  exports.Active = Active;