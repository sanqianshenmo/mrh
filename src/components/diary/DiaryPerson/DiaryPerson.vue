<template>
  <div class="case-god-title" @click="gotoDiaryPerson">
    <div class="case-god-img-wrapper">
      <img class="case-god-img" :src="avatar" alt="头像" title="案例女神头像">
    </div>
    <span class="case-god-name">{{nickname}}</span>
  </div>
</template>

<script>
export default {
  name: 'DiaryPerson',
  props: {
    avatar: {
      type: String,
      default: null
    },
    nickname: {
      type: String,
      default: 'XX'
    },
    noteId: {
      type: String
    },
    type: {
      type: String
    }
  },
  methods: {
    gotoDiaryPerson () {
      // 某个日记本（某次整形）下的个人中心
      let noteId = this.noteId
      let type = this.type
      this.$router.push({name: 'diary.person', query: {noteId, type}})
    }
  }
}
</script>

<style scoped>
.case-god-title {
  box-sizing: border-box;
  height: 1.2rem;
  padding-top: .3rem;
  padding-bottom: .3rem;
  font-size: 0;
}
.case-god-img-wrapper {
  vertical-align: top;
  display: inline-block;
  width: .6rem;
  height: .6rem;
  border-radius: 100%;
  background-color: #eeeeee;
  font-size: 0;
  overflow: hidden;
}
.case-god-img {
  vertical-align: top;
  display: inline-block;
  width: 100%;
  /* font-size: .24rem; */
}
.case-god-name {
  margin-left: .3rem;
  vertical-align: top;
  display: inline-block;
  height:.6rem;
  line-height: .6rem;
  font-size: .3rem;
  color: rgb(63,63,63);
}
</style>
