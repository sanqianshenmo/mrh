<template>
  <div class="audit-wrapper">
    <ul class="audit-header-wrapper audit-header">
        <li class="audit-header-item"
        v-for="(tab,idx) in tabHeader.tabs"
        :class="{'active': tabHeader.curIdx === idx}"
        @click=switchTab(idx)
        :key="idx">
          <span>{{tab}}</span>
        </li>
    </ul>
    <ul class="audit-items-wrapper">
      <li class="audit-item-wrapper">
        <div class="audit-item-info">
          <p>法人姓名: XXX</p>
          <p>申请时间: 2018年07月19日 12:53</p>
          <p>商铺地址: 北京市朝阳区华普花园B座2306</p>
        </div>
        <div class="audit-item-action">
          <button class="audit-item-btn" @click="gotoDeail(123)">查看详情</button>
          <button class="audit-item-btn ml50" @click="hanldeTipShow(true, 'id')">{{actionTip.itemActionText}}</button>
        </div>
      </li>
    </ul>
    <!-- 审核弹框 -->
    <div class="audit-tip-pass-bg" v-show="isActionTipShow"></div>
    <div class="audit-tip-pass" v-show="isActionTipShow">
      <p>{{actionTip.desc.main}}</p>
      <p>{{actionTip.desc.detail}}</p>
      <div class="audit-tip-actions">
        <button class="audit-item-btn audit-tip-btn" @click="hanldeTipShow(false)">取消</button>
        <button class="audit-item-btn audit-tip-btn ml50" @click="actionTip.action(curItemId)">确认</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShopAudit',
  data () {
    return {
      tabHeader: {
        tabs: [
          '待审核',
          '已审核'
        ],
        curIdx: 0
      },
      curItemId: null, // 当前进行的操作的ID
      isActionTipShow: false
    }
  },
  computed: {
    actionTip () {
      const self = this
      let actionTip = {
        notAudited: {
          desc: {
            main: '确定审核通过吗？',
            detail: '操作后该用户身份将变更为“城市合伙人资格”'
          },
          action: self.passAudit,
          itemActionText: '通过审核'
        },
        audited: {
          desc: {
            main: '确定终止合作吗？',
            detail: '操作后该用户身份将取消“城市合伙人资格”'
          },
          action: self.stopCoopration,
          itemActionText: '终止合作'
        }
      }
      // 当前是通过tabIdx来控制切换，还是直接通过按钮比较好？
      let tabidxToKey = {
        0: 'notAudited',
        1: 'audited'
      }
      let tabIdx = this.tabHeader.curIdx
      return actionTip[tabidxToKey[tabIdx]]
    }
  },
  methods: {
    switchTab (idx) {
      if (idx === this.tabHeader.curIdx) {
        return
      }
      this.tabHeader.curIdx = idx
    },
    gotoDeail (id) {
      this.$router.push({name: 'user.audit.detail', params: {id: id}})
    },
    passAudit () {
      // let id = this.curItemId
      console.log('passAudit')
    },
    stopCoopration () {
      // let id = this.curItemId
      console.log('stop')
    },
    hanldeTipShow (bool, id) {
      if (bool) {
        this.isActionTipShow = true
        this.curItemId = id
      } else {
        this.isActionTipShow = false
      }
    }
  }
}
</script>

<style scoped>
.ml50{
  margin-left: .5rem;
}
.audit-wrapper{
  padding: 0 .2rem;
}
/* 日记导航 */
.audit-header-wrapper{
  position: relative;
  margin-top: .2rem;
}
.audit-header{
  display: flex;
  font-size: 0;
  text-align: center;
  overflow-x:auto;
}
.audit-header-item{
  flex-grow: 1;
  flex-shrink: 0;
  margin-left: .6rem;
  padding-bottom: .2rem;
  font-size: .34rem;
  color: rgb(34,34,34);
  border-bottom:.04rem solid transparent;
}
.audit-header-item:first-of-type {
  margin-left: 0rem;
}
.audit-header-item.active {
  border-bottom:.04rem solid rgb(214,83,228);
  color: rgb(214,83,228);
}
/* 审核 */
.audit-item-wrapper{
 margin-top: .4rem;
 padding: .2rem;
 border-radius: .2rem;
 box-shadow: 0rem .04rem 0rem .02rem rgba(214, 83, 228,.3);
 background: rgba(251,246,252);
}
.audit-item-info{

}
.audit-item-info > p {
  font-size: .24rem;
  line-height: 1.6;
  color: #333;
}
.audit-item-action{
  margin-top: .2rem;
}
.audit-item-btn{
  vertical-align: top;
  box-sizing: border-box;
  border: none;
  border-radius: .3rem;
  width: auto;
  padding: 0rem .8rem;
  height: .7rem;
  line-height: .7rem;
  font-size: .34rem;
  color: #fff;
  background-image: linear-gradient(-135deg, rgba(215, 86, 228, 1), rgba(188, 122, 255, 1));
}
.audit-tip-pass-bg{
  position: fixed;
  top:0;
  left:0;
  right:0;
  bottom:0;
  background-color: rgba(0,0,0,.3);
}
/* 审核框 */
.audit-tip-pass{
  border-radius: .3rem;
  position: fixed;
  box-sizing: border-box;
  padding: .3rem;
  width: 6rem;
  left: 50%;
  margin-left: -3rem;
  top: 50%;
  margin-top: -3rem;
  background: #fff;
}
.audit-tip-pass p{
  font-size: .3rem;
  color: #333;
  line-height: 1.6;
  letter-spacing: .02rem;
}
.audit-tip-pass p:first-of-type{
  font-weight:bold;
}
.audit-tip-actions{
  margin-top: .3rem;
}
.audit-tip-btn{

}
</style>
