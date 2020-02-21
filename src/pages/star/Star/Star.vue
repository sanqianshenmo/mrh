<template>
    <div class="star">
      <div class="star-header">选择星座</div>
      <div class="star-main">
        <div class="star-main-flex1">
          <div class="star-main-row" @click="gotoShow(1)">
            <div class="flex1"><img src="./animal1.png" alt=""></div>
            <div class="flex2">白羊座</div>
            <div class="flex3">3.21~4.19</div>
          </div>
          <div class="star-main-row" @click="gotoShow(2)">
            <div class="flex1"><img src="./animal2.png" alt=""></div>
            <div class="flex2">金牛座</div>
            <div class="flex3">4.20~5.20</div>
          </div>
          <div class="star-main-row" @click="gotoShow(3)">
            <div class="flex1"><img src="./animal3.png" alt=""></div>
            <div class="flex2">双子座</div>
            <div class="flex3">5.21~6.21</div>
          </div>
        </div>
        <div class="star-main-flex1">
          <div class="star-main-row" @click="gotoShow(4)">
            <div class="flex1"><img src="./animal4.png" alt=""></div>
            <div class="flex2">巨蟹座</div>
            <div class="flex3">6.21~7.22</div>
          </div>
          <div class="star-main-row" @click="gotoShow(5)">
            <div class="flex1"><img src="./animal5.png" alt=""></div>
            <div class="flex2">狮子座</div>
            <div class="flex3">7.23~8.22</div>
          </div>
          <div class="star-main-row" @click="gotoShow(6)">
            <div class="flex1"><img src="./animal6.png" alt=""></div>
            <div class="flex2">处女座</div>
            <div class="flex3">8.23~9.22</div>
          </div>
        </div>
        <div class="star-main-flex1">
          <div class="star-main-row" @click="gotoShow(7)">
            <div class="flex1"><img src="./animal7.png" alt=""></div>
            <div class="flex2">天秤座</div>
            <div class="flex3">9.23~10.22</div>
          </div>
          <div class="star-main-row" @click="gotoShow(8)">
            <div class="flex1"><img src="./animal8.png" alt=""></div>
            <div class="flex2">天蝎座</div>
            <div class="flex3">10.23~11.21</div>
          </div>
          <div class="star-main-row" @click="gotoShow(9)">
            <div class="flex1"><img src="./animal9.png" alt=""></div>
            <div class="flex2">射手座</div>
            <div class="flex3">11.22~12.21</div>
          </div>
        </div>
        <div class="star-main-flex1">
          <div class="star-main-row" @click="gotoShow(10)">
            <div class="flex1"><img src="./animal10.png" alt=""></div>
            <div class="flex2">摩羯座</div>
            <div class="flex3">12.22~1.19</div>
          </div>
          <div class="star-main-row" @click="gotoShow(11)">
            <div class="flex1"><img src="./animal11.png" alt=""></div>
            <div class="flex2">水瓶座</div>
            <div class="flex3">1.20~2.18</div>
          </div>
          <div class="star-main-row" @click="gotoShow(12)">
            <div class="flex1"><img src="./animal12.png" alt=""></div>
            <div class="flex2">双鱼座</div>
            <div class="flex3">2.19~3.20</div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import router from '@/router'
export default {
  name: 'Star',
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
  -webkit-justify-content: space-around;
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
  width: 1rem;
}
</style>
