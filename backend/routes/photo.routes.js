const express = require('express');

const photoRouter = express.Router();
const multer = require('multer');
const { PictureModel } = require('../models/photos.models');
const { auth } = require('../middlewares/auth.middlewares');
const upload = multer({ dest: 'uploads/' })


photoRouter.post('/upload',auth,async(req,res)=>{
    // const {quote,photo,device,commentsCount} = req.body;
    try {
        const picture = new PictureModel(req.body);
        await picture.save();
        res.send({"msg":"picture uploaded successfully"});
    } catch (error) {
        res.send({"msg":"get some error while uploading..."})
    }
    
})

photoRouter.patch('/uploads/:userID',auth,async(req,res)=>{
    const {userID} = req.params;
    try {
        const photo = await PictureModel.findOne({_id:userID});
        if(photo.userID == req.body.userID){
            await PictureModel.findByIdAndUpdate({_id: userID},req.body);
            res.send({"msg":"the image is updated successfully....."})
        }
        else{
            res.status(403).send({"msg":"you are not authorized to update this photo"})
        }
    } catch (error) {
        res.status(500).send({"error":error})
    }
})



photoRouter.delete('/uploads/:userID',auth,async(req,res)=>{
    const {userID} = req.params;
    try {
        const photo = await PictureModel.findOne({_id:userID});
        if(photo.userID == req.body.userID){
            await PictureModel.findByIdAndDelete({_id: userID});
            res.send({"msg":"the image is deleted successfully....."})
        }
        else{
            res.status(403).send({"msg":"you are not authorized to delete this photo"})
        }
    } catch (error) {
        res.status(500).send({"error":error})
    }
})


module.exports = {
    photoRouter
}