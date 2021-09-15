const User = require('../models/User');
const router = require('express').Router();
const bcrypt = require('bcrypt');

//Update a User 
router.put("/:id", async (req, res) => {
    if(req.body.userId === req.params.id || req.user.idAdmin){
        //for password update only
        if(req.body.password){
            try{
                const salt = await bcrypt.genSalt(8);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            }catch(err){
                return res.status(500).send(err);
            }
        }
        //for other feilds update
        try{
            const UpdateUser = await User.findByIdAndUpdate(req.params.id, {$set: req.body});
            res.status(200).json("User Updated Successfully!")
        }catch(err) {
            return res.status(500).send(err);
        }
    }else{
        return res.status(403).json("You can update only your account")
    }
})
//Delete a User
//Get a User
//follow a User
//Unfollow a User

module.exports = router