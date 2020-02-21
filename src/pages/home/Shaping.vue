<template>
  <div>
    <HeaderBack :isActionShow="false" :header="header" :color="'rgb(214,83,228)'"></HeaderBack>
    <!-- 差两侧 <> -->
    <DiaryTab class="mt-108" :tabs="tabHeader.tabs" :curIdx="tabHeader.curIdx" @switchTab="switchTab"></DiaryTab>
    <div class="shaping-type-wrapper">
      <div class="shaping-type" v-for="(item, index) in tabs1" :key="index">
        <h3 class="shaping-type-title">
          <span class="shaping-cube-pointer"></span>
          {{item.name}}
        </h3>
        <ul class="shaping-type-items">
          <!--<li @click="gotoIntro" v-for="(n,idx) in item.caseList" :key="idx">{{n.name}}</li>-->
          <li v-for="(n,idx) in item.caseList" :key="idx">{{n.name}}</li>
        </ul>
      </div>
    </div>
    <v-drap></v-drap>
  </div>
</template>

<script>
import HeaderBack from '@/components/common/HeaderBack/HeaderBack'
import DiaryTab from '@/components/diary/DiaryTab/DiaryTab'
import VDrap from '@/components/common/Drap/Drap'
import {ENROLL} from '@/models'
// 标题信息太多时，打算的交互方式，位于最左侧时，显示右侧>；在最右而时，显示<；在中间时显示 < >
// 关键：如何设置 是不是位于中间？
export default {
  name: 'Shaping',
  components: {
    HeaderBack,
    DiaryTab,
    VDrap
  },
  data () {
    return {
      header: {
        title: '整形项目'
      },
      tsbs1: {},
      tabHeader: {
        tabs: [
          '吸脂',
          '自体脂肪填充',
          '胸部',
          '唇部',
          '下颌'
        ],
        curIdx: 0
      },
      oriData: []
    }
  },
  methods: {
    switchTab (idx) {
      // console.log(idx)
      this.tabHeader.curIdx = idx
      this.tabs1 = this.oriData[idx].caseList
      // console.log(this.tabs1)
    },
    gotoIntro () {
      this.$router.push({name: 'shaping.intro'})
    }
  },
  created () {
    ENROLL.shapingItems()
      .then(res => {
        console.log(res.data)
        if (res.data.retCode === 0) {
          this.oriData = res.data.data
          // 头部导航
          let tabs = []
          res.data.data.forEach(item => {
            tabs.push(item.name)
          })
          this.tabHeader.tabs = tabs
          // 首次显示
          // console.log(this.tabHeader.tabs)
          this.tabs1 = this.oriData[0].caseList
        }
      })
  }
}
</script>

<style>
.mt-108{
  margin-top: 1.08rem;
}
.shaping-type-wrapper{
  padding-left: .2rem;
  padding-right: .2rem;
  background-color: #fff;
}
/* 某个整形 */
.shaping-type{
  padding-top: .5rem;
}
.shaping-type:last-of-type{
  padding-bottom: .5rem;
}
/* 整形类别下的标题 */
.shaping-type-title{
  position: relative;
  height: .3rem;
  line-height: .3rem;
  font-size: .3rem;
  color:rgb(153,153,153);
  text-indent: .4rem;
}
.shaping-cube-pointer{
  display: inline-block;
  position: absolute;
  left:0;
  top: 50%;
  margin-top: -.1rem;
  width: .2rem;
  height: .2rem;
  transform: rotate(45deg);
  background-color: rgb(214,83,228);
}
/* 具体最小的部分 */
.shaping-type-items{
  padding-top: .2rem;
  display: flex;
  justify-content: flex-start;
  /* justify-content: space;   */
  flex-wrap: wrap;
}
.shaping-type-items li{
  margin-top: .1rem;
  margin-left: .1rem;
  border-radius: .06rem;
  width: 2.3rem;
  height: .62rem;
  line-height: .62rem;
  left: .62rem;
  text-align: center;
  color: rgb(34,34,34);
  background-color:rgb(243,245,247);
  overflow: hidden;
}
.shaping-type-items li:first-of-type{
  margin-left:0;
}
/* 每第4个元素 */
.shaping-type-items li:nth-child(3n+1){
  margin-left:0;
}
</style>
