<template>
<div>
  <HeaderBack @headerAction="gotoHome" :isActionShow="true" :iconType="1" :header="header" :color="'rgb(214,83,228)'"></HeaderBack>
<div  class="head-distance head-top">
  <div>
  <ul class="head-top clearfix">
    <li>姓名<input type="text" v-model="enroll.userName" placeholder="请输入您的姓名" id="name"></li>
    <li>电话<input type="text" v-model="enroll.phone" placeholder="请输入您的电话" id="tel"></li>
    <li>地区<input @click="showPicker" type="text" unselectable="on" onfocus="this.blur()" :value="pickerAddress" readonly></li>
    <!-- type="text"  v-model="enroll.address" placeholder="请输入您的地区" id="city" -->
    <li>计划实行日期<input class="date-title clearfix" readonly="readonly" type="text" placeholder="请选择日期" v-model="enroll.viewDate" @click="openPicker">
    </li>
  </ul>
  </div>
  <mt-datetime-picker
    type="date"
    ref="picker"
    v-model="pickerValue"
    :startDate="startDate"
    @confirm="handleConfirm"
    year-format="{value} 年"
    month-format="{value} 月"
    date-format="{value} 日">
  </mt-datetime-picker>
  <div>
    <h4>-- 手术注意事项 --</h4>
    <ul class="middle-text">
      <li>1.预约时间前需要禁吃油腻辛辣的食物，请勿喝酒；</li>
      <li>2.工作人员会在您预约后48小时内联系您；</li>
      <li>3.预约成功后，需支付定金，若您点选医生实施手术，点选费用直接支付给医生，不做返还！若未点选医师，预约成功后则会直接安排实施手术医生，不产生点选费用。</li>
      <li>4.为了减少风险，手术前需要交齐全部会员费，才能进行手术。</li>
    </ul>
  </div>
</div>
  <button class="bnt-style" @click="submitEnroll" id="submit">同意并预约</button>
  <div class="all-background" v-show="isShow">
    <div class="diary-bounceg-style" >
      <img src="./caying-smiling.png" class="icon-style">
      <div class="diary-title-style">
        <span>报名成功！请到“我的”-我的报名“查看报名信息”。</span>
      </div>
      <div>
        <button class="click-button-style shrapnel-button" @click="gotoHome">确定</button>
      </div>
    </div>
  </div>
  <my-address
    :showAddressPicker="showAddressPicker"
    :init="address"
    @save-address="saveAddress"
    @hide-picker="hidePicker">
  </my-address>
  <Loading :isLoading="isLoading"></Loading>
</div>
</template>

<script>
import { ENROLL } from '@/models/index.js'
import HeaderBack from '@/components/common/HeaderBack/HeaderBack'
import MyAddress from '@/components/address-picker/Address.vue'
import Loading from '@/components/common/Loading/Loading'
import { MessageBox, DatetimePicker } from 'mint-ui'

const INIT_PICKER_ADDRESS = '北京-北京市-东城区'
export default {
  name: 'SelectAddress',
  components: {HeaderBack, DatetimePicker, MyAddress, Loading, MessageBox},
  data () {
    return {
      showAddressPicker: false,
      address: INIT_PICKER_ADDRESS,
      isAddressPicked: false, // 判断显示内容
      isLoading: false,
      viewDate: null,
      startDate: new Date(),
      pickerValue: null,
      isShow: false,
      header: {
        title: '预约订单',
        action: '首页'
      },
      enroll: {
        userName: '',
        phone: '',
        address: '',
        viewDate: ''
      }
    }
  },
  computed: {
    pickerAddress () {
      if (!this.isAddressPicked) {
        return '省份-城市-县区'
      } else {
        return this.address
      }
    }
  },
  methods: {
    gotoHome () {
      this.$router.push({name: 'home'})
    },
    openPicker () {
      this.$refs.picker.open()
    },
    handleConfirm (val) {
      console.log('val', val)
      // this.viewDate = this.formatDate(this.$refs.picker.value)
      // this.enroll.viewDate = this.formatDate(this.$refs.picker.value)
      this.enroll.viewDate = this.formatDate(val)
      console.log(this.formatDate(this.$refs.picker.value), this.enroll.viewDate)
    },
    formatDate (date) {
      console.log(date, date)
      const y = date.getFullYear()
      let m = date.getMonth() + 1
      m = m < 10 ? '0' + m : m
      let d = date.getDate()
      d = d < 10 ? ('0' + d) : d
      this.viewDate = y + ' - ' + m + ' - ' + d
      // this.enroll.viewDate = y + ' - ' + m + ' - ' + d
      return y + ' - ' + m + ' - ' + d
    },
    submitEnroll () {
      // 验证数据格式，以及是否填写
      // 不能为空；手机；
      const self = this
      const enrollInfo = self.enroll
      let trimReg = new RegExp(/^\s*|\s*$/g)
      for (let key in enrollInfo) {
        if (enrollInfo.hasOwnProperty(key)) {
          if (key !== 'postcode' && enrollInfo[key].toString().replace(trimReg, '') === '') {
            const KeyTable = {
              userName: '姓名',
              phone: '联系电话',
              address: '地区',
              viewDate: '日期'
            }
            MessageBox({
              title: '注意',
              message: `'${KeyTable[key]}'不能为空`,
              showCancelButton: false
            })
            return
          }
        }
      }
      let userNameLen = enrollInfo.userName.length
      if (userNameLen < 2 || userNameLen > 5) {
        MessageBox({
          title: '注意',
          message: `姓名长度为2~5`,
          showCancelButton: false
        })
        return
      }
      let phoneReg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
      if (!phoneReg.test(enrollInfo.phone)) {
        MessageBox({
          title: '注意',
          message: `手机号有误`,
          showCancelButton: false
        })
        return
      }
      self.isLoading = true
      let query = this.$route.query
      let price = null
      if (Number(query.selectedItemsPrice) > Number(query.max)) {
        price = query.max
      } else {
        price = query.selectedItemsPrice
      }
      const enroll = {
        type: query.type, // 第一步大类型的选择
        project: query.project, // 项目字符串（例如：吸脂--下巴, 吸脂--下颌缘
        doctorName: query.doctorName, // 点选医生姓名
        name: enrollInfo.userName, // 姓名
        price: price, // 项目价格
        region: enrollInfo.address, // 地址
        mobile: enrollInfo.phone, // 手机号
        effectivedAt: enrollInfo.viewDate.replace(/\s/g, '') // 计划实行日期
      }
      console.log('enroll', enroll)
      self._submitEnroll(self, enroll)
    },
    _submitEnroll (self, enroll) {
      ENROLL.finishEnroll(enroll).then(res => {
        if (res.data.retCode === 0) {
          self.isShow = !this.isShow
        } else if (res.data.retCode === 40002) {
          console.log('token失效')
        } else {
          MessageBox.alert(res.data.retMsg, '错误', {
            closeOnClickModal: true
          })
        }
        self.isLoading = false
      })
    },
    hidePicker () {
      // 接受子组件关闭popup事件
      this.showAddressPicker = false
    },
    showPicker () {
      this.showAddressPicker = !this.showAddressPicker
    },
    saveAddress (val) {
      // console.log(val)
      // 从子组件接受返回所选值 val
      this.isAddressPicked = true
      this.address = val
      this.enroll.address = val
      this.showAddressPicker = !this.showAddressPicker
    }
  },
  created() {
    const self = this
    // 保存url中的值
    self.query = JSON.parse(JSON.stringify(self.$route.query))
    // console.log('this.query', this.query)
    if (self.query.isIdentified !== true && self.query.isIdentified !== 'true') {
      MessageBox.alert('请先进行个人信息认证', '注意', {
        closeOnClickModal: false
      }).then(action => {
        self.$router.push({name: 'user.setup'})
      })
    }
  }
}
</script>

<style scoped>
.head-distance{
  margin-top: .88rem;
}
  /*背景色*/
.head-top{
    background: #fff;
    padding: 0 .2rem
  }
  /*列表*/
.head-top >li{
  background: #fff;
  border-bottom: 1px solid #ebebec;
  line-height: .55rem;
  padding: .2rem 0;
  font-size: .28rem;
  color: rgb(34,34,34);
}
.head-top input{
  border: none;
  background: none;
  color: rgb(153,153,153);
  font-size: .24rem;
  line-height: .55rem;
  text-align: right;
  float: right;
  width: 4.8rem
}
.date-title{
  float: right;
  color: rgb(153,153,153);
  font-size: .24rem;
}
.middle-text{
  padding-top: .4rem;
  padding-bottom: 4rem;
}
/*注意事项*/
.middle-text li{
  color: rgb(102,102,102);
  border: 0;
  margin: 0 0 .3rem 0;
  font-size: .24rem;
  line-height: .35rem;
}
.head-top  h4{
  text-align: center;
  margin-top: .6rem;
  color: rgb(34,34,34);
  font-size: .27rem;
}
/*底部按钮*/
.bnt-style{
  background-color: #bc7aff;
  width: 100%;
  height: 1rem;
  color: rgb(255,255,255);
  font-size: .36rem;
  border: 0;
  position: fixed;
  bottom: 0;
}
.clearfix:after{
  content:"";
  height:0;
  line-height:0;
  display:block;
  isibility:hidden;
  clear:both
}
.all-background{
  position: fixed;
  z-index: 100;
  background-color: rgba(0,0,0,.5);
  width: 100%;
  left: 0;
  bottom: 0;
  top: 0;
}
/*弹框背景色*/
.diary-bounceg-style{
  background-color: #FFF;
  text-align: center;
  position: fixed;
  z-index: 100;
  left: 20%;
  top: 25%;
  width: 4.5rem;
  height: 4.33rem;
  border-radius: .1rem;
}
/*图片样式*/
.icon-style{
  width: .63rem;
  height: .63rem;
  padding-top: .7rem;
  margin-left: 2rem;
  padding-bottom: .4rem;
}
.diary-title-style{
  padding: 0 .4rem;
  line-height: .5rem;
  color: rgb(56,56,56);
  font-size: .3rem;
}
/*按钮*/
.shrapnel-button{
  width: 3.3rem;
  height: .8rem;
  margin-top: .5rem;
  border-radius: .5rem;
  border: 0;
  font-size: .24rem;
}
.click-button-style{
  background-color: rgb(188,122,255);
  color: rgb(255,255,255);
}
.click-cancel{
  border: 1px solid rgb(188,122,255);
  background-color: #FFF;
  margin: 0 .2rem;
}
</style>
