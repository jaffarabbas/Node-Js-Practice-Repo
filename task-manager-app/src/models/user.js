const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name : {
        trim: true,
        type: String,
    },
    email:{
        type:String,
        required:true,
        trim: true,
        lowercase: true,
        unique: true,
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
});

userSchema.statics.findByCredentials = async (email,password) => {
    const user = await User.findOne({email});
    if(!user) throw new Error('Invalid Email');
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) throw new Error('Invalid Password');
    return user;
}

//running a function before posting
userSchema.pre('save',async function(next){
    const user = this;
    
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
})

const User = mongoose.model('User', userSchema)

module.exports = User