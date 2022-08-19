const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');

const router = express.Router();

const User = require('../../models/users');


//登入
router.post('/login' , passport.authenticate('local' , {
  failureRedirect: '/users/login',
  successRedirect: '/'
}) )


//註冊
//先看有沒有重複的email
//重複就導回login
//沒有的話就create進DB 然後導回login 註冊完就登入?
router.post('/register' , (req , res) => {
  const {name , email , password , confirmPassword} = req.body;

  User.findOne({ email })
      .then(user => {
        if (user) {
          console.log('email is registered')
          res.render('/users/login' , {
            name , email , password , confirmPassword
          })
        }
        return bcrypt
          .genSalt(10)
          .then(salt => bcrypt.hash(password , salt))
          .then(hash => User.create({
            name , email , password: hash
          }))
          .catch(err => console.log(err))
      })
      .then(() => res.redirect('/'))
      .catch(err => console(err))
})


//進入登入頁面
router.get('/login' , (req , res) => {
  res.render('login');
})

//進入註冊頁面
router.get('/register' , (req , res) => {
  res.render('register');
})

//登出
router.get('/logout' , (req , res) => {
  req.logout();
  res.redirect('/users/login');
})



module.exports = router;