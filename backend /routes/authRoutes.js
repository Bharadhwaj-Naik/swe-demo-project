import express from 'express' ;
import { body } from 'express-validator';
import {
    register,
    login,
    getProfile,
    updateProfile ,
    changePassword 
} from '../controllers/authController.js' ;
import protect from '../middleware/auth.js';

const router = express.Router() ;

// validation middleware
const registerValidation = [
    body('username')
        .trim()
        .isLength({min : 3}) 
        .withMessage('Username must be atLeast 3 characters') ,
    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Password must be atLeast 6 characters') 
];

const loginValidation = [
    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Please provide a valid Email') ,
    body('password')
    .notEmpty()
    .withMessage('password is required')
];

// public routes 
router.post('/register' , registerValidation , register) ;
router.post('/login' , loginValidation , login) ;

// protected routes
router.get('/profile' , protect , getProfile) ;
router.put('/profile' , protect , updateProfile) ;
router.post('/change-password' , protect , changePassword) 

export default router ;