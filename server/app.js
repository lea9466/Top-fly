const express = require('express')
const mongoose = require('mongoose')
// const multer = require('multer');
const path = require('path');
require('dotenv').config();
const app = express()
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use('/uploads', express.static('uploads'));
const cors = require('cors');
app.use(cors());
const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log('its connect to port ' + PORT)
})
//חיבור לדתה בייס
mongoose.connect(process.env.MONGO_URI, {
}).then(() => {
        console.log("connected to DataBase");
    })


const User = require('./routes/userRouts')
app.use('/User', User)

const Category = require('./routes/categoryRouts')
app.use('/Category', Category)

const Trip = require('./routes/tripRouts')
app.use('/Trip', Trip)

// הגדרת התיקייה client כסטטית
app.use(express.static(path.join(__dirname, 'client')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));