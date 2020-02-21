<template>
  <div  class="mui-input-row mui-checkbox mui-left">
      <input @click="changeSelected" :checked="good.isSelected" class="checkGoods" name="checkGoods" type="checkbox">
  </div>
</template>

<script>
export default {
  name: 'CheckboxCtrl',
  props: {
    good: {
      type: Object
    }
  },
  methods: {
    changeSelected () {
      var isSelected = !this.good.isSelected
      this.$emit('changeSelected', {
        isSelected: isSelected,
        cartId: this.good.cartId
      })
    }
  }
}
</script>

<style scoped>
/* 以下是按钮点选 */
.mui-checkbox.mui-left input[type=checkbox],
.mui-radio.mui-left input[type=radio] {
    left: 0;
    top: 0.5rem;
}
.order-list li {
    padding: 0.25rem .3rem 0.25rem 0.1rem;
}
.mui-checkbox.mui-left label,
.mui-radio.mui-left label {
    padding-right: .3rem;
    padding-left: .6rem;
}
.shop-price {
    font-size: 0.3rem;
}
.shop-price2 {
    color: #ad5ed2;
    font-size: 0.25rem;
}
.mui-input-row {
    height: 1.74rem;
    float: left;
    width: .4rem;
}
a {
    text-decoration: none;
}
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
    top: .08re,;
    right: .4rem;
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
</style>
