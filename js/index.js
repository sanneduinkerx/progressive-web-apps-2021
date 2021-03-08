// module express
const express = require('express')

const app = express()
const port = 3000

// starting page, req -> request and a respond
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// different path from client request
app.get('/example', (req, res) => {
  res.send('this is an example')
})

app.listen(port, () => {
  // log in terminal with message that de web server is running
  console.log(`Example app listening at http://localhost:${port}`)
})