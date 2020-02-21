<template>
<div v-show="isReady">
  <HeaderBack @headerAction="skiptoNext" :isActionShow="true" :header="header" :color="'rgb(214,83,228)'"></HeaderBack>
 <!-- 医生主体 -->
  <div class="reservations-doctor-list-intro-wrapper">
    <DoctorListIntro v-for="doctor in doctors" :doctor="getDoctorInfo(doctor)" :key="doctor.id" class="reservations-list-intro-pd">
      <div class="contron-button clearfix" @click="chooseDoctor(doctor)">
        <label  class="radio" :class="{c: doctor.isSelected}"></label>
        <!-- 样式 to do -->
        <span :class="{c: doctor.isSelected}">点选</span>
      </div>
    </DoctorListIntro>
  </div>
 <!-- 底部 -->
 <!-- 点选 -->
      <!-- <div class="contron-button clearfix">
        <label  class="radio" @click="shopHon(idx)" :class="{c: shopHonC === idx}"></label>
        <span :class="{c: shopHonC === idx}">点选</span>
      </div> -->
  <div class="colors1">
    <div class="cost">
      <span class="bottom-text">已选项目总价值</span>
      <span class="price">￥
        <span v-show="isSelectedItems">{{query.selectedItemsPrice}}</span>
        <span v-show="!isSelectedItems">{{totalPrice}}</span>
      </span>
      <div class="dian-style" v-show="isDoctorSelected">
        <span> 医生点选费（自付）</span>
         <span>￥<span>{{selectedDoctorPrice}}</span></span>
      </div>
      <div class="dian-style" v-show="!isDoctorSelected">
        <span> 未点选医生</span>
      </div>
    </div>
      <div style="float: right">
        <button class="button-style clearfix" @click="submitDoctor">
          <div class="text-style">下一步</div>
          <span class="text1-style">只需{{totalPrice}}元会员费</span>
        </button>
        <div class="bnt-srta">
          <span class="bnt-srta" v-show="isDoctorSelected">自付{{selectedDoctorPrice}}元点选费</span>
          <span class="bnt-srta" v-show="!isDoctorSelected">无医生点选费</span>
        </div>
      </div>
  </div>
  <Loading :isLoading="isLoading"></Loading>
</div>
</template>

<script>
import { DOCTOR } from '@/models/index.js'
import HeaderBack from '@/components/common/HeaderBack/HeaderBack'
import DoctorListIntro from '@/components/doctor/DoctorListIntro/DoctorListIntro'
import Loading from '@/components/common/Loading/Loading'
import { MessageBox } from 'mint-ui'

export default {
  name: 'ReservaTions',
  components: { HeaderBack, DoctorListIntro, Loading, MessageBox },
  data () {
    return {
      isReady: false,
      isLoading: false,
      shopHonC: 0,
      header: {
        title: '点选医生',
        action: '跳过'
      },
      doctors: [],
      query: {
        isIdentified: false, // 是否身份认证了--还是不是很保险
        max: 0, // 最高会员费
        type: null, // 大的整形类型
        project: null, // 选择的所有整形项目
        selectedItemsPrice: null // 选择的项目总价
      }
    }
  },
  computed: {
    isDoctorSelected () {
      let isDoctorSelected = this.doctors.some(doctor => {
        return doctor.isSelected === true
      })
      return isDoctorSelected
    },
    isSelectedItems () {
      // 是否选择了整形项目 type = 3没有选择整形项目
      if (this.query.selectedItemsPrice === '') {
        return false
      } else {
        return true
      }
    },
    totalPrice () {
      let max = this.query.max
      // 没有选择整形项目
      if (!this.isSelectedItems) {
        return max
      }
      if (Number(this.query.selectedItemsPrice) >= Number(max)) {
        return max
      }
      return this.query.selectedItemsPrice
    },
    selectedDoctorPrice () {
      let price = null
      this.doctors.some(doctor => {
        if (doctor.isSelected) {
          price = doctor.selectPrice
        }
      })
      return price
    }
  },
  methods: {
    init (self) {
      // 可点选医生列表
      DOCTOR.getList().then(res => {
        if (res.data.retCode === 0) {
          self.doctors = res.data.data.data
          self.doctors.forEach(item => {
            self.$set(item, 'isSelected', false)
          })
          self.isReady = true
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
    skiptoNext () {
      const self = this
      let query = self._getQueryData(self, false)
      // console.log('query', query)
      this.$router.push({name: 'enroll.info', query})
    },
    submitDoctor () {
      const self = this
      // 如何判断是不是空对象文法
      if (!self.isDoctorSelected) {
        MessageBox.alert('请先选择医生！若不点选医生，可以点击顶部"跳过"', '注意', {
          closeOnClickModal: true
        })
        return
      }
      // let isDoctorSelected = this.isDoctorSelected
      let query = self._getQueryData(self, true)
      // console.log('query', query)
      self.$router.push({name: 'enroll.info', query: query})
    },
    _getQueryData (self, isDoctorSelected) {
      // 传递到下一个页面的数据
      const addedQuery = {
        selectedDoctorPrice: '', // 本页面将要新增的数据*
        doctorName: '' // 本页面将要新增的数据*
      }
      if (!isDoctorSelected) {
        let query = self._mergeQuery(self.query, addedQuery)
        return query
      }
      // 选择了医生
      let query = null
      self.doctors.some(doctor => {
        if (doctor.isSelected === true) {
          addedQuery.selectedDoctorPrice = doctor.selectPrice
          addedQuery.doctorName = doctor.name
          query = self._mergeQuery(self.query, addedQuery)
          return true
        }
      })
      return query
    },
    _mergeQuery (query, addedQuery) {
      for (let key in addedQuery) {
        if (addedQuery.hasOwnProperty(key)) {
          query[key] = addedQuery[key]
        }
      }
      return query
    },
    chooseDoctor (doctor) {
      // 双击取消点选
      if (doctor.isSelected) {
        doctor.isSelected = false
        return
      }
      // 点选其它医生
      this.doctors.forEach(item => {
        item.isSelected = false
      })
      doctor.isSelected = true
    },
    getDoctorInfo (doctor) {
      const info = {
        id: null,
        avatar: null,
        name: '姓名',
        job: '职位',
        hospital: '医院',
        grade: 0,
        selectPrice: '0', // 点赞费用
        caseAvatars: [], // 案例头像
        caseNum: '?' // 选择该医生的人数
      }
      const transformMapTable = {
        id: 'id',
        avatar: 'avatar',
        name: 'name',
        job: 'job',
        hospital: 'hospital',
        grade: 'grade',
        selectPrice: 'selectPrice', // 点赞费用
        caseAvatars: 'userList',
        caseNum: 'caseNum' // 选择该医生的人数
      }
      for (let key in info) {
        if (info.hasOwnProperty(key)) {
          let doctorKey = transformMapTable[key]
          if (doctor[doctorKey]) {
            // 提取出案例头像
            if (doctorKey === 'userList') {
              let userList = doctor[doctorKey]
              userList.forEach(item => {
                info[key].push(item.avatar)
              })
            } else {
              info[key] = doctor[doctorKey]
            }
          }
        }
      }
      return info
    }
  },
  created () {
    const self = this
    // 保存url中的值
    self.query = JSON.parse(JSON.stringify(self.$route.query))
    // console.log('this.query', this.query)
    if (self.query.isIdentified === true || self.query.isIdentified === 'true') {
      self.isLoading = true
      self.init(self)
    } else {
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
/* 主体整体空间 */
.reservations-doctor-list-intro-wrapper{
  margin:.88rem 0 2.35rem 0;
  background-color: #f5f5f5;
}
/* reservations-list-intro-pd */
.reservations-list-intro-pd{
  padding-left: .2rem;
  padding-right: .2rem;
  background-color: #fff;
}
/*点选按钮样式*/
.contron-button{
  float: right;
  /* 增大点击范围 */
  width: 2rem;
  height: 1rem;
  padding-top: .4rem;
  text-align: right;
}
.radio{
  width: 0.10rem;
  height: 0.10rem;
  padding: 0;
  overflow: hidden;
  border-radius: 50%;
  background: #fff;
  vertical-align: -0.04rem;
  border: 0.10rem solid #c8c8c8;
  display: inline-block;
  margin: 0 0.2rem 0 0;
}
.img-comment{
  width: .24rem;
  height: .24rem;
  display: inline-block;
  padding: 0 .12rem 0 0;
  vertical-align: -0.04rem;
}
/*点击变色样式*/
.c{
  border-color: rgb(234,83,228);
  color: rgb(234,83,228);
}
.line1{
  border-right: 1px solid rgb(215,215,215);
  height: .84rem;
  position: absolute;
  top: .2rem;
  right: 0;
  margin-right: .2rem;
}
/*点选费等*/
.bnt{
  width: .5rem;
  height: .3rem;
  border-radius: .4rem;
  border: 0 solid rgb(214,83,228);
  background-color: rgb(214,83,228);
  text-align: center;
  color: rgb(255,255,255);
  position: relative;
  margin-right: .2rem;
}
.clearfix:after{
  content:"";
  height:0;
  line-height:0;
  display:block;
  visibility:hidden;
  clear:both
}
.styles{
  color: rgb(102,102,102);
  font-size: .24rem;
}
/*底部样式*/
.colors1{
  border-top: 1px solid #ebebeb;
  background: #fff;
  position: fixed;
  width: 100%;
  bottom:0;
  padding: 0 0.1rem 0 0.2rem;
  margin: 0 0 0;
}
.button-style{
  width: 2.5rem;
  height: .89rem;
  background-color: rgb(214,83,228);
  color: rgb(255,255,255);
  border-radius: .4rem;
  border: 0 solid rgb(214,83,228);
  float: right;
  margin: .4rem .4rem .15rem 0;
}
.cost{
  float: left;
  padding: .48rem 0 0 0;
}
.dian-style{
  padding-top: .3rem;
  font-size: .24rem;
  color: rgb(214,83,228);
}
.bnt-srta{
  padding: .15rem 0 .62rem .1rem;
  color: rgb(214,83,228);
  font-size: .24rem;
}
.text-style{
  font-size: .36rem;
}
.text1-style{
  font-size: .24rem;
}
.bottom-text{
  font-size: .24rem;
  color: rgb(153,153,153);
}
.price{
  font-size: .24rem;
  color: rgb(214,83,228);
}
</style>
