const mongoose = require('mongoose');
// const { type } = require('os');
// הגדרת הסכמה
const tripSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: ''  // אפשר לשים תיאור ריק אם לא מוסיפים תיאור
    },
    hotel:{
        type:String,
        default:''
    },
    status: {
        type: Boolean,
        default: true  // אם לא נמסר סטטוס, ברירת המחדל תהיה 'true'
    },
    imageUrl: {
        type: String,
        default: ''  // אפשר להוסיף תמונה או להשאיר ריק אם אין תמונה
    },
    start: {
        type: String,
        default: ''
    },
    end: {
        type: String,
        default: ''
    },
    parentCategory: {
        type: mongoose.Schema.Types.ObjectId,  // הפניה לקטגוריה מתוך מסמכים אחרים
        ref: 'Category',  // הפניה למודל 'Category' שיאפשר לך לשלוף את פרטי הקטגוריה
        // required: true  
        default:''
    }

});

// ייצוא הסכמה
module.exports = mongoose.model('Trip', tripSchema);