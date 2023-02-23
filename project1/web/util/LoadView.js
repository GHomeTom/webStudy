// 通过js获取本地的token确保用户登陆后的跳转相应页面正确

// Ajax获取请求index.html
// 封装函数的方式，方便调用模块化方法
//import {lod} from '../components/topbar/index.html'
// 为load()传入参数，方便对侧边导航内的页面进行id定位，为每个导航标题添加选中的标签
async function load(id) {


   
        // 渲染顶部导航栏
        let topbarText = await fetch("/project1/web/components/topbar/index.html").then(res => res.text())
        // console.log(res)
        document.querySelector('.topbar').innerHTML = topbarText
        document.querySelector(`#${id}`).style.color = '#0a58ca'
    }

    

// 导出load这个方法
export {load}


