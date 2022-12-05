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

const basleshik_tb = async (req, res) => {
    const response = await sequelize
        .sync()
        .then(function () {
            const data = Basleshik.findAll();
            console.log("connection connected");
            return data;
        })
        .catch((err) => {
            return err;
        });
    res.json(response);
};

const create = (req, res) => {
    const { name, description, time } = req.body;

    Basleshik.create({
        name,
        description,
        time,
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
    Basleshik.findAll({
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
    Basleshik.findOne({
        include: [
            {
                model: Sorag,
                attributes: [
                    "id",
                    "sorag",
                    "soragimg",
                    "active",
                    "deleted",
                    "BasleshikId",
                ],
                include: [
                    {
                        model: Jogap,
                        attributes: [
                            "id",
                            "jogap",
                            "jogapimg",
                            "isTrue",
                            "active",
                            "deleted",
                        ],
                    },
                ],
            },
            {
                model: User_Basleshik,
                attributes: ["id", "score", "description"],
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
    const { name, description, time, id } = req.body;

    Basleshik.update(
        {
            name,
            description,
            time,
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
    const basleshik = await Basleshik.findOne({ where: { id: id } });
    if (!basleshik) {
        res.send("BU ID boyuncha basleshik yok!");
    } else {
        Basleshik.update(
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
    const basleshik = await Basleshik.findOne({ where: { id: id } });
    if (!basleshik) {
        res.send("BU ID boyuncha Basleshik yok!");
    } else {
        Basleshik.update(
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
    let data = await Basleshik.findOne({ where: { id: req.params.id } });

    if (data) {
        Basleshik.destroy({
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

exports.basleshik_tb = basleshik_tb;
exports.create = create;
exports.getAll = getAll;
exports.getOne = getOne;
exports.DisActiveted = DisActiveted;
exports.Activeted = Activeted;
exports.update = update;
exports.Delete = Delete;
