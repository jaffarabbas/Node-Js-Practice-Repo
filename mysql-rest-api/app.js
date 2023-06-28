import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import DbConnection from './config/dbConfig.js';

const app = express();

app.use(express.json());
app.use(cors());

//database connection
DbConnection.databaseConnection().then(()=>{
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
});