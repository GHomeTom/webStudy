


// 引入模块
// 接受load（）
import { load } from '/project1/admin/util/LoadView.js'

// 导入后运行
// 这里传入的参数是为了实现侧边导航栏对应页面菜单的高亮颜色样式，即正在浏览的页面的显示
// 传入用户列表id，该部分高亮
load('side-userlist')

// 初始化模态
const myEditModal = new bootstrap.Modal(document.getElementById('editModal'))
const delModal = new bootstrap.Modal(document.getElementById('delModal'))
// or


// 渲染用户列表

let list = []
async function render() {

    // 向users数据库中请求数据放到list数组中
    list = await fetch('http://localhost:5000/users').then(res => res.json())
    // console.log(list)
    // map映射到模板字符串中
    bodylist.innerHTML = list.map(itm => `
        <tr>
            <th scope="row" style='height:60px;line-height:60px'>${itm.username}</th>
            <td style='height:60px;line-height:60px'>
                <img src='${itm.photo}' style='width:50px; height:50px; border-radius:50%;'/>
            </td>
            <td style='height:60px;line-height:60px'>
                <button type="button" class="btn btn-primary btn-edit" ${itm.default ? 'disabled' : ''} data-myid='${itm.id}'>编辑</button>
                <button type="button" class="btn btn-danger btn-del" ${itm.default ? 'disabled' : ''} data-myid='${itm.id}'>删除</button>
            </td>
            
        </tr>
    `).join('')
}


// 给tbody添加点击事件,即事件委托
// 接受图片数据变量
let photodata
// 接受当前新闻的id号
let updataId
bodylist.onclick = function (e) {
    // console.log('1')
    // 如果点击编辑按钮
    if (e.target.className.includes('btn-edit')) {
        // 显示编辑新闻modal
        myEditModal.toggle()
        // 预填modal内容，即展示当前新闻的内容
        // 获取当前新闻的id
        updataId = e.target.dataset.myid
        // filter搜寻list数组中参数id等于获取的id的对象，即找到该新闻在数据库的存储数据
        let { username, password, introduction, photo } = list.filter(it => it.id == updataId)[0]
        // 将数据库中找到的值赋值给当前页面的对象内容
        document.querySelector('#username').value = username
        document.querySelector('#password').value = password
        document.querySelector('#introduction').value = introduction
        // document.querySelector('#photofile') = photo
        photodata = photo
        // console.log('edit',updataId,list[updataId-1])

    }
    // 删除列表用户
    // 如果点击删除按钮
    else if (e.target.className.includes('btn-del')) {
        // console.log ('del')
        // 显示删除新闻modal提示框
        delModal.toggle()
        // 接受点击事件按钮的当前新闻对应的id号
        updataId = e.target.dataset.myid
        // 接受操作数据对象
        let listrm = list.filter(it => it.id == updataId)[0]
        btnSure.onclick = async function () {
            await fetch(`http://localhost:5000/users/${updataId}`, {
                method: 'delete'}).then(res => res.json())
            // 切换modal框显示关闭
            delModal.toggle()
            // 重新渲染修改后的数据
            render()
        }

    }
}

// 确认修改用户内容
editDone.onclick = async function () {
    await fetch(`http://localhost:5000/users/${updataId}`, {
        method: 'PATCH',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            username: document.querySelector('#username').value,
            password: document.querySelector('#password').value,
            introduction: document.querySelector('#introduction').value,
            photo: photodata
        })
    }).then(res => res.json())
    // 切换modal框显示关闭
    myEditModal.toggle()
    // 重新渲染修改后的数据
    render()
}


// 删除列表用户
// 绑定删除点击事件


// 渲染用户列表
render()