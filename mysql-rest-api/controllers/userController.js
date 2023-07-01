import { create } from '../services/userService.js';
import bcrypt from 'bcrypt';

class UserController {
    static async createUser(req, res) {
        const body = req.body;
        const salt = await bcrypt.genSalt(10);
        body.password = await bcrypt.hash(body.password, salt);
        
        create(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    }
}

export default UserController;
