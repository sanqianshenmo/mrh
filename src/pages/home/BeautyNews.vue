<template>
  <div class="beauty-news-wrapper">
    <HeaderBack :header="header" :isActionShow="false" :color="'rgb(214,83,228)'"></HeaderBack>
    <div class="beauty-news-title mt-88">
      <h3>特训营第8期开帷幕，队员热情空间高涨，成就非凡!</h3>
    </div>
    <div class="beauty-news-statics">
      <span>3874人阅读</span>
      <span class="ml-44">2918-04-23</span>
    </div>
    <div class="beauty-news-detail">
      <div class="beauty-news-detail-img">
        <img src="" alt="">
      </div>
      <p>北京美美美网络科技有限公司Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti magnam modi nobis, itaque suscipit deserunt laboriosam debitis error earum reiciendis ratione delectus labore hic optio et facilis explicabo atque minus?</p>
      <p>北京美美美网络科技有限公司Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti magnam modi nobis, itaque suscipit deserunt laboriosam debitis error earum reiciendis ratione delectus labore hic optio et facilis explicabo atque minus?</p>
    </div>
  </div>
</template>

<script>
import HeaderBack from '@/components/common/HeaderBack/HeaderBack'

export default {
  name: 'BeautyNews',
  components: {HeaderBack},
  data () {
    return {
      header: {
        title: '美美美'
      }
    }
  },
  created () {
    console.log('BeautyNews--created')
    document.body.style.backgroundColor = '#fff'
  },
  destroyed () {
    console.log('BeautyNews--destroyed')
    document.body.style.backgroundColor = '#f5f5f5'
  }
}
</script>

<style>
.mt-88{
  margin-top: .88rem;
}
.ml-44{
  margin-left: .44rem;
}
.beauty-news-wrapper{
  padding-left: .2rem;
  padding-right: .2rem;
}
.beauty-news-title{
  padding-top: .34rem;
  padding-bottom: .22rem;
  font-size: .36rem;
  line-height: 1.2;
  color: rgb(34,34,34);
}
.beauty-news-statics{
  margin-bottom: .3rem;
  height: .24rem;
  line-height: .24rem;
  font-size: .24rem;
  color: rgb(153,153,153);
}
/* 图片 */
/* 文字 */
.beauty-news-detail{
}
.beauty-news-detail-img{
  width: 7.1rem;
  height: 3.54rem;
  background-color: maroon;
}
.beauty-news-detail-img img{
  width: 100%;
}
.beauty-news-detail p{
  text-indent: .48rem;
  margin-top: .3rem;
  font-size: .24rem;
  line-height: 1.4;
  color: rgb(102,102,102);
}
</style>
