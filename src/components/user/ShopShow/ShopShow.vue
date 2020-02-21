<template>
  <div>
    <div class="main" v-if="isReady">
      <div class="header">
        <img src="./bg-header1.jpeg" class="header-img"/>
      </div>
      <div class="">
        <div class="top-banner center">
          <h2 style="color: rgb(254, 121, 163);font-size: 24px; padding-bottom: 26px;">什么是免费整形？</h2>
          <div class="top-banner-text">
            <div>买我们线上商城您需要的商品，买够5万商品，送您一台不限整形项目不超4个小时的综合手术 = 免费整形</div>
            <div class="top-banner-text-right">—— 正向免费</div>
          </div>
          <div class="top-banner-text">
            <div>您做的综合整形手术，不限整形项目不超4小时，缴纳5万会员费，整形后写日记赚积分兑换等值5万商品 = 免费整形</div>
            <div class="top-banner-text-right">—— 逆向免费</div>
          </div>
          <div class="top-banner-text">
            <div>您介绍成功5个会员加入，送您一台不限整形项目不超4个小时的综合整形手术，送您一次免费整形</div>
            <div class="top-banner-text-right">—— 推广免费</div>
          </div>
          <div class="top-banner-text">
            <div class="top-banner-text-left">手术超值:</div>
            <div>拒绝加价、价格标定、总价至少几十万、包干5万会员费</div>
          </div>
          <div class="top-banner-text">
            <div class="top-banner-text-left">免费简单:</div>
            <div>写真实日记赚积分兑换等值商品，或推荐顾客送整形</div>
          </div>
          <div class="top-banner-text">
            <div class="top-banner-text-left">安全满意:</div>
            <div>正轨医院、名医专家、严守规范、经验丰富、保险保障、效果可见</div>
          </div>
          <h3 style="color: rgb(254, 121, 163);font-size: 17px; padding-top: 26px;">先了解，再比较，不忽悠，不加价</h3>
          <h3 style="color: rgb(254, 121, 163);font-size: 14px; padding-top: 15px;">人美·身美·心美，实现你的极品女人梦！</h3>
          <h3 style="color: rgb(254, 121, 163);font-size: 14px; padding-top: 14px;">美 不止于初见</h3>
        </div>
        <!--to do 信息渲染-->
        <div class="center-banner center" v-if="!isShop">
          <!--<div class="center-banner-top"><span>专 家 团 队</span></div>
          <div class="center-banner-top-center">顶级专家团队介绍</div>-->
          <div class="center-banner-top-bottom">
            <div class="center-flex flex-img-width">
              <img src="./001.png"/>
              <div class="center-flex-top">刘婧洁</div>
              <div class="center-flex-bottom">大韩美容整形外科协会会员</div>
            </div>
            <div class="center-flex flex-img-width">
              <img src="./002.png"/>
              <div class="center-flex-top">余百林</div>
              <div class="center-flex-bottom">面部除皱、眼鼻部整形</div>
            </div>
            <div class="center-flex flex-img-width">
              <img src="./003.png"/>
              <div class="center-flex-top">陈敏亮</div>
              <div class="center-flex-bottom">中国整形美容协会常务委员</div>
            </div>
          </div>
        </div>
        <div class="center-banner center center-boder" v-if="isShop">
          <div class="center-banner-top-center"></div>
          <div class= "shop-flex">
            <div class= "shop-flex-img">
              <img  :src="shop.cover" class="shop-flex-img-img" />
            </div>
            <div class="shop-flex-text">
              <div style="padding: 15px 0;" v-html="shop.intro"></div>
              <div class="shop-flex-text-address"><span style="color:rgb(102,102,102)">门店地址：</span><span style="width:220px;display:block">{{shop.address}}</span></div>
              <div class="shop-flex-text-address"><span style="color:rgb(102,102,102)">商家电话：</span><span style="width:220px;display:block">{{shop.contact}}</span></div>
              <div class="shop-flex-text-address" v-if="shop.activity" ><span style="color:rgb(102,102,102)">优惠活动：</span><span style="width:220px;display:block" v-html="shop.activity"></span></div>
            </div>
          </div>
        </div>
        <div class="bottom-banner center">
          <!-- <h2>更多精彩</h2> -->
          <div class="center-banner-top-bottom">
            <div class="center-flex" @click="handleJump('/')">
              <div class="img-border1">
                <img src='./back.png'/>
              </div>
              <div class="flex-text">返回首页</div>
              <div class="flex-text">了解更多</div>
            </div>
            <div class="center-flex">
              <div class="img-border1">
                <img src='./code.jpg'/>
              </div>
              <div class="flex-text">长按关注</div>
              <div class="flex-text">进入公众号</div>
            </div>
            <!--<div class="center-flex" @click="toShare">
              <div class="img-border2"></div>
              <div class="flex-text">分享好友</div>
              <div class="flex-text">一起体验</div>
            </div>-->
            <div v-if=" per_info.rule !== 18" class="center-flex" @click="goToJoin">
              <div v-if=" per_info.rule === 17" class="img-border3"></div>
              <div v-else class="img-border4"></div>
              <div class="flex-text" v-if=" per_info.rule !== 17">商家合作</div>
              <div class="flex-text" v-if=" per_info.rule !== 17">共利共赢</div>
              <div class="flex-text" v-if=" per_info.rule === 17">我要修改</div>
              <div class="flex-text" v-if=" per_info.rule === 17">合作信息</div>
            </div>
          </div>
        </div>
      </div>
      <div class="main-fixed" v-if="isShare" @click="unShare">
        <div class="img-right"><img src="./head.png"/></div>
      </div>
      <div class= "bottom-fixed-button">
        <div class="bottom-fixed-button-left" @click="goToShow">我的二维码</div>
        <div class="bottom-fixed-button-right" @click="goToUser">扫码统计</div>
      </div>
    </div>
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
import {PARTNER, LOGIN} from '@/models'
// import {UrlFollow} from '@/common/config/config'
// import wx from 'weixin-js-sdk'

export default {
  name: 'ShopShow',
  data () {
    return {
      isReady: false,
      isRouter: false,
      isShare: false,
      shop: {},
      isShop: false,
      linkSign: '',
      enter_sign: '',
      R_R_url: '',
      per_info: '',
      is_official_follow: ''
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
    handleJump: function (val) {
      router.push(val)
    },
    /* goToBack (val) {
      if (this.is_official_follow) {
        router.push('/')
      } else {
        window.location.href = UrlFollow
      }
    }, */
    goToJoin: function () {
      // 申请活动页
      if (Number(this.per_info.rule) === 16) {
        this.$messagebox('提示', '请进行商家身份认证')
          .then(res => {
            router.push('/user/setupshops')
          })
      } else if (Number(this.per_info.rule) === 17 || Number(this.per_info.rule) === 18) {
        router.push('/user/shopjoin')
      } else if (Number(this.per_info.rule) === 15) {
        this.$messagebox('提示', '请进行个人信息认证')
          .then(res => {
            router.push('/user/setup')
          })
      }
    },
    goToUser: function () {
      // 扫码统计
      if (Number(this.per_info.rule) === 16 || Number(this.per_info.rule) === 15) {
        router.push('/user/my?parent_identify=' + this.per_info.identify_id)
      } else if (Number(this.per_info.rule) === 17 || Number(this.per_info.rule) === 18) {
        router.push('/user/vip')
      }
    },
    goToShow: function () {
      // 我的二维码
      router.push('/user/qrcode')
      /* if (Number(this.per_info.rule) === 15) {
        this.$messagebox('提示', '请进行个人信息认证')
          .then(res => {
            router.push('/user/setup')
          })
      } else {
        router.push('/user/qrcode')
      } */
    },
    toShare: function () {
      this.isShare = true
    },
    unShare: function () {
      this.isShare = false
    }
  },
  created: function () {
    var self = this
    var startTime = new Date()
    var loadTimeout = setTimeout(function () {
      console.log('settimeout!!!!!!!!!')
      self.$indicator.open()
    }, 1999)
    /* 获取个人信息 */
    PARTNER.getMsg()
      .then(res => {
        console.log(res)
        self.per_info = res.data.data
      })
      .catch(function (error) {
        console.log('error', error)
        // self.initLoading = false;
      })
    /* 判断url */
    let url = window.location.href
    if (Number(url.search('shopidentity')) !== -1) {
      console.log(1)
      let str = url.split('?')[1]
      let strs = str.split('&')
      let data = {}
      for (let i = 0; i < strs.length; i++) {
        data[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1])
      }
      console.log(data)
      if (data.shopidentity) {
        PARTNER.getAdvertInfo(data.shopidentity, 1)
          .then(res => {
            if (res.data.retCode === 0) {
              console.log(res.data.data.is_shop)
              if (res.data.data.is_shop === 1) {
                self.isShop = true
                self.shop = res.data.data.shop
                self.isReady = true
                self.cancelLoading(self, loadTimeout, startTime)
              } else {
                self.isShop = false
                self.shop = []
                self.isReady = true
                self.cancelLoading(self, loadTimeout, startTime)
              }
            } else {
              console.log('asds')
            }
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        console.log(data)
      }
    } else {
      PARTNER.getMsg()
        .then(res => {
          console.log(res)
          this.per_info = res.data.data
          PARTNER.getAdvertInfo(this.per_info.identify_id, 1)
            .then(res => {
              if (res.data.retCode === 0) {
                console.log(res.data.data.is_shop)
                if (res.data.data.is_shop === 1) {
                  self.isShop = true
                  self.shop = res.data.data.shop
                  self.isReady = true
                  self.cancelLoading(self, loadTimeout, startTime)
                } else {
                  self.isShop = false
                  self.shop = []
                  self.isReady = true
                  self.cancelLoading(self, loadTimeout, startTime)
                }
              } else {
                console.log('asds')
              }
            })
        })
        .catch(function (error) {
          console.log('error', error)
          // self.initLoading = false;
        })
    }
    LOGIN.isFollow()
      .then(res => {
        console.log(res)
        if (res.data.retCode === 0) {
          this.is_official_follow = res.data.attach.is_official_follow
          if (!this.is_official_follow) {
            self.isReady = true
            self.cancelLoading(self, loadTimeout, startTime)
            router.push('/saoma')
          } else {
            return false
          }
        }
      })
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
  .main {
    font-size: 20px;
    background-color: #fff;
    background-size: cover;
    height: 100%;
    min-height: 603px;
  }
  .mint-header {
    background-color: #EFEFF4;
    font-size: 20px;
    color: #000;
    font-weight: bold;
  }
  .header-img {
    width: 100%;
  }
  /*底部跳转*/
  .bottom {
    position: fixed;
    bottom: 0;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #3FA6FF;
    z-index: 88;
    color: #fff;
  }
  .bottom-left{
    display: flex;
    flex: 1;
    border-right: 1px solid #ccc;
    padding: 20px;
    text-align: right;
  }
  .bottom-right{
    display: flex;
    padding: 20px 40px;
  }
  .center{
    padding: 0 30px;
    margin-top: -40px;
  }
  /* button 修饰 */
  .gradient-pink {
    background: -webkit-linear-gradient(left, #FF6EAB, #FE2F5A);
    background: linear-gradient(to right, #FF6EAB, #FE2F5A);
  }

  .top-banner, .center-banner, .bottom-banner {
    text-align: center;
    border: 1px solid #ccc;
  }
  .top-banner {
    border:none;
    border-bottom: 1px solid rgba(254,121,163,0.2);
    /* margin-bottom: 20px; */
    color: rgb(102,102,102);
  }
  .top-banner h2 {
    text-align: center;
    color: #B32436;
    padding: 5px 0;
  }
  .top-banner .top-banner-text {
    font-size: 12px;
    text-align: left;
    line-height: 16px;
  }
  .top-banner .top-banner-text .top-banner-text-right {
    text-align: right;
    color: #EE69A8;
    padding-bottom: 26px;
    font-weight: bold;
  }

  .top-banner-text-left {
      text-align: left;
      color: #EE69A8;
      font-weight: bold;
    }

  .center-banner {
    border: none;
    margin-top: 0;
    color: rgb(102,102,102);
  }
  .center-boder {
    margin-bottom: 26px;
  }
  .center-banner-top span {
    border: 3px solid #B32436;
    padding: 5px 20px;
    border-radius: 20px;
    color: #B32436;
    font-weight: bolder;
  }
  .center-banner-top-center {
    font-size: 14px;
    color: #000000;
    background: url('./main-header-shop.png') no-repeat center center;
    background-size: 100%;
    margin: -30px -30px 15px -30px;
    padding: 0px 0 150px 0;
  }
  .bottom-banner {
    border: none;
    border-top: 1px solid rgba(254,121,163,0.2);
    margin-top: 0;
    padding: 26px 0 0 0;
    color: rgb(102,102,102);
  }
  .bottom-banner h2 {
    padding: 10px 0;
    color: #B32436;
  }
  .main-fixed {
    background-color: rgba(0,0,0,0.8);
    width: 100%;
    height: 100%;
    color: #fff;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    font-size: 16px;
  }
  .main-fixed-href {
    color: #fff;
    position: fixed;
    top: 0;
    left: 50%;
    z-index: 98;
    font-size: 16px;
  }
  .main-fixed .img-right {
    text-align: right;
    padding-right: 20px;
  }
  .main-fixed .img-right img {
    width: 40%;
  }

  .center-banner-top-bottom {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
  .center-flex-top {
    font-size: 14px;
    color: #000000;
  }
  .center-flex-bottom {
    font-size: 12px;
  }
  .flex-img {
    width: 32px;
  }
  .img_big {
    width: 12.5%;
  }
  .center-flex {

  }
  .center-flex .flex-text {
    font-size: 12px;
  }
  .shop-flex {
    display: flex;
    /* padding: 20px 0; */
    margin-bottom: 20px;
    background-color: rgba(255,255,255,0.5);
    border-radius: 20px;
    flex-direction: column;
  }
  .shop-flex-img {
    display: flex;
    /* flex-direction: column; */
    justify-content: center;
    border: 1px solid #ccc;
    border-bottom-right-radius: 50px;
    border-top-left-radius: 50px;
    background-color: #F4CFE0;
    /* margin: 0 20px; */
    border: none;
    background-color: #fff;
  }
  .shop-flex-img-img {
    width: 315px;
    height: 260px;
    /* 此处需根据图片大小修改 */
  }
  .shop-flex-text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: left;
    font-size: 12px;
    color: rgb(102,102,102);
  }
  .shop-flex-text-address {
    padding-bottom: 7px;
  }
  .shop-flex-text-activity {
    font-size: 15px;
    color: #000000;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  }
  .shop-flex-text-address img{
    width: 16px;
    height: 16px;
    border: 1px solid #ccc;
    vertical-align: middle;
    margin-right: 10px;
    margin-right: 12px;
    margin-top: -4px;
    padding: 2px;
    float: left;
  }
  .shop-flex-text-address span {
    color: #000000;
    float: left;
  }
  .show-img-x {
    position: absolute;
    top: 0;
    right: 10px;
    font-size: 30px;
  }
  .show-img-text {
    width: 100%;
    color: #DE5078;
    text-align: center;
    font-size: 16px;
    position: absolute;
    bottom: 20px;
  }
  .href_img {
    width: 15.5%;
    position: fixed;
    right: 10px;
    top: 22%;
  }
  .bottom-fixed-button {
    display: flex;
    flex-direction: row;
    width: 100%;
  }
  .bottom-fixed-button-left {
    flex: 1;
    text-align: center;
    margin: 20px;
    border-radius: 50px;
    padding: 5px 0;
    border: 1px solid rgb(254,121,163);
    font-size: 16px;
    color: rgb(251,84,120);
    margin-right: 0;
  }
  .bottom-fixed-button-left:hover {
    background-color: rgb(254,121,163);
    color: #fff;
  }
  .bottom-fixed-button-right {
    flex: 1;
    text-align: center;
    margin: 20px;
    border-radius: 50px;
    padding: 5px 0;
    border: 1px solid rgb(254,121,163);
    font-size: 15px;
    color: rgb(251,84,120);
    margin-left: 12px;
  }
  .bottom-fixed-button-right:hover {
    background-color: rgb(254,121,163);
    color: #fff;
  }
  .img-border1 {
    width: 64px;
    background: rgb(254,121,163)  no-repeat center center;
    height: 64px;
    background-size: 50% 50%;
    border-radius: 50%;
    margin-bottom: 10px;
  }
  .img-border1 img {
    width: 32px;
    margin-top: .38rem;
    display: inline-block;
  }
  .img-border2 {
    width: 64px;
    background: rgb(254,121,163) url(./share@2x.png) no-repeat center center;
    height: 64px;
    background-size: 50% 50%;
    border-radius: 50%;
    margin-bottom: 10px;
  }
  .img-border3 {
    width: 64px;
    background: rgb(254,121,163) url(./changemsg@2x.png) no-repeat center center;
    height: 64px;
    background-size: 50% 50%;
    border-radius: 50%;
    margin-bottom: 10px;
  }
  .img-border4 {
    width: 64px;
    background: rgb(254,121,163) url(./changemsg@3x.png) no-repeat center center;
    height: 64px;
    background-size: 50% 50%;
    border-radius: 50%;
    margin-bottom: 10px;
  }
  .flex-img-width {
    width: 120px;
    padding: 0 8px;
    padding-bottom: 26px;
    padding-top: 26px;
  }
  .flex-img-width img {
    width: 104px;
  }
</style>
