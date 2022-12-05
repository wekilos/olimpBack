var Sequelize = require("sequelize");
var fetch = require("node-fetch");
var sequelize = require("../../config/db");
const Op = Sequelize.Op;
const fs = require("fs");
const Basleshik = require("../models/basleshik");
const Sorag = require("../models/soraglar");
const Jogap = require("../models/jogaplar");

const sorag_tb = async (req, res) => {
    const response = await sequelize
        .sync()
        .then(function () {
            const data = Sorag.findAll();
            console.log("connection connected");
            return data;
        })
        .catch((err) => {
            return err;
        });
    res.json(response);
};

const create = (req, res) => {
    const { sorag, BasleshikId } = req.body;
    const soragimg = req.files;
    let img_direction_tm = "";
    if (req.files?.soragimg) {
        let randomNumber_tm = Math.floor(Math.random() * 999999999999);
        img_direction_tm =
            `./uploads/` + randomNumber_tm + `${req.files.soragimg.name}`;
        fs.writeFile(img_direction_tm, req.files.soragimg.data, function (err) {
            console.log(err);
        });
    }

    Sorag.create({
        sorag,
        soragimg: img_direction_tm,
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
    Sorag.findAll({
        include: [
            {
                model: Basleshik,
                attributes: ["id", "name", "active", "deleted"],
            },
            {
                model: Jogap,
                attributes: [
                    "id",
                    "jogap",
                    "jogapimg",
                    "SoragId",
                    "isTrue",
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
    Sorag.findOne({
        include: [
            {
                model: Basleshik,
                attributes: [
                    "id",
                    "sorag",
                    "soragimg",
                    "active",
                    "deleted",
                    "BasleshikId",
                ],
            },
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
    const { sorag, soragimg, id } = req.body;

    Sorag.update(
        {
            sorag,
            soragimg,
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
    const data = await Sorag.findOne({ where: { id: id } });
    if (!data) {
        res.send("BU ID boyuncha data yok!");
    } else {
        Sorag.update(
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
    const data = await Sorag.findOne({ where: { id: id } });
    if (!data) {
        res.send("BU ID boyuncha data yok!");
    } else {
        Sorag.update(
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
    let data = await Sorag.findOne({ where: { id: req.params.id } });

    if (data) {
        Sorag.destroy({
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

exports.sorag_tb = sorag_tb;
exports.create = create;
exports.getAll = getAll;
exports.getOne = getOne;
exports.DisActiveted = DisActiveted;
exports.Activeted = Activeted;
exports.update = update;
exports.Delete = Delete;
