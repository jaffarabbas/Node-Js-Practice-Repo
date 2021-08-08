const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{
    useNewUrlParser : true,
    useCreateIndex : true,  
})

const User = mongoose.model('User', {
    name : {
        trim: true,
        type: String,
    },
    email:{
        type:String,
        required:true,
        trim: true,
        lowercase: true,
        validate(value){
           if(!validator.default.isEmail(value)){
               throw new Error('Please enter a valid email')
           }
        }
    },
    age:{
        type: Number,
        validate(value){
            if(value < 0){
                throw new Error('Age must be greater than zero')
            }
        }
    },
    password:{
        type: String,
        trim: true,
        required: true,
        minlength: 10,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Invalid password')
            }
        }
    }
})

const Info = mongoose.model('Info', {
    description:{
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    completed:{
        type: Boolean,
        required: true,
        default: false,
    }
})

const me = new User({
    name : '  adasdsa  ',
    email: 'wwwwwwwWgama@mail.com',
    age: 21,
    password: ' ASSASsdfsdf '
})

const me2 = new Info({
    description: 'hii my NAme is Jafar',
})

me2.save().then(() => {
    console.log(me2)
}).catch(err => {
    console.log(err)
})

