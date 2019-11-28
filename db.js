//连接数据库
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test',{ useNewUrlParser: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('db ok')
});


//创建Schema对象
var Schema = mongoose.Schema;
var userSchema = new Schema({
us:  {type: String, required: true},
ps: {type: String, required: true},
age:  Number,
sex: { type: Number, default: 0 }
});

//将Schema对象转化为数据模型
var User = new mongoose.model('users', userSchema); //('集合名',Schema对象)

//操作数据库
//插入数据
// var arr = { us: 'Ming',ps: '123',age: 18 };
// User.insertMany(arr)
// .then((data)=>{
//     console.log(data)
//     console.log('插入成功')
// })
// .catch((err)=>{
//     console.log('插入失败')
// })
//查找数据
User.find()
.then((data)=>{
    console.log(data)
    console.log('查询成功')
})
.catch((err)=>{
    console.log('查询失败')
})
//删除数据
// User.remove()
// .then((data)=>{
//     console.log(data)
//     console.log('删除成功')
// })
// .catch((err)=>{
//     console.log('删除失败')
// })