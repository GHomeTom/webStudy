// 1.1 导入 fs 模块
const fs = require('fs')
const { replace } = require('lodash')
// 1.2 导入 path 模块
const path = require('path')

// 1.3 定义正则表达式，分别匹配 <style></style> 和 <script></script> 标签
const regStyle=/<style>[\s\S]*<\/style>/
const regScript=/<script>[\s\S]*<\/script>/

// 2.1 调用 fs.readFile() 方法读取文件
fs.readFile(path.join(__dirname,'./index.html'),'utf-8',function(err,resStr){
  if(err){
    return console.log('讀取失敗'+err.message)
  }
  // console.log(resStr)
  resCss(resStr)
  resJs(resStr)
})


// 3.1 定义处理 css 样式的方法
function resCss(str){
  // 使用正则筛选出关键字符串
  const rstyle = regStyle.exec(str)
  const newCss= rstyle[0].replace('<style>','').replace('</style>','')
  // console.log(newCss);
  // 写入clock中的文件index.css
  fs.writeFile(path.join(__dirname,'./clock/index.css'),newCss,err=>{
    if (err) {
      console.log('写入失败'+err.message);
    }
  })

}

// 4.1 定义处理 js 脚本的方法
function resJs(str){
  // 使用正则筛选出关键字符串
  const rscript = regScript.exec(str)
  const newJs= rscript[0].replace('<script>','').replace('</script>','')
  // console.log(newCss);
  // 写入clock中的文件index.js
  fs.writeFile(path.join(__dirname,'./clock/index.js'),newJs,err=>{
    if (err) {
      console.log('写入失败'+err.message);
    }
  })

}

// 5.1 定义处理 HTML 结构的方法
function resHtml(str){
  const rhtml = str.replace(regStyle,'<link rel="stylesheet" href="./index.css">').replace(regScript,'<script src="./index.js"></script>')
  fs.watchFile(path.join(__dirname,'./clock/index.html'),rhtml,err=>{
    if(err){
      console.log('写入失败'+err.message);
    }
  })
}