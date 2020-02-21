import { BaseUrl, ShopUrl } from '@/common/config/config.js'
import axios from 'axios'
import {getCookie, setCookie} from './cookie'
import router from '@/router'
axios.defaults.baseURL = BaseUrl
axios.defaults.headers.post['Content-Type'] = 'application/json'

/* 请求拦截添加头部token */
axios.interceptors.request.use(
  config => {
    // 判断是否存在token，如果存在的话，则每个http header都加上token
    config.headers['token'] = getCookie('mrh-token')
    // config.headers['token'] = 'eyJ0eXBlIjoiSldUIiwiYWxnIjoiSFM1MTIifQ.eyJzdWIiOiI3MzY1MjQ4ODY1OTkzMDEiLCJhdXRoIjpbXSwiaWF0IjoxNTI4ODUzNDMzLCJleHAiOjE1Mjg4ODQ5Njl9.oB53e-6cng1QPtmX-BG_knbEz3W589es8tXvvWFn-opw-Gzaqg0V2PR8ppkUaNAk2_CktPuq0YUXKRG3pvxN_Q'
    return config
  },
  err => {
    return Promise.reject(err)
  })
/* 响应拦截器 */
axios.interceptors.response.use(
  response => {
    if (response.data.retCode === 40002) {
      // 设置授权回调地址
      setCookie('firstUrl', window.location.href)
      console.log(getCookie('firstUrl'))
      setCookie('mrh-code', '')
      setCookie('mrh-token', '')
      router.push('/author')
    }
    return response
  },
  err => {
    console.log(err)
    // MessageBox({
    //   title: '错误',
    //   message: err.toString(),
    //   showCancelButton: false
    // })
    // return Promise.reject(err.response.data)
  })
const SHOP = {
  /* 商城首页轮播图 */
  carousel () {
    var res = axios.get('/slearn/carousel/rest?position=1')
    return res
  },
  /* 商城商品分类 */
  category () {
    var res = axios.get('/slearn/shopCategory/rest')
    return res
  },
  /* 商城商品分类列表 */
  categoryList (page, size, id) {
    var res = axios.get(`/slearn/shopCategory/rest/goodList?page=${page}&size=${size}&categoryId=${id}`)
    return res
  }
}

const GOOD = {
  goodDetail (id) {
    var res = axios.get(`/slearn/goods/rest/${id}`)
    return res
  }
}

const CART = {
  /* 参数    对应返回字段
   * goodsId  id（商品id）
   * id       cartId（购物车id，包含了对应商品id的相关信息如，数量，价格）
  */
  addGood (goodsId, count) {
    var res = axios.post('/slearn/cart/rest', {
      goodsId: goodsId,
      count: count
    })
    return res
  },
  updateNum (id, count) {
    var res = axios.put(`/slearn/cart/rest/${id}/upCount`, {
      count: count
    })
    return res
  },
  del (ids) {
    var res = axios.delete('/slearn/cart/rest/dropItems', {
      data: {
        ids: ids
      },
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return res
  },
  getList () {
    var res = axios.get('slearn/cart/rest/goodList')
    return res
  }
}

const ADDRESS = {
  add (address) {
    var res = axios.post('/slearn/address/rest', {
      province: address.province,
      city: address.city,
      district: address.district,
      address: address.address,
      // userName: address.userName,
      user_name: address.user_name,
      phone: address.phone,
      postcode: address.postcode,
      type: address.type
    })
    return res
  },
  update (id, updatedfield) {
    var res = axios.put(`/slearn/address/rest/${id}`, updatedfield)
    return res
  },
  del (id) {
    var res = axios.delete(`/slearn/address/rest/${id}`)
    return res
  },
  updateDefault (id) {
    var res = axios.put(`/slearn/address/rest/${id}/mkdefault`)
    return res
  },
  getList () {
    var res = axios.get('/slearn/address/rest')
    return res
  }
}

const ORDER = {
  getList (state, page, size) {
    let res = axios.get(`/slearn/order/rest?order_status=${state}&page=${page}&size=${size}`)
    return res
  },
  getDetail (id) {
    let res = axios.get(`/slearn/order/rest/${id}`)
    return res
  },
  cancel (id) {
    let res = axios.put(`/slearn/order/rest/${id}/cancel`)
    return res
  },
  del (id) {
    let res = axios.delete(`/slearn/order/rest/${id}`)
    return res
  },
  confirm (id) {
    let res = axios.put(`/slearn/order/rest/${id}/confirm`)
    return res
  },
  payFromGood (goodsId, addressId, count) {
    // ‘立即支付’下单
    var res = axios.post('/slearn/order/rest', {
      goodsId: goodsId,
      addressId: addressId,
      count: count
    })
    return res
  },
  payFromCart (cartIds, addressId) {
    // ‘购物车’下单
    var res = axios.post('/slearn/order/rest/fromCart', {
      cartIds: cartIds,
      addressId: addressId
    })
    return res
  },
  scorePay (orderId) {
    var res = axios.post(`/slearn/pay/score/${orderId}/pay`)
    return res
  },
  wxPay (orderId) {
    var res = axios.post(`/slearn/pay/weixin/${orderId}/pay`)
    return res
  }
}

const USER = {
  getUser () {
    let res = axios.post(`/slearn/user/getUser`)
    return res
  },
  infoUser (name, sex, idCardNum, province, city, district, address, mobile, mail) {
    let res = axios.post(`/slearn/user/finishInfoUser`, {
      name: name,
      sex: sex,
      idcard_num: idCardNum,
      province: province,
      city: city,
      district: district,
      address: address,
      mobile: mobile,
      mail: mail
    })
    return res
  },
  shopUser (person, mobile, province, city, district, address, project, photoCompanyCert, photoIdCard) {
    let res = axios.put(`/slearn/org/rest/apply`, {
      company_person: person,
      photo_company_cert: photoCompanyCert,
      project: project,
      province: province,
      city: city,
      district: district,
      address: address,
      mobile: mobile,
      photo_idcard: photoIdCard
    })
    return res
  },
  getShopUser () {
    let res = axios.get(`/slearn/org/rest/info`)
    return res
  },

  userApply (page) {
    var res = axios.get(`/slearn/enroll/findEnrollList?page=${page}`)
    return res
  },

  userComment (page, size) {
    var res = axios.get(`/slearn/comment/list?page=${page}&size=${size}`)
    return res
  },

  userZan (page, size) {
    var res = axios.get(`/slearn/zan/list?page=${page}&size=${size}`)
    return res
  },

  userTrade (page, size) {
    var res = axios.get(`/slearn/trade/getUserTrade?type=0&page=${page}&size=${size}`)
    return res
  },

  userSys (page, size) {
    var res = axios.get(`/slearn/msg/msgSys?page=${page}&size=${size}`)
    return res
  },
  userConcern () {
    var res = axios.get(`/slearn/concern/listMy`)
    return res
  },

  userRecord (page, size) {
    var res = axios.get(`/slearn/trade/getTradeList?page=${page}&size=${size}`)
    return res
  }
}
/* 报名相关接口 */
const ENROLL = {
  mealList () {
    var res = axios.post('/slearn/meal/list', {
      isShow: 1
    })
    return res
  },
  shapingItems (selectedType) {
    var res = axios.post('/slearn/meal/case', {
      isShow: 1,
      type: selectedType
    })
    return res
  },
  finishEnroll (enroll) {
    var res = axios.post('/slearn/enroll/finishEnroll', {
      type: enroll.type, // 第一步大类型的选择
      project: enroll.project, // 项目字符串（例如：吸脂--下巴, 吸脂--下颌缘
      doctorsName: enroll.doctorName, // 点选医生姓名
      name: enroll.name, // 姓名
      price: enroll.price, // 项目价格
      region: enroll.region, // 地址
      mobile: enroll.mobile, // 手机号
      effectivedAt: enroll.effectivedAt // 计划实行日期
    })
    return res
  }
}
const HOME = {
  carousel () {
    var res = axios.get('/slearn/carousel/rest?position=0')
    return res
  },
  /* 上传日记人数 */
  casesNum () {
    var res = axios.get('/slearn/diary/getCount')
    return res
  },
  /* 日记总数 */
  diaryTotal () {
    var res = axios.get('/slearn/diary/getCountByStatus')
    return res
  },
  /* 实施手术数 */
  shapedNum () {
    var res = axios.get('/slearn/enroll/getPledgeAllCount')
    return res
  }
}

const DIARY = {
  /* 精选日记 */
  selectedList (page, size) {
    var res = axios.get(`/slearn/diary/getCreamDiary?isCream=1&page=${page}&size=${size}`)
    return res
  },
  diaryListByType (page, size, shapType) {
    // var res = axios.get(`/slearn/diary/getCreamDiary?page=${page}&size=${size}&type=${shapType}`)
    var res = axios.get(`/slearn/diary/diaryListByUserIds?page=${page}&size=${size}&type=${shapType}`)
    return res
  },
  detail (id) {
    var res = axios.get(`/slearn/diary/detail?id=${id}`)
    return res
  },
  bookDiaryDetail (noteId, noteType) {
    var res = axios.get(`/slearn/notebook/detail?id=${noteId}&type=${noteType}`)
    return res
  },
  bookList () {
    var res = axios.get(`/slearn/notebook/noteList`)
    return res
  },
  bookDiaryList (bookObj, page, size) {
    var res = axios.post(`/slearn/diary/findDiaryListByNote?page=${page}&size=${size}`, {
      noteId: bookObj.noteId,
      type: bookObj.type, // 0恢复前
      order: bookObj.order // "desc"
    })
    return res
  },
  checkDiaryList (noteId, page, size) {
    var res = axios.post(`/slearn/diary/findDiaryListByNoteAll`, {
      noteId: noteId,
      page: page,
      size: size
    })
    return res
  },
  handleFocus (uid) {
    /*
      放这个位置不太好，医生也可以关注；而且不是在日记中
      uid -- 被关注id, uidBy -- 关注id
    */
    let res = axios.post(`/slearn/concern/add`, {
      uid: uid
    })
    return res
  },
  like (noteId) {
    // 这里的noteId指的是实际的日记id，而对应接口中返回的id
    let res = axios.post(`/slearn/zan/add`, {
      noteId: noteId

    })
    return res
  },
  unlike (noteId) {
    let res = axios.post(`/slearn/zan/delete`, {
      noteId: noteId
    })
    return res
  },
  addComment (noteId, comment) {
    let res = axios.post(`/slearn/comment/add`, {
      noteId: noteId,
      comment: comment
    })
    return res
  },
  submitDiary (diary) {
    var res = axios.post(`/slearn/diary/write`, {
      noteId: diary.noteId, // 日记本Id
      content: diary.content, // 日记内容
      writeTime: diary.writeTime, // writeTime（写日记时间）
      operationImg: diary.operationImg, // （术后图片）（w + 图片名称）
      operationImg2: diary.operationImg2, // （水印图片）（图片名称）
      userId:diary.userId//用户id
    })
    return res
  },
  modifyDiary (diary) {
    // 修改日记接口 -- 与上面唯一不同是多传一个修改日记的id
    var res = axios.post(`/slearn/diary/write`, {
      id: diary.id, // 日记本id
      noteId: diary.noteId, // 日记本Id
      content: diary.content, // 日记内容
      writeTime: diary.writeTime, // writeTime（写日记时间）
      operationImg: diary.operationImg, // （术后图片）（w + 图片名称）
      operationImg2: diary.operationImg2 // （水印图片）（图片名称）
    })
    return res
  }
}
/* 医生接口 */
const DOCTOR = {
  /* 精选日记 */
  getList () {
    var res = axios.post(`/slearn/doctor/getDoctorsList`)
    return res
  },
  getDetail (doctorId) {
    var res = axios.get(`/slearn/doctor/detail?doctorId=${doctorId}`)
    return res
  },
  caseList (doctorId, page, size, type) {
    var res = axios.get(`/slearn/doctor/diaryList?doctorId=${doctorId}&page=${page}&size=${size}&type=${type}`)
    return res
  },
  casesNum (doctorId) {
    var res = axios.get(`/slearn/doctor/getCaseNumByDoctor?doctorId=${doctorId}`)
    return res
  },
  evaluate (doctorId, grade) {
    var res = axios.post(`/slearn/doctor/update`, {
      doctorId: doctorId,
      grade: grade
    })
    return res
  }
}
/* 打赏 */
const TIP = {
  /* 精选日记 */
  user (userId, tradeType, money) {
    var res = axios.post(`/slearn/trade/userTrade`, {
      userId: userId,
      tradeType: tradeType,
      money: money
    })
    return res
  },
  doctor (doctorId, tradeType, money) {
    var res = axios.post(`/slearn/trade/doctorTrade`, {
      doctorId: doctorId,
      tradeType: tradeType,
      money: money
    })
    return res
  }
}
/* 搜索 */
const SEARCH = {
  diary (nickname, page, size) {
    let res = axios.get(`/slearn/diary/diaryListByUserIds?nickname=${nickname}&page=${page}&size=${size}`)
    return res
  }
}
/* 图片上传 */
/* 上传图片 参考：qrcode join.js */
const UPLOAD = {
  getToken () {
    let res = axios.get(`${ShopUrl}/ashop/store/get_uptoken`)
    return res
  },
  upImg (formData) {
    let res = axios({
      method: 'post',
      url: `${ShopUrl}/ashop/store/uploadImg`,
      header: 'Content-Type: multipart/form-data; charset=utf-8',
      data: formData
    })
    return res
  },
  upImgNoToken (file) {
    // 参考文章：https://blog.csdn.net/qq_24147051/article/details/76862073?locationNum=4&fps=1
    // file指图片资料 event.target.files[0]
    let param = new FormData() // 创建form对象
    // param.append('file', file, file.name) // 通过append向form对象添加数据
    param.append('_fileupload_onlyFile', file, file.name)
    let config = {
      headers: { 'Content-Type': 'multipart/form-data', 'watermark': true }
    } // 添加请求头
    let res = axios.post('/slearn/file/upload', param, config)
    return res
  }
}
const CURUSER = {
  info () {
    let res = axios.post(`/slearn/user/getUser`)
    return res
  },
  canEvaluate (doctorId) {
    // 判断用记是否有评价权限
    let res = axios.get(`/slearn/doctor/judgeCanComment?doctorId=${doctorId}`)
    return res
  }
}
/* 搜索 */
/* 授权登录 */
const LOGIN = {
  loginCode () {
    var res = axios.get(`/slearn/app/login/wxauth/url?ismember=no&redirect=${BaseUrl}/h_mrh/author.html`)
    return res
  },
  loginToken (data) {
    var res = axios.post('/slearn/app/login/wxauth/auth', data)
    return res
  },
  isFollow () {
    var res = axios.get(`/slearn/user/rest/follow`)
    return res
  },
  addStore (nickname, avatar, province, parent) {
    var res = axios.post(`${ShopUrl}/shopqr/add_store`, {
      nickname: nickname,
      avatar: avatar,
      province: province,
      parent_identify: parent
    })
    return res
  }
}
/* 城市合伙人 */
const PARTNER = {
  getMsg () {
    let res = axios.get(`${ShopUrl}/per_info`)
    return res
  },
  getPartnerList () {
    let res = axios.get(`${ShopUrl}/ashop/Store/partner_list`)
    return res
  },
  getAdvertInfo (shopidentity, deal) {
    let res = axios.get(`${ShopUrl}/advert_info?shopidentity=${shopidentity}&need_deal=${deal}`)
    return res
  },
  sendAdvert (logo, intro, address, contact, partner, activity) {
    let res = axios.post(`${ShopUrl}/send_advert`, {
      logo: logo,
      intro: intro,
      address: address,
      contact: contact,
      partner_identify: partner,
      activity: activity
    })
    return res
  },
  enterLink (link) {
    let res = axios.post(`${ShopUrl}/shopqr/enter_link`, {
      link: link
    })
    return res
  },
  createLink (link) {
    let res = axios.post(`${ShopUrl}/shopqr/create_link_sign`, {
      link: link
    })
    return res
  },
  shareLink (link, sign) {
    let res = axios.post(`${ShopUrl}/shopqr/share_link`, {
      link: link,
      enter_sign: sign
    })
    return res
  },
  wechat (url) {
    let res = axios.get(`${ShopUrl}/weixin_share?real_url=${url}`)
    return res
  },
  getCode () {
    let res = axios.get(`${ShopUrl}/my_code_pic`)
    return res
  },
  vipScan (start, end) {
    let res = axios.post(`${ShopUrl}/shopqr/sta_shop_scan`, {
      start: start,
      end: end
    })
    return res
  },
  vipFollow (identity) {
    let res = axios.post(`${ShopUrl}/shopqr/partner_followed`, {
      shop_identity: identity
    })
    return res
  },
  vipStatistics () {
    let res = axios.get(`${ShopUrl}/ashop/Store/partner_statistics`)
    return res
  },
  vipStatisticsPlace (sort) {
    let res = axios.get(`${ShopUrl}/ashop/Store/place_statistics?sort=${sort}`)
    return res
  },
  vipSurprofit (start, end) {
    let res = axios.post(`${ShopUrl}/shopqr/sta_shop_surprofit`, {
      start: start,
      end: end
    })
    return res
  },
  myStatistics (identify, type) {
    let res = axios.get(`${ShopUrl}/ashop/Store/custom_statistics?parent_identify=${identify}&type=${type}`)
    return res
  },
  posterDown () {
    let res = axios.get(`${ShopUrl}/ashop/Down/back_list`)
    return res
  }
}
/* 星座占卜 */
const CODE = {
  sumbitInfo (name, sex, phone, birthday, birProvince, birCity, birDistrict, liveProvince, liveCity, liveDistrict, email) {
    var res = axios.post('/slearn/star/rest', {
      name: name,
      sex: sex,
      phone: phone,
      birthday: birthday,
      bir_province: birProvince,
      bir_city: birCity,
      bir_district: birDistrict,
      live_province: liveProvince,
      live_city: liveCity,
      live_district: liveDistrict,
      email: email
    })
    return res
  }
}

const LOAN = {
  list () {
    let res = axios.get(`/slearn/borrow/rest`)
    return res
  },
  add (total, period) {
    let res = axios.post(`/slearn/borrow/rest`, {
      borrow_total: total, // string
      period: period // int
    })
    return res
  },
  update (id, total, period) {
    let res = axios.put(`/slearn/borrow/rest/{id}`, {
      borrow_total: total,
      period: period
    })
    return res
  },
  del (id) {
    let res = axios.delete(`/slearn/borrow/rest/{id}`)
    return res
  },
  dels (ids) {
    let res = axios.delete(`/slearn/borrow/rest/items`, {
      ids: ids // 如['1','2','3']
    })
    return res
  }
}
export {
  ENROLL,
  HOME,
  DIARY,
  DOCTOR,
  TIP,
  SHOP,
  GOOD,
  CART,
  ADDRESS,
  ORDER,
  USER,
  SEARCH,
  UPLOAD,
  CURUSER,
  LOGIN,
  PARTNER,
  CODE,
  LOAN
}
