const mongoose = require('mongoose');
const userschema = new mongoose.Schema({
    username:{
        type: String,
        required: true,

    },
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    Firstname:{
        type: String
    },
    Lastname:{
        type: String,
    },

    weight:{
        type: Number,
    },
    height:{
        type: Number,
    },
    calorieintakeperday:{
        type: Number,
    },
    calorieburnperday:{
        type: Number,
    },
    waterintakeperday:{
        type: Number,
    },
    
    resettoken: {
        type: String,
        default: '',
    },
    resettokenexpiry: {
        type: Date,
        default: () => Date.now(), // 👈 Use a function to get the current time when the document is created
    },
})
const User = mongoose.model('User', userschema);
module.exports = User;
