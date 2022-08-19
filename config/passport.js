const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/users');
const flash = require('connect-flash');

module.exports = app => {
  app.use(passport.initialize());
  app.use(passport.session());


  passport.use(new localStrategy({ 
    usernameField : 'email' , passReqToCallback : true } , 
    (req , email , password , done) => {
      console.log(req.session.messages)  

    if (!email.length || !password.length) {
      console.log(req.session.messages)
      console.log('所有欄位都是必填')
      req.flash('warning_msg' , '所有欄位都是必填');
      return done(null , false , { message : '所有欄位都是必填'});
    }

    User.findOne({ email })
        .then(user => {
          if(!user){
            req.flash('warning_msg' , 'email 或 密碼不正確');
            return done(null , false);
          }
          return bcrypt
            .compare(password , user.password)
            .then(isMatched => {
              if(!isMatched){
                req.flash('warning_msg' , 'email 或 密碼不正確');
                return done(null , false);
              }
              return done(null , user)
            })
            .catch(err => console.log(err))
        })
        
        .catch(err => done(err , false))
  }))


  passport.serializeUser((user , done) => {
    done(null , user._id)
  })
  passport.deserializeUser((id , done) => {
    User.findById(id)
        .lean()
        .then(user => done(null , user))
        .catch(err => done(err , null))
  })
}
