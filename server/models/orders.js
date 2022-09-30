// import sequelize 
const { CHAR, INTEGER } = require("sequelize");
var Sequelize = require("sequelize");

//importing connection database
var sequelize = require("../../config/db");
const Users = require("./users");

var Orders = sequelize.define(
    "Order",
    {
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
        fname:Sequelize.STRING,
        lname:Sequelize.STRING,
        message:Sequelize.TEXT,
        code:Sequelize.CHAR,
        time:Sequelize.DATE,
        status:Sequelize.INTEGER,
        status_tm:Sequelize.STRING,
        status_ru:Sequelize.STRING,
        status_en:Sequelize.STRING,
        payBefore:Sequelize.DOUBLE,
        payBeforeType:Sequelize.STRING,
        payment:Sequelize.DOUBLE,
        peymentType:Sequelize.STRING,
        active:{type:Sequelize.BOOLEAN,default:true},
        deleted:{type:Sequelize.BOOLEAN,default:false},
    },
    {
        timestamps: true,
    }
);

Orders.belongsTo(Users);
Users.hasMany(Orders);




module.exports = Orders;