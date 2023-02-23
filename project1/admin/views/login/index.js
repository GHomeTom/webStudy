// 对用户输入的信息进行提交和验证

const loginform = document.querySelector('#loginform')
loginform.onsubmit = async function (e) {
    idError.style.display = 'none'
    // 阻止submit默认提交行为
    // console.log('submit')
    e.preventDefault()
    // console.log(username.value, password.value)

    // 向json文件内post新数据
    // fetch("http://localhost:5000/users",{
    //     method:'post',
    //     headers:{
    //         'content-type':'application/json'
    //     },
    //     body:JSON.stringify({
    //         username:'aaa',
    //         password:'1234'
    //     })
    // }).then(res=>res.json()).then(res=>{
    //     console.log(res)
    // })

    // 根据用户输入的用户名和密码，从json数据中查找对应数据,根据返回值判断是否与json数据吻合
    let res = await fetch(`http://localhost:5000/users?username=${username.value}&password=${password.value}`).then(res => res.json())

    console.log(res)

    // 如果从json有返回数据,即数据有对应的数据,有数据长度
    // 跳转到管理系统首页
    if (res.length) {
        // 将获取的res对象转化为json格式存入本地存储token中
        localStorage.setItem('token',JSON.stringify({
            ...res[0],
            possword:'****'
        }
            ))
        // console.log(res[0])
        location.href = "/project1/admin/views/home/index.html"
    }
    // 返回的为空对象,即找不到对应的json数据,信息不匹配,用户名或密码错误
    else {
        // alert('error')
        idError.style.display = 'block'

    }
}