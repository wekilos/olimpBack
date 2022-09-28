// import sequelize 
const { CHAR, INTEGER } = require("sequelize");
var Sequelize = require("sequelize");

//importing connection database
var sequelize = require("../../config/db");

var News = sequelize.define(
    "News",
    {
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
        title_tm:Sequelize.STRING,
        title_en:Sequelize.STRING,
        title_ru:Sequelize.STRING,
        text_tm:Sequelize.TEXT,
        text_en:Sequelize.TEXT,
        text_ru:Sequelize.TEXT,
        picture:Sequelize.STRING,
        active:{type:Sequelize.BOOLEAN,default:true},
        deleted:{type:Sequelize.BOOLEAN,default:false},
    },
    {
        timestamps: true,
    }
);





module.exports = News;