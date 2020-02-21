<template>
  <div class="btn-mar-bottom order-bg">
    <ul class='order-list'>
        <li v-for="good in goodList" :key="good.id">
            <CartGoods :good="good">
              <NumCtrl v-if="isGoodsPay" slot="num" :good="good" class="goodsPay-num-pos"></NumCtrl>
              <div v-else slot="num" :good="good" class="cartPay-num-pos">x{{good.cartCount}}</div>
            </CartGoods>
        </li>
    </ul>
    <ul class="white-bglr font-list mar-top">
        <!-- <li>运费<span class="float-right color">￥<span id="yunfei">0.13</span></span></li> -->
        <li>请选择收货地址<span class="float-right color" @click="openAddress" id="add-btn">+添加新地址</span></li>
        <AddressList
            v-for="address in addressList"
            @selectedAddress="selectAddress"
            :key="address.id"
            :address="address"
            class="mar-top"></AddressList>
    </ul>
    <!-- 支付项选择 -->
    <PayChoice @paychoice="handlePayway" :payway="curPayway"></PayChoice>
    <!-- 该底部与购物车底部很类似考虑整合 to do -->
    <footer class="pay-bottom padding-left">
        在线支付：<img src="./glod.png" alt="积分图标" class="cartfooter-glod-icon"><span id="allprice">{{ total }}</span>
        <a href="javascript:;" @click="_isPermited" class="float-right btn bdrx-0">提交订单</a>
    </footer>
    <!-- 新增地址 -->
    <AddressAdd v-if="isAddAddress" @newAddress="addAddressToList" @closeAddAddress="closeAddAddress"></AddressAdd>
    <PayNotice v-if="payNotice.isOpen" @isOpen="closePayNotice" :noticeType="payNotice.noticeType"></PayNotice>
    <Loading :isLoading="isLoading"></Loading>
  </div>
</template>

<script>
import {ADDRESS, ORDER, PARTNER} from '@/models/index.js'
import CartGoods from '@/components/shop/CartGoods/CartGoods'
import NumCtrl from '@/components/shop/NumCtrl/NumCtrl'
import AddressList from '@/components/shop/AddressList/AddressList'
import AddressAdd from '@/components/shop/AddressAdd/AddressAdd'
import PayChoice from '@/components/shop/PayChoice/PayChoice'
import PayNotice from '@/components/shop/PayNotice/PayNotice'
import Loading from '@/components/common/Loading/Loading'
import { MessageBox } from 'mint-ui'
// import axios from 'axios'

export default {
  components: {
    CartGoods,
    NumCtrl,
    AddressList,
    AddressAdd,
    PayChoice,
    PayNotice,
    Loading
  },
  name: 'Order',
  data () {
    return {
      isLoading: false,
      isSubmitting: false,
      payNotice: {
        isOpen: false,
        noticeType: 'success'
      },
      isAddAddress: false,
      isGoodsPay: null,
      num: 1,
      goodList: [],
      addressList: [],
      curPayway: 'gold', // gold-金积分支付；微信支付-wxpay
      userRole: null // 用户权限
    }
  },
  computed: {
    total () {
      // 这里的错误直接导致程序无法运行
      let total = this.goodList.reduce((prev, cur) => {
      // 防止18.9*3 出现56.699999999999996情况
        return prev + cur.cartCount * (cur.price1 * 10000) / 10000
      }, 0)
      return total
    }
  },
  methods: {
    init (self) {
      // 获得商品详情页的数据
      // cartPay 与 goodsPay区别
      // 1.是否使用NumCtrl组件 2.提交订单时提交数据不同
      if (self.$route.name === 'cartPay') {
        self.isGoodsPay = false
        let goodList = null
        if (localStorage) {
          goodList = JSON.parse(localStorage.getItem('goodList'))
          // console.log('goodList', goodList)
        }
        // self.goodList = this.$route.params.goodList
        if (goodList === undefined || goodList === null) {
          this.$router.go(-1)
          // MessageBox.alert('商品获取失败，确认返回购物车', '错误').then(action => {
          //   self.$router.go(-1)
          // })
          return
        }
        self.goodList = goodList
      }
      if (this.$route.name === 'goodsPay') {
        self.isGoodsPay = true
        let good
        if (localStorage) {
          good = JSON.parse(localStorage.getItem('good'))
        }
        if (good === undefined || good === null) {
          this.$router.go(-1)
          return
        }
        good.cartCount = 1
        self.goodList.push(good)
      }
      // 设置地址的选中
      // console.log('设置true-1')
      self.isLoading = true
      ADDRESS.getList().then(res => {
        // console.log('设置false-2')
        self.isLoading = false
        if (res.data.retCode === 0) {
          // 让默认地址选中
          self.addressList = res.data.data
          self.addressList.forEach(item => {
            if (item.isSelected === undefined) {
              self.$set(item, 'isSelected', false)
            }
            if (item.type === '1') {
              item.isSelected = true
            }
            // 转换字段
            // self.$set(item, 'userName', item['user_name'])
          })
          return
        }
        MessageBox({
          title: '错误',
          message: res.data.retMsg.toString(),
          showCancelButton: false
        })
      }).catch(error => {
        console.log('error', error)
        self.isLoading = false
      })
    },
    openAddress () {
      this.isAddAddress = true
    },
    closeAddAddress () {
      this.isAddAddress = false
    },
    selectAddress (id) {
      this.addressList.forEach(item => {
        if (item.id === id) {
          item.isSelected = true
        } else {
          item.isSelected = false
        }
      })
    },
    changeGoodsNum (changeWay) {
    // 改变商品数量
      if (changeWay === -1) {
        if (this.num > 1) {
          this.num--
        }
        return
      }
      this.num++
    },
    addAddressToList (newAddress) {
      console.log('newAddress', newAddress)
      // return
      // 添加新地址到列表
      // ajax请求
      ADDRESS.add(newAddress).then(res => {
        if (res.data.retCode === 0) {
          // 添加地址为选中状态
          // 添加返回的id值
          if (newAddress.isSelected === undefined) {
            this.$set(newAddress, 'isSelected', true)
            this.$set(newAddress, 'id', res.data.data.id)
          }
          // 更换默认地址设置
          // 去除原来的默认（取决于是否新地址设置了默认）；去除原来的最初的选中
          this.addressList.forEach((item, idx) => {
            item.isSelected = false
            if (item.type === '1' && newAddress.type === '1') {
              item.type = '0'
            }
          })
          this.addressList.unshift(newAddress)
          // 新地址设置为 选中地址
        } else {
          MessageBox({
            title: '错误',
            message: res.data.retCode,
            showCancelButton: false
          })
        }
      })
    },
    closePayNotice (isSuccess) {
      // console.log(isSuccess)
      this.payNotice.isOpen = false
      if (isSuccess) {
        this.$router.push({name: 'user.order'})
      }
    },
    handlePayway (paychoice) {
      this.curPayway = paychoice
    },
    _payNotice (noticeType) {
      this.payNotice.isOpen = true
      this.payNotice.noticeType = noticeType
    },
    _goodsPay (self, isWxPay) {
      let goodsId = (this.goodList[0].id).toString()
      let addressId = (this.addressList.filter(item => {
        return item.isSelected === true
      })[0]['id']).toString()
      let count = this.goodList[0].cartCount
      // console.log('addressId', addressId)
      ORDER.payFromGood(goodsId, addressId, count).then(res => {
        if (res.data.retCode === 0) {
          let orderId = res.data.data.order_num.toString()
          // 微信支付
          if (isWxPay) {
            self.isSubmitting = true
            self._wxpay(self, orderId)
            return
          }
          self.isSubmitting = true
          self._scorePay(self, orderId)
        } else {
          MessageBox({
            title: '下单失败',
            message: '下单失败，请稍后重试',
            showCancelButton: false
          })
          self.isSubmitting = false
          console.log('res.data.retMsg', res.data.retMsg)
        }
      }).catch(error => {
        self.isSubmitting = false
        console.log('error', error)
      })
    },
    _cartPay (self, isWxPay) {
      let cartIds = []
      self.goodList.forEach((item) => {
        cartIds.push(item.cartId)
      })
      let addressId = (self.addressList.filter(item => {
        return item.isSelected === true
      })[0]['id']).toString()
      // 微信支付 或 常规支付
      // 微信支付需要计算 支付价格?
      // 这里支付方式，有没有必要配置化？
      ORDER.payFromCart(cartIds, addressId).then(res => {
        self.isSubmitting = false
        if (res.data.retCode === 0) {
          let orderId = res.data.data.order_num.toString()
          // 微信支付
          if (isWxPay) {
            self.isSubmitting = true
            self._wxpay(self, orderId)
            return
          }
          self._scorePay(self, orderId)
        } else {
          MessageBox({
            title: '下单失败',
            message: 'res.retMsg',
            showCancelButton: false
          })
          console.log('res.data.retMsg', res.data.retMsg)
        }
      }).catch(error => {
        console.log('error', error)
        self.isSubmitting = false
      })
    },
    _scorePay (self, orderId) {
      ORDER.scorePay(orderId).then(res => {
        self.isSubmitting = false
        if (res.data.retCode === 0) {
          if (localStorage) {
            localStorage.removeItem('goodList')
          }
          // this._payNotice('success')
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
        self.isSubmitting = false
      })
    },
    _wxpay (self, orderId) {
      console.log('微信支付')
      // to do
      ORDER.wxPay(orderId).then(res => {
        let data = res.data.data
        self.weixinPay(self, data)
      }).catch(error => {
        console.log('error', error)
        self.isSubmitting = false
      })
    },
    /**
    * @method :微信支付方法
    * @param data
    */
    weixinPay: function (self, data) {
      var vm = this
      if (typeof WeixinJSBridge === 'undefined') { // 微信浏览器内置对象。参考微信官方文档
        console.log(1111111111) // 不是在微信中时，该如何兼容处理，正面的内容是什么意思
        document.title = 'undefined'
        if (document.addEventListener) {
          document.addEventListener('WeixinJSBridgeReady', vm.onBridgeReady(self, data), false)
        } else if (document.attachEvent) {
          document.attachEvent('WeixinJSBridgeReady', vm.onBridgeReady(self, data))
          document.attachEvent('onWeixinJSBridgeReady', vm.onBridgeReady(self, data))
        }
      } else {
        document.title = 'not-undefined'
        console.log(22222222)
        vm.onBridgeReady(self, data)
      }
    },
    /**
     * @method 支付费用方法
     * @param data:后台返回的支付对象,(详情微信公众号支付API中H5提交支付);
     */
    onBridgeReady: function (self, data) {
      // var vm = this
      // WeixinJSBridge是微信浏览器内置的对象，警告请忽略
      document.title = 'onBridgeReady'
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
          console.log('res--支付后回调', res)
          document.title = 'res-onBridgeReady' + res.err_msg
          // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
          self.isSubmitting = false
          if (res.err_msg === 'get_brand_wcpay_request:ok') {
            document.title = 'success-onBridgeReady'
            console.log('payed.....支付成功')
            self._paySuccessMsg()
            // vm.$router.push("/user/order")
          } else {
            document.title = 'fail-onBridgeReady'
            // vm.$router.push("/wxpay/failed/"+vm.$route.params.id)
            // document.title('x' + res.err_msg)
            MessageBox({
              title: '错误',
              message: '支付失败',
              showCancelButton: false
            })
          }
        }
      )
    },
    _paySuccessMsg () {
      MessageBox({
        title: '恭喜，购买成功！',
        message: '点击确定进入个人中心-我的订单查看详情信息',
        showCancelButton: false,
        closeOnClickModal: false // 必须点击确定按钮才能关闭modal
      }).then(action => {
        this.$router.push({name: 'user.order'})
      })
    },
    _payNotEnoughMsg () {
      MessageBox({
        title: '购买失败，金积分不足',
        message: '缴纳会员费后才有金积分哦，"我的-订单"可查看已生成订单',
        showCancelButton: false,
        closeOnClickModal: false // 必须点击确定按钮才能关闭modal
      })
    },
    _isPermited () {
      // 当前只有提交支付时调用
      // 判断是否有权限购买
      this.isLoading = true
      if (this.userRole === null) {
        // console.log('this.userRole', this.userRole)
        PARTNER.getMsg().then(res => {
          // console.log('res', res)
          this.isLoading = false
          if (res.data.retCode === 0) {
            // console.log('res', res)
            let role = this.userRole = res.data.data.rule
            if (role === 15) {
              this.isLoading = false
              MessageBox.alert('游客无法购买，请在"我的"完成身份认证', '无法进行购买', {
                closeOnClickModal: true
              }).then(action => {
                this.$router.push({name: 'user.setup'})
              })
              return
            }
            this.submitPay()
          } else {
            this.isLoading = false
            MessageBox.alert('权限获取失败，请稍后重试', '权限获取失败', {
              closeOnClickModal: true
            })
          }
        })
      } else {
        let role = this.userRole
        if (role === 15) {
          MessageBox.alert('游客无法写日记，请在"我的"完成身份认证', '无法进行购买', {
            closeOnClickModal: true
          }).then(action => {
            this.$router.push({name: 'user.setup'})
          })
          return
        }
        this.submitPay()
      }
    },
    submitPay () {
      // 1.是否选择了地址
      // 2.支付根据后台返回码  提示用户支付结果
      // 可能结果 1.支付成功 2.支付失败 a.余额不足 b.其它错误
      // 3.是否需要查询 库存是否存在 （暂不考虑）
      // 提交支付
      // 支付结果提示
      const self = this
      if (this.addressList.length === 0) {
        MessageBox({
          title: '注意',
          message: '请先添加地址',
          showCancelButton: false
        })
        return
      }
      // 没有默认地址时，存在地址没有选中
      let isAddressSelected = this.addressList.some(item => {
        return item.isSelected === true
      })
      if (!isAddressSelected) {
        MessageBox({
          title: '注意',
          message: '请选择地址',
          showCancelButton: false
        })
        return
      }
      // 需要商品的信息
      if (this.goodList.length === 0) {
        MessageBox({
          title: '错误',
          message: '商品获取失败',
          showCancelButton: false
        })
        return
      }
      // 防止重复提交
      if (this.isSubmitting) {
        return
      }
      this.isSubmitting = true
      let isWxPay = this.curPayway === 'wxpay'
      // console.log('isWxPay', isWxPay)
      // return
      if (this.isGoodsPay) {
        this._goodsPay(self, isWxPay)
      } else {
        this._cartPay(self, isWxPay)
      }
    }
  },
  created () {
    const self = this
    self.init(self)
  }
}
</script>

<style scoped>
.order-bg{
  background-color: #f8f8f8;
  min-height: 100%;
}
/* common */
.omit-two{
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
/* 商品 */
.order-list {
  /* margin-top:.88rem; */
}
.order-list li {
    position: relative;
    background-color: #fff;
    background-size: 100% auto;
    padding: .3rem .35rem;
    color: #404040;
    border-bottom: 0.02rem solid #ebebec;
}
/* 数量控制位置 */
/* 外部控制样式的方式： 直接挂样式；或者修改原样式 */
.cartPay-num-pos {
  position: absolute;
  right: 1.6rem;
  bottom: .2rem;
  color: rgb(190,189,189);
}
.goodsPay-num-pos{
  position: absolute;
  right: 0;
  bottom: .1rem;
}
/* 空白 或 错误位置 */
.blank-top,.error-wrapper {
  margin-top: 3.5rem;
}
/* 运费、收货地址 wrapper */
.white-bglr {
    padding: 0 .3rem;
    background: #fff;
}
.mar-top {
    margin-top: .2rem;
}
.address-wrapper > label:last-child{
    border:none;
}
.addres_detail_desc{
    margin-top: 0.1rem;
    margin-bottom: .05rem;
    font-size: 0.24rem;
}
/* 一列 */
.font-list li {
    border-bottom: 1px solid #ebebec;
    min-height: .48rem;
    font-size: .3rem;
    padding: .2rem 0;
    line-height: .48rem;
    color: #656565;
}
/* 菜单提交 */
.padding-left {
    padding-left: .3rem;
}
.pay-bottom {
    box-sizing: border-box;
    position: fixed;
    left: 0;
    font-size: .26rem;
    text-align: center;
    line-height: .95rem;
    color: rgb(0,0,0);
    bottom: 0;
    width: 100%;
    background: #fff;
    border-top: 1px solid #ececed;
}
.btn {
    height: .95rem;
    width: 100%;
    background:rgb(214,83,228);
    color: #fff;
    text-align: center;
    line-height: .95rem;
    font-size: .36rem;
}
/* 线上时，底部样式被影响，原因不知 */
.btn-primary-bg{
  background: rgb(214,83,228);
}
.btn:active {
    background:rgba(214,83,228,.9);
}
.pay-bottom .btn {
    width: 32%;
}
/* 缺少默认按钮的选择 */
.addrcheck .close-btn {
    position: absolute;
    right: 0; top: 50%;
    margin-top: -17px;
    display: block;
    width: 55px;
    height: 35px;
    /* background: url('../img/close-btn.png') no-repeat;*/
    background-size: 55px 70px;
}
.addrcheck .checked {
    background-position: 0 -36px;
}
.cartfooter-glod-icon{
    position: relative;
    display: inline-block;
    vertical-align: middle;
    top: -.06rem;
    width: .3rem;
    height: .3rem;
  }
.bdrx-0{
    border-radius: 0;
}
</style>
