var Sequelize = require("sequelize");
var fetch = require("node-fetch");
var sequelize = require("../../config/db");
const Op = Sequelize.Op;
const fs = require("fs");
const Basleshik = require("../models/basleshik");
const Sorag = require("../models/soraglar");
const Jogap = require("../models/jogaplar");
const User_Basleshik = require("../models/user_basleshik");
const Users = require("../models/users");

const user_basleshik_tb = async (req, res) => {
    const response = await sequelize
        .sync()
        .then(function () {
            const data = User_Basleshik.findAll();
            console.log("connection connected");
            return data;
        })
        .catch((err) => {
            return err;
        });
    res.json(response);
};

const create = (req, res) => {
    const { score, description, UserId, BasleshikId } = req.body;

    User_Basleshik.create({
        score,
        description,
        UserId,
        BasleshikId,
        active: true,
        deleted: false,
    })
        .then((data) => {
            res.json("created!");
        })
        .catch((err) => {
            console.log(err);
            res.json({ err: err });
        });
};

const getAll = (req, res) => {
    const { active } = req.query;
    User_Basleshik.findAll({
        include: [
            {
                model: Users,
                attributes: [
                    "id",
                    "fname",
                    "phoneNumber",
                    "email",
                    "companyName",
                    "active",
                    "deleted",
                ],
            },
            {
                model: Basleshik,
                attributes: [
                    "id",
                    "name",
                    "description",
                    "time",
                    "active",
                    "deleted",
                ],
            },
        ],
        where: {
            active: active,
        },
        order: [["id", "DESC"]],
    })
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            console.log(err);
            res.json({ err: err });
        });
};

const getOne = (req, res) => {
    User_Basleshik.findOne({
        include: [
            {
                model: Users,
                attributes: [
                    "id",
                    "fname",
                    "phoneNumber",
                    "email",
                    "companyName",
                    "active",
                    "deleted",
                ],
            },
            {
                model: Basleshik,
                attributes: [
                    "id",
                    "name",
                    "description",
                    "time",
                    "active",
                    "deleted",
                ],
            },
        ],
        where: {
            id: req.params.id,
        },
    })
        .then((data) => {
            if (data) {
                res.json(data);
            } else {
                res.json("Maglumat Yok!");
            }
        })
        .catch((err) => {
            console.log(err);
            res.json({ err: err });
        });
};

const update = (req, res) => {
    const { score, description, UserId, BasleshikId, id } = req.body;

    User_Basleshik.update(
        {
            score,
            description,
            UserId,
            BasleshikId,
        },
        {
            where: {
                id: id,
            },
        }
    )
        .then((data) => {
            res.json("updated!");
        })
        .catch((err) => {
            console.log(err);
            res.json({ err: err });
        });
};

const DisActiveted = async (req, res) => {
    const { id } = req.params;
    const data = await User_Basleshik.findOne({ where: { id: id } });
    if (!data) {
        res.send("BU ID boyuncha data yok!");
    } else {
        User_Basleshik.update(
            {
                active: false,
            },
            {
                where: {
                    id: id,
                },
            }
        )
            .then((data) => {
                res.send("Dis Activeted!");
            })
            .catch((err) => {
                console.log(err);
            });
    }
};
const Activeted = async (req, res) => {
    const { id } = req.params;
    const data = await User_Basleshik.findOne({ where: { id: id } });
    if (!data) {
        res.send("BU ID boyuncha data yok!");
    } else {
        User_Basleshik.update(
            {
                active: true,
            },
            {
                where: {
                    id: id,
                },
            }
        )
            .then((data) => {
                res.send("Dis Activeted!");
            })
            .catch((err) => {
                console.log(err);
            });
    }
};
const Delete = async (req, res) => {
    let data = await User_Basleshik.findOne({ where: { id: req.params.id } });

    if (data) {
        User_Basleshik.destroy({
            where: {
                id: req.params.id,
            },
        })
            .then(() => {
                res.json("deleted!");
            })
            .catch((err) => {
                console.log(err);
                res.json({ err: err });
            });
    } else {
        res.json("Bu ID boyuncha maglumat tapylmady!");
    }
};

exports.user_basleshik_tb = user_basleshik_tb;
exports.create = create;
exports.getAll = getAll;
exports.getOne = getOne;
exports.DisActiveted = DisActiveted;
exports.Activeted = Activeted;
exports.update = update;
exports.Delete = Delete;
