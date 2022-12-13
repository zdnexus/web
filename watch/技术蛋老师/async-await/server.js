const express = require('express')
const cors = require('cors')

const app = express()

app.use(
    cors({
      origin: 'http://localhost:63343',
    })
)

app.get('/data1', (req, res) => {
  res.json({ data: '么么哒1' })
})

app.get('/data2', (req, res) => {
  res.json({ data: '么么哒2' })
})

app.get('/data3', (req, res) => {
  res.json({ data: '么么哒3' })
})

app.listen('9124', () => {
  console.log('9124 running！')
})