<template>
  <div v-if="isOpen">
    <div class="bg-fixed-gray"></div>
    <div class="add-comment-wrapper">
      <span class="close-add-comment" @click="closeWin">
        <img src="./close.png" alt="关闭弹框">
      </span>
      <h3 class="add-comment-title">我要评论</h3>
      <textarea class="add-comment-content" v-model="comment"></textarea>
      <button @click="submitComment" class="add-comment-btn">提交</button>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'

// MessageBox
export default {
  name: 'addComment',
  props: {
    isCommentted: { // 是否评论成功
      type: Boolean,
      default: false
    },
    isOpen: {
      type: Boolean,
      default: false
    },
    commentId: ''
  },
  data () {
    return {
      comment: ''
    }
  },
  watch: {
    isCommentted (n, o) {
      // 成功提交则清空评论内容
      if (n) {
        this.comment = ''
      }
    }
  },
  methods: {
    closeWin () {
      this.$emit('close')
    },
    submitComment () {
      // api请求
      let comment = this.comment
      // 验证评论内容
      let isBlank = comment.replace(/(^\s)|(\s$)/g, '')
      if (isBlank === '') {
        Toast({
          message: `评论内容不能为空`,
          duration: 1000
        })
        return
      }
      this.$emit('submitComment', isBlank)
    }
  }
}
</script>

<style scoped>
/* 添加评论弹框 */
.add-comment-wrapper{
  box-sizing: border-box;
  padding: .34rem .25rem .6rem;
  position: fixed;
  bottom: 0;
  height: 4.64rem;
  left:0;
  right:0;
  background-color: rgb(238,237,243);
  text-align: center;
  z-index: 1000;
}
.add-comment-title{
  font-size: .4rem;
  line-height: 1;
  color:rgb(34,34,34);
  text-align: center;
}
.add-comment-content{
  text-align:left;
  margin-top: .34rem;
  height:1.7rem;
  background-color: #fff;
  line-height: 1.4;
  color:rgb(34,34,34);
  resize: none;
}
.add-comment-btn{
  border: 0;
  margin-top: .6rem;
  border-radius: .5rem;
  width: 3.3rem;
  height: .83rem;
  line-height: .83rem;
  background-color: rgb(188,122,255);
  color:#fff;
  font-size: .3rem;
  text-align:center;
}
.add-comment-btn:active{
  background-color: rgba(188,122,255,.7);
}
/* 评论弹框背景 */
.bg-fixed-gray{
  position: fixed;
  top:0;
  bottom:0;
  left:0;
  right:0;
  background-color: rgba(0,0,0,.5);
  z-index: 100;
}
/* 关闭弹框按钮 */
.close-add-comment{
  position:absolute;
  top: .3rem;
  right: .25rem;
  font-size: 0;
}
.close-add-comment img{
  width: .46rem;
  height: .46rem;
}
</style>
