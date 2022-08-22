const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const facebookStrategy = require('passport-facebook').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/users');


module.exports = app => {
  app.use(passport.initialize());
  app.use(passport.session());


  passport.use(new localStrategy({ 
    usernameField : 'email' , passReqToCallback : true } , 
    (req , email , password , done) => {
      
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

  passport.use(new facebookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK,
    profileFields: ['email' , 'displayName']
  } , (acceccToken , refreshToken , profile , done) => {
      const { name , email } = profile._json;

      User.findOne({ email })
          .then(user => {
            if(user) return done(null , user);

            const randomPassword = Math.random().toString(36).slice(-8);
            return bcrypt
              .genSalt(10)
              .then(salt =>
                bcrypt.hash(randomPassword , salt)
              )
              .then(hash => 
                User.create({
                  name , email , password : hash
                })
              )
              .then(user => done(null , user))
              .catch(err => done(err , false))
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
