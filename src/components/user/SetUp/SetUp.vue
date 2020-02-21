<template>
  <div class="setup">
    <header v-if="true">
      <div @click="goToUser">
        <img src="./back.png" alt="">
      </div>
      个人信息认证
      <span  v-if="users.is_follow === 1" @click="goToShops"><i></i>加入联盟</span>
    </header>
    <main v-if="isReady && users.is_follow === 0">
      <div class="main-top">注：只有完善个人信息才能写日记哦</div>
      <div>
        <div class="center-banner-join">
          <div class="center-banner-join-text">
            您的姓名
          </div>
          <textarea rows="1" maxlength="5" placeholder="*请输入您的真实姓名" class="join-input font-input" v-model="name"></textarea>
        </div>
        <div class="xingbie" v-if="isMan">
          <span><i class="active" @click="changeSex(1)"></i>男</span><span><i @click="changeSex(2)"></i>女</span>
        </div>
        <div class="xingbie" v-else>
          <span><i @click="changeSex(1)"></i>男</span><span><i class="active" @click="changeSex(2)"></i>女</span>
        </div>
        <div class="center-banner-join" v-if="false">
          <div class="center-banner-join-text">
            身份证
          </div>
          <input type="text" placeholder="*请输入您的真实身份证信息" oninput="if(value.length>18)value=value.slice(0,18)" class="join-input font-input input-height" v-model="idcard_num">
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
        <div class="tel">
          <div class="center-banner-join">
            <div class="center-banner-join-text">
              电话
            </div>
            <input type="number" placeholder="*请输入手机号" oninput="if(value.length>11)value=value.slice(0,11)" class="join-input font-input input-height" v-model="mobile">
            <!--<textarea rows="1" maxlength="100" placeholder="请输入手机号" class="join-input font-input input-one" v-model="mobile"></textarea>-->
            <!--<textarea rows="1" maxlength="100" placeholder="获取验证码(53)" class="join-input font-input input-two" disabled></textarea>
            <textarea rows="1" maxlength="100" placeholder="请输入验证码" class="join-input font-input input-three" v-model="address"></textarea>-->
            <!--<div class="tel-text">验证失败，请重新获取</div>-->
          </div>
        </div>
        <!--<div class="center-banner-join">
          <div class="center-banner-join-text">
            微信
          </div>
          <textarea rows="1" maxlength="20" placeholder="@cc" class="join-input font-input" v-model="wechat"></textarea>
        </div>-->
        <div class="center-banner-join">
          <div class="center-banner-join-text">
            邮箱
          </div>
          <textarea rows="1" maxlength="100" placeholder="@" class="join-input font-input" v-model="mail"></textarea>
        </div>
      </div>
    </main>
    <main v-if="isReady && users.is_follow === 1">
      <div class="main-col">
        <div class="main-col-left">姓名</div>
        <div class="main-col-right">{{users.bak.name}}</div>
      </div>
      <div class="main-col">
        <div class="main-col-left"></div>
        <div class="main-col-right">
          <div class="xingbie" v-if="users.bak.sex === 1">
            <span><i ></i>男</span><span><i class="active"></i>女</span>
          </div>
          <div class="xingbie" v-if="users.bak.sex === 0">
            <span><i class="active"></i>男</span><span><i></i>女</span>
          </div>
        </div>
      </div>
      <!-- 隐藏身份证 -->
      <div class="main-col" v-if="false">
        <div class="main-col-left">身份证</div>
        <div class="main-col-right">{{users.bak.idcard_num}}</div>
      </div>
      <div class="main-col">
        <div class="main-col-left">居住地</div>
        <div class="main-col-right">{{users.bak.province}} {{users.bak.city}} {{users.bak.district}} {{users.bak.address}}</div>
      </div>
      <div class="main-col">
        <div class="main-col-left">电话</div>
        <div class="main-col-right">{{users.bak.mobile}}</div>
      </div>
      <!--<div class="main-col">
        <div class="main-col-left">微信</div>
        &lt;!&ndash;<div class="main-col-right">{{users.bak.wechat}}</div>&ndash;&gt;
        <textarea rows="1" maxlength="100" placeholder="*请输入您的真实身份证信息" class="join-input font-input input-right" v-model="users.bak.wechat" disabled></textarea>
      </div>-->
      <!--<div class="main-col">
        <div class="main-col-left">邮箱</div>
        <!--<div class="main-col-right">{{users.bak.mail}}</div>-->
        <textarea rows="1" maxlength="100" placeholder="*请输入您的真实邮箱信息" class="join-input font-input input-right" v-model="users.bak.mail" disabled></textarea>
      </div>-->
    </main>
    <div class="bottom"  v-if="isReady && users.is_follow === 0">
      <button @click="infoUser">提交</button>
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
    <v-drap v-if="isReady && users.is_follow === 1"></v-drap>
  </div>
</template>

<script>
import router from '@/router'
import {USER} from '@/models/index'
import MyAddress from '@/components/address-picker/Address.vue'
import VDrap from '@/components/common/Drap/Drap'

const INIT_PICKER_ADDRESS = '省-市-区'
export default {
  name: 'SetUp',
  data () {
    return {
      isReady: false,
      isRouter: false,
      // 选择省市所需参数
      showAddressPicker: false,
      isAddressPicked: false,
      addresss: INIT_PICKER_ADDRESS,
      isShow: 1,
      isMan: true,
      name: '',
      sex: 0,
      idcard_num: '',
      mobile: '',
      wechat: '',
      mail: '',
      address: '',
      province: '',
      city: '',
      district: '',
      activity: '',
      users: []
    }
  },
  components: {
    MyAddress,
    VDrap
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
    goToUser () {
      router.push('/user')
    },
    goToShops () {
      router.push('/user/setupshops')
    },
    changeSex (index) {
      if (index === 1) {
        this.isMan = true
        this.sex = 0
      } else if (index === 2) {
        this.isMan = false
        this.sex = 1
      }
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
    // 验证提交信息
    infoUser () {
      // 取消对于身份证号码的加入this.idcard_num
      if (!(this.name && this.province && this.city && this.district && this.address && this.mobile && this.mail)) {
        this.$messagebox('提示', '信息填写不完整')
        return false
      } else {
        let reg1 = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/ // 身份证校验正则
        // if (reg1.test(this.idcard_num) === false) {
        //   this.$messagebox('提示', '身份证格式不正确')
        //   return false
        // } else {
        let reg2 = /^[1][3,4,5,6,7,8][0-9]{9}$/ // 手机号验证
        if (reg2.test(this.mobile) === false) {
          this.$messagebox('提示', '手机号格式不正确')
          return false
        }
        else {
          //let reg3 = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/ // 邮箱验证
          //if (reg3.test(this.mail) === false) {
          //  this.$messagebox('提示', '邮箱格式不正确')
          //  return false
          //} else {
           this.infoUsers()
         // }
        }
        // }
      }
    },
    // 提交后台
    infoUsers () {
      USER.infoUser(this.name, this.sex, this.idcard_num, this.province, this.city, this.district, this.address, this.mobile, this.mail)
        .then(res => {
          console.log(res.data)
          if (res.data.retCode === 0) {
            location.reload()
          }
        })
    },
    goToback () {
      location.reload() // 重新加载页面
    }
  },
  computed: {
    pickerAddress () {
      if (!this.isAddressPicked) {
        return '省份-城市-县区'
      } else {
        return this.address
      }
    }
  },
  created () {
    // 延迟出加载动画
    let self = this
    self.startTime = new Date()
    self.loadTimeout = setTimeout(function () {
      self.$indicator.open()
    }, 1999) // 定义2s后出加载动画的定时器
    USER.getUser()
      .then(res => {
        if (res.data.retCode === 0) {
          this.users = res.data.data
          this.cancelLoading(self, this.loadTimeout, this.startTime)
          this.isReady = true
        }
        console.log(res.data)
      })
    // 延时跳转404页面
    setTimeout(function () {
      if (self.isReady === false) {
        self.isRouter = true
      }
    }, 10000)
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
.setup header {
    padding: .3rem 0;
    text-align: center;
    font-size: .34rem;
    color: rgb(34,34,34);
    background-color: #fff;
    /*margin-bottom: .2rem;*/
    border-bottom: .01rem solid rgb(215,215,215);
  }
.setup header img {
    width: .2rem;
    height: .35rem;
    position: absolute;
    padding-left: .4rem;
  }
.setup header span {
  position: absolute;
  right: .2rem;
  font-size: .26rem;
  color: #d653e4;
}
.setup header span i {
  padding: 0;
  display: inline-block;
  width: .29rem;
  height: .28rem;
  background: url("./shangjia.png") no-repeat center center;
  background-size: 100% 100%;
  position: absolute;
  left: -.44rem;
  top: .03rem;
}
.setup main {
  background-color: #fff;
  padding: 0 .2rem;
  min-height: 11rem;
}
.setup main .xingbie {
  padding: .4rem;
  text-align: center;
}
.setup main .xingbie span {
  font-size: .28rem;
  color: #000;
  padding-left: .9rem;
}
.setup main .xingbie span:nth-child(1) {
  padding-left: 0;
}
.setup main .xingbie span i.active:before {
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
.setup main .xingbie span i.active {
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
.setup main .xingbie span i:before {
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
.setup main .xingbie span i{
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
.setup main .main-col {
  padding: .4rem 0 0 0;
}
.setup main .main-col .main-col-left {
  float: left;
  text-align: right;
  padding-right: .24rem;
  font-size: .28rem;
  color: rgb(34,34,34);
}
.setup main .main-col .main-col-right {
  font-size: .28rem;
  color: rgb(102,102,102);
}
.setup main .main-col .xingbie {
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
.noapply img {
    width: 3.32rem;
    height: 2.14rem;
    margin: 2rem auto 1rem auto;
  }
.noapply div {
    text-align: center;
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
.setup .img-box {
  padding: 0 0;
}
.setup .img-box .join-input {
  width: 100%;
}
.setup .img-box .submit-input {
  color: #fff;
  background-color: rgb(254,121,163);
  outline: none;
  padding: 10px 0;
  border: none;
  border-radius: 50px;
  font-size: 15px;
}
</style>
