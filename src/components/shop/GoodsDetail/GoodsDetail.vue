<template>
  <div style="height: 13.34rem">
    <div class="btn-mar-bottom" id="product" v-if="isReady">
      <mt-swipe class="wrapper" :auto="4000" :speed="1000" v-if="!goodsDetail">
        <mt-swipe-item><img src="./good-desc1.jpg" alt="" ></mt-swipe-item>
        <mt-swipe-item><img src="./good-desc2.jpg" alt="" ></mt-swipe-item>
        <mt-swipe-item><img src="./good-small.jpg" alt="" ></mt-swipe-item>
      </mt-swipe>
      <mt-swipe class="wrapper" :auto="4000" :speed="1000" v-else :showIndicators="goodsDetail && goodsDetail.imagesList.length > 1">
        <mt-swipe-item v-for="detail in goodsDetail.imagesList" v-bind:key="detail">
          <img v-if="!detail" src="./good-desc1.jpg" alt="" >
          <img v-else :src="'http://mrhmr.com/'+detail" alt="" >
        </mt-swipe-item>
      </mt-swipe>
      <div class="white-padding">
        <div class="shop-list-p" v-if="!goodsDetail.name">悦人小店美白淡斑化妆水悦人小店美白淡斑化妆水悦人小店美白淡斑化妆水悦人小店美白淡斑化妆水悦人小店美白淡斑化妆水悦人小店美白淡斑化妆水</div>
        <div class="shop-list-p" v-else>{{goodsDetail.name}}</div>
        <div class="shop-price"><img src="./glod.png" alt="" class="glod-png">金积分:{{goodsDetail.price1}}</div>
        <!--<div class="shop-right"><span class="padding-lr">运费: ￥0.13</span>库存: 10件</div>-->
      </div>
      <section class="msg">
        <div class="msg-title">
          商品详情
        </div>
      </section>
      <section class="white-padding words">
        <p><a style="color: rgb(51, 102, 204); outline: 0px;"></a></p>
        <table>
          <tbody>
          <tr class="firstRow">
            <td style="margin: 0px; padding: 0px; word-break: break-all;">
              <!--<p v-if="!goodsDetail.detailImagesList">
                <img src="https://img.alicdn.com/imgextra/i3/2851257011/TB2pSW3XKrAQeBjSZFNXXcgJVXa_!!2851257011.jpg">
                <img src="https://img.alicdn.com/imgextra/i1/2851257011/TB2cagRauYyQeBjSszcXXbIRpXa_!!2851257011.jpg">
                <img src="https://img.alicdn.com/imgextra/i4/2851257011/TB2RG33aqnyQeBjSspeXXa8WpXa_!!2851257011.jpg">
                <img src="https://img.alicdn.com/imgextra/i3/2851257011/TB2I3kUaxvxQeBjy0FiXXXioXXa_!!2851257011.jpg" class="" width="750" height="817">
                <img src="https://img.alicdn.com/imgextra/i4/2851257011/TB2G6UUazzyQeBjy0FjXXc5CVXa_!!2851257011.jpg" class="" width="750" height="885">
                <img src="https://img.alicdn.com/imgextra/i4/2851257011/TB29R.YaBYxQeBjSszeXXa0spXa_!!2851257011.jpg" class="" width="750" height="1544">
              </p>
              <p v-else v-for="imgUrl in goodsDetail.detailImagesList" v-bind:key="imgUrl" @click="openScale(imgUrl)">
                <img :src="'http://mrhmr.com/'+imgUrl" alt="" >
              </p>-->
              <div class="p-memo" v-html="goodsDetail.memo"></div>
            </td>
          </tr>
          </tbody>
        </table>
      </section>
      <section class="btn btn-bottom1">
        <ul>
          <li class="li-first" @click="goToCart">
            <a>
              <div :class="ifCardAdd"></div>
              <div>我的购物车</div>
            </a>
          </li>
          <li class="li-second" @click="join">加入购物车</li>
          <li class="li-last" @click="gotoOrder">立即购买</li>
        </ul>
      </section>
      <section class="btn-popup" v-if="isJoinCar" >
        <div class="btn-popup-box">
          <div class="float-left">
            <img :src="'http://mrhmr.com/' + goodsDetail.logo" alt="">
          </div>
          <div class="white-padding">
            <div class="shop-list-p" style="padding-top:.5rem ;">悦人小店美白淡斑化妆水悦人小店美白淡斑化妆水悦人小店美白淡斑化妆水悦人小店美白淡斑化妆水悦人小店美白淡斑化妆水悦人小店美白淡斑化妆水</div>
            <div class="shop-price"><img src="./glod.png" alt="" class="glod-png">金积分:{{(goodsDetail.price1*10000*good.cartCount)/10000}}</div>
            <div class="num-wrapper num">
              <span class="num-btn reduce" @click="changeNum(-1)">-</span>
              <span class="num-num">{{ good.cartCount }}</span>
              <span class="num-btn plus" @click="changeNum(1)">+</span>
            </div>
            <!--<div class="shop-right"><span class="padding-lr">运费: ￥0.13</span>库存: 10件</div>-->
          </div>
        </div>
        <div class="btn btn-join" @click="joinOk">确定加入</div>
        <div class="btn-bg" @click="joinFalse"></div>
      </section>
      <section class="popup-box" @click="showRight" v-if="isShowRight">
        <img src="./right.png" alt="">
        <div>添加成功，在购物车等亲~</div>
      </section>
      <div class="scale-img" @click="closeScale" v-if="ifShowScale">
        <img :src="'http://mrhmr.com/'+ showScale" alt="">
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
import Vue from 'vue'
import router from '../../../router'
import {GOOD, CART} from '@/models/index.js'
import { Swipe, SwipeItem, MessageBox } from 'mint-ui'

Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)

export default {
  name: 'GoodsDetail',
  data () {
    return {
      isReady: false,
      isRouter: false,
      isJoinCar: false,
      good: {
        cartCount: 1
      },
      isShowRight: false,
      goodsId: '',
      goodsDetail: [],
      ifCardAdd: 'card-no-add',
      startTime: '',
      loadTimeout: '',
      ifShowScale: false,
      showScale: ''
    }
  },
  methods: {
    gotoOrder () {
      if (localStorage) {
        localStorage.setItem('good', JSON.stringify(this.goodsDetail))
      }
      router.push({name: 'goodsPay', params: {good: this.goodsDetail}})
    },
    joinOk () {
      this.isJoinCar = false
      this.showRight()
    },
    join () {
      this.isJoinCar = true
    },
    // 关闭购物车弹框
    joinFalse () {
      this.isJoinCar = false
    },
    // 跳转购物车
    goToCart () {
      router.push({name: 'cart'})
    },
    // 改变商品数量
    changeNum (changeWay) {
    // 改变商品数量
    // is controled by the original data source! to be improved
      if (changeWay === -1) {
        if (!(this.good.cartCount > 1)) {
          MessageBox({
            title: '注意',
            message: '数量不能少于1',
            showCancelButton: false,
            closeOnClickModal: true
          })
          return
        }
        this.good.cartCount--
        // ajax处理
        return
      }
      if (changeWay === 1) {
        if (this.good.cartCount >= 99) {
          MessageBox({
            title: '注意',
            message: '数量不能大于99',
            showCancelButton: false,
            closeOnClickModal: true
          })
          // alert('单个商品最大数量为99')
          return
        }
        this.good.cartCount++
      }
    },
    // 显示加入购物车弹框
    showRight () {
      let self = this
      let params = {
        goodsId: self.goodsDetail.id,
        count: self.good.cartCount
      }
      // 请求加入购物车接口
      CART.addGood(params.goodsId, params.count)
        .then(res => {
          if (res.data.retCode === 0) {
            self.isShowRight = true
            setTimeout(function () {
              self.isShowRight = false
              self.ifCardAdd = 'card-add'
            }, 1000)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 2秒后出加载动画
    cancelLoading: function (self, loadTimeout, startTime) {
      clearTimeout(loadTimeout)
      const endTime = new Date()
      if (endTime - startTime >= 2000) {
        self.$indicator.close()
      }
    },
    // 重新加载页面
    goToback: function () {
      location.reload()
    },
    /* 打开放大图 */
    openScale (key) {
      this.showScale = key
      this.ifShowScale = true
    },
    /* 关闭放大图 */
    closeScale () {
      this.ifShowScale = false
    }
  },
  created () {
    // 延迟出加载动画
    let self = this
    self.startTime = new Date()
    self.loadTimeout = setTimeout(function () {
      self.$indicator.open()
    }, 1999)
    // 跳转路由回滚顶部
    window.scrollTo(0, 0)
    this.goodsId = this.$route.params.id
    // 请求商品详情接口
    GOOD.goodDetail(this.goodsId)
      .then(res => {
        this.goodsDetail = res.data.data
        this.cancelLoading(self, this.loadTimeout, this.startTime)
        this.isReady = true
      })
      .catch(err => {
        console.log(err)
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
.img-box {
  padding: 0 0;
}
.join-input {
  width: 100%;
}
.submit-input {
  color: #fff;
  background-color: rgb(254,121,163);
  outline: none;
  padding: 10px 0;
  border: none;
  border-radius: 50px;
  font-size: 15px;
}
.wrapper {
  height: 7.5rem;
}
.btn-mar-bottom {
    margin-bottom: .95rem;
}
img{
  display: block;
  width: 100%;
  height:auto;
}
/* 商品描述 */
.white-padding {
    padding: .3rem;
    background: #fff;
}
.shop-list-p {
  font-size: .26rem;
  line-height: .4rem;
  height: .8rem;
  overflow: hidden;
  margin-bottom: 5px;
  display: -webkit-box;
  -webkit-line-clamp:2;
  -webkit-box-orient: vertical;
  color: rgb(56,56,56);
}
.padding10 {
    padding: 10px 0;
}
.shop-price {
    padding: .13rem 0 .23rem 0;
    color: rgb(214,83,228);
    font-size: .28rem;
    /*font-weight: bold;*/
}
/* 标题 */
#product .lines {
    background: #ad5ed2;
}
.font3 {
    font-size: .3rem !important;
}
.color2 {
    color: #222;
}

/* 底部费用、库存 */
.shop-right {
    width: 100%;
    text-align: right;
    color: #7d7d7d;
}
.padding-lr {
    padding: 0 .3rem;
}

/* 商品详情bar*/
.msg{
  background-color: #fff;
}
.msg-title {
    margin-top: .2rem;
    text-align: center;
    font-size: .32rem;
    color: rgb(214,83,228);
    padding: .4rem;
}
.mar-top {
    margin-top: .2rem;
}

.msg-title .lines {
    width: 20%;
    height: 1px;
    background: #cfcfcf;
    display: inline-block;
    vertical-align: 5px;
}

.msg-title .font {
    padding: 0 10px;
}
.color {
    color: #ad5ed2 !important;
}

/* 商品详情包裹框 */
.white-padding {
    padding: .17rem .2rem;
    background: #fff;
}
ul {
  list-style-type: none;
}
.words img {
    margin: 0;
}

img {
    display: block;
    width: 100%;
    height: auto;
}
.btn {
  height: 1.05rem;
  width: 100%;
  background: #fff;
  color: #fff;
  text-align: center;
  line-height: 1.05rem;
  font-size: .36rem;
}
.btn-popup {
  position: fixed;
  /* bottom: 0; */
  width: 100%;
  height: 100%;
  z-index: 200;
  top: 0;
  background: rgba(0,0,0,0.5);
}
.btn-popup .shop-price {
  float: left;
}
.btn-bg {
  position: absolute;
  top: 0;
  width: 100%;
  height: 10rem;
}
.btn-bottom1 {
  position: fixed;
  left: 0;
  bottom: 0;
}
.btn-join {
  background-color: #bc7aff;
  position: absolute;
  bottom: 0;
  z-index: 300;
}
.li-second {
  background-color: #bc7aff;
}
/* 底部按钮 */
#product .btn-bottom1 {
    width: 100%;
    background: #fff;
    padding:0
}
#product .btn-bottom1 li {
  float: left;
  width: 33.3%;
}
#product .btn-bottom1 li.li-first {
  background-color: rgb(255,255,255);
  border-top: 1px solid #dfdfdf;
}
#product .btn-bottom1 li.li-last {
  background-color: #ff8986;
}
#product .btn-bottom1 li.li-first a img {
  width: .48rem;
  height: .48rem;
  margin: .17rem auto .12rem auto;
}
#product .btn-bottom1 li.li-first a div {
  font-size: .24rem;
  padding: 0;
  line-height: .2rem;
  color: rgb(104,104,104);
}
.btn-popup-box {
  height: 2.52rem;
  background-color: #ffffff;
  position: absolute;
  bottom: 1rem;
  z-index: 300;
}
.btn-popup .float-left {
  margin: .32rem .24rem;
}
  .btn-popup .float-left img {
    width: 1.88rem;
    height: 1.88rem;
  }
  .popup-box {
    width: 4.1rem;
    height: 1.6rem;
    position: fixed;
    top: 45%;
    left: 1.7rem;
    background-color: rgba(0,0,0,0.78);
    border-radius: .08rem;
  }
.popup-box div {
  text-align: center;
  font-size: .3rem;
  color: #ffffff;
}
.popup-box img {
  width: .51rem;
  height: .34rem;
  margin: .3rem auto;
}
/* 按钮控制 */
.num-wrapper{
  display: inline-block;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  height: .64rem;
  width: 2.1rem;
  border-radius: 0.06rem;
  border:1px solid rgb(194,194,194);
  font-size: 0.2rem;
  color: rgb(194,194,194);
  background-color: #fff;
  user-select: none;
  position: absolute;
  right: .28rem;
}
.num-btn {
  display: inline-block;
  flex:1;
  height:.62rem;
  line-height: 0.55rem;
  width: 0.4rem;
  text-align: center;
  font-size: .5rem;
}
.num-btn:active {
  color:rgba(214,83,228,1)
}
.num-num {
  display: inline-block;
  width:1rem;
  height:.64rem;
  line-height: 0.64rem;
  box-sizing: border-box;
  vertical-align: top;
  border-left:1px solid rgb(194,194,194);
  border-right:1px solid rgb(194,194,194);
  text-align: center;
  font-size: 0.3rem;
  color: rgb(113,113,113)
}
#product .btn-bottom1 li.li-first a .card-no-add {
    height: .5rem;
    background: url("./card.png") no-repeat center center;
    background-size: .48rem .48rem;
    padding: .1rem;
  }
#product .btn-bottom1 li.li-first a .card-add {
  height: .5rem;
  background: url("./card-add.png") no-repeat center center;
  background-size: .56rem .56rem;
  padding: .1rem;
}
.glod-png {
  width: .34rem;
  height: .34rem;
  float: left;
  vertical-align: middle;
  margin-right: .1rem;
}
.scale-img {
  position: fixed;
  overflow:auto;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0,0,0);
}
.scale-img img {
  position: absolute;
  top: 2rem;
}
.p-memo {
  color: rgb(56,56,56);
  font-size: .26rem;
  line-height: .4rem;
}
</style>
