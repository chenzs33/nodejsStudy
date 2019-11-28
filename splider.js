const http = require('https')
const fs = require('fs')
const cheerio = require('cheerio')
//利用cheerio分析爬到的数据--jq语法

let url = "https://www.qunar.com"
let rawData = ''
http.get(url,(res)=>{
    res.on('data',(chunk)=>{
        rawData+=chunk.toString('utf8')
    })
    res.on('end',()=>{
        //将爬到的文件存到目录文件夹
        // fs.writeFileSync('./spliderData.html',rawData)

        let $ = cheerio.load(rawData)
        $('img').each((index,el)=>{
            console.log($(el).attr('src'))
        })

        console.log('数据传输完毕')
    })
}).on('error',(err)=>{
    console.log('请求错误')
})
