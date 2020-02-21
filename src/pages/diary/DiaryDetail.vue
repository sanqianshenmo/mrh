<template>
  <div class="diary-detail-bg" v-show="isReady">
    <!-- 共用 -->
    <HeaderBack @headerAction="gotoWrite" :header="header" :iconType="0" :color="'rgb(214,83,228)'"></HeaderBack>
    <DiaryHeader
    class="mt-88"
    @toTip="handleTipShow"
    :diaryHeader="diaryHeader"></DiaryHeader>
    <div class="diary-operation-wrapper">
      <!-- 手术内容 -->
      <DiaryOperation :content="diary.operationPart"></DiaryOperation>
    </div>
    <!-- 推荐商品 -->
    <DiaryGoods></DiaryGoods>
    <!-- 以img开头的 -->
    <div class="header-img-wrapper" @click="gotoNotebook">
        <div class="header-img">
          <div class="left">
            <img src="./icon-book.png" alt="">
            <span>查看她的日记本（共{{diary.count}}篇）</span>
          </div>
          <div class="right">
            <img src="./icon-aroow-right.png" alt="">
          </div>
        </div>
    </div>
    <!-- 日记详情  -->
    <div  class="diary-detail-content-wrapper">
      <div class="diary-detail-content-header-wrapper">
        <DiaryDate :title="diary.create_time"></DiaryDate>
      </div>
      <div class="diary-detail-content-text">
        {{diary.content}}
      </div>
      <div class="diary-detail-content-pic" v-show="diary.operationImgList.length">
        <img v-for="(pic, idx) in upLoadedPics" :src="pic" :key="idx" alt="">
      </div>
      <!-- 打赏记录 -->
      <div class="diary-detail-content-pay">
        <ul class="diary-detail-content-pay-list">
          <!-- 待做成滚动形式的 to do -->
          <li v-for="(tradeUser,idx) in tradeUsers" :key="idx" class="diary-detail-content-pay-item">{{tradeUser.userName ? tradeUser.userName : '未知'}}打赏{{tradeUser.money}}</li>
          <!-- <li class="diary-detail-content-pay-item">成飞打赏200金积分</li> -->
          <li v-if="tradeUsers.length === 0" class="diary-detail-content-pay-item no-tip-center">暂无打赏信息，成为第一个打赏的人！</li>
        </ul>
      </div>
    </div>
    <!-- 打赏、点选操作 -->
    <div class="diary-detail-action-wrapper">
      <!-- 操作逻辑相当，html结构相当 to do 如何让逻辑与html能够更灵活的搭配？-->
      <div class="diary-detail-action">
        <button class="diarydetail-btn diarydetail-btn-plain diarydetail-btn-active btn-330 mr-34" @click="handleTipShow(true)">
          <img v-show="true" src="./icon-pay-white.png" alt="">
          <img v-show="false" src="./icon-pay.png" alt="">
          <span class="ml-8">赏</span>
        </button>
        <p>已有{{tipNum}}人打赏</p>
      </div>
      <div class="diary-detail-action">
        <button
          @click="handleLike"
          class="diarydetail-btn diarydetail-btn-plain btn-330"
          :class="{'diarydetail-btn-active': diary.hasZan}">
          <img v-show="diary.hasZan" src="./icon-like-white.png" alt="">
          <img v-show="!diary.hasZan" src="./icon-like.png" alt="">
          <span class="ml-8">{{zanText}}</span>
        </button>
        <p>已有{{diary.zanNum}}人点赞</p>
      </div>
    </div>
    <!-- 查看其它日记 -->
    <!-- 可以复用 -->
    <div class="header-img-wrapper" @click="gotoCategory">
        <div class="header-img">
          <div class="left">
            <img src="./icon-book.png" alt="">
            <span>查看同类{{diary.countType}}篇日记</span>
          </div>
          <div class="right">
            <img src="./icon-aroow-right.png" alt="">
          </div>
        </div>
    </div>
    <!-- 医生评价-已经写了组件- 文字有所不同 -->
    <div class="diray-doctor-wrapper">
      <DiaryDoctor :doctor="doctor" :oriComments="diary.comments"></DiaryDoctor>
    </div>
    <!-- 用户评论 -->
    <!-- 用评论信息 -->
    <div class="diary-detail-comment-wrapper mb-110">
      <ContentHeader class="plr-20 mb-32" :title="'用户评论'"></ContentHeader>
      <div  v-for="userComment in notebookComments" :key="userComment.id">
        <div class="plr-20 diary-comment-title">
          <div class="diary-comment-title-img">
            <img :src="userComment.headimgurl" alt="">
          </div>
          <div class="diary-comment-title-text">
            <p class="name">{{userComment.nickname}}</p>
            <p class="date">{{userComment.create_time}}</p>
          </div>
        </div>
        <div class="diary-comment-content">
          <p>{{userComment.comment}}</p>
        </div>
      </div>
      <div v-if="notebookComments.length === 0" class="no-notebook-comments">暂无评论</div>
    </div>
    <TipPerson v-show="isTipShow" :person="person" @tipShow="handleTipShow" @submitTip="handleTip"></TipPerson>
    <!-- 评论弹框 -->
    <AddComment 
      @close="HandleAddCommentShow(false)"
      @submitComment="handleSubmitComment"
      :isOpen="isAddCommentShow"
      :isCommentted="isCommentted"
      ></AddComment>
    <!-- 上一篇-下一篇 -->
    <div class="diary-detail-footer diary-detail-footer-fixed">
      <!-- 3者样式相同 -->
      <div class="diary-img-txt" @click="gotoDiaryDetail(beforeAndNext, 'before')">
        <img src="./icon-prev.png" alt="">
        <span class="desc">上一篇</span>
      </div>
      <div class="diary-img-txt border-right-1" @click="gotoDiaryDetail(beforeAndNext, 'next')">
        <img src="./icon-next.png" alt="">
        <span class="desc">下一篇</span>
      </div>
      <div class="diary-img-txt" @click="HandleAddCommentShow(true)">
        <img src="./icon-comment.png" alt="">
        <span class="desc">评论</span>
      </div>
    </div>
    <Loading :isLoading="isLoading"></Loading>
  </div>
</template>

<script>
import {IMG_PREFIX} from '@/common/config/config.js'
import { DIARY, TIP, PARTNER } from '@/models/index.js'
import HeaderBack from '@/components/common/HeaderBack/HeaderBack'
import DiaryHeader from '@/components/diary/DiaryHeader/DiaryHeader'
import ContentHeader from '@/components/common/ContentHeader/ContentHeader'
import DiaryGoods from '@/components/diary/DiaryGoods/DiaryGoods'
import DiaryDoctor from '@/components/diary/DiaryDoctor/DiaryDoctor'
import DiaryOperation from '@/components/diary/DiaryOperation/DiaryOperation'
import DiaryDate from '@/components/diary/DiaryDate/DiaryDate'
import AddComment from '@/components/diary/AddComment/AddComment'
import TipPerson from '@/components/diary/TipPerson/TipPerson'
import Loading from '@/components/common/Loading/Loading'
import { MessageBox, Toast } from 'mint-ui'

export default {
  name: 'DiaryDetail',
  components: {
    HeaderBack,
    DiaryHeader,
    ContentHeader,
    DiaryGoods,
    DiaryOperation,
    DiaryDoctor,
    DiaryDate,
    AddComment,
    TipPerson,
    Loading,
    Toast
  },
  data () {
    return {
      isReady: false, // 是否完全加载完成
      isLoading: false, // 是否正在加载数据
      header: {
        title: '日记详情',
        action: '写日记'
      },
      isTipShow: false, // 打赏框
      isAddCommentShow: false, // false
      isCommentted: false, // 是否评论成功
      IMG_PREFIX: IMG_PREFIX,
      diary: {
        id: '1',
        userId: '1',
        noteId: '1',
        nickname: '姓名',
        headimgurl: '',
        content: '内容',
        operationPart: '手术内容',
        operationAtDate: '2018-01-10',
        operationDoctor: '手术医生', // 缺少评级、实施医生照片
        selectPrice: 0,
        coverPreIdx: -1, // 不存在封面
        coverPre: null, // 前照片、后照片
        preOperatImgs: null, // 图片字符串，用逗号隔开 或者 null
        coverAfterIdx: -1, // 不存在封面
        coverAfter: null,
        operationImgList: [], // 术后照片
        afterOperatImgs: null,
        doctorId: '', // ?
        doctorMemo: '',
        doctorAvatar: '',
        doctorName: '',
        grade: 100, // 医生评分
        comments: [], // 医生评论
        hasZan: false, // 点选数量 与 评论数量 意义不清楚
        zanNum: 0,
        hasComment: true,
        commentNum: 895,
        hasView: true,
        viewNum: 0,
        hasConcern: false, // 是否关注
        create_Time: '20xx-xx-xx',
        count: 0, // 日记本下的日记数
        countType: 0, // 同类日记数，与下面的type相关，用于跳转到首页日记查询
        type: null // 日记类型
      },
      tradeUsers: [], // 打赏相关信息
      notebookComments: [], // 日记评论
      // curPerson: {}, // 当前查看日记的用户信息
      beforeAndNext: [], // 上、下文章
      userRole: null // 用户权限
    }
  },
  computed: {
    diaryHeader () {
      const diaryHeader = {
        headimgurl: null,
        nickname: 'xx',
        createTime: '20xx-xx-xx',
        curIdx: 'x', // 当前数量
        diaryIndex: 'x', // 当前数量
        place: '未知',
        viewNum: '??'
      }
      // to do 有待简化 -- 数组遍历赋值
      diaryHeader.headimgurl = this.diary.headimgurl
      diaryHeader.nickname = this.diary.nickname
      // 这里应该是 日记本的创建时间
      diaryHeader.createTime = this.diary.create_time
      // diaryHeader = this.diary.headimgurl
      diaryHeader.diaryIndex = this.diary.diaryIndex
      if (this.diary.place === undefined) {
        diaryHeader.place = '未知'
        // 这里可以请求嫱用户地址 保存用户地址 to do
      }
      diaryHeader.viewNum = this.diary.viewNum
      /* 以下为头部关注所需要数据 */
      diaryHeader.userId = this.diary.userId
      diaryHeader.hasConcern = this.diary.hasConcern
      return diaryHeader
    },
    tipNum () {
      // 打赏人数
      return this.tradeUsers.length
    },
    upLoadedPics () {
      // console.log('this.operationImgList', this.operationImgList)
      if (this.diary.operationImgList.length === 0 || this.diary.operationImgList === undefined) {
        return
      }
      // console.log('this.operationImgList', this.operationImgList, IMG_PREFIX)
      let upLoadedPics = this.diary.operationImgList.map(pic => {
        return IMG_PREFIX + pic
      })
      // console.log('this.diary.operationImgList', this.diary.operationImgList)
      return upLoadedPics
    },
    doctor () {
      // 与DirayItem相同
      let data = this.diary
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
      // console.log('IMG_PREFIX', IMG_PREFIX)
      doctor.pic = IMG_PREFIX + data.doctorAvatar
      doctor.pay = data.selectPrice
      doctor.grade = data.grade
      return doctor
    },
    person () {
      const person = {
        name: '',
        avatar: ''
      }
      let curPerson = this.diary
      person.name = curPerson.nickname
      person.avatar = curPerson.headimgurl
      return person
    },
    zanText () {
      return this.diary.hasZan ? '取消' : '赞'
    }
  },
  methods: {
    gotoWrite () {
      // 判断用户权限 -- 可以抽出多处使用 当前：日记页、日记详情
      // 暂时使用 范范的接口来判断权限 -- 这个多处使用如何抽出来？
      if (this.userRole === null) {
        this.isLoading = true
        // console.log('this.userRole', this.userRole)
        PARTNER.getMsg().then(res => {
          // console.log('res', res)
          this.isLoading = false
          if (res.data.retCode === 0) {
            // console.log('res', res)
            this.userRole = res.data.data.rule
            this._gotoWrite(res.data.data.rule)
          }
        })
      } else {
        // console.log('this.userRole', this.userRole)
        this._gotoWrite(this.userRole)
      }
    },
    _gotoWrite  (role) {
      // console.log('role', role)
      if (role === 15) {
        MessageBox.alert('游客无法写日记，请在"我的"完成身份认证', '无法写日记', {
          closeOnClickModal: true
        }).then(action => {
          this.$router.push({name: 'user.setup'})
        })
        return
      }
      // check参数用于后续判断，选择日记本后到底往哪跳
      this.$router.push({name: 'diary.notebook', query: {check: false}})
    },
    gotoNotebook () {
      let noteId = this.diary.noteId
      this.$router.push({name: 'diary.person', query: {noteId}})
    },
    gotoCategory () {
      // 类型传递
      let tabType = this.diary.type
      this.$router.push({name: 'diary', query: {tabType}})
    },
    handleTip (tip) {
      const self = this
      let userId = this.diary.userId
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
    handleTipShow (isOpen) {
      // console.log('isOpen', isOpen)
      if (isOpen) {
        // console.log('里面')
        // 无法改变 isTipShow的值
        // 可能原因：网络错误，其它错误导致它不能运行
        this.isTipShow = true
      } else {
        this.isTipShow = false
      }
    },
    handleLike () {
      let self = this
      let noteId = this.diary.id
      let isLiked = this.diary.hasZan
      // 根据当前值判断
      self.isLoading = true
      if (isLiked) {
        DIARY.unlike(noteId).then(res => {
          if (res.data.retCode === 0) {
            self._actionRst(self, 'hasZan', '点赞')
          } else {
            Toast({
              message: `失败,'${res.data.retMsg}'`,
              duration: 1000
            })
          }
          self.isLoading = false
        })
      } else {
        DIARY.like(noteId).then(res => {
          if (res.data.retCode === 0) {
            self._actionRst(self, 'hasZan', '点赞')
          } else {
            Toast({
              message: `失败,'${res.data.retMsg}'`,
              duration: 1000
            })
          }
          self.isLoading = false
        })
      }
    },
    _actionRst (self, varName, keyWord) {
      // 点赞
      let isTrue = self.diary[varName] = !self.diary[varName]
      // 点赞的专门处理
      if (varName === 'hasZan') {
        if (isTrue) {
          this.diary.zanNum++
        } else {
          this.diary.zanNum--
        }
      }
      if (isTrue) {
        Toast({
          message: `${keyWord}成功`,
          duration: 1000
        })
      } else {
        Toast({
          message: `取消${keyWord}`,
          duration: 1000
        })
      }
    },
    HandleAddCommentShow (isOpen) {
      if (isOpen) {
        this.isAddCommentShow = true
        return
      }
      this.isAddCommentShow = false
    },
    handleSubmitComment (comment) {
      // console.log(comment)
      const self = this
      self.isLoading = true
      // 用户可能多次评价
      self.isCommentted = false
      let noteId = self.diary.id
      DIARY.addComment(noteId, comment).then(res => {
        // console.log(res)
        self.isLoading = false
        if (res.data.retCode === 0) {
          Toast({
            message: `评论成功`,
            duration: 1000
          })
          self.isCommentted = true
          // 添加到评论列表中
          self.notebookComments.push(res.data.data)
          self.isAddCommentShow = false
        } else {
          Toast({
            message: `评论失败`,
            duration: 1000
          })
        }
      })
    },
    gotoDiaryDetail (beforeAndNext, type) {
      // 这里的数据结构需要改变
      if (this.beforeAndNext.length === 0) {
        Toast({
          message: `没有了，别翻了~`,
          duration: 1000
        })
        return
      }
      // type: before/next
      if (beforeAndNext[type] === null) {
        Toast({
          message: `没有了，别翻了~`,
          duration: 1000
        })
        return
      }
      let id = beforeAndNext[type].id
      if (id === null || id === undefined || id === '') {
        Toast({
          message: `没有了，别翻了~`,
          duration: 1000
        })
        return
      }
      this.$router.push({name: 'diary.detail', query: {id}})
    },
    _getDiaryDetail (self, id) {
      DIARY.detail(id).then(res => {
        // console.log('res---------', res)
        self.isLoading = false
        if (res.data.retCode === 0) {
          self.diary = res.data.data.diary
          // 空值为null时，则转化为相应的数据结构
          if (res.data.data.diary.comments === null) {
            res.data.data.diary.comments = []
          }
          self.notebookComments = res.data.data.notebookComments
          self.tradeUsers = res.data.data.tradeUsers
          // self.curPerson = res.data.data.user
          self.beforeAndNext = res.data.data.beforeAndNext
          // 错误时，不将页面显示出来
          self.isReady = true
        } else {
          MessageBox.alert(res.data.retMsg, '错误', {
            closeOnClickModal: true
          })
        }
      })
    }
  },
  created () {
    // console.log(this.$route)
    const self = this
    let query = this.$route.query
    let id = query.id
    if (id === undefined) {
      MessageBox.alert('无法访问该页面，即将返回首页', '访问错误', {
        closeOnClickModal: true
      }).then(action => {
        self.$router.push({name: 'home'})
      })
      return
    }
    self.isLoading = true
    self._getDiaryDetail(self, id)
  },
  watch: {
    $route (n) {
      /* 解决日记详情组件复用问题 */
      const self = this
      let query = this.$route.query
      let id = query.id
      self.isLoading = true
      self._getDiaryDetail(self, id)
    }
  }
}
</script>

<style>
/* 188,122,255 215,86,228 */
.mt-88{
  margin-top: .88rem;
}
.bg-white{
  background: #fff;
}
.plr-20{
  padding-left: .2rem;
  padding-right: .2rem;
}
.pb20{
  padding-bottom: .2rem;
}
.ml-8{
  margin-left: .08rem;
}
.mt-14{
  margin-top: .14rem;
}
.mt-30 {
  margin-top: .3rem;
}
.mb-32{
  margin-bottom: .32rem;
}
.mb-110{
  margin-bottom: 1.1rem;
}
.diary-detail-bg{
  background-color: #F8F8F8;
}
.border-right-1{
  border-right: 1px solid #ebebeb;
}
/* 按钮 */
.mr-34{
  margin-right: .34rem;
}
.diarydetail-btn {
  vertical-align: top;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border: none;
  border-radius: .3rem;
  width: auto;
  padding: 0 1rem 0 1.2rem;
  height: .6rem;
  line-height: .6rem;
  font-size: 0rem;
  color: #fff;
  background-color: inherit;
  text-align: left;
}
.diarydetail-btn-h5{
  height: .5rem;
  line-height: .5rem;
}
.diarydetail-btn-plain {
  border: 1px solid rgba(188, 122, 255, 1);
  color: rgba(188, 122, 255, 1);
}
.diarydetail-btn-plain img{
  margin-right: .1rem;
  vertical-align: middle;
  display: inline-block;
  width: .24rem;
}
.diarydetail-btn-plain span{
  display: inline-block;
  vertical-align: middle;
  font-size: .26rem;
}
.diarydetail-btn-active{
  background-color: rgba(188, 122, 255, 1);
  color: #fff;
}
.btn-330{
  width: 3.3rem;
}
.diary-detail-action-wrapper {
  padding:0.3rem .2rem .42rem;
  display: flex;
  justify-content: space-between;
  background-color: #fff;
}
.diary-detail-action{
  text-align: center;
}
.diary-detail-action p{
  padding-top: .2rem;
  font-size: .2rem;
  color: rgb(153,153,153);
}
/* 打术内容 */
.diary-operation-wrapper{
  padding: .16rem .2rem .20rem;
  margin-bottom: .2rem;
  background: #fff;
}
/* header-img */
.header-img-wrapper {
  margin-top: .2rem;
  background: #fff;
  padding: .3rem .2rem .36rem;
  border-bottom: 1px solid #ebebeb;
}
.header-img{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header-img .left{
  display: flex;
  align-items: center;
}
.header-img .left img{
  display: inline-block;
  width: .27rem;
  height: .31rem;
}
.header-img .left span{
  margin-left: .26rem;
  font-size: .26rem;
  color: rgb(34,34,34);
}
.header-img .right{
}
.header-img .right img{
  width: .11rem;
  height: .18rem;
}

/* 日记日期与天气 */
.diary-detail-content-header-wrapper{
  padding: .26rem .2rem;
  background-color: #fff;
  border-bottom: 1px solid #ebebeb;
}
/* 文字 */
.diary-detail-content-text{
  padding: .32rem .2rem .3rem;
  color: rgb(102,102,102);
  font-size: .24rem;
  background-color: #fff;
}
.diary-detail-content-pic{
  padding:0 .2rem .3rem;
  font-size: 0;
  background-color: #fff;
}
.diary-detail-content-pic img{
  margin-top: .2rem;
  width: 100%;
}
.diary-detail-content-pic img:first-of-type{
  margin-top: 0;
}

/* 打赏信息 */
.diary-detail-content-pay{
  height: .6rem;
  line-height: .6rem;
}
.diary-detail-content-pay-list{
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
}
.diary-detail-content-pay-item {
  margin-left: .2rem;
  flex: 0 0 auto;
}
/* 没有打赏信息时，居中显示 */
.no-tip-center{
  margin:0 auto;
}
.diary-detail-content-pay-item:before{
  content: '';
  margin-right: .14rem;
  position:relative;
  top: -0.08rem;
  display: inline-block;
  width: .05rem;
  height: .05rem;
  border-radius: 50%;
  background-color: rgb(214,83,228);
}
/* 医生信息及评论 */
.diray-doctor-wrapper{
  margin-top: .2rem;
  padding: .4rem .2rem 0;
  background-color: #fff;
}
/* 评论部分 */
.plr-20{
  padding-left: .2rem;
  padding-right: .2rem;
}
.diary-detail-comment-wrapper{
  background-color: #fff;
  padding: .5rem 0 0;
  border-bottom: 1px solid #ebebeb;
}
.diary-comment-title{
  border-top: 1px solid #ebebeb;
  padding-top: .4rem;
  display: flex;
  align-items: center;
}
.diary-comment-title-img{
  width: .8rem;
  font-size: 0;
}
.diary-comment-title-img img{
  display: inline-block;
  width: .6rem;
  height: .6rem;
  border-radius: 50%;
  background-color:rgb(188,122,255);
}
.diary-comment-title-text{

}
.diary-comment-title-text .name{
  font-size: .26rem;
  line-height: 1;
  color: rgb(214,83,228);
}
.diary-comment-title-text .date{
  margin-top: .2rem;
  font-size: .24rem;
  line-height: 1;
  color: rgb(102,102,102);
}
.diary-comment-content{
  margin-top: .34rem;
  padding-bottom: .4rem;
  padding-left: 1rem;
}
.diary-comment-content p{
  font-size: .26rem;
  color: rgb(34,34,34);
}
/* 没有评论 */
.no-notebook-comments{
  border-top: 1px solid #ebebeb;
  text-align: center;
  height: .8rem;
  line-height: .8rem;
  background-color: #eeeeee;
  font-size: .28rem;
}
/* 底部 */
.diary-detail-footer{
  padding-top: .32rem;
  padding-bottom: .32rem;
  display: flex;
  justify-content: space-around;
  background-color:#fff;
  text-align: center;
}
.diary-img-txt{
  flex-grow: 1;
  display: inline-block;
  font-size: 0;
}
.diary-img-txt img {
  display: inline-block;
  width:.38rem;
  height:.38rem;
  vertical-align: middle;
}
.diary-img-txt .desc {
  margin-left: .18rem;
  font-size: .32rem;
  color: rgb(153,153,153);
  vertical-align: middle;
}
/* 固定在底部 */
.diary-detail-footer-fixed{
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  border-top: 1px solid #ebebeb;
}
</style>
