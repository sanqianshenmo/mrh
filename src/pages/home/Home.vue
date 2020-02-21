<template>
  <div class="pb-160 home-bg">
    <div class="home-carousel-wrapper">
      <div class="home-search-wrapper">
        <div class="home-place" >
          <span class="home-place-text">全国</span>
          <img v-show="true" class="home-place-icon" src="./place-arrow-down.png" alt="图标" title="图标">
        </div>
        <div class="home-ipt" @click="gotoSearch">
          <div class="home-ipt-search-show"><img  class="home-diary-icon" src="./icon-search.png" alt="图标">搜索日记</div>
          <!-- <input type="text" placeholder="搜索你感兴趣的项目"> -->
        </div>
      </div>
      <mt-swipe class="home-carousel" :auto="4000" :speed="1000">
        <mt-swipe-item v-for="carousel in carousels" :key="carousel.id" @click=carouselJump()>
          <!--<img :src="IMG_PREFIX+carousel.pic" alt="轮播图" title="轮播图">-->
          <a @click="gotoGoodsDetail(carousel.data_id)" v-if="carousel.type ===0">
            <img v-if="!carousel.pic" src="./banner.png" alt="">
            <img v-else :src="IMG_PREFIX+carousel.pic" alt="">
          </a>
          <a :href="carousel.url" v-else>
            <img v-if="!carousel.pic" src="./banner.png" alt="">
            <img v-else :src="IMG_PREFIX+carousel.pic" alt="">
          </a>
        </mt-swipe-item>
        <mt-swipe-item v-if="!carousels"><img src="./banner.png" alt="轮播图" title="轮播图"></mt-swipe-item>
      </mt-swipe>
      <div class="home-carousel-shelter"></div>
    </div>
    <div class="home-menu-bg">
      <HomeCategory class="pt-41" :menus="homeCategory.first"></HomeCategory>
     <!-- <HomeCategory class="mt-41 pb-56" :menus="homeCategory.second"></HomeCategory>-->
    </div>
    <div class="home-menu-bg">
      <HomeSend></HomeSend>
    </div>
    <div class="div.home-diary-wrapper mt-20">
      <div class="home-diary-title" @click="gotoDiary">
        <!--<h3><span class="home-diary-title1">美丽</span><span class="home-diary-title2">日记</span></h3>-->
        <h3>美丽日记</h3>
        <div>
          <p>精华<span>{{totalNum}}</span>篇(总数<span>{{diaryTotal}}</span>篇)</p>
        </div>
        <span class="home-diary-more">
          <span class="home-diary-more-text">更多</span>
          <img class="home-diary-more-icon" src="./icon-diary-more.png" alt="图标" title="图标">
        </span>
      </div>
      <div class="home-shaping-statics">
        <div class="home-shaping-oprations">
          <div><div class="home-shaping-oprations-top">{{operationsNum}}</div></div>
          <div><div class="home-shaping-oprations-bottom">已实施手术</div></div>
        </div>
        <div class="home-shaping-persons">
          <div><div class="home-shaping-oprations-top">{{casesNum}}</div></div>
          <div><div class="home-shaping-oprations-bottom">已上传日志人数</div></div>
        </div>
      </div>
      <!-- 精华日记 -->
      <div class="cases-wrapper"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="diableLoad"
        infinite-scroll-distance="0">
        <DiaryItem
          v-show="diaries.length >= 1"
          v-for="diray in diaries"
          :key="diray.id"
          :diary="diray"
        ></DiaryItem>
        <div class="no-diaries" v-show="diaries.length === 0 && allLoaded">
          暂无精华日记
        </div>
      </div>
      <MoreLoading v-show="!allLoaded" class="mt-20" :queryLoading="queryLoading" :allLoaded="allLoaded"></MoreLoading>
    </div>
    <!-- 查看更多日记 -->
    <div class="home-btn-wrapper" v-if="allLoaded">
      <button class="home-btn" @click="gotoDiary">查看更多日记</button>
    </div>
    <v-drap></v-drap>
    <bottom-nav></bottom-nav>
    <Loading :isLoading="isLoading"></Loading>
  </div>
</template>

<script>
import {IMG_PREFIX} from '@/common/config/config.js'
import { HOME, DIARY } from '@/models/index.js'
import { Swipe, SwipeItem, MessageBox, Toast } from 'mint-ui'
import HomeCategory from '@/components/home/HomeCategory/HomeCategory'
import HomeSend from '@/components/home/HomeSend/HomeSend'
import DiaryItem from '@/components/diary/DiaryItem/DiaryItem'
import BottomNav from '@/components/common/BottomNav/BottomNav'
import MoreLoading from '@/components/common/MoreLoading/MoreLoading'
import VDrap from '@/components/common/Drap/Drap'
import Loading from '@/components/common/Loading/Loading'
import router from '@/router'

export default {
  name: 'Home',
  components: {HomeCategory, DiaryItem, Swipe, SwipeItem, MessageBox, Toast, BottomNav, MoreLoading, VDrap, Loading, HomeSend},
  data () {
    return {
      // uid: 10064993019531,
      diaryTotal: '0',
      casesNum: '0',
      operationsNum: '0', // 假数据
      carousels: [],
      diaries: [],
      IMG_PREFIX: IMG_PREFIX,
      homeCategory: {
        first: [
          {
            id: '1',
            imgsrc: require('./icon-shaping.png'),
            txt: '整形项目'
          },
          {
            id: '2',
            imgsrc: require('./icon-service.png'),
            txt: '服务网点'
          },
          {
            id: '3',
            imgsrc: require('./icon-master.png'),
            txt: '分享医生'
          },
          {
            id: '4',
            imgsrc: require('./icon-hospital.png'),
            txt: '共享医院'
          }
          /* {
            id: '4',
            imgsrc: require('./icon-join.png'),
            txt: '合作联盟'
          } */
        ],
        second: [
          {
            id: '5',
            imgsrc: require('./icon-meiren.png'),
            txt: '美美美'
          },
          {
            id: '6',
            imgsrc: require('./icon-liren.png'),
            txt: '丽人汇'
          },
          {
            id: '7',
            imgsrc: require('./icon-jipin.png'),
            txt: '极品女人'
          },
          {
            id: '8',
            imgsrc: require('./icon-join.png'),
            txt: '合作联盟'
          }
        ]
      },
      isLoading: false, // 长时间未拿到数据时，2s后是否显示loading图标
      // 初始化滚动加载相关参数
      queryLoading: false,
      diableLoad: false, // 是过滤器终止无限滚动 触发
      allLoaded: false,
      totalNum: 0,
      pageNum: 1,
      pageSize: 2
    }
  },
  methods: {
    init (self) {
      self.isLoading = true
      self._carousel(self)
      self._getDiaries(self, 'diaries', self.uid, self.pageNum, self.pageSize)
      // 统计数
      self._getStatics(self)
    },
    carouselJump () {
      // 轮播图跳转
    },
    /* 轮播图跳转详情页 */
    gotoGoodsDetail (id) {
      router.push({name: 'GoodsDetail', params: { id: id }})
    },
    gotoDiary () {
      // 首页日志
      this.$router.push({name: 'diary'})
    },
    gotoSearch () {
      this.$router.push({name: 'search'})
    },
    // 无限加载函数
    loadMore () {
      if (this.allLoaded) {
        this.diableLoad = true
        return
      }
      if (this.queryLoading) {
        return
      }
      this.pageNum++
      let self = this
      self._getDiaries(self, 'diaries', self.uid, self.pageNum, self.pageSize)
    },
    _carousel (self) {
      HOME.carousel().then(res => {
        if (res.data.retCode === 0) {
          self.carousels = res.data.data
        }
        self.isLoading = false
      })
    },
    _getDiaries (self, receiverName, uid, pageNum, pageSize) {
      self.queryLoading = true
      DIARY.selectedList(pageNum, pageSize).then(res => {
        if (res.data.retCode === 0) {
          // 这里可不可以用哨兵呢？
          self.totalNum = res.data.data.total
          if (res.data.data.data.length === 0) {
            self.allLoaded = true
            self.diableLoad = true
            return
          }
          self[receiverName] = self[receiverName].concat(res.data.data.data)
          self.queryLoading = false
          self.diableLoad = false
        } else if (res.data.retCode === 1) {
          // 没有数据
          self.queryLoading = false
          self.diableLoad = true
          self.allLoaded = true
        } else {
          MessageBox.alert(res.data.retMsg, '错误', {
            closeOnClickModal: true
          })
        }
      })
    },
    _getStatics (self) {
      HOME.casesNum().then(res => {
        if (res.data.retCode === 0) {
          self.casesNum = res.data.data
        } else {
          Toast({
            message: `案例数获取失败`,
            duration: 2000
          })
        }
        self.isLoading = false
      })
      HOME.diaryTotal().then(res => {
        if (res.data.retCode === 0) {
          self.diaryTotal = res.data.data
        } else {
          Toast({
            message: `日记总数获取失败`,
            duration: 2000
          })
        }
        self.isLoading = false
      })
      HOME.shapedNum().then(res => {
        if (res.data.retCode === 0) {
          self.operationsNum = res.data.data
        } else {
          Toast({
            message: `已手术数获取失败`,
            duration: 2000
          })
        }
        self.isLoading = false
      })
    }
  },
  created () {
    // 如何获得uid? to do
    const self = this
    self.init(self)
  }
}
</script>

<style>
.pt-41{
  padding-top: .41rem !important;
}
.pb-160 {
  padding-bottom:1.6rem;
}
.pb-56 {
  padding-bottom:.56rem !important;
}
.mt-20{
  margin-top: .20rem;
}
.mt-41 {
  margin-top: .41rem;
}
.ml-40{
  margin-left: .4rem;
}
.home-bg{
  background-color: #F8F8F8;
}
.home-carousel-wrapper {
  position: relative;
  width: 7.5rem;
  height: 3.79rem;
  /* background-color: maroon; */
}
.home-carousel-shelter {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: .3rem;
  background-color: #fff;
  border-top-left-radius: 100%;
  border-top-right-radius: 100%;
}
/* 默认mint-ui轮播图更改 */
.home-carousel img{
  /* margin-top: 2rem; */
  height: 3.8rem;
}
.home-carousel .home-carousel > img{
  /* 确保空间可以被称起 */
  min-width: 100%;
  min-height: 100%;
}
/* 无法控制原因未知 -- 这里的样式，只能通过style scoped去掉，原因不清楚 */
.home-carousel-wrapper .mint-swipe-indicator {
  width: .2rem;
  height: .04rem;
  display: inline-block;
  border-radius: 2px;
  background: #fff;
  opacity: 0.4;
  margin: 0 .05rem;
}
.home-carousel-wrapper .mint-swipe-indicator.is-active {
  position: relative;
  top: .06rem;
  width: .20rem;
  height: .16rem;
  background: url("./sanjiao.png") no-repeat center center;
  background-size: 100%;
  opacity: 1;
}
.home-carousel-wrapper .mint-swipe .mint-swipe-indicators {
  bottom: 0.54rem !important;
}
/* 轮播图搜索 */
.home-search-wrapper {
  position: absolute;
  top: 0;
  z-index: 100;
  padding-top: .2rem;
  padding-left: 1rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
}
.home-place {
  font-size: 0;
  padding-right: .2rem;
  position: absolute;
  padding-left: .3rem;
  border-right: 1px solid #b8bbbf;
}
.home-place-text {
  font-size: .26rem;
  /* 这个颜色可能存在问题 */
  /*color: rgb(255,255,255);*/
}
.home-place-icon {
  position:relative;
  top: -.08rem;
  margin-left: .1rem;
  display: inline-block;
  width: .14rem;
}
/* .home-ipt input {
  height: .5rem;
  line-height: .5rem;
  width: 5.22rem;
  border-radius: .25rem;
  color: rgb(141,140,142);
  text-align: center;
  font-size: .2rem;
  background-color: rgba(255,255,255,.8);
} */
.home-ipt .home-ipt-search-show{
  height: .5rem;
  line-height: .5rem;
  width: 5.22rem;
  border-radius: .25rem;
  color: rgb(141,140,142);
  text-align: center;
  font-size: .2rem;
  background-color: rgba(255,255,255,.8);
}
.home-diary-icon{
  width: .28rem;
  height: .28rem;
  display: inline-block;
  margin-right: .4rem;
  vertical-align: middle;;
}

/* 头部导航 */
.home-menu-bg{
  background-color: #fff;
}

/* 日记 */
/* 无精华日记 */
.no-diaries{
  padding: 0 .2rem;
  height: .76rem;
  line-height: .76rem;
  background-color: #fff;
  text-align: center;
}
/* 日记头部 */
.home-diary-title {  position: relative;
  padding-top: .2rem;
  /*padding-bottom: .32rem;*/
  background-color: #fff5f9;
  text-align: center;
}
.home-diary-title h3 {
  letter-spacing: .04rem;
  font-size: .3rem;
  /* 文字渐变的实现 to do*/
  display: inline-block;
  background-image: -webkit-gradient(linear, left top, right top, from(rgb(214,83,228)), to(rgb(188,122,255)));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.home-diary-title p {
  margin-top: 0.16rem;
  font-size: .26rem;
  /* 文字渐变的实现 */
  color: rgb(0,34,34);
  display: inline-block;
  background-image: -webkit-gradient(linear, left top, right top, from(#ed5aff), to( #9e84f7));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.home-diary-title p span {
  font-size: .48rem;
}
/* 日记更多 */
.home-diary-more {
  position: absolute;

  top: .2rem;
  right: .2rem;
}
.home-diary-more-text{
  font-size: .26rem;
  color: rgb(34,34,34);
}
.home-diary-more-icon{
  margin-left: .04rem;
  position: relative;
  top: .02rem;
  display: inline-block;
  width: .26rem;
}

/* 手术统计 */
.home-shaping-statics {
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  display: flex;
  padding:0 .2rem;
  /*height: .76rem;*/
  line-height: 1;
  background-color: #fff5f9;
}
.home-shaping-statics .home-shaping-oprations-top {
  font-size: .48rem;
  padding: .1rem;
  display: inline-block;
  background-image: -webkit-gradient(linear, left top, right top, from(#ed5aff), to( #9e84f7));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.home-shaping-statics .home-shaping-oprations-bottom {
  font-size: .26rem;
  padding: .1rem;
  display: inline-block;
  background-image: -webkit-gradient(linear, left top, right top, from(#ed5aff), to( #9e84f7));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.home-shaping-oprations, .home-shaping-persons {
  flex: 1;
  text-align: center;
  font-size: 0.26rem;
  color: rgb(102,102,102);
  padding-bottom: .2rem;
}
/* 查看更多日记 */
.home-btn-wrapper {
  padding-top: .52rem;
  padding-bottom: .38rem;
  text-align: center;
}
.home-btn{
  vertical-align: top;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border: none;
  border-radius: .35rem;
  width: 3rem;
  padding: 0 .25rem;
  height: .7rem;
  font-size: .32rem;
  line-height: .7rem;
  color: #fff;
  background-color: rgb(188,122,255);
}
</style>
