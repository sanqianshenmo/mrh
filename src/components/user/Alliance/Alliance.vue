<template>
  <div style="background-color:#fff">
    <HeaderBack :isActionShow="false" :header="header" :color="'rgb(214,83,228)'"></HeaderBack>
    <div class="enter-header">
      <img src="./join-zi.png" class="header-img"/>
    </div>
    <div style="padding: 0 32px; font-size: 12px; color: rgb(102,102,102);" class="top-banner">
      <div>
        <h2 style="color: rgb(254, 121, 163); padding-bottom: 26px;text-align:center;font-size:18px;">无风险、轻松、愉快，实现“逆向盈利·被动赚钱”</h2>
        <h2 style="color: rgb(254, 121, 163); padding-bottom: 26px;text-align:center;font-size:18px;">您+美美美=先机+行动+相信=简单+直接+快速=成功</h2>
        <div class="enter-h1">1. 万人兼职收入</div>
        <div class="enter-text">每年实现1名会员推荐，1位普通城市合伙人推荐，一年轻松实现19.4万收入 。</div>
        <div class="enter-h1">2. 千城百万新富</div>
        <div class="enter-text">每年实现3名会员推荐，3位普通城市合伙人推荐，一年轻松实现100万收入 。</div>
        <div class="enter-h1">3. 百城千万新贵</div>
        <div class="enter-text">每年实现10名会员推荐，10位普通城市合伙人推荐，一年轻松实现1000万收入 。</div>
      </div>
      <div class="top-banner" style="font-size:11px;padding:14px 0 0 0;">
        <h3>新商机、新互联、新医美、新模式、新平台</h3>
        <h3>新共生、新共建、新共享、新共赢、新共富</h3>
        <!--<div class="enter-text enter-text-padding">您只需在此页面底部申请，我们马上为您在线生成专属二维码，并立刻生成两套传播方案。</div>
        <div class="enter-text enter-text-padding">线上：将美美美免费整形及您店铺的优惠活动通过微信分享推荐给顾客，增加客流；</div>
        <div class="enter-text enter-text-padding">线下：可以生成易拉宝、店招、桌标等打印文件让到店消费顾客扫码获取免费整形及您店铺的优惠信息获取福利。</div>
        <div class="enter-text enter-text-padding">若扫您专属二维码的用户做了手术，您就可以获取收益！</div>
        <div class="enter-text enter-text-padding">收益及扫码人数可通过您的个人中心，7X24小时不间断查询，真正公开透明！</div>
        <div class="enter-text">若有疑问欢迎拨打 <span style="color: rgb(254,138,173)">400-091-6868</span> 咨询</div>-->
      </div>
      <div class="top-banner" style="text-align:center;">
        <h2 style="color: rgb(254, 121, 163); padding-top: 26px;">赚钱会上瘾 加盟无门槛</h2>
        <h2 style="color: rgb(254, 121, 163);">冷静学模式 成功要感恩</h2>
      </div>
      <div class="enter-bottom-button">
        <!--<div class="enter-bottom-button-join"  @click="handleJump('/user/shopjoin')">申请跨界合作</div>-->
        <div class="enter-bottom-button-join"  @click="handleJump('/user/setupshops')">申请跨界合作</div>
      </div>
    </div>
  </div>
</template>

<script>
import router from '@/router'
import {PARTNER} from '@/models'
import HeaderBack from '@/components/common/HeaderBack/HeaderBack'

export default {
  name: 'Alliance',
  components: {
      HeaderBack
    },
  data () {
      return {
        header: {
                title: '加入联盟'
              }
      }
    },
  methods: {
    handleJump (val) {
      PARTNER.getMsg()
        .then(res => {
          console.log(res)
          /*if (res.data.data.rule == 16) {
            this.$messagebox('提示', '请进行商家身份认证')
              .then(res => {
                router.push('/user/setupshops')
              })
          } else if (res.data.data.rule == 15) {
            this.$messagebox('提示', '请进行个人身份认证')
              .then(res => {
                router.push('/user/setup')
              })
          } else {
          */
            router.push('/user/setupshops')
          //}
        })
    }
  }
}
</script>

<style scoped>
.enter-header {
  background: url('./join-bg.jpg') no-repeat center center;
  background-size: 100% 100%;
}
.header-img {
  width: 100%;
  padding:0.9rem 0 0 0;
}
.enter-h1 {
  color: rgb(254, 138, 173);
  padding: 26px 0 0;
}
.enter-text {
  text-indent: 24px;
  line-height: 18px;
}
.enter-text-padding {
  padding-bottom: 26px;
}
.enter-bottom-button {
  padding: 5px 0 20px 0;
}
.enter-bottom-button-join {
  margin: 20px 70px;
  background-color: rgb(254,121,163);
  text-align: center;
  padding: 12px;
  font-size: 15px;
  color: #fff;
  border-radius: 25px;
}
.top-banner h2 h3{
    text-align: center;
    color: #B32436;
    padding: 5px 0;
  }
</style>
