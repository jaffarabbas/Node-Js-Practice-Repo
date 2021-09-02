const express = require('express');
require('./db/mongoose');
const User = require('./models/user');
const Task = require('./models/task');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())

//Post data to database
app.post('/users', async (req, res) => {
    const user = new User(req.body);

    try{
        await user.save();
        res.status(201).send(user);
    }catch(err){
        res.status(400).send(err);
    }
    // user.save().then(() =>{
    //     res.status(201).send(user);
    // }).catch((err) => {
    //     res.status(400).send(err);
    // })
})

//Task

app.post('/tasks', (req, res) => {
    const task = new Task(req.body);

    task.save().then(() => {
        res.status(201).send(task);
    }).catch((err) => {
        res.status(400).send(err);
    })
})

//Get user data
//all user
app.get('/users', (req, res) => {
    User.find({}).then((user) => {
        res.send(user)
    }).catch((err) => {
        res.status(500).send()
    })
})
//get a spesific user  
app.get('/users/:id', (req, res) => {
    const _id = req.params.id;
    
    User.findById(_id).then((user) => {
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
        console.log(user)
    }).catch((err) => {
        res.status(500).send();
    })
})

//Get Task Data
app.get('/tasks', (req , res) => {
    Task.find({}).then(task => {
        res.send(task);
    })
    .catch((err) => {
        res.status(500).send();
    })
})

//get data of one task
//id: 612bbb5e49e382420c78ddfb

app.get('/tasks/:id', (req, res) => {
    const _id = req.params.id;

    Task.findById(_id).then(task => {
        if(!task){
            return res.status(404).send();
        }
        console.log(task)
        res.send(task)
    })
    .catch(err => {
        res.status(500).send();
    })
})

//Update user

app.patch('/users/:id', async (req, res) => {
    const update = Object.keys(req.body);
    const allowUpdate = ["name","email","password","age"];
    const isValidOperation = update.every((update => allowUpdate.includes(update)))
    
    if(!isValidOperation){
        return res.status(404).send({error: 'Invalid Update'})
    }

    try{
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new : true , runValidators: true})
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    }
    catch(err) {
        res.status(500).send(err)
    }
})

//update a task

app.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowUpdate = ["description","completed"];
    const isValidOperation = updates.every((update => allowUpdate.includes(update)));

    if(!isValidOperation){
        return res.status(404).send({error: 'Invalid Update'});
    }

    try{
        const task = await Task.findfindByIdAndUpdate(req.params.id, {new : true , runValidators: true});

        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    }
    catch(err){
        res.status(500).send(err)
    }
})


app.listen(port,()=>{
    console.log('Server start at ',port);
})