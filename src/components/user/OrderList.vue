<template>
  <div class="order-wrapper" v-show="!isDeleted">
    <div class="order-desc-wrapper">
      <div class="order-text-wrapper order-ordernum mr-32 mb-20">
        <span>订单编号:</span>
        <span class="order-ordernum">{{order.order_num}}</span>
      </div>
      <div class="order-text-wrapper">
        <span></span>
        <span class="order-ordertime">{{order.create_time.replace('T', ' ')}}</span>
      </div>
      <!-- 当前订单状态 -->
      <span v-show="isOrderStateShow" class="fr order-text-pay">{{orderState.state}}</span>
    </div>
    <div class="order-border-1px-gray"></div>
    <!-- 具体订单商品 -->
    <div class="order-good">
      <slot></slot>
    </div>
    <div class="order-desc-wrapper mt-41">
      <div class="order-text-wrapper">
        <span>收货人：</span>
        <span class="order-text">{{order.user_name}}</span>
      </div>
      <div class="order-text-wrapper fr">
        <span class="order-text">{{order.phone}}</span>
      </div>
    </div>
    <div class="order-desc-wrapper mt-12">
      <div class="order-text-wrapper order-address-wrapper">
        <span class="order-address-title">收货地址：</span>
        <span class="order-text">{{order.province}} {{order.city}} {{order.district}} {{order.address}}</span>
      </div>
    </div>
    <!-- {已发货、已收货时}-->
    <div v-if="orderState.isTotalTop" class="order-desc-wrapper mt-12">
      <div class="order-text-wrapper mr-32">
        <span>总计：</span>
        <span class="order-price">{{payType}} {{order.total_price1}}</span>
      </div>
    </div>
    <!-- 已发货 或 已购买 -->
    <div v-if="orderState.isTotalTop" class="order-footer order-onway-completed-wrapper">
      <div class="order-desc-wrapper order-onway-completed">
        <!-- 邮件相关相同部分 -->
        <div class="order-text-wrapper" v-show="order.track_com&&order.track_number">
          <span>{{order.track_com}}：</span>
          <span class="order-text">{{order.track_number}}</span>
        </div>
        <!-- 暂时隐藏自动收货的显示 -->
        <div class="order-text-wrapper order-onway-completed">
          <span>{{orderState.tradeTitle}}</span>
          <span class="order-text">{{orderState.tradeDesc}}</span>
        </div>
      </div>
      <div class="order-btn-wrapper">
        <!-- 按钮可以做成组件 -->
        <button class="btn" v-if="orderState.state === '已发货'" @click="comfirmOrder">确认收货</button>
        <button class="btn" v-if="orderState.state === '已收货'" @click="payOrderAgain">再次购买</button>
        <button class="btn btn-plain ml20" v-if="orderState.state === '已收货'" @click="delOrder" >删除订单</button>
      </div>
    </div>
    <!-- 其它状态 -->
    <div v-if="!orderState.isTotalTop" class="order-footer mt-42">
      <div class="order-desc-wrapper">
        <div class="order-text-wrapper">
          <span>总计：</span>
          <span class="order-price">{{payType}} {{order.total_price1}}</span>
        </div>
      </div>
      <div class="order-btn-wrapper">
        <!-- 按钮可以做成组件 -->
        <button class="btn" v-if="orderState.state === '待付款'" @click="pay">立即支付</button>
        <button class="btn btn-plain ml20" v-if="orderState.state === '待发货'" @click="cancelOrder">取消订单</button>
        <button class="btn ml20" v-if="orderState.state === '已退款'">已退款</button>
        <button class="btn ml20" v-if="orderState.state === '已取消'" @click="payOrderAgain">重新购买</button>
        <button class="btn btn-plain ml20" v-if="orderState.state === '待付款' || orderState.state === '已取消' || orderState.state === '已收货' || orderState.state === '已退款'" @click="delOrder">删除订单</button>
      </div>
    </div>
    <!-- 未付款 或 待发货 已取消} -->
  </div>
</template>

<script>
import {ORDER} from '@/models/index.js'
import { MessageBox, Toast } from 'mint-ui'

export default {
  name: 'orderList',
  props: {
    order: {
      type: Object
    },
    isOrderStateShow: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      isDeleted: false, // 删除后隐藏显示
      isSubmitting: false
    }
  },
  computed: {
    orderState () {
      // 显示顶部订单状态
      // UNKNOWN(-1,"未知"),
      // TOPAY(1, "待付款"),
      // PAYED(2,"已付款"),
      // CONFIRMED(3,"已确认"),
      // REFOUNDING(4,"退款中"),
      // REFOUNDED(5,"已退款"),
      // TIME_OUT_CANCELED(7,"超时取消"),
      // SENT(8,"已发货"),
      // RECEIVED(9,"已收货"),
      // USER_CANCELED(10,"个人取消")
      // 页面显示情况 to be improved
      // 一个订单状态，对应多种操作，如未支付立即支付、取消订单；因此action单独成属性不太合适
      // 目前必须取消订单后才能删除订单 -- 取消订单会让用户的金钱退回
      // 未支付的订单直接删除；已支付的订单，必须先经过取消订单（取消订单是退钱的过程），才能进行删除
      // 隔段时间再支付的商品，可能存在库存不足/商品已下架
      const STATE_TABLE = {
        1: {
          state: '待付款',
          isTotalTop: false // 总积分显示位置：1.已发货 2.已收货（原因：发货信息展示在footer位置）
        },
        2: {
          state: '待发货',
          isTotalTop: false
        },
        5: {
          state: '已退款',
          isTotalTop: false
        },
        8: {
          state: '已发货',
          tradeTitle: '确认收货：',
          tradeDesc: '剩余x天自动确认', // 需要计算时间
          isTotalTop: true
        },
        9: {
          state: '已收货',
          tradeTitle: '交易状态：',
          tradeDesc: '已收货交易完成',
          isTotalTop: true
        },
        10: {
          state: '已取消',
          isTotalTop: false
        }
      }
      // 需要改多个地方 -- 实现效果，改一处都同步变化了
      let state = this.order.order_status
      // console.log('state', state)
      if (STATE_TABLE[state]) {
        if (state === 8) {
          STATE_TABLE[state].tradeDesc = this.order.confirm_deadline
        }
        return STATE_TABLE[state]
      }
      return {
        state: '未知状态',
        isTotalTop: false
      }
    },
    payType () {
      const idx = this.order.pay_type
      const mapTable = {
        '0': '微信支付￥',
        '1': '金积分',
        '2': '银积分',
        '3': '已付款'
      }
      if (mapTable[idx]) {
        return mapTable[idx]
      } else {
        return '未知支付方式'
      }
    }
  },
  methods: {
    pay () {
      // 判断是微信支付，还是积分支付
      const self = this
      self.isSubmitting = true
      let orderId = this.order.order_num
      let payType = this.order.pay_type
      console.log('payType', payType)
      // '0': '微信支付￥',
      // '1': '金积分',
      // '2': '银积分',
      // '3': '已付款'
      if (payType === 0) {
        // 完全取自订单时的支付
        this.isSubmitting = false
        self._wxpay(self, orderId)
        return
      }
      if (payType === 1) {
        self._scorePay(self, orderId)
        return
      }
      MessageBox({
        title: '错误',
        message: '该支付方式目前不支付',
        showCancelButton: false
      })
    },
    _scorePay (self, orderId) {
      ORDER.scorePay(orderId).then(res => {
        if (res.data.retCode === 0) {
          // this._payNotice('success')
          self.isSubmitting = false
          self._changeOrderState(self, 'payed')
          self._paySuccessMsg()
          return
        }
        if (res.data.retMsg === '余额不足') {
          self.isSubmitting = false
          self._payNotEnoughMsg()
          // this._payNotice('fail')
          return
        }
        self.isSubmitting = false
        MessageBox({
          title: '错误',
          message: res.data.retMsg,
          showCancelButton: false
        })
      }).catch(error => {
        console.log('error', error)
        this.isSubmitting = false
      })
    },
    _paySuccessMsg () {
      Toast({
        message: `恭喜，购买成功！`,
        duration: 1000
      })
    },
    _payNotEnoughMsg () {
      Toast({
        message: `购买失败，金积分不足`,
        duration: 1500
      })
    },
    _wxpay (self, orderId) {
      console.log('微信支付')
      // to do
      ORDER.wxPay(orderId).then(res => {
        let data = res.data.data
        self.weixinPay(self, data)
      })
    },
    /**
    * @method :微信支付方法
    * @param data
    */
    weixinPay: function (self, data) {
      var vm = this
      if (typeof WeixinJSBridge === 'undefined') { // 微信浏览器内置对象。参考微信官方文档
        if (document.addEventListener) {
          document.addEventListener('WeixinJSBridgeReady', vm.onBridgeReady(data), false)
        } else if (document.attachEvent) {
          document.attachEvent('WeixinJSBridgeReady', vm.onBridgeReady(data))
          document.attachEvent('onWeixinJSBridgeReady', vm.onBridgeReady(data))
        }
      } else {
        vm.onBridgeReady(data)
      }
    },
    /**
     * @method 支付费用方法
     * @param data:后台返回的支付对象,(详情微信公众号支付API中H5提交支付);
     */
    onBridgeReady: function (data) {
      var vm = this
      // WeixinJSBridge是微信浏览器内置的对象，警告请忽略
      WeixinJSBridge.invoke(
        'getBrandWCPayRequest', {
          appId: data.appId, // 公众号名称，由商户传入
          timeStamp: data.timeStamp, // 时间戳，自1970年以来的秒数
          nonceStr: data.nonceStr, // 随机串
          package: data.packageValue,
          signType: data.signType, // 微信签名方式：
          paySign: data.paySign // 微信签名
        },
        function (res) {
          // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
          if (res.err_msg === 'get_brand_wcpay_request:ok') {
            vm._changeOrderState(self, 'payed')
            console.log('payed.....支付成功')
            // vm.$router.push("/user/order")
          } else {
            // vm.$router.push("/wxpay/failed/"+vm.$route.params.id)
            alert('支付失败' + res.err_msg)
          }
        }
      )
    },
    cancelOrder () {
      let self = this
      MessageBox({
        title: '注意',
        message: '确定取消订单?',
        showCancelButton: true
      }).then(action => {
        if (action === 'confirm') {
          self._cancelOrder(self)
        }
      })
    },
    _cancelOrder (self) {
      ORDER.cancel(self.order.order_num).then(res => {
        if (res.data.retCode === 0) {
          // 提醒金币返还
          // to do 改变当前显示
          Toast({
            message: '取消订单成功，积分已返还',
            duration: 1500
          })
          self._changeOrderState(self, 'cancel')
          return
        } if (res.data.retCode === 40002) {
          console.log('token失效')
        } else {
          MessageBox.alert(res.data.retMsg, '错误', {
            closeOnClickModal: true
          })
        }
      }).catch(error => {
        console.log('error', error)
      })
    },
    delOrder () {
      let self = this
      MessageBox({
        title: '注意',
        message: '确定删除订单?',
        showCancelButton: true
      }).then(action => {
        if (action === 'confirm') {
          self._delOrder(self)
        }
      })
    },
    _delOrder (self) {
      ORDER.del(self.order.order_num).then(res => {
        if (res.data.retCode === 0) {
          // 提醒金币返还
          // to do 改变当前显示
          Toast({
            message: '删除订单成功',
            duration: 1000
          })
          self._changeOrderState(self, 'delete')
        } else if (res.data.retCode === 40002) {
          console.log('token失效')
        } else {
          MessageBox.alert(res.data.retMsg, '错误', {
            closeOnClickModal: true
          })
        }
      }).catch(error => {
        console.log('error', error)
      })
    },
    comfirmOrder () {
      let self = this
      MessageBox({
        title: '注意',
        message: '确定确认收货?',
        showCancelButton: true
      }).then(action => {
        if (action === 'confirm') {
          self._comfirmOrder(self)
        }
      })
    },
    _comfirmOrder (self) {
      ORDER.confirm(self.order.order_num).then(res => {
        if (res.data.retCode === 0) {
          // 确认收货
          // to do 修改当前显示
          Toast({
            message: '确认收货成功',
            duration: 1000
          })
          self._changeOrderState(self, 'comfirmed')
        } else if (res.data.retCode === 40002) {
          console.log('token失效')
        } else {
          MessageBox.alert(res.data.retMsg, '错误', {
            closeOnClickModal: true
          })
        }
      }).catch(error => {
        console.log('error', error)
      })
    },
    payOrderAgain () {
      // 用户再次购买 跳转到商城
      this.$router.push({name: 'shop'})
    },
    _changeOrderState (self, changedState) {
      // 执行相应操作后，修改订单状态
      // 已支付
      if (changedState === 'payed') {
        self.order.order_status = 2
      }
      // 取消订单
      if (changedState === 'cancel') {
        self.order.order_status = 10
      }
      // 确认收货
      if (changedState === 'comfirmed') {
        self.order.order_status = 9
      }
      // 删除订单
      if (changedState === 'delete') {
        self.isDeleted = true
      }
    }
  }
}
</script>

<style scoped>
.fr{
  float:right;
}
.mr-10{
  margin-right: .1rem;
}
.mr-32 {
  margin-right: .32rem;
}
.mt-12 {
  margin-top: .12rem;
}
.mt-41 {
  margin-top: .41rem;
}
.mt-42 {
  margin-top: .42rem;
}
.ml20{
  margin-left: .2rem;
}
.mb-20 {
  margin-bottom: .2rem;
}
.order-wrapper {
  padding: .4rem .22rem 0 .22rem;
  background-color: #fff;
}
.order-desc-wrapper{
}
.order-text-wrapper {
  display: inline-block;
  font-size: .24rem;
  color: rgb(104,104,104);
}
.order-text,.order-price {
  font-size: .24rem;
  color: rgb(50,50,50)
}
.order-address-wrapper {
  display: flex;
}
.order-address-title {
  flex-shrink: 0
}

.order-ordernum, .order-ordertime{
  font-size: .2rem;
}
.order-text-pay, .order-price {
  color:rgb(214,83,228);
}
.order-text-pay {
  font-size: .26rem;
}
.order-footer {
  border-top:0.02rem solid #ebebec;
  display: flex;
  height: 1.24rem;
  justify-content: space-between;
  align-items: center;
  font-size: 0;
}
.order-btn-wrapper{
  display: inline-block;
  font-size: 0;
}
.order-border-1px-gray {
  height: .02rem;
  width: 100%;
  background-color: #ebebec;
  overflow:hidden;
}
/* 已发货 与 再次购买 */
.order-footer.order-onway-completed-wrapper{
  border-top:none;
}
.order-desc-wrapper.order-onway-completed {
  flex:1;
  display: flex;
  flex-direction: column;
  height: .88rem;
  justify-content: space-evenly;
}

.btn {
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
.btn:active {
    background-color: rgba(188,122,255, .8);
}
.btn-plain {
    background: #fff;
    border: 1px solid rgb(188,122,255);
    color: rgb(112,111,112);
}
</style>
