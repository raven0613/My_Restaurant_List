const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/users');


module.exports = app => {
  app.use(passport.initialize());
  app.use(passport.session());


  passport.use(new localStrategy({ usernameField : 'email' } , (email , password , done) => {
    User.findOne({ email })
        .then(user => {
          if(!user){
            console.log('email is not registered')
            return done(null , false)
          }
          return bcrypt
            .compare(password , user.password)
            .then(isMatched => {
              if(!isMatched){
                console.log('email or password incorrect')
                return done(null , false)
              }
              console.log('login success')
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
