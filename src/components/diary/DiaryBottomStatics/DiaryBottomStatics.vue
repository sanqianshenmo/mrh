<template>
 <div class="diary-book-comment-action-wrapper">
    <div class="diary-book-comment-action">
      <img class="pic" src="./icon-view.png" alt="浏览" title="浏览">
      <span class="num">{{diary.viewNum === null ? 0 : diary.viewNum}}</span>
    </div>
    <div class="diary-book-comment-action" :class="{'liked-comment-state': isLiked }">
      <img class="pic" v-show="!isLiked" src="./icon-like.png" alt="点赞" title="点赞">
      <img class="pic" v-show="isLiked" src="./icon-liked.png" alt="点赞" title="点赞">
      <span class="num">{{diary.zanNum === null ? 0 : diary.zanNum}}</span>
    </div>
    <div class="diary-book-comment-action">
      <img class="pic" src="./icon-pay.png" alt="打赏" title="打赏">
      <span class="num">{{diary.tradeCount === null ? 0 : diary.tradeCount}}</span>
    </div>
    <div class="diary-book-comment-action">
      <img class="pic" src="./icon-comment.png" alt="评论" title="评论">
      <span class="num">{{diary.commentNum === null ? 0 : diary.commentNum}}</span>
    </div>
  </div>
</template>

<script>
// 作用：1.日记本时间轴 2.审核日记本列表
export default {
  name: 'DiaryBottomStatics',
  props: {
    diary: {
      type: Object
    }
  },
  data () {
    return {
    }
  },
  computed: {
    isLiked () {
      return this.diary.hasZan
    }
  }
}
</script>

<style>
 /* 浏览数、点赞、赏金、评论 */
.diary-book-comment-action-wrapper {
  display: flex;
  justify-content: space-between;
  height: .83rem;
  line-height: .83rem;
  color: rgb(153,153,153);
  font-size: 0;
  text-align: right;
}
.diary-book-comment-action-wrapper.liked-comment-state{
  color: rgb(214,83,228);
}
.diary-book-comment-action {
  display: inline-block;
}
.diary-book-comment-action-wrapper .pic {
  display: inline-block;
  /* height: .27rem; */
  width: .28rem;
  vertical-align: middle;
}
.diary-book-comment-action-wrapper .desc {
  margin-left: .1rem;
  font-size: .28rem;
  vertical-align: middle;
}
.diary-book-comment-action-wrapper .num {
  margin-left: .1rem;
  font-size: .28rem;
  vertical-align: middle;
}
</style>
