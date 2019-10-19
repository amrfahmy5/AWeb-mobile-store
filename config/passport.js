var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
/*
amrfahmy300210@gmail.com
$2a$05$zOCoFYDLR1ynadkHk7xd1eD6yqDHolqQ2t8t5OK/kN3W7Wq7hlq2K
*/
var User = require('../model/user_db');
passport.serializeUser((user, done) => {
    return done(null, user.id);
});
passport.deserializeUser((id, done) => {
    User.findOne({ _id: id }, ('email'), (error, result) => {
        return done(error, result)
    })
});
passport.use('signin-strategy', new localStrategy({
    usernameField: 'email',
    passwordField: 'pw',
    passReqToCallback: true
}, (req, email, pw, done) => {
    User.findOne({ email: email }, (error, result) => {
        if (error)
            return done(error);
        if (!result)
            return done(null, false, req.flash('signinV', 'cant find user with this email'));
        if (result.PassWord != pw)
            return done(null, false, req.flash('signinV', 'cant find user with this pw'));
        return done(null, result);
    })
}))











passport.use('localsignup',new localStrategy({
    usernameField:'email',
    passwordField:'pw1',
    passReqToCallback: true
},(req,email,pw1,done)=>{
    User.find({email:email},(error,result)=>{
        if(error)
            return done(error)
        if(result.length>0)
            return done(null,false,req.flash('SignupU','Have User With this email'))

            var user = new User({
                email:email,
                PassWord:new User().hashPassword(pw1),
            })
            user.save((error,user)=>{
                if(error)
                    return done(error);
            return done(null,result);
            });
    })
    
}))