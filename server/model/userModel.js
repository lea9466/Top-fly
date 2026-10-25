const mongoose = require('mongoose');
// const { type } = require('os');
// הגדרת הסכמה
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        // unique: true,
        lowercase: true,
        trim: true,  //הסרת רווחים מיותרים
        match: [/^\S+@\S+\.\S+$/, 'כתובת אימייל לא חוקית']
    },
    password: {
        type: String,
        required: true,
        // unique: true,
    },
    status: {
        type: Boolean,
        default: true
    },
    role: {
        type: String,
        enum: ['manager', 'user'],
        default: 'user'
    },
    messages: [
        {
            date: {
                type: Date,
                default: Date.now
            },
            content: {
                type: String,
                required: true
            }
        }
    ]

});

// ייצוא הסכמה
module.exports = mongoose.model('User', userSchema);