<template>
  <div class="star">
    <div class="star-header">选择生肖</div>
    <div class="star-main">
      <div class="star-main-flex1">
        <div class="star-main-row" @click="gotoShow(13)">
          <div class="flex1"><img src="./001.png" alt=""></div>
          <div class="flex2">子鼠</div>
        </div>
        <div class="star-main-row" @click="gotoShow(14)">
          <div class="flex1"><img src="./002.png" alt=""></div>
          <div class="flex2">丑牛</div>
        </div>
        <div class="star-main-row" @click="gotoShow(15)">
          <div class="flex1"><img src="./003.png" alt=""></div>
          <div class="flex2">寅虎</div>
        </div>
      </div>
      <div class="star-main-flex1">
        <div class="star-main-row" @click="gotoShow(16)">
          <div class="flex1"><img src="./004.png" alt=""></div>
          <div class="flex2">卯兔</div>
        </div>
        <div class="star-main-row" @click="gotoShow(17)">
          <div class="flex1"><img src="./005.png" alt=""></div>
          <div class="flex2">辰龙</div>
        </div>
        <div class="star-main-row" @click="gotoShow(18)">
          <div class="flex1"><img src="./006.png" alt=""></div>
          <div class="flex2">巳蛇</div>
        </div>
      </div>
      <div class="star-main-flex1">
        <div class="star-main-row" @click="gotoShow(19)">
          <div class="flex1"><img src="./007.png" alt=""></div>
          <div class="flex2">午马</div>
        </div>
        <div class="star-main-row" @click="gotoShow(20)">
          <div class="flex1"><img src="./008.png" alt=""></div>
          <div class="flex2">未羊</div>
        </div>
        <div class="star-main-row" @click="gotoShow(21)">
          <div class="flex1"><img src="./009.png" alt=""></div>
          <div class="flex2">申猴</div>
        </div>
      </div>
      <div class="star-main-flex1">
        <div class="star-main-row" @click="gotoShow(22)">
          <div class="flex1"><img src="./010.png" alt=""></div>
          <div class="flex2">酉鸡</div>
        </div>
        <div class="star-main-row" @click="gotoShow(23)">
          <div class="flex1"><img src="./011.png" alt=""></div>
          <div class="flex2">戌狗</div>
        </div>
        <div class="star-main-row" @click="gotoShow(24)">
          <div class="flex1"><img src="./012.png" alt=""></div>
          <div class="flex2">亥猪</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from '@/router'
export default {
  name: 'Animal',
  methods: {
    /* 跳转展示页 */
    gotoShow (id) {
      router.push({name: 'show', params: { id: id }})
    }
  }
}
</script>

<style scoped>
  .star {
    height: 100%;
    min-height: 12rem;
    background: -moz-linear-gradient(top, rgb(189,122,254) 0%, rgb(213,84,228) 100%);
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgb(189,122,254)), color-stop(100%,rgb(213,84,228)));
    background: -webkit-linear-gradient(top, rgb(189,122,254) 0%,rgb(213,84,228) 100%);
    background: -o-linear-gradient(top, rgb(189,122,254) 0%,rgb(213,84,228) 100%);
    background: -ms-linear-gradient(top, rgb(189,122,254) 0%,rgb(213,84,228) 100%);
    background: linear-gradient(top, rgb(189,122,254) 0%,rgb(213,84,228) 100%);
  }
  .star-header {
    padding: .4rem;
    text-align: center;
    font-size: .48rem;
    color: #fff;
    margin:0 .2rem;
    border-bottom: 1px solid rgba(255,255,255,.5);
  }
  .star-main {
    margin: 0 .2rem;
    display: flex;
    flex-direction: column;
  }
  .star-main-flex1 {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
  .star-main-row {
    display: flex;
    flex-direction: column;
  }
  .star-main-row .flex1 {
    padding: .2rem;
  }
  .star-main-row .flex2 {
    color: #fff;
    font-size: .3rem;
    text-align: center;
  }
  .star-main-row .flex3 {
    color: #fff;
    font-size: .26rem;
    text-align: center;
    padding-top: .1rem;
  }
  .star-main-row .flex1 img{
    width: 1.5rem;
  }
</style>
