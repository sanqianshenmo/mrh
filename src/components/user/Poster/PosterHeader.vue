<template>
  <div class="poster_header">
    <header>
      <div @click="goToBack">
        <img src="./back.png" alt="">
      </div>
      获取打印文件
    </header>
    <p class="poster_use_desc">打印文件用于易拉宝，因图片清晰尺寸较大，获取到下载地址后，请在电脑端下载</p>
    <div class="poster_step_wrapper">
      <div class="poster_step">
        <span class="poster_step_num" :class="{poster_step_num_active: isActive}">1</span>
        <p class="poster_step_desc" :class="{poster_step_desc_active: isActive}">选择行业模板</p>
      </div>
      <span class="poster_line"></span>
      <div class="poster_step">
        <span class="poster_step_num" :class="{poster_step_num_active: !isActive}">2</span>
        <p class="poster_step_desc" :class="{poster_step_desc_active: !isActive}">获取下载地址</p>
      </div>
      <span class="poster_line"></span>
      <div class="poster_step">
        <span class="poster_step_num" :class="{poster_step_num_active: !isActive}">3</span>
        <p class="poster_step_desc" :class="{poster_step_desc_active: !isActive}">用电脑浏览器下载</p>
      </div>
    </div>
  </div>
</template>

<script>
import router from '@/router'
export default {
  name: 'PosterHeader',
  props: {
    step: {
      type: Number,
      default: 1
    }
  },
  methods: {
    goToBack () {
      if (this.step === 1) {
        router.push('/user/qrcode')
      } else {
        router.push('/user/poster')
      }
    }
  },
  computed: {
    isActive: function () {
      if (this.step === 1) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style scoped>
  .poster_header header {
    padding: .3rem 0;
    text-align: center;
    font-size: .34rem;
    color: #fff;
    background-color: rgb(255,119,165);
  }
  .poster_header header img {
    width: .2rem;
    height: .35rem;
    position: absolute;
    padding-left: .4rem;
  }
  .poster_use_desc{
    padding: .52rem 1.28rem;
    font-size: .24rem;
    color:rgb(116,123,118);
    text-align: center;
  }
  .poster_step_wrapper{
    position: relative;
    display:flex;
    justify-content: center;
  }
  /* 模板步骤 */
  .poster_step{
    text-align: center;
  }
  .poster_step_num{
    box-sizing: border-box;
    display: inline-block;
    border-radius:100%;
    text-align: center;
    width: 1.01rem;
    height: 1.01rem;
    font-size: .48rem;
    line-height: 1.01rem;

    background-color: rgb(255,255,255);
    color: rgb(254,119,164);
    border: 1px solid rgb(255,119,165);
  }
  .poster_step_num_active {
    background-color: rgb(255,119,165);
    color:#fff;
  }
  .poster_step_desc {
    margin-top: .3rem;
    line-height:1;
    font-size: .24rem;
  }
  .poster_line{
    display: inline-block;
    position: relative;
    top:.55rem;
    width: .82rem;
    height: .02rem;
    background-color:rgb(255,119,165);
  }
  .poster_tpl label{
    margin-top: .3rem;
    display: block;
  }
  .poster_img_wrapper img{
    width:100%;
    height:auto;
  }
  .poster_tpl label{
    text-align: center;
  }
  .poster_tpl label input{
    display: none;
  }
  .poster_intro_step p{
    text-align: left;
  }
  .poster_intro_step_img_wrapper img{
    width:100%;
    height:auto;
  }
</style>
