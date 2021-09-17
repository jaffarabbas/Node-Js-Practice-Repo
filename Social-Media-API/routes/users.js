const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

//Update a User 
router.put("/:id", async (req, res) => {
    if(req.body.userId === req.params.id || req.body.idAdmin){
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
router.delete("/:id", async (req, res) => {
    if(req.body.userId === req.params.id || req.body.idAdmin){
        //for other feilds update
        try{
            const DeleteUser = await User.findByIdAndDelete(req.params.id);
            res.status(200).json("User Deleted Successfully!")
        }catch(err) {
            return res.status(500).send(err);
        }
    }else{
        return res.status(403).json("You can Delete only your account")
    }
})
//Get a User
router.get("/:id", async (req, res)=>{
    try{
        const GetUser = await User.findById(req.params.id);
        //will hide pasword and timestamps , spread them in other
        const {password, updatedAt , ...PublicInfo} = GetUser._doc; 
        res.status(200).json(PublicInfo);
    }catch(err){
        res.status(500).send(err);
    }
})
//follow a User
router.put("/:id/follow", async (req, res) => {
    if(req.body.userId !== req.params.id){
        try{
            const UserToBeFollowed = await User.findById(req.params.id);
            const CurrentUser = await User.findById(req.body.userId);
            if(!UserToBeFollowed.followers.includes(req.body.userId)){
                await UserToBeFollowed.updateOne({$push: {followers : req.body.userId}});
                await CurrentUser.updateOne({$push: {followings : req.params.id}});
                res.status(200).json("User has been followed successfully");
            }else{
                res.status(403).json("You already followed this user");
            }
        }catch(err){
            res.status(500).json(err);
        }
    }else{
        res.status(403).json("You cannot unfollow yourself")
    }
})
//Unfollow a User
router.put("/:id/unfollow", async (req, res) => {
    if(req.body.userId !== req.params.id){
        try{
            const UserToBeFollowed = await User.findById(req.params.id);
            const CurrentUser = await User.findById(req.body.userId);
            if(UserToBeFollowed.followers.includes(req.body.userId)){
                await UserToBeFollowed.updateOne({$pull: {followers : req.body.userId}});
                await CurrentUser.updateOne({$pull: {followings : req.params.id}});
                res.status(200).json("User has unfollowed successfully");
            }else{
                res.status(403).json("You cannot unfollow this user");
            }
        }catch(err){
            console.log(err);
            res.status(500).json(err);
        }
    }else{
        res.status(403).json("You cannot follow yourself")
    }
})
module.exports = router