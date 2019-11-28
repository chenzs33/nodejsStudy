const express = require('express')
const router = express.Router()
const User = require('../db/model/userModel')
const Mail = require('../utils/mail')
const JWT = require('../utils/jwt')

let codes = {}  //通过内存保存验证码

//注册
/**
 * @api {post} /user/reg 用户注册
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {Number} us 用户名.
 * @apiParam {Number} ps 密码.
 * @apiParam {Number} code 验证码.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.post('/reg', (req, res) => {
    let { us, ps, code } = req.body
    if (!us || !ps || !code) {
        return res.send({ err: -1, msg: '参数错误' })
    }
    else if (us && ps && code) {
        if(codes[us]!=code){
            return res.send({ err: -4, msg: '验证码错误' })
        }
        User.find({ us })
            .then((data) => {
                console.log(data)
                if (data.length === 0) {
                    return User.insertMany({ us: us, ps: ps })
                } else {
                    res.send({ err: -3, msg: '用户名已存在' })
                }
            })
            .then(() => {
                res.send({ err: 0, msg: '注册ok' })
            })
            .catch((err) => {
                res.send({ err: -2, msg: '注册err' })
            })
    } else {
        return res.send({ err: -1, msg: '参数错误' })
    }
})

//退出
router.post('/logOut',(req,res)=>{
    req.session.destroy();
    res.send({ err: 0, msg: '退出成功' })
})

//登录
router.post('/login', (req, res) => {
    let { us, ps } = req.body
    if (!us || !ps) {
        return res.send({ err: -1, msg: '参数错误' })
    }
    User.find({ us: us, ps: ps })
        .then((data) => {
            // console.log('loginData=>',data)
            if (data.length > 0) {
                //登录成功后将用户的相关信息存到session中
                // req.session.login = true
                // req.session.name = us

                //jwt
                let token = JWT.creatToken({login:true,name:us})
                
                res.send({ err: 0, msg: '登录成功', token:token })
            } else {
                res.send({ err: -2, msg: '用户名或密码不正确' })
            }
        })
        .catch((err) => {
            return res.send({ err: -1, msg: '内部错误' })
        })

})

//发送验证码
router.post('/getMailCode',(req,res)=>{
    let {mail} = req.body
    let code = parseInt(Math.random()*10000)

    codes[mail] = code  //将邮箱和邮箱匹配的验证码保存到缓存中
    console.log(codes)


    Mail.send(mail,code)
    .then(()=>{
        res.send({ err: 0, msg: '发送验证码成功' })
    })
    .catch((err)=>{
        res.send({ err: -1, msg: '发送验证码失败' })
    })
})


module.exports = router