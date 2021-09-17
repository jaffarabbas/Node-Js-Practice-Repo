const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const userRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const postRouter = require('./routes/post');
//for configring .env files
dotenv.config();
//creating object for express class 
const app = express();

//connection to the database (mongodb atlas)
mongoose.connect(process.env.MONGO_URL,
    {useNewUrlParser : true,useUnifiedTopology : true},()=>{
    console.log('Database Connected');
})

//middleware

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

//routes
//user route
app.use('/api/users',userRouter);
//auth route
app.use('/api/auth',authRouter);
//post route
app.use('/api/posts',postRouter);

app.listen(8800,()=>{
    console.log('!!!! Local Universe Arrived !!!!\n       !!!Happy Hacking!!!')
})