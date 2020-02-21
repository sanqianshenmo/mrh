<template>
    <div><img src="./wait.gif" alt=""></div>
</template>

<script>
import {getCookie, setCookie} from '@/models/cookie'
import {LOGIN} from '@/models'
import router from '@/router'

export default {
  name: 'Author',
  created () {
    this.init()
  },
  methods: {
    init () {
      if (getCookie('mrh-code')) {
        console.log(getCookie('mrh-code'))
        if (getCookie('firstUrl')) {
          var isWxPayTest = true // 线上
          // var isWxPayTest = false // 测试
          console.log(getCookie('firstUrl'))
          if (isWxPayTest) {
            if (getCookie('firstUrl') === 'http://www.mrhmr.com/h_mrh/#/author') {
              setCookie('firstUrl', 'http://www.mrhmr.com/h_mrh/#/')
            }
          } else {
            if (getCookie('firstUrl') === 'http://www.mrhmr.com/h_mrh/#/author') {
              setCookie('firstUrl', 'http://www.mrhmr.com/h_mrh/#/')
            }
          }
          let url = getCookie('firstUrl')
          if (Number(url.search('#/user/show?')) !== -1) {
            let str = url.split('?')[1]
            let strs = str.split('&')
            let data = {}
            for (let i = 0; i < strs.length; i++) {
              data[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1])
            }
            data.code = getCookie('mrh-code')
            this.getToken(data, getCookie('firstUrl'))
          } else {
            let data = {
              code: getCookie('mrh-code')
            }
            this.getToken(data, getCookie('firstUrl'))
          }
        } else {
          let data = {
            code: getCookie('mrh-code')
          }
          this.getToken(data, 1)
        }
      } else {
        LOGIN.loginCode()
          .then(res => {
            if (res.data.retCode === 0) {
              window.location.href = res.data.data.url
            }
          })
      }
    },
    // 获取token
    getToken (data, val) {
      LOGIN.loginToken(data)
        .then(res => {
          console.log(res.data)
          setCookie('mrh-token', res.data.data.token)
          setCookie('mrh-roles', res.data.attach.roles[0].code)
          if (val === 1) {
            router.push(val)
          } else {
            window.location.href = val
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped>

</style>
