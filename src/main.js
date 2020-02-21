// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import '../static/css/mint-style.css'
import '../static/css/reset.css'
import '../static/css/font.css'
import '../static/js/rem.js'
import { TYPE_NAME_MAP } from '@/common/config/config.js'
import Vue from 'vue'
import MintUI from 'mint-ui'
import App from './App'
import router from './router'
import store from './store'
import {getCookie, setCookie} from '@/models/cookie'
import hljs from 'highlight.js'
import 'highlight.js/styles/railscasts.css'
Vue.use(MintUI)

Vue.directive('hljs', el => {
  let blocks = el.querySelectorAll('pre')
  Array.prototype.forEach.call(blocks, hljs.highlightBlock)
})
Vue.filter('ShapeName', function (type) {
  // type: 整形1，微整4，植发5；2（单项整形），3（代言人）
  if (TYPE_NAME_MAP[type]) {
    return TYPE_NAME_MAP[type]
  } else {
    return '整形'
  }
})
Vue.config.productionTip = false
router.beforeEach((to, from, next) => {
  // 百度统计
  setTimeout(() => {
    var _hmt = _hmt || [];
    (function() {
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?6b8ad4d59900153e2de9d49537bf6607";
      var s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(hm, s);
    })()
  }, 0)
  // setCookie('mrh-token', 'eyJ0eXBlIjoiSldUIiwiYWxnIjoiSFM1MTIifQ.eyJzdWIiOiIxNzk3NTc0OTU3NDQ3OTI0OTA5IiwiYXV0aCI6W10sIm9wZW5pZCI6Im9vNk4yMDN6WW0zc3pid3ZHSGpqWHUtWDNFQzgiLCJpYXQiOjE1MzExMTc3NzAsImV4cCI6MTUzMTE4OTc3MH0.1J2Y7ExfZj9sdyt0fG-9iNVfZALd19oU-RfmoTmDYV4rApJ2HNFEb8IFOkG_CNDamcXzQpdem-mhnmfbrc66EQ')
  // setCookie('mrh-token', 'eyJ0eXBlIjoiSldUIiwiYWxnIjoiSFM1MTIifQ.eyJzdWIiOiIxNzg4OTAwNjY0Nzg4NSIsImF1dGgiOltdLCJpYXQiOjE1MjkzNzE4NTMsImV4cCI6MTg0NDczMTg1M30.jAdRuySXIevGSxnCUjYxMacgmdC04fhfg6zNlNu2ArHJX2wbcSzAYD7vqghetseIdUf1UF3X6smJehhwm8WiSw')
  // let isWxPayTest = true
  // if (!isWxPayTest) {
  //   setCookie('mrh-role', '10')
  //   setCookie('mrh-token', '27_8wxXJ7kxMFOwHSYR6NtNg9889Kr6BFtbqt08MngaFMXK_vlNGk3y0E4-kqX1HhjvkjUBH9_DUlvs_hjxjGLDDyoKTODcM5aaC4ABgT8F47sE7Qm03t-9HL5Dgc2ft3eIoDCN7wpUtJauS7QFFJYiAGAZDS')
  //   // setCookie('mrh-token', 'eyJ0eXBlIjoiSldUIiwiYWxnIjoiSFM1MTIifQ.eyJzdWIiOiI0ODcxMDE4Nzg5MTM4NTc2NzUwIiwiYXV0aCI6W10sIm9wZW5pZCI6Im9uUXJ3MFp0RWdrbjFtOThvVHVmNVlSQ0NKdjAiLCJpYXQiOjE1MzI0OTkyMDQsImV4cCI6MTUzMjUwNjQwNH0.rhpJmB-fIn9sy887JIjlln4XeIQ1nW4AbCa_J5l7cc4USOx_ADpA4oXBkYs7yvaeefYefpZ29MIvvnNY54wnew')
  // }
  if (to.path === '/author' && getCookie('mrh-token')) {
    // 返回到授权页面，已经有token则跳转首页
    next('/')
    return false
  } else if (!getCookie('mrh-token') && to.path !== '/author') {
    setCookie('firstUrl', window.location.href)
    console.log(getCookie('firstUrl'))
    next('/author')
  }
  next()
})
router.afterEach((to, from) => {
  // ...
  // console.log('to', to, 'from', from)
  // 似乎有必要将 路由的写成一个配置文件 方便统一化 to do
  const ROUTE_TITLE_TABLE = {
    home: '美美美',
    diary: '日记',
    user: '个人中心',
    shop: '商城',
    GoodsDetail: '商品详情',
    cart: '我的购物车',
    cartPay: '购物车结算',
    goodsPay: '商品结算',
    'user.order': '我的订单'
  }
  let routeName = to.name
  if (ROUTE_TITLE_TABLE[routeName]) {
    document.title = ROUTE_TITLE_TABLE[routeName]
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
