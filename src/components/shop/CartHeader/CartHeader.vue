<template>
  <header class="mui-bar mui-bar-nav">
      <a @click="back" class="mui-action-back mui-icon-left-nav mui-icon  fl"></a>
      <h1 class="header-title omit-one">我的购物车</h1>
      <a v-if="!isCartBlank&&!isError" @click="switchState" class="float-right text-btn">{{operationText}}</a>
      <!-- <a @click="switchState" class="mui-icon mui-icon-compose fr"></a> -->
      <!-- <a class="mui-icon mui-icon-navigate fr"></a> -->
  </header>
</template>

<script>

export default {
  name: 'CartHeader',
  props: {
    isError: {
      type: Boolean,
      default: false
    },
    isDeleteState: {
      type: Boolean,
      default: false
    },
    isCartBlank: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    operationText () {
      if (this.isDeleteState === true) {
        return '完成'
      } else {
        return '编辑'
      }
    }
  },
  methods: {
    switchState () {
      this.$emit('switchState', !this.isDeleteState)
    },
    back () {
      this.$router.go(-1)
    }
  }
}
</script>

<style>
 /* header样式 */
    header {
        display: block;
    }
    .mui-bar-nav {
        top: 0;
        -webkit-box-shadow: 0 1px 6px #ccc;
        box-shadow: 0 1px 6px #ccc;
    }
    .mui-bar {
        position: fixed;
        z-index: 10;
        right: 0;
        left: 0;
        height: .88rem;
        padding-right: .2rem;
        padding-left: .2rem;
        border-bottom: 0;
        background-color: #fff;
        -webkit-box-shadow: 0 0 1px ;
        box-shadow: 0 0 1px rgba(0, 0, 0, .35);
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
    }
    /* 头部文字 */
    .header-title {
        margin: 0;
        padding: 0;
        position: absolute;
        top:0; /* 这里必须加，不加会下掉原因不知*/
        right: .8rem;
        left: .8rem;
        text-align: center;
        font-size: .34rem;
        font-weight: 500;
        line-height: .88rem;
        color: #000;
    }
    /* icon */
    .mui-bar-nav.mui-bar .mui-icon {
        /* 图标外层大小与位置 */
        /* 左侧图标位置 */
        margin-right: -.2rem;
        /* 右侧图标位置  */
        margin-left: -.2rem;
        padding:.2rem;
        /* 图标大小 */
        font-size: .48rem;
        position: relative;
        z-index: 20;
    }
    /* 控制图标大小显示 */
    .mui-icon {
        font-family: Muiicons;
        font-size: .48rem;
        font-weight: 400;
        font-style: normal;
        line-height: 1;
        display: inline-block;
        text-decoration: none;
        -webkit-font-smoothing: antialiased;
    }
    /* 点击效果：马上触发，马上消失 */
    .mui-icon:active {
        opacity: .3;
    }
    .mui-icon-back:before,
    .mui-icon-left-nav:before {
        content: '\e471';
    }

    .text-btn {
        position: relative;
        display: inline-block;
        margin-right: -.2rem;
        margin-left: -.2rem;
        padding:0 .2rem;
        height: .88rem;
        line-height: .88rem;
        text-align: center;
        font-size: .26rem;
        z-index: 20;
        font-weight: 400;
        color: rgb(116, 116, 116)
    }
    .text-btn:active {
        color: rgba(214,83,228,.3)
    }
</style>
