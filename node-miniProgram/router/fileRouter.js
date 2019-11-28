const express = require('express')
const router = express.Router()
const multer = require('multer')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //指定文件路径
      cb(null, './static/img')
    },
    filename: function (req, file, cb) {
        //指定文件名
        let exts = file.originalname.split('.')
        let ext = exts[exts.length-1]
        let tmpname = ((new Date()).getTime() + parseInt(Math.random()*9999))
        cb(null, `${tmpname}.${ext}`)
    }
  })
   
  var upload = multer({ storage: storage })

  router.post('/upload',upload.single('name'),(req,res)=>{
    //name是要上传图片的key值，必须前后端统一
    // {
    //     "name": 图片数据
    // }
    let {size,mimetype,path} = req.file
    let types = ['jpg','jpeg'] //允许上传格式
    let tmpType = mimetype.split('/')[1]
    if(size>500000){
        res.send({err:-1,msg:'图片太大'})
    }else if(types.indexOf(tmpType)==-1){
        res.send({err:-1,msg:'图片格式错误'})
    }else{
        let url = `/public/img/${req.file.filename}`
        res.send({err:0,msg:'上传ok',img:url})
    }
  })
  

module.exports = router