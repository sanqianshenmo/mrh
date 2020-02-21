<template>
 <div class="diary-change-wrapper">
    <div class="diary-change-header">
      <img class="diary-change-header-img" src="./icon-time.png" alt="">
      <span class="diary-change-header-time">{{diary.createTimeFormat.slice(0,10)}}</span>
      <!-- 与正面什么区别？ -->
      <span class="diary-change-header-text">{{diaryDesc.text}}第{{diaryDesc.num}}天</span>
      <span class="diary-change-header-text" style="float:right">第{{idx+1}}篇日记</span>
    </div>
    <div class="diary-change-content-wrapper pb-54">
      <div class="diary-line-wrapper">
        <span class="diary-v-line-pointer"></span>
        <div class="diary-v-line"></div>
      </div>
      <div class="diary-change-content" @click="gotoDiaryDetail">
        <h1 class="diary-change-content-title">第{{diaryDesc.num}}天</h1>
        <p class="diary-change-content-main">{{diary.content}}</p>
        <!-- 比较富于多变化 -->
        <DiaryBookPics :pics="pics"></DiaryBookPics>
        <!-- 以后可以支持点赞操作 to do -->
        <DiaryBottomStatics :diary="diary"></DiaryBottomStatics>
      </div>
    </div>
  </div>
</template>

<script>
import DiaryBookPics from '@/components/diary/DiaryBookPics/DiaryBookPics'
import DiaryBottomStatics from '@/components/diary/DiaryBottomStatics/DiaryBottomStatics'

export default {
  name: 'DiaryBookDiary',
  components: {DiaryBookPics, DiaryBottomStatics},
  props: {
    diary: {
      type: Object,
      default () {
        return {
          id: 0,
          createTimeFormat: '20xx-xx-xx', // 创建时间
          content: '内容',
          operationImgList: [],
          diffDay: 0, // 术后天数
          diaryIndex: 1 // 第几篇日记
        }
      }
    },
    idx: {
      type: Number
    }
  },
  computed: {
    pics () {
      let num = this.diary.operationImgList.length
      let imgs = this.diary.operationImgList
      return {
        num: num,
        imgs: imgs
      }
    },
    isLiked () {
      return this.diary.hasZan
    },
    diaryDesc () {
      let diaryDesc = {
        text: '',
        num: '未知'
      }
      if (this.diary.diffDay === undefined) {
        return diaryDesc
      }
      if (this.diary.diffDay < 0) {
        diaryDesc.text = '术前'
      } else {
        diaryDesc.text = '术后'
      }
      diaryDesc.num = Math.abs(this.diary.diffDay)
      return diaryDesc
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
    }
  }
}
</script>

<style>
 /* 每篇日记 */
.diary-change-wrapper{
  position: relative;
}
/* 日记头部 */
.diary-change-header{
  padding-top: .4rem;
  padding-bottom: .5rem;
  font-size: 0;
}
.diary-change-header-img{
  margin-right: .17rem;
  display: inline-block;
  position: relative;
  top: .02rem;
  width: .26rem;
  height: .26rem;
}
.diary-change-header-time{
  margin-right: .29rem;
  font-size: .26rem;
  line-height: 1;
  color:rgb(214, 83,228);
}
.diary-change-header-text{
  font-size: .2rem;
  color: rgb(153,153,153);
}
/* 日记左侧线+右侧内容 */
.diary-change-content-wrapper{
  position: relative;
}
/* 线 */
.diary-line-wrapper{
  position: absolute;
  top:0;
  bottom: 0;
  width: .49rem;
}
.diary-v-line-pointer{
  position: absolute;
  top: -.14rem;
  left: .05rem;
  display: inline-block;
  width: .12rem;
  height: .12rem;
  border-radius: 100%;
  background-color: rgb(153,153,153);
}
.diary-v-line{
  margin-left: .09rem;
  height: 100%;
  width: .02rem;
  background-color: rgb(153,153,153);
}
/* 主体内容 */
.diary-change-content{
  margin-left: .49rem;
  background-color: #fff;
  padding-top: .34rem;
  padding-left: .34rem;
  padding-right: .34rem;
}
/* 主体文字 */
.diary-change-content{

}
.diary-change-content-title{
  font-size: .26rem;
  color: rgb(34,34,34);
}
.diary-change-content-main{
  margin-top: .34rem;
  margin-bottom: .34rem;
  font-size: .24rem;
  line-height: 1.4;
  color: rgb(102,102,102);
}
</style>
