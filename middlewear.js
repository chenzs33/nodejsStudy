const express = require('express')
const app = express()

app.use('/',(req,res,next)=>{
    let {token} = req.query
    if(token){
        res.send({'msg':'ok'})
    }else{
        res.send({'msg':'缺少token'})
    }
})

app.get('/user/test1',(req,res)=>{
    res.send({'msg':'11111'})
})

app.get('/user/test2',(req,res)=>{
    res.send({'msg':'22222'})
})


app.listen(3000,()=>{
    console.log('server start')
})