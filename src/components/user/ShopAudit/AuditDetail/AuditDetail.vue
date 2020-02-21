<template>
  <div class="audit-detail-wrapper">
    <div class="audit-detail-text clearfix">
      <div class="audit-detail-text-title">店铺名称：</div>
      <div class="audit-detail-text-content">巴黎1984服饰</div>
    </div>
    <div class="audit-detail-img">
      <p>公司LOGO</p>
      <div class="audit-detail-img-logos-wrapper">
        <div class="audit-detail-img-logo">
          <img src="" alt="公司logo">
        </div>
      </div>
    </div>
    <div class="audit-detail-text clearfix">
      <div class="audit-detail-text-title">用户姓名：</div>
      <div class="audit-detail-text-content">张柏</div>
    </div>
    <div class="audit-detail-text clearfix">
      <div class="audit-detail-text-title">地址：</div>
      <div class="audit-detail-text-content">北京市昌平区平西府马连店嘉园</div>
    </div>
    <div class="audit-detail-img">
      <p>法人身份证</p>
      <div class="audit-detail-img-logos-wrapper">
        <div class="audit-detail-img-logo">
          <img src="" alt="公司logo">
        </div>
      </div>
    </div>
    <div class="audit-detail-img">
      <p>营业执照</p>
      <div class="audit-detail-img-logos-wrapper">
        <div class="audit-detail-img-logo">
          <img src="" alt="公司logo">
        </div>
        <div class="audit-detail-img-logo">
          <img src="" alt="公司logo">
        </div>
      </div>
    </div>
    <div class="audit-detail-text clearfix">
      <div class="audit-detail-text-title">经营项目：</div>
      <div class="audit-detail-text-content">北京市昌平区平西府马连店嘉园北京市昌平区平西府马连店嘉园</div>
    </div>
    <div class="audit-detail-text clearfix">
      <div class="audit-detail-text-title">店铺介绍：</div>
      <div class="audit-detail-text-content">北京市昌平区平西府马连店嘉园北京市昌平区平西府马连店嘉园</div>
    </div>
    <div class="audit-detail-action">
      <button class="audit-detail-btn" @click="handleAudit(false)">审核未通过</button>
      <button class="audit-detail-btn" @click="handleAudit(true)">审核通过</button>
    </div>
    <!-- 审核不通过 -->
    <div class="audit-tip-bg" v-show="tip.isShow" @click="hideTip"></div>
    <div class="audit-tip-fail" v-show="tip.isShow&&tip.type==='fail'">
      <p>请输入不通过原因</p>
      <textarea placeholder="请输入不通过原因..."></textarea>
      <button class="audit-detail-btn audit-detail-btn-fail" @click="handleAudit(false)">提交</button>
    </div>
    <div class="audit-tip-success" v-show="tip.isShow&&tip.type==='success'">
      恭喜，审核通过！！
    </div>
  </div>
</template>

<script>
export default {
  name: 'AuditDetail',
  data () {
    return {
      tip: {
        type: 'fail',
        isShow: false
      }
    }
  },
  methods: {
    handleAudit (bool) {
      this.tip.isShow = true
      if (bool) {
        this.tip.type = 'success'
        console.log('审核通过')
        // 跳走
      } else {
        this.tip.type = 'fail'
        // 跳走
        console.log('审核未通过')
      }
    },
    hideTip () {
      // 阻止提交过程中，取消弹框显示
      this.tip.isShow = false
    }
  },
  created () {
    console.log('this.$route', this.$route)
  }
}
</script>

<style>
.audit-detail-wrapper{
  box-sizing: border-box;
  min-height: 100%;
  padding: .2rem;
  border-radius: .04rem;
  background-color: rgb(251,246,253);
  font-size: .28rem;
}
.audit-detail-text{
  padding: .2rem 0;
  border-bottom: 1px solid #ebebeb;
  color: #999;
  min-width: .9rem;
  background-color: #fff;
}
.audit-detail-text-title{
  float:left;
  padding-left:.2rem;
}
.audit-detail-text > .audit-detail-text-content{
  color: #333;
  float:left;
  width: 5.4rem;
}
/* 图片+文字 */
.audit-detail-img{
  padding: .2rem .2rem;
  background-color: #fff;
  border-bottom: 1px solid #ebebeb;
}
.audit-detail-img > p{
}
.audit-detail-img-logos-wrapper{
  text-align: center;
  margin-top: .2rem;
}
.audit-detail-img-logo{
  text-align: center;
  border: 1px solid;
  display: inline-block;
}
.audit-detail-img-logo img{
  display: inline-block;
  width: 100%;
}
.clearfix:after{
  visibility: hidden;
  display: block;
  font-size: 0;
  content: " ";
  clear: both;
  height: 0;
}
/* 按钮 */
.audit-detail-action{
  margin-top: .6rem;
  text-align: center;
}
.audit-detail-btn{
  vertical-align: top;
  box-sizing: border-box;
  border: none;
  border-radius: .3rem;
  width: 3.4rem;
  padding: 0rem .8rem;
  height: .7rem;
  line-height: .7rem;
  font-size: .34rem;
  color: #fff;
  background-image: linear-gradient(-135deg, rgba(215, 86, 228, 1), rgba(188, 122, 255, 1));
}
/* 审核通过 */
.audit-tip-success{
  position: fixed;
  background-color: rgb(251,246,253);
  border-radius: .3rem;
  text-align: center;
  padding: 1rem 0;
  font-size: .28rem;
  color: rgba(188, 122, 255, 1);
  width: 5rem;
  top: 50%;
  left: 50%;
  margin-left: -2.5rem;
  margin-top: -2.4rem;
}
/* 共同的背景 */
.audit-tip-bg{
  position: fixed;
  top:0;
  left:0;
  right:0;
  bottom:0;
  background-color: rgba(0,0,0,.3)
}
/* 审核不通过 */
.audit-tip-fail{
  box-sizing: border-box;
  position: fixed;
  background-color: rgb(251,246,253);
  border-radius: .3rem;
  text-align: center;
  padding: .3rem;
  font-size: .28rem;
  color: rgba(188, 122, 255, 1);
  width: 5rem;
  top: 50%;
  left: 50%;
  margin-left: -2.5rem;
  margin-top: -2.4rem;
}
.audit-tip-fail p{
  text-align: left;
  line-height: 1;
  font-size: .28rem;
  color:  rgba(188, 122, 255, 1);
}
.audit-tip-fail textarea{
  margin: .2rem 0;
  resize: none;
  box-sizing:border-box;
  height: 2.5rem;
  padding: .2rem;
  border-radius: .4rem;
  line-height: 1.6;
  box-shadow: 0rem 0.01rem 0rem 0.01rem rgba(214, 83, 228,.3);
}
.audit-detail-btn-fail{
  height: .6rem;
  line-height: .6rem;
  font-size: .3rem;
  width: 100%;
}
</style>
