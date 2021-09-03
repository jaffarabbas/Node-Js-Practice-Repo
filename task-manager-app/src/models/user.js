const mongoose = require('mongoose');
const validator = require('validator');

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

module.exports = User