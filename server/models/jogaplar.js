// import sequelize
const { CHAR, INTEGER } = require("sequelize");
var Sequelize = require("sequelize");

//importing connection database
var sequelize = require("../../config/db");
const Sorag = require("./soraglar");

var Jogap = sequelize.define(
    "Jogap",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        jogap: Sequelize.TEXT,
        jogapimg: Sequelize.TEXT,
        isTrue: { type: Sequelize.BOOLEAN, default: false },
        active: { type: Sequelize.BOOLEAN, default: true },
        deleted: { type: Sequelize.BOOLEAN, default: false },
    },
    {
        timestamps: true,
    }
);

Jogap.belongsTo(Sorag);
Sorag.hasMany(Jogap);

module.exports = Jogap;
