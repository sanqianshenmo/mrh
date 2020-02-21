<template>
  <div style="height: 100%;">
    <!--<header>
      <div @click="goToUser">
        <img src="./back.png" alt="">
      </div>
      我的二维码
    </header>-->
    <!--<div v-if="isReady">
      <img src="./qr-bg.jpg" alt="">
    </div>
    <img :src="showImgUrl" alt="" class="qr-qr">
    <div class="new-qr">
      <div class="new-qr-left">
        <div class="new-qr-left-top">您的推荐人：</div>
        <div class="new-qr-left-bottom">{{per_info.recommend_user.substring(-1, 10)}}</div>
      </div>
      <div class="new-qr-right">
        <div class="new-qr-left-top">您当前的身份：</div>
        <div class="new-qr-left-bottom">{{perShow}}</div>
      </div>
    </div>-->
    <div v-if="isReady" class="qr-old">
      <HeaderBack :isActionShow="false" :header="header" :color="'rgb(214,83,228)'"></HeaderBack>
      <div class="qr-header">
        <div class="qr-header-box">
          <div>
            <img :src="per_info.headimgurl" alt="">
          </div>
          <div class="qr-header-box-right">
            <div class="qr-header-box-right-top">您的推荐人</div>
            <div class="qr-header-box-right-bottom">{{per_info.recommend_user}}</div>
          </div>
        </div>
      </div>
      <div class="qr-img-old-box">
        <div class="qr-img-old"></div>
      </div>
      <div>
        <div class="qr-qr-old">
          <img :src="showImgUrl" alt="">
        </div>
      </div>
      <!--<div class="show-shuoming">
        <div>扫描此专属推广二维码后进入推广页</div>
      </div>
      <div class="show-tishi">
        <div v-if="per_info.rule === 17">提示：扫码后可进入美人汇与商家合作推广页页面含有美人汇免费整形说明及商家优惠信息。在推广页可查看扫码数据。</div>
        <div v-else>提示：别人扫你的专属码后，您可在推广页可查看扫码数据。</div>
      </div>-->
      <div>
        <div class="show-baocun">长按保存图片到本地</div>
      </div>
      <div class="bottom-banner-join" v-if="per_info.rule === 17 || per_info.rule === 18">
        <input type="button" value="获取此二维码打印文件" class="join-input submit-input" @click="handleJump('/user/poster')">
      </div>
      <div class="qr-bottom-center">美美美·免费整形·跨界联盟</div>
    </div>
    <!--<div  v-if="isReady" style="height:100%;min-height: 12.06rem; background-color:#fff; text-align: center;padding: 0 16px;" class="main-qr">
      <div class="qr-img">
        <img src="./1.png" alt="" class="qr-img-img">
      </div>
      <div class="show-header">
        <div>您的推荐人是：{{per_info.recommend_user}}</div>
        <div>您当前的身份是：{{perShow}}</div>
      </div>
      <div>
        <div class="show-img">
          <div class="radius1"></div>
          <div class="radius2"></div>
          <div class="radius3"></div>
          <div class="radius4"></div>
          <div class="border-img">
            <img :src="showImgUrl" width="140px"/>
          </div>
        </div>
      </div>
      <div class="show-shuoming">
        <div>扫描此专属推广二维码后进入推广页</div>
      </div>
      <div class="show-tishi">
        <div v-if="per_info.rule === 17">提示：扫码后可进入美美美与商家合作推广页页面含有美人汇免费整形说明及商家优惠信息。在推广页可查看扫码数据。</div>
        <div v-else>提示：别人扫你的专属码后，您可在推广页可查看扫码数据。</div>
      </div>
      <div>
        <div class="show-baocun">长按保存图片到本地</div>
      </div>
      <div class="bottom-banner-join" v-if="per_info.rule === 17 || per_info.rule === 18">
        <input type="button" value="获取此二维码打印文件" class="join-input submit-input" @click="handleJump('/user/poster')">
      </div>
    </div>-->
    <div class="img-box" v-show="isRouter" style="position: fixed; width: 100%; height:100%; top:0; left: 0; z-index: 9999; background-color: #fff;">
      <div style="padding: 20px; text-align: center;font-size: 16px">
        您的网络开小差啦 点下面刷新重试吧
      </div>
      <div>
        <div class="bottom-banner-join" style="padding: 26px 50px">
          <input type="button" value="刷新重试" class="join-input submit-input" @click="goToback">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from '@/router'
import {PARTNER} from '@/models'
import {getCookie} from '@/models/cookie'
import {ShopUrl} from '@/common/config/config'
import HeaderBack from '@/components/common/HeaderBack/HeaderBack'

export default {
  name: 'QrCode',
  components: {
      HeaderBack
    },
  data () {
    return {
      isReady: false,
      isRouter: false,
      showImgUrl: '',
      per_info: '',
      perShow: '',
      header: {
              title: '我的二维码'
            }
    }
  },
  methods: {
    cancelLoading: function (self, loadTimeout, startTime) {
      clearTimeout(loadTimeout)
      var endTime = new Date()
      if (endTime - startTime >= 2000) {
        self.$indicator.close()
      }
    },
    goToback: function () {
      location.reload()
    },
    goToBack () {
      if (this.step === 1) {
        router.push('/user/qrcode')
      } else {
        router.push('/user/poster')
      }
    },
    handleJump: function (val) {
      router.push(val)
    }
  },
  created: function () {
    var startTime = new Date()
    var loadTimeout = setTimeout(function () {
      self.$indicator.open()
    }, 1999)
    /* 跳转授权登录 */
    let token = getCookie('mrh-token')
    if (token) {
      this.showImgUrl = ShopUrl + '/my_code_pic?t_rand=' + token
    }
    var self = this
    /* 获取个人信息 */
    PARTNER.getMsg()
      .then(function (res) {
        self.cancelLoading(self, loadTimeout, startTime)
        self.isReady = true
        if (res.data.retCode === 0) {
          self.per_info = res.data.data
          if (Number(self.per_info.rule) === 16) {
            self.perShow = '个人'
          } else if (Number(self.per_info.rule) === 17) {
            self.perShow = '商家'
          } else if (Number(self.per_info.rule) === 15) {
            self.perShow = '未认证'
          } else if (Number(self.per_info.rule) === 18) {
            self.perShow = '城市合伙人'
          }
        }
        // self.initLoading = false;
      })
      .catch(function (error) {
        console.log('error', error)
        // self.initLoading = false;
      })
    /* 获取个人信息 */
    // 延时跳转404页面
    setTimeout(function () {
      if (self.isReady === false) {
        self.isRouter = true
      }
    }, 10000)
  }
}
</script>

<style scoped>
  .qr-header {
    padding: 1rem 0 0 .2rem;
  }
  .qr-header-box {
    display: flex;
  }
  .qr-header img {
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
  }
  .qr-header-box-right {
    padding-left: .2rem;
  }
  .qr-header-box-right-top {
    padding-top: .2rem;
  }
  .qr-header-box-right-bottom {
    font-weight: bold;
    color: #000;
  }
  .qr-old {
    background: url("./31.jpg") no-repeat center center;
    background-size: 100% 100%;
    min-height: 100%;
  }
  .qr-img-old-box {
    padding: .4rem.5rem;
  }
  .qr-img-old {
    background: url("./4.png") no-repeat center center;
    background-size: 100% 100%;
    height: 3rem;
  }
  .qr-qr-old {
    /*padding: 0 2.2rem;*/
   /* padding-top: .3rem;*/
  }
  .qr-qr-old img {
    width: 3.5rem;
    margin: auto;
    border: .1rem solid #d759e5;
    border-radius: .1rem;
    box-shadow: 0px 0px .2rem .1rem rgba(215,88,229,.5);
  }
  .qr-bottom-center {
    width: 100%;
    position: absolute;
    bottom: .1rem;
    color: #fff;
    font-size: .22rem;
    text-align: center;
    letter-spacing: .1rem;
  }
  .new-qr {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
  .qr-qr {
    position: absolute;
    top: 5.7rem;
    left: 2.2rem;
    width: 3.2rem;
  }
  .new-qr-left {
    float: left;
    color: #fff;
    padding: .5rem;
  }
  .new-qr-right {
    float: right;
    color: #fff;
    padding: .5rem;
  }
  .new-qr-img img {
    position: absolute;
    top: 0;
    left: 0;
    width: 5.6rem;
  }
  .new-qr-left-top {
    font-size: .28rem;
  }
  .new-qr-left-bottom {
    font-size: .32rem;
    font-weight: bold;
    float: right;
    padding-top: .1rem;
    padding-right: .1rem;
  }
  header {
    padding: 0;
    text-align: center;
    font-size: .34rem;
    color: #fff;
    background-color: rgb(255,119,165);
  }
  header img {
    width: .2rem;
    height: .35rem;
    position: absolute;
    padding-left: .4rem;
  }
  .main-qr {
    height:100%;
    background-color:#fff;
    text-align: center;
    padding: 0 16px;
    background-image: url("./2.png");
    background-size: 100% 100%;
  }
  .qr-img {
    padding: .5rem;
    padding-bottom: 0;
  }
  .submit-input {
    color: #fff;
    background-color: #ab06b3;
    outline: none;
    padding: .2rem 0;
    border: none;
    border-radius: 1rem;
    font-size: .3rem;
    width: 60%;
  }
  .bottom-banner-join {
    padding: .4rem 0;
    text-align: center;
  }
  .img-border1 img {
    width: .64rem;
    margin-top: .3rem;
    display: inline-block;
  }
  .flex-img-width img {
    width: 2.08rem;
  }
  .show-header {
    padding-top: .5rem;
    font-size: .26rem;
    padding-bottom: .74rem;
  }
  .show-img {
    height: 3.56rem;
    margin: 0 1.6rem;
    position: relative;
  }
  .show-shuoming {
    color: rgb(116,123,118);
    padding: .3rem .84rem;
    font-size: .24rem;
  }
  .show-shuoming div {
    text-align: center;
  }
  .show-tishi {
    padding: .2rem .84rem;
    text-align: left;
    font-size: .26rem;
    color: rgb(254,121,163);
    /*padding-bottom: .86rem;*/
  }
  .show-baocun {
    font-size: .24rem;
    font-style: italic;
    color: #a906b2;
    text-align: center;
    padding-top: .4rem;
  }
  .radius1 {
    width: .76rem;
    height: .76rem;
    position: absolute;
    top: -.02rem;
    left: -.02rem;
    border: .06rem solid rgb(254,121,163);
    border-top-left-radius: .2rem;
    border-right: none;
    border-bottom: none;

  }
  .radius2 {
    width: .76rem;
    height: .76rem;
    position: absolute;
    top: -.02rem;
    right: -.02rem;
    border: .06rem solid rgb(254,121,163);
    border-top-right-radius: .2rem;
    border-left: none;
    border-bottom: none;
  }
  .radius3 {
    width: .76rem;
    height: .76rem;
    position: absolute;
    bottom: -.02rem;
    right: -.02rem;
    border: .06rem solid rgb(254,121,163);
    border-bottom-right-radius: .2rem;
    border-left: none;
    border-top: none;
  }
  .radius4 {
    width: .76rem;
    height: .76rem;
    position: absolute;
    bottom: -.02rem;
    left: -.02rem;
    border: .06rem solid rgb(254,121,163);
    border-bottom-left-radius: .2rem;
    border-right: none;
    border-top: none;
  }
  .border-img {
    width: 3rem;
    height: 3rem;
    position: absolute;
    left: .32rem;
    top: .24rem;
    border: 1px solid rgba(254,121,163,0.2);
  }
</style>
