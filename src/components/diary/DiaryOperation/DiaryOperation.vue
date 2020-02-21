<template>
  <div class="case-opration-content">
    手术项：{{content}}
  </div>
</template>

<script>
export default {
  name: 'DiaryOpeation',
  props: {
    content: {
      type: String,
      default: '大腿后侧（双）吸脂，提臀吸脂，腰部-后腰，苹果肌脂肪填充，眉心脂肪填充，双眼皮起切开修复轻度'
    }
  }
}
</script>

<style scoped>
/* 案例手术内容 */
.case-opration-content {
  background-image: url('./bg-opearion.png');
  background-position: top .3rem left 0rem;
  background-size: .27rem .21rem;
  background-repeat: no-repeat;
  padding-top: .24rem;
  padding-bottom: .2rem;
  padding-left: .47rem;
  /* 背景图 */
  font-size: .24rem;
  color: rgb(214,83,228);
}
</style>
