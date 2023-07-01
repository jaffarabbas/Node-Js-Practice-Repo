import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectDB from './config/connectdb.js';
import userRoutes from './routes/userRoutes.js';
import blogRouter from './routes/blogRouter.js';

dotenv.config();

const app = express();
const port = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;

//CORS 
app.use(cors());
// Connect to database
connectDB(DATABASE_URL);
//JSON
app.use(express.json());

//routes
app.use('/api/user', userRoutes);
app.use('/api/blogs/',blogRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

