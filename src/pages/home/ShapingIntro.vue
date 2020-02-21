<template>
  <div>
    <HeaderBack :isActionShow="false" :header="header" :color="'rgb(214,83,228)'"></HeaderBack>
    <ContentHeader class="mt-108 shaping-intro-title-wrapper" :title="'介绍'"></ContentHeader>
    <ContentText></ContentText>
  </div>
</template>

<script>
import HeaderBack from '@/components/common/HeaderBack/HeaderBack'
import ContentHeader from '@/components/common/ContentHeader/ContentHeader'
import ContentText from '@/components/common/ContentText/ContentText'

export default {
  name: 'ShapingIntro',
  components: {
    HeaderBack,
    ContentHeader,
    ContentText
  },
  data () {
    return {
      header: {
        title: '整形项目' // 这个是动态值
      }
    }
  },
  created () {
    // 获得id再查询具体内容介绍；如果前一个页面，返回了所有内容，可以考虑本地永久存储来处理
  }
}
</script>

<style scoped>
.mt-108{
  margin-top: 1.08rem;
}
/* hospital介绍文本标题 */
.shaping-intro-title-wrapper{
  padding: .4rem .2rem .34rem;
}
</style>
