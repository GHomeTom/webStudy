

; (function () {

// 计数函数
  function count() {
    $('.todo-count strong').text($('#todoList li').length)
  }
  // 新增
  let index = 0
  $('#addTodo').on('keyup', function (e) {
    if (e.keyCode === 13) {
      if ($(this).val() === '') {
        alert('input your text please!')
        return
      } else {
        index++
      }
      // 新增li节点
      $('#todoList').append(`
      <li style='display:none;'>
        <div class="view">
          <label>${$(this).val()}</label>
          <button class="destroy"></button>
        </div>
      </li>
      `)
      // 为最后一个li标签添加动画显示并使用动画的回调函数为计数赋值
      $('#todoList li').last().slideDown(199, function () {
        count()
      })
      // 清空输入框
      $(this).val('')
    }
  })
  // 删除列表添加计数
  $('#todoList').on('click', '.destroy', function (e) {
    $(this).parent().parent().slideUp(199, function () {
      $(this).remove()
      count()
    })
  })
})()
