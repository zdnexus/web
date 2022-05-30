const express = require('express')
const express_session = require('express-session')

const app = express()

const DB = [
  {
    username: 'larryzhong',
    password: '123456'
  }
]
let session_db

app.use(express_session({
  secret: 'larryzhong_secret',  // 加签
  name: 'larryzhong_name',      // 默认sid
  cookie: {
    maxAge: 15000
  },
  resave: false,
  saveUninitlized: false
}))

app.get('/', (req, res) => {
  console.log('用户访问了页面')
  session_db = req.session
  console.log(session_db)
  if (session_db.username) {
    console.log('用户有登录态')
    res.send(
      `<h1>欢迎回来，${session_db.username}</h1>
        <a href="/logout">退出</a>`
    )
  } else {
    console.log('用户没有登录态')
    res.sendFile(__dirname + '/index.html')
  }
})

app.post('/login', (req, res) => {
  console.log('用户登录')
  console.log(req.body)
  console.log(res.body)
  if (DB.filter(item => item.username === req.body.username && item.password === req.body.password)) {
    console.log('用户登录成功')
    session_db = req.session
    session_db.username = req.body.username
    res.send(
      `<h1>欢迎回来，${session_db.username}</h1>
        <a href="/logout">退出</a>`
    )
  } else {
    console.log('用户登录失败')
    res.send('用户名或者密码错误')
  }
})

app.get('/logout', (req, res) => {
  console.log('用户退出')
  req.session.destroy()
  console.log(`用户已退出网页，当前服务器的session内容为：${req.session}`)
  res.redirect('/')
})

app.listen('9124', () => {
  console.log('9124 running！')
})