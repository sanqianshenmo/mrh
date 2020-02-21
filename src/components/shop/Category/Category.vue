<template>
  <div>
    <ul class="shop-nav clearfloat" v-if="!category">
      <li><a href=""><img src="./icon1.png" data-id="15">胸部</a></li>
      <li><a href=""><img src="./icon2.png" data-id="18">秘密</a></li>
      <li><a href=""><img src="./icon3.png" data-id="24">吸脂</a></li>
      <li><a href=""><img src="./icon4.png" data-id="31">唇部</a></li>
      <li><a href=""><img src="./icon5.png" data-id="25">下颌</a></li>
      <li><a href=""><img src="./icon6.png" data-id="26">眼部</a></li>
      <li><a href=""><img src="./icon7.png" data-id="27">鼻部</a></li>
      <li><a href=""><img src="./icon8.png" data-id="28">除皱</a></li>
      <li><a href=""><img src="./icon9.png" data-id="29">眉部</a></li>
      <li><a href=""><img src="./icon10.png" data-id="30">全部</a></li>
    </ul>
    <ul class="shop-nav clearfloat" v-else>
      <li v-for="(cateList,index) in category"
          v-bind:key="cateList.id"
          @click="showId(cateList.id,index+1)"
          :style="{'opacity':activeIndex===index+1?'1':'0.5'}">
        <a>
          <img v-if="!cateList.logo" src="./icon1.png">
          <img v-else :src="baseImgUrl +cateList.logo">
          {{cateList.name}}
        </a>
      </li>
      <li @click="showId(1,0)"
          :style="{'opacity':activeIndex===0?'1':'0.5'}">
        <a>
          <img src="./icon10.png">
          全部
        </a>
      </li>
    </ul>
  </div>

</template>

<script>
export default {
  name: 'Category',
  props: ['category'],
  data () {
    return {
      baseImgUrl: 'http://mrhmr.com/',
      activeIndex: 0
    }
  },
  created () {
    // console.log(this.category)
  },
  methods: {
    showId (id, index) {
      console.log(id, index)
      this.$emit('changeId', id)
      // 改变样式
      this.activeIndex = index
    }
  }
}
</script>

<style scoped>
.shop-nav {
    background: #fff;
    padding: .1rem .25rem .6rem;
}
.shop-nav li {
    width: 20%;
    float: left;
    padding-top: .3rem;
    text-align: center;
    font-size: .24rem;
}
.clearfloat {
    zoom: 1;
}
ul, li, dl, dd, dt {
    list-style-type: none;
    padding: 0px;
    margin: 0px;
    border: none;
}
.shop-nav li {
  opacity: 0.5;
}
.shop-nav li:nth-last-child(1) {
  opacity: 1;
}
.shop-nav li img {
    width: .9rem;
    height: .9rem;
    display: block;
    margin: 0 auto .1rem;
    border-radius: 50%;
}
.shop-nav li a {
  color: rgb(104,104,104);
}
</style>
