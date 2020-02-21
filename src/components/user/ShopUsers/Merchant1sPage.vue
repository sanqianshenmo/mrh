<template>
  <div style="background:#FDF3F2; height:100%">
    <div style="padding:15px;" v-if="saoma.length !== 0">
      <div  class="flex_row" style="background:#fff;margin-bottom:20px; padding:0;" v-for="(item, index) in saoma" :key="index">
        <div class="flex_row_left" style="padding:25px 10px;">
          <img v-if="item.headimgurl" :src="item.headimgurl" class="wx_header" style="width:50px;height:50px;"/>
          <img v-else src="./autoHeader2.png" class="wx_header" style="width:50px;height:50px;"/>
        </div>
        <div class="flex_row_center" style="display: flex; flex-direction: column;justify-content: center;">
          <div class="flex_row" style="font-size: 15px; font-weight: bold;padding: 2px 10px">{{item.nickname}}</div>
          <div class="flex_row" style="padding: 2px 10px">
            <div style="flex:1;">已扫码{{item.join_num}}人</div>
            <div style="flex:1;">已整形{{item.pro_num}}人</div>
          </div>
          <div class="flex_row" style="padding: 2px 10px">
            {{item.created_at}}
          </div>
        </div>
      </div>
    </div>
    <div style="text-align:center;font-size:16px;padding:50px 10px;" v-else>
      暂无数据
    </div>
  </div>
</template>

<script>
import router from '@/router'
export default {
  name: 'Merchant1sPage',
  props: ['saoma', 'type'],
  data () {
    return {
      active: '1',
      n: '',
      list: [1, 2, 3],
      isShow: false,
      i: -1,
      firsts: [],
      seconds: [],
      img_add: require('./xiayiye128b.png'),
      parent_identify: [],
      statisticsMsg: ''
    }
  },
  methods: {
    handleJump: function (val) {
      router.push(val)
    },
    show: function (index) {
      this.i = index
    }
  }
}
</script>

<style scoped>
  /* 扫码用户信息显示 */
  .flex_column {
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid #ffd5e1;
  }
  .flex_row {
    display: flex;
    flex-direction: row;
    padding: .2rem;
  }
  .flex_row_left {
    padding: 0 .2rem;
  }
  .wx_header {
    width: 1.4rem;
    height: 1.4rem;
    vertical-align: middle;
    border-radius: 50%;
  }
  .flex_row_center {
    flex: 1;
    position: relative;
  }
  .flex_row_center_top {
    margin-top: .2rem;
    font-size: .32rem;
    font-weight: 700;
  }
  .flex_row_center_bottom {
    position: absolute;
    bottom: 0;
  }
  .flex_row_right {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-right: .4rem;
  }
  /* 下一级扫码用户 */
  .flex_row_next {
    padding: .3rem 0 .3rem .6rem;
    border:none;
  }
  .wx_header_next {
    width: 1rem;
    height: 1rem;
  }
  .flex_row_center_top_next {
    margin-top: 0;
    font-size: .28rem;
    font-weight: 400;
  }
  .flex_row_center_bottom_next {
    font-size: .24rem;
  }
  a {
    color: #000;
  }
</style>
