const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
//Register a new user
router.post("/register", async (req,res)=>{
    try{
        //generate hashed password
        const salt = await bcrypt.genSalt(8);
        const GenerateHashedPassword = await bcrypt.hash(req.body.password, salt);
        //create a new user
        const newUser = await new User({
            username: req.body.username,
            email: req.body.email,
            password: GenerateHashedPassword
        })
        //save user
        const user = await newUser.save();
        res.status(200).json(user);
    }
    catch(err){
        res.status(500).send(err);
    }
})
//login a user
router.post("/login", async (req, res) => {
    try{
        const CheckUser = await User.findOne({email: req.body.email});
        !CheckUser && res.status(404).json('User not found')
        //checking password
        const CheckPassword = await bcrypt.compare(req.body.password, CheckUser.password);
        !CheckPassword && res.status(400).json('Worng Password')
        //if valid 
        res.status(200).json(CheckUser);
    }catch(err) {
        res.status(500).json(err);
    }
});

module.exports = router