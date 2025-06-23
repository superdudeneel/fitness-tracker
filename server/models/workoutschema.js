const mongoose = require('mongoose');
const workoutschema = new mongoose.Schema({
    userID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // This should match the model name of your User schema
        required: true
    },
    workoutname:{
        type: String,
    },
    duration:{
        type: Number,

    },
    Type:{
        type: String,

    },
    calories:{
        type: Number,

    },
    exercises:[{
       name: {
        type: String,
       },
       duration:{
        type: Number,
       },
       strength:{
        type: Number,
       },
       calories:{
        type: Number,
       }
    }],
    date:{
        type: Date,
        default: Date.now,
    },
    day: {
        type: String,
        default: () => {
            const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            return days[new Date().getDay()];
        }
  },
})
const Workout = mongoose.model('Workout', workoutschema)
module.exports = Workout;
