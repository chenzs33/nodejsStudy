const express = require('express')
const path = require('path')
const app = express()

app.use(express.static(path.join(__dirname,'./dist')))
//http://localhost:3000/helloworld.html

app.listen(3000,()=>{
    console.log('server start')
})

