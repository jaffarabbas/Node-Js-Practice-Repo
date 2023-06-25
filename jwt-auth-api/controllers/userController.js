import UserModel from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UserController{
    static userRegistration = async (req, res) => {
        const { name, email, password, password_confirmation,tc } = req.body;
        const user = await UserModel.findOne({ email: email });
        if (user) {
            return res.status(400).json({ message: "Email already exists" });
        }else{
            if(name && email && password && password_confirmation && tc){
                if(password === password_confirmation){
                    try{
                        const salt = await bcrypt.genSalt(10);
                        const hashedPassword = await bcrypt.hash(password, salt);
                        const newUser = new UserModel({
                            name:name,
                            email:email,
                            password: hashedPassword,
                            tc:tc
                        });
                        await newUser.save();
                        const user = await UserModel.findOne({ email: email });
                        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: "1h" });
                        return res.status(201).json({ message: "User created successfully", token: token });
                    }catch(err){
                        return res.status(400).json({ message: err });
                    }
                }else{
                    return res.status(400).json({ message: "Passwords do not match" });
                }
            }else{
                return res.status(400).json({ message: "All fields are required" });
            }
        }
    }

    static userLogin = async (req, res) => {
        const {email, password} = req.body;
        if(email && password){
            const user = await UserModel.findOne({ email: email });
            if(user != null){
                const isMatch = await bcrypt.compare(password, user.password);
                if((user.email === email) && isMatch){
                    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: "1h" });
                    return res.status(200).json({ message: "User logged in successfully", token: token});
                }else{
                    return res.status(400).json({ message: "Invalid credentials" });
                }
            }else{
                return res.status(400).json({ message: "User does not exist" });
            }
        }else{
            return res.status(400).json({ message: "All fields are required" });
        }
    }

    static changeUserPassword = async (req, res) => {
        let { password, password_confirmation } = req.body;
        if(password && password_confirmation){
            if(password !== password_confirmation){
                return res.status(400).json({ message: "Passwords do not match" });
            }else{
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);
                await UserModel.findByIdAndUpdate(req.user._id, {$set: {password: hashedPassword}});
                return res.status(200).json({ message: "Password changed successfully" });
            }
        }else{
            return res.status(400).json({ message: "All fields are required" });
        }
    }

    static loggedInUser = async (req, res) => {
        return res.status(200).json({ user: req.user });
    }
}

export default UserController;