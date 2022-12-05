var Sequelize = require("sequelize");
var fetch = require("node-fetch");
var sequelize = require("../../config/db");
const Op = Sequelize.Op;
const fs = require("fs");
const Basleshik = require("../models/basleshik");
const Sorag = require("../models/soraglar");
const Jogap = require("../models/jogaplar");

const jogap_tb = async (req, res) => {
    const response = await sequelize
        .sync()
        .then(function () {
            const data = Jogap.findAll();
            console.log("connection connected");
            return data;
        })
        .catch((err) => {
            return err;
        });
    res.json(response);
};

const create = (req, res) => {
    const { jogap, jogapimg, isTrue, SoragId } = req.body;

    Jogap.create({
        jogap,
        jogapimg,
        isTrue,
        SoragId,
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
    Jogap.findAll({
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
    Jogap.findOne({
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
                        model: Basleshik,
                        attributes: [
                            "id",
                            "name",
                            "description",
                            "time",
                            "active",
                            "deleted",
                            "BasleshikId",
                        ],
                    },
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
    const { jogap, jogapimg, isTrue, id } = req.body;

    Jogap.update(
        {
            jogap,
            jogapimg,
            isTrue,
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
    const data = await Jogap.findOne({ where: { id: id } });
    if (!data) {
        res.send("BU ID boyuncha data yok!");
    } else {
        Jogap.update(
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
    const data = await Jogap.findOne({ where: { id: id } });
    if (!data) {
        res.send("BU ID boyuncha data yok!");
    } else {
        Jogap.update(
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
    let data = await Jogap.findOne({ where: { id: req.params.id } });

    if (data) {
        Jogap.destroy({
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

exports.jogap_tb = jogap_tb;
exports.create = create;
exports.getAll = getAll;
exports.getOne = getOne;
exports.DisActiveted = DisActiveted;
exports.Activeted = Activeted;
exports.update = update;
exports.Delete = Delete;
