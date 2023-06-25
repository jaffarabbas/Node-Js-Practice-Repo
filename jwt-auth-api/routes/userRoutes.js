import express from 'express';
import UserController from '../controllers/userController.js';
const router = express.Router();

//public routes
router.post('/register', UserController.userRegistration);

//private routes

export default router;