<template>
  <div class="blank_wrapper">
    <img class="blank_img" src="./blank.png" alt="无商品图片">
    <p class="blank_text">购物车空空如也~</p>
  </div>
</template>

<script>
export default {
  name: 'CartBlank'
}
</script>

<style>
  .blank_wrapper{
    margin-left: auto;
    margin-right: auto;
    width: 3.33rem;
    overflow: hidden
  }
  .blank_img {
    width: 100%;
    width: 3.33rem;
    height: 2.54rem;
  }
  .blank_text {
    text-align: center;
    margin-top: 0.4rem;
    font-size: .36rem;
    color: rgb(205,203,206);
    user-select: none;
  }
</style>
