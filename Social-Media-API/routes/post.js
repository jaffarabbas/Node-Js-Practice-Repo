const router = require('express').Router();
const Post = require('../models/Post');
//Create a Post
router.post('/', async (req, res) => {
    try{
        const NewPost = new Post(req.body);
        const savedPost = await NewPost.save();
        res.status(200).json(savedPost);
    }catch(err){
        res.status(500).json(err);
    }
});
//Update a Post
router.put('/:id', async (req, res)=>{
    try{
        const UpdatePost = await Post.findById(req.params.id);
        !UpdatePost && res.status(404).json("Post Not Found")
        if(UpdatePost.userId === req.body.userId){
            await UpdatePost.updateOne({$set: req.body});
            res.status(200).json("Post Updated")
        }else{
            res.status(403).json("You can Update only your post")
        }
    }catch(err){
        res.status(500).json(err);
    }
})
//Delete a Post
router.delete('/:id', async (req, res)=>{
    try{
        if(req.body.userId === req.params.id){
            const DeletePost = await Post.findByIdAndDelete(req.params.id);
            !DeletePost && res.status(404).json("Post Not Found")
            res.status(200).json("User Deleted Successfully!")
        }else{
            res.status(403).json("You can Update only your post")
        }
    }catch(err){
        res.status(500).json(err);
        console.log(err)
    }
});
//Like a Post and dislike a post 
router.put('/:id/like', async (req, res) => {
    try{
        const PostToBeLike = await Post.findById(req.params.id);
        if(!PostToBeLike.likes.includes(req.body.userId)){
            await PostToBeLike.updateOne({$push:{likes:req.body.userId}});
            res.status(200).json("The Post has been Liked");
        }else{
            await PostToBeLike.updateOne({$pull:{likes:req.body.userId}});
            res.status(200).json("The Post has been DisLiked");
        }
    }catch(err){
        console.log(err)
        res.status(500).json(err);
    }
})
//Get a Post
//Get Timeline Post


module.exports = router