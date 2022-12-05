// import sequelize
const { CHAR, INTEGER } = require("sequelize");
var Sequelize = require("sequelize");

//importing connection database
var sequelize = require("../../config/db");

var Basleshik = sequelize.define(
    "Basleshik",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: Sequelize.STRING,
        description: Sequelize.STRING,
        time: Sequelize.TIME,
        active: { type: Sequelize.BOOLEAN, default: true },
        deleted: { type: Sequelize.BOOLEAN, default: false },
    },
    {
        timestamps: true,
    }
);

module.exports = Basleshik;
