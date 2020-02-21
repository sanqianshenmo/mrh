<template>
  <div class="beauty-wrapper" @click="gotoNews">
    <HeaderBack :header="header" :isActionShow="false" :color="'rgb(214,83,228)'"></HeaderBack>
    <div class="beauty-news-list-wrapper mt-40">
      <div class="beauty-news">
        <div class="beauty-news-img">
          <img src="./banner.png" alt="">
          <span class="expert-pic-tip expert-pic-tip-after">2018-04-23</span>
        </div>
        <div class="beauty-news-content">
          <h3 class="beauty-news-content-title">
            美美美鉴证免费整形模式分享会隆重举行
          </h3>
          <p class="beauty-news-content-brief">
            此次分享会由代言人高可意优美的歌声拉开帷幕，高可意也是美美美代言人之一
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderBack from '@/components/common/HeaderBack/HeaderBack'

export default {
  name: 'Beauty',
  components: {HeaderBack},
  data () {
    return {
      header: {
        title: '美美美'
      }
    }
  },
  methods: {
    gotoNews () {
      this.$router.push({name: 'beauty.news'})
    }
  },
  created () {
    console.log('Beauty--created')
    document.body.style.backgroundColor = '#fff'
  },
  beforeDestroy () {
    // console.log('beforeDestroy--destroyed11111111')
    document.body.style.backgroundColor = '#f5f5f5'
  },
  destroyed () {
    // console.log('Beauty--destroyed2222222222')
    document.body.style.backgroundColor = '#f5f5f5'
  }
}
</script>

<style scoped>
/* html, body {
  min-height:100%;
  background-color: #fff;
} */
.mt-40{
  margin-top: .44rem;
}
.beauty-wrapper{
  padding-top: .88rem;
  padding-left: .2rem;
  padding-right: .2rem;
  /* background-color: #fff; */
}
/* 新闻 */
.beauty-news-list-wrapper{

}
.beauty-news{
  box-shadow: 0px 1px 10px #eee;
}
.beauty-news-img{
  border-top-left-radius: .2rem;
  border-top-right-radius: .2rem;
  position: relative;
  height: 3.54rem;
  overflow: hidden;
}
/* 图片日期标识  */
.expert-pic-tip {
    position: absolute;
    bottom: 0;
    left: 0;
    display: inline-block;
    border-top-right-radius: .3rem;
    height: .6rem;
    line-height: .6rem;
    width: 1.8rem;
    color: #fff;
    text-align: center;
    font-size: .24rem;
    background-color: rgba(0,0,0,.7);
}
.expert-pic-tip-after {
    background-color: rgba(188,122,255,.7);
}
/* 新闻介绍 */
.beauty-news-content{
  height: 2.3rem;
  padding-left: .2rem;
  padding-right: .2rem;
  overflow:hidden;
  background-color: #fff;
  border-bottom-left-radius: .2rem;
  border-bottom-right-radius: .2rem;
}
.beauty-news-content-title{
  padding-top:.4rem;
  padding-bottom:.3rem;
  line-height: .3rem;
  font-size: .3rem;
  color: rgb(34,34,34);
  border-bottom: 1px solid #ebebeb;
}
.beauty-news-content-brief{
  margin-top: .24rem;
  font-size: .24rem;
  color:rgb(102,102,102);
}
</style>
