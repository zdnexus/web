const express = require('express')
const e_session = require('express-session')

const app = express()

const name = 'larryzhong'
const password = '123456'

app.use(e_session({
  secret: 'larryzhong的签名',     // 给cookie-sessionId签名
  name: 'larryzhong的sessionId', // 默认sid
  cookie: {
    maxAge: 15000
  },
  resave: false,
  saveUninitlized: false
}))
