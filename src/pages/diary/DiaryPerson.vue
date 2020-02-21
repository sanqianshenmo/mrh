<template>
  <div v-show="isReady" class="diary-person-wrapper diary-person-bg">
    <!-- 共用 -->
    <HeaderBack class="diaryperson-diaryheader-header" :header="header" :isActionShow="false" :color="'rgb(214,83,228)'">
      <span class="notebook-num" v-show="false">1</span>
    </HeaderBack>
    <DiaryHeader
     @toTip="handleTipShow"
     :diaryHeader="personHeader"
     :isNotebook="true"
     class="mt-88">
     <div class="diaryperson-other-content">
       <span>日记本</span>
       <span>写真集</span>
       <span>微电影</span>
       <span>直播</span>
     </div>
     </DiaryHeader>
    <!-- 医生评价目前写死 to do -->
    <!-- 日记本类别 -->
    <DiaryTab v-show="false" :tabs="tabHeaderBook.tabs" :curIdx="tabHeaderBook.curIdx" @switchTab="switchBook"></DiaryTab>
    <div v-show="false" class="diary-person-boos-wrapper">
      <span class="notebook-num-big">1</span>
      <span class="ml80 notebook-num-big active">2</span>
    </div>
    <div class="diary-operation-wrapper pb20">
      <DiaryTabShow  :tabs="operationPart"></DiaryTabShow>
      <!--<DiaryOperation :content="headerInfo.operationPart"></DiaryOperation>-->
      <DiaryDoctor :doctor="doctor" :oriComments="comments"></DiaryDoctor>
    </div>
    <!-- 以img开头的 -->
    <div class="diaryperson-header-img-wrapper">
        <div class="diaryperson-header-img">
          <div class="left">
            <img src="./icon-doctor-comment.png" alt="">
            <span>{{doctor.name}}的评价</span>
          </div>
          <div class="right">
            <span>查看全部评价</span>
            <img src="./icon-aroow-right.png" alt="">
          </div>
        </div>
    </div>
    <div class="diaryperson-comment">
      <div class="diaryperson-comment-all">
        <span>5.0</span>
        <img class="star" src="./comment-star.png" v-for="(n,idx) in 5" :key="idx" alt="评星">
      </div>
      <div class="diaryperson-comment-parts">
        <div class="diaryperson-comment-between">
          <span>医院:5.0</span>
          <span>专业度:5.0</span>
          <span>医院评分:10分</span>
        </div>
        <div class="diaryperson-comment-between">
          <span>效果:5.0</span>
          <span>客服评分:10分</span>
          <span>医助评分:10分</span>
        </div>
        <div class="diaryperson-comment-between">
          <span>服务:5.0</span>
          <span>麻醉师评分:10分</span>
          <span>医生评分:10分</span>
        </div>
      </div>
    </div>
    <!-- 推荐商品 -->
    <DiaryGoods class="mt20" v-show="false"></DiaryGoods>
    <!--术前心情-->
    <div class="before-shu" v-if="headerInfo.preOperatImgs2List[0]">
      <div class="before-shu-top">术前心情</div>
      <div style="display: flex;overflow-x: auto">
        <div class="before-shu-bottom">
          <img :src="IMG_PREFIX + headerInfo.preOperatImgs2List[0] + ImgThumbnailPostfix" alt="">
        </div>
        <div class="before-shu-bottom" v-if="headerInfo.preOperatImgs2List[1]">
          <img :src="IMG_PREFIX + headerInfo.preOperatImgs2List[1] + ImgThumbnailPostfix" alt="">
        </div>
        <div class="before-shu-bottom" v-if="headerInfo.preOperatImgs2List[2]" style="margin-right: 0">
          <img :src="IMG_PREFIX + headerInfo.preOperatImgs2List[2] + ImgThumbnailPostfix" alt="">
        </div>
      </div>
    </div>
    <DiaryTab class="mt20" :tabs="tabHeader.tabs" :curIdx="tabHeader.curIdx" @switchTab="switchTab">
      <div class="diaryperson-order-wrapper" @click="switchOrder">
        <span>按时间{{orderText}}</span><img src="./icon-order.png" alt="排序图标">
      </div>
    </DiaryTab>
    <!-- 时间轴日记 -->
    <div class="operation-time-wrapper"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="diableLoad"
      infinite-scroll-immediate-check="true"
      infinite-scroll-distance="50">
      <DiaryBookDiary
      v-for="(diary,idx) in diaries"
      :diary="diary"
      :idx="idx"
      :key="idx"></DiaryBookDiary>
    </div>
    <div class="diaryperson-no-diary" v-show="diaries.length >= 1 && allLoaded">无更多日记</div>
    <div class="diaryperson-no-diary" v-show="diaries.length === 0 && allLoaded">暂无日记</div>
    <MoreLoading v-show="!allLoaded" class="mt-20" :queryLoading="queryLoading" :allLoaded="allLoaded"></MoreLoading>
    <Loading :isLoading="isLoading"></Loading>
    <TipPerson v-show="isTipShow" :person="person" @tipShow="handleTipShow" @submitTip="handleTip"></TipPerson>
  </div>
</template>

<script>
import {PARTNER} from '@/models'
import {IMG_PREFIX, TYPE_NAME_MAP, ImgThumbnailPostfix} from '@/common/config/config.js'
import { DIARY, TIP } from '@/models/index.js'
import HeaderBack from '@/components/common/HeaderBack/HeaderBack'
import DiaryHeader from '@/components/diary/DiaryHeader/DiaryHeader'
import DiaryOperation from '@/components/diary/DiaryOperation/DiaryOperation'
import DiaryDoctor from '@/components/diary/DiaryDoctor/DiaryDoctor'
import DiaryTab from '@/components/diary/DiaryTab/DiaryTab'
import DiaryTabShow from '@/components/diary/DiaryTabShow/DiaryTabShow'
import DiaryGoods from '@/components/diary/DiaryGoods/DiaryGoods'
import DiaryBookDiary from '@/components/diary/DiaryBookDiary/DiaryBookDiary'
import TipPerson from '@/components/diary/TipPerson/TipPerson'
import MoreLoading from '@/components/common/MoreLoading/MoreLoading'
import Loading from '@/components/common/Loading/Loading'
import { MessageBox, Toast } from 'mint-ui'

export default {
  name: 'DiaryPerson',
  components: {
    HeaderBack,
    DiaryHeader,
    DiaryOperation,
    DiaryDoctor,
    DiaryTab,
    DiaryGoods,
    DiaryBookDiary,
    TipPerson,
    MoreLoading, // 滚动加载
    Loading, // 其它数据请求时加载
    MessageBox,
    Toast,
    DiaryTabShow
  },
  data () {
    return {
      isReady: false, // 是否首次加载数据完毕
      isLoading: false, // 是否正在加载数据
      headerInfo: {}, // 头部相关信息
      header: {
        title: 'xx的微整日记本',
        action: '相册|视频'
      },
      tabHeaderBook: {
        tabs: [
          '整形',
          '微整',
          '植发'
        ],
        curIdx: 0
      },
      tabHeader: {
        tabs: [
          '恢复后',
          '恢复中',
          '手术前'
        ],
        curIdx: 0
      },
      tabType: null, // 类型切换后，后台传输值
      noteId: null, // 日记本id
      noteType: null, // 日记本类型，同时也是所有日记的类型
      comments: [], // 医生评价
      diaryBook: [],
      bookObj: { // 日记本请求数据的参数
        noteId: 0,
        type: 2, // 0:恢复前，1：恢复中，2：恢复后
        order: 'desc' // desc:倒序，asc：正序
      },
      isTipShow: false, // 打赏框
      // isCurUser: false, // 是否获得了当前用户信息
      // curUser: {}, // 当前用户信息
      // 初始化滚动加载相关参数
      queryLoading: false,
      diableLoad: false, // 是过滤器终止无限滚动 触发
      allLoaded: false,
      totalNum: 0,
      pageNum: 1,
      pageSize: 2,
      /* tabshow */
      operationPart: [],
      /* 图片地址 */
      IMG_PREFIX: IMG_PREFIX,
      ImgThumbnailPostfix: ImgThumbnailPostfix
    }
  },
  computed: {
    personHeader () {
      const diaryHeader = {
        headimgurl: null,
        nickname: 'xx',
        createTime: '20xx-xx-xx',
        curIdx: 'x', // 当前数量
        diaryIndex: 'x', // 当前数量
        place: '未知',
        viewNum: '??',
        sumPrice: 0 // 手术总价
      }
      let data = this.headerInfo
      // to do 有待简化 -- 数组遍历赋值
      diaryHeader.headimgurl = data.headimgurl
      diaryHeader.nickname = data.nickname
      // 这里应该是 日记本的创建时间
      diaryHeader.createTime = data.create_time
      // diaryHeader = this.diary.headimgurl
      diaryHeader.diaryIndex = data.diaryIndex
      if (data.place === undefined) {
        diaryHeader.place = '未知'
        // 这里可以请求嫱用户地址 保存用户地址 to do
      }
      diaryHeader.viewNum = data.viewNum
      /* 以下为头部关注所需要数据 */
      diaryHeader.userId = data.userId
      diaryHeader.hasConcern = data.hasConcern
      diaryHeader.sumPrice = data.sumPrice
      return diaryHeader
    },
    doctor () {
      // 与DirayItem相同
      let data = this.headerInfo
      let doctor = {
        doctorId: '',
        name: '',
        pic: '',
        pay: '',
        grade: null
      }
      // to do 假如键非常多
      doctor.doctorId = data.doctorId
      doctor.name = data.operationDoctor
      doctor.pic = IMG_PREFIX + data.doctorAvatar
      // doctor.pay = data.selectPrice
      doctor.pay = data.select_price
      doctor.grade = data.grade
      return doctor
    },
    diaries () {
      const diaries = []
      // 日记传值模板
      const diary = {
        id: '',
        createTimeFormat: '20xx-xx-xx', // 创建时间
        content: '内容',
        operationImgList: [],
        diffDay: 0, // 术后天数
        diaryIndex: 1, // 第几篇日记
        viewNum: 0,
        hasZan: false,
        zanNum: 0,
        commentNum: 0,
        tradeCount: 0 // 打赏总数
      }
      // 组装成新的日记列表
      this.diaryBook.forEach(item => {
        let temp = {}
        for (let key in diary) {
          if (diary.hasOwnProperty(key)) {
            if (item[key] !== undefined) {
              temp[key] = item[key]
            }
          }
        }
        diaries.push(temp)
      })
      return diaries
    },
    orderText () {
      if (this.bookObj.order === 'desc') {
        return '倒序'
      } else {
        return '正序'
      }
    },
    person () {
      const person = {
        name: '',
        avatar: ''
      }
      let curPerson = this.headerInfo
      person.name = curPerson.nickname
      person.avatar = curPerson.headimgurl
      return person
    }
  },
  methods: {
    init (self) {
      // 日记本头部相关信息
      self.isLoading = true
      self._getBookDetail(self, self.noteId, self.noteType)
      // 日记本下日记列表
      self.bookObj.noteId = self.noteId
      self._getDiaryList(self, 'diaryBook', self.bookObj, self.pageNum, self.pageSize)
    },
    _headerBackTitle (self) {
      let type = TYPE_NAME_MAP[self.noteType]
      if (type === undefined) {
        type = '整形'
      }
      self.header.title = self.headerInfo.nickname + '的' + type + '日记本'
    },
    switchBook (idx) {
      this.tabHeaderBook.curIdx = idx
      // 切换值
    },
    switchTab (idx) {
      const self = this
      if (this.tabHeader.curIdx === idx) {
        return
      }
      this.tabHeader.curIdx = idx
      const idxTypeTable = {
        0: 2, // 恢复后
        1: 1, // 恢复中
        2: 0 // 恢复前
      }
      if (idx === 1) {
        self.isLoading = true
        PARTNER.getMsg().then(res => {
          self.isLoading = false
          if (res.data.retCode === 0) {
            if (res.data.data.rule === 15) {
              MessageBox.alert('完成认证,可以查看全部日记', '无法查看', {
                closeOnClickModal: false
              }).then(action => {
                this.$router.push({name: 'user.setup'})
              })
            } else {
              self.diaryBook = []
              self.pageNum = 1
              self.allLoaded = false
              self.bookObj.type = idxTypeTable[idx]
              self._getDiaryList(self, 'diaryBook', self.bookObj, self.pageNum, self.pageSize)
            }
          } else if (res.data.retCode === 40002) {
            console.log('token失效')
          } else {
            MessageBox.alert('获取权限失败', '出错了', {
              closeOnClickModal: false
            })
          }
        })
      } else {
        self.diaryBook = []
        self.pageNum = 1
        self.allLoaded = false
        // self._resetList() // 通过函数时，下面的数据不会改变，原因不清楚
        self.bookObj.type = idxTypeTable[idx]
        self._getDiaryList(self, 'diaryBook', self.bookObj, self.pageNum, self.pageSize)
      }
    },
    switchOrder () {
      // 切换日记列表排序
      const self = this
      let curOrder = self.bookObj.order
      if (curOrder === 'desc') {
        curOrder = 'asc'
      } else {
        curOrder = 'desc'
      }
      self.bookObj.order = curOrder
      // 重置
      self.diaryBook = []
      self.pageNum = 1
      self._getDiaryList(self, 'diaryBook', self.bookObj, self.pageNum, self.pageSize)
    },
    _resetList () {
      self.diaryBook = []
      self.pageNum = 1
    },
    handleTipShow (isOpen) {
      const self = this
      // if (isOpen) {
      //   // 无法改变 isTipShow的值
      //   // 可能原因：网络错误，其它错误导致它不能运行
      //   if (self.isCurUser) {
      //     self.isTipShow = true
      //   } else {
      //     self.isLoading = true
      //     self._getCurUser(self)
      //   }
      // } else {
      //   self.isTipShow = false
      // }
      if (isOpen) {
        self.isTipShow = true
      } else {
        self.isTipShow = false
      }
    },
    handleTip (tip) {
      const self = this
      let data = this.headerInfo
      let userId = data.userId
      let tradeType = tip.tipway
      let money = tip.num
      self.isLoading = true
      TIP.user(userId, tradeType, money).then(res => {
        // console.log('res', res)
        self.isLoading = false
        if (res.data.retCode === 0) {
          Toast({
            message: `打赏成功`,
            duration: 1000
          })
          // 添加打赏信息
          self.isTipShow = false
        } else {
          Toast({
            message: `打赏失败，请稍后再试`,
            duration: 2000
          })
        }
      })
    },
    loadMore () {
      if (this.allLoaded) {
        this.diableLoad = true
        return
      }
      if (this.queryLoading) {
        return
      }
      this.pageNum++
      let self = this
      // 参数化 to do
      self._getDiaryList(self, 'diaryBook', self.bookObj, self.pageNum, self.pageSize)
    },
    _getBookDetail (self, noteId, noteType) {
      // noteType没有时请示数据会出错
      if (noteType === undefined || noteType === null) {
        noteType = 0
      }
      DIARY.bookDiaryDetail(noteId, noteType).then(res => {
        self.isLoading = false
        if (res.data.retCode === 0) {
          self.headerInfo = res.data.data
          self.operationPart = self.headerInfo.operationPart.split(',')
          self._headerBackTitle(self)
          self.isReady = true
        }
      })
    },
    _getDiaryList (self, receiverName, bookObj, pageNum, pageSize) {
      self.queryLoading = true
      DIARY.bookDiaryList(bookObj, pageNum, pageSize).then(res => {
        if (res.data.retCode === 0) {
          // 这里可不可以用哨兵呢？
          if (res.data.data.data.length === 0) {
            self.allLoaded = true
            self.diableLoad = true
            return
          }
          self[receiverName] = self[receiverName].concat(res.data.data.data)
          self[receiverName].forEach(item => {
            item.hasZan = false
          })
          self.queryLoading = false
          self.diableLoad = false
        } else if (res.data.retCode === 1) {
          // 没有数据
          self.queryLoading = false
          self.diableLoad = true
          self.allLoaded = true
        } else if (res.data.retCode === 40002) {
          console.log('token失效')
        } else {
          MessageBox.alert(res.data.retMsg, '错误', {
            closeOnClickModal: true
          })
        }
      })
    }
    // _getCurUser (self) {
    //   // 用于打赏
    //   CURUSER.info().then(res => {
    //     self.isLoading = false
    //     if (res.data.retCode === 0) {
    //       let data = res.data.data
    //       const person = {
    //         name: '',
    //         avatar: ''
    //       }
    //       person.name = data.nickname
    //       person.avatar = data.avatar
    //       self.curUser = person
    //       self.isTipShow = true
    //       self.isCurUser = true
    //     } else {
    //       Toast({
    //         message: `获取用户信息失败，请稍后再试`,
    //         duration: 2000
    //       })
    //     }
    //   })
    // }
  },
  created () {
    const self = this
    let query = self.$route.query
    self.noteId = query.noteId
    self.noteType = query.type
    self.init(self)
  }
}
</script>

<style>
.pt-10{
  padding-top: .1rem;
}
.pt-14{
  padding-bottom: .14rem;
}
.mt-10{
  margin-top: .1rem;
}
.mt20{
  margin-top: .2rem;
}
.ml60{
  margin-left: .6rem;
}
.ml80{
  margin-left: .8rem;
}
.mt-88{
  margin-top: .88rem;
}
.mr-64{
  float:right;
  margin-right: .64rem;
}
.pb-54{
  padding-bottom: .54rem;
}
.diary-person-bg{
  background-color: #F8F8F8;
}
.pb20{
  padding-bottom: .2rem !important;
}
/* 日记本详情专属修正字体空间--防止名字过长导致显示超出 */
.diaryperson-diaryheader-header .header-title{
  max-width: 5rem;
}
/* 总体包裹 */
.operation-time-wrapper{
  padding-left: .26rem;
  padding-right: .26rem;
}
/* 手术项 */
.diary-operation-wrapper{
  padding: 0 .2rem;
  background-color: #fff;
}
/* 日记标识数字 */
.diary-person-boos-wrapper{
  padding: .4rem 0 .18rem 0;
  display: flex;
  justify-content: center;
  background-color: #fff;
}
.notebook-num{
  display: inline-block;
  width: .32rem;
  height: .32rem;
  line-height: .32rem;
  border-radius: 50%;
  text-align: center;
  font-size: .28rem;
  color: #fff;
  background-image: linear-gradient(-135deg, rgba(215,86,228,1),rgba(188,122,255,1));
}
.notebook-num-big{
  display: inline-block;
  width: .6rem;
  height: .6rem;
  line-height: .6rem;
  border-radius: 50%;
  text-align: center;
  font-size: .4rem;
  color: rgb(153,153,153);
  background-color: #fff;
  box-shadow: 0 0 .1rem rgba(0,0,0,.5);
}
.notebook-num-big.active{
  box-shadow: 0 0 .1rem rgba(214,83,228,.5);
  color: rgb(214,83,228);
}
/* 新增医生评价--静态 */
.diaryperson-comment{
  padding:.16rem .2rem .3rem;
  color: #8c8c8c;
  background-color: #fff;
}
.diaryperson-comment-all{
  height: .6rem;
  line-height: .6rem;
  font-size: .3rem;
}
.diaryperson-comment-all > img.star{
  margin-left: .1rem;
  display: inline-block;
  width: .26rem;
  height: .26rem;
}
.diaryperson-comment-parts{
  font-size: .26rem;
  line-height: 1.8;
}
.diaryperson-comment-between{
  display: flex;
  justify-content: space-between;
}
.diaryperson-comment-start{
  display: flex;
  justify-content: flex-start;
}
/* 日记列表时间排序 */
.diaryperson-order-wrapper{
  position: absolute;
  right: .24rem;
  top: .46rem;
  line-height: .3rem;
  height: .3rem;
}
.diaryperson-order-wrapper span{
  font-size: .26rem;
  color: rgb(102,102,102);
}
.diaryperson-order-wrapper img{
  margin-left: .16rem;
  position: relative;
  top:.04rem;
  display: inline-block;
  width: .16rem;
}
/* 没有案例 */
.diaryperson-no-diary{
  padding: .2rem 0;
  text-align: center;
}
/* header-img */
.diaryperson-header-img-wrapper {
  margin-top: .2rem;
  background: #fff;
  /* padding: .3rem .2rem .36rem; */
  padding: .2rem .2rem .22rem;
  border-bottom: 1px solid #ebebeb;
}
.diaryperson-header-img{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.diaryperson-header-img .left{
  display: flex;
  align-items: center;
}
.diaryperson-header-img .left img{
  display: inline-block;
  width: .27rem;
  height: .31rem;
}
.diaryperson-header-img .left span{
  margin-left: .26rem;
  font-size: .26rem;
  /* color: rgb(34,34,34); */
  color: #8c8c8c;
}
.diaryperson-header-img .right{
}
.diaryperson-header-img .right img{
  display: inline-block;
  width: .11rem;
  height: .18rem;
}
/* 写真集、微电影、直播 */
.diaryperson-other-content{
  margin-top: .5rem;
  margin-bottom: -.12rem;
  display: flex;
  justify-content: space-around;
}
  /* 手术心情*/
.before-shu {
  background-color: #fff;
  margin-top: .2rem;
  margin-bottom: .2rem;
  padding: 0 .4rem;
}
.before-shu .before-shu-top {
  padding: .2rem 0;
  font-size: .3rem;
}
.before-shu .before-shu-bottom {
  display: inline-block;
  border-radius: .08rem;
  width: 3rem;
  /*height: 3rem;*/
  overflow: hidden;
  margin-right: .1rem;
  padding-bottom: .3rem;
}
.before-shu .before-shu-bottom img {
  border-radius: .08rem;
  width: 100%;
}
</style>
