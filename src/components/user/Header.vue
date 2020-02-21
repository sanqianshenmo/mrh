<template>
  <ul class="header-wrapper">
    <li class="header-item" :class="{active: idx=== curIndex}" @click="addActive(idx)" v-for="(header,idx) in headers" :key="idx" >{{header}}</li>
  </ul>
</template>

<script>
export default {
  name: 'Header',
  props: {
    headers: {
      type: Array,
      Default () {
        return [
          '全部',
          '已下订',
          '已发货',
          '已收货',
          '已取消'
        ]
      }
    }
  },
  data () {
    return {
      curIndex: 0
    }
  },
  methods: {
    addActive (idx) {
      this.curIndex = idx
      // 传递事件进行对应请求
      this.$emit('activeIdx', idx)
    }
  }
}
</script>

<style scoped>
.header-wrapper {
  display: flex;
  box-sizing: border-box;
  padding: .2rem .2rem 0;
  background-color: #fff;
}
.header-item {
  flex:1;
  box-sizing: border-box;
  display: inline-block;
  height: .8rem;
  line-height: .8rem;
  border:.02rem solid rgb(188,122,255);
  border-left:none;
  text-align: center;
  color:rgb(188,122,255);
}
.header-item:first-child {
  border-left:.02rem solid rgb(188,122,255);
  border-radius: .06rem;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.header-item:last-child {
  border-right-width:.02rem;
  border-radius: .06rem;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
.active {
  color:#fff;
  background-color: rgb(188,122,255);
}
</style>
