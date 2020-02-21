<template>
    <div class="home-send">
      <div class="top-red">公益捐助名单</div>
      <div class="red-scroll">
        <ul class="scroll-ul">
          <li>平台公益活动正式开始啦!!</li>
          <li>智慧女神-雅典娜-宁静-佟*娴-捐助1000元</li>
          <li>命运女神-诺伦-A?Candy-孙*琪-捐助1000元</li>
          <li>狩猎女神-戴安娜-闹闹-西*-捐助1000元</li>
          <li>爱情女神-维纳斯- saygoodby -叶*-捐助1000元</li>
          <li>海洋女神-墨提斯-刘*-刘*-捐助1000元</li>
          <li>冥夜女神-潘多拉-王**-王*晔-捐助1000元</li>
          <li>和平女神-厄瑞涅-冰冰-陈*-捐助1000元</li>
          <li>欢乐女神-欧芙洛绪涅-Angel-陈*欣-捐助1000元</li>
          <li>公平女神-西弥斯-丽娜-郑*娜-捐助1000元</li>
          <li>水泽女神-达芙涅-HelloAbby-秦*-捐助1000元</li>
          <li>青春女神-伊登-Jenny杰妮-张*-捐助1000元</li>
          <li>美丽女神-芙蕾雅-Windy-孙*-捐助1000元</li>
          <li>记忆女神-尼莫西妮-莫,嘉北-金*-捐助1000元</li>
          <li>宝姐,整形咨询师-周*-已捐助1000元</li>
          <li>刘**-已捐助10000元</li>
        </ul>
      </div>
      <div class="send-img" @click="goToStar">
        <img src="./start.gif" alt="">
      </div>
    </div>
</template>

<script>
import router from '@/router'
export default {
  name: 'HomeSend',
  methods: {
    goToStar () {
      router.push('/star')
    }
  }
}
</script>

<style scoped>
.home-send {
  border-top: .1rem solid #ececed;
}
.red-scroll {
  height: .5rem;
  overflow: hidden;
  padding: .1rem 0 .1rem 0;
  background-color: rgba(237,27,119,1);
  border-bottom: .1rem solid #fff;
}
ul.scroll-ul {
  list-style: none;
  padding: 0;
  margin: 0;
  height: 8.6rem;
  -webkit-animation: 20s rowup linear infinite normal;
  animation: 20s rowup linear infinite normal;
  position: relative;
}
ul.scroll-ul li {
  padding: .08rem 0 .08rem 0;
  text-align: center;
  color: #fff;
}
@keyframes rowup {
  0% {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
  100% {
    -webkit-transform: translate3d(0, -8.6rem, 0);
    transform: translate3d(0, -8.6rem, 0);
    display: none;
  }
}
.top-red {
  text-align: center;
  padding: .2rem 0;
  color: rgb(234,51,130);
  font-size: .3rem;
  font-weight: bold;
}
</style>
