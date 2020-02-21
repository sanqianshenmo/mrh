<template>
  <div class="paychoice-wrapper">
        <!-- <li>运费<span class="float-right color">￥<span id="yunfei">0.13</span></span></li> -->
    <h3 class="paychoice-title">支付方式选择</h3>
    <ul class="paychoice-list">
      <li @click="changeWay(pays.gold)"><i class="paychoice-radio" :class="{checked: pays.gold === curChoice}"></i>金积分支付</li>
      <!-- 存在问题暂时隐藏 to do -->
      <li v-if="false" @click="changeWay(pays.wxpay)"><i class="paychoice-radio" :class="{checked: pays.wxpay === curChoice}"></i>微信支付</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'PayChoice',
  data () {
    return {
      pays: {
        gold: 'gold',
        wxpay: 'wxpay'
      },
      curChoice: this.payway
    }
  },
  props: {
    payway: {
      type: String,
      default: 'gold'
    }
  },
  methods: {
    changeWay (payway) {
      this.curChoice = payway
      this.$emit('paychoice', payway)
    }
  }
}
</script>

<style>
.paychoice-wrapper{
  margin-top: .2rem;
  padding: 0 .3rem;
  background: #fff;
}
.paychoice-title{
  border-bottom: 1px solid #ebebec;
  min-height: .48rem;
  font-size: .3rem;
  padding: .2rem 0;
  line-height: .48rem;
  color: #656565;
}
/* 支付方式 */
.paychoice-list {
  padding: .16rem 0;
}
.paychoice-list > li {
  font-size: .28rem;
  padding: .1rem 0;
  line-height: .28rem;
  color: rgb(73,72,73);
}
.paychoice-radio{
    position: relative;
    top: 2px;
    display: inline-block;
    width: 4px;
    height: 4px;
    padding: 0;
    overflow: hidden;
    border-radius: 50%;
    background: #fff;
    margin-right: 10px;
    border: 5px solid #c8c8c8;
    display: inline-block;
}
.paychoice-radio.checked{
  border-color: rgb(214, 83, 228);
}
</style>
