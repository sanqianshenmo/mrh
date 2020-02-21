<template>
    <div class="user-video">
      <header v-if="true">
        <div @click="goToUser">
          <img src="./back.png" alt="">
        </div>
        我的视频
      </header>
      <main>
        <div class="main-text">请在下方输入您的视频网址</div>
        <div class="main-input">
          <textarea rows="1" maxlength="100" placeholder="http://" class="join-input font-input" v-model="address"></textarea>
          <i class="i-delete"></i>
        </div>
        <div class="bottom">
          <button @click="submit">输入完毕提交</button>
        </div>
        <mt-popup
          v-model="popupVisible"
          popup-transition="popup-fade"
          v-if="false">
          <div class="popup-div">
            <img src="./loading.png" alt="">
            <div>视频导入中，请稍候</div>
          </div>
        </mt-popup>
        <mt-popup
          v-model="popupVisible"
          popup-transition="popup-fade"
          v-if="true">
          <div class="popup-div">
            <img src="./return.png" alt="">
            <div>视频导入成功</div>
            <p>导入的视频将显示在</p>
            <p>日记-视频栏目下</p>
          </div>
        </mt-popup>
      </main>
    </div>
</template>

<script>
import router from '@/router'
export default {
  name: 'Video',
  data () {
    return {
      address: '',
      popupVisible: false
    }
  },
  methods: {
    goToUser () {
      router.push('/user')
    },
    submit () {
      this.popupVisible = true
    }
  }
}
</script>

<style>
  .user-video header {
    padding: .3rem 0;
    text-align: center;
    font-size: .34rem;
    color: rgb(34,34,34);
    background-color: #fff;
    /*margin-bottom: .2rem;*/
    border-bottom: .01rem solid rgb(215,215,215);
  }
  .user-video header img {
    width: .2rem;
    height: .35rem;
    position: absolute;
    padding-left: .4rem;
  }
  .user-video .bottom {
    background-color: #fff;
    text-align: center;
    padding: .6rem 0;
    margin-top: -.1rem;
  }
  .user-video .bottom button {
    width: 3.3rem;
    height: .84rem;
    font-size: .3rem;
    color: rgb(255,253,252);
    background-color: #bc7aff;
    border: none;
    border-radius: .5rem;
  }
  .user-video main {
    background-color: #fff;
    padding: 0 .2rem;
    height: 11rem;
  }
  .user-video main .main-input {
    position: relative;
  }
  .user-video main .main-text {
    padding: 1.8rem 0 .6rem 0;
    text-align: center;
    font-style: italic;
    font-size: .24rem;
    color: rgb(116,123,118);
  }
  .user-video .i-delete {
    width: .38rem;
    height: .38rem;
    display: inline-block;
    background: url("./delete.png") no-repeat center center;
    background-size: 100% 100%;
    padding: 0;
    position: absolute;
    right: .28rem;
    top: .18rem;
  }
  .user-video .join-input {
    width: 100%;
  }
  .user-video .font-input {
    font-size: 14px;
    padding: 5px 0;
  }
  .user-video textarea, .user-video input {
    border: 1px solid rgba(254,121,163,0.2);
    /*border-radius: 5px;*/
    resize:none;
  }
  .user-video textarea::-webkit-input-placeholder {
    font-size: .22rem;
    padding-left: .2rem;
    color: rgb(153,153,153);
  }
  .user-video .mint-popup {
    top: 32%;
    border-radius: .1rem;
  }
  .user-video .popup-div {
    padding: .72rem;
  }
  .user-video .popup-div img {
    width: .58rem;
    height: .58rem;
    margin: 0 auto .42rem auto;
  }
  .user-video .popup-div div {
    font-size: .3rem;
    color: rgb(56,55,56);
    text-align: center;
  }
  .user-video .popup-div p {
    text-align: center;
    font-size: .24rem;
    color: rgb(104,104,104);
  }
</style>
