const { validationResult } = require('express-validator');
const user_db = require('../model/user_db')


const signup_post = (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        req.flash('errorSV', error.errors);
        res.redirect('/users/signup');
        return;
    }
    else
        next();

}
const signup_get = (req, res, next) => {
    errorSV = req.flash('errorSV')
    errord = req.flash('SignupU')
    res.render('user/signup', { errors: errorSV, errord: errord,token:req.csrfToken() })
}




const login_post = (req, res, next) => {
    error = validationResult(req);
    if (!error.isEmpty()) {
        req.flash('errorVal', error.errors);
        res.redirect('/users/login');
        return;
    }
    else {
        next();
    }
}
const login_get = (req, res, next) => {
    error = req.flash('errorVal');
    error2 = req.flash('signinV');
    console.log(error);
    console.log(error2);
    res.render('user/login',{errors: error,token:req.csrfToken(),error: error2 });
    
}



const profile = (req, res, next) => {
    user_db.find({}, (error, result) => {
        if (!error)
            res.render('user/profile',{check:req.isAuthenticated()});
    })
}
const logout = (req, res, next) => {
    req.logOut();
    res.redirect('/users/login');
}



const isAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated()) {
        res.redirect('/users/login')
        return;
    }
    else
        next();
}
const islogin = (req,res,next)=>{
    if(req.isAuthenticated())
        res.redirect('/')
    else
        next();
}



module.exports = {
    signup_post: signup_post,
    signup_get: signup_get,
    login_post: login_post,
    login_get: login_get,
    profile: profile,
    logout: logout,
    isAuthenticated: isAuthenticated,
    islogin:islogin
}