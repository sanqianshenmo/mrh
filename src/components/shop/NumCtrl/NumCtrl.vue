<template>
  <div class="num-wrapper num">
      <span class="num-btn reduce" @click="changeNum(-1)">-</span>
      <span class="num-num">{{ good.cartCount }}</span>
      <span class="num-btn plus" @click="changeNum(1)">+</span>
  </div>
</template>

<script>
import { MessageBox } from 'mint-ui'

export default {
  name: 'NumCtrl',
  props: {
    good: {
      type: Object
    }
  },
  methods: {
    changeNum (changeWay) {
    // 改变商品数量
    // is controled by the original data source! to be improved
      if (changeWay === -1) {
        if (!(this.good.cartCount > 1)) {
          MessageBox({
            title: '注意',
            message: '数量不能少于1',
            showCancelButton: false,
            closeOnClickModal: true
          })
          return
        }
        this.good.cartCount--
        // ajax处理
        return
      }
      if (changeWay === 1) {
        if (this.good.cartCount >= 99) {
          MessageBox({
            title: '注意',
            message: '数量不能大于99',
            showCancelButton: false,
            closeOnClickModal: true
          })
          // alert('单个商品最大数量为99')
          return
        }
        this.good.cartCount++
      }
    }
  }
}
</script>

<style scoped>
  /* 按钮控制 */
    .num-wrapper{
      display: inline-block;
      display: flex;
      justify-content: center;
      box-sizing: border-box;
      height: .64rem;
      width: 2.1rem;
      border-radius: 0.06rem;
      border:1px solid rgb(194,194,194);
      font-size: 0.2rem;
      color: rgb(194,194,194);
      background-color: #fff;
      user-select: none;
    }
    .num-btn {
        display: inline-block;
        flex:1;
        height:.62rem;
        line-height: 0.62rem;
        width: 0.4rem;
        text-align: center;
        font-size: .5rem;
    }
    .num-btn:active {
      color:rgba(214,83,228)
    }
    .num-num {
      display: inline-block;
      width:1rem;
      height:.62rem;
      line-height: 0.62rem;
      box-sizing: border-box;
      vertical-align: top;
      border-left:1px solid rgb(194,194,194);
      border-right:1px solid rgb(194,194,194);
      text-align: center;
      font-size: 0.3rem;
      color: rgb(113,113,113)
    }
</style>
