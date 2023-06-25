import User from "../models/User";
import bcrypt from "bcryptjs";
export const getAllUsers = async (req, res) => {
    let users;
    try {
        users = await User.find();
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
    if(!users) {
        res.status(404).json({ message: "No users found" });
    }
    return res.status(200).json({users});
};

//sign up
export const signUp = async (req, res,next) => {
    let {name, email, password} = req.body;
    let existingUser;
    try{
        existingUser = await User.findOne({email});
    }catch(err){
        return res.status(500).json({ message: err.message });
    }
    if(existingUser){
        return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = bcrypt.hashSync(password);
    const user = new User({
        name,
        email,
        password : hashedPassword,
    });
    try{
        await user.save();
    }catch(err){
        return res.status(500).json({ message: err.message });
    }
    return res.status(201).json({user});
}

//login

export const login = async (req, res,next) => {
    let {email,password} = req.body;
    let existingUser;
    try{
        existingUser = await User.findOne({email});
    }catch(err){
        return res.status(500).json({ message: err.message });
    }
    if(!existingUser){
        return res.status(404).json({ message: "User is not exists" });
    }
    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
    if(!isPasswordCorrect){
        return res.status(400).json({ message: "Invalid credentials" });
    }
    return res.status(200).json({user: existingUser});
}