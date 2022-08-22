const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');

const router = express.Router();

const User = require('../../models/users');


//登入
router.post('/login' , (req , res , next) => {
  const {email , password} = req.body;
  const errors = [];

  if (!email || !password) {
    errors.push({ message : '所有欄位都是必填' });
    return res.render('login' , { email , errors })
  }
  return next();
} ,
 passport.authenticate('local' , {
  failureRedirect: '/users/login',
  successRedirect: '/'
}) )


//註冊
router.post('/register' , (req , res) => {
  const {name , email , password , confirmPassword} = req.body;
  const errors = [];

  if (!email || !password || !confirmPassword) {
    errors.push({ message : '請填入所有必填資料' });
  }
  if (password !== confirmPassword) {
    errors.push({ message : '密碼與確認密碼不相符' })
  }

  User.findOne({ email })
      .then(user => {
        if (user) {
          errors.push({ message : '這個 email 已經註冊過了' })

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
          .then(hash => {
            const nameContainer = name? name : '小當家';
            User.create({
            name : nameContainer , email , password: hash
          })})
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