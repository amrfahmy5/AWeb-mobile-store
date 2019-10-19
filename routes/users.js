var express = require('express');
var router = express.Router();
var passport = require('passport');
var controller_user=require('../controller/user_controller')
const {check, validationResult}=require('express-validator');
const User = require('../model/user_db');
const csrf = require('csurf')
router.use(csrf());
/* GET users listing. */
router.get('/logout',controller_user.logout);
router.get('/asdasd',(req,res,next)=>{
    req.csrfToken
})
router.get('/signup',controller_user.islogin,controller_user.signup_get);
router.post('/signup',[check('username').not().isEmpty().withMessage("User name is Empty"),
check('email').not().isEmpty().withMessage("Email is Empty"),
check('email').isEmail().withMessage("Email with wrong format"),
check('pw1').not().isEmpty().withMessage("PassWord is Empty"),
check('pw1').isLength({min:5}).withMessage("Password size shoud be more than 5",
check('pw2').equals('pw1').withMessage('Password not confirmed'))],controller_user.signup_post,passport.authenticate('localsignup',{
    session:false,
    successRedirect:'/users/profile',
    failureRedirect:'/users/signup',
    failureFlash : true 
}));



router.get('/login',controller_user.islogin,controller_user.login_get)
router.post('/login',[check('email').not().isEmpty().withMessage("Email is Empty"),
check('email').isEmail().withMessage("Email with wrong format"),
check('pw').not().isEmpty().withMessage("Password is Empty")],
controller_user.login_post,
passport.authenticate('signin-strategy',{
    successRedirect:'/users/profile',
    failureRedirect:'/users/login',
    failureFlash:true

}));


router.get('/profile',controller_user.isAuthenticated,controller_user.profile);

module.exports = router;
