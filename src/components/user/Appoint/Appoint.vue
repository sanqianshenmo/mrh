<template>
  <div class="apply">
    <header>
      <div @click="goToUser">
        <img src="./back.png" alt="">
      </div>
      我的预约
    </header>
    <div  v-if="true">
      <div class="main-top">
        <span :class="{active: whatShow === 0}" @click="changeShow(0)">全部</span>
        <span :class="{active: whatShow === 1}" @click="changeShow(1)">已预约</span>
        <span :class="{active: whatShow === 2}" @click="changeShow(2)">已完成</span>
      </div>
      <div v-if="whatShow === 0">
        <div class="box">
          <div class="col-lines"></div>
          <div class="box-top">您的全身全脸整形手术<span>已预约成功</span></div>
          <div class="box-bottom">
            <div class="box-bottom-left">
              <div class="box-bottom-left-top">
                <img src="./shu.png" alt="" >
                <div><span>手术项目：</span>吸脂--副乳（双侧）</div>
              </div>
              <div class="box-bottom-left-bottom">
                <img src="./day.png" alt="">
                <div><span>手术日期：</span>2018-05-11 09:00</div>
              </div>
            </div>
            <div class="box-bottom-right">
              <img src="./money.png" alt="">
              <div>已支付定金</div>
            </div>
          </div>
          <div class="box-doctory">
            <div class="box-doctory-left">
              <img src="./doctory.png" alt="">
            </div>
            <div class="box-doctory-right">
              <div class="box-doctory-right-top"><span>手术医师：</span>刘婧杰</div>
              <div class="box-doctory-right-bottom"><span>点选方式：</span>美美美推荐</div>
            </div>
          </div>
        </div>
        <div class="box">
          <div class="col-lines"></div>
          <div class="box-top">您的全身全脸整形手术<span>已完成</span></div>
          <div class="box-bottom">
            <div class="box-bottom-left">
              <div class="box-bottom-left-top">
                <img src="./shu.png" alt="" >
                <div><span>手术项目：</span>吸脂--副乳（双侧）</div>
              </div>
              <div class="box-bottom-left-bottom">
                <img src="./day.png" alt="">
                <div><span>手术日期：</span>2018-05-11 09:00</div>
              </div>
            </div>
            <div class="box-bottom-right">
              <img src="./money.png" alt="">
              <div>已付全款</div>
            </div>
          </div>
          <div class="box-doctory">
            <div class="box-doctory-left">
              <img src="./doctory.png" alt="">
            </div>
            <div class="box-doctory-right">
              <div class="box-doctory-right-top"><span>手术医师：</span>刘婧杰</div>
              <div class="box-doctory-right-bottom"><span>点选方式：</span>自付点选费1万元</div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="whatShow === 1">
        <div class="box">
          <div class="col-lines"></div>
          <div class="box-top">您的全身全脸整形手术<span>已预约成功</span></div>
          <div class="box-bottom">
            <div class="box-bottom-left">
              <div class="box-bottom-left-top">
                <img src="./shu.png" alt="" >
                <div><span>手术项目：</span>吸脂--副乳（双侧）</div>
              </div>
              <div class="box-bottom-left-bottom">
                <img src="./day.png" alt="">
                <div><span>手术日期：</span>2018-05-11 09:00</div>
              </div>
            </div>
            <div class="box-bottom-right">
              <img src="./money.png" alt="">
              <div>已支付定金</div>
            </div>
          </div>
          <div class="box-doctory">
            <div class="box-doctory-left">
              <img src="./doctory.png" alt="">
            </div>
            <div class="box-doctory-right">
              <div class="box-doctory-right-top"><span>手术医师：</span>刘婧杰</div>
              <div class="box-doctory-right-bottom"><span>点选方式：</span>美美美推荐</div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="whatShow === 2">
        <div class="noapply" v-if="true">
          <img src="./none.png" alt="">
          <div>亲，您还没有报名免费整形哦~</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import router from '@/router'
import {Header} from 'mint-ui'
Vue.component(Header.name, Header)
export default {
  name: 'Appoint',
  data () {
    return {
      whatShow: 0
    }
  },
  methods: {
    goToUser () {
      router.push('/user')
    },
    changeShow (val) {
      this.whatShow = val
    }
  }
}
</script>

<style scoped>
.col-lines {
    float: left;
    width: .04rem;
    height: .26rem;
    background-color: rgb(214,83,228);
    margin-top: .48rem;
  }
.box-bottom-left-top img {
    width: .25rem;
    height: .22rem;
    margin-top: .05rem;
    float: left;
  }
.box-bottom-left-bottom img {
    width: .28rem;
    height: .28rem;
    float: left;
    padding-top: .28rem;
  }
.box-bottom-left-bottom div {
    padding-top: .24rem;
    text-indent: .18rem;
    font-size: .26rem;
    color: rgb(102,102,102);
  }
.box-bottom-left-top div {
    text-indent: .18rem;
    font-size: .26rem;
    color: rgb(102,102,102);
  }
.box-bottom-left-top div span, .box-bottom-left-bottom div span {
    font-size: .26rem;
    color: rgb(61,61,61);
  }
.box-bottom-right img {
    width: .26rem;
    height: .27rem;
    margin: 0 auto;
  }
.box-bottom-right div {
    padding-top: .2rem;
    color: rgb(102,102,102);
    font-size: .24rem;
  }
.box-bottom {
    display: flex;
    padding: .3rem 0 .28rem 0;
    border-bottom: 1px solid rgb(215,215,215);
  }
.box-bottom-left {
    flex: 1;
  }
.box {
    padding: 0 .2rem;
    background-color: #fff;
  }
.box-top {
    padding: .4rem 0 .3rem 0;
    border-bottom: 1px solid rgb(215,215,215);
    text-indent: .2rem;
    font-size: .3rem;
    color: #000;
  }
.box-top span {
  margin-left: .3rem;
  line-height: .24rem;
  font-size: .24rem;
  background: -moz-linear-gradient(left, #bc7aff 0%, #d653e4 100%);
  background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#bc7aff), color-stop(100%,#d653e4));
  background: -webkit-linear-gradient(left, #bc7aff 0%,#d653e4 100%);
  background: -o-linear-gradient(left, #bc7aff 0%,#d653e4 100%);
  background: -ms-linear-gradient(left, #bc7aff 0%,#d653e4 100%);
  background: linear-gradient(to right, #bc7aff 0%,#d653e4 100%);
  padding: .03rem .2rem 0 .2rem;
  color: #fff;
  border-bottom-left-radius: .1rem;
  border-top-right-radius: .1rem;
}
.apply header {
    padding: .3rem 0;
    text-align: center;
    font-size: .34rem;
    color: rgb(34,34,34);
    background-color: #fff;
    margin-bottom: .2rem;
  }
.apply header img {
    width: .2rem;
    height: .35rem;
    position: absolute;
    padding-left: .4rem;
  }
.noapply img {
    width: 3.32rem;
    height: 2.14rem;
    margin: 2rem auto 1rem auto;
  }
.noapply div {
    text-align: center;
  }
.box-doctory {
  height: 1.2rem;
  margin-bottom: .2rem;
}
.box-doctory-left,.box-doctory-right {
  float: left;
}
.box-doctory-right {
  margin-top: .3rem;
}
.box-doctory-left img {
  width: .61rem;
  height: .61rem;
  /*border-radius: 50%;*/
  padding: .3rem .3rem .3rem 0;
}
.box-doctory-right-top {
  font-size: .26rem;
  color: rgb(63,63,63);
  line-height: .26rem;
}
.box-doctory-right-top span {
  color: rgb(102,102,102);
}
.box-doctory-right-bottom {
  font-size: .24rem;
  color: rgb(102,102,102);
  line-height: .26rem;
  padding-top: .12rem;
}
.box-doctory-right-bottom span {
  font-size: .26rem;
}
.main-top {
  height: 1rem;
  background-color: #fff;
  border-bottom: 1px solid rgb(215,215,215);
  padding-left: .42rem;
  font-size: .3rem;
  color: rgb(34,34,34);
}
.main-top span {
  height: 1rem;
  line-height: 1rem;
  padding-bottom: .3rem;
  margin-right: .6rem;
}
.main-top span.active {
  color: rgb(214,83,228);
  border-bottom: 3px solid rgb(214,83,228);
}
</style>
