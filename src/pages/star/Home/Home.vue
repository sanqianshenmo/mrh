<template>
    <div class="home">
      <div class="home-header">
        <!--<div @click="goTo('/line')">
          <img src="./lines.gif" alt="">
        </div>-->
        <div class="home-header-top-top" @click="goTo('/star/line')">
          <div class="flex1"><img src="./lines.png" alt=""></div>
          <div class="flex2"><span class="flex2-left">占卜</span><span class="flex2-right">在线(速来)</span></div>
          <div class="flex3"><img src="./right.png" alt=""></div>
        </div>
        <div class="home-header-top" @click="goToNew">
          <div class="flex1"><img src="./meng.png" alt=""></div>
          <div class="flex2"><span class="flex2-left">怪兽</span><span class="flex2-right">读心术</span></div>
          <div class="flex3"><img src="./right.png" alt=""></div>
        </div>
        <div class="home-header-top" @click="goTo('/star/star')">
          <div class="flex1"><img src="./star.png" alt=""></div>
          <div class="flex2"><span class="flex2-left">星座</span><span class="flex2-right">运势(测试)</span></div>
          <div class="flex3"><img src="./right.png" alt=""></div>
        </div>
        <div class="home-header-bottom" @click="goTo('/star/animal')">
          <div class="flex1"><img src="./animal.png" alt=""></div>
          <div class="flex2"><span class="flex2-left">生肖</span><span class="flex2-right">运势(测试)</span></div>
          <div class="flex3"><img src="./right.png" alt=""></div>
        </div>
      </div>
      <!--<div class="input-submit">
        <div class="input-text">
          你了解自己的性格吗？你了解自己的内在吗？你的理想伴侣应该是什么样的？你一直追求的是什么？你的事业、感情状态都在正轨上吗？你今生追求的目标是什么？你能吸引什么样的人，而什么样的人又会吸引你呢？快来让占卜大师帮你测算吧！
        </div>
        <div class="input-title">
          输入您的占卜资料
        </div>
        <div class="input-label">
          <div class="center-banner-join">
            <textarea rows="1" maxlength="5" placeholder="真实姓名" class="join-input font-input" v-model="name"></textarea>
          </div>
          <div class="bottom-banner-join">
            <div class="main-col">
              <div class="main-col-left"></div>
              <div class="main-col-right">
                <div class="xingbie" v-if="!isMan">
                  <span><i class="active" @click="changeSex(1)"></i>男</span><span><i @click="changeSex(2)"></i>女</span>
                </div>
                <div class="xingbie" v-else>
                  <span><i @click="changeSex(1)"></i>男</span><span><i class="active" @click="changeSex(2)"></i>女</span>
                </div>
              </div>
            </div>
          </div>
          <div class="center-banner-join">
            <input type="number" placeholder="输入您的手机号" oninput="if(value.length>11)value=value.slice(0,11)" class="join-input font-input input-height" v-model="phone">
          </div>
          <div class="center-banner-join" @click="openPicker1">
            <textarea rows="1" maxlength="100" placeholder="出生日期：如 1980-06-30" class="join-input font-input" v-model="birthday" disabled></textarea>
          </div>
          <div class="center-banner-join">
            <textarea @click="showPicker" rows="1" unselectable="on" onfocus="this.blur()" :value="pickerAddress" readonly class="join-input font-input text-add"></textarea>
            <textarea rows="1" maxlength="100" placeholder="出生地点：如 北京 北京市 东城区" class="join-input font-input" v-model="addresss"></textarea>
          </div>
          <div class="center-banner-join">
            <textarea @click="showPickerNew" rows="1" unselectable="on" onfocus="this.blur()" :value="pickerAddressNew" readonly class="join-input font-input text-add"></textarea>
            <textarea rows="1" maxlength="100" placeholder="出生地点：如 北京 北京市 东城区" class="join-input font-input" v-model="addressNew"></textarea>
          </div>
          <div class="center-banner-join">
            <div class="bottom">
              <button @click="sumbit">提交资料开始占卜</button>
            </div>
          </div>
        </div>
      </div>-->
      <!--<div class="home-title">
        来自占卜用户的真实评价
      </div>
      <div class="home-box">
        <ul>
          <li v-for="(item, index) in lists" :key="index">
            <div>{{item.name}}</div>
            <div class="li-flex">
              <div class="li-flex1">评分：</div>
              <div class="li-flex2">
                <img src="./stars.png" alt="">
                <img src="./stars.png" alt="">
                <img src="./stars.png" alt="">
                <img src="./stars.png" alt="">
                <img src="./stars.png" alt="">
              </div>
            </div>
            <div>{{item.title}}</div>
          </li>
        </ul>
      </div>-->
      <my-address
        :showAddressPicker="showAddressPicker"
        :init="addresss"
        @save-address="saveAddress"
        @hide-picker="hidePicker">
      </my-address>
      <my-address-new
        :showAddressPicker="showAddressPickerNew"
        :init="addressNew"
        @save-address="saveAddressNew"
        @hide-picker="hidePickerNew">
      </my-address-new>
      <mt-datetime-picker
        v-model="pickerValue1"
        ref="picker1"
        :startDate="new Date(new Date().getTime()-100*366*24*60*60*1000)"
        :endDate="new Date(new Date().getTime()-24*60*60*1000)"
        type="time"
        year-format="{value} 年"
        month-format="{value} 月"
        date-format="{value} 日"
        @confirm="handleConfirm1">
      </mt-datetime-picker>
    </div>
</template>

<script>
import router from '@/router'
import {CODE} from '@/models'
import MyAddress from '@/components/star/address-picker/Address.vue'
import MyAddressNew from '@/components/star/address-picker-new/Address.vue'
const INIT_PICKER_ADDRESS = '出生地点 如：北京 北京市 东城区'
const INIT_PICKER_ADDRESS_NEW = '现居住地 如：北京 北京市 东城区'

export default {
  name: 'Home',
  data () {
    return {
      isMan: 0,
      // 选择省市所需参数
      showAddressPicker: false,
      showAddressPickerNew: false,
      isAddressPicked: false,
      isAddressPickedNew: false,
      pickerAddress: '',
      pickerAddressNew: '',
      addresss: INIT_PICKER_ADDRESS,
      addressNew: INIT_PICKER_ADDRESS_NEW,
      bir_province: '',
      live_province: '',
      bir_city: '',
      live_city: '',
      bir_district: '',
      live_district: '',
      // 日期选择
      birthday: '',
      pickerValue1: '',
      name: '', // 姓名
      sex: 0,
      phone: '',
      lists: [
        {'name': '张文', 'title': '和恋人一直分分合合，想知道新的一年能不能修成正果，老师提到的点都正中要害，并且给了我很有帮助的指导。'},
        {'name': '洛先生', 'title': '去年买了觉得挺准挺有用的，今年继续，反正就两三包烟的事，物有所值。'},
        {'name': '方伟伟', 'title': '算了后觉得超级棒，不愧是人气测算，对我的帮助太太太大了，以后每年都会来算下这个。'},
        {'name': '琉璃', 'title': ' 姻缘磁场最强的一年，但愿新的一年真的在爱情上有收获，感谢老师的鼓励与建议。'},
        {'name': 'ibeson', 'title': '明年想做点投资赚点钱但又不知道从何下手，通过流年运势我算是找到了明确方向，知道明年该怎么做了。'},
        {'name': '脉脉', 'title': '惊喜！没想到内容这么丰富，值得慢慢品读，居然还有每月的详细运势分析，感觉整年都能拿出来做参考，哈哈哈哈~'},
        {'name': '勇哥', 'title': '明年犯太岁，亲戚跟我推荐来算下这个比较好，感觉确实很有用，知道接下来该如何逢凶化吉，找到自己正确的发展方向。'},
        {'name': '王女士', 'title': '帮女儿算的，她明年就要大学毕业了，想知道她明年找工作顺不顺利，根据流年事业分析的内容知道要教她怎么做了，在感情上要防范哪些烂桃花。'},
        {'name': '一网情深', 'title': '感觉自己现在已经衰到极点，想知道未来能不能转运，看了流年预测后总算踏实了。那个福禄风水让人很惊喜，感觉对开运很有帮助。 '},
        {'name': '羽慕', 'title': '这几年都还挺顺的，反而担心物极必反，看完流年运势后感觉自己是多虑了，即便遇到运势不佳的情况也可以通过大师的指导加以防范和转变。'},
        {'name': 'sunjinxing', 'title': '内容很多，分析也很到位，不愧是连续十多年的冠军测算，就是有点小贵，呵呵。'},
        {'name': '陈宫', 'title': ' 生意连续亏损两年了，好害怕明年继续亏下去，算了后大概知道自己的财运如何，要怎么做才能扭转局势，谢谢！'},
        {'name': '我就是我', 'title': '和老公的关系有些紧张，对于未来真的感到非常迷茫，算了这个后知道明年要怎么去经营自己的婚姻，如何兼顾自己的事业了。'},
        {'name': '匿名', 'title': '感谢张老师解答了我的婚姻困扰，知道以后该怎么跟自己的老公相处，如何防止小三破坏我们的婚姻。'},
        {'name': '姜女士', 'title': '我也已经从懵懵懂懂的少女变成了孩子妈，一路上对我的帮助很大，真的是一款很有用也很经得起时间考验的测算。'},
        {'name': '王老吉', 'title': '虽然只是文字的分析，但能给人面对面算命的感觉，很亲切，指导性很强。'},
        {'name': '叮叮', 'title': '能针对我目前的状况给出针对性的分析，真的很棒，也很牛，比以前我算过的那些泛泛而谈的运势强多了。 '},
        {'name': '张女士', 'title': ' 帮儿子算的，想知道他明年有没有婚姻，没想到大师给了这么多的分析与建议，让我看到了希望。  '},
        {'name': '秦朗', 'title': '内容很具有指导性，对我明年的事业上如何发展给出了很好的启迪。'},
        {'name': '欢欢', 'title': '感觉自己的姻缘一直不好，没想到明年爱情运依然不旺，不过大师给了具体开桃花运的方法，希望能增旺自己的桃花运。 '},
        {'name': 'a1248533', 'title': ' 不可思议，原本以为只是吉凶的预测，没想到还把爱情、事业、健康、财运等方方面面都给出了详细的分析以及建议，值得时不时拿出来作参考。 '},
        {'name': '葛先生', 'title': '以前看过张老师写的书，观点独到，一语中的，老师的流年详批同样给我醍醐灌顶的指导，点赞！'},
        {'name': '郑先生', 'title': '同学一直找我合伙做项目，但我不确定要不要跟着他一起做，毕竟要拿出自己辛苦多年的积蓄，批了这个流年后大概晓得要咋整了。    '},
        {'name': '冯娇娇', 'title': '每年都会来找张老师算流年，能让我提前知道明年运势的吉凶，需要把握哪些机会和注意哪些问题，让自己在新的一年里更加顺利。'},
        {'name': '何文霞', 'title': '每年都会帮老公来算下，每年都受益匪浅，去年他如大师预测的升官了，今年会继续按照老师的指导前行，值得推荐的测算。'},
        {'name': '美呆呆', 'title': '明年有去异地发展的打算，但又不知道出去是不是真的就有发展，算了流年后总算心里有底了，感谢张老师给我的帮助。'},
        {'name': '匿名', 'title': '已经是第四年来找张老师批紫微流年了，感觉每年的内容都有惊喜，今年依然没有令我失望，很棒，希望越来越强！ '},
        {'name': '王先生', 'title': '感觉最近身边的小人很多，看了后知道2018年该如何防范小人，并如何借助贵人之力让自己明年更顺利。'},
        {'name': '刘33', 'title': '针对我的个人现状给出很具体的分析，感觉这才是专门为我而写的流年运势，这个钱花的值。'},
        {'name': '小范子', 'title': '替人打工多年觉得挺没意思的，但又不确定单干的时机是否成熟，批了流年后接下来该怎么做已经有了明确的方向，很实用的一款测算。'}
      ]
    }
  },
  components: {
    MyAddress,
    MyAddressNew
  },
  methods: {
    goTo (val) {
      router.push(val)
    },
    goToNew () {
      window.location.href = 'http://www.mrhmr.com/h_duxin'
    },
    changeSex (index) {
      if (index === 1) {
        this.isMan = 0
        this.sex = 0
      } else if (index === 2) {
        this.isMan = 1
        this.sex = 1
      }
    },
    closeAddAddress () {
      this.$emit('closeAddAddress', true)
    },
    closeAddAddressNew () {
      this.$emit('closeAddAddress', true)
    },
    hidePicker () {
      // 接受子组件关闭popup事件
      this.showAddressPicker = false
    },
    hidePickerNew () {
      // 接受子组件关闭popup事件
      this.showAddressPickerNew = false
    },
    showPicker () {
      this.showAddressPicker = !this.showAddressPicker
    },
    showPickerNew () {
      this.showAddressPickerNew = !this.showAddressPickerNew
    },
    saveAddress (val) {
      // 从子组件接受返回所选值 val
      this.isAddressPicked = true
      this.addresss = val
      let addressArr = val.split('-')
      this.bir_province = addressArr[0]
      this.bir_city = addressArr[1]
      this.bir_district = addressArr[2]
      this.showAddressPicker = !this.showAddressPicker
    },
    saveAddressNew (val) {
      // 从子组件接受返回所选值 val
      this.isAddressPickedNew = true
      this.addressNew = val
      let addressArr = val.split('-')
      this.live_province = addressArr[0]
      this.live_city = addressArr[1]
      this.live_district = addressArr[2]
      this.showAddressPickerNew = !this.showAddressPickerNew
    },
    openPicker1 () {
      this.$refs.picker1.open()
    },
    handleConfirm1 (value) {
      console.log(value)
      this.birthday = this.formatTime(value, 'startDate')
      console.log(this.birthday)
    },
    formatTime (date, dateType) {
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      if (month < 10) {
        month = '0' + month
      }
      var day = date.getDate()
      if (day < 10) {
        day = '0' + day
      }
      return year + '-' + month + '-' + day
    },
    sumbit () {
      if (!(this.name && this.phone && this.bir_province && this.bir_city && this.bir_district && this.bir_province && this.bir_city && this.bir_district)) {
        this.$messagebox('提示', '信息填写不完整')
        return false
      } else {
        let reg2 = /^[1][3,4,5,6,7,8][0-9]{9}$/ // 手机号验证
        if (reg2.test(this.phone) === false) {
          this.$messagebox('提示', '手机号格式不正确')
          return false
        } else {
          this.sumbits()
        }
      }
    },
    sumbits () {
      CODE.sumbitInfo(this.name, this.sex, this.phone, this.birthday, this.bir_province, this.bir_city, this.bir_district, this.live_province, this.live_city, this.live_district)
        .then(res => {
          if (res.data.retCode === 0) {
            this.$messagebox('提交成功', '请等待占卜师来电')
              .then(action => {
                this.sex = ''
                this.name = ''
                this.phone = ''
                this.addresss = ''
                this.addressNew = ''
                this.birthday = ''
                this.bir_province = ''
                this.bir_city = ''
                this.bir_district = ''
                this.live_province = ''
                this.live_city = ''
                this.live_district = ''
                window.scrollTo(0, 0)
              })
          } else {
            this.$messagebox('提交失败', '服务端不可用')
          }
        })
    }
  }
}
</script>

<style scoped>
.home {
  background: url("./bg.jpg") no-repeat center center;
  background-size: 100% 100%;
  min-height: 100%;
}
.home-header {
  padding: .8rem .4rem 0 .4rem;
}
.home-header-top {
  display: flex;
  flex-direction: row;
  padding: .2rem .4rem;
  border-radius: 1rem;
  background-color: #bd49d2;
  text-align: center;
  margin-top: .4rem;
}
.home-header-top-top {
  display: flex;
  flex-direction: row;
  padding: .2rem .4rem;
  border-radius: 1rem;
  background-color: #a341bb;
  text-align: center;
}
.home-header-bottom {
  display: flex;
  flex-direction: row;
  padding: .2rem .4rem;
  border-radius: 1rem;
  background-color: #a667e9;
  text-align: center;
  margin-top: .4rem;
}
.flex1 {
  flex: 1;
  width: 1rem;
  height: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.flex2 {
  flex: 5;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  color: #fff;
  font-size: .32rem;
  text-align: left;
  padding-left: .4rem;
}
.flex2-left {
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: .5rem;
  letter-spacing: .04rem;
  font-family: cursive;
  padding-right: .1rem;
}
.flex2-right {
  display: flex;
  flex-direction: column;
  justify-content: center;
  letter-spacing: .04rem;
}
.flex3 {
  flex: 1;
  width: 1rem;
  height: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.flex3 img {
  width: .2rem;
}
.home-title {
  background: url("./title.png") no-repeat center center;
  background-size: 100% 100%;
  height: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 1.2rem;
  color: #fff;
  font-size: .32rem;
}
.home-box {
  margin: -.4rem .2rem 0 .2rem;
  height: 5rem;
  background-color: rgba(255,255,255,0.3);
  color: #fff;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,.6);
}
@keyframes rowup {
  0% {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
  100% {
    -webkit-transform: translate3d(0, -2370px, 0);
    transform: translate3d(0, -2370px, 0);
    display: none;
  }
}
ul {
  height: 2370px;
  -webkit-animation: 240s rowup linear infinite normal;
  animation: 240s rowup linear infinite normal;
  position: relative;
}
li {
  margin: .2rem;
  padding-bottom: .4rem;
  border-bottom:1px solid rgba(255,255,255,.5);
  font-size: .24rem;
}
li div {
  padding-bottom: .1rem;
}
.li-flex {
  display: flex;
  flex-direction: row;
}
.li-flex2 {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.li-flex2 img {
  width: .2rem;
  height: .2rem;
  padding-right: .04rem;
}
.input-submit {
  padding: .4rem .2rem;
}
.input-submit .input-text {
  color: #fff;
  padding: .2rem;
}
.input-submit .input-title {
  padding: .4rem;
  text-align: center;
  color: #fff;
  font-size: .36rem;
}
.center-banner-join {
  margin-bottom: .1rem;
}
.join-input {
  width: 100%;
}
.font-input {
  font-size: 14px;
  padding: 5px 0;
  background-color: rgba(255,255,255,.3);
}
textarea::-webkit-input-placeholder {
  font-size: .28rem;
  padding-left: .1rem;
  color: rgb(255,255,255);
}
input::-webkit-input-placeholder {
  font-size: .28rem;
  padding-left: .1rem;
  color: rgb(255,255,255);
}
input {
  height: .48rem;
  color: #fff;
}
input,textarea {
  border-radius: .5rem;
  text-indent: .5rem;
  color: #fff;
}
/* 男女选择 */
.main-col {
  padding-left: .4rem;
}
.main-col .main-col-left {
  float: left;
  width: 1rem;
  text-align: right;
  padding-right: .24rem;
  font-size: .28rem;
  color: rgb(34,34,34);
}
.main-col .main-col-right {
  font-size: .28rem;
  color: rgb(102,102,102);
}
.main-col .xingbie {
  text-align: left;
  padding: 0 0 .4rem 0;
  color: #fff;
}
.xingbie span {
  font-size: .28rem;
  padding-left: 1rem;
}
.xingbie span:nth-child(1) {
  padding-left: 0;
}
.xingbie span i.active:before {
  content: '';
  width: .24rem;
  height: .24rem;
  border: 1px solid #fff;
  border-radius: 50%;
  display: inline-block;
  padding: 0;
  position: relative;
  top: -.08rem;
  left: -.08rem;
}
.xingbie span i.active {
  width: .12rem;
  height: .12rem;
  background-color: #fff;
  border-radius: 50%;
  display: inline-block;
  padding: 0;
  margin-right: .3rem;
  position: relative;
  top: .12rem;
  left: .12rem;
}
.xingbie span i:before {
  content: '';
  width: .24rem;
  height: .24rem;
  border: 1px solid #fff;
  border-radius: 50%;
  display: inline-block;
  padding: 0;
  position: relative;
  top: -.08rem;
  left: -.08rem;

}
.xingbie span i{
  width: 0;
  height: 0;
  background-color: #ffffff;
  border-radius: 50%;
  display: inline-block;
  padding: 0;
  margin-right: .3rem;
  position: relative;
  top: .12rem;
  left: .12rem;
  padding-right: .12rem;
}
.center-banner-join {
  margin: .4rem 0;
}
/* 省市 */
textarea.text-add {
  position: absolute;
  opacity: 0;
  width: 7rem;
}
.bottom {
  text-align: center;
  margin-bottom: -1rem;
  padding-top: .5rem;
}
.bottom button {
  width: 4.3rem;
  height: .84rem;
  font-size: .3rem;
  color: rgb(255,253,252);
  background-color: #d753e4;
  border: none;
  border-radius: .5rem;
}
</style>
