<template>
  <div>
    <div class="fold-comment-wrapper">
      <div class="fold-comment">
        <p :class="{'fold-hidden-h': isFold}">{{foldContent}}</p>
      </div>
    </div>
    <div v-if="isFoldExist" class="fold-comment-more" @click="foldCtrl">
      <span class="fold-comment-more-text">{{foldTxt}}</span>
      <img v-show="!isFold" class="fold-comment-more-icon" src="./isfold-up.png" alt="折叠" title="折叠">
      <img v-show="isFold" class="fold-comment-more-icon" src="./isfold-down.png" alt="展开" title="展开">
    </div>
  </div>
</template>

<script>
// 内容折叠组件 -- 暂时只用于专家信息介绍首页
// 可以用于 详情
/* 想到一种解决方式，通过overflow:hidden;方式来实现隐藏，需要提前知道，元素占据的垂直空间 */
/* 如何根据实现高度决定 展开是否存在 to do */
export default {
  name: 'Fold',
  props: {
    foldContent: {
      type: String
    }
  },
  data () {
    return {
      isFold: true
    }
  },
  computed: {
    isFoldExist () {
      if (this.foldContent === '') {
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
    }
  },
  methods: {
    foldCtrl () {
      this.isFold = !this.isFold
    }
  }
}
</script>

<style>
/* 样式来源 DiaryDoctor fold-comment-wrapper*/
/* 医生评论 */
.fold-comment-wrapper > .fold-comment:first-of-type {
  background-size: 100% 0rem;
  border-top-right-radius: .08rem;
  border-top-left-radius: .08rem;
}
.fold-comment-wrapper > .fold-comment:last-of-type {
  border-bottom-right-radius: .08rem;
  border-bottom-left-radius: .08rem;
}
.fold-comment {
  /* 第2个评论才存在 这里用背景代替 它没有充满 */
  padding: 0 .2rem .2rem;
  /* background-color: rgb(248,248,248); */
  color: rgb(102,102,102);
  font-size: .24rem;
  background-image: -webkit-linear-gradient(top, #eee, #eee);
  background-image: linear-gradient(180deg, #eee, #eee);
  background-size: 100% .02rem;
  background-position: top -.20rem left 0;
  background-origin: content-box;
  background-repeat: no-repeat;
}
.fold-comment p{
  line-height: 1.6;
}
/* 折起时的高度 */
.fold-hidden-h{
  height: .8rem;
  overflow: hidden;
}
/* 有问题 */
/* .fold-comment-type {
  font-size: .28rem;
  color: rgb(102,102,102);
}
.fold-comment-other {
  text-align: right;
  font-size: .22rem;
  color: rgb(153,153,153);
} */
/* 评论的展开与收起 */
.fold-comment-more {
  border-top: 1px solid #eee;
  height: .89rem;
  line-height: .89rem;
  text-align: center;
  font-size: 0;
  /* background-color: rgb(248,248,248); */
}
.fold-comment-more-text {
  font-size: .26rem;
  color:rgb(214,83,228);
}
.fold-comment-more-icon {
  margin-left: .12rem;
  display: inline-block;
  position: relative;
  top: -.06rem;
  width: .2rem;
}
</style>
