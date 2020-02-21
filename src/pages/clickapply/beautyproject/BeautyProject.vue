<template>
  <div v-show="isReady">
    <div class="complete" @click="hideShapIntro($event)">
      <div class="shape-items-header-wrapper">
        <span>选择项目：</span>
        <div class="shape-items-wrapper">
          <span class="project_right" v-if="shapes.length === 0">请选择项目</span>
          <div class="shape-item" v-for="(shape,idx) in shapes" :key="idx">
            {{shape.name}}<span class="shape-cancel-btn" @click="cancelItem(idx)">x</span>
          </div>
        </div>
      </div>
      <!-- 左侧主菜单 -->
      <div class="head-buttom">
        <ul class="left-list clearfix">
          <li :class="{change: cliCkChange === idx}"  @click="cliCk(idx)" :key="idx"  v-for="(category,idx) in allCategories" >{{category.name}}
          </li>
        </ul>
      </div>
      <!-- 右菜单详情 -->
      <div class="right-background-style clearfix">
        <div class="content" v-for="(item, idx) in curCategory" :key="idx">
          <div class="text-color">
            {{item.name}}
          </div>
          <!-- <div class="shape-item-wrapper"> -->
            <button class="option" @click="shapeIntro($event, caseShape)" v-for="(caseShape,idx) in item.caseList" :key="idx">{{caseShape.name}}</button>
          <!-- </div> -->
          <div class="right-line2"></div>
        </div>
        <!-- 具体项目体格介绍 -->
        <div ref="shape" v-show="isShow" @click="addItem" class="shape-intro case-style clearfix">
          <span class="value-amount"> 价值：{{curShape.price}}元</span>
          <!-- 这里的数据需不需要改？ -->
          <div>
            <span class="case-style-number">案例2000例</span>
            <span>视频 2000例</span>
          </div>
          <div>
            <span class="case-style-number">案例2000例</span>
            <span>视频 2000例</span>
          </div>
        </div>
      </div>
      <div class="following-buttom-style">
        <span>已选项目总价值：</span>
        <span>{{totalPrice}}元</span>
        <button class="bottom-button" :class="{active: shapes.length !== 0}" @click="gotoDoctor">
          <div class="bottom-next">下一步</div>
          <div class="bottom-money">只需{{depositText}}元会员费</div>
        </button>
      </div>
    </div>
    <Loading :isLoading="isLoading"></Loading>
  </div>
</template>

<script>
import { ENROLL } from '@/models/index.js'
import Loading from '@/components/common/Loading/Loading'
import { MessageBox } from 'mint-ui'

export default {
  name: 'beauty-project',
  components: {
    Loading,
    MessageBox
  },
  data () {
    return {
      isReady: false,
      isLoading: false,
      tabId: 1,
      cliCkChange: 0,
      isShow: false,
      allCategories: [
        {
          name: '吸脂',
          id: '1',
          caseList: [
            {
              name: '面部',
              id: '11',
              caseList: [
                {
                  id: '111',
                  name: '111djsd'
                },
                {
                  name: '111躯干',
                  id: '112',
                  caseList: []
                },
                {
                  name: '111躯干11',
                  id: '112',
                  caseList: []
                },
                {
                  name: '111躯干1122',
                  id: '112',
                  caseList: []
                },
                {
                  name: '111躯干112233',
                  id: '112',
                  caseList: []
                }
              ]
            },
            {
              name: '面部',
              id: '11',
              caseList: [
                {
                  id: '111',
                  name: '111djsd'
                },
                {
                  name: '111躯干',
                  id: '112',
                  caseList: []
                }
              ]
            }
          ]
        },
        {
          name: '2吸脂',
          id: '2',
          caseList: [
            {
              name: '2面部',
              id: '21',
              caseList: []
            },
            {
              name: '2躯干',
              id: '22',
              caseList: []
            }
          ]
        }
      ],
      curCategoryIdx: 0, // 关键数据
      curShape: { // 当前选中
        id: '0',
        name: '项目名称',
        price: 0
      },
      curShapBtn: null,
      shapes: [
        // {
        //   id: 0,
        //   name: '名称'
        // }
      ],
      depositeMoney: 0,
      // 当前地址url中的数据
      query: {
        max: 0, // 最高保证金
        type: null // 大的整形类型
      }
    }
  },
  computed: {
    curCategory () {
      return this.allCategories[this.curCategoryIdx].caseList
    },
    totalPrice () {
      let totalPrice = 0
      if (this.shapes.length !== 0) {
        totalPrice = this.shapes.reduce((sum, shape) => {
          return sum + Number(shape.price)
        }, 0)
        return totalPrice
      }
      return 0
    },
    depositText () {
      if (this.totalPrice <= Number(this.query.max)) {
        return this.totalPrice
      } else {
        // 这里需要改成文字 如五万元 -- 全局过滤器
        return this.query.max
      }
    }
  },
  methods: {
    cliCk (idx) {
      // console.log('idx', idx)
      this.curCategoryIdx = idx
      this.cliCkChange = idx
    },
    gotoDoctor () {
      if (this.shapes.length === 0) {
        return
      }
      let shapes = this._getShapeName(this.shapes, this.allCategories)
      let query = this.query
      query.project = shapes
      query.selectedItemsPrice = this.totalPrice
      this.$router.push({name: 'enroll.doctor', query: query})
    },
    _getShapeName (shapes, allCategories) {
      // 获得最终的整形名称
      let shapesArr = []
      shapes.forEach(shape => {
        let outerIdx = shape.outerIdx
        let outerName = allCategories[outerIdx].name
        let innerName = shape.name
        shapesArr.push(outerName + '--' + innerName)
      })
      return shapesArr.join(',')
    },
    shapeIntro: function (event, shape) {
      const self = this
      // 传递数据
      self.curShape = shape
      // 调整显示项目价格介绍
      self._shapeWin(self, event)
    },
    _shapeWin (self, event) {
      let btnEle = event.target
      // let btnLeft = btnEle.offsetLeft
      let btnTop = btnEle.offsetTop
      let btnHeight = btnEle.offsetHeight
      let top = btnTop + btnHeight + 10 + 'px'
      // let left = btnLeft
      let shapWin = self.$refs.shape
      shapWin.style.top = top
      // 首次改写显示；再次操作判定是否为同一个元素，是则隐藏，不是则显示另一个
      if (self.curShapBtn === null) {
        self.curShapBtn = event.target
        self.isShow = true
        return
      }
      // 同一个点击
      if (self.curShapBtn === event.target) {
        self.isShow = !self.isShow
        return
      }
      // 另一个点击
      self.curShapBtn = event.target
      self.isShow = true
    },
    hideShapIntro (e) {
      // 可以触发弹框按钮的标识
      if (e.target.className !== 'option') {
        // 隐藏显示
        this.isShow = false
      }
    },
    addItem () {
      // 防止重复添加，过滤项目
      let newId = this.curShape.id
      let isRepeat = this.shapes.some(shape => {
        return shape.id === newId
      })
      if (isRepeat) {
        return
      }
      // 保存当前大分类（最外层）索引，以方便获取最层 名称
      this.curShape.outerIdx = this.curCategoryIdx
      let curItem = JSON.parse(JSON.stringify(this.curShape))
      this.shapes.push(curItem)
    },
    cancelItem (idx) {
      // 删除选择的项目
      this.shapes.splice(idx, 1)
    }
  },
  created () {
    const self = this
    self.isLoading = true
    let selectedType = this.$route.query.type
    // 暂存query，用于向下一级传递 -- 感觉url中会显得非常长
    this.query = JSON.parse(JSON.stringify(this.$route.query))
    // 假如有人直接使用url访问怎么办？
    ENROLL.shapingItems(selectedType).then(res => {
      if (res.data.retCode === 0) {
        self.allCategories = res.data.data
        self.isReady = true
      } else {
        MessageBox.alert(res.data.retMsg, '错误', {
          closeOnClickModal: true
        })
      }
      self.isLoading = false
    })
  }
}
</script>

<style scoped>
  /*头部*/
  .shape-items-header-wrapper{
    z-index:1000;
    position: fixed;
    padding-left: .2rem;
    height: .9rem;
    line-height: .9rem;
    width: 100%;
    border-bottom: 1px solid #c0c0c0;
    background: #fff;
  }
  /*shape条目*/
  .shape-items-wrapper{
    position: absolute;
    top: 0;
    left: 1.6rem;
    right: 0;
    bottom: 0;
    white-space: nowrap;
    overflow-x: auto;
  }
  .shape-item{
    margin-left:.12rem;
    position: relative;
    display: inline-block;
    border-radius: .5rem;
    background-color: #f0f0f0;
    height: .5rem;
    line-height: .5rem;
    padding: 0 .2rem;
  }
  .shape-item:first-of-type{
    margin-left: .5rem;
  }
  .shape-item:last-of-type{
    margin-right: .5rem;
  }
  .shape-cancel-btn{
    position: absolute;
    display: inline-block;
    border-radius: 100%;
    top: -.2rem;
    right: -.1rem;
    width: .36rem;
    height: .36rem;
    line-height: .36rem;
    color: #fff;
    font-size: .24rem;
    text-align: center;
    background-color: red;
  }
  .head-buttom{
    padding-top: .9rem
  }
  /*右背景*/
  .right-background-style{
    background: #fff;
    /*height: 13rem;*/
    /*margin: 0 0 0 2.05rem;*/
    top: .9rem;
    left: 2.08rem;
    right: 0;
    position: absolute;
    bottom: .88rem;
    overflow: auto;
  }
  .left-list{
    float: left;
    position: fixed;
    width: 2.08rem;
  }
  /* 别人是怎么思考的？ */
  .left-list:before{
    content:'';
    position: fixed;
    top:0;
    bottom:0;
    background-color: #f8f8f8;
    width: 2.08rem;
    z-index: -1;
  }
  .complete li{
    margin: .01rem 0 0 0;
    padding: 0.2rem 0 0.2rem 0.2rem;
    border-left: 3px solid transparent;
  }
  .right-line2{
    z-index:1000;
    padding: 0.2rem 0 0.2rem 0.1rem;
    width: 100%;
    border-bottom: 1px solid #ebebeb;
  }
  .project_right{
    padding: 0 0 0 0.5rem;
    position: fixed;
  }
  /*点击时的样式*/
  .complete li.change{
    background: #fff;
    color: rgb(234,83,228);
    border-left-color: rgb(214,83,228);
  }
  .content{
    padding: .2rem 0 0.15rem 0.15rem;
  }
  .text-color{
    color: rgb(214,83,228);
  }
  /*右边项目样式*/
  .option{
    border-radius: 0.3rem;
    padding: 0.1rem;
    margin: 0.2rem 0.1rem 0 0;
    border: 0 solid #c0c0c0;
    width: auto;
    overflow: visible;
    cursor: pointer;
    background-color: #f0f0f0;
  }
  .option:focus{
    color: #fff;
    background-color: rgb(214,83,228);
  }
  /*底部样式*/
  .following-buttom-style{
    border-top: 1px solid #c0c0c0;
    background: #fff;
    position: fixed;
    width: 100%;
    bottom:0;
    padding: 0 0.1rem 0 0.2rem;
    margin: 0 0 0;
    height: 1rem;
    line-height: 1rem;
    color: rgb(214,83,228);
  }
  .bottom-button{
    float: right;
    padding: 0.1rem 0.2rem 0.25rem 0.2rem;
    margin: 0 0.1rem 0 0.1rem;
    border: 0 solid #c0c0c0;
    color: #c0c0c0;
    width: auto;
    overflow: visible;
  }
  .bottom-title{
    padding: .1rem 0;
    font-size: .26rem;
  }
  /*案例*/
  .case-style{
    display: inline-block;
    color: #fff;
    background-color: rgb(214,88,234);
    border: 0;
    width: 5rem;
    border-radius: .2rem;
    padding: .1rem;
  }
  .value-amount{
    padding: 0 2.6rem 0 0;
  }
  .case-style-number{
    padding: 0 1.5rem 0 0;
  }
  .clearfix:after{
    content:'';
    height:0;
    line-height: 0;
    display: block;
    visibility: hidden;
    clear: both;
  }
  /* 项目介绍小容器 */
  .shape-intro{
    position: absolute;
    z-index: 1000;
  }
  /* 提交按钮 */
  .bottom-button.active{
    background-color: rgb(214,83,228);
  }
  .bottom-button.active > .bottom-next{
    color: #FFF;
  }
  .bottom-button.active > .bottom-money{
    color: #ebebeb;
  }
</style>
