// import sequelize 
const { CHAR, INTEGER } = require("sequelize");
var Sequelize = require("sequelize");

//importing connection database
var sequelize = require("../../config/db");

var UserCodes = sequelize.define(
    "UserCodes",
    {
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
       code:Sequelize.BIGINT,
       email:Sequelize.STRING,
    },
    {
        timestamps: true,
    }
);





module.exports = UserCodes;