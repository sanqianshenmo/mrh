<template>
  <div class="home">
    <mt-cell title="地址" :value="address" @click.native="showPicker"></mt-cell>
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
export default {
  name: 'home',
  components: {
    MyAddress
  },
  data () {
    return {
      showAddressPicker: true,
      address: '北京-北京市-东城区'
    }
  },
  methods: {
    hidePicker () {
      // 接受子组件关闭popup事件
      this.showAddressPicker = false
    },
    showPicker () {
      this.showAddressPicker = !this.showAddressPicker
    },
    saveAddress (val) {
      // 从子组件接受返回所选值 val
      this.address = val
      this.showAddressPicker = !this.showAddressPicker
    }
  }

}
</script>

<style>
  .height {
    margin-top: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
