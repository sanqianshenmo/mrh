<template>
 <div class="all-background" v-show="isShow">
  <div class="diary-bounceg-style">
    <img src="./caying-face.png" class="icon-style">
    <div class="diary-title-style">
      <span>抱歉，只有该医生为您实施手术后才能进行评价哦！</span>
    </div>
    <div class="doctornotic-buttons">
      <button class="click-button-style" @click="goToApply">点选报名</button>
      <button class="click-cancel" @click="showToggle">取消</button>
    </div>
  </div>
 </div>
</template>

<script>
export default {
  name: 'DcotorNotice',
  props: {
    isNoticeShow: false
  },
  data () {
    return {
      isShow: this.isNoticeShow
    }
  },
  methods: {
    goToApply () {
      this.$router.push('./ClickApply')
    },
    showToggle: function () {
      this.isShow = !this.isShow
    }
  }
}
</script>

<style scoped>
  /*背景色*/
.all-background{
  position: fixed;
  z-index: 100;
  background-color: rgba(0,0,0,.2);
  width: 100%;
  left: 0;
  bottom: 0;
  top: 0;
}
  /*弹框背景色*/
.diary-bounceg-style{
  background-color: #FFF;
  text-align: center;
  position: fixed;
  z-index: 100;
  left: 20%;
  top: 25%;
  width: 4.5rem;
  height: 4.33rem;
  border-radius: .1rem;
}
/*图片样式*/
.icon-style{
  width: .63rem;
  height: .63rem;
  padding-top: .7rem;
  margin-left: 2rem;
  padding-bottom: .4rem;
}
.diary-title-style{
  padding: 0 .4rem;
  line-height: .5rem;
  color: rgb(56,56,56);
  font-size: .3rem;
}
/*按钮*/
.doctornotic-buttons > button{
  width: 1.5rem;
  height: .5rem;
  margin-top: .5rem;
  border-radius: .5rem;
  border: 0;
  font-size: .24rem;
}
.click-button-style{
  background-color: rgb(188,122,255);
  color: rgb(255,255,255);
}
.click-cancel{
  border: 1px solid rgb(188,122,255);
  background-color: #FFF;
  margin: 0 .2rem;
}
</style>
