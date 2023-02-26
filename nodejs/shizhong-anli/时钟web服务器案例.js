const fs = require('fs')
const http = require('http')
const path = require('path')

const ser = http.createServer()

ser.addListener('request',(req,res)=>{
    const ur = req.url
    // const method = req.method
    // const fpath = path.join(__dirname,ur)
    // let str=`你的请求是${ur},方法：${method}`
    let fpath =''
    if(ur==='/'){
        fpath =path.join(__dirname,'./clock/index.html')
    }else {
        fpath =path.join(__dirname,'./clock',ur)
    }
    fs.readFile(fpath,'utf-8',(err,data)=>{
        if(err){
            console.log('读取失败404notfound')
            return res.end('404notfound');
        }
        res.end(data)
    })
    
    // console.log(str);
    // res.end(str)
})

ser.listen(80,()=>{
    console.log('服务请求在http://127.0.0.1');
})