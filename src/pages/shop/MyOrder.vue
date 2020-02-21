<template>
  <div class="my-order-outer-bg">
    <Header :headers="headers" @activeIdx="getActiveList"></Header>
    <Loading :isLoading="!isReady"></Loading>
    <div
      class="order-main-container"
      >
      <div
        style="position:relative;"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="moreLoading"
        infinite-scroll-distance="0"
        infinite-scroll-immediate-check="true"
      >
        <OrderList
          class="myorders-wrapper"
          v-for="order in orderList"
          :order="order"
          :key="order.id"
          :isOrderStateShow="isOrderStateShow">
          <div class="mt-40">
                <CartGoods
                  v-for="good in order.mrhShopGoods"
                  :good="good"
                  :key="good.id">
                  <div slot="num" :good="good" class="cartPay-num-pos">x{{good.count}}</div>
                </CartGoods>
          </div>
        </OrderList>
      </div>
      <!--底部判断是加载图标还是提示“全部加载”-->
      <div v-if="!isNoOrder">
        <div class="myorder-more-loading-wrapper" v-show="!queryLoading">
          <mt-spinner class="more-loading-spinner" type="snake" color="#00ccff" :size="20" v-show="moreLoading&&!allLoaded"></mt-spinner>
          <span v-show="allLoaded">翻完了，没有更多了~</span>
        </div>
      </div>
      <div v-else>
        <Blank class="myorder-blank-pos" :type="'order'">
          <button @click="gotoShop" class="myorder-btn blank-btn">去逛逛</button>
        </Blank>
      </div>
    </div>
  </div>
</template>

<script>
import { ORDER } from '@/models/index.js'
import CartGoods from '@/components/shop/CartGoods/CartGoods'
import Header from '@/components/user/Header'
import OrderList from '@/components/user/OrderList'
import Loading from '@/components/common/Loading/Loading'
import Blank from '@/components/common/Blank/Blank'
import { MessageBox } from 'mint-ui'

// UNKNOWN(-1,"未知"),
// TOPAY(1, "待付款"),
// PAYED(2,"已付款"),
// SENT(8,"已发货"),
// RECEIVED(9,"已收货"),
// USER_CANCELED(10,"个人取消"),
const TAB_IDX_TABLE = {
  0: 'ALL', // 所有订单
  1: 'ORDERED', // 已下订（已付款，未付款[这里指微信订单]）
  2: 'SENT', // 已发货
  3: 'RECEIVED', // 已收货
  4: 'CANCELED' // 付款后，又取消的订单
}
// 对应真实状态
const STATE_TABLE = {
  ALL: '',
  ORDERED: '1,2', // 已下订（包括 1、2）
  SENT: 8, // 已发货
  RECEIVED: 9, // 已收货
  CANCELED: 10// 已取消
}

export default {
  name: 'MyOrder',
  components: {
    Header,
    OrderList,
    CartGoods,
    Blank,
    Loading
  },
  data () {
    return {
      headers: [
        '全部',
        '已下订',
        '已发货',
        '已收货',
        '已取消'
      ],
      isReady: false,
      orderList: [],
      // 初始化滚动加载相关参数
      curTabIdx: 0,
      queryLoading: false,
      moreLoading: false, // 是过滤器终止无限滚动 触发
      allLoaded: false,
      totalNum: 0,
      pageSize: 2,
      pageNum: 1,
      // 是否含有订单
      isNoOrder: false
    }
  },
  computed: {
    isOrderStateShow () {
      if (this.curTabIdx === 0) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    init () {
      // 作用：1.首次初次进入；2.以及 切换tab时的首次数据加载 -- 并且都完成了 loadMore的初始化
      let self = this
      self.isReady = false
      // 切换tab时置空
      self.allLoaded = false // 取消 “翻完了的显示”
      // 固定化 第页size
      self.pageSize = 2
      self.pageNum = 1
      let idx = self.curTabIdx
      let state = STATE_TABLE[TAB_IDX_TABLE[idx]]
      // _getOrderList 承载的作用有点太多了！！！
      self._getOrderList(self, 'orderList', state, self.pageNum, self.pageSize)
    },
    // 无限加载函数
    loadMore () {
      if (this.allLoaded) {
        this.moreLoading = true
        return
      }
      if (this.queryLoading) {
        return
      }
      // 终止多次下拉滚动的触发 -- 属于正在拉取数据时，终止下拉触发新请求
      this.moreLoading = !this.queryLoading
      this.pageNum++
      let self = this
      let idx = self.curTabIdx
      let state = STATE_TABLE[TAB_IDX_TABLE[idx]]
      self._getOrderList(self, 'orderList', state, self.pageNum, self.pageSize)
    },
    getActiveList (idx) {
      let self = this
      if (self.curTabIdx === idx) {
        // 在该tab下，再点击无效
        return
      }
      self.curTabIdx = idx
      self.init()
    },
    _getOrderList (self, receiveName, orderState, pageNum, pageSize) {
      // self receiveName是必要的参数
      ORDER.getList(orderState, pageNum, pageSize).then(res => {
        // console.log('res1', res)
        if (res.data.retCode === 0) {
          self.isReady = true
          // 初始化数据总量 -- 与loadmore进行了强耦合，to be improved
          if (self.pageNum === 1) {
            self[receiveName] = []
            // console.log('res2', res)
            // self.totalNum = res.data.data.total
            // 初次加载判定是否有相应订单存在
            // console.log('self.totalNum---2', self.totalNum)
            // self.isNoOrder = self.totalNum === 0
            // if (self.isNoOrder) {
            //   return
            // }
          }
          // console.log('res3', res)
          // 处理每一个订单的具体商品数组的json字符串 -- 并转化为我自己的字段名
          let orderList = res.data.data.data
          // 以多请求一次为代价
          if (orderList.length === 0) {
            self.allLoaded = true
            self.moreLoading = self.allLoaded
            return
          }
          orderList.forEach(order => {
            order.mrhShopGoods = JSON.parse(order.set).goods
            // console.log('order.mrhShopGoods', order.mrhShopGoods)
          })
          self[receiveName] = self[receiveName].concat(res.data.data.data)
          self.allLoaded = self[receiveName].length === self.totalNum
          self.moreLoading = self.allLoaded
          // console.log('self.allLoaded', self.allLoaded)
          return
        }
        self.isReady = true
        MessageBox.alert(res.data.retMsg, '错误', {
          closeOnClickModal: true
        })
      }).catch(error => {
        self.isReady = true
        console.log('error', error)
      })
    },
    gotoShop () {
      this.$router.push({name: 'shop'})
    }
  },
  created () {
    this.init()
  }
}
</script>

<style scoped>
.order-main-container {
  position: absolute;
  top: 1.2rem;
  bottom:0;
  left:0;
  right:0;
  overflow:auto;
  -webkit-overflow-scrolling: touch; /* ios滑动流畅问题处理 */
}
.header-wrapper {
  padding-bottom: .2rem !important;
}
.my-order-outer-bg{
  /* background-color: #fff; */
  min-height:100%;
}
.mt-20 {
  margin-top: .2rem;
}
.mt-40 {
  margin-top: .4rem;
}
.mt-40 > .order_wrapper{
  margin-top: 0.2rem;
}
.mt-40 > .order_wrapper:first-of-type{
  margin-top: 0;
}
.myorders-wrapper:first-of-type{
  margin-top: 0;
}
.myorders-wrapper{
  border-bottom: .2rem solid rgb(245,245,245);
}
/* 数量位置 */
.cartPay-num-pos {
  position: absolute;
  right: 1.6rem;
  bottom: .2rem;
  color: rgb(190,189,189);
}
/* 更多加载 */
.myorder-more-loading-wrapper{
  padding-top: .2rem;
  height: .5rem;
  /* background-color: rgb(245,245,245); */
  text-align: center;
}
.more-loading-spinner {
  display: inline-block;
}
/* 没有订单时 位置 */
.myorder-blank-pos{
  margin-top: 2.5rem;
}
.myorder-btn {
    vertical-align: top;
    box-sizing: border-box;
    border:none;
    border-radius:.3rem;
    width: auto;
    padding:0 .25rem;
    height:.6rem;
    font-size: .26rem;
    line-height: .6rem;
    color:#fff;
    background-color: rgb(188,122,255);
}
.myorder-btn:active {
    background-color: rgba(188,122,255, .8);
}
.blank-btn{
  margin-top: .5rem;
  min-width: 3.5rem;
  height: 0.8rem;
  line-height: 0.8rem;
  border-radius: .35rem;
  font-size: 0.30rem;
}
</style>
