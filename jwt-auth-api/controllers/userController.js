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
                        return res.status(201).json({ message: "User created successfully" });
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
}

export default UserController;