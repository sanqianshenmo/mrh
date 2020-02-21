<template>
 <div class="loan-main-wrapper-bg">
    <HeaderBack :isActionShow="false" :header="header" :color="'rgb(214,83,228)'"></HeaderBack>
    <DiaryTab class="mt20" :tabs="tabHeader.tabs" :curIdx="tabHeader.curIdx" @switchTab="switchTab"></DiaryTab>
    <!-- 申请借款 -->
    <div v-show="tabHeader.curIdx === 0">
      <div class="loan-main-wrapper">
        <h3>借多少</h3>
        <div class="loan-main-num">
          <span>￥</span>
          <input type="text" v-model="loan.num">
        </div>
        <div class="loan-main-desc-main">
          最多可借<span class="loan-main-max">{{MaxLoan}}</span>元，可提前还，利息按天计算
        </div>
      </div>
      <div class="loan-options-wrapper">
        <div class="loan-option-wrapper">
          <div class="loan-option-border loan-option-flex">
            <span class="loan-option-desc">借多久</span>
            <span class="loan-option-choice" @click="handlePickerShow">{{loan.time}}</span>
          </div>
        </div>
        <div class="loan-option-wrapper">
          <div class="loan-option-border loan-option-flex">
            <span class="loan-option-desc">怎么还</span>
            <span class="loan-option-choice">每月等额</span>
          </div>
        </div>
      </div>
      <button class="loan-btn" :class="{'loan-btn-disabled': isBtnDisabled}" @click="submitLoan">确 定</button>
      <p class="loan-intro">本货款由美美美合作及其合作机构提供</p>
      <!-- 时间选择弹框 -->
      <div class="picker-bg" v-show="isPickerShow"></div>
      <div class="loan-picker-wrapper" v-show="isPickerShow">
        <mt-picker :showToolbar="true" :slots="slots" @change="onValuesChange">
          <div class="loan-toolbar">
            <span @click=handlePickerShow(false)>取消</span>
            <span style="float:right;" @click="saveTime">完成</span>
          </div>
        </mt-picker>
      </div>
    </div>
    <!-- 借款列表 -->
    <div v-show="tabHeader.curIdx === 1">
      <ul class="loan-orders-wrapper">
        <li class="loan-order-wrapper" v-for="loanOrder in loanOrders" :key="loanOrder.id">
          <div class="loan-order-icon"><img src="./loan.png" alt=""></div>
          <div class="loan-order-desc-wrapper">
            <h3 class="loan-order-type">借款</h3>
            <p class="loan-order-period">借款时长：{{loanOrder.period}}个月</p>
            <p class="loan-order-time">申请日期: {{loanOrder.create_time}}</p>
            <span class="loan-order-total">{{loanOrder.borrow_total}}</span>
          </div>
        </li>
        <li class="no-loan-orders" v-show="isAllLoaded&&loanOrders.length===0">暂无申请记录</li>
      </ul>
    </div>
    <Loading :isLoading="isLoading"></Loading>
 </div>
</template>

<script>
import { LOAN } from '@/models/index.js'
import { Picker, Toast, MessageBox } from 'mint-ui'
import HeaderBack from '@/components/common/HeaderBack/HeaderBack'
import DiaryTab from '@/components/diary/DiaryTab/DiaryTab'
import Loading from '@/components/common/Loading/Loading'

const MaxNum = 40000
export default {
  name: 'Loan',
  components: {
    HeaderBack,
    DiaryTab,
    Picker,
    Toast,
    MessageBox,
    Loading
  },
  data () {
    return {
      MaxLoan: MaxNum,
      isLoading: false,
      header: {
        title: '我要借款'
      },
      tabHeader: {
        tabs: [
          '申请借款',
          '借款记录'
        ],
        curIdx: 0
      },
      loan: {
        num: '', // 借多少
        time: '6个月', // 借多久
        repayWay: '' // 怎么还
      },
      pikcerTime: null,
      showToolbar: true,
      slots: [
        {
          flex: 1,
          values: ['3个月', '6个月', '9个月', '12个月'],
          className: 'slot1',
          textAlign: 'center',
          defaultIndex: 1 // 需要根据 默认时间调整
        }
      ],
      isPickerShow: false,
      /* 以下是借款列表 */
      loanOrders: [],
      isAllLoaded: false
    }
  },
  methods: {
    init (self) {
      console.log('init')
    },
    switchTab (idx) {
      let self = this
      // 其它请求在进行时，阻止切换
      if (self.isLoading) {
        return
      }
      if (self.tabHeader.curIdx === idx) {
        return
      }
      self.tabHeader.curIdx = idx
      if (idx === 1) {
        self.isLoading = true
        self._loanList(self, 'loanOrders')
      }
    },
    submitLoan () {
      if (!this.isBtnDisabled) {
        this.isLoading = true
        let total = this.loan.num
        let period = Number(this.loan.time.slice(0, 1))
        LOAN.add(total, period).then(res => {
          this.isLoading = false
          if (res.data.retCode === 0) {
            Toast({
              message: `恭喜，购买成功！`,
              duration: 1000
            })
            // 清空原来的值，同时跳转到借款记录
            this.loan.num = ''
            this.tabHeader.curIdx = 1
          } else {
            Toast({
              message: `出错了，请稍后再试！`,
              duration: 2000
            })
          }
        })
      }
    },
    _loanList (self, receiverName) {
      LOAN.list().then(res => {
        self.isLoading = false
        if (res.data.retCode === 0) {
          // console.log('res', res)
          self[receiverName] = res.data.data.data
          self.isAllLoaded = true
        } else {
          Toast({
            message: `出错了，请稍后再试！`,
            duration: 2000
          })
        }
      })
    },
    saveTime () {
      this.loan.time = this.pikcerTime
      this.handlePickerShow(false)
    },
    handlePickerShow (bool) {
      if (bool) {
        this.isPickerShow = true
      } else {
        this.isPickerShow = false
      }
    },
    onValuesChange (picker, values) {
      console.log('picker', picker, 'values', values)
      // picker.setSlotValue(1, values[0]);
      this.pikcerTime = values[0]
    }
  },
  computed: {
    isBtnDisabled () {
      if (Number(this.loan.num) > 0 && Number(this.loan.num) <= MaxNum) {
        return false
      } else {
        return true
      }
    }
  },
  watch: {
    'loan.num' (n, o) {
      this.loan.num = n.replace(/^0{1,}|[^\d]/g, '')
      if (Number(this.loan.num) > MaxNum) {
        MessageBox({
          title: `最大借款金额${MaxNum}款`,
          message: `当前支持最高${MaxNum}元借款`,
          showCancelButton: false
        })
      }
    }
  },
  created () {
    const self = this
    self.init(self)
  }
}
</script>

<style>
.loan-main-wrapper-bg{
  box-sizing: border-box;
  padding-top: .88rem;
  min-height: 100%;
  background-color: #f8f8f8;
}
.loan-main-wrapper{
  padding: .5rem .2rem .1rem;
  font-size: .36rem;
  color: #333;
  background-color: #fff;
}
.loan-main-wrapper > h3 {
  padding-bottom: .2rem;
  font-size: .36rem;
}
/* 借多少钱 */
.loan-main-num{
  position: relative;
  font-size: .4rem;
  font-weight: bold;
  border-bottom: 1px solid #ebebeb;
}
.loan-main-num > span{
  position: absolute;
}
.loan-main-num > input{
  box-sizing: border-box;
  padding-left: .8rem;
  line-height: 1;
  font-size: .8rem;
  font-weight: bold;
  width: 100%;
}
/* 借钱说明 */
.loan-main-desc-main{
  height: .8rem;
  line-height: .8rem;
  font-size: .24rem;
  color: #999;
}
.loan-main-max{
  color: rgb(214,83,228);
}
/* 借钱选项 */
.loan-options-wrapper{
  margin-top: .2rem;
  font-size: .36rem;
  color: #333;
  background-color: #fff;
}
.loan-option-wrapper{
  padding: 0 .2rem;
  height: .8rem;
  line-height: .8rem;
}
.loan-option-border{
  border-bottom: 1px solid #ebebeb;
}
.loan-option-flex{
  display: flex;
  justify-content: space-between;
}
.loan-option-desc{

}
.loan-option-choice{
  font-size: .3rem;
  color: #999;
}
/* 确定 */
.loan-btn{
  display: block;
  width: 90%;
  margin:.5rem auto 0;
  border:none;
  border-radius: .1rem;
  line-height: .8rem;
  height: .8rem;
  font-size: .32rem;
  color: #fff;
  background: #bc7aff;
}
.loan-btn-disabled{
  background: rgb(221,221,221);
  color: rgb(192,192,192);
}
.loan-intro{
  margin-top: .3rem;
  text-align: center;
  font-size: .24rem;
  color: rgb(192,192,192);
}
/* 显示 */
.loan-picker-wrapper{
  position: absolute;
  width: 100%;
  bottom: 0;
  background-color: #fff;
}
.loan-toolbar{
  padding:0 .2rem;
  height: 40px;
  line-height: 40px;
}
.picker-bg{
  position: fixed;
  top:0;
  bottom: 0;
  left:0;
  right:0;
  background-color: rgba(0,0,0,.3);
}
/* 借款列表 */
.loan-orders-wrapper{
  background-color: #fff;
}
.loan-order-wrapper{
  display: flex;
  padding: 0 .2rem;
}
.loan-order-icon{
  padding: .2rem 0;
  width: 1rem;
}
.loan-order-icon > img{
  width: .8rem;
}
.loan-order-desc-wrapper{
  position: relative;
  flex-grow: 1;
  padding: .2rem 0;
  border-bottom: 1px solid #ebebeb;
  line-height: 1.6;
}
.loan-order-type{
  font-size: .3rem;
  color: #333;
}
.loan-order-period{
  font-size: .26rem;
  color: #333;
}
.loan-order-time{
  font-size: .26rem;
  color: #999;
}
.loan-order-total{
  position: absolute;
  top: .2rem;
  right:0;
  font-size: .36rem;
  color: #333;
}
.no-loan-orders{
  text-align: center;
  line-height: .8rem;
  height: .8rem;
}
</style>
