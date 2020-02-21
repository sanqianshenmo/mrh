<template>
  <div class="case-wrapper">
          <DiaryFocus class="focus-people-wrapper-pos" :userId="diary.userId" :hasConcern="diary.hasConcern"></DiaryFocus>
          <DiaryPerson :avatar="diary.headimgurl" :nickname="diary.nickname"></DiaryPerson>
          <DiaryPics :pics="pics"></DiaryPics>
          <!-- 手术内容 -->
          <DiaryOperation :content="diary.operationPart"></DiaryOperation>
          <div class="case-select-doctor">
            <span class="case-fee-type">点选费</span>
            <span class="case-fee-num">￥ {{doctor.pay}}</span>
            <span class="case-fee-desc">点选{{doctor.name}}实施手术</span>
          </div>
        </div>
</template>
<script>
// 是不是可以与DiaryItem合并 合并的好处与坏处？ 来自DiaryItem
/* 某篇日志的所有内容
 * 使用该组件的父级组件： 1.首页 2.首页日记 3.个人日志列表 4.日志详情
*/
import {IMG_PREFIX, ImgThumbnailPostfix} from '@/common/config/config.js'
import DiaryPerson from '@/components/diary/DiaryPerson/DiaryPerson'
import DiaryFocus from '@/components/diary/DiaryFocus/DiaryFocus'
import DiaryPics from '@/components/diary/DiaryPics/DiaryPics'
import DiaryDoctor from '@/components/diary/DiaryDoctor/DiaryDoctor'
import DiaryOperation from '@/components/diary/DiaryOperation/DiaryOperation'

export default {
  name: 'DoctorCase',
  components: {DiaryPerson, DiaryFocus, DiaryPics, DiaryDoctor, DiaryOperation},
  props: {
    diary: {
      type: Object,
      default () {
        return {
          id: '1',
          userId: '1',
          noteId: '1',
          nickname: '姓名', // 缺少关注
          headimgurl: './02.jpg',
          content: '日志内容',
          operationPart: '手术内容',
          operationAtDate: '20xx-xx-xx',
          operationDoctor: '姓名', // 缺少评级、实施医生照片
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
          doctorAvatar: './doctor.png',
          doctorName: '',
          grade: 100, // 医生评分
          comments: [], // 医生评论
          hasZan: true, // 点选数量 与 评论数量 意义不清楚
          zanNum: 8,
          hasComment: true,
          commentNum: 895,
          hasView: true,
          viewNum: 10,
          hasConcern: false // 是否关注
        }
      }
    }
  },
  computed: {
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
        preImg: null,
        afterImg: null
      }
      pics.preImg = this._getPreImg()
      pics.afterImg = this._getAfterImg()
      pics.id = this.diary.id
      pics.noteId = this.diary.noteId
      return pics
    },
    doctor () {
      let data = this.diary
      let doctor = {
        name: '',
        pic: '',
        pay: '',
        grade: null
      }
      // to do 假如键非常多
      doctor.name = data.operationDoctor
      // console.log('IMG_PREFIX', IMG_PREFIX)
      doctor.pic = IMG_PREFIX + data.doctorAvatar
      doctor.pay = data.selectPrice
      doctor.grade = data.grade
      return doctor
    }
  },
  methods: {
    gotoDiaryPerson () {
      // 某个日记本（某次整形）下的个人中心
      this.$router.push({name: 'diary.person'})
    },
    gotoDiaryDetail () {
      // 某篇日志详情
      let id = this.diray.id
      let uid = this.uid
      this.$router.push({name: 'diary.detail', params: {id, uid}})
    },
    _getPreImg () {
      if (this.diary.coverPreIdx !== -1) {
        return IMG_PREFIX + this.diary.coverPre + ImgThumbnailPostfix
      }
      if (this.diary.preOperatImgs !== null) {
        return IMG_PREFIX + this.diary.preOperatImgs.split(',')[0] + ImgThumbnailPostfix
      }
      // 这里可以返回默认值
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
/* 点选医生 */
.case-select-doctor {
  background-color: #eee;
  border-radius: .29rem;
  width: 100%;
  height: .58rem;
  line-height: .58rem;
}
.case-fee-type {
  margin-left: .4rem;
  font-size: .24rem;
  color:rgb(102,102,102);
}
.case-fee-num {
  margin-left: .2rem;
  font-size: .26rem;
  color:rgb(214,83,228);
}
.case-fee-desc {
  margin-left: .4rem;
  font-size: .26rem;
  color:rgb(102,102,102);
}
</style>
