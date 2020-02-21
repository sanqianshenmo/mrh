<template>
  <div class="home-case-pics">
    <div class="case-pic-wrapper" @click="gotoPersonDiary">
      <img :src="pics.preImg" alt="整形前" title="整形前">
      <span class="case-pic-tip">术前</span>
    </div>
    <div class="case-pic-wrapper" @click="gotoPersonDiary">
      <img :src="pics.afterImg" alt="整形后" title="整形后">
      <span class="case-pic-tip case-pic-tip-after">术后</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DiaryPics',
  props: {
    preImg: {
      type: String,
      default: null
    },
    afterImg: {
      type: String,
      default: null
    },
    pics: {
      type: Object
    }
  },
  methods: {
    gotoPersonDiary () {
      // 个人日志列表 -- 页面待出
      let noteId = this.pics.noteId
      let type = this.pics.type
      this.$router.push({name: 'diary.person', query: {noteId, type}})
    },
    gotoDiaryDetail () {
      // 某篇日志详情 -- 这个有多处使用：评论 to do
      // 当前问题 -- 刷新当前页面时（如网络较差时），id丢失 to do
      let id = this.pics.id
      let type = this.pics.type
      this.$router.push({name: 'diary.detail', query: {id, type}})
    }
  }
}
</script>

<style>
/* 案例 图片 */
.home-case-pics {
  display: flex;
  justify-content: space-between;
  font-size: 0;
}
.home-case-pics .case-pic-wrapper {
  position: relative;
  display: inline-block;
  border-radius: .2rem;
  height: 3.45rem;
  width: 3.45rem;
  overflow:hidden;
  font-size: 0;
  background-color: rgb(188,122,255);
}
.home-case-pics img{
  font-size: 0.24rem;
  /* width: 100%; */
  min-width: 100%;
  min-height: 100%;
}
.home-case-pics .case-pic-tip {
  position: absolute;
  bottom:0;
  left:0;
  display: inline-block;
  border-top-right-radius: .2rem;
  height: .36rem;
  line-height: .36rem;
  width: 1rem;
  color: #fff;
  text-align: center;
  font-size: .26rem;
  background-color: rgba(0,0,0,.7);
}
.home-case-pics .case-pic-tip-after {
  background-color: rgba(188,122,255,.7);
}
</style>
