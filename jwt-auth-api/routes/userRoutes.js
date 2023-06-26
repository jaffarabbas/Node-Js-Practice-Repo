import express from 'express';
import UserController from '../controllers/userController.js';
import checkToken from '../middlewares/auth-middleware.js';
const router = express.Router();

//route middleware
router.use('/changePassword', checkToken);
router.use('/loggedUser', checkToken);

//public routes
router.post('/register', UserController.userRegistration);
router.post('/login', UserController.userLogin);
router.post('/send-reset-password-email', UserController.sendUserPasswordEmail);
router.post('/reset-password/:id/:token', UserController.userPasswordReset);

//private routes
router.post('/changePassword', UserController.changeUserPassword);
router.get('/loggedUser', UserController.loggedInUser);

export default router;