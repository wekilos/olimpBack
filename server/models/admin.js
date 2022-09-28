// import sequelize 
const { CHAR, INTEGER } = require("sequelize");
var Sequelize = require("sequelize");

//importing connection database
var sequelize = require("../../config/db");
var Admin = sequelize.define(
    "Admin",
    {
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
        fname:Sequelize.STRING,
        lastname:Sequelize.STRING,
        phoneNumber:Sequelize.BIGINT,
        email:Sequelize.STRING,
        password:Sequelize.STRING,
        admin:{type:Sequelize.BOOLEAN,default:false},
        subAdmin:{type:Sequelize.BOOLEAN,default:false},
        operator:{type:Sequelize.BOOLEAN,default:true,},
        active:{type:Sequelize.BOOLEAN,default:true},
        deleted:{type:Sequelize.BOOLEAN,default:false},
    },
    {
        timestamps: true,
    }
);




module.exports = Admin;