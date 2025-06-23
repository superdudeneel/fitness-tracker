const express = require('express');
const cors = require('cors');
const http = require('http');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const User = require('./models/userschema');
const Workout = require('./models/workoutschema')
dotenv.config();


const app = express();

const port = process.env.PORT;
const APIKEY = process.env.FOOD_API;


app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(session({
  secret: 'secretkey',          // required - used to sign session ID cookie
  resave: false,                    // don't save session if unmodified
  saveUninitialized: false, 
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URL }),        // don't create session until something stored
  cookie: { maxAge: 24 * 60 * 60 * 1000,
    httpOnly: false,
  } // 24 hour
}));    
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
    .connect(process.env.MONGO_URL)
    .then(()=>{
        console.log('mongodb connected');
    })
    .catch((err)=>{
        console.log('failed to connect mongodb', err);
    })


const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    auth:{
        user:process.env.SMTP_USER,
        pass:process.env.SMTP_PASS
    }

});


app.get('/', (req, res)=>{
    return res.send('hello from the server');
})
app.post('/api/signup', async (req, res)=>{
    const {username, email, password} = req.body;
    const existingusername = await User.findOne({username});
    const existingemail = await User.findOne({email});
    if(existingusername){
        return res.json({success: false, message: 'Username already exists'});
    }
    if(existingemail){
        return res.json({success: false, message: 'Email already exists'});
    }
    if(!username || !email || !password){
        return res.json({success: false, message: 'All fields are required'});
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
        username,
        email,
        password: hashedPassword
    })
    return res.json({success:true, message: 'Account created successfully', redirect: '/login'});
    
})

app.post('/api/login', async (req, res)=>{
    const {username, password} = req.body;
    const user = await User.findOne({username});

    if(!username || !password){
        return res.json({success: false, message: 'All fields are required'});
    }
    if(!user){
        return res.json({success: false, message: 'Username does not exist'});
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
        return res.json({success: false, message: 'Invalid password'});
    }
    req.session.user = {
        id: user._id,
        username: user.username,
        email: user.email,
    }

    res.cookie('username', user.username, {
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        httpOnly: false, // set to true in production for security
    })
    res.cookie('email', user.email, {
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        httpOnly: false, // set to true in production for security
    })
    res.cookie('sessionid', req.session.id, {
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        httpOnly: true, // set to true in production for security
    })
    

    return res.json({success: true, message: 'Login successful', redirect: '/dashboard'});
    
})

app.get('/api/dashboard', (req, res)=>{
    if(!req.session.user){
        return res.json({success: false, message: 'Unauthorized access'});
    }
    return res.json({success: true, user: req.session.user});
})

app.put('/api/update', async(req, res)=>{
    const user = await User.findById( req.session.user.id);
    const {firstname, lastname, weight, height, calorieintake, calorieburn, waterintake} = req.body;
    if(!user){
        return res.json({success:false, message: 'could not update'});

    }
    user.Firstname = firstname;
    user.Lastname = lastname;
    user.weight = weight;
    user.height = height;
    user.calorieintakeperday = calorieintake;
    user.calorieburnperday = calorieburn;
    user.waterintakeperday  =waterintake;
    await user.save();
    return res.json({success: true, message: 'User details sent and saved'});
})
app.post('/api/forgotpass', async (req, res)=>{
    const {email} = req.body;
    const user = await User.findOne({email});
    if(!user){
        return res.json({success: false, message: 'Email does not exist'});
    }
    if(!email){
        return res.json({success: false, message: 'Email is required'});
    }
    const resettoken = Math.random().toString(36).substring(2, 15);
    const resettokenexpiry = Date.now() + 3600000; // 1 hour from now
    user.resettoken = resettoken;
    user.resettokenexpiry = resettokenexpiry;
    await user.save();
    const mailoptions ={
        from: process.env.SENDER_EMAIL,
        to: email,
        subject: 'Password Reset Request',
        html: `<p>Hi ${user.username},</p>
               <p>You requested a password reset. Please click the link below to reset your password:</p>
               <p><a href="http://localhost:5173/resetpass?token=${resettoken}">Reset Password</a></p>
               <p>This link will expire in 1 hour.</p>
               <p>If you did not request this, please ignore this email.</p>
               <p>Thank you!</p>`
    };
    transporter.sendMail(mailoptions, (error, info)=>{
        if(error){
            console.log('Error sending email:', error);
            return res.json({success: false, message: 'Failed to send reset email'});
        }
        
        return res.json({success: true, message: 'Reset email sent successfully'});
    });

})

app.post('/api/resetpass', async (req, res)=>{
    const {password, confirmpassword} = req.body;
    const {token} = req.query;
    if(!token){
        return res.json({success: false, message: 'Token is required'});
    }
    if(!password || !confirmpassword){
        return res.json({success: false, message: 'All fields are required'});
    }
    if(password !== confirmpassword){
        return res.json({success: false, message: 'Passwords do not match'});
    }
    const user = await User.findOne({resettoken: token, resettokenexpiry: {$gt: Date.now()}});
    if(!user){
        return res.json({success: false, message: 'Invalid or expired token'});
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.resettoken =undefined; // Clear the reset token after successful reset
    user.resettokenexpiry = undefined;
    await user.save();
    

})

app.get('/api/load', async (req, res)=>{
    const user = await User.findById(req.session.user.id);
    if(!user){
        return res.json({success: false, message: 'cannot load'});

    }
    return res.json({success: true, user: user});

})

app.get('/api/logout', (req, res)=>{
    req.session.destroy((err) => {
        if (err) {
            return res.json({success: false, message: 'Logout failed'});
        }
        res.clearCookie('username');
        res.clearCookie('email');
        res.clearCookie('sessionid');
        return res.json({success: true, message: 'Logout successful', redirect: '/login'});
    });
})

app.post('/api/workout', async (req, res)=>{
    
    const { name, type, duration, calories, exercises } = req.body;
    const user = await User.findById(req.session.user.id)
    if(!name||!type||!duration||!calories||!exercises){
        return res.json({success:false, message: 'All fields required'});
    }
    const workout = await Workout.create({
        userID: user._id,
        workoutname: name,
        Type: type,
        duration: duration,
        calories: calories,
        exercises: exercises,
    })
    
    return res.json({success: true, message: 'workout saved successfully', workout: workout})

})

app.get('/api/workout', async (req, res)=>{
    const workouts = await Workout.find({userID: req.session.user.id})
    return res.json({success:true, workouts: workouts});

})

//food api endpoint
app.post('/api/recipe', async (req, res)=>{
    const {query, cuisine, minProtein, maxProtein, numberrec, minCalories, maxCalories} = req.body;
       const apiurl = `https://api.spoonacular.com/recipes/complexSearch?` +
      `query=${encodeURIComponent(query)}` +
      `&cuisine=${encodeURIComponent(cuisine)}` +
      `&minProtein=${minProtein}` +
      `&maxProtein=${maxProtein}` +
      `&number=${numberrec}` +
      `&minCalories=${minCalories}` +
      `&maxCalories=${maxCalories}` +
      `&apiKey=${APIKEY}`;

    const response = await fetch(apiurl);
    const data = await response.json();
    return res.json({success:true, data:data});

})

const myserver = http.createServer(app);
myserver.listen(port, ()=>{
    console.log(`server is runnig on port ${port}`);
})
