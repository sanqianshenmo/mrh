<template>
 <div class="diarycheck-wrapper" @click="gotoDiaryDetail">
   <div class="diarycheck-content-top">
    <h1 class="diarycheck-content-title">
      <span v-if="dirayState.timeType === 'create'">{{diary.createTimeFormat.slice(0,10)}}</span>
      <span v-else>{{diary.updateTimeFormat.slice(0,10)}}</span>
      <span v-if="dirayState.timeType === 'create'">星期{{diary.createTimeFormat|weekday}}</span>
      <span v-else>星期{{diary.updateTimeFormat|weekday}}</span>
      <!-- <span>天气</span> -->
      <span>第{{curIdx+1}}篇日志</span>
    </h1>
    <p class="diarycheck-content-main">{{diary.content}}</p>
    <!-- 图片展示 -->
    <div class="diarycheck-content-imgs-wrapper">
      <div class="diary-content-pic" v-for="(pic,idx) in pics" :key="idx">
        <img :src="pic" alt="案例图片">
      </div>
    </div>
    <div class="diarycheck-modify-wrapper" v-if="dirayState.isModifyShow" @click.stop="gotoModify">立即修改</div>
   </div>
   <div class="diarycheck-content-bottom">
     <!-- 以后可以支持点赞操作 to do -->
    <DiaryBottomStatics class="diarycheck-1px-gray" :diary="diary"></DiaryBottomStatics>
    <div class="check-diary-state">
      <div>状态：{{dirayState.stateText}} <span class="check-diary-state-rec" v-show="false">推荐</span></div>
      <div v-if="dirayState.isModifyShow">说明：{{diary.reason}}</div>
    </div>
   </div>
  </div>
</template>

<script>
import {IMG_PREFIX, ImgThumbnailPostfix} from '@/common/config/config.js'
import DiaryBottomStatics from '@/components/diary/DiaryBottomStatics/DiaryBottomStatics'

export default {
  name: 'DiaryCheckDiary',
  components: {
    DiaryBottomStatics
  },
  props: {
    diary: {
      type: Object
    },
    curIdx: {
      type: Number
    }
  },
  computed: {
    dirayState () {
      let state = this.diary.status
      const STATE_TEXT_TABLE = {
        0: '未审核',
        1: '审核通过',
        2: '审核未通过'
      }
      const dirayState = {
        stateText: STATE_TEXT_TABLE[state],
        isModifyShow: state === 2,
        timeType: 'create'
      }
      let reason = this.diary.reason
      if (state === 0 && (reason !== null || reason !== '')) {
        dirayState.timeType = 'update'
      }
      return dirayState
    },
    pics () {
      let num = this.diary.operationImgList.length
      if (num > 0) {
        return this.diary.operationImgList.map(item => {
          return IMG_PREFIX + item + ImgThumbnailPostfix
        })
      }
      return []
    },
    isLiked () {
      return this.diary.hasZan
    }
  },
  data () {
    return {
    }
  },
  methods: {
    gotoDiaryDetail () {
      let id = this.diary.id
      this.$router.push({name: 'diary.detail', query: {id}})
    },
    gotoModify () {
      let id = this.diary.id
      // let noteId = this.noteId
      let query = this.$route.query
      let noteId = query.noteId
      let date = query.date
      let noteIndex = query.noteIndex
      let noteType = query.noteType
      // console.log('query', query, 'noteId', noteId, 'date', date, 'noteIndex', noteIndex)
      // return
      this.$router.push({name: 'diary.modify', query: {id, noteId, noteIndex, date, noteType}})
    }
  },
  filters: {
    weekday (date) {
      let curDate = date.replace(/-/g, '/')
      let day = new Date(curDate).getDay()
      const numToZh = {
        '0': '天',
        '1': '一',
        '2': '二',
        '3': '三',
        '4': '四',
        '5': '五',
        '6': '六'
      }
      return numToZh[day]
    }
  }
}
</script>

<style>
.diarycheck-wrapper{
  padding-left: .2rem;
  padding-right: .2rem;
  padding-top: .2rem;
  margin-top: .2rem;
  background-color: #fff;
}
.diarycheck-wrapper:first-of-type{
  margin-top: 0;
}
.diarycheck-content-top{
  position: relative;
  padding: 0 .2rem .4rem;
  border-radius: .04rem;
  box-shadow: 0 0 0.04rem 0.04rem rgba(188,122,255,.06);
  overflow: hidden;
}
.diarycheck-content-title{
  padding: .26rem 0;
  display: flex;
  justify-content: space-between;
  color: #999;
  font-size: .2rem;
}
.diarycheck-content-main{
  margin-top: .1rem;
  margin-bottom: .34rem;
  font-size: .24rem;
  line-height: 1.4;
  color: rgb(102,102,102)
}
/* 上传的图片 */
.diarycheck-content-imgs-wrapper{

}
.diarycheck-content-imgs-wrapper > .diary-content-pic:nth-child(3n+1){
  margin-left:0;
}
.diary-content-pic{
  margin-top: .2rem;
  margin-left: .2rem;
  float:left;
  border-radius: .08rem;
  width: 2.1rem;
  height: 2.1rem;
  font-size:0;
  overflow: hidden;
}
.diary-content-pic > img {
  display: inline-block;
  min-width: 100%;
  min-height: 100%;
}
/* 底部数据与审核 */
.diarycheck-content-bottom{
  padding: .2rem .2rem .3rem;
}
.check-diary-state{
  margin-top: .2rem;
  color: #000;
  font-size: .24rem;
  line-height: 1.6;
}
.check-diary-state-rec{
  padding: 0 .1rem;
  border: 1px solid rgb(214,83,228);
  color: rgb(214,83,228);
  border-radius: .4rem;
  text-align: center;
}
/* 修改覆盖 */
.diarycheck-modify-wrapper{
  top: 0;
  left: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(214,83,228,.8);
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: .36rem;
  color: #fff;
}
.diarycheck-1px-gray{
  border-bottom: .02rem solid #ebebeb;
}
</style>
