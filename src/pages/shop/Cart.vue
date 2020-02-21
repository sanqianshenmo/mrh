<template>
  <div>
    <CartHeader @switchState="switchState" :isError="isError" :isDeleteState="isDeleteState" :isCartBlank="isCartBlank"></CartHeader>
    <ul class='order-list' v-if="!isError">
        <li v-for="good in goodList" :key="good.cartId">
            <CartGoods :good="good">
              <CheckboxCtrl slot="select" v-if="good.goodState===1||isDeleteState" class="checkbox-pos" @changeSelected="changeSelected" :good="good"></CheckboxCtrl>
              <NumCtrl slot="num" v-if="good.goodState===1" :good="good" class="num-pos"></NumCtrl>
            </CartGoods>
        </li>
        <Blank v-if="isCartBlank" :type="'cart'" class="blank-top">
          <button @click="gotoShop" class="myorder-btn blank-btn">去逛逛</button>
        </Blank>
    </ul>
    <Error class="error-wrapper" v-if="isError"></Error>
    <Loading :isLoading="!isReady"></Loading>
    <CartFooter
      v-if="!isError && !isCartBlank"
      @submitCart="submitCart"
      @deleteGood="deleteGood"
      @allSelected="handleAllSelected"
      :isDeleteState="isDeleteState"
      :isAllSelected="isAllSelected"
      :total="total"></CartFooter>
  </div>
</template>

<script>
import {CART} from '@/models/index.js'
import CartHeader from '@/components/shop/CartHeader/CartHeader'
import CartGoods from '@/components/shop/CartGoods/CartGoods'
import CartFooter from '@/components/shop/CartFooter/CartFooter'
import NumCtrl from '@/components/shop/NumCtrl/NumCtrl'
import CheckboxCtrl from '@/components/shop/CheckboxCtrl/CheckboxCtrl'
import Blank from '@/components/common/Blank/Blank'
// import CartBlank from '@/components/shop/CartBlank/CartBlank'
import Error from '@/components/shop/Error/Error'
import Loading from '@/components/common/Loading/Loading'
import { MessageBox } from 'mint-ui'
import { deepCopy } from '@/common/js/utils.js'

export default {
  name: 'Cart',
  components: {
    CartHeader,
    CartGoods,
    CartFooter,
    NumCtrl,
    CheckboxCtrl,
    Blank,
    Error,
    Loading
  },
  data () {
    return {
      isDeleteState: false,
      isError: false,
      isReady: false,
      goodList: [],
      originGoodList: null
    }
  },
  methods: {
    init () {
      // 添加isSelected属性
      var self = this
      CART.getList().then(res => {
        // console.log('res', res)
        if (res.data.retCode === 0) {
          self.isReady = true
          self.goodList = res.data.data.data
          /* 用于下订时，更新购物车数量 */
          self.originGoodList = deepCopy(self.goodList)
          // 添加selected属性用于选择 操作
          self.goodList.forEach((item) => {
            if (item.selected === undefined) {
              self.$set(item, 'isSelected', false)
              return
            }
            // 状态切换时，返回初始状态
            item.isSelected = false
          })
          return
        }
        self.isReady = true
        self.isError = true
      }).catch(error => {
        console.log('error', error.toString())
        self.isReady = true
        self.isError = true
      })
      // 购物车选购 或者 删除  处理函数动态生成
      // axios.get('/static/mock/cartList.json')
      //   .then(res => {
      //     console.log('res', res)
      //     if (res.data.retCode === 0) {
      //       self.goodList = res.data.data.data
      //       /* 用于下订时，更新购物车数量 */
      //       self.originGoodList = deepCopy(self.goodList)
      //       // 添加selected属性用于选择 操作
      //       self.goodList.forEach((item) => {
      //         if (item.selected === undefined) {
      //           self.$set(item, 'isSelected', false)
      //           return
      //         }
      //         // 状态切换时，返回初始状态
      //         item.isSelected = false
      //       })
      //       return
      //     }
      //     self.isError = true
      //   }).catch(error => {
      //     console.log('error', error.toString())
      //     self.isError = true
      //   })
    },
    switchState (curState) {
      this.isDeleteState = curState
      // 防止之前选择的影响
      // 切换数据会重新 请求数据需要优化 to do
      this.init()
    },
    changeSelected (params) {
      this.goodList.forEach((item) => {
        if (item.cartId === params.cartId) {
          item.isSelected = params.isSelected
        }
      })
    },
    _isGoodSelected (goodList) {
      var cart = goodList.filter((item) => {
        return item.isSelected === true
      })
      if (cart.length === 0) {
        MessageBox({
          title: '注意',
          message: '请先选择商品',
          showCancelButton: false
        })
        return false
      }
      return true
    },
    handleAllSelected (isAllSelected) {
      this.goodList.forEach((item) => {
        item.isSelected = isAllSelected
      })
    },
    submitCart () {
      if (!this._isGoodSelected(this.goodList)) {
        return
      }
      // 过滤cart数据
      // ajax处理 处理 商品数量变化；
      let self = this
      let cart = self.goodList.filter((item) => {
        return item.isSelected === true
      })
      let numChangedGoods = []
      cart.forEach(item => {
        self.originGoodList.forEach(oriItem => {
          if ((item.cartId === oriItem.cartId) && (item.cartCount !== oriItem.cartCount)) {
            numChangedGoods.push({
              cartId: item.cartId,
              cartCount: item.cartCount
            })
          }
        })
      })
      numChangedGoods.forEach(item => {
        CART.updateNum(item.cartId, item.cartCount)
      })
      // 上面如何判断是不是更新成功了？
      if (localStorage) {
        localStorage.setItem('goodList', JSON.stringify(cart))
      }
      self.$router.push({name: 'cartPay', params: {goodList: cart}})
    },
    deleteGood () {
      if (!this._isGoodSelected(this.goodList)) {
        return
      }
      let cartIds = []
      // 无论是否删除成功，都直接显示上进行了删除 to do -- 后台没有删除成功
      this.goodList = this.goodList.filter((item) => {
        if (item.isSelected === true) {
          cartIds.push(item.cartId)
        }
        return item.isSelected !== true
      })
      // ajax处理 删除
      console.log('cartIds', cartIds)
      CART.del(cartIds)
    },
    gotoShop () {
      this.$router.push({name: 'shop'})
    }
  },
  computed: {
    total () {
      let theSelectedGood = this.goodList.filter((item) => {
        return item.isSelected === true
      })
      let total = theSelectedGood.reduce((prev, cur) => {
        // 防止18.9*3 出现56.699999999999996情况
        return prev + cur.cartCount * (cur.price1 * 10000) / 10000
      }, 0)
      return total
    },
    isAllSelected () {
      if (this.goodList.length === 0) {
        return false
      }
      let isAllSelected = this.goodList.every(item => {
        return item.isSelected === true
      })
      return isAllSelected
    },
    isCartBlank () {
      // 内容为空时的默认显示
      if (this.goodList.length === 0) {
        return true
      } else {
        return false
      }
    }
  },
  created () {
    this.init()
  }
}
</script>

<style scoped>
.order-list {
  /* margin-top: 1.08rem; */
  position: absolute;
  left:0;
  right:0;
  top: 1.08rem;
  bottom: 1.08rem;
  overflow: auto;
  -webkit-overflow-scrolling: touch; /* ios滑动流畅问题处理 */
}
.order-list li {
    background-color: #fff;
    background-size: 100% auto;
    padding: .3rem .35rem;
    color: #404040;
    position: relative;
    border-bottom: 0.02rem solid #ebebec;
}
/* 数量控制位置 */
/* 外部控制样式的方式： 直接挂样式；或者修改原样式 */
.checkbox-pos {
  right: .18rem;
  top: .1rem;
}
.num-pos{
  position: absolute;
  right: 0;
  bottom: .1rem;
}
/* 空白 或 错误位置 */
.blank-top,.error-wrapper {
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
