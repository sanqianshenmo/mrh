<template>
  <div class="diary-header-wrapper">
    <ul class="diary-header">
      <li class="diary-header-item"
      v-for="(tab,idx) in tabs"
      :key="idx"
      :class="{active: idx === curIdx}"
      @click="switchTab(idx)"
      >
        <span>{{tab}}</span>
      </li>
      <slot></slot>
    </ul>
  </div>
</template>

<script>
/*
  使用组件：1.首页日记页（全部-微整）  2.个人日记中心（恢复中-恢复后），以及头部
*/
export default {
  name: 'DiaryTab',
  props: {
    tabs: {
      type: Array,
      default () {
        return ['tab1', 'tab2']
      }
    },
    curIdx: {
      type: Number,
      default: 0
    }
  },
  methods: {
    switchTab (idx) {
      this.$emit('switchTab', idx)
    }
  }
}
</script>

<style>
/* 日记导航 */
.diary-header-wrapper{
  position: relative;
  padding:.42rem .4rem 0rem;
  background-color: #fff;
  border-bottom:.02rem solid #eee;
}
.diary-header{
  display: flex;
  font-size: 0;
  text-align: center;
  overflow-x:auto;
}
.diary-header-item{
  flex-shrink: 0;
  margin-left: .6rem;
  padding-bottom: .3rem;
  font-size: .3rem;
  color: rgb(34,34,34);
}
.diary-header-item:first-of-type {
  margin-left: 0rem;
}
.diary-header-item.active {
  border-bottom:.04rem solid rgb(214,83,228);
  color: rgb(214,83,228);
}
</style>
