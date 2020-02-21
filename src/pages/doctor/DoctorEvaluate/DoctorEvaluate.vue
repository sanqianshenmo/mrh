<template>
<div>
  <HeaderBack :isActionShow="true" :header="header" :color="'rgb(214,83,228)'"></HeaderBack>
  <div class="top clearfix">
    <div class="image-style">
      <img :src="doctor.avatar">
    </div>
    <div class="doctor">
      <span class="doctor-name">{{doctor.name}}</span>
      <img src="./comment-start.png" v-for="(n,idx) in starsNum" :key="idx" class="icon-whites">
      <span v-if="starsNum === 0" class="evaluate-no-stars">暂无评分</span>
      <span class="doctor-jod clearfix">{{doctor.job}}</span>
      <div class="evaluation">已经有{{doctor.evaluationNum}}人进行了评价</div>
    </div>
    <div class="lines"></div>
    <!-- 医生评价 -->
    <ul class="score">
      <!-- 医生水平  医助评分 客服态度 导医态度-->
      <li v-for="(evaluation,parentIdx) in evaluations" :key="parentIdx">{{evaluation.name}}
        <div  class="icon-style-s">
          <span  v-for="(starClass,starIdx) in evaluation.starClasses" :key="starIdx" class="icon-style" :class="starClass"  @click="selectStar(parentIdx, starIdx)"></span>
        </div>
      </li>
    </ul>
    <div class="lines"></div>
    <div class="title-style" v-if="isEvaluated">
      <span>您已完成评价，感谢参与</span>
    </div>
    <button v-else class="button-style" @click="submitEvaluation">匿名提交</button>
    <Loading :isLoading="isLoading"></Loading>
    <DoctorNotice :isNoticeShow="isNoticeShow"></DoctorNotice>
  </div>
</div>
</template>

<script>
import {DOCTOR} from '@/models/index.js'
import DoctorNotice from '@/components/doctor/DoctorNotice/DoctorNotice'
import HeaderBack from '@/components/common/HeaderBack/HeaderBack'
import { MessageBox } from 'mint-ui'
import Loading from '@/components/common/Loading/Loading'

const LENGTH = 5
const CLS_ON = 'star-red'
const CLS_OFF = 'icon-white'
export default {
  name: 'DoctorEvaluate',
  components: {DoctorNotice, HeaderBack, MessageBox, Loading},
  data () {
    return {
      isLoading: false,
      isNoticeShow: false, // 用户是否用权限操作的提示
      doctor: {},
      isEvaluated: false,
      evaluations: [
        {
          name: '医院环境',
          score: 5,
          starClasses: [CLS_ON, CLS_ON, CLS_ON, CLS_ON, CLS_ON]
        },
        {
          name: '医生水平',
          score: 5,
          starClasses: [CLS_ON, CLS_ON, CLS_ON, CLS_ON, CLS_ON]
        },
        {
          name: '医助评分',
          score: 5,
          starClasses: [CLS_ON, CLS_ON, CLS_ON, CLS_ON, CLS_ON]
        },
        {
          name: '客服态度',
          score: 5,
          starClasses: [CLS_ON, CLS_ON, CLS_ON, CLS_ON, CLS_ON]
        },
        {
          name: '导医态度',
          score: 5,
          starClasses: [CLS_ON, CLS_ON, CLS_ON, CLS_ON, CLS_ON]
        }
      ],
      header: {
        title: '医生评价'
      }
    }
  },
  computed: {
    starsNum () {
      if (this.doctor.grade === undefined) {
        return 5
      }
      let starsNum = Math.ceil(Number(this.doctor.grade) / 20)
      return starsNum
    }
  },
  methods: {
    submitEvaluation () {
      // 跳转
      // 总分是100，当前总共是 5项，每项最高5分，最终总分 X 4
      this.isLoading = true
      let score = this.evaluations.reduce((sum, curEvaluation) => {
        return sum + curEvaluation.score
      }, 0)
      let totalScore = score * 4
      console.log('totalScore', totalScore)
      // 待添加接口接入
      let doctorId = this.$route.query.id
      // console.log('doctorId', doctorId, totalScore)
      // return
      DOCTOR.evaluate(doctorId.toString(), totalScore).then(res => {
        this.isLoading = false
        if (res.data.retCode === 0) {
          this.doctor.evaluationNum++
          MessageBox({
            title: '评论完成',
            message: '感谢您参与评价！',
            showCancelButton: true,
            closeOnClickModal: false
          })
        }
      })
      this.isEvaluated = true
    },
    selectStar: function (parentIdx, starIdx) {
      // 提交评价不再准许星级改变
      if (this.isEvaluated) {
        return
      }
      const curEvaluation = this.evaluations[parentIdx]
      curEvaluation.starClasses = this._getStarclassess(starIdx + 1)
      // 保存正确的值
      curEvaluation.score = starIdx + 1
    },
    _getStarclassess (redNum) {
      let result = []
      for (let i = 0; i < redNum; i++) {
        result.push(CLS_ON)
      }
      while (result.length < LENGTH) {
        result.push(CLS_OFF)
      }
      return result
    },
    _getDoctorInfo (self) {
      let evaluateDoctor = JSON.parse(localStorage.getItem('evaluateDoctor'))
      self.doctor = evaluateDoctor
    }
  },
  beforeDestroy () {
    localStorage.removeItem('evaluateDoctor')
  },
  created () {
    // 不从“医生详情”过来时，没有医生数据
    const self = this
    self._getDoctorInfo(self)
  }
}
</script>

<style scoped>
  .top{
    margin-top: .88rem;
    bottom: .88rem;
    overflow: auto;
    background-color: #fff;
    padding: 0 .2rem 4.93rem .2rem;
  }
  .image-style{
    width: 1.01rem;
    height: 1.01rem;
    margin: .4rem .2rem .4rem .2rem;
    border-radius: 50%;
    float: left;
    overflow: hidden;
    background-color: rgb(188,122,255);
  }
  .image-style img {
    min-width: 100%;
  }
  .doctor{
    padding: .4rem 0 .4rem 0;
  }
  .doctor-name{
    padding-right: .26rem;
    font-size: .3rem;
    color: rgb(34,34,34);
  }
  .icon-whites {
    position: relative;
    top: .02rem;
    width: .24rem;
    height: .24rem;
    display: inline-block;
    margin: 0 .05rem 0 0;
    background-size: 100%;
  }
  .doctor-jod{
    float: right;
    font-size: .24rem;
    color: rgb(102,102,102);
  }
  .clearfix:after{
    content:'';
    height:0;
    line-height: 0;
    display: block;
    visibility: hidden;
    clear: both;
  }
  .evaluation{
    padding: .2rem 0 0 0;
    font-size: .24rem;
    color: rgb(102,102,102);
  }
  .lines{
    border-bottom: 1px solid #ebebeb;
  }
  .score{
    display: inline-block;
    text-align: center;
    margin-left: .7rem;
    padding-top: .4rem;
  }
  .icon-style-s{
    display: inline-block;
    padding: 0 0 0 .2rem
  }
  li{
    padding: 0 0 .4rem 0;
  }
  .button-style{
    background-color: rgb(188,122,255);
    color: rgb(255,253,252);
    font-size: .3rem;
    border-radius: .42rem;
    border: 0 solid rgb(188,122,255);
    width: 3.3rem;
    height: .84rem;
    margin: .6rem 0 .4rem 2rem;
  }
  .icon-style.comment{

  }
  .icon-style {
    width: .24rem;
    height: .24rem;
    display: inline-block;
    margin: 0 .15rem 0 0;
    background-size: 100%;
  }
  .star-red{
    background-repeat:no-repeat;
    background-image: url("./comment-start.png");
  }
  .icon-white{
    background-image: url("./icon-stars.png");
    background-repeat:no-repeat;
  }
  /* 完成评价后的显示 */
  .title-style{
    text-align: center;
    margin-top: .4rem;
    color: rgb(104,104,104);
    font-size: .24rem;
    margin-bottom: 1.15rem;
  }
  /* 没有评分的显示 */
  .evaluate-no-stars{
    color: rgb(140, 140, 140);
    font-size: .24rem;
  }
</style>
