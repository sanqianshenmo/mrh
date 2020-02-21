<template>
  <div style="min-height: 13.34rem" class="shop-box">
    <div class="t-shop" v-if="isReady">
      <div class="box-shop" v-if="!swipeArr">
        <!--<div class="box-header">-->
        <!--美人汇在线商城V1.0-->
        <!--</div>-->
        <mt-swipe class="wrapper" :auto="4000" :speed="1000">
          <mt-swipe-item><img src="./banner1.png" alt="" ></mt-swipe-item>
          <mt-swipe-item><img src="./banner2.png" alt="" ></mt-swipe-item>
          <mt-swipe-item><img src="./banner3.png" alt="" ></mt-swipe-item>
        </mt-swipe>
      </div>
      <div class="box-shop" v-else>
        <div class="box-header">
        </div>
        <mt-swipe class="wrapper" :auto="4000" :speed="1000" :showIndicators="swipeArr && swipeArr.length > 1">
          <mt-swipe-item v-for="swipe in swipeArr" v-bind:key="swipe.id">

            <a @click="gotoGoodsDetail(swipe.data_id)" v-if="swipe.type ===0">
              <img v-if="!swipe.pic" src="./banner1.png" alt="">
              <img v-else :src="baseImgUrl+swipe.pic" alt="">
            </a>
            <a :href="swipe.url" v-else>
              <img v-if="!swipe.pic" src="./banner1.png" alt="">
              <img v-else :src="baseImgUrl+swipe.pic" alt="">
            </a>
          </mt-swipe-item>
        </mt-swipe>
        <div class="wrapper1">
        </div>
        <div class="wrapper2">
        </div>
      </div>
      <div>
        <category :category="category" @changeId="changeId"></category>
        <GoodsList :goodsList="goodsList" :listId="listId" @showGoTop="showGoTop"></GoodsList>
      </div>
      <div class="shop-car" @click="goToCart">
        <div :class="ifCardAdd"></div>
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
    <BottomNav></BottomNav>
  </div>
</template>

<script>
import Vue from 'vue'
import router from '@/router'
import {SHOP, CART} from '@/models/index'
import Category from '@/components/shop/Category/Category'
import GoodsList from '@/components/shop/GoodsList/GoodsList'
import BottomNav from '@/components/common/BottomNav/BottomNav'
import { Swipe, SwipeItem, Indicator } from 'mint-ui'
import { IMG_PREFIX } from '@/common/config/config'
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)

export default {
  name: 'Shop',
  data () {
    return {
      isReady: false,
      isRouter: false,
      baseImgUrl: IMG_PREFIX,
      swipeArr: [],
      category: [],
      goodsList: [],
      goodsListPage: 1,
      AllGoodsListPage: 1,
      listId: 1,
      size: 10,
      ifCardAdd: 'card-no-add',
      ifShowGoToTop: false,
      startTime: '',
      loadTimeout: ''
    }
  },
  components: {
    GoodsList,
    Category,
    BottomNav
  },
  created () {
    // 延迟出加载动画
    let self = this
    self.startTime = new Date()
    self.loadTimeout = setTimeout(function () {
      Indicator.open()
    }, 1999)
    // 跳转路由回滚顶部
    window.scrollTo(0, 0)
    //  请求轮播图接口
    SHOP.carousel()
      .then(res => {
        console.log(res.data)
        this.swipeArr = res.data.data
      })
      .catch(err => {
        console.log(err)
      })

    // 请求商品分类接口
    SHOP.category()
      .then(res => {
        this.category = res.data.data
      })
      .catch(err => {
        console.log(err)
      })
    // 请求商品分类列表接口
    SHOP.categoryList(this.AllGoodsListPage, this.size)
      .then(res => {
        this.goodsList = res.data.data.data
        this.cancelLoading(self, this.loadTimeout, this.startTime)
        this.isReady = true
      })
      .catch(err => {
        console.log(err)
      })
    // 请求购物车接口
    CART.getList()
      .then(res => {
        if (res.data.retCode === 0) {
          if (res.data.data.data.length > 0) {
            this.ifCardAdd = 'card-add'
          }
        }
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
  },
  methods: {
    /* 跳转详情页 */
    gotoGoodsDetail (id) {
      router.push({name: 'GoodsDetail', params: { id: id }})
    },
    // 接收category组件传递的id
    changeId (id) {
      this.listId = id
      if (id === 1) {
        this.onLoadShops()
      } else {
        this.changeList(id)
      }
    },
    // 请求商品列表传递给goodsList
    changeList (id) {
      SHOP.categoryList(this.AllGoodsListPage, this.size, id)
        .then(res => {
          this.goodsList = res.data.data.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 页面加载时请求
    onLoadShops () {
      //  请求商品分类列表接口
      SHOP.categoryList(this.AllGoodsListPage, this.size)
        .then(res => {
          this.goodsList = res.data.data.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 跳转购物车
    goToCart () {
      router.push({name: 'cart'})
    },
    // 数组索引排序
    arrSort (item) {
      let arrSort = item
      let arrAdd = []
      // let arrSub = []
      if (arrSort.length > 1) {
        // 索引+1
        let arrFirst = arrSort[0]
        for (let i = 0; i < arrSort.length; i++) {
          arrAdd[i] = arrSort[i + 1]
        }
        arrAdd[arrSort.length - 1] = arrFirst
        this.swipeArr1 = arrAdd
        // this.swipeArr1 = this.swipeArr
      }
    },
    arrSub (item) {
      let arrSort = item
      let arrSub = []
      if (arrSort.length > 1) {
        // 索引-1
        let arrFirst = arrSort[arrSort.length - 1]
        for (let i = 1; i < arrSort.length; i++) {
          arrSub[i] = arrSort[i - 1]
        }
        arrSub[0] = arrFirst
        this.swipeArr2 = arrSub
        // this.swipeArr2 = this.swipeArr
      }
    },
    // 返回顶部
    goToTop () {
      document.documentElement.scrollTop = document.body.scrollTop = 0
      this.ifShowGoToTop = false
    },
    // 接收size参数返回顶部
    showGoTop (size) {
      if (size > 3) {
        this.ifShowGoToTop = true
      }
    },
    // 2秒后出加载动画
    cancelLoading: function (self, loadTimeout, startTime) {
      clearTimeout(loadTimeout)
      const endTime = new Date()
      if (endTime - startTime >= 2000) {
        Indicator.close()
      }
    },
    // 重新加载页面
    goToback: function () {
      location.reload()
    }
  }
}
</script>

<style>
  .shop-box .img-box {
    padding: 0 0;
  }
  .shop-box .join-input {
    width: 100%;
  }
  .shop-box .submit-input {
    color: #fff;
    background-color: rgb(254,121,163);
    outline: none;
    padding: 10px 0;
    border: none;
    border-radius: 50px;
    font-size: 15px;
  }
  .t-shop .mint-swipe-items-wrap {
    border-radius: .1rem;
  }
  .t-shop .box-shop {
    background: #ffffff url("./shop-bg.png") no-repeat center center;
    background-size: 100% 100%;
    width: 100%;
    height: 4rem;
    overflow: hidden;
  }
  .t-shop .box-header {
    text-align: center;
    color: #ffffff;
    padding: .3rem 0;
    font-size: .30rem;
  }
  .t-shop .wrapper{
    height:3.2rem;
    padding: 0 .8rem;
  }
  .t-shop .wrapper1 {
    position: relative;
    top: -3rem;
    left: -72%;
    width: 79%;
    height: 2rem;
    border-radius: .1rem;
    background-color: rgba(255,255,255,0.2);
  }
  .t-shop .wrapper2 {
    position: relative;
    top: -5rem;
    left: 93%;
    width: 80%;
    height: 2rem;
    overflow: hidden;
    border-radius: .1rem;
    background-color: rgba(255,255,255,0.2);
  }
  .t-shop .wrapper a {
    width: 100%;
    height: 100%;
  }
  .t-shop .wrapper a img {
    width: 5.88rem;
    height: 2.44rem;
    border-radius: .1rem;
  }
  .t-shop .wrapper1 a img {
    width: 5.88rem;
    height: 2rem;
    border-radius: .1rem;
  }
  .t-shop .wrapper2 a img {
    width: 5.88rem;
    height: 2rem;
    border-radius: .1rem;
  }
  .t-shop .mint-swipe-indicators {
    bottom: 5px;
  }
  .t-shop .mint-swipe-indicator {
    width: .2rem;
    height: .04rem;
    display: inline-block;
     border-radius: 2px;
    background: #fff;
    opacity: 0.4;
    margin: 0 .05rem;
  }
  .t-shop .mint-swipe-indicator.is-active {
    position: relative;
    top: .06rem;
    width: .20rem;
    height: .16rem;
    background: url("./sanjiao.png") no-repeat center center;
    background-size: 100%;
    opacity: 1;
  }
  .t-shop .shop-car {
    width: 1.16rem;
    height: .68rem;
    background: -moz-linear-gradient(left, #aa54e3 0%, #e160c2 100%);
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#aa54e3), color-stop(100%,#e160c2));
    background: -webkit-linear-gradient(left, #aa54e3 0%,#e160c2 100%);
    background: -o-linear-gradient(left, #aa54e3 0%,#e160c2 100%);
    background: -ms-linear-gradient(left, #aa54e3 0%,#e160c2 100%);
    background: linear-gradient(to right, #aa54e3 0%,#e160c2 100%);
    position: fixed;
    right: 0;
    bottom: 3rem;
    border-top-left-radius: .34rem;
    border-bottom-left-radius: .34rem;
  }
  .t-shop .card-no-add {
    width: 100%;
    height: 100%;
    background: url("./shop-car.png") no-repeat center center;
    background-size: .7rem .68rem;
  }
  .t-shop .card-add {
    width: 100%;
    height: 100%;
    background: url("./shop-car-add.png") no-repeat center center;
    background-size: .7rem .6rem;
  }
  .t-shop .to-top {
    position: fixed;
    right: .2rem;
    bottom: 1rem;
    background:  url("./gototop.png") no-repeat center center;
    width: .86rem;
    height: .86rem;
    background-size: 100% 100%;
  }
  /* 修改 mint-ui 默认样式 */
  /* 修改加载中fading-circle */
  .mint-spinner-fading-circle-circle::before {
    width: 10%;
    height: 30%;
  }
</style>
