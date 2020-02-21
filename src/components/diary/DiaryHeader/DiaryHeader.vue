<template>
  <div class="diary-detail-header">
      <div class="diary-detail-person">
        <div class="diary-detail-person-img">
          <img :src="diaryHeader.headimgurl" alt="头像" title="头像">
        </div>
        <div class="diary-detail-person-info">
          <p class="diary-detail-person-name">{{diaryHeader.nickname}}</p>
          <p class="diary-detail-person-other mt-14">
            <span>{{creatTime}}创建</span>
            <span class="space">|</span>
            <span v-if="!isNotebook">整形后恢复后第{{diaryHeader.diaryIndex}}篇日记</span>
            <span v-else>手术总价值{{diaryHeader.sumPrice|sumPrice}}</span>
          </p>
        </div>
      </div>
      <div class="diary-detail-person-other">
        <div class="icon">
          <!-- 暂时隐藏地址显示 -->
          <div class="tpl-img-txt ml-20" v-show="false">
            <img src="./icon-place.png" alt="">
            <span class="desc">{{diaryHeader.place}}</span>
          </div>
          <div class="tpl-img-txt ml-20 diaryperson-view-position">
            <img class="place" src="./icon-views.png" alt="">
            <span class="desc">{{diaryHeader.viewNum}}</span>
          </div>
        </div>
        <div class="action">
          <button @click="tipPerson" class="btn btn-plain btn-h5 mr-34 bdrs-30">
            <img src="./icon-pay-white.png" alt="打赏">
            <span>打赏</span>
          </button>
          <DiaryFocus class="mr-34" :pos="'header'" :userId="diaryHeader.userId" :hasConcern="diaryHeader.hasConcern"></DiaryFocus>
          <button class="btn btn-plain btn-todo btn-h5 bdrs-30">
            <img src="./icon-meet.png" alt="约见">
            <span>约见</span>
          </button>
        </div>
      </div>
      <slot></slot>
      <span class="diary-bg-arrow"></span>
    </div>
</template>

<script>
import DiaryFocus from '@/components/diary/DiaryFocus/DiaryFocus'

export default {
  name: 'DiaryHeader',
  components: {
    DiaryFocus
  },
  props: {
    diaryHeader: {
      type: Object,
      default () {
        return {
          headimgurl: null,
          nickname: 'xx',
          createTime: '20xx-xx-xx',
          diaryIndex: 'x', // 当前数量
          place: '未知',
          viewNum: '??',
          userId: '0',
          hasConcern: true
        }
      }
    },
    isNotebook: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    creatTime () {
      // 这种异步，有没有更好地处理，方式，首页为什么没有问题？
      if (this.diaryHeader.createTime === undefined) {
        return '20xx-xx-xx'
      }
      return this.diaryHeader.createTime.slice(0, 10)
    }
  },
  methods: {
    tipPerson () {
      this.$emit('toTip', true)
    }
  },
  filters: {
    sumPrice (val) {
      if (val === 0 || val === undefined) {
        return '未知'
      } else {
        return val + '元'
      }
    }
  }
}
</script>

<style>
@import url('../../../common/css/diaryHeader.css');
</style>
