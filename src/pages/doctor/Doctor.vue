<template>
  <div v-show="isReady" class="doctor-bg">
    <!-- 共用 -->
    <HeaderBack :header="header" :isActionShow="false" :color="'rgb(214,83,228)'"></HeaderBack>
    <DoctorHeader :doctorHeader="doctorHeader" @toTip="handleTipShow" class="mt-88"></DoctorHeader>
    <ContentHeader class="doctor-content-header-wrapper" :title="'专家介绍'"></ContentHeader>
    <Fold class="doctor-fold-bg" :foldContent="doctor.intro"></Fold>
    <ContentHeader class="doctor-content-header-wrapper mt-20" :title="'案例展示'"></ContentHeader>
    <DiaryTab class="mt--30" :tabs="tabHeader.tabs" :curIdx="tabHeader.curIdx" @switchTab="switchTab"></DiaryTab>
    <!-- 参考首页精华日记 -->
    <div class="doctor-cases-wrapper"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="diableLoad"
      infinite-scroll-distance="20">
      <DoctorCase
        v-show="caseList.length >= 1"
        v-for="diray in caseList"
        :key="diray.id"
        :diary="diray"
      ></DoctorCase>
      <div class="doctorycase-no-diaries" v-show="caseList.length === 0 && allLoaded">
        暂无案例日记
      </div>
      <div class="doctorycase-no-diaries" v-show="caseList.length >= 1 && allLoaded">
        无更多案例
      </div>
    </div>
    <MoreLoading v-show="!allLoaded" class="mt-20" :queryLoading="queryLoading" :allLoaded="allLoaded"></MoreLoading>
    <TipPerson v-show="isTipShow" :person="person" @tipShow="handleTipShow" @submitTip="handleTip" ></TipPerson>
    <Loading :isLoading="isLoading"></Loading>
  </div>
</template>

<script>
/*
 * 该页面入口： 1.首页专家列表
*/
import {IMG_PREFIX} from '@/common/config/config.js'
import {DOCTOR, TIP} from '@/models/index.js'
import HeaderBack from '@/components/common/HeaderBack/HeaderBack'
import Fold from '@/components/common/Fold/Fold'
// import DiaryHeader from '@/components/diary/DiaryHeader/DiaryHeader'
import DoctorHeader from '@/components/doctor/DoctorHeader/DoctorHeader'
import ContentHeader from '@/components/common/ContentHeader/ContentHeader'
import DiaryTab from '@/components/diary/DiaryTab/DiaryTab'
import DoctorCase from '@/components/doctor/DoctorCase/DoctorCase'
import MoreLoading from '@/components/common/MoreLoading/MoreLoading'
import Loading from '@/components/common/Loading/Loading'
import TipPerson from '@/components/diary/TipPerson/TipPerson'
import { MessageBox, Toast } from 'mint-ui'

export default {
  name: 'Doctor',
  components: {
    HeaderBack,
    Fold,
    DoctorHeader,
    ContentHeader,
    DiaryTab,
    DoctorCase,
    MoreLoading, // 滚动加载
    Loading, // 其它数据请求时加载
    TipPerson,
    MessageBox,
    Toast
  },
  data () {
    return {
      isReady: false, // 是否首次加载数据完毕
      isLoading: false, // 是否正在加载数据
      header: {
        title: '专家首页'
      },
      isTipShow: false, // 打赏框
      tabHeader: {
        tabs: [
          '全部',
          '整形',
          '微整',
          '植发'
        ],
        curIdx: 0
      },
      tabType: null, // 类型切换后，后台传输值
      doctor: {},
      caseList: [], // 这个名称有必要参数化
      doctorId: '', // 医生id
      curUser: {}, // 当前用户信息，用于打赏信息显示
      // 初始化滚动加载相关参数
      queryLoading: false,
      diableLoad: false, // 是过滤器终止无限滚动 触发
      allLoaded: false,
      totalNum: 0,
      pageNum: 1,
      pageSize: 2
    }
  },
  computed: {
    doctorHeader () {
      // 如果从专家列表跳转过来，可以考虑利用原请求数据，然后该页面的请求覆盖 to do
      const doctorHeader = {
        id: '', // 医生id
        headimgurl: null,
        nickname: 'xx',
        hospital: '',
        casesNum: 'x' // 手术总数 -- 目前通过单独接口调用
      }
      doctorHeader.id = this.doctor.id
      doctorHeader.headimgurl = this.doctor.avatar
      doctorHeader.nickname = this.doctor.name
      doctorHeader.hospital = this.doctor.hospital
      doctorHeader.casesNum = this.doctor.caseCount
      doctorHeader.curIdx = this.doctor.curIdx
      return doctorHeader
    },
    person () {
      const person = {
        name: 'xx',
        avatar: ''
      }
      let curUser = this.doctor
      person.name = curUser.name
      person.avatar = IMG_PREFIX + curUser.avatar
      return person
    }
  },
  methods: {
    init (self, id) {
      // 医生信息
      DOCTOR.getDetail(id).then(res => {
        self.isReady = true
        self.isLoading = false
        if (res.data.retCode === 0) {
          self.doctor = res.data.data
          self._saveDoctorInfo(self.doctor)
        } else {
          MessageBox.alert(res.data.retMsg, '错误', {
            closeOnClickModal: true
          })
        }
      })
      // 医生案例列表
      self._getCaselist(self, 'caseList', self.doctorId, self.pageNum, self.pageSize, self.tabType)
    },
    switchTab (idx) {
      let self = this
      // 这部分是否要写成配置呢？
      const idxMeaningTable = {
        '0': 'all',
        '1': 'shape', // 整形
        '2': 'small', // 微整
        '3': 'hair' // 植发
      }
      // 后台传输值
      const meaningTypeTable = {
        'all': 'all', // 全部
        'shape': '0', // 整形
        'small': '3', // 微整
        'hair': '4' // 植发
      }
      // 点击同一个tab阻止重复请求
      if (self.tabHeader.curIdx === idx) {
        return
      }
      self.tabHeader.curIdx = idx
      let tabType = this.tabType = meaningTypeTable[idxMeaningTable[idx]]
      // console.log('tabType', tabType)
      // 加载全部数据
      if (tabType === 'all') {
        tabType = null
      }
      // 加载其它数据
      // 内容重置
      self.pageNum = 1
      self.allLoaded = false
      // 根据类型加载内容
      self._getCaselist(self, 'caseList', self.doctorId, self.pageNum, self.pageSize, tabType)
    },
    _getCaselist (self, receiverName, uid, pageNum, pageSize, category) {
      self.queryLoading = true
      // 可以再函数参数化 to do
      DOCTOR.caseList(uid, pageNum, pageSize, category).then(res => {
        if (res.data.retCode === 0) {
          if (pageNum === 1) {
            self[receiverName] = []
          }
          // 这里可不可以用哨兵呢？
          if (res.data.data.data.length === 0) {
            self.allLoaded = true
            self.diableLoad = true
            return
          }
          self[receiverName] = self[receiverName].concat(res.data.data.data)
          self[receiverName].forEach(item => {
            item.hasZan = false
          })
          self.queryLoading = false
          self.diableLoad = false
        } else if (res.data.retCode === 1) {
          // 没有数据
          self.queryLoading = false
          self.diableLoad = true
          self.allLoaded = true
        } else if (res.data.retCode === 40002) {
          console.log('token失效')
        } else {
          MessageBox.alert(res.data.retMsg, '错误', {
            closeOnClickModal: true
          })
        }
      })
    },
    loadMore () {
      if (this.allLoaded) {
        this.diableLoad = true
        return
      }
      if (this.queryLoading) {
        return
      }
      this.pageNum++
      let self = this
      // 参数化 to do
      self._getCaselist(self, 'caseList', self.doctorId, self.pageNum, self.pageSize, self.tabType)
    },
    handleTipShow (isOpen) {
      // 与日记详情打赏 基本完全相同
      const self = this
      // if (self.curUser.id === undefined) {
      //   self.isLoading = true
      //   self._curUser(self, isOpen)
      //   return
      // }
      if (isOpen) {
        self.isTipShow = true
      } else {
        self.isTipShow = false
      }
      // self._hanldeTipShow(isOpen)
    },
    handleTip (tip) {
      const self = this
      let userId = this.doctor.userId
      let tradeType = tip.tipway
      let money = tip.num
      self.isLoading = true
      TIP.doctor(userId, tradeType, money).then(res => {
        // console.log('res', res)
        self.isLoading = false
        if (res.data.retCode === 0) {
          Toast({
            message: `打赏成功`,
            duration: 1000
          })
          // 添加打赏信息
          self.isTipShow = false
        } else {
          Toast({
            message: `打赏失败，请稍后再试`,
            duration: 2000
          })
        }
        // to do余额不足时的，返回码？
      })
    },
    _saveDoctorInfo (doctor) {
      // 保存到本地存储，用于医生评分 -- 节约医生信息的获取
      let evaluateDoctor = {
        id: '',
        name: '',
        avatar: '',
        job: '',
        grade: null,
        evaluationNum: 0 // 评价医生的人数
      }
      // to do 假如键非常多
      evaluateDoctor.id = doctor.id
      evaluateDoctor.name = doctor.name
      evaluateDoctor.avatar = IMG_PREFIX + doctor.avatar
      evaluateDoctor.job = doctor.job
      evaluateDoctor.grade = doctor.grade
      // doctor.evaluationNum = 0 // 医生评价人数
      localStorage.setItem('evaluateDoctor', JSON.stringify(evaluateDoctor))
    }
    // _curUser (self, isOpen) {
    //   // 获取当前用户信息
    //   CURUSER.info().then(res => {
    //     self.isLoading = false
    //     if (res.data.retCode === 0) {
    //       self.curUser = res.data.data
    //       if (isOpen) {
    //         self.isTipShow = true
    //         console.log(22222222222)
    //       } else {
    //         self.isTipShow = false
    //       }
    //       // self._hanldeTipShow(isOpen)
    //     } else {
    //       Toast({
    //         message: `获取当前用户信息失败，请稍后重试`,
    //         duration: 2000
    //       })
    //     }
    //   })
    // }
    // _hanldeTipShow (isOpen) {
    //   // 奇怪该函数明明在 res中写的，但是还是先于 异步执行？？？
    //   console.log(isOpen, 111111111)
    //   if (isOpen) {
    //     self.isTipShow = true
    //     console.log(22222222222)
    //   } else {
    //     self.isTipShow = false
    //   }
    // }
  },
  created () {
    const self = this
    let id = this.$route.query.id
    self.doctorId = id
    self.isLoading = true
    self.init(self, id)
  }
}
</script>

<style>
.mt--30{
  margin-top: -.3rem;
}
.mt-20{
  margin-top: .2rem;
}
.mt-88{
  margin-top: .88rem;
}
.doctor-bg{
  background: #f8f8f8;
}
.doctor-cases-wrapper{
  /* padding-bottom: .2rem; */
}
.doctor-cases-wrapper .case-wrapper{
  padding-bottom: .2rem;
}
.doctor-content-header-wrapper{
  padding: .38rem .2rem .24rem .2rem;
}
.doctor-fold-bg{
  background-color: #fff;
}
/* 没有日记的显示 */
.doctorycase-no-diaries{
  padding: .2rem 0;
  text-align: center;
}
</style>
