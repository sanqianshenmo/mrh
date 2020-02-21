<template>
  <div style="height:100%">
    <div style="background-color: #FDF3F2; height:100%;padding:0.8rem 0 0 0;" class="user_msg" v-if="isReady">
      <HeaderBack :isActionShow="false" :header="header" :color="'rgb(214,83,228)'"></HeaderBack>
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
          <MerchantsPage :saoma = 'saomaList' :zanwu = 'zanwu1'></MerchantsPage>

        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <MerchantsPage :saoma = 'saomaList1' :zanwu = 'zanwu2'></MerchantsPage>

        </mt-tab-container-item>
      </mt-tab-container>
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
import {PARTNER} from '@/models'
import MerchantsPage from '@/components/user/ShopMy/MerchantsPage'
import HeaderBack from '@/components/common/HeaderBack/HeaderBack'
export default {
  name: 'ShopMy',
  data () {
    return {
      isReady: false,
      isRouter: false,
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
      zanwu1: '暂时没有人扫描您的专属二维码',
      zanwu2: '暂时没有人扫您的码后整形',
      saomaList1: [],
      header: {
                    title: '扫码统计'
                  }
    }
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
    show: function (index) {
      this.i = index
    }
  },
  components: {
    MerchantsPage,
    HeaderBack
  },
  created: function () {
    var startTime = new Date()
    var loadTimeout = setTimeout(function () {
      self.$indicator.open()
    }, 1999)
    // 打印出来

    /* 跳转授权登录 */
    var self = this
    // var params = '/per_info'
    // axios.get(params)
    PARTNER.getMsg()
      .then(function (res) {
        self.cancelLoading(self, loadTimeout, startTime)
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
        self.isReady = true
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
    // 延时跳转404页面
    setTimeout(function () {
      if (self.isReady === false) {
        self.isRouter = true
      }
    }, 10000)
  }
}
</script>

<style>
  /* 顶部tab */
  .user_msg .mint-navbar {
    background: -moz-linear-gradient(left, #FE767E 0%, #FE77A2 100%);
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#FE767E), color-stop(100%,#FE77A2));
    background: -webkit-linear-gradient(left, #FE767E 0%,#FE77A2 100%);
    background: -o-linear-gradient(left, #FE767E 0%,#FE77A2 100%);
    background: -ms-linear-gradient(left, #FE767E 0%,#FE77A2 100%);
    background: linear-gradient(to right, #FE767E 0%,#FE77A2 100%);
    color: #fff;
  }
  .user_msg .mint-tab-container {
    color: rgb(102,102,102);
  }
  /* 改变主题色 */
  .user_msg .mint-navbar .mint-tab-item {
    padding: .2rem 0;
  }
  .user_msg .mint-navbar .mint-tab-item.is-selected {
    /* tab选中样式 */
    border:none;
    color: #fff;
    margin-bottom: 0;
  }
  .user_msg .mint-tab-item-label {
    margin: 0 .6rem;
    padding: .2rem;
    border-radius: .4rem;
    font-size: .28rem;
  }
  .user_msg .mint-navbar .mint-tab-item.is-selected .mint-tab-item-label {
    background-color: #FE8DA1;
  }
  .user_msg a {
    color: #000;
  }
</style>
