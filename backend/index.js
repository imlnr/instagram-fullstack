const express = require('express');
const { connection } = require('./config/db');
require('dotenv').config();


const app = express();

app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log(`Connected to DB...`);
        console.log(`Your server is Running at port ${process.env.port}`);
    } catch (error) {
        
    }
})