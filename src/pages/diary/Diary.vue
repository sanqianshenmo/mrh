<template>
  <div class="pb-160">
    <div class="diary-search-wrapper">
      <div class="ipt-search" @click="gotoSearch">搜索日记</div>
      <div class="diary-write" @click="gotoWrite">
        <img class="diary-write-img" src="./icon-write.png" alt="写日记" title="写日记">
        <span class="diary-write-text">写日记</span>
      </div>
    </div>
    <DiaryTab :tabs="tabHeader.tabs" :curIdx="tabHeader.curIdx" @switchTab="switchTab"></DiaryTab>
    <div class="cases-wrapper"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="diableLoad"
        infinite-scroll-distance="0">
        <DiaryItem
          v-show="diaries.length >= 1"
          v-for="diray in diaries"
          :key="diray.id"
          :diary="diray"
        ></DiaryItem>
        <div class="diary-no-diaries" v-show="diaries.length === 0 && allLoaded">
          暂无日记
        </div>
        <div class="diary-no-diaries" v-show="diaries.length >= 1 && allLoaded">
          无更多日记
        </div>
      </div>
      <MoreLoading v-show="!allLoaded" class="mt20" :queryLoading="queryLoading" :allLoaded="allLoaded"></MoreLoading>
    <v-drap></v-drap>
    <Loading :isLoading="isLoading"></Loading>
    <bottom-nav></bottom-nav>
  </div>
</template>

<script>
import {DIARY} from '@/models/index.js'
import {PARTNER} from '@/models/index'
import {IMG_PREFIX} from '@/common/config/config.js'
import DiaryItem from '@/components/diary/DiaryItem/DiaryItem'
import { Swipe, SwipeItem, MessageBox, Indicator } from 'mint-ui'
import DiaryTab from '@/components/diary/DiaryTab/DiaryTab'
import Loading from '@/components/common/Loading/Loading'
import MoreLoading from '@/components/common/MoreLoading/MoreLoading'
import BottomNav from '@/components/common/BottomNav/BottomNav'
import VDrap from '@/components/common/Drap/Drap'

export default {
  name: 'Diary',
  components: {DiaryItem, Swipe, SwipeItem, MessageBox, Indicator, DiaryTab, Loading, MoreLoading, BottomNav, VDrap},
  data () {
    return {
      isLoading: false,
      tabHeader: {
        tabs: [
          '全部',
          '整形',
          '微整',
          '植发'
        ],
        curIdx: 0
      },
      tabType: null, // 切换后，向后台传输的类型，默认值为全部
      diaries: [],
      IMG_PREFIX: IMG_PREFIX,
      userRole: null, // null
      // 初始化滚动加载相关参数
      queryLoading: false,
      diableLoad: false, // 是过滤器终止无限滚动 触发
      allLoaded: false,
      totalNum: 0,
      pageNum: 1,
      pageSize: 2
    }
  },
  methods: {
    init (self) {
      self._getDiaries(self, 'diaries', self.pageNum, self.pageSize, self.tabType)
    },
    switchTab (idx) {
      let self = this
      const idxMeaningTable = {
        '0': 'all',
        '1': 'shape', // 整形
        '2': 'small', // 微整
        '3': 'hair' // 植发
      }
      const meaningTypeTable = {
        'all': 'all', // 全部
        'shape': '0', // 整形
        'small': '3', // 微整
        'hair': '4' // 植发
      }
      if (this.tabHeader.curIdx === idx) {
        return
      }
      this.tabHeader.curIdx = idx
      let tabType = self.tabType = meaningTypeTable[idxMeaningTable[idx]]
      // console.log('tabType', tabType)
      // 加载全部数据
      if (tabType === 'all') {
        tabType = null
      }
      // 加载其它数据
      // 页面重置
      self.pageNum = 1
      self.diaries = []
      // 根据类型加载内容
      self._getDiaries(self, 'diaries', self.pageNum, self.pageSize, tabType)
    },
    gotoSearch () {
      this.$router.push({name: 'search'})
    },
    gotoWrite () {
      // 判断用户权限 -- 可以抽出多处使用 当前：日记页、日记详情
      // 暂时使用 范范的接口来判断权限 -- 这个多处使用如何抽出来？
      if (this.userRole === null) {
        this.isLoading = true
        // console.log('this.userRole', this.userRole)
        PARTNER.getMsg().then(res => {
          // console.log('this', this, 'this.isLoading1', this.isLoading)
          this.isLoading = false
          // console.log('this', this, 'this.isLoading2', this.isLoading)
          if (res.data.retCode === 0) {
            // console.log('0', '0000000000000000000000')
            this.userRole = res.data.data.rule
            this._gotoWrite(res.data.data.rule)
          } else if (res.data.retCode === 40002) {
            // token失效时往哪跳？
            // console.log('token失效')
            MessageBox.alert('获取您的权限失败', '无法写日记', {
              closeOnClickModal: false
            })
          }
        })
      } else {
        // console.log('this.userRole', this.userRole)
        this._gotoWrite(this.userRole)
      }
    },
    _gotoWrite  (role) {
      // console.log('role', role)
      if (role === 15) {
        MessageBox.alert('游客无法写日记，请在"我的"完成身份认证', '无法写日记', {
          closeOnClickModal: false
        }).then(action => {
          this.$router.push({name: 'user.setup'})
        })
        return
      }
      // check参数用于后续判断，选择日记本后到底往哪跳
      this.$router.push({name: 'diary.notebook', query: {check: false}})
    },
    _getDiaries (self, receiverName, pageNum, pageSize, shapType) {
      self.queryLoading = true
      DIARY.diaryListByType(pageNum, pageSize, shapType).then(res => {
        if (res.data.retCode === 0) {
          // 这里可不可以用哨兵呢？
          if (res.data.data.data.length === 0) {
            self.allLoaded = true
            self.diableLoad = true
            return
          }
          self[receiverName] = self[receiverName].concat(res.data.data.data)
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
          // 下面的需要不需要写呢？
          self.queryLoading = false
          self.diableLoad = true
          self.allLoaded = true
        }
      })
    },
    loadMore () {
      /* 与首页相同 */
      if (this.allLoaded) {
        this.diableLoad = true
        return
      }
      if (this.queryLoading) {
        return
      }
      this.pageNum++
      let self = this
      self._getDiaries(self, 'diaries', self.pageNum, self.pageSize, self.tabType)
    },
    _getCurtabIdx (tabType) {
      // 日记类型寻找当前tab
      // 反向查找
      // 以下表与switchTab恰好是逆向的，对象可以根据value值找到键值吗？（需要保证键值的唯一性）
      const idxMeaningTable = {
        '0': 'all',
        '1': 'shape', // 整形
        '2': 'small', // 微整
        '3': 'hair' // 植发
      }
      const meaningTypeTable = {
        'all': '0', // 全部
        'shape': '1', // 整形
        'small': '4', // 微整
        'hair': '5' // 植发
      }
      let curIdx = null
      // 有对应会找到对应的 curIdx，没有会返回null
      for (let meaning in meaningTypeTable) {
        if (meaningTypeTable[meaning] === tabType) {
          for (let idx in idxMeaningTable) {
            if (idxMeaningTable[idx] === meaning) {
              curIdx = Number(idx)
              break
            }
          }
          break
        }
      }
      return curIdx
    }
  },
  created () {
    // 如何获得uid? to do
    const self = this
    // 从日记详情跳转过来的同类日记
    let tabType = this.$route.query.tabType
    if (tabType !== undefined) {
      let curIdx = self._getCurtabIdx(tabType)
      if (curIdx === null) {
        self.init(self)
      }
      this.switchTab(curIdx)
      return
    }
    self.init(self)
  }
}
</script>

<style scoped>
.mt20{
  margin-top:.2rem;
}
.pb-160 {
  padding-bottom: 1.6rem;
}
.case-wrapper:first-child {
    margin-top: 0;
}
/* 搜索 */
.diary-search-wrapper{
  padding-top: .21rem;
  padding:.21rem .2rem 0;
  display: flex;
  justify-content: space-between;
  background:#fff;
}
.diary-search-wrapper .ipt-search{
  background: url('icon-search.png') no-repeat left .1rem top .1rem;
  background-size: .28rem .28rem;
  height: .5rem;
  line-height: .5rem;
  width: 5.22rem;
  border-radius: .25rem;
  color: rgb(141,140,142);
  text-indent: .6rem;
  font-size: .2rem;
  background-color: rgba(243,245,247,.8);
}
.diary-write{
  font-size: 0;
  display: flex;
  align-items: center;
}
.diary-write-img{
  /* position: relative;
  top: .02rem; */
  margin-right: .16rem;
  display: inline-block;
  vertical-align: middle;
  /* width: .25rem;
  height: .26rem; */
  width: .24rem;
  height: .24rem;
}
.diary-write-text{
  vertical-align: middle;
  font-size: .28rem;
  color: rgb(214,83,228);
}
.diary-no-diaries{
  padding: .2rem 0;
  text-align: center;
}
/* 日记列表包裹 */
.cases-wrapper{
  background-color: #F8F8F8;
}
</style>
