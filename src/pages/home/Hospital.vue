<template>
  <div>
    <HeaderBack :isActionShow="false" :header="header" :color="'rgb(214,83,228)'"></HeaderBack>
    <div class="hospital-header-wrapper mt-88">
      <div class="hospital-img-wrapper">
        <img src="" alt="">
      </div>
    </div>
    <ContentHeader class="hospital-intro-title-wrapper" :title="'医院介绍'"></ContentHeader>
    <ContentText class="hospital-pos"></ContentText>
  </div>
</template>

<script>
import HeaderBack from '@/components/common/HeaderBack/HeaderBack'
import ContentHeader from '@/components/common/ContentHeader/ContentHeader'
import ContentText from '@/components/common/ContentText/ContentText'

export default {
  name: 'Hospital',
  components: {
    HeaderBack,
    ContentHeader,
    ContentText
  },
  data () {
    return {
      header: {
        title: '医院环境'
      }
    }
  }
}
</script>

<style scoped>
.mt-88{
  margin-top: .88rem;
}
.mt-108{
  margin-top: 1.08rem;
}
.hospital-header-wrapper{
  padding-top: .3rem;
  padding-left: .2rem;
  padding-right: .2rem;
  background-color: #fff;
  overflow: hidden;
}
.hospital-img-wrapper{
  height: 3.54rem;
  background-color: rgb(188,122,255);
  overflow: hidden;
}
/* hospital介绍文本标题 */
.hospital-intro-title-wrapper{
  padding: .4rem .2rem .34rem;
}
/* hospital文本位置 */
.hospital-pos{
  padding-top: .2rem;
  top: 5.86rem !important;
}
</style>
