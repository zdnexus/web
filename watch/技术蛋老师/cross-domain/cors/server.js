// 跨源资源共享 (CORS：Cross-Origin Resource Sharing)（或通俗地译为跨域资源共享）是一种基于 HTTP 头的机制。
// 该机制通过允许服务器标示除了它自己以外的其它 origin（域，协议和端口），使得浏览器允许这些 origin 访问加载自己的资源。
// 跨源资源共享还通过一种机制来检查服务器是否会允许要发送的真实请求，该机制通过浏览器发起一个到服务器托管的跨源资源的"预检"请求。
// 在预检中，浏览器发送的头中标示有 HTTP 方法和真实请求中会用到的头。

const express = require('express')
const cors = require('cors')

const app = express()
// 设置Access-Control-Allow-Origin:'*'
app.use(
    cors({
      // origin: '*',
      origin: 'http://localhost:63343',
    })
)

app.get('/data', (req, res) => {
  res.json({ data: '么么哒' })
})

app.listen('9124', () => {
  console.log('9124 running！')
})