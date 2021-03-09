// module imported express - source: https://expressjs.com/en/starter/hello-world.html
const express = require('express')
const app = express()

//port to listen to in browser
const port = 3000

// starting page, req -> request and a respond
app.get('/', (req, res) => {
  //sends response to browser
  res.send('Hello World!!!')
})

// different path from client request
app.get('/example', (req, res) => {
  res.send('this is an example')
})

app.listen(port, () => {
  // log in terminal with message that de web server is running
  console.log(`Example app listening at http://localhost:${port}`)
})