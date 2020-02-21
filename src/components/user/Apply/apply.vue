<template>
  <div class="apply">
    <header>
      <div @click="goToUser">
        <img src="./back.png" alt="">
      </div>
      我的报名
    </header>
    <div class="noapply" v-if="applyNone">
      <img src="./none.png" alt="">
      <div>亲，您还没有报名免费整形哦~</div>
    </div>
    <div class="box">
      <div class="shop-list clearfloat"
           v-infinite-scroll="loadMore1"
           infinite-scroll-disabled="moreLoading1"
           infinite-scroll-distance="0"
           infinite-scroll-immediate-check="true">
        <div v-for="item in apply" v-bind:key="item.id">
          <div class="col-lines"></div>
          <div class="box-top" v-if="item.type === 1">整形</div>
          <div class="box-top" v-else-if="item.type === 0">整形</div>
          <div class="box-top" v-else-if="item.type === 2">整形</div>
          <div class="box-top" v-else-if="item.type === 3">微整</div>
          <div class="box-top" v-else-if="item.type === 4">植发</div>
          <div class="box-bottom">
            <div class="box-bottom-left">
              <div class="box-bottom-left-top">
                <img src="./shu.png" alt="" >
                <div @click="propu(item.project)"><span>项目：</span>{{item.project}}</div>
                <mt-popup
                  v-model="popupVisible"
                  popup-transition="popup-fade">
                  <div class="popup-div">
                    {{popupText}}
                  </div>
                </mt-popup>
              </div>
              <div class="box-bottom-left-bottom">
                <img src="./day.png" alt="">
                <div><span>计划实行日期：</span>{{item.effectivedAt}}</div>
              </div>
            </div>
            <div class="box-bottom-right" v-if="item.isPledge === 1">
              <img src="./money.png" alt="">
              <div>已支付定金</div>
            </div>
            <div class="box-bottom-right" v-if="item.isPledge === 0">
              <img src="./no-money.png" alt="">
              <div>未支付定金</div>
            </div>
          </div>
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
    </div>
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
import Vue from 'vue'
import router from '@/router'
import {Header} from 'mint-ui'
import {USER} from '@/models/index'
Vue.component(Header.name, Header)
export default {
  name: 'apply',
  data () {
    return {
      isRouter: false,
      apply: [],
      applyNone: false,
      popupText: '',
      popupVisible: false,
      applyListPage: 1,
      // 初始化无限加载相关参数
      queryLoading1: false,
      moreLoading1: false,
      allLoaded1: false,
      pageNum1: 1,
      totalNum1: 10,
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
        /* console.log(111111111111) */
      }
    },
    goToUser () {
      router.push('/user')
    },
    goToback () {
      location.reload()// 重新加载页面
    },
    propu (val) {
      console.log(val)
      this.popupText = val
      this.popupVisible = true
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
      this.applyListPage++
      USER.userApply(this.applyListPage)
        .then(res => {
          this.totalNum1 = res.data.data.total
          let self = this
          self.apply = self.apply.concat(res.data.data.data)
          self.allLoaded1 = self.apply.length === self.totalNum1
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
    // 请求我的报名接口
    USER.userApply(1)
      .then(res => {
        /* console.log(res.data) */
        if (res.data.retCode === 0) {
          this.apply = res.data.data.data
          if (this.apply.length === 0) {
            this.applyNone = true
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
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 5.6rem;
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
.noapply {
  background: #fff;
}
.noapply img {
  width: 3.32rem;
  height: 2.14rem;
  margin: 0 auto 1rem auto;
  padding-top: 2rem;
}
.noapply div {
  text-align: center;
}
.mint-popup .popup-div {
  white-space: pre-wrap;
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
