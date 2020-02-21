<template>
  <div>
      <div class="gray-bg" @click="handleShow"></div>
      <div class="tip-wrapper">
          <div class="tip-img">
            <img :src="person.avatar" alt="">
          </div>
          <div class="tip-desc">
              <p class="tip-desc-bold">{{person.name}}</p>
              <p class="tip-desc-small">谢谢您对我的支持</p>
          </div>
          <div class="tip-action-wrapper">
            <div class="tip-action-way">
              <span>支付方式</span>
              <select class="tip-form-select" v-model="tip.tipway">
                <option value="1">金积分</option>
                <option value="2">银积分</option>
              </select>
            </div>
            <div class="tip-action-num">
              <input type="number" v-model="tip.num">
              <span>分</span>
            </div>
          </div>
          <button @click="rstSubmit" type="button" class="tip-btn">打赏</button>
      </div>
  </div>
</template>

<script>
import { MessageBox } from 'mint-ui'

export default {
  name: 'TipPerson',
  props: {
    person: {
      type: Object,
      default () {
        return {
          name: '姓名',
          avatar: null
        }
      }
    }
  },
  data () {
    return {
      tip: {
        tipway: '1',
        num: ''
      }
    }
  },
  methods: {
    handleShow () {
      this.$emit('tipShow', false)
    },
    rstSubmit () {
      // 发起请求
      // 打赏成功后提示
      let tip = this.tip
      // 验证打赏是否输入了数字 1.是否是数字 2.是否是小于0  3.是否是整数
      // 如何判断是不是 -- 当前type=number能够保证了只能输入数字 但是没有type=number怎么判断是不是数字呢？Number(tip.num) !== NaN 这个是错误的
      if (Number(tip.num) <= 0) {
        MessageBox.alert('请输入正确的打赏数', '注意', {
          closeOnClickModal: true
        })
        return
      }
      if (tip.num.indexOf('.') > -1) {
        MessageBox.alert('打赏数需要是整数', '注意', {
          closeOnClickModal: true
        })
        return
      }
      this.$emit('submitTip', tip)
    }
  }
}
</script>

<style>
.gray-bg {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    bottom: 0;
    background: rgba(0,0,0,.5);
    z-index: 100;
    overflow: auto;
}
/* 提醒框 */
/* iphone5se 还有问题 数位置直接不对 to do */
.tip-wrapper{
    position:fixed;
    left:50%;
    top:50%;
    z-index:100;
    transform: translate(-50%,-50%);
    box-sizing:border-box;
    border-radius: 6px;
    padding:.83rem 0 .6rem 0;
    /* 宽、高偶数--阻止tranlate造成的模糊 -- 不同手机显示不同，需要媒体查询改变 to do*/
    min-height: 5.8rem;
    min-width: 4.4rem;
    /* height: 4.33rem; */
    text-align: center;
    background-color:#fff;
}
/* 头像位置 */
.tip-img{
  height: 1.06rem;
  width: 1.06rem;
  border-radius: 50%;
  border: .06rem solid #fff;
  background-color: rgba(188,122,255,1);
  font-size: 0;
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  top: -.52rem;
  overflow: hidden;
}
.tip-img img{
  width: 100%;
}
/* 文字描述 */
.tip-desc-bold{
    font-size: 0.3rem;
    line-height: 1;
    color: rgb(56,55,56);
    text-align: center;
}
.tip-desc-small{
    margin-top: .22rem;
    padding: 0 0.5rem;
    font-size: 0.24rem;
    color: rgb(104,104,104);
    text-align: center;
}
.tip-btn {
    margin-top: .6rem;
    border:none;
    border-radius:.4rem;
    width:3.3rem;
    height:.8rem;
    font-size: .26rem;
    line-height: .8rem;
    color:#fff;
    background-color: rgba(188,122,255,1);
}

.tip-btn:active {
    background-color: rgba(188,122,255,.8);
}

/* 打赏动作相关 */
.tip-action-wrapper{
  margin-top: .64rem;
  padding:0 .3rem;
  font-size: .28rem;
  color: rgb(215,83,229);
}
.tip-action-way, .tip-action-num{
  display: flex;
  justify-content: space-between;
}
.tip-form-select{
  font-size: .28rem;
  color: rgb(215,83,229);
  padding-left: .5rem;
  background: url('select-arrow-down.png') no-repeat;
  background-size: .28rem .28rem;
  background-position: left 0 top .06rem;
}
.tip-action-num{
  margin-top: .2rem;
  box-sizing: border-box;
  height: .9rem;
  line-height: .9rem;
  border-top: 1px solid #ebebeb;
  border-bottom: 1px solid #ebebeb;
}
.tip-action-num input{
  text-align: center;
}
</style>
