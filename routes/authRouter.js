import { Router } from 'express';
import { login, logout, register } from '../controller/authController.js';
import { ValidateLogin, ValidateRegister } from '../middleware/validationMiddleware.js';
const router = Router();


router.post('/register', ValidateRegister, register);
router.post('/login', ValidateLogin, login);
router.get('/logout', logout)


export default router;