<template>
  <div>
    <footer class="pay-bottom" id="common" v-if="!isDeleteState">
        <div class="checkbox-wrapper mui-checkbox" style="height: .95rem;">
            <input @click="allSelected" :checked="isAllSelected" class="checkGoods" style="top: 0.2rem;left: 0;" type="checkbox">
        </div><span class="pay-bottom-all">全选</span><span class="pay-bottom-paytext">在线支付：</span>
        <img src="./glod.png" alt="积分图标" class="cartfooter-glod-icon"><span class="pay-bottom-totalprice" id="totalPrice">{{ total }}</span>
        <a @click="submitCart" href="javascript:void(0);" id="sumbitorder" class="float-right btn bdrx-0">立即下单</a>
    </footer>

    <footer class="pay-bottom" id="edit" v-if="isDeleteState">
        <div class="checkbox-wrapper mui-checkbox">
            <input @click="allSelected" :checked="isAllSelected" class="checkGoods" style="top: 0.2rem;left: 0;" type="checkbox">
        </div><span class="pay-bottom-all">全选</span>
        <a @click="deleteGood" href="javascript:void(0);" id="deleteOrder" class="float-right btn bdrx-0">删除</a>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'CartFooter',
  props: {
    isCartBlank: {
      type: Boolean,
      default: false
    },
    total: {
      type: Number,
      default: 0
    },
    isAllSelected: {
      type: Boolean,
      default: false
    },
    isDeleteState: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    allSelected () {
      this.$emit('allSelected', !this.isAllSelected)
    },
    submitCart () {
      // 这里是不是直接写 请求或者相应操作更好一些？
      this.$emit('submitCart', true)
    },
    deleteGood () {
      this.$emit('deleteGood', true)
    }
  }
}
</script>

<style scoped>
  .float-right {
      float: right;
  }
  .pay-bottom {
      box-sizing: border-box;
      position: fixed;
      padding-left: .2rem;
      left: 0;
      font-size: .34rem;
      line-height: .95rem;
      height: .95rem;
      color: rgb(214,83,228);
      bottom: 0;
      width: 100%;
      background: #fff;
      border-top: 1px solid #ececed;
  }
  .pay-bottom-all {
      margin-left: .1rem;
      font-size: 0.3rem;
      color: rgb(112,111,112);
  }
  .pay-bottom-paytext,.pay-bottom-totalprice{
      font-size: 0.26rem;
      color: rgb(0,0,0);
  }
  .pay-bottom-paytext{
      margin-left: 0.6rem;
  }
  .btn {
      height: .95rem;
      width: 100%;
      background: rgb(214,83,228);
      color: #fff;
      text-align: center;
      line-height: .95rem;
      font-size: .34rem;
  }
  .pay-bottom .btn {
      width: 32%;
  }
 .checkbox-wrapper {
    float: left;
    height: .95rem;
    width: .6rem;
  }
  .cartfooter-glod-icon{
    position: relative;
    display: inline-block;
    vertical-align: middle;
    top: -.04rem;
    width: .3rem;
    height: .3rem;
  }
  /* 样式提炼 */
  /* 底部 */
  .mui-checkbox, .mui-radio {
      position: relative;
  }
  /* input的默认设置
      1.隐藏默认的显示
      2.设置大小
      3.设置位置
  */
  .mui-checkbox input[type=checkbox],
  .mui-radio input[type=radio] {
      position: absolute;
      top: .08rem;
      right: .2rem;
      display: inline-block;
      width: .56rem;
      height: .52rem;
      border: 0;
      outline: 0!important;
      background-color: transparent;
      -webkit-appearance: none;
  }
  /* 未选中时的 颜色及样式 */
  /* 设置字体替代原来默认的图标样式 */
  .mui-checkbox input[type=checkbox]:before {
      content: '\e411';
  }
  .mui-checkbox input[type=checkbox]:before,
  .mui-radio input[type=radio]:before {
      font-family: Muiicons;
      font-size: .56rem;
      font-weight: 400;
      line-height: 1;
      text-decoration: none;
      color: rgba(194,194,194,.5);
      border-radius: 0;
      background: 0 0;
      -webkit-font-smoothing: antialiased;
  }
  /* 选中时的 图标 及 颜色 */
  .mui-checkbox input[type=checkbox]:checked:before,
  .mui-radio input[type=radio]:checked:before {
      content: '\e442';
      color: rgb(214,83,228);
  }
  .bdrx-0{
      border-radius: 0;
  }
</style>
