import express from "express";
import mongoose, { connect } from "mongoose";
import dotenv from "dotenv";
import router from "./routes/user-routes";
//load env variables
dotenv.config();

const app = express();
//for resseving data from body
app.use(express.json());
//router middleware
app.use('/api/users/',router);

mongoose,connect(process.env.DB_KEY).then(() => {
    console.log("Connected to DB");
    app.listen(5000, () => console.log('Server is running on port 5000'));
}).catch((err) => {
    console.log(err);
});

