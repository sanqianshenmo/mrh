<template>
  <div class="doctor-list-intro-wrapper clearfix">
    <!-- 医生介绍 -->
    <div class="doctor-list-intro-header">
      <div class="doctor-list-intro-header-img-wrapper" @click="gotoDoctor">
        <img :src="doctorAvatar">
      </div>
      <div class="doctor-list-intro-header-info-wrapper" @click="gotoDoctor">
        <div class="doctor-header-info-1">
          <span class="doctor-name">{{doctor.name}}</span>
          <span class="font-color">{{doctor.job}}</span>
        </div>
        <div class="doctor-header-info-2">
          <span class="doctor-introduce">{{doctor.hospital}}</span>
        </div>
        <div class="doctor-header-info-3">
          <span class="font-color">服务评价</span>
          <img v-for="(n,idx) in starsNum" :key="idx" src="./comment-star.png" class="img-comment">
          <!-- <span class="doctorlistintro-nostar">暂无</span> -->
        </div>
      </div>
      <!-- 点选 或者 打电话 -->
      <slot></slot>
    </div>
    <!-- 案例及费用 -->
    <div class="doctor-list-cases-fee-wrapper clearfix">
      <div class="doctor-list-cases-wrapper clearfix">
        <div class="img-style-wrapper" v-for="(casePic,idx) in cases" :key="idx">
          <img :src="casePic">
        </div>
        <div class="no-doctor-list-cases" v-if="cases.length === 0">暂无案例</div>
        <div class="doctor-v-line"></div>
      </div>
      <div class="doctor-list-fee-wrapper fr clearfix">
        <div class="doctor-list-fee-1 clearfix">
          <button>{{casesNum}}</button>
          <!-- 超过99人再显示 -->
          <span class="fun case-num-plus-pointer" v-if="casesNum > 99">+</span>
          <span class="styles">人已实施</span>
        </div>
        <div class="doctor-list-fee-2 clearfix">
          <span class="doctor-select-pay">点选费</span>
          <span class="doctor-select-pay-num">￥{{doctor.selectPrice}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* 使用地方：1.首页-专家 2.报名时，点选医生 */
import {IMG_PREFIX} from '@/common/config/config.js'

export default {
  name: 'DoctorListIntro',
  props: {
    doctor: {
      type: Object,
      default () {
        return {
          id: '1',
          name: '姓名',
          job: '职位',
          avatar: null,
          hospital: '医院',
          grade: 0,
          caseAvatars: [], // 案例头像
          caseNum: 0, // 选择该医生的人数
          selectPrice: '0' // 点赞费用
        }
      }
    }
  },
  computed: {
    /* 与DiaryDoctory相同--可以考虑评价，做成组件  to do */
    starsNum () {
      if (this.doctor.grade === undefined || Number(this.doctor.grade) === 0 || Number(this.doctor.grade) > 100) {
        return 5
      }
      let starsNum = Math.ceil(Number(this.doctor.grade) / 20)
      return starsNum
    },
    doctorAvatar () {
      return IMG_PREFIX + this.doctor.avatar
    },
    cases () {
      let cases = []
      // 没有数据时处理方式：使用默认表示空的内容，来占据空的空间，用户能感受到是空值，待补入
      let len = this.doctor.caseAvatars.length
      if (len === 0) {
        return cases
      }
      // 存在图片时 to do 大余5时
      if (len > 0) {
        cases = this.doctor.caseAvatars.map(item => {
          return item
        })
      }
      return cases
    },
    casesNum () {
      let len = this.doctor.caseAvatars.length
      return len
    }
  },
  methods: {
    gotoDoctor () {
      // 报名时时，不可跳转
      let id = this.doctor.id
      this.$router.push({name: 'doctor', query: {id: id}})
    }
  }
}
</script>

<style>
.fl{
  float:left;
}
.fr{
  float:right;
}
.clearfix:after{
  content:"";
  height:0;
  line-height:0;
  display:block;
  visibility:hidden;
  clear:both
}
 /*背景色*/
.doctor-list-intro-wrapper{
  background-color: #fff;
  /* padding: 0 .2rem 0 .2rem; */
  margin-bottom: .2rem;
  border-bottom: 1px solid #ebebeb;
}
.doctor-list-intro-header{
  box-sizing: border-box;
  height: 1.93rem;
  position: relative;
  padding: .4rem 0 .4rem 0;
  overflow:hidden;
  border-bottom: 1px solid #ebebeb;
}
  /* 医生图片 */
.doctor-list-intro-header-img-wrapper{
  float:left;
  border-radius: 100%;
  width: 1rem;
  height: 1rem;
  overflow:hidden;
  background-color: rgb(188,122,255);
}
.doctor-list-intro-header-img-wrapper img{
  width: 100%;
}
/* 医生文字介绍 */
.doctor-list-intro-header-info-wrapper{
  float: left;
  margin-left: .2rem;
}
.doctor-header-info-1,.doctor-header-info-2,.doctor-header-info-3 {
  line-height: 1;
}
.doctor-header-info-2{
  padding: 0.2rem 0 .2rem 0;
}
.doctor-introduce{
  display: inline-block;
  color: rgb(63,63,63);
  font-size: .24rem;
}
.doctor-name{
  color: rgb(34,34,34);
  font-size: .3rem;
  margin-right: .2rem;
}
.font-color{
  color: rgb(102,102,102);
  font-size: .24rem;
  padding-right: .2rem;
}
/*点选按钮样式*/
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
.img-style-wrapper{
  display: inline-block;
  margin: .26rem .3rem 0.26rem 0;
  width: .6rem;
  height: .6rem;
  border-radius: 50%;
  /* background-color: rgb(188,122,255); */
  overflow: hidden;
}
.doctor-v-line{
  position: absolute;
  border-right: 1px solid rgb(215,215,215);
  height: .84rem;
  top: 50%;
  margin-top: -.42rem;
  right: 0;
  margin-right: .2rem;
}
/* 案例头像 */
.doctor-list-cases-wrapper{
  float:left;
  position: relative;
  width: 4.6rem;
  height: 1.12rem;
  overflow: hidden;
  font-size: 0;
}
.no-doctor-list-cases{
  position: relative;
  font-size: .24rem;
  top: 0.4rem;
}
.doctor-list-fee-wrapper{
  float:right;
  padding-top: .18rem;
  line-height:1;
  /* width:2rem; */
}
.doctor-list-fee-1{
  text-align: right;
}
.doctor-list-fee-2{
  margin-top: .1rem;
  text-align: right;
}
.doctor-list-fee-1 > button{
  position: relative;
  padding-left: .1rem;
  padding-right: .1rem;
  min-width: .5rem;
  height: .3rem;
  border-radius: .4rem;
  border: 0 solid rgb(214,83,228);
  background-color: rgb(214,83,228);
  text-align: center;
  color: rgb(255,255,255);
  position: relative;
  margin-right: .2rem;
}
.case-num-plus-pointer{
  position: relative;
  left: -.2rem;
  top: -.08rem;
  font-size: .24rem;
  color: rgb(214,83,228);
}
.doctor-select-pay{
  font-size: .24rem;
  color: rgb(153,153,153);
}
.doctor-select-pay-num{
  color: rgb(214,83,228);
  font-size: .26rem;
  margin-left: .1rem;
}
/* 没有评级时的显示 */
.doctorlistintro-nostar {
  font-size: .24rem;
}
</style>
