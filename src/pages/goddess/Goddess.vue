<template>
  <div class="goddess-wrapper">
    <!--<div class="goddess">
      <div class="goddess-cover-wrapper">
        <div class="zhezhao"></div>
        <div class="zhezhao2"></div>
        <img src="./eg1.jpg" alt="">
      </div>
      <div class="goddess-video-ctrl-wrapper">
        <img src="./start.png" alt="">
      </div>
      <div class="goddess-views">
        <img src="./watch1.png" alt="">
        <span>1385人正在看</span>
      </div>
      <div class="goddess-state">
        <span class="goddess-state-pointer"></span>
        <span class="goddess-state-txt">直播</span>
      </div>
      <p class="goddess-cover-title">
        变成女神不是梦想,需要的是放心大胆细心尝试的一路去体验去感受,很快就会实现!
      </p>
    </div>-->
    <div class="goddess" @click="goToVideo('https://v.qq.com/iframe/player.html?vid=n068270sbnz&tiny=0&auto=0')">
      <div class="goddess-cover-wrapper">
        <div class="zhezhao"></div>
        <div class="zhezhao2"></div>
        <img src="./10.jpg" alt="">
      </div>
      <!--<div class="goddess-video-ctrl-wrapper">
        <img src="./start.png" alt="">
      </div>-->
      <div class="goddess-views">
        <img src="./watch1.png" alt="">
        <span>18645人正在看</span>
      </div>
      <div class="goddess-state">
        <span class="goddess-state-pointer"></span>
        <span class="goddess-state-txt">回放</span>
      </div>
      <p class="goddess-cover-title">
        鉴证免费整形模式暨第一期第二批案例代言人分享会（上）
      </p>
    </div>
    <div class="goddess" @click="goToVideo('https://v.qq.com/iframe/player.html?vid=m0682of99tw&tiny=0&auto=0')">
      <div class="goddess-cover-wrapper">
        <div class="zhezhao"></div>
        <div class="zhezhao2"></div>
        <img src="./11.jpg" alt="">
      </div>
      <!--<div class="goddess-video-ctrl-wrapper">
        <img src="./start.png" alt="">
      </div>-->
      <div class="goddess-views">
        <img src="./watch1.png" alt="">
        <span>23543人正在看</span>
      </div>
      <div class="goddess-state">
        <span class="goddess-state-pointer"></span>
        <span class="goddess-state-txt">回放</span>
      </div>
      <p class="goddess-cover-title">
        鉴证免费整形模式暨第一期第二批案例代言人分享会（下）
      </p>
    </div>
    <div class="goddess" @click="goToVideo('https://v.qq.com/iframe/player.html?vid=h063910gcw5&tiny=0&auto=0')">
      <div class="goddess-cover-wrapper">
        <div class="zhezhao"></div>
        <div class="zhezhao2"></div>
        <img src="./03.jpg" alt="">
      </div>
      <!--<div class="goddess-video-ctrl-wrapper">
        <img src="./start.png" alt="">
      </div>-->
      <div class="goddess-views">
        <img src="./watch1.png" alt="">
        <span>3546人正在看</span>
      </div>
      <div class="goddess-state">
        <span class="goddess-state-pointer"></span>
        <span class="goddess-state-txt">回放</span>
      </div>
      <p class="goddess-cover-title">
        由内而外完美蜕变，美美美助力你成为极品女人
      </p>
    </div>
    <div class="goddess" @click="goToVideo('https://v.qq.com/iframe/player.html?vid=u06398kr0gi&tiny=0&auto=0')">
      <div class="goddess-cover-wrapper">
        <div class="zhezhao"></div>
        <div class="zhezhao2"></div>
        <img src="./04.jpg" alt="">
      </div>
      <!--<div class="goddess-video-ctrl-wrapper">
        <img src="./start.png" alt="">
      </div>-->
      <div class="goddess-views">
        <img src="./watch1.png" alt="">
        <span>2321人正在看</span>
      </div>
      <div class="goddess-state">
        <span class="goddess-state-pointer"></span>
        <span class="goddess-state-txt">回放</span>
      </div>
      <p class="goddess-cover-title">
        看代言人真实情感交流-美美美案例代言人特训营座谈1
      </p>
    </div>
    <div class="goddess" @click="goToVideo('https://v.qq.com/iframe/player.html?vid=z0639drtfad&tiny=0&auto=0')">
      <div class="goddess-cover-wrapper">
        <div class="zhezhao"></div>
        <div class="zhezhao2"></div>
        <img src="./05.jpg" alt="">
      </div>
      <!--<div class="goddess-video-ctrl-wrapper">
        <img src="./start.png" alt="">
      </div>-->
      <div class="goddess-views">
        <img src="./watch1.png" alt="">
        <span>3567人正在看</span>
      </div>
      <div class="goddess-state">
        <span class="goddess-state-pointer"></span>
        <span class="goddess-state-txt">回放</span>
      </div>
      <p class="goddess-cover-title">
        看代言人真实情感交流-美美美案例代言人特训营座谈2
      </p>
    </div>
    <div class="goddess" @click="goToVideo('https://v.qq.com/iframe/player.html?vid=h0639avs4vm&tiny=0&auto=0')">
      <div class="goddess-cover-wrapper">
        <div class="zhezhao"></div>
        <div class="zhezhao2"></div>
        <img src="./06.jpg" alt="">
      </div>
      <!--<div class="goddess-video-ctrl-wrapper">
        <img src="./start.png" alt="">
      </div>-->
      <div class="goddess-views">
        <img src="./watch1.png" alt="">
        <span>3453人正在看</span>
      </div>
      <div class="goddess-state">
        <span class="goddess-state-pointer"></span>
        <span class="goddess-state-txt">回放</span>
      </div>
      <p class="goddess-cover-title">
        看代言人真实情感交流-美美美案例代言人特训营座谈3
      </p>
    </div>
    <div class="goddess" @click="goToVideo('https://v.qq.com/iframe/player.html?vid=b0639ujf1ns&tiny=0&auto=0')">
      <div class="goddess-cover-wrapper">
        <div class="zhezhao"></div>
        <div class="zhezhao2"></div>
        <img src="./07.jpg" alt="">
      </div>
      <!--<div class="goddess-video-ctrl-wrapper">
        <img src="./start.png" alt="">
      </div>-->
      <div class="goddess-views">
        <img src="./watch1.png" alt="">
        <span>4567人正在看</span>
      </div>
      <div class="goddess-state">
        <span class="goddess-state-pointer"></span>
        <span class="goddess-state-txt">回放</span>
      </div>
      <p class="goddess-cover-title">
        美美美案例代言人特训营座谈4
      </p>
    </div>
    <div class="goddess" @click="goToVideo('https://v.qq.com/iframe/player.html?vid=y0639k1tloc&tiny=0&auto=0')">
      <div class="goddess-cover-wrapper">
        <div class="zhezhao"></div>
        <div class="zhezhao2"></div>
        <img src="./08.jpg" alt="">
      </div>
      <!--<div class="goddess-video-ctrl-wrapper">
        <img src="./start.png" alt="">
      </div>-->
      <div class="goddess-views">
        <img src="./watch1.png" alt="">
        <span>5567人正在看</span>
      </div>
      <div class="goddess-state">
        <span class="goddess-state-pointer"></span>
        <span class="goddess-state-txt">回放</span>
      </div>
      <p class="goddess-cover-title">
        美美美案例代言人特训营座谈5
      </p>
    </div>
    <div class="goddess" @click="goToVideo('https://v.qq.com/iframe/player.html?vid=p0639r5868k&tiny=0&auto=0')">
      <div class="goddess-cover-wrapper">
        <div class="zhezhao"></div>
        <div class="zhezhao2"></div>
        <img src="./09.jpg" alt="">
      </div>
      <!--<div class="goddess-video-ctrl-wrapper">
        <img src="./start.png" alt="">
      </div>-->
      <div class="goddess-views">
        <img src="./watch1.png" alt="">
        <span>3255人正在看</span>
      </div>
      <div class="goddess-state">
        <span class="goddess-state-pointer"></span>
        <span class="goddess-state-txt">回放</span>
      </div>
      <p class="goddess-cover-title">
        美美美案例代言人特训营座谈6
      </p>
    </div>
    <div class="goddess" @click="goToVideo('https://v.qq.com/iframe/player.html?vid=j0639fqn85s&tiny=0&auto=0')">
      <div class="goddess-cover-wrapper">
        <div class="zhezhao"></div>
        <div class="zhezhao2"></div>
        <img src="./02.jpg" alt="">
      </div>
      <!--<div class="goddess-video-ctrl-wrapper">
        <img src="./start.png" alt="">
      </div>-->
      <div class="goddess-views">
        <img src="./watch1.png" alt="">
        <span>5634人正在看</span>
      </div>
      <div class="goddess-state">
        <span class="goddess-state-pointer"></span>
        <span class="goddess-state-txt">回放</span>
      </div>
      <p class="goddess-cover-title">
        “互联网+”思维为求美人士真正实现自己更加漂亮、精致、时尚、个性的变美需求。
      </p>
    </div>
    <div class="goddess" @click="goToVideo('https://v.qq.com/iframe/player.html?vid=f05499q8r1v&tiny=0&auto=0')">
      <div class="goddess-cover-wrapper">
        <div class="zhezhao"></div>
        <div class="zhezhao2"></div>
        <img src="./01.jpg" alt="">
      </div>
      <!--<div class="goddess-video-ctrl-wrapper">
        <img src="./start.png" alt="">
      </div>-->
      <div class="goddess-views">
        <img src="./watch1.png" alt="">
        <span>3287人正在看</span>
      </div>
      <div class="goddess-state">
        <span class="goddess-state-pointer"></span>
        <span class="goddess-state-txt">回放</span>
      </div>
      <p class="goddess-cover-title">
        美美美免费整形跨界联盟全体员工携手代言人祝您新春愉快
      </p>
    </div>
    <!--<video src="./vedio.mp4" controls="controls" class="video" poster="./eg1.jpg"></video>-->
    <v-drap></v-drap>
    <bottom-nav></bottom-nav>
  </div>
</template>

<script>
import BottomNav from '@/components/common/BottomNav/BottomNav'
import VDrap from '@/components/common/Drap/Drap'
export default {
  name: 'Goddess',
  components: {BottomNav, VDrap},
  comments: {
    BottomNav: 'bottom-nav',
    VDrap: 'v-drap'
  },
  methods: {
    goToVideo (val) {
      window.location.href = val
    }
  }
}
</script>

<style scoped>
/* 差播放按钮 */
.goddess-wrapper{
  margin-top: .4rem;
  padding-left:.2rem;
  padding-right:.2rem;
  padding-bottom: 1.5rem;
}
.goddess{
  position: relative;
  border-radius: .1rem;
  height: 5.33rem;
  overflow: hidden;
  margin-bottom: .3rem;
}
.goddess-cover-wrapper{
  height: 100%;
}
.goddess-cover-title{
  left: .22rem;
  right: .22rem;
  bottom: .24rem;
  position:absolute;
  font-size: .26rem;
  color:#fff;
}
.goddess-video-ctrl-wrapper{
  position: absolute;
  border-radius: 100%;
  width: 1rem;
  height: 1rem;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  background-color: rgba(0,0,0,.5);
  overflow: hidden;
}
.goddess-video-ctrl-wrapper img{
  width: 100%;
}
/* 查看数 */
.goddess-views{
  position: absolute;
  left: .22rem;
  top: .5rem;
  line-height: 1;
}
.goddess-views img{
  display: inline-block;
  width: .42rem;
  height: .25rem;
}
.goddess-views span{
  font-size: .26rem;
  color: #fff;
}
/* 直播'回放 */
.goddess-state{
  position: absolute;
  border-radius: .26rem;
  right: .22rem;
  top: .38rem;
  width: 1.40rem;
  height: .5rem;
  line-height: .5rem;
  background-color: rgba(0,0,0,.5);
  font-size: 0;
  text-align: center;
}
.goddess-state-txt{
  line-height:1;
  font-size: .28rem;
  color:#fff;
  vertical-align: middle;
}
.goddess-state-txt:before {
    content: '';
    margin-right: .14rem;
    position: relative;
    top: -0.08rem;
    display: inline-block;
    width: .05rem;
    height: .05rem;
    border-radius: 50%;
    background-color: rgb(214,83,228);
}
  /*遮罩*/
  .zhezhao {
    position: absolute;
    width: 7.1rem;
    height: 5.5rem;
    background-color: rgba(0,0,0,.3);
  }
.zhezhao2 {
  position: absolute;
  top: 3.2rem;
  width: 7.1rem;
  height: 2.3rem;
  background: -moz-linear-gradient(top, rgba(0,0,0,0) 0%, rgba(0,0,0,.6) 100%);
  background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(0,0,0,0)), color-stop(100%,rgba(0,0,0,.6)));
  background: -webkit-linear-gradient(top, rgba(0,0,0,0) 0%,rgba(0,0,0,.6) 100%);
  background: -o-linear-gradient(top, rgba(0,0,0,0) 0%,rgba(0,0,0,.6) 100%);
  background: -ms-linear-gradient(top, rgba(0,0,0,0) 0%,rgba(0,0,0,.6) 100%);
  background: linear-gradient(top, rgba(0,0,0,0) 0%,rgba(0,0,0,.6) 100%);
}
.video {
  width: 7.1rem;
  height: 10rem;
}
</style>
