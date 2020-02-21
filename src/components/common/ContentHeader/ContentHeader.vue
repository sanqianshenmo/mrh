<template>
  <div class="content-header-wrapper">
    <div class="content-header-border">
      <span class="content-header-border-line"></span>
      <span class="content-header-border-txt">{{title}}</span>
    </div>
  </div>
</template>

<script>
/*
 * 使用区域：1.首页-整形项目介绍 2.首页-医院环境 3.日记详情-推荐商品（小组件）、用户评论
*/
export default {
  name: 'ContentHeader',
  props: {
    title: {
      type: String,
      default: '标题'
    }
  }
}
</script>

<style>
.content-header-wrapper {
    background-color: #fff;
    /* padding: .4rem .2rem .34rem; */
}
.content-header-border{
    font-size: 0;
}
.content-header-border-line {
    display: inline-block;
    width: .04rem;
    height: .26rem;
    background-color: rgb(214,83,228);
}
.content-header-border-txt {
    margin-left: .2rem;
    display: inline-block;
    font-size: 0.3rem;
    color: black;
}
</style>
