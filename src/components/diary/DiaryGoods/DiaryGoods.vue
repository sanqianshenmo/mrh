<template>
  <!-- 以border开头的 -->
    <div class="diary-goods-wrapper">
      <!-- title可以共用 -->
      <ContentHeader :title="'推荐商品'"></ContentHeader>
      <div class="mt-30">
        <ul class="diary-goods-ul">
          <li class="diary-goods" v-for="(good,idx) in goods" :key="idx" @click="gotoGood(good)">
            <div class="diary-goods-img">
              <img :src="good.src" alt="商品" title="商品">
            </div>
            <p class="diary-goods-desc omit-two">{{good.desc}}</p>
            <p class="diary-goods-price-wrapper">
              <img src="./icon-gold.png" alt="价格" title="价格">
              <span class="price">{{good.price}}</span>
            </p>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
import ContentHeader from '@/components/common/ContentHeader/ContentHeader'

export default {
  name: 'DiaryGoods',
  components: {ContentHeader},
  // 暂时写死
  data () {
    return {
      goods: [
        {
          id: '18827957544830',
          src: require('./s001.jpg'),
          desc: '2018新款山茶花透明水桶包',
          price: 398
        },
        {
          id: '76983732484917',
          src: require('./s002.jpg'),
          desc: '初恋珍藏干红葡萄酒礼盒装',
          price: 2980
        },
        {
          id: '15090410766222',
          src: require('./s003.jpg'),
          desc: '曹晓昕纯手工烧制-如意茶具',
          price: 1980
        },
        {
          id: '60226979221542',
          src: require('./s004.jpg'),
          desc: '养生天下素理劲酵素原液',
          price: 298
        }
      ]
    }
  },
  methods: {
    gotoGood (good) {
      let id = good.id
      this.$router.push({name: 'GoodsDetail', params: {id}})
    }
  }
}
</script>

<style scoped>
.mt-30 {
  margin-top: .3rem;
}
/* 商品 */
.diary-goods-wrapper{
  background-color: #fff;
  padding:.4rem .2rem .34rem;
}

.diary-goods-ul {
  font-size: 0;
}
.diary-goods {
  margin-left: .25rem;
  display: inline-block;
  width: 1.56rem;
}
.diary-goods:first-of-type{
  margin-left: 0;
}
.diary-goods-img{
  display: inline-block;
  width: 1.56rem;
  height: 1.56rem;
  border-radius: .1rem;
  overflow: hidden;
  background-color: rgba(188, 122, 255, 1);
}
.diary-goods-img img{
  width: 1.56rem;
  height: 1.56rem;
}
.diary-goods-desc {
  margin-top: .14rem;
  margin-bottom: .14rem;
  font-size: .26rem;
  color: black;
  line-height: 1.4;
}
.diary-goods-price-wrapper {
  height: .3rem;
  line-height: .3rem;
  font-size: 0;
}
.diary-goods-price-wrapper img {
  vertical-align: top;
  display: inline-block;
  width: .3rem;
  height: .3rem;
}
.diary-goods-price-wrapper .price {
  margin-left: .1rem;
  vertical-align: top;
  display: inline-block;
  height: .3rem;
  line-height: .3rem;
  font-size: .28rem;
  color: rgb(214,83,228);
}
</style>
