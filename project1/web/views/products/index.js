// 引入模块
// 接受load（）
import {load } from '/project1/web/util/LoadView.js'

// 导入后运行
// 这里传入的参数是为了实现侧边导航栏对应页面菜单的高亮颜色样式，即正在浏览的页面的显示
// 传入当前页面的id，首页高亮
load('topProducts')




async function render () {

    // 获取json数据文件中的products数据
    let list = await fetch ('http://localhost:5000/products').then(res=>res.json())    
    // console.log(list)

    // 动态创建指示器
    // index为map()函数中的索引值
    // map（）将list数据中的图片等信息动态替换html的数据，并映射给父节点下
    let downPoint = document.querySelector('.carousel-indicators')  
    downPoint.innerHTML = list.map((i,index)=>
        `
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="${index}" class="active" aria-current="true" aria-label="${i.title}"></button>
        `
    ).join('')

    // 动态创建slide轮播内容
    let playPic = document.querySelector('.carousel-inner')
    playPic.innerHTML = list.map((i,index)=>
        `
        <div class="carousel-item ${index===0?'active':''}">
        <div style="background-image: url(${i.cover}); width: 100%; height: calc(100vh - 50px); background-size: cover;"></div>
        <div class="carousel-caption d-none d-md-block">
          <h5>${i.title}</h5>
          <p>${i.introduction}</p>
        </div>
      </div>
        
        `
    ).join('')

}


render()

