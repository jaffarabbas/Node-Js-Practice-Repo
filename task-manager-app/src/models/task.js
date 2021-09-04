const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const taskSchemma = new mongoose.Schema({
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
});

taskSchemma.pre('save',async function (next){
    const task = this;

    if(task.isModified('description')){
        task.description = await bcrypt.hash(task.description, 8);
    }
    
    next();
})

const Task = mongoose.model('Task', taskSchemma)

module.exports = Task;