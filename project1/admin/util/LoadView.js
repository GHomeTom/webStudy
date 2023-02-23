// 通过js获取本地的token确保用户登陆后的跳转相应页面正确

// Ajax获取请求index.html

// 实现的一般方式
// // 判断本地存储中的token是否有数据,即是否输入的用户名密码正确
// if (localStorage.getItem('token')) {
//     // 通过fetch获取顶部导航样式的html文本,然后插入到topbar中
//     fetch("/project1/admin/components/topbar/index.html").then(res => res.text()).then(res => {
//         // console.log(res)
//         document.querySelector('.topbar').innerHTML = res
//     })
// } else {
//     location.href = "/project1/admin/views/login/index.html"
// }


// 封装函数的方式，方便调用模块化方法

// 用户名密码提交后获取本地token:用户的登陆信息对象
// 导出isLogin()
function isLogin() {
    return localStorage.getItem('token')
}


// 渲染顶部topbar用户展示信息
// 传入user数据，获取对象内的属性来展示
function renderTopbar(user) {
    // 获取对象
    let userPic = document.querySelector('#topbar-photo')
    let userName = document.querySelector('#currentUsername')
    let exit = document.querySelector('#exit')
    // console.log(user.photo)

    // 渲染用户展示信息：欢迎信息
    userPic.src = user.photo
    userName.innerHTML = user.username

    // 绑定退出按钮的点击事件,退出登录
    exit.onclick = function () {
        // 移除本地存储token
        localStorage.removeItem('token')
        // 退出登录转到登陆界面
        location.href = '/project1/admin/views/login/index.html'
    }
}

// 渲染侧边栏菜单
async function renderSidemenu (user,id) {
    // 获取components中的sidemenu文件
    let sidemenuText = await fetch("/project1/admin/components/sidemenu/index.html").then(res => res.text())
    // console.log(res)
    // 渲染侧边栏
    document.querySelector('.sidemenu').innerHTML = sidemenuText

    // 对load(id)传入的参数进行操作，修改相应id的颜色实现页面对应菜单的高亮颜色
    document.querySelector('#' + `${id}`).style.color = '#0a58ca'

    // 对非管理员账号移除用户管理页面
    if (JSON.parse(user).role !== 'admin') {
        // console.log(JSON.parse(user).role)
        // 取得用户管理的节点并remove
        document.querySelector('.user-manage-item').remove()
    }
}

// 为load()传入参数，方便对侧边导航内的页面进行id定位，为每个导航标题添加选中的标签
async function load(id) {

    // 获取用户输入的账号密码（在本地存储中获取的数据token）
    let user = isLogin()

    // 是否可以从localStorage中获取数据（如果获取到对应的值）
    if (user) {
        // 登陆成功

        // 渲染顶部导航栏
        let topbarText = await fetch("/project1/admin/components/topbar/index.html").then(res => res.text())
        // console.log(res)
        document.querySelector('.topbar').innerHTML = topbarText

        // 渲染topbar用户展示信息
        // 传入user数据:转化为json对象,方便对数据进行操作和渲染
        renderTopbar(JSON.parse(user))

        renderSidemenu (user,id)

    }

    // 登录失败（用户输入的账号密码无法在json数据库中找到，本地存储中没有对应的token数据）踢出管理系统，返回登陆界面
    else {
        location.href = "/project1/admin/views/login/index.html"
    }
}

// 导出load这个方法
export { load, isLogin }


