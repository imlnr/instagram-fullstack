const express = require('express');

const photoRouter = express.Router();
const multer = require('multer');
const { PictureModel } = require('../models/photos.models');
const upload = multer({ dest: 'uploads/' })


photoRouter.post('/upload',async(req,res)=>{
    const {quote,photo,device,commentsCount} = req.body;
    try {
        const picture = new PictureModel({quote,photo,device,commentsCount});
        await picture.save();
        res.send({"msg":"picture uploaded successfully"});
    } catch (error) {
        res.send({"msg":"get some error while uploading..."})
    }
    
})
