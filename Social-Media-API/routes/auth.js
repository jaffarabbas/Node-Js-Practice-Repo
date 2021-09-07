const router = require('express').Router();
const User = require('../models/User');

//Register a new user
router.post("/register", async (req,res)=>{
    try{
        const user = await new User({
            username: "jafffar",
            email: "jafffar@gmail.com",
            password: "JAFFARempiree"
        })
        await user.save();
        res.send(user);
    }
    catch(err){
        res.status(500).send(err);
    }
})

module.exports = router