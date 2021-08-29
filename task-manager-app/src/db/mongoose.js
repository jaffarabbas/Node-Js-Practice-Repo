const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{
    useNewUrlParser : true,
    useCreateIndex : true,  
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

