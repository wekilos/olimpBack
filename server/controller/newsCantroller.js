var Sequelize = require("sequelize");
var fetch = require('node-fetch'); 
var sequelize = require("../../config/db"); 
const News = require("../models/news");
const Op = Sequelize.Op;
const fs = require('fs');

 const news_tb = async (req, res) => { 
    const response = await sequelize
      .sync()
      .then(function () {
        const data = News.findAll();
        console.log("connection connected");
        return data;
      })
      .catch((err) => {
        return err;
        console.log("connection connected");
      });
    res.json(response);
  };


  const create = (req,res)=>{
    const {title_tm, title_en, title_ru, text_tm, text_en, text_ru } = req.body;

    let randomNumber_tm = Math.floor(Math.random() * 999999999999);
    let img_direction_tm = `./uploads/`+randomNumber_tm+`${req.files.picture.name}`;
    fs.writeFile(img_direction_tm, req.files.picture.data, function(err) { console.log(err) });

    News.create({
        title_tm, 
        title_en, 
        title_ru, 
        text_tm, 
        text_en, 
        text_ru,
        picture:img_direction_tm,
        active:true,
        deleted:false
    }).then((data)=>{
        res.json("uploaded!")
    }).catch((err)=>{
        console.log(err);
        res.json({err:err})
    })
  } 

  const getAll = (req,res)=>{
    News.findAll(
        {
        // where:{
        //     deleted:false
        // },
        order: [
            ['id', 'DESC'],
        ]
    }
    ).then((data)=>{
        res.json(data);
    }).catch((err)=>{
        console.log(err);
        res.json({err:err})
    })
  }

  const getOne = (req,res)=>{
    News.findOne({
        where:{
            id:req.params.id
        }
    }).then((data)=>{
        if(data){
            res.json(data);
        }else{
            res.json("Maglumat Yok!")
        }
    }).catch((err)=>{
        console.log(err);
        res.json({err:err})
    })

  }

  const update = (req,res)=>{
    const {title_tm, title_en, title_ru, text_tm, text_en, text_ru,id } = req.body;

    News.update({
        title_tm, 
        title_en, 
        title_ru, 
        text_tm, 
        text_en, 
        text_ru
    },{
        where:{
            id:id
        }
    }).then((data)=>{
        res.json("updated!")
    }).catch((err)=>{
        console.log(err);
        res.json({err:err})
    })
  } 

  const updateFile = async(req,res)=>{
    let data = await News.findOne({ where:{id:req.body.id} })
        if(data){
            fs.unlink(data.picture,function (err) {if (err) throw err; });

            let randomNumber_tm = Math.floor(Math.random() * 999999999999);
            let img_direction_tm = `./uploads/`+randomNumber_tm+`${req.files.picture.name}`;
            fs.writeFile(img_direction_tm, req.files.picture.data, function(err) { console.log(err) });

            News.update({
                picture:img_direction_tm
            },{
                where:{
                    id:req.body.id
                }
            }).then((data)=>{
                res.json("updated!")
            }).catch((err)=>{
                console.log(err);
                res.json({err:err});
            })
        }else{
            res.json("BU ID boyuncha maglumat yok")
        }
    
  }

  const Delete = async(req,res)=>{
        let data = await News.findOne({where:{id:req.params.id}})

        if(data){
            fs.unlink(data.picture,function (err) {if (err) throw err; });
            News.destroy({
                where:{
                    id:req.params.id
                }
            }).then(()=>{
                res.json("deleted!")
            }).catch((err)=>{
                console.log(err);
                res.json({err:err});
            })
        }else{
            res.json("Bu ID boyuncha maglumat tapylmady!")
        }
  }


  exports.news_tb = news_tb;
  exports.create = create;
  exports.getAll = getAll;
  exports.getOne = getOne;
  exports.update = update;
  exports.updateFile = updateFile;
  exports.Delete = Delete;