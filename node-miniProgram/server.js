const express = require('express')
const path = require('path')
const db = require('./db/connect')

const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//jwt
const JWT = require('./utils/jwt')
//session相关
const cookieParser = require('cookie-parser')
const session = require('express-session')
app.use(session({
    secret:'abcdefg',    //为了安全性的考虑设置secret属性
    cookie: {maxAge: 60*1000*24*7},   //设置过期时间
    resave: true,
    saveUninitialized: false,
}))

app.use('/public',express.static(path.join(__dirname,'./static')))

//使用路由
let userRouter = require('./router/userRouter')
let foodRouter = require('./router/foodRouter')
let fileRouter = require('./router/fileRouter')
app.use('/user',userRouter)
//session-cookie
// app.use('/food',(req,res,next)=>{
//     console.log(req.body)
//     console.log(req.session)
//     if(req.session.login){
//         next()
//     }else{
//         res.send({err:-999,msg:'请先登录'})
//     }
// },foodRouter)

//jwt
app.use('/food',(req,res,next)=>{
    console.log(req.body)
    let {token} = req.body
    JWT.checkToken(token)
    .then((data)=>{
        next()
    })
    .catch((err)=>{
        res.send({err:-998,msg:'token非法'})
    })
},foodRouter)

app.use('/file',fileRouter)


app.listen(3000,()=>{
    console.log('server start')
})