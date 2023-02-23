// 引入模块
// 接受load（）
import { load } from '/project1/web/util/LoadView.js'

// 导入后运行
// 这里传入的参数是为了实现侧边导航栏对应页面菜单的高亮颜色样式，即正在浏览的页面的显示
// 传入当前页面的id，首页高亮
load('topNews')


search.onclick = () => search.oninput()

let ls = document.querySelector('.list-group')
search.oninput = async function () {
    // 当输入内容为空时，隐藏列表
    if (!search.value) {
        ls.style.display = 'none'
        return
    }

    // search.value拿到输入的内容
    // console.log (search.value,!search.value)
    // 'key'_like是json提供的模糊查询功能
    let res = await fetch(`http://localhost:5000/news?title_like=${search.value}`).then(res => res.json())
    // console.log(res)
    ls.innerHTML = res.map(i => `
    <li class="list-group-item"><a href='/project1/web/views/detail/index.html?id=${i.id}' style='display:block;width:100%;height:100%;'>${i.title}</a></li>
    `).join('')

    // 显示搜索结果列表
    ls.style.display = 'block'
}

// 输入框失去焦点时。列表隐藏
// 延时200ms确保点击搜索结果时可以正常跳转 而不是失去焦点 
search.onblur = () => setTimeout(() => ls.style.display = 'none', 200)


// 开始渲染函数的构建，即渲染底部新闻封面展示
let list = []
async function render() {
    await renderList()
    renderSort()
}

async function renderList() {
    list = await fetch('http://localhost:5000/news').then(res => res.json())
    // 颠倒数组reverse（）
    list.reverse()
    let cardContent = document.querySelector('.cardContent')
    cardContent.innerHTML = list.slice(0, 4).map(i => `
        <div class="card" data-id =${i.id}>
            <div class="showPic" style="background-image: url(${i.cover});"></div>
            <div class="card-body">
                <h5 class="card-title">${i.title}</h5>
                <p class="card-text card-content">${i.content}</p>
                <div>作者：<p class="card-author">${i.author}</p></div>
                
            </div>
        </div>
    `).join('')

    // for...of语句在可迭代对象（包括 Array，Map，Set，String，TypedArray，arguments 对象等等）上创建一个迭代循环，调用自定义迭代钩子，并为每个不同属性的值执行语句
    // 为每个新闻卡片添加点击事件跳转到新闻详情页面，通过？id=  来追踪新闻信息
    let cards = document.querySelectorAll('.card')
    for (let i of cards) {
        // console.log(i.dataset.id)
        i.onclick = () => {
            location.href = `/project1/web/views/detail/index.html?id=${i.dataset.id}`
        }
    }
}

// 渲染bootstrap样式
function renderSort() {
    let sortObj = _.groupBy(list, i => i.sort)
    let tabs=[tab0,tab1,tab2]
    let numSort=['最新动态','典型案例','通知公告']
    // console.log(sortObj, tabs)
    // 遍历tabs，为每个tabs添加map（）映射，将模板html映射到指定节点中
    tabs.forEach((item,index) => {
        // console.log(item.innerHTML,index,sortObj[index])
        // true/false ? 执行/不执行
        // 给每个标签加上 data-id="${i.id}"确保点击时能获取到相应的新闻信息
        item.innerHTML = sortObj[numSort[index]]?.map(i => `
        <div class="list-item" data-id="${i.id}">
            <img src="${i.cover}" data-id="${i.id}" alt="">
            <div class="new-text" data-id="${i.id}">
            <p class="p1" data-id="${i.id}">${i.title}</p>
            <p class="p2" data-id="${i.id}">作者：${i.author}</p>
            </div>
            
        </div>
    `).join('')||'暂时还没有这类的新闻哦'

    // 给每个新闻展示条添加绑定点击事件
    item.onclick= function(e){
        // console.log('1',e.target.dataset.id)
        location.href = `/project1/web/views/detail/index.html?id=${e.target.dataset.id}`
    }
    })
    
    
}

render()
