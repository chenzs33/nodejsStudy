const express = require('express')
const app = express()

//利用插件body-parser  |  注意请求数据格式
// const bodyParser = require('body-parser')
// app.use(bodyParser.urlencoded({extended:false}))
// app.use(bodyParser.json())

// app.get('/user/login',(req,res)=>{
//     let {user,pass} = req.query
//     if(user=="123"&pass=="123"){
//         res.send({'msg':'ok'})
//     }else{
//         res.send({'msg':'no ok'})
//     }
// })
// app.post('/user/reg',(req,res)=>{
//     let {use,pass} = req.body
//     if(use=="123"&pass=="123"){
//         res.send({'msg':'ok'})
//     }else{
//         res.send({'msg':'no ok'})
//     }
// })

//使用路由
let userRouter = require('./router/userRouter')
app.use('/user',userRouter)

app.listen(3000,()=>{
    console.log('server start')
})