const { register, login } = require('../services/userService.js');
const { errorParser } = require('../util/parser.js');
const { body, validationResult } = require('express-validator');
const { isAuth, isGuest } = require('../middlewares/guards.js');

const userController = require('express').Router();

userController.get('/register', isGuest(), (req, res) => {
    res.render('register');
});

userController.post('/register', isGuest(),

    body('username')
        .isLength({ min: 2 }).withMessage('Username must be at least 2 characters long'),
    body('email')
        .isEmail().withMessage('Use valid email')
        .isLength({ min: 10 }).withMessage('Email must be at least 10 characters long'),
    body('password')
        .isLength({ min: 4 }).withMessage('Password must be at least 4 characters long'),


    async (req, res) => {
        try {
            const { errors } = validationResult(req);
            if (errors.length > 0) {
                throw errors 
            }
            
            if (req.body.password !== req.body.repass) {
                throw new Error('Passwords don\'t match');
            }

            const token = await register(req.body.username, req.body.email, req.body.password);
            res.cookie('token', token)
            res.redirect('/');   
           
        } catch (err) {
            res.render('register', {
                ...req.body,
                errors: errorParser(err)
            });
        }
    });

userController.get('/login', isGuest(), (req, res) => {
    res.render('login');
});


userController.post('/login', isGuest(), async (req, res) => {
    try {
        const token = await login(req.body.email, req.body.password);
        res.cookie('token', token);
        res.redirect('/');          

    } catch (err) {
        res.render('login', {
            ...req.body,
            errors: errorParser(err),
        });
    }
});

userController.get('/logout', isAuth(), (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
});

module.exports = userController;