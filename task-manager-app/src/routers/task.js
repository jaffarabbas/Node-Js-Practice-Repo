const express = require('express');
const Task = require('../models/task');
const router = new express.Router();

//Task

router.post('/tasks', (req, res) => {
    const task = new Task(req.body);

    task.save().then(() => {
        res.status(201).send(task);
    }).catch((err) => {
        res.status(400).send(err);
    })
})

//Get Task Data
router.get('/tasks', (req , res) => {
    Task.find({}).then(task => {
        res.send(task);
    })
    .catch((err) => {
        res.status(500).send();
    })
})


router.get('/tasks/:id', (req, res) => {
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

router.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowUpdate = ["description","completed"];
    const isValidOperation = updates.every((update => allowUpdate.includes(update)));

    if(!isValidOperation){
        return res.status(404).send({error: 'Invalid Update'});
    }

    try{
        //const task = await Task.findfindByIdAndUpdate(req.params.id, {new : true , runValidators: true});
        const task = await Task.findById(req.params.id);
        updates.forEach(update => task[update] = req.body[user]);
        await task.save();
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    }
    catch(err){
        res.status(500).send(err)
    }
})

//delete a task
router.delete('/tasks/:id', async (req, res) => {
    try{
        const task = await Task.findByIdAndDelete(req.params.id);
        if(!task){
            return res.status(404).send(err)
        }
        res.send(task)
    }catch(err) {
        return res.status(500).send(err);
    }
})

module.exports = router;