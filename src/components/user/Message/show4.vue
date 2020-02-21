<template>
    <div>
      <div class="nomessage" v-if="zanNone">
        <img src="./none.png" alt="">
        <div>亲，暂时还没有人赞赏你的日记哦！</div>
      </div>
      <ul class="shop-list clearfloat"
          v-infinite-scroll="loadMore2"
          infinite-scroll-disabled="moreLoading2"
          infinite-scroll-distance="0"
          infinite-scroll-immediate-check="false">
        <div class="box" v-for="userZan in userZans" v-bind:key="userZan.id">
          <div class="box-doctory"  @click="goToNote(userZan.noteId)">
            <div class="box-doctory-left">
              <img :src="userZan.headimgurl" alt="">
            </div>
            <div class="box-doctory-right">
              <div class="box-doctory-right-top"><span>{{userZan.nickname.substring(-1, 10)}}</span>{{userZan.create_time}}</div>
              <div class="box-doctory-right-bottom">赞了你的日记</div>
            </div>
            <div class="box-doctory-right-float">
              <!--<span></span>-->
              <img src="./run.png" alt="">
            </div>
          </div>
        </div>
      </ul>
      <!-- 底部判断是加载图标还是提示“全部加载” -->
      <div class="more_loading" v-show="!queryLoading2">
        <div class="spinner-box">
          <mt-spinner type="fading-circle" color="#000000" :size="20" v-if="moreLoading2&&!allLoaded2"></mt-spinner>
        </div>
        <span v-if="moreLoading2&&!allLoaded2">正在加载...</span>
        <div v-if="!allLoaded2"></div>
        <div v-else>翻完了，没有更多了~</div>
      </div>
    </div>
</template>

<script>
import {USER} from '@/models'
import router from '@/router'

export default {
  name: 'show4',
  data () {
    return {
      zanNone: false,
      userZans: [],
      zanListPage: 1,
      // 初始化无限加载相关参数
      // 点赞
      queryLoading2: false,
      moreLoading2: false,
      allLoaded2: false,
      pageNum2: 1,
      totalNum2: 10,
      ifShowGoToTop: false,
      fullHeight1: document.documentElement.clientHeight
    }
  },
  methods: {
    loadMore2 () {
      if (this.allLoaded2) {
        this.moreLoading2 = true
        return
      }
      if (this.queryLoading2) {
        return
      }
      this.moreLoading2 = !this.queryLoading2
      this.zanListPage++
      USER.userZan(this.zanListPage, 10)
        .then(res => {
          this.totalNum2 = res.data.data.total
          let self = this
          self.userZans = self.userZans.concat(res.data.data.data)
          self.allLoaded2 = self.userZans.length === self.totalNum2
          self.moreLoading2 = self.allLoaded2
        })
        .catch(err => {
          console.log(err)
        })
    },
    goToNote (val) {
      router.push('/diary/detail?id=' + val)
    }
  },
  created () {
    USER.userZan(1, 10)
      .then(res => {
        // console.log(res.data)
        if (res.data.retCode === 0) {
          this.userZans = res.data.data.data
          if (this.userZans.length === 0) {
            this.zanNone = true
          }
        }
        // console.log(this.userZans)
      })
  },
  destroyed () {
    this.$indicator.close()
  }
}
</script>

<style scoped>
  .col-lines {
    float: left;
    width: .04rem;
    height: .26rem;
    background-color: rgb(214,83,228);
    margin-top: .48rem;
  }
  .box-bottom-left-top img {
    width: .25rem;
    height: .22rem;
    margin-top: .05rem;
    float: left;
  }
  .box-bottom-left-bottom img {
    width: .28rem;
    height: .28rem;
    float: left;
    padding-top: .28rem;
  }
  .box-bottom-left-bottom div {
    padding-top: .24rem;
    text-indent: .18rem;
    font-size: .26rem;
    color: rgb(102,102,102);
  }
  .box-bottom-left-top div {
    text-indent: .18rem;
    font-size: .26rem;
    color: rgb(102,102,102);
  }
  .box-bottom-left-top div span, .box-bottom-left-bottom div span {
    font-size: .26rem;
    color: rgb(61,61,61);
  }
  .box-bottom-right img {
    width: .26rem;
    height: .27rem;
    margin: 0 auto;
  }
  .box-bottom-right div {
    padding-top: .2rem;
    color: rgb(102,102,102);
    font-size: .24rem;
  }
  .box-bottom {
    display: flex;
    padding: .3rem 0 .28rem 0;
    border-bottom: 1px solid rgb(215,215,215);
  }
  .box-bottom-left {
    flex: 1;
  }
  .box {
    padding: 0 .2rem;
    background-color: #fff;
  }
  .box-top {
    padding: .4rem 0 .3rem 0;
    border-bottom: 1px solid rgb(215,215,215);
    text-indent: .2rem;
    font-size: .3rem;
    color: #000;
  }
  .box-top span {
    margin-left: .3rem;
    line-height: .24rem;
    font-size: .24rem;
    background: -moz-linear-gradient(left, #bc7aff 0%, #d653e4 100%);
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#bc7aff), color-stop(100%,#d653e4));
    background: -webkit-linear-gradient(left, #bc7aff 0%,#d653e4 100%);
    background: -o-linear-gradient(left, #bc7aff 0%,#d653e4 100%);
    background: -ms-linear-gradient(left, #bc7aff 0%,#d653e4 100%);
    background: linear-gradient(to right, #bc7aff 0%,#d653e4 100%);
    padding: .03rem .2rem 0 .2rem;
    color: #fff;
    border-bottom-left-radius: .1rem;
    border-top-right-radius: .1rem;
  }
  .apply header {
    padding: .3rem 0;
    text-align: center;
    font-size: .34rem;
    color: rgb(34,34,34);
    background-color: #fff;
    margin-bottom: .2rem;
  }
  .apply header img {
    width: .2rem;
    height: .35rem;
    position: absolute;
    padding-left: .4rem;
  }
  .nomessage {
    background: #fff;
  }
  .nomessage img {
    width: 3.32rem;
    height: 2.14rem;
    margin: 0rem auto 1rem auto;
    padding-top: 2rem;
  }
  .nomessage div {
    text-align: center;
  }
  .box-doctory {
    height: 1.46rem;
    border-bottom: 1px solid rgb(215,215,215);
    padding-bottom: .04rem;
  }
  .box-doctory-left,.box-doctory-right {
    float: left;
  }
  .box-doctory-right {
    margin: .4rem 0 .4rem 0;
  }
  .box-doctory-left img {
    width: .61rem;
    height: .61rem;
    border-radius: 50%;
    margin: .4rem .2rem .2rem 0;
  }
  .box-doctory-right-top {
    font-size: .22rem;
    color: rgb(153,153,153);
    line-height: .22rem;
  }
  .box-doctory-right-top span {
    color: rgb(0,0,0);
    font-size: .26rem;
    padding-right: .2rem;
  }
  .box-doctory-right-bottom {
    font-size: .24rem;
    color: rgb(102,102,102);
    line-height: .26rem;
    padding-top: .2rem;
  }
  .box-doctory-right-bottom span {
    font-size: .26rem;
  }
  .box-doctory-right-float {
    float: right;
    position: relative;
  }
  .box-doctory-right-float img {
    width: .15rem;
    height: .28rem;
    padding-right: .32rem;
    padding-top: .5rem;
  }
  .box-doctory-right-float span {
    width: .1rem;
    height: .1rem;
    background-color: red;
    border-radius: 50%;
    display: inline-block;
    position: absolute;
    top: .6rem;
    left: -.38rem;
  }
  .main-top {
    height: 1rem;
    background-color: #fff;
    border-bottom: 1px solid rgb(215,215,215);
    padding-left: .42rem;
    font-size: .3rem;
    color: rgb(34,34,34);
  }
  .main-top span {
    height: 1rem;
    line-height: 1rem;
    padding-bottom: .3rem;
    margin-right: .6rem;
  }
  .main-top span.active {
    color: rgb(214,83,228);
    border-bottom: 3px solid rgb(214,83,228);
  }
  .more_loading {
    height: 1.5rem;
    background-color: #fff;
    /*padding-bottom: 1rem;*/
  }
  .more_loading div {
    text-align: center;
  }
  .more_loading span:nth-child(1) div{
    margin-left: 45%;
  }
  .spinner-box {
    display: inline-block;
    padding-left: 40%;
    margin-top: .5rem;
  }
  .shop-list {
    background: #fff;
  }
</style>
