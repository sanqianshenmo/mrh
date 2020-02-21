<template>
  <div class="cover-bg" id="addaddress">
      <div class="new-address-pos">
          <div class="new-address-title">修改地址<span @click="closeAddAddress" class="new-close">X</span></div>
          <ul class="new-address-content-wrapper">
              <li>收货人<input type="text" v-model="newAddress.user_name" placeholder="请输入收货人姓名" id="name"></li>
              <li>联系电话<input type="tel" v-model="newAddress.phone" placeholder="请输入联系电话" id="tel"></li>
              <li>地区 <input @click="showPicker" type="text" unselectable="on" onfocus="this.blur()" :value="pickerAddress" readonly></li>
              <li>详细地址<input type="text" v-model="newAddress.address" placeholder="请输入详细地址" id="city"></li>
              <li class="pre">设为默认<mt-switch class="switch-pos" v-model="isDefault"></mt-switch></li>
          </ul>
          <div class="btn address-add-btn bdrx-0" @click="submitAddress" id="submit">确认修改</div>
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
import MyAddress from '@/components/address-picker/Address.vue'
import { MessageBox } from 'mint-ui'

const INIT_PICKER_ADDRESS = '北京-北京市-东城区'
export default {
  name: 'UpDateAddressAdd',
  props: ['updataAddress'],
  components: {
    MyAddress
  },
  data () {
    return {
      showAddressPicker: false,
      isAddressPicked: false,
      address: INIT_PICKER_ADDRESS,
      newAddress: {
        user_name: '',
        phone: '',
        province: '',
        city: '',
        district: '',
        address: '',
        postcode: '',
        type: 0
      },
      updataAdd: {
        user_name: '',
        phone: '',
        province: '',
        city: '',
        district: '',
        address: '',
        postcode: '',
        type: 0
      }
    }
  },
  computed: {
    isDefault: {
      get () {
        return this.newAddress.type === 1
      },
      set (newVal) {
        this.newAddress.type = newVal === true ? 1 : 0
      }
    },
    pickerAddress () {
      if (!this.isAddressPicked) {
        return '省份-城市-县区'
      } else {
        return this.address
      }
    }
  },
  methods: {
    closeAddAddress () {
      this.$emit('closeAddAddress', true)
    },
    submitAddress () {
      // 验证数据格式，以及是否填写
      // 不能为空；手机；
      const address = this.newAddress
      /* let trimReg = new RegExp(/^\s*|\s*$/g)
      for (let key in address) {
        if (address.hasOwnProperty(key)) {
          if (key !== 'postcode' && address[key].toString().replace(trimReg, '') === '') {
            const KeyTable = {
              user_name: '收货人',
              phone: '联系电话',
              province: '省份',
              city: '城市',
              district: '区域',
              address: '详细地址',
              postcode: '',
              type: 0
            }
            MessageBox({
              title: '注意',
              message: `'${KeyTable[key]}'不能为空`,
              showCancelButton: false
            })
            return
          }
        }
      } */
      let userNameLen = address.user_name.length
      if (userNameLen < 2 || userNameLen > 5) {
        MessageBox({
          title: '注意',
          message: `收货人姓名长度为2~5`,
          showCancelButton: false
        })
        return
      }
      let phoneReg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
      if (!phoneReg.test(address.phone)) {
        MessageBox({
          title: '注意',
          message: `手机号有误`,
          showCancelButton: false
        })
        return
      }
      // type字符串化
      if (this.newAddress.type === 0) {
        this.newAddress.type = '0'
      } else {
        this.newAddress.type = '1'
      }
      // 提交地址
      this.updataAdd.user_name = this.newAddress.user_name
      this.updataAdd.phone = this.newAddress.phone
      this.updataAdd.province = this.newAddress.province
      this.updataAdd.city = this.newAddress.city
      this.updataAdd.district = this.newAddress.district
      this.updataAdd.address = this.newAddress.address
      this.updataAdd.postcode = this.newAddress.postcode
      this.updataAdd.type = this.newAddress.type
      this.$emit('newAddress', this.newAddress.id, this.updataAdd)
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
      this.address = val
      let addressArr = val.split('-')
      this.newAddress.province = addressArr[0]
      this.newAddress.city = addressArr[1]
      this.newAddress.district = addressArr[2]
      this.showAddressPicker = !this.showAddressPicker
    }
  },
  created () {
    if (this.updataAddress) {
      console.log(this.updataAddress)
      this.newAddress = this.updataAddress
      this.isAddressPicked = true
      this.address = this.updataAddress.province + '-' + this.updataAddress.city + '-' + this.updataAddress.district
    }
  }
}
</script>

<style scoped>
/*新增地址*/
.cover-bg {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    bottom: 0;
    background: rgba(0,0,0,.5);
    z-index: 100;
    overflow: auto;
}
.new-address-pos{
    position: absolute;
    left: 0; bottom: 0;
    width: 100%;
    color: #666;
}

/* 添加新地址 */
.new-address-title {
  padding: 0 .3rem;
  background: #ebebeb;
  line-height: .8rem;
  font-size: .3rem;
  color:rgb(214,83,228);
  text-align: center;
}
.new-close {
  float:right;
  color:#666;
}

/* 具体地址 */
.new-address-content-wrapper{
  padding: 0 .3rem;
  background-color:#fff;
}
.new-address-content-wrapper>li {
    background: #fff;
    border-bottom: 1px solid #ebebec;
    line-height: .55rem;
    padding: .2rem 0;
    font-size: .28rem;
    color: #656565;
}
.new-address-content-wrapper>li>input {
    border: none;
    background: none;
    color: #666;
    font-size: .24rem;
    line-height: .55rem;
    text-align: right;
    float: right;
    width: 4.8rem;
}
/* 底部按钮 */
.btn {
    height: .95rem;
    width: 100%;
    background: #bc7aff;
    color: #fff;
    text-align: center;
    line-height: .95rem;
    font-size: .36rem;
}

/* 覆盖mint-ui原有样式 */
.switch-pos {
  float:right;
}
.mint-switch-input:checked + .mint-switch-core {
    border-color: rgb(214,83,228);
    background-color: rgb(214,83,228);
}
.bdrx-0{
    border-radius: 0 !important;
}
</style>
