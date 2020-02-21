<template>
  <div class="apply">
    <header>
      <div @click="goToUser">
        <img src="./back.png" alt="">
      </div>
      我的消息
    </header>
    <div  v-if="true">
      <div class="main-top">
        <!--<span :class="{active: whatShow === 0}" @click="changeShow(0)">全部</span>-->
        <!--<span :class="{active: whatShow === 1}" @click="changeShow(1)">私信</span>-->
        <span :class="{active: whatShow === 2}" @click="changeShow(2)">通知</span>
        <span :class="{active: whatShow === 6}" @click="changeShow(6)">评论</span>
        <span :class="{active: whatShow === 4}" @click="changeShow(4)">赞赏</span>
        <span :class="{active: whatShow === 5}" @click="changeShow(5)">打赏</span>
      </div>
      <div class="main">
        <!--<div v-if="whatShow === 0">
          <div class="box">
            <div class="box-doctory">
              <div class="box-doctory-left">
                <img src="./header.jpg" alt="">
              </div>
              <div class="box-doctory-right">
                <div class="box-doctory-right-top"><span>花朵朵</span>2018-3-20 20:18:12</div>
                <div class="box-doctory-right-bottom">评论了你的日记</div>
              </div>
              <div class="box-doctory-right-float">
                <span></span>
                <img src="./run.png" alt="">
              </div>
            </div>
            <div class="box-doctory">
              <div class="box-doctory-left">
                <img src="./header.jpg" alt="">
              </div>
              <div class="box-doctory-right">
                <div class="box-doctory-right-top"><span>花朵朵</span>2018-3-20 20:18:12</div>
                <div class="box-doctory-right-bottom">赞了你的日记</div>
              </div>
              <div class="box-doctory-right-float">
                <span></span>
                <img src="./run.png" alt="">
              </div>
            </div>
            <div class="box-doctory">
              <div class="box-doctory-left">
                <img src="./header.jpg" alt="">
              </div>
              <div class="box-doctory-right">
                <div class="box-doctory-right-top"><span>花朵朵</span>2018-3-20 20:18:12</div>
                <div class="box-doctory-right-bottom">打赏了你的日记 金积分300</div>
              </div>
              <div class="box-doctory-right-float">
                <span></span>
                <img src="./run.png" alt="">
              </div>
            </div>
            <div class="box-doctory">
              <div class="box-doctory-left">
                <img src="./ding.png" alt="">
              </div>
              <div class="box-doctory-right">
                <div class="box-doctory-right-top"><span>您的免费整形报名已提交成功</span></div>
                <div class="box-doctory-right-bottom">计划实施日期: 2018-12-15</div>
              </div>
              <div class="box-doctory-right-float">
                <img src="./run.png" alt="">
              </div>
            </div>
            <div class="box-doctory">
              <div class="box-doctory-left">
                <img src="./ding.png" alt="">
              </div>
              <div class="box-doctory-right">
                <div class="box-doctory-right-top"><span>今天该进行手术了，千万别忘了哦!</span></div>
                <div class="box-doctory-right-bottom">手术实施日期: 2018-12-15</div>
              </div>
              <div class="box-doctory-right-float">
                <img src="./run.png" alt="">
              </div>
            </div>
            <div class="box-doctory">
              <div class="box-doctory-left">
                <img src="./ding.png" alt="">
              </div>
              <div class="box-doctory-right">
                <div class="box-doctory-right-top"><span>您的日记本已创建成功</span></div>
                <div class="box-doctory-right-bottom">快来上传你的美容日记吧!</div>
              </div>
              <div class="box-doctory-right-float">
                <img src="./run.png" alt="">
              </div>
            </div>
            <div class="box-doctory">
              <div class="box-doctory-left">
                <img src="./doctory.png" alt="">
              </div>
              <div class="box-doctory-right">
                <div class="box-doctory-right-top"><span>刘婧杰医生在</span>2018-3-20 20:18:12</div>
                <div class="box-doctory-right-bottom">对您的手术进行了点评</div>
              </div>
              <div class="box-doctory-right-float">
                <img src="./run.png" alt="">
              </div>
            </div>
          </div>
        </div>
        <div v-if="whatShow === 1">
          <div class="box">
            <div class="box-doctory">
              <div class="box-doctory-left">
                <img src="./header.jpg" alt="">
              </div>
              <div class="box-doctory-right">
                <div class="box-doctory-right-top"><span>花朵朵</span>2018-3-20 20:18:12</div>
                <div class="box-doctory-right-bottom">评论了你的日记</div>
              </div>
              <div class="box-doctory-right-float">
                <span></span>
                <img src="./run.png" alt="">
              </div>
            </div>
            <div class="box-doctory">
              <div class="box-doctory-left">
                <img src="./header.jpg" alt="">
              </div>
              <div class="box-doctory-right">
                <div class="box-doctory-right-top"><span>花朵朵</span>2018-3-20 20:18:12</div>
                <div class="box-doctory-right-bottom">赞了你的日记</div>
              </div>
              <div class="box-doctory-right-float">
                <span></span>
                <img src="./run.png" alt="">
              </div>
            </div>
            <div class="box-doctory">
              <div class="box-doctory-left">
                <img src="./header.jpg" alt="">
              </div>
              <div class="box-doctory-right">
                <div class="box-doctory-right-top"><span>花朵朵</span>2018-3-20 20:18:12</div>
                <div class="box-doctory-right-bottom">打赏了你的日记 金积分300</div>
              </div>
              <div class="box-doctory-right-float">
                <span></span>
                <img src="./run.png" alt="">
              </div>
            </div>
            <div class="box-doctory">
              <div class="box-doctory-left">
                <img src="./doctory.png" alt="">
              </div>
              <div class="box-doctory-right">
                <div class="box-doctory-right-top"><span>刘婧杰医生在</span>2018-3-20 20:18:12</div>
                <div class="box-doctory-right-bottom">对您的手术进行了点评</div>
              </div>
              <div class="box-doctory-right-float">
                <img src="./run.png" alt="">
              </div>
            </div>
          </div>
        </div>-->
        <div v-if="whatShow === 2">
          <div class="box">
            <!--<div class="box-doctory">
              <div class="box-doctory-left">
                <img src="./ding.png" alt="">
              </div>
              <div class="box-doctory-right">
                <div class="box-doctory-right-top"><span>您的免费整形报名已提交成功</span></div>
                <div class="box-doctory-right-bottom">计划实施日期: 2018-12-15</div>
              </div>
              <div class="box-doctory-right-float">
                <img src="./run.png" alt="">
              </div>
            </div>
            <div class="box-doctory">
              <div class="box-doctory-left">
                <img src="./ding.png" alt="">
              </div>
              <div class="box-doctory-right">
                <div class="box-doctory-right-top"><span>今天该进行手术了，千万别忘了哦!</span></div>
                <div class="box-doctory-right-bottom">手术实施日期: 2018-12-15</div>
              </div>
              <div class="box-doctory-right-float">
                <img src="./run.png" alt="">
              </div>
            </div>
            <div class="box-doctory">
              <div class="box-doctory-left">
                <img src="./ding.png" alt="">
              </div>
              <div class="box-doctory-right">
                <div class="box-doctory-right-top"><span>您的日记本已创建成功</span></div>
                <div class="box-doctory-right-bottom">快来上传你的美容日记吧!</div>
              </div>
              <div class="box-doctory-right-float">
                <img src="./run.png" alt="">
              </div>
            </div>-->
            <div class="nomessage" v-if="sysNone">
              <img src="./none.png" alt="">
              <div>亲，您暂时还没有通知哦~</div>
            </div>
            <div class="box-doctory" v-for="sys in userSys" :key="sys.id">
              <div class="box-doctory-left">
                <img src="./ding.png" alt="">
              </div>
              <div class="box-doctory-right">
                <div class="box-doctory-right-top"><span>{{sys.title}}</span></div>
                <!--<div class="box-doctory-right-bottom">计划实施日期: 2018-12-15</div>-->
                <div class="box-doctory-right-bottom">{{sys.create_time}}</div>
              </div>
              <!--<div class="box-doctory-right-float">
                <img src="./run.png" alt="">
              </div>-->
            </div>
          </div>
        </div>
        <!--<div v-if="whatShow === 3">
          <div class="nomessage" v-if="commentNone">
            <img src="./none.png" alt="">
            <div>亲，您还没有报名免费整形哦~</div>
          </div>
          <ul class="shop-list clearfloat"
              v-infinite-scroll="loadMore1"
              infinite-scroll-disabled="moreLoading1"
              infinite-scroll-distance="0"
              infinite-scroll-immediate-check="false">
            <div class="box" v-for="userComment in userComments" :key="userComment.id">
              <div class="box-doctory">
                <div class="box-doctory-left">
                  <img :src="userComment.headimgurl" alt="">
                </div>
                <div class="box-doctory-right">
                  <div class="box-doctory-right-top"><span>{{userComment.nickname.substring(-1, 10)}}</span>{{userComment.create_time}}</div>
                  <div class="box-doctory-right-bottom">评论了你的日记</div>
                </div>
                <div class="box-doctory-right-float">
                  <span></span>
                  <img src="./run.png" alt="">
                </div>
              </div>
            </div>
          </ul>
          &lt;!&ndash; 底部判断是加载图标还是提示“全部加载” &ndash;&gt;
          <div class="more_loading" v-show="!queryLoading1">
            <div class="spinner-box">
              <mt-spinner type="fading-circle" color="#000000" :size="20" v-if="moreLoading1&&!allLoaded1"></mt-spinner>
            </div>
            <span v-if="moreLoading1&&!allLoaded1">正在加载...</span>
            <div v-if="!allLoaded1"></div>
            <div v-else>翻完了，没有更多了~</div>
          </div>
        </div>-->
        <div v-if="whatShow === 4">
          <show4></show4>
        </div>
        <div v-if="whatShow === 5">
          <show5></show5>
        </div>
        <div v-if="whatShow === 6">
          <show6></show6>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import router from '@/router'
import {USER} from '@/models/index'
import {Header} from 'mint-ui'
import show6 from '@/components/user/Message/show6'
import show5 from '@/components/user/Message/show5'
import show4 from '@/components/user/Message/show4'
Vue.component(Header.name, Header)
export default {
  name: 'message',
  data () {
    return {
      whatShow: 2,
      commentNone: false,
      zanNone: false,
      tradeNone: false,
      sysNone: false,
      userComments: [],
      userZans: [],
      userTrades: [],
      userSys: [],
      commentListPage: 1,
      zanListPage: 1,
      tradeListPage: 1,
      // 初始化无限加载相关参数
      // 评论
      queryLoading1: false,
      moreLoading1: false,
      allLoaded1: false,
      pageNum1: 1,
      totalNum1: 10,
      ifShowGoToTop: false,
      fullHeight1: document.documentElement.clientHeight,
      // 点赞
      queryLoading2: false,
      moreLoading2: false,
      allLoaded2: false,
      pageNum2: 1,
      totalNum2: 10,
      // 打赏
      queryLoading3: false,
      moreLoading3: false,
      allLoaded3: false,
      pageNum3: 1,
      totalNum3: 10
    }
  },
  components: {
    show6,
    show5,
    show4
  },
  methods: {
    // 封装关闭加载动画方法
    cancelLoading: function (self, loadTimeout, startTime) {
      clearTimeout(loadTimeout)
      const endTime = new Date()
      if (endTime - startTime >= 2000) {
        // 如果调用方法时大于2s，即已出现加载动画，需关闭加载动画
        self.$indicator.close()
      }
    },
    goToUser () {
      router.push('/user')
    },
    changeShow (val) {
      this.whatShow = val
    },
    loadMore1 () {
      if (this.allLoaded1) {
        this.moreLoading1 = true
        return
      }
      if (this.queryLoading1) {
        return
      }
      this.moreLoading1 = !this.queryLoading1
      this.commentListPage++
      USER.userComment(this.commentListPage, 10)
        .then(res => {
          this.totalNum1 = res.data.data.total
          let self = this
          self.userComments = self.userComments.concat(res.data.data.data)
          self.allLoaded1 = self.userComments.length === self.totalNum1
          self.moreLoading1 = self.allLoaded1
        })
        .catch(err => {
          console.log(err)
        })
    },
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
    loadMore3 () {
      if (this.allLoaded3) {
        this.moreLoading3 = true
        return
      }
      if (this.queryLoading3) {
        return
      }
      this.moreLoading3 = !this.queryLoading3
      this.tradesListPage++
      USER.userTrade(this.tradesListPage, 10)
        .then(res => {
          this.totalNum3 = res.data.data.total
          let self = this
          self.userTrades = self.userTrades.concat(res.data.data.data)
          self.allLoaded3 = self.userTrades.length === self.totalNum3
          self.moreLoading3 = self.allLoaded3
        })
        .catch(err => {
          console.log(err)
        })
    },
    goToZan (val) {
      router.push('/diary/detail?id=' + val)
    }
  },
  created () {
    // 延迟出加载动画
    let self = this
    self.startTime = new Date()
    self.loadTimeout = setTimeout(function () {
      self.$indicator.open()
    }, 1999)
    // 请求我的消息接口
    /* USER.userComment(1, 10)
      .then(res => {
        // console.log(res.data)
        if (res.data.retCode === 0) {
          this.userComments = res.data.data.data
          if (this.userComments.length === 0) {
            this.commentNone = true
          }
          this.cancelLoading(self, this.loadTimeout, this.startTime)
        }
      })
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
    USER.userTrade(1, 10)
      .then(res => {
        // console.log(res.data)
        if (res.data.retCode === 0) {
          this.userTrades = res.data.data.data
          if (this.userTrades.length === 0) {
            this.tradeNone = true
          }
        }
        // console.log(this.userTrades)
      }) */
    USER.userSys(1, 10)
      .then(res => {
        // console.log(res.data)
        if (res.data.retCode === 0) {
          /* console.log(res.data) */
          this.userSys = res.data.data.data
          if (this.userSys.length === 0) {
            this.sysNone = true
          }
          this.cancelLoading(self, this.loadTimeout, this.startTime)
        }
        // console.log(this.userTrades)
      })
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
    border-bottom: 2px solid #ececed;
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
