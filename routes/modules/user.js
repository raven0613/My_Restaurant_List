const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');

const router = express.Router();

const User = require('../../models/users');


//登入
router.post('/login' , passport.authenticate('local' , {
  failureRedirect: '/users/login',
  failureMessage: true,
  successRedirect: '/'
}) )


//註冊
//先看有沒有重複的email 有沒有漏填  密碼有沒有一致
//重複就導回login
//沒有的話就create進DB 然後導回login 註冊完就登入?
router.post('/register' , (req , res) => {
  const {name , email , password , confirmPassword} = req.body;
  const errors = [];

  if (!name || !email || !password || !confirmPassword) {
    console.log('所有欄位都是必填')
    console.log(errors)
    errors.push({ message : '所有欄位都是必填' });
  }
  if (password !== confirmPassword) {
    console.log('密碼與確認密碼不相符')
    console.log(errors)
    errors.push({ message : '密碼與確認密碼不相符' })
  }

  User.findOne({ email })
      .then(user => {
        if (user) {
          errors.push({ message : '這個 email 已經註冊過了' })
          console.log('這個 email 已經註冊過了')
          console.log(errors)

          return res.render('register' , {
            name , email , errors
          })
        }
        else if (errors.length) {
          return res.render('register' , {
            name , email , errors
          })
        }
        
        return bcrypt
          .genSalt(10)
          .then(salt => bcrypt.hash(password , salt))
          .then(hash => User.create({
            name , email , password: hash
          }))
          .then(() => res.redirect('/'))
          .catch(err => console.log(err))
      })
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
  req.flash('success_msg' , '你已經成功登出')
  res.redirect('/users/login');
})



module.exports = router;