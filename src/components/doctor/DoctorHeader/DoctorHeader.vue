<template>
  <div class="diary-detail-header">
      <div class="diary-detail-person">
        <div class="diary-detail-person-img">
          <img :src="doctorImg" alt="头像" title="头像">
        </div>
        <div class="diary-detail-person-info">
          <p class="diary-detail-person-name">{{doctorHeader.nickname}}</p>
          <p class="diary-detail-person-other mt-14">
            <span>{{doctorHeader.hospital}}</span>
            <span class="space">|</span>
            <span>手术案例{{doctorHeader.casesNum}}例</span>
          </p>
        </div>
      </div>
      <div class="diary-detail-person-other">
        <div class="action">
          <!-- to do -->
          <button @click="selectDoctor" class="btn btn-plain btn-h5 mr-34 bdrs-30" v-if="false">
            <img src="./icon-select.png" alt="">
            <span>点选</span>
          </button>
          <button @click="tipPerson" class="btn btn-plain btn-h5 mr-34 bdrs-30">
            <img src="./icon-pay-white.png" alt="">
            <span>打赏</span>
          </button>
          <button @click="evaluateDoctor" class="btn btn-plain btn-h5 bdrs-30 mr38">
            <img src="./icon-comment.png" alt="">
            <span>评价</span>
          </button>
        </div>
      </div>
      <span class="diary-bg-arrow"></span>
      <Loading :isLoading="isLoading"></Loading>
    </div>
</template>

<script>
/*
  日记头部：
  使用的组件：1.日记详情 2.个人的日记列表
*/
import {CURUSER} from '@/models/index.js'
import {IMG_PREFIX} from '@/common/config/config.js'
import Loading from '@/components/common/Loading/Loading'
import { Toast } from 'mint-ui'

export default {
  name: 'DoctorHeader',
  components: {Loading, Toast},
  props: {
    doctorHeader: {
      type: Object
    }
  },
  data () {
    return {
      isLoading: false
    }
  },
  computed: {
    doctorImg () {
      return IMG_PREFIX + this.doctorHeader.headimgurl
    }
  },
  methods: {
    selectDoctor () {
      this.$emit('selectDoctor', true)
    },
    tipPerson () {
      this.$emit('toTip', true)
    },
    evaluateDoctor () {
      this.isLoading = true
      let id = this.doctorHeader.id
      CURUSER.canEvaluate(id).then(res => {
        // console.log('res', res)
        this.isLoading = false
        if (res.data.retCode === 0) {
          // console.log('res', res)
          // return
          let canComment = res.data.data.canComment
          if (canComment) {
            this.$router.push({name: 'doctor.evaluate', query: {id}})
          } else {
            let refuseReason = res.data.data.refuseReason
            Toast({
              message: `${refuseReason}`,
              duration: 1500
            })
          }
        }
      })
    }
  }
}
</script>

<style>
/* 共用了 日记头部的样式 */
@import url('../../../common/css/diaryHeader.css');
.mr38{
  margin-right: .38rem;
}
</style>
