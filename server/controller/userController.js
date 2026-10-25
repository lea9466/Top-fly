


const jwt = require('jsonwebtoken');
require('dotenv').config();
const { json } = require('express');
const User = require('../model/userModel.js')

// קבלת כל רשימת המשתמשים
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find(); // קבלת כל המשתמשים
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//יצירת משתמש חדש
const createNewUser = async (req, res) => {

    try {

        console.log(req.body);
        const { name, email, password, status } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: 'מייל זה כבר קיים במערכת, נסי להתחבר במקום להירשם שוב.'
            });
        }
        const arr = [];
        const newUser = new User({
            name,
            email,
            password,
            status: status === 'true', // להמיר לבוליאני
            arr
        });

        // שמירת המשתמש בבסיס הנתונים
        await newUser.save();
        // יצירת טוקן
        const token = createToken(newUser._id, newUser.role, newUser.email)

        // החזרת תגובה מוצלחת
        res.status(200).json({
            message: 'User created successfully',
            user: newUser,
            token
        });
    } catch (error) {
        console.log(error.message);

        // טיפול בשגיאות
        res.status(500).json({
            message: 'Error creating User',
            error: error.message
        });
    }
};

// עדכון פרטי משתמש
const upDateUser = async (req, res) => {
    try {
        console.log(req.body)
        console.log("5454")
        const user = await User.findById({ '_id': req.body._id });
        const { name, email, password, status } = req.body;
        if (name !== undefined) {
            user.name = name;
        }
        if (email !== undefined) {
            user.email = email;
        }
        if (password !== undefined) {
            user.password = password;
        }
        if (status !== undefined) {
            user.status = status;
        }
        const updatedUser = await user.save();
        const token = createToken(updatedUser._id, updatedUser.role, updatedUser.email)
        res.status(200).json({ message: 'המשתמש עודכנה בהצלחה', user: updatedUser, token });
    } catch (error) {
        res.status(500).json({
            message: 'Error updateing User',
            error: error.message
        });
    }
};


// מחיקת משתמש 
const dropeUser = async (req, res) => {
    try {
        const user = await User.findById({ '_id': req.body._id });
        user.status = false
        await user.save();
        res.status(200).json({ message: 'המשתמש נמחקה בהצלחה', user: user });
    } catch (error) {
        res.status(500).json({
            message: 'Error droping user',
            error: error.message
        });
    }
};

const addNewMess = async (req, res) => {
    console.log(req.body)
    try {
        const user = await User.findByIdAndUpdate(
            req.body._id,
            {
                $push: {
                    messages: {
                        content: req.body.content
                    }
                }
            },
            { new: true }
        );
        res.status(200).json({ message: 'ההודעה נשלחה בהצלחה' });
    } catch (error) {
        res.status(500).json({
            message: 'Error sending mess',
            error: error.message
        });
    }
};


// קבלת משתמש לפי מזהה
// const getUseryById = async (req, res) => {
//     try {
//         const user = await User.findOne({ passward: req.params.passward });
//         if (!user) return res.status(404).json({ message: 'משתמש לא נמצא' });
//         const token = createToken(user._id, user.role, user.email)
//         res.status(200).json({
//             // message: 'User created successfully',
//             user: user,
//             token
//         });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

const loginUser = async (req, res) => {
    try {
        console.log(req.body);

        const { email, password } = req.body;
        // חיפוש המשתמש לפי אימייל
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'משתמש לא קיים' });
        }
        // השוואת סיסמה
        if (user.password != password) {
            return res.status(401).json({ message: 'סיסמה שגויה' });
        }

        // יצירת טוקן
        const token = createToken(user._id, user.role, user.email);

        // החזרת תגובה
        res.status(200).json({ message: 'התחברות הצליחה', user, token });
    } catch (error) {
        res.status(500).json({ message: 'שגיאה בהתחברות', error: error.message });
    }
};


function createToken(id, role, email) {
    const token = jwt.sign(
        { id: id, role: role, email: email }, // מה ייכנס לטוקן
        process.env.SECRETKEY, // SECRET KEY
        { expiresIn: '1h' } // תוקף של שעה
    );
    return token

}

const getUserFromToken = async (req, res) => {
    try {

        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'אין טוקן' });
        }

        const decoded = jwt.verify(token, process.env.SECRETKEY);

        const user = await User.findById(decoded.id).select('_id name email role status password messages');
        if (!user) {
            return res.status(404).json({ message: 'משתמש לא נמצא' });
        }

        res.status(200).json({ user });
    } catch (error) {
        res.status(403).json({ message: 'טוקן לא תקף או שגיאה באימות', error: error.message });
    }
};

const { sendContactEmail } = require('../email/send.js');

const SendEmailToManager = async (req, res) => {
    try {
        await sendContactEmail(req.body);
        res.status(200).json({ message: 'האימייל נשלח בהצלחה!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'שגיאה בשליחת המייל' });
    }
};

//קבלת כל הטיולים של קטגוריה מסוימת
const getAllUsersByNewz = async (req, res) => {
    try {
        const users = await User.find({ status: true });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getAllUsers, createNewUser, upDateUser, dropeUser, loginUser, getUserFromToken, addNewMess, SendEmailToManager, getAllUsersByNewz }