// nginx-proxy反向代理

const express = require('express')

const app = express()

app.get('/data', (req, res) => {
  res.json({ data: '么么哒' })
})

app.listen('9124', () => {
  console.log('9124 running！')
})