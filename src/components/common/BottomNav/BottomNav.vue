<template>
  <div>
    <ul class="navfooter clearfloat">
      <li @click="goToRouter('/')">
        <a>
          <img v-show="ifChoose === '/'" class="nav-icon" src="./icon-home-active.png" alt="首页" tilte="首页">
          <img v-show="ifChoose !== '/'" class="nav-icon" src="./icon-home.png" alt="首页" tilte="首页">
          <p class="nav-text" :class="{color: ifChoose === '/'}">首页</p>
        </a>
      </li>
      <li @click="goToRouter('/diary')">
        <a>
          <img v-show="ifChoose === '/diary'" class="nav-icon" src="./icon-book-active.png" alt="日记" tilte="日记">
          <img v-show="ifChoose !== '/diary'" class="nav-icon" src="./icon-book.png" alt="日记" tilte="日记">
          <p class="nav-text" :class="{color: ifChoose === '/diary'}">日记</p>
        </a>
      </li>
      <li class="case-btn"  @click="goToRouter('/goddess')">
        <a>
          <img src="./icon-case.png" alt="女神" tilte="女神">
          <p class="nav-case-margin nav-text" :class="{color: ifChoose === '/goddess'}">汇美女神</p>
        </a>
      </li>
      <li @click="goToRouter('/shop')">
        <a>
          <img v-show="ifChoose === '/shop'" class="nav-icon" src="./icon-shop-active.png" alt="商城" tilte="商城">
          <img v-show="ifChoose !== '/shop'" class="nav-icon" src="./icon-shop.png" alt="商城" tilte="商城">
          <p class="nav-text" :class="{color: ifChoose === '/shop'}">商城</p>
        </a>
      </li>
      <li @click="goToRouter('/user')">
        <a>
          <img v-show="ifChoose === '/user'" class="nav-icon" src="./icon-user-active.png" alt="商城" tilte="商城">
          <img v-show="ifChoose !== '/user'" class="nav-icon" src="./icon-user.png" alt="个人中心" tilte="个人中心">
          <p class="nav-text" :class="{color: ifChoose === '/user'}">我的</p>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import router from '@/router'
export default {
  name: 'BottomNav',
  data () {
    return {
      ifChoose: ''
    }
  },
  methods: {
    goToRouter (val) {
      // console.log('val', val)
      router.push(val)
      this.ifChoose = val
    }
  },
  created () {
    this.ifChoose = this.$route.path
  }
}
</script>

<style scoped>
  /* 底部导航 */

 .navfooter {
    box-shadow: 0 0 0.06rem rgba(214, 83, 228,.3);
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background: #fff;
    border-top: 1px solid transparent;
    padding-top: .18rem;
    font-size: .24rem;
    z-index: 999
  }
  .navfooter li {
    width: 19%;
    float: left;
    text-align: center;
    line-height: .5rem;
  }
  .navfooter li.case-btn {
    width: 24%;
    position: relative;
  }
  .navfooter li.case-btn img {
     width: 70%;
     margin: -.64rem auto 0;
     /* margin: -.64rem auto .16rem; */
  }
  .nav-icon {
    margin-left:auto;
    margin-right:auto;
    width: .51rem;
    height: .47rem;
  }
  .nav-text {
    margin-top:.16rem;
    margin-bottom: .22rem;
    line-height:1;
  }
  /* 中间导航的文字间距特别处理 */
  .nav-case-margin {
    margin-top: .04rem;
    margin-bottom:0;
  }
  .clearfloat:after {
    visibility:hidden;
    content:"";
    font-size:0px;
    clear:both;
    height:0px;
    display:block;
  }
  .clearfloat {
    zoom:1
  }
 </style>
