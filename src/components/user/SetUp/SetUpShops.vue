<template>
    <div class="setupshops">
      <header v-if="true">
        <div @click="goToUser">
          <img src="./back.png" alt="">
        </div>
        身份认证
      </header>
      <main v-if="isReady && !shopsShow">
        <div>
          <div class="center-banner-join">
            <div class="center-banner-join-text">
              法人姓名
            </div>
            <textarea rows="1" maxlength="5" placeholder="*请输入法人姓名" class="join-input font-input" v-model="company_person"></textarea>
          </div>
          <div class="tel">
            <div class="center-banner-join">
              <div class="center-banner-join-text">
                联系电话
              </div>
              <input type="number" placeholder="*请输入您的手机号码" oninput="if(value.length>11)value=value.slice(0,11)" class="join-input font-input input-height" v-model="mobile">
              <!--<textarea rows="1" maxlength="100" placeholder="请输入手机号" class="join-input font-input input-one" v-model="mobile"></textarea>-->
              <!--<textarea rows="1" maxlength="100" placeholder="获取验证码(53)" class="join-input font-input input-two" disabled></textarea>
              <textarea rows="1" maxlength="100" placeholder="请输入验证码" class="join-input font-input input-three" v-model="address"></textarea>-->
              <!--<div class="tel-text">验证失败，请重新获取</div>-->
            </div>
          </div>
          <div class="center-banner-join">
            <div class="center-banner-join-text">
              所在省市
            </div>
            <textarea @click="showPicker" rows="1" unselectable="on" onfocus="this.blur()" :value="pickerAddress" readonly class="join-input font-input text-add"></textarea>
            <textarea rows="1" maxlength="100" placeholder="北京 北京市 东城区" class="join-input font-input" v-model="addresss"></textarea>
          </div>
          <div class="center-banner-join">
            <div class="center-banner-join-text">
              详细地址
            </div>
            <textarea rows="3" maxlength="20" placeholder="" class="join-input font-input" v-model="address"></textarea>
          </div>
          <div class="center-banner-join">
            <div class="center-banner-join-text">
              经营项目
            </div>
            <textarea rows="1" maxlength="100" placeholder="例如：餐饮" class="join-input font-input" v-model="project"></textarea>
          </div>
          <!--<div class="center-banner-join">
            <div class="center-banner-join-text">
              城市合伙人
            </div>
            <textarea rows="1" maxlength="100" placeholder="请选择城市合伙人" class="join-input font-input" v-model="panter"></textarea>
          </div>-->
          <div class="center-banner-join setup-shops-position">
            <div class="center-banner-join-text">
              门店照片
            </div>
            <input type="file" class="file-upload" name="img" id="uploadimg3" @change="uploadImg3($event)">
            <textarea rows="5" disabled maxlength="300" placeholder="" class="join-input font-input setup-shops-textarea" v-if="!isShowUpload3"></textarea>
            <img src="./addimg.png" alt="" class="setup-shops-upimg" v-if="!isShowUpload3">
            <img :src="upload3" alt="" class="show-upload1" v-if="isShowUpload3">
          </div>
          <div class="center-banner-join setup-shops-position">
            <div class="center-banner-join-text">
              营业执照副本
            </div>
            <input type="file" class="file-upload" name="img" id="uploadimg" @change="uploadImg($event)">
            <textarea rows="5" disabled maxlength="300" placeholder="" class="join-input font-input setup-shops-textarea" v-if="!isShowUpload1"></textarea>
            <img src="./addimg.png" alt="" class="setup-shops-upimg" v-if="!isShowUpload1">
            <img :src="upload1" alt="" class="show-upload1" v-if="isShowUpload1">
          </div>
          <div class="center-banner-join setup-shops-position">
            <div class="center-banner-join-text">
              法人身份证
            </div>
            <input type="file" class="file-upload" name="img" id="uploadimg1" @change="uploadImg1($event)">
            <textarea rows="5" disabled maxlength="300" placeholder="" class="join-input font-input setup-shops-textarea" v-if="!isShowUpload2"></textarea>
            <img src="./addimg.png" alt="" class="setup-shops-upimg" v-if="!isShowUpload2">
            <img :src="upload2" alt="" class="show-upload1" v-if="isShowUpload2">
          </div>
          <div class="center-banner-join">
            <div class="setup-shops-text">
              --温馨提示--
            </div>
            <!--<div class="setup-shops-div">
              审核通过后，您将成为美美美合作商家，您可以发布商品在美美美商城出售；拥有属于自己的独立推广网页及易拉宝等宣传物料设计稿件。
            </div>-->
          </div>
        </div>
      </main>
      <main v-if="isReady && shopsShow">
        <div class="main-col">
          <div class="main-col-left">法人姓名</div>
          <div class="main-col-right">{{shops.company_person}}</div>
        </div>
        <div class="main-col">
          <div class="main-col-left">联系电话</div>
          <div class="main-col-right">{{shops.mobile}}</div>
        </div>
        <div class="main-col">
          <div class="main-col-left">所在省市</div>
          <div class="main-col-right">{{shops.province}} {{shops.city}} {{shops.district}} {{shops.address}}</div>
        </div>
        <div class="main-col">
          <div class="main-col-left">经营项目</div>
          <div class="main-col-right">{{shops.project}}</div>
        </div>
      </main>
      <div  v-if="isReady && shopsShow" class="text-bg"></div>
      <div class="img-show" v-if="isReady && shopsShow">
        <div>营业执照副本</div>
        <img :src="IMG_PREFIX + shops.photo_company_cert" alt="">
        <div>身份证副本</div>
        <img :src="IMG_PREFIX + shops.photo_idcard" alt="">
      </div>
      <div class="bottom" v-if="isReady && !shopsShow">
        <button @click="sumbit">提交</button>
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
      <my-address
        :showAddressPicker="showAddressPicker"
        :init="address"
        @save-address="saveAddress"
        @hide-picker="hidePicker">
      </my-address>
    </div>
</template>

<script>
import router from '@/router'
import MyAddress from '@/components/address-picker/Address.vue'
import {UPLOAD, USER} from '@/models'
import {IMG_PREFIX} from '@/common/config/config.js'

const INIT_PICKER_ADDRESS = '省-市-区'
export default {
  name: 'SetUpShops',
  data () {
    return {
      isReady: false,
      isRouter: false,
      // 选择省市所需参数
      showAddressPicker: false,
      isAddressPicked: false,
      addresss: INIT_PICKER_ADDRESS,
      pickerAddress: '',
      company_person: '',
      mobile: '',
      province: '',
      city: '',
      district: '',
      project: '',
      photo_company_cert: '',
      photo_idcard: '',
      store_img:'',
      address: '',
      upload1: '',
      upload2: '',
      upload3: '',
      isShowUpload1: false,
      isShowUpload2: false,
      isShowUpload3: false,
      shops: '',
      IMG_PREFIX: IMG_PREFIX,
      shopsShow: false
    }
  },
  components: {
    MyAddress
  },
  methods: {
    // 封装关闭加载动画方法的
    cancelLoading (self, loadTimeout, startTime) {
      clearTimeout(loadTimeout)
      const endTime = new Date()
      if (endTime - startTime >= 2000) {
        // 如果调用方法时大于2s，即已出现加载动画，需关闭加载动画
        self.$indicator.close()
      }
    },
    goToback () {
      location.reload() // 重新加载页面
    },
    goToUser () {
      router.push('/user')
    },
    closeAddAddress () {
      this.$emit('closeAddAddress', true)
    },
    hidePicker () {
      // 接受子组件关闭popup事件
      this.showAddressPicker = false
    },
    showPicker () {
      this.showAddressPicker = !this.showAddressPicker
    },
    saveAddress (val) {
      // 从子组件接受返回所选值 val
      this.isAddressPicked = true
      this.addresss = val
      let addressArr = val.split('-')
      this.province = addressArr[0]
      this.city = addressArr[1]
      this.district = addressArr[2]
      this.showAddressPicker = !this.showAddressPicker
    },
    uploadImg3 (event) {
              this.isShowUpload3 = true
              console.log('uploadImg', event.target.files[0])
              if (event.target.files[0]) {
                this.$indicator.open('上传中')
              } else {
                return
              }
              let file = event.target.files[0]
              UPLOAD.upImgNoToken(file).then(res => {
                // console.log('res', res)
                if (res.data.retCode === 0) {
                  this.$indicator.close()
                  console.log('res.data.data[0]', res.data.data[0])
                  this.store_img = res.data.data[0]
                  this.upload3 = URL.createObjectURL(event.target.files[0])
                } else {
                  this.$indicator.close()
                  this.isShowUpload3 = false
                  // console.log('fail')
                  this.$messagebox.alert(res.data.retMsg, '错误', {
                    closeOnClickModal: true
                  })
                }
              })
            },
    uploadImg (event) {
      this.isShowUpload1 = true
      console.log('uploadImg', event.target.files[0])
      if (event.target.files[0]) {
        this.$indicator.open('上传中')
      } else {
        return
      }
      let file = event.target.files[0]
      UPLOAD.upImgNoToken(file).then(res => {
        // console.log('res', res)
        if (res.data.retCode === 0) {
          this.$indicator.close()
          console.log('res.data.data[0]', res.data.data[0])
          this.photo_company_cert = res.data.data[0]
          this.upload1 = URL.createObjectURL(event.target.files[0])
        } else {
          this.$indicator.close()
          this.isShowUpload1 = false
          // console.log('fail')
          this.$messagebox.alert(res.data.retMsg, '错误', {
            closeOnClickModal: true
          })
        }
      })
    },
    uploadImg1 (event) {
      this.isShowUpload2 = true
      console.log('uploadImg', event.target.files[0])
      if (event.target.files[0]) {
        this.$indicator.open('上传中')
      } else {
        return
      }
      let file = event.target.files[0]
      UPLOAD.upImgNoToken(file).then(res => {
        // console.log('res', res)
        if (res.data.retCode === 0) {
          this.$indicator.close()
          console.log('res.data.data[0]', res.data.data[0])
          this.photo_idcard = res.data.data[0]
          this.upload2 = URL.createObjectURL(event.target.files[0])
        } else {
          this.$indicator.close()
          this.isShowUpload2 = false
          // console.log('fail')
          this.$messagebox.alert(res.data.retMsg, '错误', {
            closeOnClickModal: true
          })
        }
      })
    },
    sumbit () {
      if (!(this.company_person && this.mobile)) {
        this.$messagebox('提示', '信息填写不完整')
        return false
      } else {
        let reg2 = /^[1][3,4,5,6,7,8][0-9]{9}$/ // 手机号验证
        if (reg2.test(this.mobile) === false) {
          this.$messagebox('提示', '手机号格式不正确')
          return false
        } else {
          this.submits()
        }
      }
    },
    submits () {
      this.$indicator.open()
      USER.shopUser(this.company_person, this.mobile, this.province, this.city, this.district, this.address, this.project, this.photo_company_cert, this.photo_idcard,this.store_img)
        .then(res => {
          console.log(res.data)
          if (res.data.retCode === 0) {
            this.$indicator.close()
            this.$messagebox('提交成功', '请等待审核')
              .then(res => {
                router.push('/user')
              })
          } else {
            this.$indicator.close()
            this.$messagebox('提交失败', '服务器繁忙')
          }
        })
    }
  },
  created () {
    // 延迟出加载动画
    let self = this
    self.startTime = new Date()
    self.loadTimeout = setTimeout(function () {
      self.$indicator.open()
    }, 1999) // 定义2s后出加载动画的定时器
    USER.getShopUser()
      .then(res => {
        console.log(res.data)
        if (res.data.retCode === 0) {
          this.shops = res.data.data
          if (this.shops) {
            console.log(this.shops)
            if (this.shops.status === 0) {
              this.shopsShow = false
            } else if (this.shops.status === 1) {
              this.shopsShow = true
            }
          }
          this.cancelLoading(self, this.loadTimeout, this.startTime)
          this.isReady = true
        }
      })
    // 延时跳转404页面
    setTimeout(function () {
      if (self.isReady === false) {
        self.isRouter = true
      }
    }, 10000)
  },
  destroyed () {
    this.$indicator.close()
  }
}
</script>

<style scoped>
textarea.text-add {
  position: absolute;
  opacity: 0;
  width: 7rem;
}
input.input-height {
  height: .48rem;
}
.file-upload {
  opacity: 0;
  position: absolute;
  width: 100%;
  height: 2.64rem;
  z-index: 2;
}
.show-upload1 {
  width: 100%;
  height: 2.64rem;
}
.setupshops header {
    padding: .3rem 0;
    text-align: center;
    font-size: .34rem;
    color: rgb(34,34,34);
    background-color: #fff;
    /*margin-bottom: .2rem;*/
    border-bottom: .01rem solid rgb(215,215,215);
  }
.setupshops header img {
    width: .2rem;
    height: .35rem;
    position: absolute;
    padding-left: .4rem;
  }
.setupshops header span {
    position: absolute;
    right: .2rem;
    font-size: .26rem;
    color: #d653e4;
  }
.setupshops header span i {
    display: inline-block;
    width: .28rem;
    height: .28rem;
    background: url("./shangjia.png") no-repeat center center;
    background-size: 100% 100%;
    position: absolute;
    left: -.44rem;
    top: .03rem;
  }
.setupshops main {
    background-color: #fff;
    padding: 0 .2rem;
  }
.setupshops main .xingbie {
    padding: .4rem;
    text-align: center;
  }
.setupshops main .xingbie span {
    font-size: .28rem;
    color: #000;
    padding-left: .9rem;
  }
.setupshops main .xingbie span:nth-child(1) {
    padding-left: 0;
  }
.setupshops main .xingbie span i.active:before {
    content: '';
    width: .24rem;
    height: .24rem;
    border: 1px solid rgb(214,83,228);
    border-radius: 50%;
    display: inline-block;
    padding: 0;
    position: relative;
    top: -.08rem;
    left: -.08rem;

  }
.setupshops main .xingbie span i.active {
    width: .12rem;
    height: .12rem;
    background-color: rgb(214,83,228);
    border-radius: 50%;
    display: inline-block;
    padding: 0;
    margin-right: .3rem;
    position: relative;
    top: .12rem;
    left: .12rem;
  }
.setupshops main .xingbie span i:before {
    content: '';
    width: .24rem;
    height: .24rem;
    border: 1px solid #ccc;
    border-radius: 50%;
    display: inline-block;
    padding: 0;
    position: relative;
    top: -.08rem;
    left: -.08rem;

  }
.setupshops main .xingbie span i{
    width: .12rem;
    height: .12rem;
    background-color: #ffffff;
    border-radius: 50%;
    display: inline-block;
    padding: 0;
    margin-right: .3rem;
    position: relative;
    top: .12rem;
    left: .12rem;
  }
.setupshops main .main-col {
    padding: .4rem 0 0 0;
  }
.setupshops main .main-col .main-col-left {
    float: left;
    text-align: right;
    padding-right: .24rem;
    font-size: .28rem;
    color: rgb(34,34,34);
  }
.setupshops main .main-col .main-col-right {
    font-size: .28rem;
    color: rgb(102,102,102);
  }
.setupshops main .main-col .xingbie {
    text-align: left;
    padding: 0 0 0 1.24rem;
  }
.main-top {
    padding: .4rem 0;
    text-align: center;
    font-size: .24rem;
    line-height: .24rem;
    font-style: italic;
  }
.center-banner-join {
    margin-bottom: .1rem;
  }
.center-banner-join-text{
    padding: 10px 0;
    font-size: .28rem;
    /*font-weight: bold;*/
    line-height: .28rem;
    color: rgb(34,34,34);
  }
.setup-shops-text {
  padding: 10px 0;
  font-size: .28rem;
  /*font-weight: bold;*/
  line-height: .28rem;
  color: rgb(34,34,34);
  text-align: center;
}
.setup-shops-div {
  font-size: .24rem;
  color: rgb(102,102,102);
}
.setup-shops-position {
  position: relative;
}
.setup-shops-textarea {
  background-color: #fff;
}
.setup-shops-upimg {
  position: absolute;
  width: .6rem;
  height: .6rem;
  left: 3.4rem;
  top: 1.7rem;
}
input::-webkit-input-placeholder {
    font-size: .22rem;
    padding-left: .1rem;
    color: rgb(153,153,153);
  }
textarea::-webkit-input-placeholder {
    font-size: .22rem;
    padding-left: .1rem;
    color: rgb(153,153,153);
  }
textarea.input-two::-webkit-input-placeholder {
    color: rgb(255,253,252);
  }
.join-input {
    width: 100%;
  }
.font-input {
    font-size: 14px;
    padding: 5px 0;
  }
textarea,input {
    border: 1px solid rgba(254,121,163,0.2);
    /*border-radius: 5px;*/
    resize:none;
  }
.bottom {
    background-color: #fff;
    text-align: center;
    padding: .6rem 0;
    margin-top: -.1rem;
  }
.bottom button {
    width: 3.3rem;
    height: .84rem;
    font-size: .3rem;
    color: rgb(255,253,252);
    background-color: #bc7aff;
    border: none;
    border-radius: .5rem;
  }
.input-three {
    margin-top: .3rem;
    width: 68%;
  }
.input-one {
    width: 68%;
  }
.input-two {
    width: 26%;
    float: right;
    background-color: #bc7aff;
  }
.input-right {
    width: 70%;
  }
.tel-text {
    text-align: left;
    font-size: .24rem;
    color: rgb(116,123,118);
    font-style: italic;
    padding: .3rem 0;
  }
.setupshops .img-box {
  padding: 0 0;
}
.setupshops .img-box .join-input {
  width: 100%;
}
.setupshops .img-box .submit-input {
  color: #fff;
  background-color: rgb(254,121,163);
  outline: none;
  padding: 10px 0;
  border: none;
  border-radius: 50px;
  font-size: 15px;
}
.text-bg {
  margin-top: .5rem;
  width: 100%;
  height: .2rem;
  background: #efefef;
}
.img-show {
  padding: .4rem .2rem;
}
.img-show div {
  padding: .2rem;
}
</style>
