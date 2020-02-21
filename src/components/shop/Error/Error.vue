<template>
  <div class="error_wrapper">
    <div class="error_img_wrapper">
      <img class="error_img" src="./error.png" alt="无商品图片">
    </div>
    <p class="error_text">哎呀，出错了~</p>
  </div>
</template>

<script>
export default {
  name: 'Error'
}
</script>

<style scoped>
  .error_wrapper{
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    font-size: 0;
  }
  .error_img_wrapper{
    display: inline-block;
    width: 3.33rem;
    height: 2.54rem;
  }
  .error_img {
    width: 3.33rem;
    height: 2.54rem;
  }
  .error_text {
    margin-top: 0.4rem;
    font-size: .36rem;
    color: rgb(104,104,104);
    user-select: none;
  }
</style>
