<template>
    <div class="saoma">
      <div class="saoma-first">长按识别二维码，关注</div>
      <div class="saoma-second">更多功能</div>
      <div class="text">1.了解医美专家平台</div>
      <div class="text text2"> 2.及时查看免费整形和公益活动通知</div>
      <img src="./erweima.jpg" alt="" class="saoma-img">
      <div class="text3">关注后点击[免费整形]</div>
    </div>
</template>

<script>
export default {
  name: 'SaoMa'
}
</script>

<style scoped>
.saoma {
  height: 100%;
}
.saoma-first {
  padding-top: .5rem;
  padding-bottom: .5rem;
  font-size: .32rem;
  color: #000;
  font-weight: bold;
  padding-left: .2rem;
}
.saoma-second {
  text-align: center;
  color: rgb(70,70,70);
  font-size: .22rem;
  padding-top: .3rem;
}
.text {
  text-align: center;
  padding: .2rem;
  color: #000;
}
.text2 {
  padding-top: 0;
}
.saoma-img {
  width: 92%;
  margin: auto;
  padding-top: .5rem;
}
.text3 {
  text-align: center;
  padding-top: .3rem;
  color: #000;
  letter-spacing: .1rem;
}
</style>
