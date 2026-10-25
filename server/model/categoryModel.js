const mongoose = require('mongoose');
const Schema=mongoose.Schema
// const { type } = require('os');
// הגדרת הסכמה
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        default: ''
    },
    information: {
        type: String,
        default: ''
    },
    status: {
        type: Boolean,
        default: true
    },
    imageUrl: {
        type: String,// כאן שמור את הקישור לתמונה
        default: ''
    },
    subCategories: [{
        type: Schema.Types.ObjectId, ref: 'Trip'
    }]

});

// ייצוא הסכמה
module.exports = mongoose.model('Category', categorySchema);