<template>
 <div class="diary-check-wrapper">
  <HeaderBack @headerAction="gotoWrite" :iconType="0" :header="header" :color="'rgb(214,83,228)'">
    <span class="notebook-num" v-show="false">1</span>
  </HeaderBack>
  <div class="diary-check-content"
    v-infinite-scroll="loadMore"
    infinite-scroll-disabled="diableLoad"
    infinite-scroll-distance="0"
  >
    <DiaryCheckDiary
      v-for="(diary,idx) in diaries"
      :diary="diary"
      :curIdx="idx"
      infinite-scroll-immediate-check="true"
      infinite-scroll-distance="50"
      :key="idx"></DiaryCheckDiary>
  </div>
  <MoreLoading v-show="!allLoaded" class="mt-20" :queryLoading="queryLoading" :allLoaded="allLoaded"></MoreLoading>
  <div class="diarycheck-no-diaries" v-if="diaries.length === 0 && allLoaded">暂无日记</div>
  <div class="diarycheck-no-diaries" v-show="diaries.length > 0 && allLoaded">无更多日记</div>
 </div>
</template>

<script>
import {TYPE_NAME_MAP} from '@/common/config/config.js'
import { DIARY } from '@/models/index.js'
import {getCookie} from '@/models/cookie'
import HeaderBack from '@/components/common/HeaderBack/HeaderBack'
import DiaryCheckDiary from '@/components/diary/DiaryCheckDiary/DiaryCheckDiary'
import MoreLoading from '@/components/common/MoreLoading/MoreLoading'
import { MessageBox, Toast } from 'mint-ui'

export default {
  name: 'DiaryCheck',
  components: {
    HeaderBack,
    DiaryCheckDiary,
    MoreLoading,
    MessageBox,
    Toast
  },
  data () {
    return {
      header: {
        title: '第一次整形日记',
        action: '写日记'
      },
      diaryBook: [],
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
    diaries () {
      const diaries = []
      // 日记传值模板
      const diary = {
        id: '',
        createTimeFormat: '20xx-xx-xx', // 创建时间
        updateTimeFormat: '20xx-xx-xx', // 修改后更新时间
        content: '内容',
        operationImgList: [],
        diffDay: 0, // 术后天数
        diaryIndex: 1, // 第几篇日记
        viewNum: 0,
        hasZan: false,
        zanNum: 0,
        commentNum: 0,
        tradeCount: 0, // 打赏总数
        status: 0, // 0-审核中；1-审核通过；2-审核未通过
        reason: '原因' // 不通过的原因（只在不通过显示）
      }
      // 组装成新的日记列表
      this.diaryBook.forEach(item => {
        let temp = {}
        for (let key in diary) {
          if (diary.hasOwnProperty(key)) {
            if (item[key] !== undefined) {
              temp[key] = item[key]
            }
          }
        }
        diaries.push(temp)
      })
      return diaries
    }
  },
  methods: {
    init (self, noteId, noteIndex, noteType) {
      // 日记本头部相关信息
      self.isLoading = true
      // 日记本下日记列表
      // console.log('noteId', noteId)
      self._getDiaryList(self, 'diaryBook', noteId, self.pageNum, self.pageSize)
      self._initHeader(self, noteIndex, noteType)
    },
    _initHeader (self, noteIndex, noteType) {
      let shapeName = TYPE_NAME_MAP[noteType]
      // console.log('noteType', noteType, 'TYPE_NAME_MAP', TYPE_NAME_MAP, 'shapeName', shapeName)
      if (shapeName === undefined) {
        shapeName = '整形'
      }
      let title = `第${noteIndex}次${shapeName}日记`
      self.header.title = title
    },
    gotoWrite () {
      // 判断用户权限 -- 可以抽出多处使用
      let role = getCookie('mrh-role')
      // console.log('role', role)
      if (role === '15') {
        MessageBox.alert('游客无法写日记，请在"我的"完成身份认证', '无法写日记', {
          closeOnClickModal: true
        })
        return
      }
      // let noteId = this.noteId
      let query = this.$route.query
      let noteId = query.noteId
      let date = query.date
      let noteIndex = query.noteIndex
      let noteType = query.noteType
      let userId = query.userId
      // console.log('query', query, 'noteId', noteId, 'date', date, 'noteIndex', noteIndex)
      // return
      this.$router.push({name: 'diary.write', query: {noteId, noteIndex, date, noteType,userId}})
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
      let noteId = self.$route.query.noteId
      // 参数化 to do
      self._getDiaryList(self, 'diaryBook', noteId, self.pageNum, self.pageSize)
    },
    _getDiaryList (self, receiverName, noteId, pageNum, pageSize) {
      self.queryLoading = true
      DIARY.checkDiaryList(noteId, pageNum, pageSize).then(res => {
        if (res.data.retCode === 0) {
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
          // console.log('token失效')
        } else {
          MessageBox.alert(res.data.retMsg, '错误', {
            closeOnClickModal: true
          })
        }
      })
    }
  },
  created () {
    const self = this
    let query = this.$route.query
    let noteId = query.noteId
    let noteIndex = query.noteIndex
    let noteType = query.noteType
    self.init(self, noteId, noteIndex, noteType)
  }
}
</script>

<style>
 .diary-check-wrapper{
  box-sizing: border-box;
  min-height: 100%;
  padding-top: 1rem;
  background-color: #f8f8f8;
 }
 .diary-check-content{
  /* padding-left: .2rem;
  padding-right: .2rem; */
  /* background-color: #fff; */
 }
 /* 无日记与无更多日记 */
 .diarycheck-no-diaries {
    padding: .2rem 0;
    text-align: center;
}
</style>
