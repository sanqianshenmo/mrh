<template>
  <div>
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
    <div class="flex_table_top statics_num" style="border-bottom: 0;">
      统计日期：<span class="date_select_border" @click="openPicker1">{{startDate|formatDate}}</span> 至 <span class="date_select_border" @click="openPicker2">{{endDate|formatDate}}</span>
    </div>
    <div class="flex_column city_border" style="margin: 0 20px;">
      <div class="flex_row flex_city">
        <div class=" " style="font-size:14px; flex:1; text-align: center;border-right: 1px solid #fff;">新增收益</div>
        <div class=" " style="font-size:14px; flex:1; text-align: center;">累计收益</div>
      </div>
      <div class="flex_row flex_country">
        <div class=" " style="font-size:14px; flex:1;line-height:30px; text-align: center;font-size:24px; color:rgb(253,119,164);font-style:italic;padding: 20px 0;">{{moneyList.add}}</div>
        <div class=" " style="font-size:14px; flex:1;line-height:30px; text-align: center;font-size:24px; color:rgb(253,119,164);font-style:italic;padding: 20px 0;">{{moneyList.sum}}</div>
      </div>
    </div>
    <div class="flex_column city_border" style="margin:20px;">
      <div class="flex_row flex_city">
        <div class="flex_table_center" style="font-size:14px; flex:1;">时间</div>
        <div class="flex_table_center" style="font-size:14px; flex:1;">微信昵称</div>
        <div class="flex_table_center" style="font-size:14px; flex:1;">手术项目</div>
        <div class="flex_table_center" style="font-size:14px; flex:1;">收益金额</div>
      </div>
      <div class="flex_row flex_country" v-for="(list, index) in moneyList.data" :key="index">
        <div class="flex_table_center" style="font-size:14px; flex:1;line-height:30px;">{{list.time}}</div>
        <div class="flex_table_center" style="font-size:14px; flex:1;line-height:30px;">{{list.nickname}}</div>
        <div class="flex_table_center" style="font-size:14px; flex:1;line-height:30px;">{{list.sur}}</div>
        <div class="flex_table_center" style="font-size:14px; flex:1;line-height:30px;">{{list.profit}}</div>
      </div>
      <div class="flex_row flex_country" v-if="moneyList.data && moneyList.data.length === 0" style="text-align: center; display: block">
        当前统计日期暂无收益
      </div>
    </div>
  </div>
</template>

<script>
import {PARTNER} from '@/models'

export default {
  name: 'VipMoneyPage',
  props: ['startDate', 'endDate', 'moneyList'],
  data () {
    return {
      pickerValue1: null,
      pickerValue2: null
    }
  },
  filters: {
    formatDate: function (date) {
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      if (month < 10) {
        month = '0' + month
      }
      var day = date.getDate()
      if (day < 10) {
        day = '0' + day
      }
      return year + '-' + month + '-' + day
    }
  },
  methods: {
    formatTime: function (date, dateType) {
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
      // let request3 = '/shopqr/sta_shop_surprofit'
      // axios({
      //   method: 'post',
      //   url: request3,
      //   data: {
      //     start: start,
      //     end: end
      //   }
      // })
      PARTNER.vipSurprofit(start, end)
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
      var self = this
      self.startDate = value
      self.getPeriodRecords(value, self.pickerValue2)
    },
    openPicker2 () {
      this.$refs.picker2.open()
    },
    handleConfirm2 (value) {
      var self = this
      self.endDate = value
      self.getPeriodRecords(self.pickerValue1, value)
    }
  },
  created () {
    var self = this
    self.pickerValue1 = self.startDate
    self.pickerValue2 = self.endDate
  },
  watch: {
    startDate (n, o) {
      this.pickerValue1 = n
    },
    endDate (n, o) {
      this.pickerValue1 = n
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
