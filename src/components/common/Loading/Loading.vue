<template>
  <div></div>
</template>

<script>
import { Indicator } from 'mint-ui'
// 用于：用于除了列表无限滚动外的Loading
export default {
  name: 'Loading',
  data () {
    return {
      timer: null
    }
  },
  props: {
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    isLoading (n, o) {
      if (!n) {
        this.closeLoadingTimer()
      } else {
        // 先清除之前的定时器，否则在2s之内，点击跳转，会存在两个定时器，其中一个无法被清除，导致一下一页面出现Loading，无法操作
        this.closeLoadingTimer()
        // 页面内其它按钮操作时，返回超时时调用 to do
        this.setLoadingTimer()
      }
    }
  },
  methods: {
    setLoadingTimer (timer) {
      let self = this
      let loadingTimer = timer || 2000
      self.timer = setTimeout(function () {
        if (self.isLoading) {
          Indicator.open()
        }
      }, loadingTimer)
    },
    closeLoadingTimer () {
      let self = this
      clearTimeout(self.timer)
      Indicator.close()
    }
  },
  created () {
    // 首次页面进入
    this.setLoadingTimer()
  },
  destroyed () {
    // setTimeout在当前路由销毁后，并不会被销毁，而会仍然执行；
    // 作用：防止，回退或退出，请求数据结果未得出，从而导致另一个页面，无故出现loading
    this.closeLoadingTimer()
  }
}
</script>
