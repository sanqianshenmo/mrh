<template>
  <div class="poster_wrapper">
    <div v-if="tpls">
      <PosterHeader :step="1"></PosterHeader>
      <div class="poster_tpls_wrapper">
        <label :for="tpl.id" class="poster_tpl" v-for="(tpl, index) in tpls" :key="index">
          <div class="poster_img_wrapper">
            <img :src="tpl.cover">
          </div>
          <div class="poster_tpl_desc radio-poster">
            <i class="radio-poster" :class="{active: checkedId === tpl.id}"></i>
            <input class="none" v-model="checkedId" :value="tpl.id" :id="tpl.id" type="radio" name="tpl">
            <span class="tpl_desc">{{tpl.name}}</span>
          </div>
        </label>
      </div>
      <div class="poster_footer">
        <button @click="getPosterUrl" class="poster_btn btn_big btn_main">选好了，下一步</button>
      </div>
    </div>
    <div class="img-box" v-show="isRouter" style="position: fixed; width: 100%; height:100%; top:0; left: 0; z-index: 9999; background-color: #fff;">
      <div style="padding: 20px; text-align: center;font-size: 16px">
        您的网络开小差啦 点下面刷新重试吧
      </div>
      <div>
        <div class="bottom-banner-join" style="padding: 26px 50px">
          <input type="button" value="刷新重试" class="join-input submit-input" @click="goToback">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {PARTNER} from '@/models'
import PosterHeader from '@/components/user/Poster/PosterHeader'
export default {
  name: 'Poster',
  data () {
    return {
      isRouter: false,
      checkedId: null,
      tpls: null
    }
  },
  components: {
    PosterHeader
  },
  methods: {
    goToback: function () {
      location.reload()
    },
    cancelLoading: function (self, loadTimeout, startTime) {
      clearTimeout(loadTimeout)
      var endTime = new Date()
      if (endTime - startTime >= 2000) {
        self.$indicator.close()
      }
    },
    getPosterUrl: function () {
      var self = this
      // 后端生成url
      var startTime = new Date()
      var loadTimeout = setTimeout(function () {
        self.$indicator.open()
      }, 1999)
      // 跳转到新页面
      // axios.get('/per_info')
      PARTNER.getMsg()
        .then(function (res) {
          if (res.data.retCode === 0) {
            var uid = res.data.data.uid
            self.cancelLoading(self, loadTimeout, startTime)
            self.$router.push({
              name: 'download',
              params: {
                uid: uid,
                tid: self.checkedId
              }
            })
          } else {
            self.cancelLoading(self, loadTimeout, startTime)
            self.$messagebox.alert('出错了，请稍后重试', '错误！')
          }
        })
        .catch(function (error) {
          console.log('error', error)
        })
    }
  },
  created: function () {
    var self = this
    var startTime = new Date()
    var loadTimeout = setTimeout(function () {
      self.$indicator.open()
    }, 1999)
    // axios.get('/ashop/Down/back_list')
    PARTNER.posterDown()
      .then(function (res) {
        if (res.data.retCode === 0) {
          self.cancelLoading(self, loadTimeout, startTime)
          self.tpls = res.data.data
          self.checkedId = self.tpls[0].id
        }
      })
      .catch(function (error) {
        console.log('error', error)
        self.$indicator.close()
      })

    setTimeout(function () {
      if (self.tpls === null) {
        self.isRouter = true
        self.$indicator.close()
      }
    }, 10000)
  }
}
</script>

<style scoped>
  /* 主题颜色：rgb(255,119,165) */
  .poster_wrapper{
    box-sizing: border-box;
    background-color:#fff;
  }
  /* 模板选择 */
  .poster_tpls_wrapper{
    padding: 0 .3rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .poster_tpl{
    overflow:hidden;
    margin-top: .52rem;
    /* margin:26px 0 0 15px; */
    flex:0 0 auto;
    font-size: 0;
  }
  .poster_tpl label{
    margin-top: .3rem;
    display: block;
  }
  .tpl_desc{
    font-size: .26rem;
    color:#000;
    font-weight: 700;
    padding-left: .5rem;
  }
  .poster_img_wrapper{
    display:inline-block;
    width:2rem;
    height:2.4rem;
    overflow:hidden;
    background-color:rgb(255,119,165);
  }
  .poster_img_wrapper img{
    width:100%;
    height:auto;
  }

  .poster_footer{
    padding: 0 .3rem;
    margin-top: .52rem;
    padding-bottom: .52rem;
  }
  .poster_tpl label{
    text-align: center;
  }
  .poster_tpl label input{
    display: none;
  }
  .poster_intro_step_img_wrapper img{
    width:100%;
    height:auto;
  }

  /* 按钮 */
  .poster_btn{
    box-sizing: border-box;
    border-radius: .42rem;
    border: none;
  }
  .btn_big{
    width:100%;
    height:.84rem;
    line-height: .84rem;
    font-size: .3rem;
  }
  .btn_main{
    color:#fff;
    background:rgb(254,121,163);
  }

  /* radio单选 */
  .radio-poster{
    position: relative;
    height: .4rem;
  }
  .radio-poster i {
    position: absolute;
    left: 0;
    top: 60%;
    margin-top: -.22rem;
    width: .12rem;
    height: .12rem;
    padding: 0;
    overflow: hidden;
    border-radius: 50%;
    background: #fff;
    margin-right: .2rem;
    vertical-align: -.08rem;
    border: .12rem solid #c8c8c8;
    display: inline-block;
  }
  .radio-poster i.active{
    border: .12rem solid rgb(255,119,165);
  }
</style>
