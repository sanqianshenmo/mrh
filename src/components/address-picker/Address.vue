<template>
  <div class="addressPickerWrapper">
    <!--地址选择组件-->
    <!-- style="position:absolute;" -->
    <mt-popup v-model="isShow" position="bottom" :closeOnClickModal="closeOnClickModal">
      <section style="width:100%; height: 100%;">
        <div class="padding">
          <span @click="hidePicker">取消</span>
          <span @click="saveAddress" class="float-right">完成</span>
        </div>
        <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
      </section>
    </mt-popup>
  </div>
</template>

<script>
import Address from './address.js'
let apid = '0'
// 根据apid查找对象
function findcity (item) {
  return item.apid === apid
}
// 根据aname获取名字
function getAddressName (item) {
  return item.aname
}
// 筛选出各省级对象
let pObj = Address.filter(findcity)
// 获取各省级对象名字
const PROVINCES = pObj.map(getAddressName)
export default {
  name: 'MyAddress',
  props: {
    showAddressPicker: Boolean,
    init: String
  },
  data () {
    return {
      curSlotsValues: [],
      slots: [{
        flex: 1,
        values: [],
        className: 'slot1',
        textAlign: 'center',
        defaultIndex: 3
      }, {
        divider: true,
        content: '-',
        className: 'slot2'
      }, {
        flex: 1,
        values: [],
        className: 'slot3',
        textAlign: 'center'
      }, {
        divider: true,
        content: '-',
        className: 'slot4',
        defaultIndex: 0
      }, {
        flex: 1,
        values: [],
        className: 'slot5',
        textAlign: 'center',
        defaultIndex: 0
      }],
      addressValue: '',
      disableClear: true,
      initVal: '北京-北京市-东城区',
      closeOnClickModal: false
    }
  },
  computed: {
    isShow: {
      get () {
        const self = this
        if (self.showAddressPicker) {
          self._fixedBody(self)
        } else {
          self._cancelFixedBody(self)
        }
        return this.showAddressPicker
      },
      set () {
        //  这里可以重置，决定是否与选中值保持一致
      }
    }
  },
  watch: {
    isShow (n, o) {
      if (n === false) {
        const self = this
        self._cancelFixedBody(self)
        console.log(2)
      }
    }
  },
  methods: {
    getProvinces () {
      //  滚动的第一列数据 省 -- 恒定不改变
      //  to do
    },
    saveAddress () { // 保存所选地区
      let vm = this
      vm.$emit('save-address', vm.addressValue)
    },
    hidePicker () { //  取消选择
      this.$emit('hide-picker', false)
    },
    initAddress () { // 初始化地址组件
      let vm = this
      let initAddress = vm.initVal.split('-')
      vm.slots[0].values = PROVINCES
      vm.slots[0].values.map((val, index) => {
        if (initAddress[0] === val) {
          vm.slots[0].defaultIndex = index
        }
      })

      // 改变id，取下级数据 -- 执行太多不必要的次数 to do
      pObj.map((val) => {
        if (val.aname === initAddress[0]) {
          apid = val.aid
        }
      })
      // console.log('content', content, 'apid', apid)
      //  设置相应内容
      vm.slots[2].values = Address.filter(findcity).map(getAddressName)
      // console.log('vm.slots[2].values', vm.slots[2].values)
      //  对应相应索引
      Address.filter(findcity).map((val, index) => {
        if (val.aname === initAddress[1]) {
          apid = val.aid
          vm.slots[2].defaultIndex = index
        }
      })
      vm.slots[4].values = Address.filter(findcity).map(getAddressName)
      vm.slots[4].values.map((val, index) => {
        if (initAddress[2] === val) {
          vm.slots[4].defaultIndex = index
        }
      })
      // console.log('vm.slots[4].values', vm.slots[4].values)
      vm.addressValue = vm.slots[0].values[vm.slots[0].defaultIndex] +
        '-' + vm.slots[2].values[vm.slots[2].defaultIndex] +
        '-' + vm.slots[4].values[vm.slots[4].defaultIndex]
    },
    onValuesChange (picker, values) {
      let self = this
      let newSlotsValues = picker.getValues()
      let curSlotsValues = self.curSlotsValues
      // console.log('newSlotsValues', newSlotsValues)
      //  这里可以作进一步的优化，根据变化slot的位置，只计算一部分 to do
      let isChanged = [true, true, true]
      for (let i = 1; i <= 3; i++) {
        if (newSlotsValues[i] !== curSlotsValues[i]) {
          isChanged[i] = false
        }
      }
      // console.log(isChanged)
      self.initVal = newSlotsValues.join('-')
      this.initAddress()
    },
    _fixedBody (self) {
      // 保存当前滚动条位置
      let scrollTop = window.pageYOffset ||
                 document.documentElement.scrollTop ||
                 document.body.scrollTop ||
                 0
      self.scrollTop = scrollTop
      // 保持原来的位置
      document.body.style.top = -1 * scrollTop + 'px'
      document.body.style.position = 'fixed'
      document.body.style.width = '100%'
    },
    _cancelFixedBody (self) {
      console.log(self.scrollTop)
      document.body.style.overflow = ''
      document.body.style.position = null
      document.body.style.top = null
      window.scrollTo(0, self.scrollTop)
    }
  },
  created () {
    if (this.init) {
      this.initVal = this.init
      this.curSlotsVals = this.init.split('-') //  保存用于对比
    }
    this.initAddress()
  },
  destroyed () {
    // 防止用户直接回退，导致fixed固定
    const self = this
    self._cancelFixedBody(self)
  }
}
</script>

<style scoped>
  .addressPickerWrapper {
    /* position:fixed;
    top:0;
    left:0;
    right:0;
    bottom:0; */
  }
  .mint-popup {
    width: 100%;
  }
  .footer-btn {
    box-sizing: border-box;
    position: fixed;
    width: 100%;
    z-index: 2;
    left: 0;
    bottom: 3rem;
  }
  .input {
    border: none;
  }
  .padding {
    padding: 15px;
  }
  .float-right {
    float: right;
  }
</style>
