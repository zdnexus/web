const express = require('express')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')

const app = express()
// 使用req.body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())

const DB = [
  {
    username: 'larryzhong',
    password: '111111'
  }
]
const jwtSecret = 'larryzhong_secret'

app.get('/', (req, res) => {
  console.log('用户访问了页面')
  const headers = req.headers
  if (headers['authorization']) {
    const token = headers['authorization'].split('')[1]
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        console.log('用户退出登录态')
        res.sendFile(__dirname + '/index.html')
      } else {
        console.log('用户有登录态')
        res.send(
            `<h1>欢迎回来，${login_session.username}</h1>
        <a href="/logout">退出</a>`
        )
      }
    })
  } else {
    console.log('用户没有登录态')
    res.sendFile(__dirname + '/index.html')
  }
})

app.post('/login', (req, res) => {
  console.log('用户登录')
  if (DB.some(item => item.username === req.body.username && item.password === req.body.password)) {
    console.log('用户登录成功')
    jwt.sign(
        {
          name: req.body.username,
        },
        jwtSecret,
        {
          algorithm: 'HS256',
          expiresIn: 10000,
        },
        (err, token) => {
          if (err) res.sendStatus(403)
          res.json({
            username: req.body.username,
            msg: '登录成功',
            token
          })
          res.redirect('/')
        }
    )
  } else {
    console.log('用户登录失败')
    res.send('用户名或者密码错误')
  }
})

app.get('/logout', (req, res) => {
  console.log('用户退出')
  res.redirect('/')
})

app.listen('9124', () => {
  console.log('9124 running！')
})