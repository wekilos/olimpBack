// import sequelize 
const { CHAR, INTEGER } = require("sequelize");
var Sequelize = require("sequelize");

//importing connection database
var sequelize = require("../../config/db");
const Orders = require("./orders");

var OrderDocs = sequelize.define(
    "OrderDoc",
    {
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
        title:Sequelize.STRING,
        fileName:Sequelize.STRING,
        active:{type:Sequelize.BOOLEAN,default:true},
        deleted:{type:Sequelize.BOOLEAN,default:false},
    },
    {
        timestamps: true,
    }
);


OrderDocs.belongsTo(Orders);
Orders.hasMany(OrderDocs);


module.exports = OrderDocs;