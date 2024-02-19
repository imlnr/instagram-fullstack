const jwt = require('jsonwebtoken');

const auth = (req,res,next)=>{
    const token = req.headers.authorization?.split(" ")[1];
    if(token){
        const decoded = jwt.verify(token,'insta');
        if(decoded){
            req.body.userID = decoded.userID;
            req.body.author = decoded.author;
            next();
        }
        else{
            res.send({"msg":"You are not authorized!"})
        }
    }else{
        res.send({"msg":"you are not authorized!"})
    }
}

module.exports = {
    auth
}