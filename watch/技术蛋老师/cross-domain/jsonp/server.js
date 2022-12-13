// JSONP即JSON with Padding。
// 由于同源策略的限制，XmlHttpRequest只允许请求当前源（域名、协议、端口）的资源。
// 如果要进行跨域请求，我们可以通过使用html的script标记来进行跨域请求，并在响应中返回要执行的script代码，其中可以直接使用JSON传递javascript对象。
// 很明显，JSONP是一种脚本注入(Script Injection)行为，需要特别注意其安全性。
const express = require('express')

const app = express()

app.get('/data', (req, res) => {
  res.jsonp({ data: '么么哒' })
})

app.listen('9124', () => {
  console.log('9124 running！')
})