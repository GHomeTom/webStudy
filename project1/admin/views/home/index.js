


// 引入模块
// 接受load（）
import { load, isLogin } from '/project1/admin/util/LoadView.js'

// 导入后运行
// 这里传入的参数是为了实现侧边导航栏对应页面菜单的高亮颜色样式，即正在浏览的页面的显示
// 传入首页id，首页高亮
load('side-nav')

// 获取本地存储的用户信息
let user = JSON.parse(isLogin())
// console.log(user)
// 获取个人信息userprofile对象，用模板字符串对其渲染数据
document.querySelector('.userprofile').innerHTML = `
    <img src='${user.photo}' style='width:100px; height:100px; border-radius: 50%;'/>
    <div>
        <div>${user.username}</div>
        <div><textarea class='limitpre' cols='80' rows="3" maxlength="200" disabled>${user.introduction || '这个人很高冷'}</textarea></div>
    </div>
`

// 分析数组数据，创建模板obj替换echarts中的data[]
async function countArr() {
    let Arr = await fetch(`http://localhost:5000/news?author=${user.username}`).then(res => res.json())
    // 创建一个空数组用来接收echarts对象中的data模板数组，用于替换echarts中的数据
    let obj = []
    // 使用lodash中的方法分类数组
    let arr=_.groupBy(Arr,item=>item.sort)
    // for in 遍历数组，以echarts中的data数组为模板push到空数组obj中
    for (let i in arr) {
        obj.push({
            value:arr[i].length,
            name:i
        })
    }
    // 将obj模板数组传入渲染echarts函数中
    renderEcharts(obj)  
}

// 渲染echarts图函数
function renderEcharts (arr) {

// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('main'));

// 指定图表的配置项和数据
var option;

option = {
    title: {
        text: '你已发布的新闻类别统计',
        subtext: '不同类别占比',
        left: 'center'
    },
    tooltip: {
        trigger: 'item'
    },
    legend: {
        orient: 'vertical',
        left: 'left'
    },
    series: [
        {
            name: '发布数量',
            //   柱状图饼状图等样式type
            type: 'pie',
            radius: '50%',

            // 将data数据替换成obj模板数组
            data: arr,
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};
// setOption()方法
option && myChart.setOption(option);
}

// 执行函数，渲染页面
countArr()





