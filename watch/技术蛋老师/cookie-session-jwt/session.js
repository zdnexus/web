const express = require('express')
const express_session = require('express-session')
const bodyParser = require('body-parser')

const app = express()
// 使用req.body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())
// 使用session
app.use(express_session({
  secret: 'larryzhong_secret',
  name: 'larryzhong_name',
  cookie: {
    maxAge: 15000
  },
  resave: false,
  saveUninitlized: false
}))

const DB = [
  {
    username: 'larryzhong',
    password: '111111',
  }
]

app.get('/', (req, res) => {
  console.log('用户访问了页面')
  if (req.session.username) {
    console.log('用户有登录态')
    res.send(
        `<h1>欢迎回来，${req.session.username}</h1>
        <a href="/logout">退出</a>`
    )
  } else {
    console.log('用户没有登录态')
    res.sendFile(__dirname + '/index.html')
  }
})

app.post('/login', (req, res) => {
  console.log('用户登录')
  if (DB.some(item => item.username === req.body.username && item.password === req.body.password)) {
    console.log('用户登录成功')
    req.session.username = req.body.username
    console.log(`用户新的session对象：`)
    console.log(req.session)
    console.log(`当前的唯一会话ID：${req.sessionID}`)
    res.redirect('/')
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