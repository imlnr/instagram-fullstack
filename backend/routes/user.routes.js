const expresss = require('express');
const bcrypt = require('bcrypt');
const { UserModel } = require('../models/users.model');
const jwt = require('jsonwebtoken');
const userRouter = expresss.Router();

userRouter.post('/register', (req, res) => {
    const { username, email, password, city, age, gender } = req.body;
    try {
        bcrypt.hash(password, 8, async (err, hash) => {
            if (hash) {
                const user = new UserModel({ username, email, password: hash, city, age, gender });
                await user.save();
                res.send({ "msg": "New user has been registered Successfully....." });
            }
            else {
                res.send({ "msg": "Error while hashing the password.....", err });
            }
        })
    } catch (error) {
        res.send({ "msg": error })
    }
})

userRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        bcrypt.compare(password, user.password, (err, result) => {
            if (result) {
                const token = jwt.sign({ userID: user._id, author: user.username }, 'insta');
                res.send({ "msg": "Login Successful...", token });
            }
            else {
                res.status(401).send({ "msg": "wrong Credentials.." })
            }
        })
    } catch (error) {
        res.status(500).send({ "error": error })
    }
})


module.exports = {
    userRouter
}