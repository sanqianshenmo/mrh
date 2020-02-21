<template>
  <div class="poster_intro_wrapper">
    <PosterHeader :step="23"></PosterHeader>
    <div class="poster_intro_main">
      <p class="poster_intro_main_des">您的打印文件下载地址为：</p>
      <textarea readonly ref="urlEle" class="poster_intro_main_url" :value="url"></textarea>
      <div class="poster_intro_btns_wrapper">
        <div><button @click="copyUrl" class="poster_btn btn_middle btn_main">一键复制下载地址</button></div>
        <div><button @click="downPic" class="btn_mt poster_btn btn_middle btn_plain">就要下载到手机</button></div>
      </div>
    </div>

    <div class="poster_intro_step_wrapper">
      <p class="poster_intro_step_title">如何在电脑浏览器上下载打印文件？</p>
      <div class="poster_intro_step">
        <p><span class="poster_intro_step_num">1</span>打开电脑浏览器，如：谷歌浏览器、360浏览器等</p>
        <div class="poster_intro_step_img_wrapper"><img src="./poster_down_step1.png" alt="打开浏览器图片" title="打开浏览器图片"></div>
      </div>
      <div class="poster_intro_step">
        <p><span class="poster_intro_step_num">2</span>在浏览器中输入下载文件的URL（下载地址）</p>
        <div class="poster_intro_step_img_wrapper"><img src="./poster_down_step1.png" alt="打开浏览器图片" title="打开浏览器图片"></div>
      </div>
      <div class="poster_intro_step">
        <p><span class="poster_intro_step_num">3</span>选择文件夹保存。</p>
      </div>
    </div>
  </div>
</template>

<script>
import PosterHeader from '@/components/user/Poster/PosterHeader'
export default {
  name: 'Download',
  data () {
    return {
      url: null
    }
  },
  components: {
    PosterHeader
  },
  methods: {
    copyUrl: function () {
      function selectText (textbox, startIndex, stopIndex) {
        if (textbox.createTextRange) { // ie
          var range = textbox.createTextRange()
          range.collapse(true)
          range.moveStart('character', startIndex)// 起始光标
          range.moveEnd('character', stopIndex - startIndex)// 结束光标
          range.select()// 不兼容苹果--这里指苹果pc可能出现问题
        } else { // firefox/chrome
          textbox.setSelectionRange(startIndex, stopIndex)
          textbox.focus()
        }
      }
      var ele = this.$refs.urlEle
      var val = ele.value
      var valueLength = val.length
      selectText(ele, 0, valueLength)
      if (document.execCommand('copy', false, null)) {
        document.execCommand('copy', false, null)// 执行浏览器复制命令
        this.$toast({
          message: '复制成功',
          position: 'top',
          duration: 2500
        })
      } else {
        console.log('不兼容')
      }
      // 参考：https://github.com/vlily/shareDemo/blob/master/%E4%B8%80%E9%94%AE%E5%A4%8D%E5%88%B6%E5%85%BC%E5%AE%B9%E8%8B%B9%E6%9E%9C%E6%89%8B%E6%9C%BA.html
    },
    downPic: function () {
      var u = navigator.userAgent
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端

      if (isiOS) {
        this.$messagebox.alert('IOS不支持，推荐使用台式电脑下载', 'IOS系统不支持')
        return
      }
      window.location.href = this.url
    }
  },
  created: function () {
    window.scrollTo(0, 0)
    var baseUrl = 'http://shopqrm.mrhmr.com/ashop/Down/down_img'
    var params = this.$route.params
    if (!params.uid) {
      // 手动刷新时，该页面刷新自动返回选择模板页面
      this.$router.push('/poster')
      return
    }
    this.url = baseUrl + '?uid=' + params.uid + '&tid=' + params.tid
  }
}
</script>

<style scoped>
  .poster_tpl label{
    margin-top: .3rem;
    display: block;
  }
  .poster_img_wrapper img{
    width:100%;
    height:auto;
  }
  .poster_tpl label{
    text-align: center;
  }
  .poster_tpl label input{
    display: none;
  }

  .poster_intro_wrapper{
    background: #fff;
    padding-bottom: .6rem;
  }
  .poster_intro_main{
    margin-top: .52rem;
    text-align: center;
  }
  .poster_intro_main_des{
    line-height: 1;
    height: .24rem;
    color:rgb(116,123,118);
  }
  .poster_intro_main_url{
    margin-top: .22rem;
    line-height: 1;
    color:rgb(254,119,164);
    width: 5.8rem;
    height: auto;
    border: none;
    resize: none;
    overflow: hidden;
    text-align: center;
  }
  .poster_intro_btns_wrapper{
    margin-top: .52rem;
  }

  .poster_intro_step_wrapper{
    margin-top: .52rem;
    text-align: center;
    line-height: 1;
    font-size: .24rem;
    color:rgb(0,0,0);
  }
  .poster_intro_step_title{

  }
  .poster_intro_step{
    margin-top: .52rem;
    padding: 0 .6rem;
  }
  .poster_intro_step p{
    text-align: left;
  }
  .poster_intro_step_num{
    margin-right:.06rem;
    display:inline-block;
    text-align: center;
    border-radius: 100%;
    width: .25rem;
    height: .25rem;
    line-height: .25rem;
    color:#fff;
    background-color:rgb(254,119,164);
  }
  .poster_intro_step_img_wrapper{
    margin-top: .3rem;
    overflow: hidden;
    margin-left:auto;
    margin-right: auto;
    font-size: 0;
    width: 4.54rem;
    height: 3.64rem;
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
  .btn_middle{
    min-width: 3.2rem;
    height: .84rem;
    font-size: .3rem;
  }
  .btn_main{
    color:#fff;
    background:rgb(254,121,163);
  }
  .btn_plain{
    border:1px solid rgb(254,121,163);
    color: rgb(254,121,163);
    background:#fff;
  }

  .btn_mt{
    margin-top: .3rem;
  }

  /* radio单选 */
  .radio{
    position: relative;
  }
  .radio i {
    position: absolute;
    left: 0;
    top: 50%;
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
  .radio i.active{
    border: .12rem solid rgb(255,119,165);
  }
</style>
