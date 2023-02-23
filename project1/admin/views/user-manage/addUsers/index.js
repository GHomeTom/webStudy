


// 引入模块
// 接受load（）
import { load } from '/project1/admin/util/LoadView.js'

// 导入后运行
// 这里传入的参数是为了实现侧边导航栏对应页面菜单的高亮颜色样式，即正在浏览的页面的显示
// 传入添加用户id，该部分高亮
load('side-adduser')




// 添加新用户功能

// 定义一个变量接受上传的图片的base64编码
let photo = ''

// 给表单绑定点击提交按钮事件
// async等待fetch，post到后端存数据
adduserform.onsubmit = async function (e) {
    // 阻止表单提交默认行为
    e.preventDefault()
    console.log(username.value, password.value, introduction.value, photo)

    // 向json数据库中的users对象里post新的用户数据
    await fetch('http://localhost:5000/users', {
        method: 'post',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            // 为users对象内的属性赋值，即存储用户数据
            username: username.value,
            password: password.value,
            introduction: introduction.value,
            photo
        })
    }).then(res => res.json())
    // 转到用户列表页面
    { location.href = '/project1/admin/views/user-manage/userList/index.html' }

}

// 每当输入文件photofile对象发生改变时
photofile.onchange = function (evt) {
    // console.log(evt.target.files[0])
    // 转化成base64格式
    // new一个读取文件的函数
    let reader = new FileReader()
    // 以什么方式读取文件
    reader.readAsDataURL(evt.target.files[0])
    // 等待读取完成后，将base64格式读取的文件结果保存到photo中
    reader.onload = function (e) {
        // console.log (e.target.result)
        photo = e.target.result
    }
}