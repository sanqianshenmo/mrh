<template>
  <div class="add-address">
    <header v-if="true">
      <div @click="goToUser">
        <img src="./back.png" alt="">
      </div>
      我的地址
      <span @click="openAddress">新增</span>
    </header>
    <ul class="font-list">
      <!-- <li>运费<span class="float-right color">￥<span id="yunfei">0.13</span></span></li> -->
      <!--<li>请选择收货地址<span class="float-right color" @click="openAddress" id="add-btn">+添加新地址</span></li>-->
      <AddressLists
        v-for="(address, index) in addressList"
        @selectedAddress="selectAddress"
        @delAddress="delAddress"
        @updata="updata"
        :keys="index"
        :key="address.id"
        :address="address"
        class="mar-top"></AddressLists>
    </ul>
    <!-- 添加新地址 -->
    <div class="btn address-add-btn bdrx-0"  id="submit" @click="openAddress">添加新地址</div>
    <!-- 新增地址 -->
    <AddressAdd v-if="isAddAddress" @newAddress="addAddressToList" @closeAddAddress="closeAddAddress"></AddressAdd>
    <UpDateAddressAdd v-if="isUpDateAddress" @newAddress="upDateAddressToList" @closeAddAddress="closeUpDateAddress" :updataAddress="updataAddress"></UpDateAddressAdd>
    <PayNotice v-if="payNotice.isOpen" @isOpen="closePayNotice" :noticeType="payNotice.noticeType"></PayNotice>
    <Loading :isLoading="!isReady"></Loading>
  </div>
</template>

<script>
import router from '@/router'
import {ADDRESS, ORDER} from '@/models/index.js'
import CartGoods from '@/components/shop/CartGoods/CartGoods'
import NumCtrl from '@/components/shop/NumCtrl/NumCtrl'
import AddressLists from '@/components/shop/AddressList/AddressLists'
import AddressAdd from '@/components/shop/AddressAdd/AddressAdd'
import UpDateAddressAdd from '@/components/shop/AddressAdd/UpDateAddressAdd'
import PayNotice from '@/components/shop/PayNotice/PayNotice'
import Loading from '@/components/common/Loading/Loading'
import { MessageBox } from 'mint-ui'

export default {
  components: {
    CartGoods,
    NumCtrl,
    AddressLists,
    AddressAdd,
    UpDateAddressAdd,
    PayNotice,
    Loading
  },
  name: 'Order',
  data () {
    return {
      isReady: false,
      isSubmitting: false,
      payNotice: {
        isOpen: false,
        noticeType: 'success'
      },
      isAddAddress: false,
      isUpDateAddress: false,
      isGoodsPay: null,
      num: 1,
      goodList: [],
      addressList: [],
      updataAddress: ''
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
    init () {
      let self = this
      // 获得商品详情页的数据
      // cartPay 与 goodsPay区别
      // 1.是否使用NumCtrl组件 2.提交订单时提交数据不同
      if (this.$route.name === 'cartPay') {
        self.isGoodsPay = false
        let goodList
        if (localStorage) {
          goodList = JSON.parse(localStorage.getItem('goodList'))
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
      ADDRESS.getList().then(res => {
        if (res.data.retCode === 0) {
          // 让默认地址选中
          self.isReady = true
          self.addressList = res.data.data
          self.addressList.forEach(item => {
            if (item.isSelected === undefined) {
              self.$set(item, 'isSelected', false)
            }
            if (item.type === '1') {
              item.isSelected = true
            }
          })
          return
        }
        self.isReady = true
        MessageBox({
          title: '错误',
          message: res.data.retMsg.toString(),
          showCancelButton: false
        })
      }).catch(error => {
        console.log('error', error)
        self.isReady = true
      })
    },
    openAddress () {
      this.isAddAddress = true
    },
    closeAddAddress () {
      this.isAddAddress = false
      location.reload() // 重新加载页面
    },
    closeUpDateAddress () {
      this.isUpDateAddress = false
    },
    selectAddress (id) {
      ADDRESS.updateDefault(id)
        .then(res => {
          console.log(res.data)
          if (res.data.retCode === 0) {
            location.reload() // 重新加载页面
          }
        })
    },
    delAddress (id) {
      ADDRESS.del(id)
        .then(res => {
          console.log(res.data)
          if (res.data.retCode === 0) {
            location.reload() // 重新加载页面
          }
        })
    },
    updata (id) {
      console.log(id)
      this.updataAddress = this.addressList[id]
      this.isUpDateAddress = true
    },
    upDateAddressToList (id, add) {
      console.log(id, add)
      ADDRESS.update(id, add)
        .then(res => {
          console.log(res)
          if (res.data.retCode === 0) {
            location.reload() // 重新加载页面
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
      // 添加新地址到列表
      // ajax请求
      console.log(newAddress)
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
    _payNotice (noticeType) {
      this.payNotice.isOpen = true
      this.payNotice.noticeType = noticeType
    },
    _goodsPay () {
      let goodsId = Number(this.goodList[0].id)
      let addressId = Number(this.addressList.filter(item => {
        return item.isSelected === true
      })[0]['id'])
      let count = this.goodList[0].cartCount
      // console.log('addressId', addressId)
      ORDER.payFromGood(goodsId, addressId, count).then(res => {
        if (res.data.retCode === 0) {
          // this._payNotice('success')
          // 以下可以进一步封装成私有函数！ to do
          if (localStorage) {
            localStorage.removeItem('good')
          }
          this.isSubmitting = false
          this._paySuccessMsg()
          return
        }
        if (res.data.retMsg === '余额不足') {
          // this._payNotice('fail')
          this.isSubmitting = false
          this._payNotEnoughMsg()
          return
        }
        this.isSubmitting = false
        MessageBox({
          title: '错误',
          message: res.data.retMsg,
          showCancelButton: false
        })
      }).catch(error => {
        this.isSubmitting = false
        console.log('error', error)
      })
    },
    _cartPay () {
      let cartIds = []
      this.goodList.forEach((item) => {
        cartIds.push(item.cartId)
      })
      let addressId = Number(this.addressList.filter(item => {
        return item.isSelected === true
      })[0]['id'])
      // .then 可以封起来吗
      ORDER.payFromCart(cartIds, addressId).then(res => {
        if (res.data.retCode === 0) {
          if (localStorage) {
            localStorage.removeItem('goodList')
          }
          // this._payNotice('success')
          this.isSubmitting = false
          this._paySuccessMsg()
          return
        }
        if (res.data.retMsg === '余额不足') {
          this.isSubmitting = false
          this._payNotEnoughMsg()
          // this._payNotice('fail')
          return
        }
        this.isSubmitting = false
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
        message: '缴纳会员费后才有金积分哦',
        showCancelButton: false,
        closeOnClickModal: false // 必须点击确定按钮才能关闭modal
      })
    },
    submitPay () {
      // 1.是否选择了地址
      // 2.支付根据后台返回码  提示用户支付结果
      // 可能结果 1.支付成功 2.支付失败 a.余额不足 b.其它错误
      // 3.是否需要查询 库存是否存在 （暂不考虑）
      // 提交支付
      // 支付结果提示
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
      if (this.isSubmitting) {
        return
      }
      this.isSubmitting = true
      if (this.isGoodsPay) {
        this._goodsPay()
      } else {
        this._cartPay()
      }
    },
    goToUser () {
      router.push('/user')
    }
  },
  created () {
    this.init()
  }
}
</script>

<style scoped>
  .add-address {
    margin-bottom: .95rem;
  }
  .add-address header {
    padding: .3rem 0;
    text-align: center;
    font-size: .34rem;
    color: rgb(34,34,34);
    background-color: #fff;
    /*margin-bottom: .2rem;*/
    border-bottom: .01rem solid rgb(215,215,215);
  }
  .add-address header img {
    width: .2rem;
    height: .35rem;
    position: absolute;
    padding-left: .4rem;
  }
  .add-address header span {
    position: absolute;
    right: .2rem;
    font-size: .28rem;
    line-height: .48rem;
    color: #d653e4;
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
    margin-top: 0;
    margin-bottom: .2rem;
    background: #fff;
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
    background:#bc7aff;
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
    background:#bc7aff;
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
    position: fixed;
    bottom: 0;
  }
</style>
