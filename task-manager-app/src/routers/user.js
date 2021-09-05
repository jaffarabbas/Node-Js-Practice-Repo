const express = require('express');
const User = require('../models/user');
const router = new express.Router();

router.get('/test',(req, res)=>{
    res.send("Hii")
})


router.post('/users', async (req, res) => {
    const user = new User(req.body);

    try{
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({user,token});
    }catch(err){
        res.status(400).send(err);
    }
})

//Get user data
//all user
router.get('/users', (req, res) => {
    User.find({}).then((user) => {
        res.send(user)
    }).catch((err) => {
        res.status(500).send()
    })
})
//get a spesific user  
router.get('/users/:id', (req, res) => {
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



//Update user

router.patch('/users/:id', async (req, res) => {
    const update = Object.keys(req.body);
    const allowUpdate = ["name","email","password","age"];
    const isValidOperation = update.every((update => allowUpdate.includes(update)))
    
    if(!isValidOperation){
        return res.status(404).send({error: 'Invalid Update'})
    }

    try{
        //const user = await User.findByIdAndUpdate(req.params.id, req.body, {new : true , runValidators: true})
        const user = await User.findById(req.params.id);
        update.forEach(update => user[update] = req.body[update]);
        await user.save();
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    }
    catch(err) {
        res.status(500).send(err)
    }
})


//delete a user
router.delete('/users/:id', async (req, res) => {
    try{
        const user = await User.findByIdAndDelete(req.params.id);
        if(!user){
            return res.status(404).send(err)
        }
        res.send(user)
    }catch(err) {
        return res.status(500).send(err);
    }
})

//login
router.post('/users/login',async(req, res) => {
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({user,token});
    }
    catch(err){
        res.status(400).send({error:'Wrong credentials'});
    }
})

module.exports = router;