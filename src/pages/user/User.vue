<template>
  <div class="user">
    <div v-if="isReady">
      <header>
        <div class="user-header-title">
          <div class="float-left">
            <img :src="users.avatar" alt="" v-if="users&&users.avatar">
            <img src="./header.jpg" alt="" v-else>
          </div>
          <div class="box3">
            <div class="box4">{{users.nickname.substring(-1, 10)}}</div>
            <div class="box5" @click="goToRoute('/user/setup')" v-if="users.is_follow">&nbsp;&nbsp;&nbsp;&nbsp;已认证</div>
            <div class="box5" @click="goToRoute('/user/setup')" v-else>身份未认证</div>
          </div>
          <div class="set-up" @click="goToRoute('/user/setupshops')"></div>
        </div>
        <ul @click="goToRoute('/user/record')" v-if="users.is_follow">
          <li>
            <div class="color-main li-top">{{users.bak && users.bak.score1}}</div>
            <div class="color-main li-bottom">金积分</div>
          </li>
          <li class="left-border right-border">
            <div class="color-main li-top">{{users.bak && users.bak.score2}}</div>
            <div class="color-main li-bottom">银积分</div>
          </li>
          <li>
            <div class="color-main li-top">{{users.bak && users.bak.score}}</div>
            <div class="color-main li-bottom">零钱</div>
          </li>
        </ul>
      </header>
      <main>
        <!-- 会员中心列表 -->
        <ul class="user-nav clearfloat">
          <li><a @click="goToUrl('/user/apply')"><img src="./001.png">我的报名</a></li>
          <li class="left-borders right-borders"><a @click="goToUrl('/diary/notebook?check=true')"><img src="./002.png">我的日记</a></li>
          <li><a @click="goToUrl('/user/qrcode')"><img src="./003.png">我的二维码</a></li>
          <!--<li><a @click="goToRoute('/user/appoint')"><img src="./004.png">我的预约</a></li>-->
          <li><a @click="goToRoute('/user/message')"><img src="./005.png">我的消息</a></li>
          <li class="right-borders left-borders"><a @click="goToUrl('/user/myaddress')"><img src="./006.png">我的地址</a></li>
          <li><a @click="goToUrl('/user/order')"><img src="./007.png">商城订单</a></li>
          <li><a @click="goToChanges('/user/vip')"><img src="./008.png">扫码统计</a></li>
          <li class="left-borders right-borders"><a @click="goToRoute('/user/attention')"><img src="./009.png">我关注的</a></li>
          <li><a @click="goToChange('/user/alliance')"><img src="./010.png">加入联盟</a></li>
          <li><a @click="goToUrl('/user/record')" class="right-borders"><img src="./011.png">交易记录</a></li>
          <!--<li><a @click="goToUrl('/user/loan')" class="right-borders"><img src="./loan.png">我要借款</a></li>-->
          <!--<li class="right-borders left-borders"><a @click="goToUrl('/user/video')"><img src="./012.png">我的视频</a></li>-->
        </ul>
      </main>
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
    <v-drap></v-drap>
    <bottom-nav></bottom-nav>
  </div>
</template>

<script>
import router from '@/router'
import BottomNav from '@/components/common/BottomNav/BottomNav'
import VDrap from '@/components/common/Drap/Drap'
import {USER, PARTNER} from '@/models/index'
export default {
  name: 'User',
  data () {
    return {
      isReady: false,
      isRouter: false,
      users: [],
      per_info: ''
    }
  },
  components: {BottomNav, VDrap},
  comments: {
    BottomNav: 'bottom-nav',
    VDrap: 'v-drap'
  },
  created () {
    // 延迟出加载动画
    let self = this
    self.startTime = new Date()
    self.loadTimeout = setTimeout(function () {
      self.$indicator.open()
    }, 1999) // 定义2s后出加载动画的定时器
    USER.getUser()
      .then(res => {
        if (res.data.retCode === 0) {
          this.users = res.data.data
          this.cancelLoading(self, this.loadTimeout, this.startTime)
          this.isReady = true
        }
        console.log(res.data)
      })
    PARTNER.getMsg()
      .then(res => {
        console.log(res)
        if (res.data.retCode === 0) {
          this.per_info = res.data.data
          console.log(this.per_info)
        }
      })
    // 延时跳转404页面
    setTimeout(function () {
      if (self.isReady === false) {
        self.isRouter = true
      }
    }, 10000)
  },
  methods: {
    // 封装关闭加载动画方法的
    cancelLoading: function (self, loadTimeout, startTime) {
      clearTimeout(loadTimeout)
      const endTime = new Date()
      if (endTime - startTime >= 2000) {
        // 如果调用方法时大于2s，即已出现加载动画，需关闭加载动画
        self.$indicator.close()
      }
    },
    goToRoute (val) {
      router.push(val)
    },
    goToChange (val) {
      if (this.per_info.rule === 15 || this.per_info.rule === 16) {
        router.push(val)
      } else if (this.per_info.rule === 17) {
        if (this.per_info.is_shop === 0) {
          router.push(val)
        } else {
          router.push('/user/show')
        }
      } else {
        router.push(val)
      }
    },
    goToChanges (val) {
      if (this.per_info.rule === 16) {
        router.push('/user/my?parent_identify=' + this.per_info.identify_id)
      } else if (this.per_info.rule === 15) {
        router.push('/user/my?parent_identify=' + this.per_info.identify_id)
      } else {
        this.goToRoute('user/vip')
      }
    },
    goToback () {
      location.reload() // 重新加载页面
    },
    goToUrl (val) {
      /* if (this.per_info.rule === 15) {
        this.$messagebox('提示', '请进行个人信息认证')
          .then(res => {
            router.push('/user/setup')
          })
      } else {
        router.push(val)
      } */
      router.push(val)
    }
  }
}
</script>

<style scoped>
.user {
  padding-bottom: 1.5rem;
}
.left-border {
  border-left: 1px solid rgba(255,255,255,0.4);
}
.right-border {
  border-right: 1px solid rgba(255,255,255,0.4);
}
.left-borders {
  border-left: 1px solid #ececed;
}
.right-borders {
  border-right: 1px solid #ececed;
}
.float-left {
  float: left;
}
.float-right {
  float: right;
}
.color-main {
  color: #fff;
}
.li-top {
  font-size: .3rem;
  font-weight: bold;
  color: rgb(255,255,255);
}
.li-bottom {
  font-size: .28rem;
  color: rgb(255,255,255);
  padding-top: .2rem;
}
.user header {
  height: 3.9rem;
  background: url("./user-header-bg.png") no-repeat center center;
  background-size: 100% 3.9rem;
}
.user header .set-up {
  width: .36rem;
  height: .36rem;
  background: url("./setup-inco.png") no-repeat center center;
  background-size: 100% 100%;
  position: absolute;
  right: .2rem;
  top: .6rem;
}
.user header .box3 {
  float: left;
  color: #fff;
  margin-top: .3rem;
  padding-left: .21rem;
}
.user header .box3 .box4 {
  font-size: .32rem;
  color: rgb(254,254,254);
  font-weight: bold;
}
.user header .box5 {
  width: 1.4rem;
  margin-top: .2rem;
  margin-left: -1rem;
  padding-left: 1rem;
  padding-right: .2rem;
  background: -moz-linear-gradient(left, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%);
  background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(255,255,255,0)), color-stop(100%,rgba(255,255,255,1)));
  background: -webkit-linear-gradient(left, rgba(255,255,255,0) 0%,rgba(255,255,255,1) 100%);
  background: -o-linear-gradient(left, rgba(255,255,255,0) 0%,rgba(255,255,255,1) 100%);
  background: -ms-linear-gradient(left, rgba(255,255,255,0) 0%,rgba(255,255,255,1) 100%);
  background: linear-gradient(to right, rgba(255,255,255,0) 0%,rgba(255,255,255,1) 100%);
  z-index: 1;
  position: relative;
  border-radius: .3rem;
  font-size: .26rem;
  color: rgb(214,83,228);
  padding-top: 0.01rem;
  padding-bottom: 0.05rem;
}
.user header ul {
  height: 1rem;
  margin-top: .72rem;
}
.user .user-header-title {
  height: 1.5rem;
  margin: 0 .8rem;
  padding-top: .6rem;
}
.user header ul li {
  float: left;
  width: -webkit-calc((100% - 2px)/3);
  width: calc((100% - 2px)/3);
  text-align: center;
}
header img {
  width: 1.35rem;
  height: 1.35rem;
  border-radius: 50%;
  border: 4px solid #fff;
  position: relative;
  z-index: 2;
}

.user-nav { background: #fff; /*margin-top: .2rem;*/ padding-top: .26rem;font-size: .24rem;color: rgb(102,102,102)}
.user-nav li {   width: -webkit-calc((100% - 2px)/3);width: calc((100% - 2px)/3); float: left; text-align: center; }
.user-nav li a { display: block; color: #4e4e4e; padding: .28rem 0; border-bottom: 1px solid #ececed; }
.user-nav li img { width: .52rem; height: .52rem; display: block; margin: 0 auto .12rem; }
.bottom-banner-join {
  padding-top: .8rem;
}
.img-box {
  padding: 0 0;
}
.join-input {
  width: 100%;
}
.submit-input {
  color: #fff;
  background-color: rgb(254,121,163);
  outline: none;
  padding: 10px 0;
  border: none;
  border-radius: 50px;
  font-size: 15px;
}
</style>
