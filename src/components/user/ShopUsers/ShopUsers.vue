<template>
  <div style="background-color: #FDF3F2; height:100%;" class="user_msg">
    <mt-navbar v-model="active">
      <mt-tab-item id="1">
        已扫码({{saoma.join_num}})
      </mt-tab-item>
      <mt-tab-item id="2">
        已整形({{saoma.pro_num}})
      </mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="active" :swipeable="true">
      <mt-tab-container-item id="1">
        <Merchant1sPage :saoma = 'saomaList'></Merchant1sPage>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <merchant1sPage :saoma = 'saomaList1' ></merchant1sPage>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
import Merchant1sPage from '@/components/user/ShopUsers/Merchant1sPage'
import router from '@/router'
import {PARTNER} from '@/models'
export default {
  name: 'ShopUsers',
  components: {
    Merchant1sPage
  },
  data () {
    return {
      active: '1',
      n: '',
      items: [
      ],
      list: [1, 2, 3],
      isShow: false,
      i: -1,
      firsts: [],
      seconds: [],
      saomaList: [],
      saoma: '',
      saomaList1: []
    }
  },
  methods: {
    handleJump: function (val) {
      router.push(val)
    },
    show: function (index) {
      this.i = index
    }
  },
  created: function () {
    // 打印出来
    /* 跳转授权登录 */
    var self = this
    // var params = '/per_info'
    // axios.get(params)
    PARTNER.getMsg()
      .then(function (res) {
      })
      .catch(function (error) {
        console.log('error', error)
        self.initLoading = false
      })
    var url = window.location.href.split('?')[1]
    var list = url.split('=')[1]

    // axios.get('/ashop/Store/custom_statistics?parent_identify=' + list)
    PARTNER.myStatistics(list, '')
      .then(function (res) {
        self.saoma = res.data.data
        self.saomaList = res.data.data.list
      })
      .catch(function (error) {
        console.log('error', error)
        self.initLoading = false
      })
    // axios.get('/ashop/Store/custom_statistics?parent_identify=' + list + '&type=2')
    PARTNER.myStatistics(list, 2)
      .then(function (res) {
        self.saoma = res.data.data
        self.saomaList1 = res.data.data.list
      })
      .catch(function (error) {
        console.log('error', error)
        self.initLoading = false
      })
  }
}
</script>

<style scoped>

</style>
