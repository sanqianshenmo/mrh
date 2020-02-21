<template>
  <div class="diary-date-header-wrapper">
    <div class="diary-date-header">
      <div class="day">
        <span>{{day}}</span>
      </div>
      <span class="date" :style="styleObject">{{date}}</span>
      <!-- 根据天气变成对应图标 to do -->
      <img style="visibility: hidden;" class="weather" src="./icon-weather.png" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: 'DiaryDate',
  props: {
    title: {
      type: String,
      default: '20xx-xx-xx'
    },
    color: {
      type: String
    }
  },
  computed: {
    date () {
      if (this.title) {
        let date = this.title.slice(0, 11).split('-')
        return date[0] + '年' + date[1] + '月' + date[2] + '日'
      }
      return '20xx-xx-xx'
    },
    day () {
      if (this.title) {
        let date = this.title.replace(/-/g, '/')
        let day = new Date(date).getDay()
        if (day === 0) {
          return 7
        }
        return day
      }
      return 'x'
    },
    styleObject () {
      if (this.color) {
        return {
          color: this.color
        }
      }
    }
  }
}
</script>

<style>
.diary-date-header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: .53rem;
}
.diary-date-header .day{
  position: relative;
  width: .51rem;
  height: .53rem;
  background: url(./icon-day.png) no-repeat center center;
  background-size: .51rem .53rem;
}
.diary-date-header .day > span{
  position: absolute;
  bottom: 0;
  right: .04rem;
  font-size: .3rem;
  color: rgb(214,83,228);
}
.diary-date-header .date{
  font-size: .36rem;
  color: rgb(34,34,34);
}
.diary-date-header .weather{
  display: inline-block;
  width: .35rem;
  height: .4rem;
}
</style>
