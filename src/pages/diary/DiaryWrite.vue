<template>
  <div>
    <HeaderBack :isActionShow="false" :header="header" :color="'rgb(214,83,228)'"></HeaderBack>
    <div class="mt-88">
      <div class="diary-write-date-wrapper" @click="openPicker">
        <DiaryDate :title="curDay" :color="'rgb(214,83,228)'"></DiaryDate>
      </div>
      <div class="diray-write-wrapper">
        <textarea :placeholder="placeholderText" cols="30" rows="10" v-model="diary.content"></textarea>
      </div>
      <div class="diray-write-addpic-wrapper">
        <div class="diray-write-addpic">
          <div class="diray-addpic-pic" v-for="(pic,idx) in pics" :key="idx">
            <img class="diray-addpic-uploaded-pic" :src="pic" alt="">
            <div class="diray-addpic-pic-delete" @click="deleteUploadedImg(idx)">
              <img class="diray-addpic-pic-delete-icon" src="./icon-close.png" alt="关闭">
            </div>
          </div>
          <label class="diray-addpic-pic diray-addpic-btn" for="uploadimg" v-if="isAddBtnShow">
            <span>+</span>
            <p>添加术后照</p>
            <input type="file" v-show="false" name="img" id="uploadimg" @change="uploadImg($event)">
          </label>
        </div>
      </div>
    </div>
    <button class="diary-write-btn" @click="submitDiray">发表日记</button>
    <div v-show="isSubmitedSuccess">
        <div class="gray-bg"></div>
        <div class="diary-write-dialog-wrapper">
          <span class="diary-write-dialog-close">X</span>
          <p>发表成功，待管理员审核后日记才能显示哦！请到我的-我的日记查看审核结果</p>
        </div>
    </div>
    <mt-datetime-picker
      v-model="pickerValue"
      ref="picker"
      :endDate="new Date()"
      type="date"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      @confirm="handleConfirm">
    </mt-datetime-picker>
    <Loading :isLoading="isLoading"></Loading>
  </div>
</template>

<script>
import {IMG_PREFIX, ImgThumbnailPostfix} from '@/common/config/config.js'
import { DIARY, UPLOAD } from '@/models/index.js'
import HeaderBack from '@/components/common/HeaderBack/HeaderBack'
import DiaryDate from '@/components/diary/DiaryDate/DiaryDate'
import Loading from '@/components/common/Loading/Loading'
import { Toast, DatetimePicker, MessageBox } from 'mint-ui'
// 有必要将“写日记”与“修改页面”合并，修的交互逻辑与写是完全相同的，否则需要两边都改
export default {
  name: 'DiaryWrite',
  components: {HeaderBack, DiaryDate, Loading, Toast, DatetimePicker},
  data () {
    return {
      isLoading: false, // 是否正在加载数据
      header: {
        title: '写日记'
      },
      diary: {
        noteId: '0', // 日记本Id
        content: '',
        writeTime: new Date(), // writeTime（自定义写日记时间），默认是今天
        operationImg: '', // （术后图片）（w + 图片名称）
        operationImg2: '',// （水印图片）（图片名称)
        userId:''
      },
      pickerValue: new Date(), // 选择的时间
      isSubmitedSuccess: false,
      isAddBtnShow: true,
      uploadedImgs: [], // 用于传输到后台
      date: '', // 手术日期
      noteIndex: '' // 当前日记本的次数
    }
  },
  computed: {
    curDay () {
      return this._formatTime(this.diary.writeTime)
    },
    pics () {
      let pics = this.uploadedImgs.map(item => {
        return IMG_PREFIX + item + ImgThumbnailPostfix
      })
      return pics
    },
    placeholderText () {
      let oprationTime = new Date(this.date.replace(/-/g, '/')).getTime()
      let curDayTime = new Date().getTime()
      if (curDayTime > oprationTime) {
        return '写日记记录自己的变美历程'
      } else {
        return '忐忑还是期待，美丽日记帮你记录每一刻'
      }
    }
  },
  methods: {
    openPicker () {
      this.$refs.picker.open()
    },
    _formatTime: function (date) {
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      if (month < 10) {
        month = '0' + month
      }
      var day = date.getDate()
      if (day < 10) {
        day = '0' + day
      }
      return year + '-' + month + '-' + day
    },
    handleConfirm (value) {
      // console.log('value', value)
      this.diary.writeTime = value
      // this.start = this.formatTime(value, 'startDate')
    },
    uploadImg (event) {
      // console.log('uploadImg', event.target.files[0])
      // 触发了事件，但是没有选择图片
      if (event.target.files.length === 0) {
        return
      }
      const self = this
      // 防止在1.5内loading尚未出现时，用户直接再次点击上传
      if (self.isLoading === true) {
        Toast({
          message: `图片正在上传，请稍等！`,
          duration: 1000
        })
        return
      }
      self.isLoading = true
      let file = event.target.files[0]
      UPLOAD.upImgNoToken(file).then(res => {
        // console.log('res', res)
        self.isLoading = false
        if (res.data.retCode === 0) {
          // console.log('res.data.data[0]', res.data.data[0])
          self.uploadedImgs.push(res.data.data[0])
        } else if (res.data.retCode === 40002) {
          console.log('token失效')
        } else {
          MessageBox.alert(res.data.retMsg, '错误', {
            closeOnClickModal: true
          })
        }
      })
      // 达到9张隐藏上传按钮显示
      if (this.uploadedImgs.length >= 9) {
        this.isAddBtnShow = false
      }
    },
    deleteUploadedImg (idx) {
      // 删除图片上传按钮显示
      this.isAddBtnShow = true
      this.uploadedImgs.splice(idx, 1)
    },
    submitDiray () {
      // this.isSubmitedSuccess = true
      // 这里应该发表成功，即刻跳转到 个人日记页面
      // noteId:"73896071695568"
      // 检测输入内容
      // 内容是否为空 to do 用了好多次
      const self = this
      let content = this.diary.content.replace(/(^\s)|(\s$)/g, '')
      if (content === '') {
        Toast({
          message: `请输入日记内容`,
          duration: 2000
        })
        return
      }
      if (this.uploadedImgs.length < 1) {
        Toast({
          message: `请至少上传一张图片`,
          duration: 2000
        })
        return
      }
      let operationImg2arr = this.uploadedImgs.map(item => {
        return 'w' + item
      })
      let operationImg = operationImg2arr.join(',')
      let operationImg2 = this.uploadedImgs.join(',')
      let noteId = this.diary.noteId
      // 默认时间
      let writeTime = this.curDay
      let noteIndex = self.noteIndex
      let userId = self.userId
      let diary = {
        noteId: noteId, // 日记本Id
        content: content,
        writeTime: writeTime,
        operationImg: operationImg, // （术后图片）（w + 图片名称）
        operationImg2: operationImg2, // （水印图片）（图片名称）
        userId:userId
      }
      // console.log(diary)
      // return
      DIARY.submitDiary(diary).then(res => {
        // console.log(res)
        if (res.data.retCode === 0) {
          MessageBox({
            title: '提交成功',
            message: '点击确认, 进入"我的-我的日记"查看日记审核',
            closeOnClickModal: false
          }).then(action => {
            let noteId = self.diary.noteId
            let noteIndex = self.noteIndex
            let date = self.date
            let noteType = self.$route.query.noteType
            let userId = self.userId
            // 日志审核页面
            this.$router.replace({name: 'diary.check', query: {noteId, noteIndex, date, noteType,userId}})
          })
        } else if (res.data.retCode === 40002) {
          console.log('token失效')
        } else {
          MessageBox.alert(res.data.retMsg, '错误', {
            closeOnClickModal: true
          })
        }
      })
    }
  },
  created () {
    let query = this.$route.query
    let noteId = query.noteId
    this.diary.noteId = noteId
    this.date = query.date
    this.noteIndex = query.noteIndex
    this.userId = query.userId
  }
}
</script>

<style>
.mt-88{
  margin-top: .88rem;
}
/* 日记头 */
.diary-write-date-wrapper{
  padding: .26rem .2rem;
  background-color: #fff;
  border-bottom: 1px solid #ebebeb;
}
/* 写日记 */
.diray-write-wrapper{
  font-size: 0;
  box-sizing: border-box;
  height: 5rem;
  padding: .3rem .2rem;
  overflow: auto;
  background-color: #fff;
}
.diray-write-wrapper textarea{
  width: 100%;
  height: 100%;
  font-size: .26rem;
  color: rgb(153,153,153);
  line-height: 1.2;
  resize: none;
}
/* 添加图片 */
/* 如何支持一次上传多张照片？ */
.diray-write-addpic-wrapper{
  user-select: none;
  padding-left: .2rem;
  padding-right: .2rem;
  padding-bottom: 1rem;
  background-color: #fff;
}
.diray-write-addpic{
  margin-left:.1rem;
  font-size: 0;
  border-top: 1px solid #ebebeb;
  padding-top: .4rem;
  padding-bottom: .4rem;
  min-height: 4rem;
}
.diray-addpic-pic{
  margin-top: .06rem;
  margin-left: .06rem;
  position: relative;
  display: inline-block;
  /* width: 1.8rem;
  height: 1.8rem; */
  width: 1.7rem;
  height: 1.7rem;
  background-color: rgba(188,122,255,1);
  overflow: hidden;
}
.diray-addpic-btn{
  box-sizing: border-box;
  border: 1px dashed #ebebeb;
  /* padding-top: .36rem; */
  padding-bottom: .3rem;
  text-align: center;
  background-color: rgb(243,245,245);
}
.diray-addpic-pic:nth-child(4n+1) {
  margin-left: .0rem;
}
.diray-addpic-uploaded-pic{
  width: 100%;
}
/* 删除图标 */
.diray-addpic-pic-delete{
  position: absolute;
  top: 0;
  right: 0;
  width: .6rem;
  height: .6rem;
  text-align: right;
  font-size: 0;
}
.diray-addpic-pic-delete-icon{
  display: inline-block;
  width: .4rem;
}
/* 需要换成图片 */
.diray-addpic-btn span{
  font-size: .8rem;
  line-height: 1;
  color:rgb(153,153,153);
}
.diray-addpic-btn p{
  margin-top: .26rem;
  text-align: center;
  font-size: .28rem;
  color:rgb(153,153,153);
}
/* 底部按钮 */
.diary-write-btn{
  position: fixed;
  bottom: 0;
  box-sizing: border-box;
  border: none;
  width: 100%;
  padding: 0 .25rem;
  height: 1rem;
  line-height: 1rem;
  font-size: .36rem;
  color: #fff;
  background-color: rgba(188,122,255,1);
}

/* 发表成功提示 */
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
.diary-write-dialog-wrapper{
  position:fixed;
  left:50%;
  bottom:2rem;
  z-index:100;
  transform: translateX(-50%);
  box-sizing:border-box;
  border-radius: 6px;
  padding:.62rem .46rem .44rem .46rem;
  width: 5rem;
  height: 2.2rem;
  text-align: left;
  font-size:.28rem;
  color: #fff;
  background-color:rgba(0,0,0,.5);
}
.diary-write-dialog-close{
  top:0;
  right:0;
  display:inline-block;
  position: absolute;
  width: .6rem;
  height: .6rem;
  text-align: center;
  line-height: .6rem;
  color: rgba(188,122,255,1);
}
</style>
