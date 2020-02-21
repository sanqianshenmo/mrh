<template>
  <div v-show="isReady" class="head-top clickapply-bg">
    <div class="head-background">
      <div class="cilckapply-second">
        <span class="img-style"><img src="./people.png"></span>
        <span class="cilckapply-top"> 您的推荐人:
        <span class="fise">美美美</span>
       </span>
      </div>
    </div>
    <div class="content-title">
      <span>选择想要报名的项目:</span>
    </div>
    <div class="content-background-color" v-for="(content, idx) in contents" v-bind:key="content.id">
      <div class="input-set">
        <div class="apply-radio-wrapper" @click="shopHon(idx)">
          <label  class="apply-radio" :class="{c: curIdx === idx}"></label>
          <span :class="{c: curIdx === idx}" class="font-color">{{content.title}}</span>
        </div>
        <div class="cilckapply-text">
          <span>{{content.msg}}包括：</span>
          <ul v-show="!content.isFold">
            <div
              v-for="item in content.project.split(',')"
              :key="item.id">{{item}}</div>
            <li>......</li>
            <li>项目完成后，美美美将按合同约定退还会员费。</li>
          </ul>
          <div class="line"></div>
          <div class="hidden"  @click="showToggle(idx)">
          {{content.foldText}}
            <img  v-show="content.isFold" src="./arrow-down-icon.png" class="hidden-1">
            <img v-show="!content.isFold" src="./arrow-up-icon.png" class="hidden-1">
          </div>
        </div>
      </div>
    </div>
    <div class="cilckapply-bnt1"><button class="clickapply-bnt" @click="gotoShapeitems">下一步</button></div>
    <Loading :isLoading="isLoading"></Loading>
  </div>
</template>

<script>
import { ENROLL } from '@/models/index.js'
import Loading from '@/components/common/Loading/Loading'
import { MessageBox } from 'mint-ui'

export default {
  name: 'ClickApply',
  components: {Loading, MessageBox},
  data () {
    return {
      isReady: false,
      isLoading: false,
      isFold: true, // 项目默认展开或收起，这里默认收起
      curIdx: 0,
      contents: []
    }
  },
  methods: {
    init (self) {
      ENROLL.mealList().then(res => {
        if (res.data.retCode === 0) {
          self.contents = res.data.data
          self.contents.forEach(content => {
            // 添加展开、展开文字新属性
            if (self.isFold) {
              self.$set(content, 'foldText', '展开')
            } else {
              self.$set(content, 'foldText', '收起')
            }
            self.$set(content, 'isFold', self.isFold)
          })
          self.isReady = true
        } else {
          MessageBox.alert(res.data.retMsg, '错误', {
            closeOnClickModal: true
          })
        }
        self.isLoading = false
      })
    },
    shopHon (idx) {
      this.curIdx = idx
    },
    gotoShapeitems () {
      let curContent = this.contents[this.curIdx]
      let selectedType = curContent.type
      let isIdentified = this.$route.query.isIdentified
      // type:0 -- 整形；4 -- 植发：
      // 3 -- 微整（直接跳转到点选医生)
      let max = curContent.price
      if (selectedType === 3) {
        // 保持与选择项目步骤后，同样的url结构
        this.$router.push({name: 'enroll.doctor', query: {isIdentified, type: selectedType, max: max, project: '', selectedItemsPrice: ''}})
        return
      }
      this.$router.push({name: 'enroll.shape', query: {isIdentified, type: selectedType, max: max}})
    },
    showToggle: function (idx) {
      console.log(idx)
      this.contents[idx].isFold = !this.contents[idx].isFold
      if (this.contents[idx].isFold) {
        this.contents[idx].foldText = '展开'
      } else {
        this.contents[idx].foldText = '收起'
      }
    }
  },
  created () {
    const self = this
    let query = JSON.parse(JSON.stringify(self.$route.query))
    // console.log('this.query', this.query)
    if (query.isIdentified === true || query.isIdentified === 'true') {
      self.isLoading = true
      self.init(self)
    } else {
      MessageBox.alert('请先进行个人信息认证', '注意', {
        closeOnClickModal: false
      }).then(action => {
        this.$router.push({name: 'user.setup'})
      })
    }
  }
}
</script>

<style scoped>
  .clickapply-bg{
    background: #f8f8f8;
  }
  .head-top{
    position: relative;
    padding: 0 0 1rem 0;
  }
  /*背景颜色*/
  .head-background{
    background-image: url(./first.jpg);
    width: 100%;
    height: 1rem;
  }
  .cilckapply-second{
    margin: 0 2.43rem 0 2.63rem;
  }
  .cilckapply-top {
    text-align: center;
    line-height: 1rem;
    color: rgb(255,255,255);

  }
  .fise{
    font-size: 0.26rem;
  }
  /*图片样式*/
  .img-style{
    width: 0.25rem;
    height: 0.26rem;
    position: absolute;
    right: 2.43rem;
    left: 2.23rem;
    top: 0.36rem;
    bottom: 0.36rem;
  }
  .content-background-color{
    background: #fff;
  }
  /*内容*/
  .content-title{
    font-size: 0.32rem;
    color: rgb(63,63,63);
    padding: 0.5rem 0 0 0.2rem;
    background-color: #fff;
  }
  input{
    -webkit-appearance: radio;
  }
  .apply-radio-wrapper{
    font-size: 0;
  }
  /*按钮样式*/
  .apply-radio{
    margin: 0 0 0 .2rem;
    display: inline-block;
    width: 0.14rem;
    height: 0.14rem;
    padding: 0;
    overflow: hidden;
    border-radius: 50%;
    background: #fff;
    vertical-align: bottom;
    border: 0.12rem solid #c8c8c8;
  }
  /*点击之后按钮和文字的样式*/
  .font-color.c{
    border-color: rgb(234,83,228);
    color: rgb(234,83,228);
  }
  .c{
    border-color: rgb(234,83,228);
    color: rgb(234,83,228);
  }

  .input-set{
    margin: 0 0 0.24rem 0;
    padding-top: 0.4rem;
  }
  .font-color{
    margin: 0 0 0 0.24rem;
    color: rgb(0,0,0);
    font-size: 0.3rem;
  }
  .cilckapply-text{
    font-size: 0.3rem;
    margin: 0.24rem 0.2rem 0 0.85rem;
    color: rgb(102,102,102);
    line-height: 0.44rem;
  }
  .line{
    border-bottom: 1px  solid rgb(215,215,215);
    margin: 0.24rem 0 0 0;
  }
  /*展开收起样式*/
  .hidden{
    margin: 0.3rem 0 0 2.5rem;
    padding: 0 0 0.4rem 0;
    position: relative;
    color: rgb(234,83,228);
  }
  .hidden-1{
    width: 0.18rem;
    height: 0.11rem;
    position: absolute;
    left: 0.8rem;
    bottom: 0.55rem;
  }
  /*底部按钮样式*/
  .clickapply-bnt{
    height: 1rem;
    color: rgb(255,255,255);
    border: 0 solid #bc7aff;
    background-color: #bc7aff;
    font-size: 0.36rem;
    width: 100%;
  }
  .cilckapply-bnt1{
    position: fixed;
    bottom: 0rem;
    width: 100%;
  }
</style>
