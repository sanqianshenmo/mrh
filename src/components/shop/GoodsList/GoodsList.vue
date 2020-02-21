<template>
  <div>
    <div class="shoplist-no"  v-if="goodsList && goodsList.length === 0">
      <img src="./nogoods.png" alt="">
      <div>没有相关商品了~</div>
    </div>
    <ul class="shop-list clearfloat" v-else
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="moreLoading"
        infinite-scroll-distance="0"
        infinite-scroll-immediate-check="false">
      <li v-for="good in goodsList" v-bind:key="good.id">
        <a @click="gotoGoodsDetail(good.id)">
          <img v-if="!good.logo" src="./noshopimg.jpg">
          <img v-else :src="baseImgUrl+good.logo">
          <div class="box">
            <p>{{good.name}}</p>
            <div class="clearfloat" v-if="!good.price1">
              <img src="./glod.png" alt="" class="glod-png">
              金积分:0
              <span class="float-right"></span>
            </div>
            <div class="clearfloat" v-else>
              <img src="./glod.png" alt="" class="glod-png">
              金积分:{{good.price1}}
              <span class="float-right"></span>
            </div>
          </div>
        </a>
      </li>
    </ul>
    <!--底部判断是加载图标还是提示“全部加载”-->
    <div class="more_loading" v-show="!queryLoading">
      <div class="spinner-box">
        <mt-spinner type="fading-circle" color="#000000" :size="20" v-if="moreLoading&&!allLoaded"></mt-spinner>
      </div>
      <span v-if="moreLoading&&!allLoaded">正在加载...</span>
      <div v-if="!allLoaded"></div>
      <div v-else>翻完了，没有更多了~</div>
    </div>
    <div class="to-top" @click="goToTop" v-if="ifShowGoToTop">
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import router from '../../../router'
import { Spinner, InfiniteScroll } from 'mint-ui'
// import axios from 'axios'
import {SHOP} from '@/models'
Vue.use(InfiniteScroll)
Vue.component(Spinner.name, Spinner)
export default {
  name: 'GoodsList',
  props: ['goodsList', 'listId'],
  data () {
    return {
      baseImgUrl: 'http://mrhmr.com/',
      baseHttpUrl: 'http://www.mrhmr.com',
      AllGoodsListPage: 1,
      goodsListPage: 1,
      size: 10,
      // 初始化无限加载相关参数
      queryLoading: false,
      moreLoading: false,
      allLoaded: false,
      pageNum: 1,
      totalNum: 10,
      ifShowGoToTop: false,
      fullHeight: document.documentElement.clientHeight
    }
  },
  methods: {
    gotoGoodsDetail (id) {
      router.push({name: 'GoodsDetail', params: { id: id }})
    },
    loadMore () {
      if (this.allLoaded) {
        this.moreLoading = true
        return
      }
      if (this.queryLoading) {
        return
      }
      this.moreLoading = !this.queryLoading
      this.AllGoodsListPage++
      if (this.listId === 1) {
        // 请求商品分类列表接口
        // axios.get(this.baseHttpUrl + '/slearn/shopCategory/rest/goodList?page=' + this.AllGoodsListPage + '&size=' + this.size)
        SHOP.categoryList(this.AllGoodsListPage, 10, '')
          .then(res => {
            this.totalNum = res.data.data.total
            let self = this
            self.goodsList = self.goodsList.concat(res.data.data.data)
            self.allLoaded = self.goodsList.length === self.totalNum
            self.moreLoading = self.allLoaded
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        this.goodsListPage++
        // axios.get(this.baseHttpUrl + '/slearn/shopCategory/rest/goodList?page=' + this.goodsListPage + '&categoryId=' + this.listId + '&size=' + this.size)
        SHOP.categoryList(this.goodsListPage, 10, this.listId)
          .then(res => {
            this.totalNum = res.data.data.total
            let self = this
            self.goodsList = self.goodsList.concat(res.data.data.data)
            self.allLoaded = self.goodsList.length === self.totalNum
            self.moreLoading = self.allLoaded
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    goToTop () {
      document.documentElement.scrollTop = document.body.scrollTop = 0
      this.ifShowGoToTop = false
    },
    menu () {
      this.fullHeight = document.documentElement.scrollTop || document.body.scrollTop
    }
  },
  mounted () {
    window.addEventListener('scroll', this.menu)
  },
  created () {
  },
  watch: {
    listId (n, o) {
      this.queryLoading = false
      this.moreLoading = false
      this.allLoaded = false
      this.AllGoodsListPage = 1
      this.goodsListPage = 1
    },
    goodsList (n, o) {
      if (n.length < 4) {
        this.queryLoading = true
      }
    },
    AllGoodsListPage (n, o) {
      if (n > 3) {
        this.ifShowGoToTop = true
      }
    },
    goodsListPage (n, o) {
      if (n > 3) {
        this.ifShowGoToTop = true
      }
    },
    fullHeight (n, o) {
      let self = this
      if (n > 1200) {
        self.ifShowGoToTop = true
      } else if (n < 1200) {
        self.ifShowGoToTop = false
      }
    }
    // scrollH (n, o) {
    //   console.log(n)
    // }
  }
}
</script>

<style scoped>
  .box{
    text-align:left;
  }
  .box div {
    color: rgb(214,83,228);
    font-size: .28rem;
  }
  .shop-list {
    background-color: #ffffff;
    padding: 0 .32rem 1rem .32rem;
  }
  .shop-list li {
    background: #fff;
    width: 3.3rem;
    float: left;
    padding-bottom: .5rem;
  }
  .shop-list li:nth-child(even) {
    float: right;
  }
  img {
    width: 3.3rem;
    height: 3.3rem;
    display: block;
  }
  .box {
    padding-top: .12rem;
    color: #404040;
    background: #fff;
  }
  .shop-list li .box p {
    font-size: .24rem;
    line-height: .4rem;
    height: .8rem;
    overflow: hidden;
    margin-bottom: 5px;
    display: -webkit-box;
    -webkit-line-clamp:2;
    -webkit-box-orient: vertical;
    color: rgb(56,56,56);
  }
  .inco-img {
      width: .33rem;
      height: .33rem;
      display: inline-block;
      padding: 0 5px;
      vertical-align: -2px;
  }
  .shoplist-no {
    padding: .9rem 0 1.92rem 0;
    background-color: #fff;
    border-top: 1px solid #dfdfdf;
  }
  .shoplist-no img {
    width: 2.3rem;
    height: 1.88rem;
    margin: 0 auto;
  }
  .shoplist-no div {
    text-align: center;
    padding-top: .46rem;
  }
  .shop-list li.more_loading{
    width: 100%;
    text-align: center;
  }
  .more_loading {
    height: 1.5rem;
    background-color: #fff;
    padding-bottom: 1rem;
  }
  .more_loading div {
    text-align: center;
  }
  .more_loading span:nth-child(1) div{
    margin-left: 45%;
  }
  .spinner-box {
    display: inline-block;
    padding-left: 40%;
    margin-top: -.5rem;
  }
  .glod-png {
    width: .34rem;
    height: .34rem;
    float: left;
    vertical-align: middle;
    margin-right: .1rem;
  }
  .to-top {
    position: fixed;
    right: .2rem;
    bottom: 1.8rem;
    background:  url("./gototop.png") no-repeat center center;
    width: 1rem;
    height: 1rem;
    background-size: 100% 100%;
  }
</style>
