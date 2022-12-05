// import sequelize
const { CHAR, INTEGER } = require("sequelize");
var Sequelize = require("sequelize");

//importing connection database
var sequelize = require("../../config/db");

var Users = sequelize.define(
    "Users",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        fname: Sequelize.STRING,
        phoneNumber: Sequelize.BIGINT,
        email: Sequelize.STRING,
        password: Sequelize.STRING,
        companyName: Sequelize.STRING,
        active: { type: Sequelize.BOOLEAN, default: true },
        deleted: { type: Sequelize.BOOLEAN, default: false },
    },
    {
        timestamps: true,
    }
);

module.exports = Users;
