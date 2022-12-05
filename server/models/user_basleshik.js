// import sequelize
const { CHAR, INTEGER } = require("sequelize");
var Sequelize = require("sequelize");

//importing connection database
var sequelize = require("../../config/db");
const Basleshik = require("./basleshik");
const Users = require("./users");
var User_Basleshik = sequelize.define(
    "User_Basleshik",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        score: Sequelize.STRING,
        description: Sequelize.STRING,
        active: { type: Sequelize.BOOLEAN, default: true },
        deleted: { type: Sequelize.BOOLEAN, default: false },
    },
    {
        timestamps: true,
    }
);

Users.belongsToMany(Basleshik, { through: User_Basleshik });
Basleshik.belongsToMany(Users, { through: User_Basleshik });

Users.hasMany(User_Basleshik);
User_Basleshik.belongsTo(Users);
Basleshik.hasMany(User_Basleshik);
User_Basleshik.belongsTo(Basleshik);

module.exports = User_Basleshik;
