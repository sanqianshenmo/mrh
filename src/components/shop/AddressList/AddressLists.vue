<template>
  <div class="address-wrapper mar-top">
    <label class="border-1px-gray radio-add gray-color">
      <span class="address_name padding-r5">{{ address.user_name }}</span><span class="address_mobile">{{ address.phone }}</span>
      <p class="addres_detail_desc">{{ address.province }}{{ address.city }}{{ address.district }}{{ address.address }}</p>
    </label>
    <div class="address-li-bottom">
      <i class="i-yuan" :class="{active: isDefault}" @click="putId(address.id)"></i>
      <span>默认地址</span>
      <i class="i-write" @click="updata(keys)"></i>
      <span class="span-write" @click="delId(address.id)">删除</span>
      <i class="i-delete" @click="delId(address.id)"></i>
      <span class="span-delete" @click="updata(keys)">编辑</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddressLists',
  props: {
    address: {
      type: Object,
      default () {
        return {
          id: 'id',
          user_name: 'xx',
          phone: '15729215009',
          province: '河南',
          city: '商丘',
          district: '梁园区',
          address: '110',
          postcode: '476000',
          type: '0',
          isSelected: false,
          isDefault: false
        }
      }
    },
    keys: {
      type: Number,
      default () {
        return 0
      }
    }
  },
  methods: {
    putId (id) {
      if (this.address.type === '0') {
        this.$messagebox({
          title: '提示',
          message: '确定将此地址设置为默认地址？',
          showCancelButton: true
        })
          .then(action => {
            console.log(action)
            if (action === 'confirm') {
              this.$emit('selectedAddress', this.address.id)
            } else {
              return false
            }
          })
      } else {
        return false
      }
    },
    updata (id) {
      console.log(id)
      this.$messagebox({
        title: '提示',
        message: '确定重新编辑此地址？',
        showCancelButton: true
      })
        .then(action => {
          console.log(action)
          if (action === 'confirm') {
            this.$emit('updata', id)
          } else {
            return false
          }
        })
    },
    delId (id) {
      this.$messagebox({
        title: '提示',
        message: '确定删除此地址？',
        showCancelButton: true
      })
        .then(action => {
          console.log(action)
          if (action === 'confirm') {
            this.$emit('delAddress', this.address.id)
          } else {
            return false
          }
        })
    }
  },
  created () {
    if (this.address.type === '1') {
      this.isDefault = true
    } else if (this.address.type === '0') {
      this.isDefault = false
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
    font-size: 0.34rem;
    line-height: .34rem;
    color: rgb(34,34,34)
  }
  .address_mobile{
    float:right;
  }
  .addres_detail_desc{
    margin-top: 0.3rem;
    font-size: 0.26rem;
    line-height: .26rem;
    word-break: break-all;
    color: rgb(102,102,102);
  }
  /* 是否选中的控制 */
  .radio-add {
    display: block;
    line-height: .45rem;
    padding: .4rem .2rem;
    font-size: .28rem;
    position: relative;
  }
  /*.radio i {*/
    /*position: absolute;*/
    /*left: 0;*/
    /*top: 50%;*/
    /*margin-top: -9px;*/
    /*width: 6px;*/
    /*height: 6px;*/
    /*padding: 0;*/
    /*overflow: hidden;*/
    /*border-radius: 50%;*/
    /*background: #fff;*/
    /*margin-right: 10px;*/
    /*vertical-align: -4px;*/
    /*border: 6px solid #c8c8c8;*/
    /*display: inline-block;*/
  /*}*/
  /*i.checked {*/
    /*border-color: rgb(214, 83, 228);*/
  /*}*/
  .address-li-bottom {
    border-bottom: .1rem solid #ececed;
    margin-bottom: .2rem;
    padding: .3rem .2rem;
    font-size: .28rem;
    line-height: .28rem;
    color: rgb(102,102,102);
    position: relative;
  }
  .address-li-bottom span {
    padding-left: .7rem;
  }
  .i-yuan {
    width:.4rem;
    height: .4rem;
    border: 1px solid #ccc;
    border-radius: 50%;
    display: inline-block;
    padding: 0;
    position: absolute;
    top: .2rem;
  }
  .i-write {
    width:.41rem;
    height: .41rem;
    display: inline-block;
    padding: 0;
    position: absolute;
    top: .2rem;
    right: 2.5rem;
    background: url("./write.png") no-repeat center center;
    background-size: 100% 100%;
  }
  .i-delete {
    width:.41rem;
    height: .41rem;
    display: inline-block;
    padding: 0;
    position: absolute;
    top: .2rem;
    right: .9rem;
    background: url("./delete.png") no-repeat center center;
    background-size: 100% 100%;
  }
  .i-yuan.active {
    background: url("./change.png") no-repeat center center;
    background-size: 100% 100%;
  }
  .address-li-bottom span.span-write {
    float: right;
    padding-left: 0;
    margin-left: 1rem;
    font-size: .26rem;
    color: rgb(153,153,153);
  }
  .address-li-bottom span.span-delete {
    float: right;
    padding-left: 1rem;
    font-size: .26rem;
    color: rgb(153,153,153);
  }
</style>
