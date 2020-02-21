<template>
  <div style="padding: 0 20px">
    <div class="flex_table_top statics_num" style="padding: 10px 0;border-bottom: none;">
      省份分布
    </div>
    <div class="flex_column city_border">
      <div class="flex_row flex_city">
        <div class=" " style="font-size:14px; flex:1;">省份</div>
        <div class=" " style="font-size:14px; flex:1;">用户数</div>
        <div class=" " style="flex:2;"></div>
      </div>
      <div class="flex_row flex_country" v-for="(list,index) in cityList" :key="index">
        <div class=" " style="font-size:14px; flex:1;line-height:30px;">{{list.province}}</div>
        <div class=" " style="font-size:14px; flex:1;line-height:30px;">{{list.num}}</div>
        <div class=" " style="flex:2;">
          <mt-progress :value="list.num/list.total_num*100" :bar-height="10"></mt-progress>
        </div>
      </div>
      <div class="flex_row flex_country" v-if="!cityList.length" style="text-align: center; display: block">
        当前暂无人手术
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VipCityPage',
  props: ['cityList']
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
