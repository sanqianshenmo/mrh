<template>
  <div>
    <div class="case-select-doctor">
      <span class="case-fee-type">点选费</span>
      <span class="case-fee-num">￥ {{doctor.pay}}</span>
      <span class="case-fee-desc">点选{{doctor.name}}实施手术</span>
    </div>
    <div class="case-doctor-wrapper" @click="gotoDoctor">
      <div class="case-doctor-img-wrapper">
        <img class="case-doctor-img" :src="doctor.pic" alt="头像" title="医师头像">
      </div>
      <span class="case-doctor-intro">实施医生 - </span>
      <span class="case-doctor-name">{{doctor.name}}</span>
      <div class="case-stars">
        <img v-for="(n,idx) in starsNum" :key="idx" src="./comment-start.png" alt="评级" title="评级">
        <!-- <span class="no-stars" >暂无评分</span> -->
      </div>
    </div>
    <div class="case-doctor-comment-wrapper">
      <div
        v-for="(comment, idx) in comments"
        :key="idx"
        class="case-doctor-comment">
        <p>
          <span class="case-doctor-comment-type">医生点评：</span>{{comment.content}}
        </p>
        <div class="case-doctor-comment-other">
          <span class="case-doctor-comment-time">{{comment.time}}</span>
          <span class="case-doctor-comment-count" v-show="false">第{{comment.count}}次评论</span>
        </div>
      </div>
    </div>
    <div v-if="isFoldExist" class="case-doctor-comment-more" @click="foldCtrl">
      <span class="case-doctor-comment-more-text">{{foldTxt}}</span>
      <img v-show="!isFold" class="case-doctor-comment-more-icon" src="./isfold-up.png" alt="折叠" title="折叠">
      <img v-show="isFold" class="case-doctor-comment-more-icon" src="./isfold-down.png" alt="展开" title="展开">
    </div>
  </div>
</template>

<script>
import {IMG_PREFIX} from '@/common/config/config.js'
// 使用该组件的位置：1.首页、 2.日记 3.日记详情 4.组件DiaryItem
export default {
  name: 'DiaryDoctor',
  props: {
    doctor: {
      type: Object,
      default () {
        return {
          doctorId: '',
          name: 'xx',
          pic: '',
          pay: '?',
          grade: 0
        }
      }
    },
    oriComments: {
      type: Array,
      default () {
        return [
          {
            content: '评论1',
            time: '20xx-xx-xx xx:xx',
            count: '1'
          }
        ]
      }
    }
  },
  data () {
    return {
      isFold: true,
      IMG_PREFIX: IMG_PREFIX
    }
  },
  computed: {
    /* 其实它们是响应的同一个状态改变，但是写了两个状态 to do */
    /*  */
    isFoldExist () {
      if (this.oriComments === null || this.oriComments === undefined) {
        return false
      }
      if (this.oriComments.length <= 1) {
        return false
      } else {
        return true
      }
    },
    foldTxt () {
      if (this.isFold) {
        return '展开'
      } else {
        return '收起'
      }
    },
    comments () {
      if (this.oriComments === null || this.oriComments === undefined) {
        return []
      }
      if (this.isFold) {
        return this.oriComments.slice(0, 1)
      } else {
        return this.oriComments
      }
    },
    starsNum () {
      if (this.doctor.grade === undefined || Number(this.doctor.grade) === 0 || Number(this.doctor.grade) > 100) {
        return 5
      }
      let starsNum = Math.ceil(Number(this.doctor.grade) / 20)
      return starsNum
    }
  },
  methods: {
    foldCtrl () {
      this.isFold = !this.isFold
    },
    gotoDoctor () {
      // to do
      let id = this.doctor.doctorId
      this.$router.push({name: 'doctor', query: {id}})
    }
  }
}
</script>

<style scoped>
/* 点选医生 */
.case-select-doctor {
  background-color: #F8F8F8;
  border-radius: .29rem;
  width: 100%;
  height: .58rem;
  line-height: .58rem;
}
.case-fee-type {
  margin-left: .4rem;
  font-size: .24rem;
  color:rgb(102,102,102);
}
.case-fee-num {
  margin-left: .2rem;
  font-size: .26rem;
  color:rgb(214,83,228);
}
.case-fee-desc {
  margin-left: .4rem;
  font-size: .26rem;
  color:rgb(102,102,102);
}
/* 案例医生 */
.case-doctor-wrapper {
  padding: .2rem 0;
  position: relative;
  background-color: #fff;
  font-size: 0;
}
.case-doctor-img-wrapper{
  display: inline-block;
  width: .46rem;
  height: .46rem;
  border-radius: 100%;
  overflow: hidden;
  background-color: rgb(188,122,255);
}
.case-doctor-img {
  vertical-align: top;
  display: inline-block;
  width: 100%;
  /* font-size: .24rem; */
}
.case-doctor-intro {
  margin-left: .2rem;
  vertical-align: top;
  display: inline-block;
  height:.46rem;
  line-height: .46rem;
  font-size: .26rem;
  color: rgb(102,102,102);
}
.case-doctor-name {
  margin-left: .04rem;
  vertical-align: top;
  display: inline-block;
  height:.46rem;
  line-height: .46rem;
  font-size: .26rem;
  color: rgb(63,63,63);
}
.case-stars{
  margin-left: .06rem;
  vertical-align: top;
  display: inline-block;
  height:.46rem;
  line-height: .46rem;
  display: inline-block;
  font-size: 0;
}
.case-stars > img:first-of-type {
  margin-left: 0;
}
.case-stars img{
  margin-left: .1rem;
  display: inline-block;
  vertical-align: middle;
  width: .24rem;
  height: .24rem;
  font-size: .24rem;
}
/* 医生没有星 */
.no-stars{
  margin-left: 0.2rem;
  position: relative;
  top: .02rem;
  font-size: .24rem;
  color: rgb(102,102,102);;
}
/* 医生评论 */
.case-doctor-comment-wrapper > .case-doctor-comment:first-of-type {
  background-size: 100% 0rem;
  border-top-right-radius: .08rem;
  border-top-left-radius: .08rem;
}
.case-doctor-comment-wrapper > .case-doctor-comment:last-of-type {
  border-bottom-right-radius: .08rem;
  border-bottom-left-radius: .08rem;
}
.case-doctor-comment {
  /* 第2个评论才存在 这里用背景代替 它没有充满 */
  padding: .2rem;
  background-color: rgb(248,248,248);
  color: rgb(63,63,63);
  background-image: -webkit-linear-gradient(top, #eee, #eee);
  background-image: linear-gradient(180deg, #eee, #eee);
  background-size: 100% .02rem;
  background-position: top -.20rem left 0;
  background-origin: content-box;
  background-repeat: no-repeat;
}
/* 有问题 */
.case-doctor-comment-type {
  font-size: .28rem;
  color: rgb(102,102,102);
}
.case-doctor-comment-other {
  text-align: right;
  font-size: .22rem;
  color: rgb(153,153,153);
}
/* 评论的展开与收起 */
.case-doctor-comment-more {
  border-top: 1px solid #eee;
  height: .89rem;
  line-height: .89rem;
  text-align: center;
  font-size: 0;
  background-color: rgb(248,248,248);
}
.case-doctor-comment-more-text {
  font-size: .26rem;
  color:rgb(214,83,228);
}
.case-doctor-comment-more-icon {
  margin-left: .12rem;
  display: inline-block;
  position: relative;
  top: -.06rem;
  width: .2rem;
}
</style>
