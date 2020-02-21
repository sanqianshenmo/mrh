<template>
  <div>
    <div class="main" style= "height: auto" v-if="isReady">
      <div class="top-banner-join">
        <div v-if="isImg">
          <img :src="imgUrl" alt="" />
        </div>
        <div v-else class="imgText">
          <div class="imgText-img" >
            <input type="file" name="file" @change="upLoadImg" class ="input-file" v-if ="showUp" />
            <div style="height:1px"></div>
            <div class="upload-img">
              <img :src='logo' width='100%' alt=""/>
            </div>
          </div>
          <div class="imgText-i" :class="{imgTextHidden: !showUp}">请上传您的店铺图片如：</div>
          <div class="imgText-i" :class="{imgTextHidden: !showUp}">LOGO、门店照片或店内实景或参与优惠活动的商品</div>
        </div>
      </div>
      <div class="center" style="margin:0;padding: 26px 15px">
        <div class="center-banner-join">
          <div class="center-banner-join-text">
            企业简介
          </div>
          <textarea rows="3" wrap="hard" maxlength="500" placeholder="*请简单描述您的企业信息，500字以内" class="join-input font-input" v-model="intro"></textarea>
        </div>
        <div class="center-banner-join">
          <div class="center-banner-join-text">
            门店地址
          </div>
          <textarea rows="1" maxlength="100" placeholder="*您门店所在的省市及街道信息,100字以内" class="join-input font-input" v-model="address"></textarea>
        </div>
        <div class="center-banner-join">
          <div class="center-banner-join-text">
            联系方式
          </div>
          <input type="number" oninput="if(value.length>11)value=value.slice(0,11)" placeholder="*门店座机或手机号码" class="join-input font-input" v-model="contact"/>
        </div>
        <div class="center-banner-join">
          <div class="center-banner-join-text">
            优惠活动
          </div>
          <textarea rows="3" maxlength="300" placeholder="如：到店消费出示扫码后页面享受8折，300字以内" class="join-input font-input" v-model="activity"></textarea>
        </div>
        <div class="center-banner-join" >
          <div class="center-banner-join-text">
            选择合伙人
          </div>
          <div style="position:relative;">
            <input type="number" style="border: none" v-if = "isMsg"/>
            <select  v-model="partner_identify"  v-if = "isMsg"
                     style="position: absolute;bottom: -.4rem;border: 1px solid rgba(254,121,163,0.2);padding: 10px 0;right: 0;width: 100%; font-size: 12px;
            border-radius:5px;background-color:#fff;"
            >
              <option disabled="disabled" value="">选择你的合伙人</option>
              <option v-for="(list, index) in selectList" :value="list.identify_id" :key="index">{{list.nickname}}</option>
            </select>
            <div class="img-input" v-else style="padding:0">
              <input type="text" :placeholder="msg" disabled>
            </div>
          </div>
        </div>
        <div class="bottom-banner-join" v-if="isMsg">
          <input type="button" value="提交,生成专属推广二维码" class="join-input submit-input" @click="sumbit">
        </div>
        <div class="bottom-banner-join" v-else>
          <input type="button" value="修改完成,保存" class="join-input submit-input" @click="sumbit">
        </div>
      </div>
    </div>
    <div class="img-box" v-show="isRouter" style="position: fixed; width: 100%; height:100%; top:0; left: 0; z-index: 9999; background-color: #fff;">
      <div style="padding: 20px; text-align: center;font-size: 16px">
        您的网络开小差啦 点下面刷新重试吧
      </div>
      <div>
        <div class="bottom-banner-join" style="padding: 26px 50px">
          <input type="button" value="刷新重试" class="join-input submit-input" @click="goToback">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from '@/router'
import {UPLOAD, PARTNER} from '@/models'

export default {
  name: 'ShopJoin',
  data () {
    return {
      isReady: false,
      isRouter: false,
      isImg: false,
      imgUrl: '',
      isShare: false,
      intro: '',
      address: '',
      contact: '',
      activity: '',
      logo: '',
      partner_identify: '',
      showUp: true,
      changeImg: './assets/128128.jpg',
      isUpImg: false,
      selectList: [],
      msg: '',
      isMsg: true,
      identify_id: ''
    }
  },
  created: function () {
    let self = this
    var startTime = new Date()
    var loadTimeout = setTimeout(function () {
      console.log('settimeout!!!!!!!!!')
      self.$indicator.open()
    }, 1999)
    // let request = '/ashop/Store/partner_list'
    // let request1 = '/per_info'
    // axios.get(request)
    PARTNER.getPartnerList()
      .then(function (res) {
        console.log(res)
        if (res.data.retCode == 0) {
          self.selectList = res.data.data
        }
      })
      .catch(function (error) {
        console.log(error, 'xxxxxxxxxxxxx222')
      })
    PARTNER.getMsg()
      .then(function (res) {
        console.log(res.data)
        if (res.data.retCode == 0) {
          //if (Number(res.data.data.rule) == 17) {
            if (res.data.data.is_shop == 1) {
              self.isMsg = false
              self.msg = res.data.data.recommend_user
              self.identify_id = res.data.data.identify_id
              // axios.get('/advert_info?shopidentity=' + self.identify_id + '&need_deal=0')
              PARTNER.getAdvertInfo(self.identify_id, 0)
                .then(function (res) {
                  if (res.data.retCode == 0) {
                    self.isReady = true
                    console.log(res.data)
                    self.logo = res.data.data.shop.cover
                    self.intro = res.data.data.shop.intro
                    self.address = res.data.data.shop.address
                    self.contact = res.data.data.shop.contact
                    self.activity = res.data.data.shop.activity
                    self.msg = res.data.data.shop.partner_name
                    self.partner_identify = res.data.data.shop.partner_identify
                  }
                  self.cancelLoading(self, loadTimeout, startTime)
                })
            } else {
              self.isReady = true
              self.cancelLoading(self, loadTimeout, startTime)
              return false
            }
          //}
          /*else {
            router.push('/')
            self.cancelLoading(self, loadTimeout, startTime)
            self.isReady = true
          }*/
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    // 延时跳转404页面
    setTimeout(function () {
      if (self.isReady === false) {
        self.isRouter = true
      }
    }, 10000)
  },
  methods: {
    cancelLoading: function (self, loadTimeout, startTime) {
      clearTimeout(loadTimeout)
      var endTime = new Date()
      if (endTime - startTime >= 2000) {
        self.$indicator.close()
      }
    },
    goToback: function () {
      location.reload()
    },
    handleJump: function (val) {
      router.push(val)
    },
    toShare: function () {
      this.isShare = true
    },
    unShare: function () {
      this.isShare = false
    },
    // 手机号正则校对 失去焦点事件
    inputBlur: function () {
      let self = this
      window.alert(self.contact)
      var reg = 11 && /^((13|14|15|16|17|18)[0-9]{1}\d{8})$/
      if (self.contact !== '') {
        if (!reg.test(self.contact)) {
          // window.alert('手机号格式不正确')
          self.$messagebox('提示', '手机号格式不正确')
        }
      }
    },
    /* 上传图片 */
    upLoadImg (event) {
      UPLOAD.getToken()
        .then(res => {
          this.qiniutoke = res.data.data
          console.log('------')
          this.$indicator.open('上传中...')
          console.log(res.data.data)
          var file = event.target.files[0]
          var formData = new FormData()
          formData.append('file', file)
          formData.append('token', this.qiniutoke)
          // let request = '/ashop/store/uploadImg'
          // var self = this
          // axios({
          //   method: 'post',
          //   url: request,
          //   header: 'Content-Type: multipart/form-data; charset=utf-8',
          //   data: formData
          // })
          UPLOAD.upImg(formData)
            .then(res => {
              console.log(res.data)
              this.logo = res.data.data
              this.changeImg = res.data.data
              // self.showUp = false
              this.$indicator.close()
            })
        })
        .catch(function (error) {
          console.log(error)
        })
      // var addr = 'http://opf2ucy0n.bkt.clouddn.com/'
    },
    sumbit: function () {
      console.log(this.intro)
      console.log(this.address)
      if (!(this.logo && this.intro && this.address && this.contact)) {
        var self = this
        self.$messagebox({
          title: '提示',
          message: '填写不完整，是否继续填写？',
          showCancelButton: true,
          confirmButtonText: '继续填写',
          cancelButtonText: '返回个人中心',
          confirmButtonClass: 'confirmButton'
        }).then(action => {
          if (action === 'confirm') {} else {
            router.push('/user')
            return false
          }
        })
      } else {
        // var message = {
        //   logo: this.logo,
        //   intro: this.intro,
        //   address: this.intro,
        //   contact: this.contact,
        //   on_line: 1
        // }
        // var self = this
        // var request = '/send_advert'
        // axios({
        //   method: 'post',
        //   url: request,
        //   data: {
        //     logo: self.logo,
        //     intro: self.intro,
        //     address: self.address,
        //     contact: self.contact,
        //     partner_identify: self.partner_identify,
        //     activity: self.activity
        //   }
        // })
        PARTNER.sendAdvert(this.logo, this.intro, this.address, this.contact, this.partner_identify, this.activity)
          .then(function (res) {
            if (res.data.retCode === 0) {
              router.push('/user/show')
            }
          })
          .catch(function (error) {
            console.log('error', error)
            self.initLoading = false
          })
      }
    }
  }
}
</script>

<style scoped>
  .main {
    font-size: .4rem;
    background-color: #fff;
    background-size: cover;
    height: 100%;
    min-height: 12.06rem;
  }
  .top-banner-join {
    position: relative;
    background: url('./join-top-bg.jpg') no-repeat center center;
    background-size: 100%;
    padding-bottom: 35px;
  }
  .img-input {
    padding: 26px 15px;
  }
  .img-input input {
    width: 100%;
    border: 1px solid rgba(254,121,163,0.2);
    height: 30px;
    text-indent: 15px;
    background-color: #fff;
  }
  .join-bottom{
    position: fixed;
    bottom: 0;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 88;
    color: #fff;
    font-size:30px;
  }
  .join-fixed-img {
    position: absolute;
    top: 20%;
    right: -20px;
  }
  .center .imgText {
    font-size: 14px;
    color: #ccc;
    padding: 5px 0 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .imgText-img,.imgText-i{
    display: flex;
    justify-content: center;
    margin-top: -3px;
  }
  .imgText-i {
    position: relative;
    top: 60px;
    font-size: 11px;
    color: rgb(116,123,118);
  }
  .center-banner-join-text{
    padding: 10px 0;
    font-size: 15px;
    font-weight: bold;
  }
  .join-input {
    width: 100%;
  }
  input::-webkit-input-placeholder {
    font-size: 12px;
    padding-left: 5px;
    color: rgb(116,123,118);
  }
  textarea::-webkit-input-placeholder {
    font-size: 12px;
    padding-left: 5px;
    color: rgb(116,123,118);
  }
  .submit-input {
    color: #fff;
    background-color: rgb(254,121,163);
    outline: none;
    padding: 10px 0;
    border: none;
    border-radius: 50px;
    font-size: 15px;
  }
  .bottom-banner-join {
    padding-top: .8rem;
  }
  .font-input {
    font-size: 14px;
    padding: 5px 0;
  }
  textarea,input {
    border: 1px solid rgba(254,121,163,0.2);
    border-radius: 5px;
    resize:none;
  }
  .fixed-border {
    position: fixed;
    margin: 50px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 20px;
    color: #000;
    opacity: 1;
    z-index: 1111;
    padding: 0 20px ;
    min-height: 450px;
  }
  .fixed-border h1 {
    color: #000;
    text-align: center;
    padding: 20px 0;
    font-size: 20px;
  }
  .fixed-border .fixed-border-text {
    padding: 20px 0;
    font-size: 14px;
    text-indent: 20px;
  }
  .join-fixed {
    position: absolute;
    background-color: rgba(0,0,0,0.5);
    width: 100%;
    height: 100%;
    color: #fff;
    top: 0;
    left: 0;
    z-index: 99;
    font-size: 16px;
  }
  .input-file {
    opacity: 0;
    position: absolute;
    top: 0;
    width: 370px;
    height: 150px;
    z-index: 100;
  }
  .imgText-img img {
    width: 64px;
    height: 64px;
  }
  .imgTextHidden {
    visibility: hidden;
  }
  .upimg {
    position: absolute;
    bottom: 40px;
    left: 0;
    text-align: center;
  }
  .confirmButton {
    color: #EF5F45;
  }
  .confirmButton:hover {
    color: #EF5F45;
  }
  .enter-header {
    background: url('./join-bg.jpg') no-repeat center center;
    background-size: 100% 100%;
  }
  .enter-h1 {
    color: rgb(254, 138, 173);
    padding: 26px 0;
  }
  .enter-text {
    text-indent: 24px;
    line-height: 18px;
  }
  .enter-text-padding {
    padding-bottom: 26px;
  }
  .enter-bottom-button {
    padding: 5px 0 20px 0;
  }
  .enter-bottom-button-join {
    margin: 20px 70px;
    background-color: rgb(254,121,163);
    text-align: center;
    padding: 12px;
    font-size: 15px;
    color: #fff;
    border-radius: 25px;
  }
  .upload-img {
    width: 160px;
    height: 90px;
    border: 1px solid rgba(254,121,163,0.5);
    border-radius: 5px;
    position: relative;
    top: 50px;
    background: url('./join-bg-header.jpg') no-repeat center center;
    background-size: 100%;
  }
  .upload-img img {
    width: 100%;
    height: 100%;
    border-radius: 5px;
  }
  .join-change-text {
    padding: 17px;
    font-size: 11px;
    color: rgb(116,123,118);
  }
  .show-header {
    padding-top: 50px;
    font-size: 13px;
    padding-bottom: 37px;
  }
  .show-img {
    height: 178px;
    margin: 0 80px;
    position: relative;
  }
  .show-shuoming {
    color: rgb(116,123,118);
    padding: 30px 42px;
    font-size: 12px;
  }
  .show-tishi {
    padding: 0 42px;
    text-align: left;
    font-size: 13px;
    color: rgb(254,121,163);
    padding-bottom: 43px;
  }
  .show-baocun {
    font-size: 12px;
    font-style: italic;
    color: #000000;
  }
  .radius1 {
    width: 38px;
    height: 38px;
    position: absolute;
    top: -1px;
    left: -1px;
    border: 3px solid rgb(254,121,163);
    border-top-left-radius: 10px;
    border-right: none;
    border-bottom: none;

  }
  .radius2 {
    width: 38px;
    height: 38px;
    position: absolute;
    top: -1px;
    right: -1px;
    border: 3px solid rgb(254,121,163);
    border-top-right-radius: 10px;
    border-left: none;
    border-bottom: none;
  }
  .radius3 {
    width: 38px;
    height: 38px;
    position: absolute;
    bottom: -1px;
    right: -1px;
    border: 3px solid rgb(254,121,163);
    border-bottom-right-radius: 10px;
    border-left: none;
    border-top: none;
  }
  .radius4 {
    width: 38px;
    height: 38px;
    position: absolute;
    bottom: -1px;
    left: -1px;
    border: 3px solid rgb(254,121,163);
    border-bottom-left-radius: 10px;
    border-right: none;
    border-top: none;
  }
  .border-img {
    width: 150px;
    height: 150px;
    position: absolute;
    left: 16px;
    top: 12px;
    border: 1px solid rgba(254,121,163,0.2);
  }
  .border-img img {
    position: absolute;
    top: 5px;
    left: 5px;
  }
  .img-box {
    padding: 0 0;
  }
  .img-box .join-input {
    width: 100%;
  }
  .img-box .submit-input {
    color: #fff;
    background-color: rgb(254,121,163);
    outline: none;
    padding: 10px 0;
    border: none;
    border-radius: 50px;
    font-size: 15px;
  }
</style>
