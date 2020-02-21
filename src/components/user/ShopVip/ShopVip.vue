<template>
  <div>
    <div style="background-color:#fff" class="vip_msg" v-if="isReady">
      <mt-datetime-picker
      v-model="pickerValue1"
      ref="picker1"
      :endDate="new Date(new Date().getTime()-24*60*60*1000)"
      type="date"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      @confirm="handleConfirm1">
    </mt-datetime-picker>
      <mt-datetime-picker
        v-model="pickerValue2"
        ref="picker2"
        type="date"
        :endDate="new Date()"
        year-format="{value} 年"
        month-format="{value} 月"
        date-format="{value} 日"
        @confirm="handleConfirm2">
      </mt-datetime-picker>
      <HeaderBack :isActionShow="false" :header="header" :color="'rgb(214,83,228)'"></HeaderBack>
      <div class="vip_hedaer_box">
        <h3 class="vip_hedaer_title1">美美美城市合伙人</h3>
        <h4 class="vip_hedaer_title2">管理平台V1.0</h4>
        <img class="vip_hedaer_avatar" :src="per_info.headimgurl" alt="头像" />
        <p class="vip_hedaer_name">{{per_info.nickname}}</p>
        <p class="vip_hedaer_persontype">{{rule}}</p>
      </div>
      <mt-navbar v-model="active">
        <mt-tab-item id="1">
          用户增长
        </mt-tab-item>
        <mt-tab-item id="2">
          城市分布
        </mt-tab-item>
        <mt-tab-item id="3">
          收益分析
        </mt-tab-item>
      </mt-navbar>
      <mt-tab-container v-model="active" :swipeable="false">
        <mt-tab-container-item id="1">
          <div class="flex_table_top statics_num" style="border-bottom: 0px;">
            统计日期：<span class="date_select_border" @click="openPicker1">{{start.slice(0,-9)}}</span> 至 <span class="date_select_border" @click="openPicker2">{{end.slice(0,-9)}}</span>
          </div>
          <div class="flex_column city_border" style="margin: 0 20px;">
            <div class="flex_row flex_city">
              <div class=" " style="font-size:14px; flex:1; text-align: center;border-right: 1px solid #fff;">新增扫码人数</div>
              <div class=" " style="font-size:14px; flex:1; text-align: center;">累计扫码人数</div>
            </div>
            <div class="flex_row flex_country">
              <div class=" " style="font-size:14px; flex:1;line-height:30px; text-align: center;font-size:24px; color:rgb(253,119,164);font-style:italic;padding: 20px 0;">{{shop_scan.add}}</div>
              <div class=" " style="font-size:14px; flex:1;line-height:30px; text-align: center;font-size:24px; color:rgb(253,119,164);font-style:italic;padding: 20px 0;">{{shop_scan.sum}}</div>
            </div>
          </div>
          <div class="flex_column city_border" style="margin:20px">
            <div class="flex_row flex_city">
              <div class="flex_table_center" style="font-size:14px; flex:1;">时间</div>
              <div class="flex_table_center" style="font-size:14px; flex:1;">新扫码人数</div>
              <div class="flex_table_center" style="font-size:14px; flex:1;">累计扫码人数</div>
            </div>
            <div class="flex_row flex_country"  v-for="(list, index) in shop_scan.data" :key="index">
              <div class="flex_table_center" style="font-size:14px; flex:1;line-height:30px;">{{list.time}}</div>
              <div class="flex_table_center" style="font-size:14px; flex:1;line-height:30px;">{{list.today}}</div>
              <div class="flex_table_center" style="font-size:14px; flex:1;line-height:30px;">{{list.sum}}</div>
            </div>
            <div class="flex_row flex_country" v-if="shop_scan.data && shop_scan.data.length === 0" style="text-align: center; display: block">
              当前统计日期暂无人扫码
            </div>
          </div>
          <!--<div class="vip_pages_wrapper">
            <a class="vip_page_btn vip_page_next">></a>
            <a class="vip_page_btn vip_page_go">Go</a>
            <span class="vip_page_num">/ 580</span>
            <input class="vip_page_ipt" type="text" />
          </div>-->
          <div class="flex_table_top statics_num">
            扫码详情
          </div>
          <div @click="handleJump('/merchant')" v-if="per_info.rule === 18">
            <div>
              <div class="flex_row"
                   style="border: 1px solid #ccc;border-radius: 50px;margin: 25px 15px;background-color: #FD77A4;color: #fff;">
                <div class="flex_row_left" style="padding:0 10px 0 5px;">
                  <img src="./shangjia.png" class="wx_header" style="width:50px;height:50px;"/>
                </div>
                <div class="flex_row_center" style="display: flex; flex-direction: column;justify-content: center;">
                  <div class="" >店铺</div>
                  <div class="" style="font-size:15px;">直接{{statistics.shop_num}}家&nbsp;间接{{statistics.shop_insrect_num}}家</div>
                </div>
                <div class="flex_row_right">
                  <img :src="img_add" class="img_add" style="width:12px"/>
                </div>
              </div>
            </div>
          </div>
          <div @click="goTomy">
            <div>
              <div class="flex_row"
                   style="border: 1px solid #ccc;border-radius: 50px;margin: 25px 15px;background-color: #FE777E;color: #fff;">
                <div class="flex_row_left" style="padding:0 10px 0 5px;">
                  <img src="./geren.png" class="wx_header" style="width:50px;height:50px;"/>
                </div>
                <div class="flex_row_center" style="display: flex; flex-direction: column;justify-content: center;">
                  <div class="" >个人</div>
                  <div class="" style="font-size:15px;">直接{{statistics.user_num}}人&nbsp;间接{{statistics.user_insrect_num}}人&nbsp;<span v-if="per_info.rule === 17" >总层数{{statistics.user_level_num}}</span></div>
                </div>
                <div class="flex_row_right">
                  <img :src="img_add" class="img_add" style="width:12px"/>
                </div>
              </div>
            </div>
          </div>
          <!--<div>
            <div v-for="(item,index) in items">
              <vip_list_page :item = item :lv = '1'></vip_list_page>
            </div>
            <div v-for="(item,index) in item1s">
              <vip_list_page :item = item :lv = '2'></vip_list_page>
            </div>
          </div>-->
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <VipCityPage :cityList=cityList></VipCityPage>
        </mt-tab-container-item>
        <mt-tab-container-item id="3">
          <VipMoneyPage :startDate="pickerValue1" :endDate="pickerValue2" :moneyList=moneyList></VipMoneyPage>
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
import VipCityPage from '@/components/user/ShopVip/VipCityPage'
import VipMoneyPage from '@/components/user/ShopVip/VipMoneyPage'
import HeaderBack from '@/components/common/HeaderBack/HeaderBack'

export default {
  name: 'ShopVip',
  components: {
    VipCityPage,
    VipMoneyPage,
    HeaderBack
  },
  data () {
    return {
      isReady: false,
      isRouter: false,
      active: '1',
      img_add: require('./xiayiye128.png'),
      n: '',
      items: [
      ],
      list: [1, 2, 3],
      isShow: false,
      i: -1,
      share_sign: '',
      start: '',
      end: '',
      moneyList: [],
      cityList: [],
      pickerValue1: null,
      pickerValue2: null,
      per_info: '',
      shop_identity: '',
      rule: '游客',
      item1s: [],
      statistics: [],
      shop_scan: {
        add: 0,
        sum: 0
      },
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
    formatTime (date, dateType) {
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      if (month < 10) {
        month = '0' + month
      }
      var day = date.getDate()
      if (day < 10) {
        day = '0' + day
      }
      if (dateType === 'endDate') {
        return year + '-' + month + '-' + day + ' ' + '23:59:59'
      }
      return year + '-' + month + '-' + day + ' ' + '00:00:00'
    },
    getPeriodRecords (startDate, endDate) {
      // 日期前后比较 或者 选择第1个后，限制第2个日期范围
      if (endDate.getTime() < startDate.getTime()) {
        // 提醒日期选择
        this.$toast({
          message: '请选择正确的时间区间！',
          position: 'middle',
          duration: 2500
        })
        return
      }
      var self = this
      self.$indicator.open()
      let start = self.formatTime(startDate, 'startDate')
      let end = self.formatTime(endDate, 'endDate')
      PARTNER.vipScan(start, end)
        .then(function (res) {
          if (res.data.retCode === 0) {
            self.shop_scan = res.data.data
          } else {
            self.shop_scan.add = 0
            self.shop_scan.sum = 0
          }
          self.$indicator.close()
        }).catch(function (error) {
          console.log(error)
          self.$indicator.close()
        })
    },
    openPicker1 () {
      this.$refs.picker1.open()
    },
    handleConfirm1 (value) {
      this.start = this.formatTime(value, 'startDate')
      this.getPeriodRecords(value, this.pickerValue2)
    },
    openPicker2 () {
      this.$refs.picker2.open()
    },
    handleConfirm2 (value) {
      this.end = this.formatTime(value, 'endDate')
      this.getPeriodRecords(this.pickerValue1, value)
    },
    goTomy: function () {
      router.push('/user/my?parent_identify=' + this.per_info.identify_id)
    }
  },
  created: function () {
    var startTime = new Date()
    var loadTimeout = setTimeout(function () {
      self.$indicator.open()
    }, 1999)
    var self = this
    PARTNER.getMsg()
      .then(function (response) {
        if (response.data.retCode === 0) {
          self.cancelLoading(self, loadTimeout, startTime)
          self.per_info = response.data.data
          console.log(self.per_info.rule)
          if (self.per_info.rule == 18) {
                  self.rule = '城市合伙人'
             } else if(self.per_info.rule == 17) {
                  self.rule = '商家'
             }else if(self.per_info.rule == 16) {
                  self.rule = '普通用户'
             }else if(self.per_info.rule == 15) {
                  self.rule = '游客'
             }else{
                  self.rule = '其他'
             }
          self.shop_identity = response.data.data.identify_id
          PARTNER.vipFollow(self.shop_identity)
            .then(function (res) {
              if (res.data.retCode === 0) {
                self.items = res.data.data.lv0s
                self.item1s = res.data.data.lv1s
              }
            }).catch(function (error) {
              console.log(error)
            })
         }
        self.cancelLoading(self, loadTimeout, startTime)
      })
      .catch(function (error) {
        console.log('error', error)
        self.initLoading = false
      })
    // axios.get('/ashop/Store/partner_statistics')
    PARTNER.vipStatistics()
      .then(function (res) {
        self.statistics = res.data.data
      })
      .catch(function (error) {
        console.log('error', error)
      })
    PARTNER.vipStatisticsPlace(1)
      .then(function (res) {
        if (res.data.retCode === 0) {
        // console.log(res.data.data)
          self.cityList = res.data.data.data
          self.isReady = true
        }
      }).catch(function (error) {
        console.log(error)
      })
    // let request1 = '/shopqr/sta_shop_surprofit'
    // axios({
    //   method: 'post',
    //   url: request1,
    //   data: {
    //     start: self.start,
    //     end: self.end
    //   }
    // }).then(function (res) {
    //   // console.log("sss--------");
    //   // console.log(res);
    //   if (res.data.retCode == 0) {
    //     self.moneyList = res.data.data
    //   }
    // }).catch(function (error) {
    //   console.log(error)
    // })
    // 初始化日期显示
    function formatTime (date, dateType) {
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      if (month < 10) {
        month = '0' + month
      }
      var day = date.getDate()
      if (day < 10) {
        day = '0' + day
      }
      if (dateType === 'endDate') {
        return year + '-' + month + '-' + day + ' ' + '23:59:59'
      }
      return year + '-' + month + '-' + day + ' ' + '00:00:00'
    }
    var lastDay = new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
    self.pickerValue1 = lastDay
    self.pickerValue2 = new Date()
    self.start = formatTime(lastDay, 'startDate')
    self.end = formatTime(new Date(), 'endDate')
    // console.log('self.start',self.start,'self.end',self.end);
    // let request3 = '/shopqr/sta_shop_scan'
    // axios({
    //   method: 'post',
    //   url: request3,
    //   data: {
    //     start: self.start,
    //     end: self.end
    //   }
    // })
    PARTNER.vipScan(self.start, self.end)
      .then(function (res) {
        if (res.data.retCode === 0) {
          self.shop_scan = res.data.data
        } else {
          self.shop_scan = {}
          self.shop_scan.add = 0
          self.shop_scan.sum = 0
        }
      }).catch(function (error) {
      // console.log("ee--------");
        console.log(error)
      })
    PARTNER.vipSurprofit(self.start, self.end)
      .then(function (res) {
        // console.log("sss--------");
        // console.log(res);
        if (res.data.retCode === 0) {
          self.moneyList = res.data.data
        }
      }).catch(function (error) {
        console.log(error)
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
  /* tab */
  .vip_msg .mint-navbar {
    color: #b9bdba;
    border-bottom: 1px solid rgb(253,119,163);
  }
  .vip_msg .mint-tab-item-label {
    font-size: .28rem;
    padding: .3rem 0;
  }
  .vip_msg .mint-navbar .mint-tab-item {
    padding: 0;
    color: rgb(185,189,186);
    border-bottom:0 solid rgb(185,189,186);
  }
  .vip_msg .mint-navbar .mint-tab-item.is-selected {
    color: rgb(253,119,163);
  }
  .vip_msg .mint-navbar .mint-tab-item.is-selected .mint-tab-item-label {
    position:relative;
  }
  .vip_msg .mint-navbar .mint-tab-item.is-selected .mint-tab-item-label:before {
    content:"";
    position:absolute;
    left: 37.5%;
    bottom: 0;
    width: 25%;
    height: .04rem;
    background-color: rgb(253,119,163);
  }

  .flex_table_center {
    flex: 1;
    text-align: center;
  }
  .flex_table_top {
    padding: .2rem .4rem;
    font-size: .32rem;
    /*border-bottom: 1px solid #ffd5e1;*/
  }
  .flex_table_border {

  }
  .flex_city {
    color: #fff;
    background-color: rgb(253,119,164);
    border-top-left-radius: .12rem;
    border-top-right-radius: .12rem;
    border: 1px solid rgb(253,119,164);
  }
  .flex_country {
    border-bottom:1px solid #ffd5e1;
  }
  .city_border {
    border: 1px solid #ffd5e1;
    border-radius: .12rem;
  }
  .mt-progress-content {

  }
  .mt-progress-progress {
    background-color: #13af57;
  }
  .mt-progress-runway {
    background-color: #fff;
  }

  /* vip头部 */
  .vip_hedaer_box{
    overflow:hidden;
    text-align: center;
    background-image: url(./vip-bg-top.jpg);
    background-size:contain;
    background-repeat: no-repeat;
    line-height: 1;
    padding:0.9rem 0 0 0;
  }
  .vip_hedaer_title1{
    margin-top: .7rem;
    color:rgb(255,255,255);
    font-size: .42rem;
    font-weight: normal;
  }
  .vip_hedaer_title2{
    margin-top: .26rem;
    color:rgb(255,255,255);
    font-size: .32rem;
    font-weight: bold;
  }
  .vip_hedaer_avatar{
    display:inline-block;
    margin-top: .32rem;
    width: 1.6rem;
    height: 1.6rem;
    border-radius:100%;
  }
  .vip_hedaer_name{
    margin-top: .14rem;
    font-size: .3rem;
    font-weight: bold;
    color:rgb(253,119,163);
  }
  .vip_hedaer_persontype{
    margin-top: .1rem;
    margin-bottom: .8rem;
    color:rgb(116,123,118);
  }

  /* 统计日期样式*/
  .statics_num{
    font-size: .24rem;
    color:rgb(116,123,118);
    border-bottom: 1px solid #ffd5e1;
  }
  /* 分页*/
  .vip_pages_wrapper{
    margin: .2rem .4rem 1.2rem .4rem;
    text-align: center;
    font-size: .28rem;
    height: .72rem;
  }
  .vip_page_ipt{
    float:right;
    display: inline-block;
    box-sizing: border-box;
    width: 1rem;
    height: .7rem;
    line-height: .7rem;
    border:1px solid #eee;
    text-align: center;
  }
  .vip_page_num{
    float:right;
    display: inline-block;
    width:50px;
    height: 35px;
    line-height: 35px;
  }

  .vip_page_btn{
    float:right;
    display: inline-block;
    width:46px;
    height:35px;
    line-height: 35px;
    background-color:rgb(253,115,164);
  }
  .vip_page_go{
    margin-right: 8px;
    color: #fff;
  }
  .vip_page_next{
    background-color:#eee;
    color:black;
  }

  /* 选择日期 */
  .date_select_border{
    position:relative;
    line-height: 1;
    border: 1px solid rgb(241, 147, 178);;
    padding: 6px 8px;
    padding-right: 30px;
    background-image: url('./date_down_arrow.png');
    background-repeat: no-repeat;
    background-position: right 7px top 8px;
    background-size: 14px 9px;
  }
  /* 扫码用户信息显示 */
  .flex_column {
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid #ffd5e1;
  }
  .flex_row {
    display: flex;
    flex-direction: row;
    padding: 10px;
  }
  .flex_row_left {
    padding: 0 10px;
  }
  .wx_header {
    width: 70px;
    height: 70px;
    vertical-align: middle;
    border-radius: 50%;
  }
  .flex_row_center {
    flex: 1;
    position: relative;
  }
  .flex_row_center_top {
    margin-top: 10px;
    font-size: 16px;
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
    padding-right: 20px;
  }
  /* 下一级扫码用户 */
  .flex_row_next {
    padding: 15px 0px 15px 30px;
    border:none;
  }
</style>
