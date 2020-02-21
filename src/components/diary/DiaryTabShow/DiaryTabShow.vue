<template>
  <div class="diary-header-wrapper-show">
    <ul class="diary-header-show">
      <li class="diary-header-item-show"
      v-for="(tab,idx) in tabs"
      :key="idx"
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
  name: 'DiaryTabShow',
  props: {
    tabs: {
      type: Array,
      default () {
        return ['tab1', 'tab2']
      }
    }
  }
}
</script>

<style>
/* 日记导航 */
.diary-header-wrapper-show{
  position: relative;
  padding:.2rem 0;
  background-color: #fff;
  border-bottom:.02rem solid #eee;
}
.diary-header-show{
  display: flex;
  font-size: 0;
  text-align: center;
  overflow-x:auto;
}
.diary-header-item-show{
  flex-shrink: 0;
  margin-left: .3rem;
  padding: .05rem .3rem;
  font-size: .2rem;
  color: #fff;
  border: 1px solid #bc7aff;
  background-color: rgba(188, 122, 255, 1);
  border-radius: 1rem;
}
.diary-header-item-show:first-of-type {
  margin-left: 0rem;
}
.diary-header-item-show.active {
  border-bottom:.04rem solid rgb(214,83,228);
  color: rgb(214,83,228);
}
</style>
