


// 引入模块
// 接受load（）
import {load, isLogin} from '/project1/admin/util/LoadView.js'

// 导入后运行
// 这里传入的参数是为了实现侧边导航栏对应页面菜单的高亮颜色样式，即正在浏览的页面的显示
// 传入新闻列表id，该部分高亮
load('side-newlist')

// 初始化模态
const showModal = new bootstrap.Modal(document.getElementById('showModal'))

let list =[]
async function render() {
    let username = JSON.parse(isLogin()).username

    list = await fetch(`http://localhost:5000/news?author=${username}`).then(res=>res.json())
    bodylist.innerHTML=list.map(itm=>`
        <tr>
            <th scope="row" style='height:60px;line-height:60px'>${itm.title}</th>
            <td style='height:60px;line-height:60px'>
            ${itm.sort}
            </td>
            <td style='height:60px;line-height:60px'>
                <button type="button" class="btn btn-success btn-show"} data-myid='${itm.id}'>预览</button>
                <button type="button" class="btn btn-primary btn-edit"} data-myid='${itm.id}'>编辑</button>
                <button type="button" class="btn btn-danger btn-del"} data-myid='${itm.id}'>删除</button>
            </td>
            
        </tr>
    `).join('')
}


// 给tbody添加点击事件,即事件委托

// 接受点击事件对应的新闻的id号
let updataId
bodylist.onclick = function (e) {
    // console.log('1')
    if (e.target.className.includes('btn-show')) {
        // 显示modal
        showModal.toggle()
        // 预填modal内容
        updataId = e.target.dataset.myid
        let { title, content} = list.filter(it => it.id == updataId)[0]
        document.querySelector('#title').innerHTML = title
        document.querySelector('#content').innerHTML = content

        btnSure.onclick = async function () {
            // 切换modal框显示关闭
            showModal.toggle()
            
        }
    }
    // 删除列表新闻
    else if (e.target.className.includes('btn-del')) {
        // 显示modal提示框
        showModal.toggle()
        // 接受点击事件按钮的id号
        updataId = e.target.dataset.myid
        let {title} = list.filter(it => it.id == updataId)[0]
        document.querySelector('#title').innerHTML = '提示'
        document.querySelector('#content').innerHTML = `你确定删除《${title}》这条新闻吗？`
        // 接受操作数据对象
        let listrm = list.filter(it => it.id == updataId)[0]
        btnSure.onclick = async function () {
            await fetch(`http://localhost:5000/news/${updataId}`, {
                method: 'delete'}).then(res => res.json())
            // 切换modal框显示关闭
            showModal.toggle()
            // 重新渲染删除后的数据
            render()
        }
    }
    // 编辑列表新闻
    else if (e.target.className.includes('btn-edit')) {
        // 跳转到编辑新闻页面
        location.href='/project1/admin/views/news-manage/editNew/index.html?id='+e.target.dataset.myid
    }
}



render()