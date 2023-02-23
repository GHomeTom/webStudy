// 首页轮播图
// 获取对象
// 轮播图片对象
let banners = document.querySelectorAll('.banner li')
// 左右箭头按钮
let next = document.querySelector('.ppic .next')
let prev = document.querySelector('.ppic .prev')
// 底部圆点按钮
let bbuts = document.querySelectorAll('.bbut li')

// 封装切图函数
let index = 0
function changePic(index) {
    // 小圆点selected特效跟随图片切换
    document.querySelector('.bbut li.selected').classList.remove ('selected')
    bbuts[index].classList.add ('selected')
    // 图片显示active特效切换
    document.querySelector('.banner li.active').classList.remove ('active')
    banners[index].classList.add ('active')
}
// 添加点击事件给切图箭头
next.addEventListener ('click', function() {
    index++
    index = index % banners.length
    changePic (index)
})
prev.addEventListener ('click',function(){
    index--
    if (index < 0) {
        index = 4
    }
    changePic (index)
})
// 添加点击事件给小圆点
for (let i = 0; i < bbuts.length; i++) {
    bbuts[i].addEventListener('click', function () {
        changePic(i)
    })
}
// 定时器轮播
let timer = setInterval (function() {
    next.click ()
},1500)
let ppic = document.querySelector('.ppic')
ppic.addEventListener('mouseenter',function(){
    clearInterval (timer)
})
// 定时器启停条件
ppic.addEventListener('mouseleave',function(){
    timer = setInterval (function() {
        next.click ()
    },1500)
})
