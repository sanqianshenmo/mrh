<template>
  <div class="case-wrapper">
    <DiaryFocus class="focus-people-wrapper-pos" :userId="diary.userId" :hasConcern="diary.hasConcern"></DiaryFocus>
    <DiaryPerson :avatar="diary.headimgurl" :noteId="diary.noteId" :type="diary.type" :nickname="diary.nickname"></DiaryPerson>
    <DiaryPics :pics="pics"></DiaryPics>
    <!-- 手术内容 -->
    <DiaryOperation :content="diary.operationPart"></DiaryOperation>
    <!-- 点选费用、医生简介、医生评论 data- not complete-->
    <DiaryDoctor :doctor="doctor" :oriComments="doctorComment"></DiaryDoctor>
    <!-- 点赞操作、评论显示 这里是不是要独立划分出来？to do -->
    <div class="case-doctor-comment-action-wrapper">
      <div class="case-doctor-comment-action" :class="{'liked-comment-state': isLiked }" @click="handleLike">
        <img class="pic" v-show="!isLiked" src="./icon-like.png" alt="点赞" title="点赞">
        <img class="pic" v-show="isLiked" src="./icon-liked.png" alt="点赞" title="点赞">
        <span class="desc">赞</span>
        <span class="num">{{diary.zanNum === null ? 0 : diary.zanNum}}</span>
      </div>
      <div class="ml-40 case-doctor-comment-action" :class="{'liked-comment-state': this.diary.hasComment }" @click="gotoDiaryDetail">
        <img class="pic" src="./icon-comment.png" alt="评论" title="评论">
        <span class="desc">评论</span>
        <span class="num">{{diary.commentNum === null ? 0 : diary.commentNum}}</span>
      </div>
    </div>
    <Loading :isLoading="isLoading"></Loading>
  </div>
</template>
<script>
/* 某篇日志的所有内容
 * 使用该组件的父级组件： 1.首页 2.首页日记 3.个人日志列表 4.日志详情
*/
import {IMG_PREFIX, ImgThumbnailPostfix} from '@/common/config/config.js'
import { DIARY } from '@/models/index.js'
import DiaryPerson from '@/components/diary/DiaryPerson/DiaryPerson'
import DiaryFocus from '@/components/diary/DiaryFocus/DiaryFocus'
import DiaryPics from '@/components/diary/DiaryPics/DiaryPics'
import DiaryDoctor from '@/components/diary/DiaryDoctor/DiaryDoctor'
import DiaryOperation from '@/components/diary/DiaryOperation/DiaryOperation'
import { MessageBox, Toast } from 'mint-ui'
import Loading from '@/components/common/Loading/Loading'

export default {
  name: 'DiaryItem',
  components: {DiaryPerson, DiaryFocus, DiaryPics, DiaryDoctor, DiaryOperation, Toast, MessageBox, Loading},
  props: {
    diary: {
      type: Object,
      default () {
        return {
          id: '666',
          userId: '888',
          noteId: '1',
          nickname: '名字', // 缺少关注
          headimgurl: '',
          content: '内容',
          operationPart: '手术内容',
          operationAtDate: '2018-01-10',
          operationDoctor: '医生姓名', // 缺少评级、实施医生照片
          selectPrice: 0,
          coverPreIdx: -1, // 不存在封面
          coverPre: null, // 前照片、后照片
          preOperatImgs: null, // 图片字符串，用逗号隔开 或者 null
          coverAfterIdx: -1, // 不存在封面
          coverAfter: null,
          operationImgList: [], // 术后照片
          afterOperatImgs: null,
          doctorId: '', // ?
          doctorMemo: '', // 医生评论
          doctorAvatar: '',
          doctorName: '',
          grade: 100, // 医生评分
          comments: [], // 医生评论
          hasZan: false, // 点选数量 与 评论数量 意义不清楚
          zanNum: 8,
          hasComment: false,
          commentNum: 0,
          hasView: false,
          viewNum: 0,
          hasConcern: false // 是否关注
        }
      }
    }
  },
  data () {
    /* 通过组件自身data，将原始字段进行隔离 */
    return {
      isLoading: false, // 2秒后未拿到数据时显示loading
      isFold: true,
      isLiked: this.diary.hasZan,
      isFocused: this.diary.hasConcern,
      oriComments: [
        {
          content: '评论222222',
          time: '20xx-xx-xx xx:xx',
          count: '1'
        }
      ]
    }
  },
  computed: {
    doctorComment () {
      const doctorComment = [
        {
          content: '评论',
          time: '20xx-xx-xx xx:xx',
          count: '1'
        }
      ]
      doctorComment[0].content = this.diary.doctorMemo
      doctorComment[0].time = this.diary.create_time
      return doctorComment
    },
    focusTxt () {
      if (this.isFocused) {
        return '取消'
      } else {
        return '关注'
      }
    },
    pics () {
      const pics = {
        id: null,
        noteId: null,
        preImg: null,
        afterImg: null,
        type: null
      }
      pics.preImg = this._getPreImg()
      pics.afterImg = this._getAfterImg()
      pics.id = this.diary.id
      pics.noteId = this.diary.noteId
      pics.type = this.diary.type
      return pics
    },
    doctor () {
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
    }
  },
  methods: {
    gotoDiaryDetail () {
      // 某篇日志详情
      let id = this.diary.id
      // console.log('id', id, 'uid', uid)
      // return
      this.$router.push({name: 'diary.detail', query: {id}})
    },
    handleFocus () {
      // 外部请求
      let self = this
      let uid = Number(self.diary.userId)
      self.isLoading = true
      DIARY.handleFocus(uid).then(res => {
        // console.log('res', res)
        if (res.data.retCode === 0) {
          self._actionRst(self, 'isFocused', '关注')
        }
        self.isLoading = false
      })
    },
    handleLike () {
      let self = this
      let noteId = this.diary.id
      // 根据当前值判断
      self.isLoading = true
      if (this.isLiked) {
        DIARY.unlike(noteId).then(res => {
          if (res.data.retCode === 0) {
            self._actionRst(self, 'isLiked', '点赞')
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
            self._actionRst(self, 'isLiked', '点赞')
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
      // 点赞、关注结果反馈 -- focus中有类似代码
      let isTrue = self[varName] = !self[varName]
      // 点赞的专门处理
      if (varName === 'isLiked') {
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
    _getPreImg () {
      if (this.diary.coverPreIdx !== -1) {
        return IMG_PREFIX + this.diary.coverPre + ImgThumbnailPostfix
      }
      if (this.diary.preOperatImgs !== null) {
        return IMG_PREFIX + this.diary.preOperatImgs.split(',')[0] + ImgThumbnailPostfix
      }
      return null
    },
    _getAfterImg () {
      if (this.diary.coverAfterIdx !== -1) {
        return IMG_PREFIX + this.diary.coverAfter + ImgThumbnailPostfix
      }
      if (this.diary.operationImgList.length !== 0) {
        return IMG_PREFIX + this.diary.operationImgList[0] + ImgThumbnailPostfix
      }
      return null
    }
  },
  created () {
    /*
      创建与prop传值，哪个是先进行的?
    */
  }
}
</script>

<style>
/* 案例女神 */
.ml-40{
  margin-left: .4rem;
}
.case-wrapper {
  margin-top:.2rem;
  position: relative;
  padding:0 .2rem;
  background-color: #fff;
}
.case-wrapper:first-child{
  margin-top:0;
}
/* 关注位置 */
.focus-people-wrapper-pos{
  position: absolute;
  z-index: 100;
  top: .4rem;
  right:0;
}
/* 点赞 与 评论 */
.case-doctor-comment-action-wrapper {
  height: .83rem;
  line-height: .83rem;
  color: rgb(153,153,153);
  font-size: 0;
  text-align: right;
}
.case-doctor-comment-action-wrapper.liked-comment-state{
  color: rgb(214,83,228);
}
.case-doctor-comment-action {
  display: inline-block;
}
.case-doctor-comment-action-wrapper .pic {
  display: inline-block;
  height: .27rem;
  width: .28rem;
  vertical-align: middle;
}
.case-doctor-comment-action-wrapper .desc {
  /*  */
  margin-left: .1rem;
  font-size: .28rem;
  vertical-align: middle;
}
.case-doctor-comment-action-wrapper .num {
  /*  */
  margin-left: .1rem;
  font-size: .28rem;
  vertical-align: middle;
}
</style>
