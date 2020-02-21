<template>
<div style="width: 100%; height: 100%;">
  <HeaderBack :isActionShow="true" :header="header" :color="'rgb(214,83,228)'"></HeaderBack>
  <!--<div style="margin-top: .88rem">
    <div class="top-cegion">
      <div>
        <span>北京</span>
        <img src="./arrow.png" class="arrow-style">
      </div>
      <div class="title-top">
        <span>直辖市</span>
        <img src="./arrow.png" class="arrow-style">
      </div>
      <div>
        <span>海淀区</span>
        <img src="./arrow.png" class="arrow-style">
      </div>
    </div>
  </div>-->
  <mapDrag class="mapbox" :lng="116.466857" :lat="40.002394"></mapDrag>
  <!--<div class="input-style">
      <div class="input-style1">
        <span class="title"> 北京丽人之光医疗美容</span>
        <div class="text">北京朝阳区北四环东路116号...</div>
      </div>
      <input  type="button" value="导航" class="button-style">
  </div>
  <div class="button-style1">
    <button>百度地图</button>
    <button>取消</button>
  </div>-->
</div>
</template>

<script>
import HeaderBack from '@/components/common/HeaderBack/HeaderBack'
import mapDrag from '@/pages/map/mapDrag'
export default {
  name: 'Map',
  components: {HeaderBack, mapDrag},
  data () {
    return {
      header: {
        title: '服务网点'
      }
    }
  }
}
</script>

<style scoped>
.top-cegion{
  background-color: #FFF;
  font-size: .3rem;
  color: rgb(214,83,288);
  display: flex;
  height: .9rem;
  align-items: center;
  padding: 0 .4rem;
}
.arrow-style{
  width: .18rem;
  height: .11rem;
  display: inline-block;
  margin-left: .2rem;
}
.title-top{
  margin: auto;
}
.input-style{
  margin-top: 1.8rem;
  font-size: 0;
  text-align: center;
}
.input-style1{
  width: 4.2rem;
  height: .94rem;
  border-color: #FFF;
  background-color: #FFF;
  border-radius: .1rem 0 0 .1rem;
  vertical-align: middle;
  margin: auto;
  display: inline-block;
  border-style:solid;
  border-width:1px;
}
.button-style{
  width: 1.66rem;
  height: .94rem;
  color: rgb(255,255,255);
  font-size: .36rem;
  border: 0;
  border-radius: 0 .1rem .1rem 0;
  vertical-align: middle;
  background: rgb(214,83,228) url('navigation.png') no-repeat;
  background-size: 0.32rem 0.38rem;
  background-position: .3rem 0.3rem;
  padding: 0 0rem 0 .5rem;
  display: inline-block;
  margin: auto;
}
.title{
  color: rgb(34,34,34);
  font-size: .3rem;
  margin-right: .8rem;
  line-height: .54rem;
}
.text{
  color: rgb(153,153,153);
  font-size: .24rem;
  margin-right: .6rem;
}
button{
  width: 100%;
  padding: .38rem 0 .37rem 0;
  margin: .2rem 0 0 0;
  color: rgb(214,83,228);
  font-size: .3rem;
  background-color: #FFF;
  border: 0;
}
.button-style1{
  bottom: 0;
  position: fixed;
  width: 100%;
}
.mapbox{ width: 100%; height: 100%; margin-bottom: 20px; float: left; }
</style>
