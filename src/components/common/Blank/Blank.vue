<template>
  <div class="blank-wrapper">
    <img class="blank-img" :src="content.imgsrc" alt="无内容图片">
    <p class="blank-text">{{content.text}}</p>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Blank',
  props: {
    type: {
      type: String
    }
  },
  data () {
    return {
      blank: {
        order: {
          text: '亲，暂时没有相关订单哦~',
          imgsrc: require('./order-blank.png')
        },
        cart: {
          text: '亲，购物车空空如也~',
          imgsrc: require('./cart-blank.png')
        },
        default: {
          text: '亲，暂时空空如也~',
          imgsrc: require('./cart-blank.png')
        }
      }
    }
  },
  computed: {
    content () {
      let self = this
      if (self.blank[self.type]) {
        return self.blank[self.type]
      }
      return self.blank['default']
    }
  }
}
</script>

<style scoped>
  .blank-wrapper{
    width:100%;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    overflow: hidden
  }
  .blank-img {
    display: inline-block;
    width: 3.33rem;
    height: 2.54rem;
  }
  .blank-text {
    text-align: center;
    margin-top: 0.4rem;
    font-size: .36rem;
    color: rgb(205,203,206);
    user-select: none;
  }
</style>
