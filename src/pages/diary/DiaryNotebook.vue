<template>
  <div class="notebook-wrapper" v-show="isReady">
    <HeaderBack :isActionShow="false" :header="header" :color="'rgb(214,83,228)'"></HeaderBack>
    <div class="diarynotebook-no-notebook" v-if="bookList.length === 0">暂无可选日记本</div>
    <div class="notebook-list-wrapper">
      <div class="one-notebook" v-for="(book,idx) in bookList" :key="idx">
        <div class="one-notebook-img" @click="gotoWriteOrCheck(book)">
          <img :src="book.coverPre" alt="封面">
          <div class="one-notebook-desc">
            <span class="one-notebook-desc-time">第{{Number(book.noteIndex) + 1}}次</span>
            <span class="one-notebook-desc-text">{{book.type|ShapeName}}日记本</span>
          </div>
          <span class="one-notebook-num">{{book.diaryNum}}篇</span>
        </div>
        <div class="one-notebook-bottom-desc">
          <span>{{book.create_time.slice(0,10)}} 创建</span>
          <div>
            <img class="one-notebook-icon" src="./icon-view.png" alt="">
            <span class="one-notebook-icon-desc">{{book.viewNum}}</span>
          </div>
        </div>
      </div>
    </div>
    <Loading :isLoading="isLoading"></Loading>
  </div>
</template>

<script>
import {IMG_PREFIX, ImgThumbnailPostfix} from '@/common/config/config.js'
import { DIARY } from '@/models/index.js'
import HeaderBack from '@/components/common/HeaderBack/HeaderBack'
import Loading from '@/components/common/Loading/Loading'
import { MessageBox } from 'mint-ui'

export default {
  name: 'DiaryNotebook',
  components: {
    HeaderBack,
    Loading,
    MessageBox
  },
  data () {
    return {
      isReady: false,
      isLoading: false,
      header: {
        title: '选择日记本'
      },
      bookList: [
        {
          id: '', // 日记本id
          create_time: '2018-xx-xx', // 创建时间
          noteIndex: 0, // 第几次
          coverPre: '', // 封面
          diaryNum: 0, // 包含日记数
          viewNum: 0, // 评论数
          type: 0 // 整形类型
        }
      ]
    }
  },
  methods: {
    init (self) {
      self.isLoading = true
      DIARY.bookList().then(res => {
        self.isLoading = false
        if (res.data.retCode === 0) {
          self.bookList = res.data.data
          self.bookList.forEach(book => {
            // 后台未设置封面时
            if (book.coverPre === null) {
              book.coverPre = IMG_PREFIX + book.preOperatImgsList[0] + ImgThumbnailPostfix
            } else {
              book.coverPre = IMG_PREFIX + book.coverPre + ImgThumbnailPostfix
            }
          })
          self.isReady = true
        } else if (res.data.retCode === 40002) {
          console.log('token失效')
        } else {
          MessageBox.alert(res.data.retMsg, '错误', {
            closeOnClickModal: true
          })
        }
      })
    },
    gotoWriteOrCheck (book) {
      // 去写日记 或者 审核日记
      let noteId = book.id
      let userId = book.userId
      let check = this.$route.query.check
      // 返回前后check的类型发生改变
      // console.log('this.$route.query.check', typeof this.$route.query.check, isCheck, isCheck)
      let date = book.operationAtDate
      let noteIndex = book.noteIndex + 1
      let noteType = book.type
      if (check === false || check === 'false') {
        this.$router.push({name: 'diary.write', query: {noteId, noteIndex, noteType, date,userId}})
      } else {
        this.$router.push({name: 'diary.check', query: {noteId, noteIndex, noteType, date,userId}})
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
.notebook-list-wrapper{
  margin-top: 1.08rem;
}
.notebook-list-wrapper{
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding:.4rem .2rem;
  background-color: #fff;
}
.one-notebook{
  width: 3.4rem;
}
.one-notebook-img{
  position: relative;
  width: 3.4rem;
  height: 3.4rem;
  border-radius: .2rem;
  overflow:hidden;
  background-color: rgb(188,122,255);
}
.one-notebook-img img{
  min-width: 100%;
  min-height: 100%;
}
/* 日记本介绍 */
.one-notebook-desc{
  position:absolute;
  top: .2rem;
  left: .2rem;
  right: 0;
  height: .46rem;
  line-height: .46rem;
  color: #fff;
  font-size: .26rem;
}
.one-notebook-desc-time{
  display: inline-block;
  width: .86rem;
  text-align:center;
  border-radius: .2rem;
  height: 100%;
  background-color: rgba(188,122,255,.7);
}
.one-notebook-desc-text{
  margin-left: .12rem;
}
/* 日记本数量 */
.one-notebook-num{
  position: absolute;
  bottom: 0;
  right: 0;
  display: inline-block;
  border-top-left-radius: .2rem;
  height: .5rem;
  line-height: .5rem;
  width: .8rem;
  color: #fff;
  text-align: center;
  font-size: .26rem;
  background-color: rgba(0,0,0,.3);
}
/* 底部描述 */
.one-notebook-bottom-desc{
  margin-top: .24rem;
  margin-bottom: .4rem;
  display: flex;
  justify-content: space-between;
  font-size: .22rem;
  color:rgb(153,153,153);
}
.one-notebook-icon{
  display: inline-block;
  width: .3rem;
}
.one-notebook-icon-desc{
  margin-left: .15rem;
}
/* 没有日记本的显示 */
.diarynotebook-no-notebook{
  margin-top: 1.2rem;
  font-size: .24rem;
  color:#999;
  text-align: center;
}
</style>
