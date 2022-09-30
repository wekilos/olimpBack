var Sequelize = require("sequelize"); 
var sequelize = require("../../config/db");
const mailSend = require("../functions/mailSend");
const OrderDocs = require("../models/orderDocs");
const Orders = require("../models/orders");

const orderDocs_tb = async (req, res) => {
    const response = await sequelize
      .sync()
      .then(function () {
        const data = OrderDocs.findAll();
        console.log("connection connected");
        return data;
      })
      .catch((err) => {
        return err;
      });
    res.json(response);
  };






  exports.orderDocs_tb = orderDocs_tb;