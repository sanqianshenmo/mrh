<template>
  <div @click="handleFocus" class="focus-people-wrapper" v-if="pos === 'home'">
    <img src="./icon-focus.png" v-show="!isFocused" class="icon-focus" alt="关注" title="关注">
    <img src="./icon-focused.png" v-show="isFocused" class="icon-focus" alt="已关注" title="已关注">
    {{focusTxt}}
  </div>
  <button v-else @click="handleFocus" class="headerfocus-btn headerfocus-btn-plain headerfocus-btn-h5 headerfocus-bdrs-30">
    <img src="./icon-focus.png" v-show="!isFocused" class="icon-focus" alt="关注" title="关注">
    <img src="./icon-focused.png" v-show="isFocused" class="icon-focus" alt="已关注" title="已关注">
    <span>{{focusTxt}}</span>
  </button>
</template>

<script>
import { DIARY } from '@/models/index.js'
import { MessageBox, Toast } from 'mint-ui'

export default {
  name: 'DiaryFocus',
  components: {
    Toast, MessageBox
  },
  props: {
    /* 类型区别 */
    pos: {
      type: String,
      default: 'home'
    },
    userId: {
      type: String,
      default: null
    },
    hasConcern: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isFocused: false,
      isExecuting: false // 阻止重复提交
    }
  },
  computed: {
    // 写在data里面，会存在 isFocused并不一致现象
    focusTxt () {
      if (this.isFocused) {
        return '取消'
      } else {
        return '关注'
      }
    }
  },
  methods: {
    handleFocus () {
      // 外部请求
      if (this.isExecuting) {
        return
      }
      this.isExecuting = true
      let self = this
      let uid = self.userId.toString()
      DIARY.handleFocus(uid).then(res => {
        if (res.data.retCode === 0) {
          self._actionRst(self, 'isFocused', '关注')
        } else {
          Toast({
            message: `${res.data.retMsg}`,
            duration: 1000
          })
        }
        this.isExecuting = false
      })
    },
    _actionRst (self, varName, keyWord) {
      // 点赞、关注结果反馈
      // 这个可以抽出为 公共函数吗？有必要吗？
      let isTrue = self[varName] = !self[varName]
      if (isTrue) {
        Toast({
          message: `${keyWord}成功`,
          duration: 1000
        })
      } else {
        Toast({
          message: `取消${keyWord}`,
          duration: 1000
        })
      }
    }
  },
  watch: {
    hasConcern (n) {
      this.isFocused = n
    }
  },
  created () {
    this.isFocused = this.hasConcern
  }
}
</script>

<style scoped>
/* 首页-关注样式 */
.focus-people-wrapper{
  position: absolute;
  height: .5rem;
  line-height: .5rem;
  width:1.45rem;
  right:0;
  border-top-left-radius: .25rem;
  border-bottom-left-radius: .25rem;
  background-color: rgb(188,122,255);
  color:#fff;
  font-size: .28rem;
  text-align: center;
}
.icon-focus{
  margin-right: .1rem;
  display: inline-block;
  width: .22rem;
}
/* 日记详情/个人中心-页面样式 */
.headerfocus-btn {
  vertical-align: top;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border: none;
  width: auto;
  padding: 0 .25rem;
  height: .6rem;
  line-height: .6rem;
  font-size: 0rem;
  color: #fff;
  background-color: inherit;
}
.headerfocus-bdrs-30 {
  border-radius: .3rem;
}
.headerfocus-btn-h5 {
  height: .5rem;
  line-height: .5rem;
}
.headerfocus-btn-plain {
  border: 1px solid #fff;
  color: #fff;
}
.headerfocus-btn-plain img {
    margin-right: .1rem;
    vertical-align: middle;
    display: inline-block;
    width: .24rem;
}
.headerfocus-btn-plain span {
    display: inline-block;
    vertical-align: middle;
    font-size: .26rem;
}
</style>
