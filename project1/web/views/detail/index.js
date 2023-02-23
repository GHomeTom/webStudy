// 引入模块
// 接受load（）
import { load } from '/project1/web/util/LoadView.js'

// 导入后运行
// 这里传入的参数是为了实现侧边导航栏对应页面菜单的高亮颜色样式，即正在浏览的页面的显示
// 传入当前页面的id，首页高亮
load('topNews')




async function render () {
    let id = new URL(location.href).searchParams.get('id')
    let obj = await fetch(`http://localhost:5000/news?id=${id}`).then(r=>r.json())
    // console.log (obj,obj[0].title)
    document.querySelector('.title').innerHTML=obj[0].title
    document.querySelector('.author').innerHTML=`作者：${obj[0].author}`
    document.querySelector('.newcontent').innerHTML=obj[0].content

}

render()