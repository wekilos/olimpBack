// import sequelize
const { CHAR, INTEGER } = require("sequelize");
var Sequelize = require("sequelize");

//importing connection database
var sequelize = require("../../config/db");
const Basleshik = require("./basleshik");

var Sorag = sequelize.define(
    "Sorag",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        sorag: Sequelize.TEXT,
        soragimg: Sequelize.TEXT,
        active: { type: Sequelize.BOOLEAN, default: true },
        deleted: { type: Sequelize.BOOLEAN, default: false },
    },
    {
        timestamps: true,
    }
);

Sorag.belongsTo(Basleshik);
Basleshik.hasMany(Sorag);

module.exports = Sorag;
