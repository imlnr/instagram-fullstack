const express = require('express');
const { connection } = require('./config/db');
require('dotenv').config();
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log(`Connected to DB...`);
        console.log(`Your server is Running at port ${process.env.port}`);
    } catch (error) {
        
    }
})