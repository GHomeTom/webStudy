


// 引入模块
// 接受load（）用户信息isLogin()
import { load, isLogin} from '/project1/admin/util/LoadView.js'

// 导入后运行
// 这里传入的参数是为了实现侧边导航栏对应页面菜单的高亮颜色样式，即正在浏览的页面的显示
// 传入创建新闻id，该部分高亮
load('side-addnew')


// 引用wangeditor富文本编辑器
const { createEditor, createToolbar } = window.wangEditor

let content = ''
let cover=''
const editorConfig = {
    placeholder: 'Type here...',
    onChange(editor) {
        // 将富文本内容转化成html格式
        const html = editor.getHtml()
        //   console.log('editor content', html)
        // 同步html到全局变量中
        content = html
        // 也可以同步到 <textarea>
    }
}

const editor = createEditor({
    selector: '#editor-container',
    html: '<p><br></p>',
    config: editorConfig,
    mode: 'default', // or 'simple'
})

const toolbarConfig = {}

const toolbar = createToolbar({
    editor,
    selector: '#toolbar-container',
    config: toolbarConfig,
    mode: 'default', // or 'simple'
})

// 图片转化为base64格式
// 每当输入文件coverfile对象发生改变时
coverfile.onchange = function(evt) {
    // console.log(evt.target.files[0])
    // 转化成base64格式
    // new一个读取文件的函数
    let reader = new FileReader() 
    // 以什么方式读取文件
    reader.readAsDataURL(evt.target.files[0])
    // 等待读取完成后，将base64格式读取的文件结果保存到cover中
    reader.onload = function(e){
        // console.log (e.target.result)
        cover=e.target.result
    }
}

// console.log(document.querySelectorAll('#sort option')[sort.value].text)


// 给表单添加提交事件，提交创建的新闻信息
addNewform.onsubmit=async function(e) {
    // 阻止提交默认行为
    e.preventDefault()
    let sortName=document.querySelectorAll('#sort option')[sort.value].text
    await fetch('http://localhost:5000/news',{
        headers:{
            'content-type':'application/json'
        },
        method:'post',
        body:JSON.stringify({
            title:title.value,
            content,
            sort:sortName,
            cover,
            author:JSON.parse(isLogin()).username
        })
    }).then(res=>res.json())
    // 跳转到新闻列表
    location.href='/project1/admin/views/news-manage/newsList/index.html'
}
