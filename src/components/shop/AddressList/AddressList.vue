<template>
  <div class="address-wrapper mar-top">
      <label @click="select" class="border-1px-gray addresslist-radio gray-color">
        <i :class="{checked: address.isSelected}"></i>
        <span class="address_name padding-r5">{{ address.user_name }}</span><span class="address_mobile">{{ address.phone }}</span>
        <p class="addres_detail_desc">{{ address.province }}{{ address.city }}{{ address.district }}{{ address.address }}{{defaultText}}</p>
      </label>
  </div>
</template>

<script>
export default {
  name: 'AddressList',
  props: {
    address: {
      type: Object,
      default () {
        return {
          id: 'id',
          userName: 'xx', // 异常的命名看着难受
          phone: '1572921xxxx',
          province: '省份',
          city: '城市',
          district: '地区',
          address: '地址',
          postcode: '邮政编码',
          type: '0',
          isSelected: false
        }
      }
    }
  },
  computed: {
    defaultText () {
      if (this.address.type === '1') {
        return '（默认地址）'
      }
    }
  },
  methods: {
    select (id) {
      this.$emit('selectedAddress', this.address.id)
    }
  }
}
</script>

<style scoped>
.gray-color {
    color: #656565;
}
.address-wrapper > label:last-child{
    border:none;
}
.address_name, .address_mobile{
    font-size: 0.28rem;
    color: rgb(73,72,73)
}
.address_mobile{
    float:right;
}
.addres_detail_desc{
    margin-top: 0.1rem;
    margin-bottom: .05rem;
    font-size: 0.24rem;
    word-break: break-all;
}
/* 是否选中的控制 */
.addresslist-radio {
    display: block;
    line-height: .45rem;
    padding: .15rem 0;
    font-size: .28rem;
    position: relative;
    padding-left: 28px;
}
.addresslist-radio i {
    position: absolute;
    left: 0;
    top: 50%;
    margin-top: -9px;
    width: 6px;
    height: 6px;
    padding: 0;
    overflow: hidden;
    border-radius: 50%;
    background: #fff;
    margin-right: 10px;
    vertical-align: -4px;
    border: 6px solid #c8c8c8;
    display: inline-block;
}
i.checked {
  border-color: rgb(214, 83, 228);
}
</style>
