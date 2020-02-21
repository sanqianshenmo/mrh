<template>
    <div class="user-record">
      <header v-if="true">
        <div @click="goToUser">
          <img src="./back.png" alt="">
        </div>
        交易记录
      </header>
      <main v-if="recordNone">
        <div class="main-top">
          <span>支出金积分：0</span>
          <span>收入金积分：0</span>
        </div>
        <div class="norecord">
          <img src="./none.png" alt="">
          <div>亲，您暂时还没有交易记录哦！</div>
        </div>
      </main>
      <main >
        <div class="main-top" v-if="recordTop">
          <span>支出金积分：{{attach.total_pay}}</span>
          <span>收入金积分：{{attach.total_income}}</span>
        </div>
        <div class="bgfff"
             v-infinite-scroll="loadMore1"
             infinite-scroll-disabled="moreLoading1"
             infinite-scroll-distance="0"
             infinite-scroll-immediate-check="true">
          <div class="flex" v-for="recordItem in record.data" :key="recordItem.id">
            <div class="flex-left">
              <div class="flex-left-top">{{recordItem.tradeName}}</div>
              <div class="flex-left-bottom">{{recordItem.create_time}}</div>
            </div>
            <div class="flex-right" v-if="recordItem.type === 0">+{{Number(recordItem.money).toFixed(2)}}</div>
            <div class="flex-right" v-if="recordItem.type === 1">-{{Number(recordItem.money).toFixed(2)}}</div>
          </div>
        </div>
        <!-- 底部判断是加载图标还是提示“全部加载” -->
        <div class="more_loading" v-show="!queryLoading1">
          <div class="spinner-box">
            <mt-spinner type="fading-circle" color="#000000" :size="20" v-if="moreLoading1&&!allLoaded1"></mt-spinner>
          </div>
          <span v-if="moreLoading1&&!allLoaded1">正在加载...</span>
          <div v-if="!allLoaded1"></div>
          <div v-else>翻完了，没有更多了~</div>
        </div>
        <div class="to-top" @click="goToTop" v-if="ifShowGoToTop">
        </div>
      </main>
      <div class="img-box" v-show="isRouter" style="position: fixed; width: 100%; height:100%; top:0; left: 0; z-index: 9999; background-color: #fff;">
        <div style="padding: 20px; text-align: center;font-size: 16px">
          您的网络开小差啦 点下面刷新重试吧
        </div>
        <div>
          <div class="bottom-banner-join" style="padding: 26px 50px">
            <input type="button" value="刷新重试" class="join-input submit-input" @click="goToback">
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import {USER} from '@/models/index'
import router from '@/router'
export default {
  name: 'Record',
  data () {
    return {
      isRouter: false,
      record: [],
      attach: {},
      recordNone: false,
      recordTop: false,
      recordListPage: 1,
      // 初始化无限加载相关参数
      queryLoading1: false,
      moreLoading1: false,
      allLoaded1: false,
      pageNum1: 1,
      totalNum1: 10,
      // 返回顶部
      ifShowGoToTop: false,
      fullHeight: document.documentElement.clientHeight
    }
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
    goToback () {
      location.reload()// 重新加载页面
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
      this.recordListPage++
      USER.userRecord(this.recordListPage, 10)
        .then(res => {
          console.log(res.data.data)
          this.totalNum1 = res.data.data.total
          let self = this
          self.record.data = self.record.data.concat(res.data.data.data)
          self.allLoaded1 = self.record.data.length === self.totalNum1
          self.moreLoading1 = self.allLoaded1
        })
        .catch(err => {
          console.log(err)
        })
    },
    goToTop () {
      document.documentElement.scrollTop = document.body.scrollTop = 0
      this.ifShowGoToTop = false
    },
    menu () {
      this.fullHeight = document.documentElement.scrollTop || document.body.scrollTop
      /* console.log(this.fullHeight) */
    }
  },
  mounted () {
    window.addEventListener('scroll', this.menu)
  },
  watch: {
    fullHeight (n, o) {
      // console.log(n)
      let self = this
      if (n > 1200) {
        self.ifShowGoToTop = true
      } else if (n < 1200) {
        self.ifShowGoToTop = false
      }
    }
  },
  created () {
    // 延迟出加载动画
    let self = this
    self.startTime = new Date()
    self.loadTimeout = setTimeout(function () {
      self.$indicator.open()
    }, 1999)
    // 请求交易记录接口
    USER.userRecord(1, 10)
      .then(res => {
        if (res.data.retCode === 0) {
          this.record = res.data.data
          this.attach = res.data.attach
          this.recordTop = true
          if (this.record.length === 0) {
            this.recordNone = true
          }
          this.cancelLoading(self, this.loadTimeout, this.startTime)
        }
      })
    // 延时跳转404页面
    setTimeout(function () {
      if (self.isReady === false) {
        self.isRouter = true
      }
    }, 10000)
  }
}
</script>

<style scoped>
.user-record header {
    padding: .3rem 0;
    text-align: center;
    font-size: .34rem;
    color: rgb(34,34,34);
    background-color: #fff;
    /*margin-bottom: .2rem;*/
    border-bottom: .01rem solid rgb(215,215,215);
  }
.user-record header img {
    width: .2rem;
    height: .35rem;
    position: absolute;
    padding-left: .4rem;
  }
.user-record .main-top {
  font-size: .28rem;
  line-height: .28rem;
  padding: .38rem .2rem;
  color: rgb(102,102,102);
  border-bottom: 1px solid #ccc;
}
.user-record .main-top span {
  padding-right: .6rem;
}
.user-record .flex {
  display: flex;
  margin: 0 .2rem;
  padding: .2rem 0;
  border-bottom: 1px solid #ccc;
}
.user-record .flex-left {
  flex: 1;
}
.user-record .flex-right {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.user-record .flex-left-top {
  padding: .2rem 0;
  font-size: .26rem;
  color: #000;
}
.user-record .flex-left-bottom {
  padding-bottom: .2rem;
  font-size: .24rem;
  color: rgb(153,153,153);
}
.user-record .flex-right {
  font-size: .36rem;
  color: rgb(214,83,228);
}
.bgfff {
    background-color: #ffffff;
  }
.norecord {
  background: #fff;
}
.norecord img {
  width: 3.32rem;
  height: 2.14rem;
  margin: 0 auto 1rem auto;
  padding-top: 2rem;
}
.norecord div {
  text-align: center;
}
/* 加载更多样式 */
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
/* 返回顶部样式 */
.to-top {
  position: fixed;
  right: .2rem;
  bottom: 1.8rem;
  background:  url("./gototop.png") no-repeat center center;
  width: 1rem;
  height: 1rem;
  background-size: 100% 100%;
}
</style>
