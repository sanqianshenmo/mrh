<template>
  <div>
      <div class="gray-bg"></div>
      <div class="dialog-wrapper" :class="notice.iconClass">
          <div class="dialog-img"></div>
          <div class="dialog-desc">
              <p class="dialog-desc-bold">{{notice.mainText}}</p>
              <p class="dialog-desc-small">{{notice.detailText}}</p>
          </div>
          <button @click="rstSubmit" type="button" class="dialog-btn">确认</button>
      </div>
  </div>
</template>

<script>
export default {
  name: 'PayNotice',
  props: {
    noticeType: {
      type: String,
      default: 'fail'
    }
  },
  computed: {
    notice () {
      const notice = {
        fail: {
          iconClass: 'dialog-bg-fail',
          mainText: '购买失败，金积分不足',
          detailText: '缴纳会员费后才有金积分哦'
        },
        success: {
          iconClass: 'dialog-bg-success',
          mainText: '恭喜，购买成功！',
          detailText: '点击确定进入个人中心-我的订单查看详情信息'
        }
      }
      return notice[this.noticeType]
    }
  },
  methods: {
    rstSubmit () {
      if (this.noticeType === 'success') {
        // 路由跳转到 个人中心的-我的订单
        this.$emit('isOpen', true)
      }
      // 隐藏显示框 -- 总是需要隐藏
      this.$emit('isOpen', false)
    }
  }
}
</script>

<style>
.gray-bg {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    bottom: 0;
    background: rgba(0,0,0,.5);
    z-index: 100;
    overflow: auto;
}
/* 提醒框 */
.dialog-wrapper{
    position:fixed;
    left:50%;
    top:50%;
    z-index:100;
    transform: translate(-50%,-50%);
    box-sizing:border-box;
    border-radius: 6px;
    padding:1.33rem 0 .6rem 0;
    width: 4.5rem;
    /* height: 4.33rem; */
    text-align: center;
    background-color:#fff;
}
.dialog-bg-fail {
    background-image:url(./bg-cry.png);
    background-size:.63rem .63rem;
    background-repeat: no-repeat;
    background-position: top .7rem center;
}
.dialog-bg-success {
    background-image:url(./bg-success.png);
    background-size:.63rem .63rem;
    background-repeat: no-repeat;
    background-position: top .7rem center;
}
.dialog-desc-bold{
    margin-top: 0.4rem;
    font-size: 0.3rem;
    line-height: 1;
    color: rgb(56,55,56);
    text-align: center;
}
.dialog-desc-small{
    margin-top: .22rem;
    padding: 0 0.5rem;
    font-size: 0.24rem;
    color: rgb(104,104,104);
    text-align: center;
}
.dialog-btn {
    margin-top: .5rem;
    border:none;
    border-radius:.4rem;
    width:3.3rem;
    height:.8rem;
    font-size: .26rem;
    line-height: .8rem;
    color:#fff;
    background-color: rgb(214, 83, 228);
}

.dialog-btn:active {
    background-color: rgba(214, 83, 228, .8);
}
</style>
