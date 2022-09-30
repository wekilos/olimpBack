var Sequelize = require("sequelize"); 
var sequelize = require("../../config/db");
const mailSend = require("../functions/mailSend");
const OrderDocs = require("../models/orderDocs");
const Orders = require("../models/orders");
const fs = require('fs');

const orders_tb = async (req, res) => {
    const response = await sequelize
      .sync()
      .then(function () {
        const data = Orders.findAll();
        console.log("connection connected");
        return data;
      })
      .catch((err) => {
        return err; 
      });
    res.json(response);
  };


  const createOrder = async(req,res)=>{
    const { fname, lname, message,userId } = req.body;
    const { files } = req.files;
    console.log(files);
    if(files.length>0){
        Orders.create({
            fname,
            lname,
            message,
            status:1,
            status_tm:"Garaşylýar",
            status_ru:"Garaşylýar",
            status_en:"Garaşylýar",
            UserId:userId,
            active:true,
            deleted:false
        }).then((data)=>{
            files?.map((file,i)=>{
                let randomNumber = Math.floor(Math.random() * 999999999999);
                let fileDirection = `./uploads/`+randomNumber+`${file.name}`;
                fs.writeFile(fileDirection, file.data, function(err) { console.log(err) });
                OrderDocs.create({
                    title:file.name,
                    fileName:fileDirection,
                    OrderId:data.id,
                    active:true,
                    deleted:false,
                }).then(()=>{
                    i+1 == files.length && res.json("Succesfully!")
                }).catch((err)=>{
                    console.log(err);
                })
            })
        }).catch((err)=>{
            console.log(err);
        })
        
        
    }else{
        res.json("file yuklenmedi!")
    }

}


  exports.orders_tb = orders_tb;
  exports.createOrder = createOrder;