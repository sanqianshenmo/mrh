<template>
    <div class="order_wrapper">
        <slot name="select"></slot>
        <div @click="gotoGoods" class="order-box clearfloat" :class="{'is-valid-wrapper': !isValid}">
            <img class="order-img" :src="imgSrc">
            <div v-if="!isValid" class="is-goods-valid">已失效</div>
            <p class="order-desc omit-two">{{good.name}}</p>
            <div class="order-price">
                <img src="./glod.png" alt="积分图标" class="glod-icon">
                <span class="order-price-text">金积分:</span>
                <span class="order-price-number" id="price">{{good.price1}}</span>
            </div>
            <!-- isValid 立即购买时，失效商品数量控制不可见 -->
            <slot name="num" v-if="isValid"></slot>
        </div>
    </div>
</template>

<script>
import {IMG_PREFIX} from '@/common/config/config.js'

export default {
  name: 'CartGoods',
  props: {
    good: {
      type: Object,
      required: true
    }
  },
  computed: {
    imgSrc () {
      return IMG_PREFIX + this.good.logo
    },
    isValid () {
      // 购物车商品是否失效的处理
      // 订单页的专门处理
      // 未知时，默认为正常
      if (this.good.state === undefined || this.good.state === null) {
        return true
      }
      // 商品状态:1正常，-1已删除，0已下架
      if (this.good.state === 1) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    gotoGoods () {
      // 添加我的-订单 商品可以直接跳转到 商城-商品详情
      if (this.$route.name === 'user.order') {
        this.$router.push(`/shop/${this.good.id}`)
      }
    }
  }
}
</script>

<style scoped>
/* 商品 */

/* common */
.omit-two{
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
.order_wrapper{
    position: realtive;
}
.order-box {
    overflow:hidden;
    position: relative;
}
.order-img {
    width: 1.88rem;
    height: 1.88rem;
    display: block;
    float: left;
    margin-right: .24rem;
}
.order-desc {
    margin-top:.28rem;
    color: rgb(56,56,56);
    font-size: 0.24rem;
    line-height: 1.6;
}
.order-price {
    position: absolute;
    display: inline-block;
    color:rgb(214,83,228);
    bottom: 0.2rem;
}
.order-price-text, .order-price-number{
    vertical-align: top;
    font-size: .28rem;
}
/* 商品失效 */
.is-valid-wrapper {
    -webkit-filter: grayscale(100%);
    -moz-filter: grayscale(100%);
    -ms-filter: grayscale(100%);
    -o-filter: grayscale(100%);
    filter: grayscale(100%);
    filter: gray;
}
.is-goods-valid{
    position:absolute;
    bottom:0;
    left:0;
    background-color: rgb(215,215,215);
    height: .4rem;
    width: 1.88rem;
    text-align: center;
    font-size: .28rem;
    color: rgb(102,102,102);
}

/* 空白时图片显示 */
#success>img, .zanwu img {
    width: 1.83rem;
    height: auto;
    display: block;
    margin: 0 auto;
    padding-top: 1.4rem;
}
#success p, .zanwu p {
    font-size: .32rem;
    text-align: center;
    padding: .3rem 0;
}
.glod-icon {
    display: inline-block;
    vertical-align: top;
    width: .3rem;
    height: .3rem;
  }
.clearfix:after {
    overflow: hidden;
    height:0;
    content:' ';
    display: block;
    clear: both;
}
</style>
