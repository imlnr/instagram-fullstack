const express = require('express');
const { connection } = require('./config/db');
require('dotenv').config();
const cors = require('cors');
const { userRouter } = require('./routes/user.routes');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/users',userRouter);
// app.use('')

app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log(`Connected to DB...`);
        console.log(`Your server is Running at port ${process.env.port}`);
    } catch (error) {
        
    }
})