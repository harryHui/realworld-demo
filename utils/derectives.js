import Vue from 'vue'

export default Vue.directive('btnPreventReClick', {
  inserted(el, binding) {
    el.addEventListener('click', () => {
      if (el.tagName !== 'BUTTON') {
        console.warn('阻止按钮重复点击仅在button上不需要添加任何操作，如果是非button标签，则需要自己捕获$event.target.disabled在业务逻辑中判断')
      }
      if (!el.disabled) {
        el.disabled = true
        setTimeout(() => {
          el.disabled = false
        }, binding.value || 2000)
      }
    })
  }
})