<template>
  <div class="expert-wrapper">
    <HeaderBack :header="header" :isActionShow="false" :color="'rgb(214,83,228)'"></HeaderBack>
    <div class="expert-header-wrapper">
      <img src="./team-banner.jpg" alt="">
    </div>
    <div class="expert-search-wrapper">
      <input type="text" placeholder="请输入医生姓名" v-model="searchName" class="expert-ipt-search" @keyup.delete="showDoctors" @keyup.enter="searchDoctor">
      <!-- 请输入医生姓名或职位 上面省去了职位 -->
    </div>
    <!-- 医生类别 -->
    <DiaryTab class="mt20" :tabs="tabHeader.tabs" :curIdx="tabHeader.curIdx" @switchTab="switchTab"></DiaryTab>
    <!-- 将来需要做成滚动加载 to do -->
    <DoctorList
      v-show="isReady"
      v-if="doctors"
      v-for="(doctor,idx) in doctors"
      :key="idx"
      :doctor="doctor"
      ></DoctorList>
    <div class="mt20 expert-noexpert" v-else>暂无数据</div>
    <MoreLoading class="mt20" :allLoaded="false" :queryLoading="queryLoading"></MoreLoading>
  </div>
</template>

<script>
import { DOCTOR } from '@/models/index.js'
import HeaderBack from '@/components/common/HeaderBack/HeaderBack'
import DiaryTab from '@/components/diary/DiaryTab/DiaryTab'
import DoctorList from '@/components/doctor/DoctorList/DoctorList'
import MoreLoading from '@/components/common/MoreLoading/MoreLoading'
import { Toast } from 'mint-ui'

export default {
  name: 'HomeExpert',
  components: { HeaderBack, DiaryTab, DoctorList, MoreLoading },
  data () {
    return {
      isReady: false,
      queryLoading: false,
      header: {
        title: '专家团队'
      },
      tabHeader: {
        tabs: [
          '大陆医生',
          '港澳台医生',
          '国际医生'
        ],
        curIdx: 0
      },
      doctors: [],
      docotorsCopy: [], // 医生副本
      searchName: '' // 搜索名称
    }
  },
  methods: {
    init (self) {
      // 报名时时，不可跳转
      DOCTOR.getList().then(res => {
        self.isReady = true
        self.queryLoading = false
        self.doctors = res.data.data.data
        // 保存初始信息
        self.docotorsCopy = JSON.parse(JSON.stringify(self.doctors))
      })
    },
    switchTab (idx) {
      // const self = this
      // this.tabHeader.curIdx = idx
    },
    searchDoctor () {
      let name = this.searchName.replace(/(^\s*)|(\s*$)/g, '')
      if (name === '') {
        Toast({
          message: `请输入搜索内容`,
          duration: 1500
        })
        return
      }
      this.doctors = this.doctors.filter(doctor => {
        if (doctor.name.indexOf(name) > -1) {
          return true
        }
      })
    },
    showDoctors () {
      // 显示所有医生
      this.doctors = this.docotorsCopy
    }
  },
  created () {
    const self = this
    self.isReady = false
    self.queryLoading = true
    self.init(self)
  }
}
</script>

<style scoped>
.mt20{
  margin-top: .2rem;
}
.mt-88{
  margin-top:.88rem;
}
.pb-20{
  padding-bottom: .2rem;
}
.expert-wrapper{
  padding-top: .88rem;
  background-color: #f8f8f8;
}
.expert-header-wrapper{
  padding-top: .4rem;
  padding-left:.2rem;
  padding-right: .2rem;
  max-height:3.54rem;
  background-color: #fff;
  overflow:hidden;
}
.expert-header-wrapper img{
  width: 100%;
}
/* 搜索 */
.expert-search-wrapper{
  padding: .3rem .2rem;
  display: flex;
  justify-content: space-between;
  background:#fff;
}
.expert-ipt-search{
  background: url('icon-search.png') no-repeat left .2rem top .1rem;
  background-size: .28rem .28rem;
  height: .5rem;
  line-height: .5rem;
  width: 100%;
  border-radius: .25rem;
  color: rgb(141,140,142);
  text-indent: .6rem;
  font-size: .2rem;
  background-color: rgba(243,245,247,.8);
}
/* 没有医生 */
.expert-noexpert{
  padding: 0 .2rem;
  height: .76rem;
  line-height: .76rem;
  background-color: #fff;
  text-align: center;
}
</style>
