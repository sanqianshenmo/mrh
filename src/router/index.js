import Vue from 'vue'
import Router from 'vue-router'
// import NotFound from '@/components/common/NotFound/NotFound'
import Shop from '@/pages/shop/Shop'
import ClickApply from '@/pages/clickapply/ClickApply'
import GoodsDetail from '@/components/shop/GoodsDetail/GoodsDetail'
import QrCode from '@/components/user/QrCode/QrCode'
import SaoMa from '@/components/user/SaoMa/SaoMa'
import Apply from '@/components/user/Apply/Apply'
import MyDiary from '@/components/user/Diary/Diary'
import Appoint from '@/components/user/Appoint/Appoint'
import Message from '@/components/user/Message/Message'
import CodeCount from '@/components/user/CodeCount/CodeCount'
import Attention from '@/components/user/Attention/Attention'
import Alliance from '@/components/user/Alliance/Alliance'
import OrderRecord from '@/components/user/Record/Record'
import MyVideo from '@/components/user/Video/Video'
import MyAddress from '@/components/user/MyAddress/MyAddress'
import ShopShow from '@/components/user/ShopShow/ShopShow'
import Poster from '@/components/user/Poster/Poster'
import Download from '@/components/user/Poster/Download/Download'
import ShopJoin from '@/components/user/ShopJoin/ShopJoin'
import ShopMy from '@/components/user/ShopMy/ShopMy'
import ShopVip from '@/components/user/ShopVip/ShopVip'
import ShopUsers from '@/components/user/ShopUsers/ShopUsers'
import ShopAudit from '@/components/user/ShopAudit/ShopAudit'
import AuditDetail from '@/components/user/ShopAudit/AuditDetail/AuditDetail'
import SetUp from '@/components/user/SetUp/SetUp'
import SetUpShops from '@/components/user/SetUp/SetUpShops'
import Loan from '@/pages/user/Loan/Loan'
import Cart from '@/pages/shop/Cart'
import Order from '@/pages/shop/Order'
import MyOrder from '@/pages/shop/MyOrder'
import Home from '@/pages/home/Home'
import Diary from '@/pages/diary/Diary'
import DiaryDetail from '@/pages/diary/DiaryDetail'
import DiaryNotebook from '@/pages/diary/DiaryNotebook'
import DiaryPerson from '@/pages/diary/DiaryPerson'
import DiaryWrite from '@/pages/diary/DiaryWrite'
import DiaryWriteModify from '@/pages/diary/DiaryWriteModify'
import DiaryCheck from '@/pages/diary/DiaryCheck/DiaryCheck'
import User from '@/pages/user/User'
import Goddess from '@/pages/goddess/goddess'
import Author from '@/components/common/Author/Author'
import HomeExpert from '@/pages/home/HomeExpert'
import Doctor from '@/pages/doctor/Doctor'
import DoctorEvaluate from '@/pages/doctor/DoctorEvaluate/DoctorEvaluate'
import Beauty from '@/pages/home/Beauty'
import BeautyNews from '@/pages/home/BeautyNews'
import Shaping from '@/pages/home/Shaping'
import ShapingIntro from '@/pages/home/ShapingIntro'
import Homes from '@/pages/star/Home/Home'
import Star from '@/pages/star/Star/Star'
import Animal from '@/pages/star/Animal/Animal'
import Lines from '@/pages/star/Line/Lines'
import Show from '@/pages/star/Show/Show'
// import Place from '@/pages/home/Place'
import Map from '@/pages/map/Map'
import Search from '@/pages/home/Search'
import Hospital from '@/pages/home/Hospital'
import BeautyProject from '@/pages/clickapply/BeautyProject/BeautyProject'
import ReservaTions from '@/pages/clickapply/ReservaTions/ReservaTions'
import SelectAddress from '@/pages/clickapply/SelectAddress/SelectAddress'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/shop',
      name: 'shop',
      component: Shop
    },
    {
      path: '/saoma',
      name: 'user.SaoMa',
      component: SaoMa
    },
    {
      path: '/diary',
      name: 'diary',
      component: Diary
    },
    {
      path: '/diary/notebook',
      name: 'diary.notebook',
      component: DiaryNotebook
    },
    {
      path: '/diary/person',
      name: 'diary.person',
      component: DiaryPerson
    },
    {
      path: '/diary/detail',
      name: 'diary.detail',
      component: DiaryDetail
    },
    {
      path: '/diary/write',
      name: 'diary.write',
      component: DiaryWrite
    },
    {
      path: '/diary/modify',
      name: 'diary.modify',
      component: DiaryWriteModify
    },
    {
      path: '/diary/check',
      name: 'diary.check',
      component: DiaryCheck
    },
    {
      path: '/author',
      name: 'author',
      component: Author
    },
    {
      path: '/user',
      name: 'user',
      component: User
    },
    {
      path: '/goddess',
      name: 'goddess',
      component: Goddess
    },
    {
      path: '/shop/:id',
      name: 'GoodsDetail',
      component: GoodsDetail
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    },
    {
      path: '/pay/goods',
      name: 'goodsPay',
      component: Order
    },
    {
      path: '/pay/cart',
      name: 'cartPay',
      component: Order
    },
    {
      path: '/user/order',
      name: 'user.order',
      component: MyOrder
    },
    {
      path: '/user/qrcode',
      name: 'user.qrcode',
      component: QrCode
    },
    {
      path: '/user/apply',
      name: 'user.apply',
      component: Apply
    },
    {
      path: '/user/setup',
      name: 'user.setup',
      component: SetUp
    },
    {
      path: '/user/setupshops',
      name: 'user.setupshops',
      component: SetUpShops
    },
    {
      path: '/user/myaddress',
      name: 'user.myaddress',
      component: MyAddress
    },
    {
      path: '/user/diary',
      name: 'user.diary',
      component: MyDiary
    },
    {
      path: '/user/appoint',
      name: 'user.appoint',
      component: Appoint
    },
    {
      path: '/user/message',
      name: 'user.message',
      component: Message
    },
    {
      path: '/user/codecount',
      name: 'codecount',
      component: CodeCount
    },
    {
      path: '/user/attention',
      name: 'user.attention',
      component: Attention
    },
    {
      path: '/user/alliance',
      name: 'user.alliance',
      component: Alliance
    },
    {
      path: '/user/codecount',
      name: 'user.codecount',
      component: CodeCount
    },
    {
      path: '/user/record',
      name: 'user.record',
      component: OrderRecord
    },
    {
      path: '/user/show',
      name: 'shopshow',
      component: ShopShow
    },
    {
      path: '/user/shopjoin',
      name: 'shopjoin',
      component: ShopJoin
    },
    {
      path: '/user/my',
      name: 'shopmy',
      component: ShopMy
    },
    {
      path: '/user/users',
      name: 'shopusers',
      component: ShopUsers
    },
    {
      path: '/user/audit',
      name: 'user.audit',
      component: ShopAudit
    },
    {
      path: '/user/audit/:id',
      name: 'user.audit.detail',
      component: AuditDetail
    },
    {
      path: '/user/vip',
      name: 'shopvip',
      component: ShopVip
    },
    {
      path: '/user/poster',
      name: 'poster',
      component: Poster
    },
    {
      path: '/user/poster/download',
      name: 'download',
      component: Download
    },
    {
      path: '/user/video',
      name: 'user.video',
      component: MyVideo
    },
    {
      path: '/user/loan',
      name: 'loan',
      component: Loan
    },
    {
      path: '/doctor',
      name: 'doctor',
      component: Doctor
    },
    {
      path: '/shaping',
      name: 'shaping',
      component: Shaping
    },
    {
      path: '/shaping/intro',
      name: 'shaping.intro',
      component: ShapingIntro

    },
    {
      path: '/place',
      name: 'place',
      component: Map
    },
    {
      path: '/expert',
      name: 'expert',
      component: HomeExpert
    },
    {
      path: '/beauty',
      name: 'beauty',
      component: Beauty
    },
    {
      path: '/beauty/news',
      name: 'beauty.news',
      component: BeautyNews
    },
    {
      path: '/hospital',
      name: 'hospital',
      component: Hospital
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/clickapply',
      name: 'enroll',
      component: ClickApply
    },
    {
      path: '/beautyproject',
      name: 'enroll.shape',
      component: BeautyProject
    },
    {
      path: '/reservations',
      name: 'enroll.doctor',
      component: ReservaTions
    },
    {
      path: '/selectAddress',
      name: 'enroll.info',
      component: SelectAddress
    },
    {
      path: '/doctor/evaluate',
      name: 'doctor.evaluate',
      component: DoctorEvaluate
    },
    {
      path: '/star',
      name: 'home',
      component: Homes
    },
    {
      path: '/star/star',
      name: 'star',
      component: Star
    },
    {
      path: '/star/animal',
      name: 'animal',
      component: Animal
    },
    {
      path: '/star/line',
      name: 'line',
      component: Lines
    },
    {
      path: '/star/show/:id',
      name: 'show',
      component: Show
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
