const mongoose = require('mongoose');
// 创建一个和集合相关的 scheme 对象
var Schema = mongoose.Schema;

var foodSchema = new Schema({
    name: { type: String, required: true },
    price: { type: String, required: true },
    desc: { type: String, required: true },
    typename: { type: String, required: true },
    typeid: { type: Number, required: true },
    img: { type: String, required: true }
});
// 将 scheme 对象转化为数据模型
var Food = mongoose.model('foods', foodSchema);  //该数据对象和集合相关联

module.exports = Food