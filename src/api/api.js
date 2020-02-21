import axios from 'axios'
import config from './config'

/* 图片路径 */
export const imgBase = config.imgBase
/* 商城首页轮播图 */
export const shopCarousel = params => {
  return axios.get(config.shopCarousel, {params: params})
}
/* 商城商品分类列表 */
export const shopCategoryList = params => {
  return axios.get(config.shopCategoryList, {params: params})
}
/* 商城商品分类 */
export const shopCategory = params => {
  return axios.get(config.shopCategory, {params: params})
}
/* 请求购物车 */
export const cartList = params => {
  return axios.get(config.cartList, {params: params})
}
/* 请求加入购物车 */
export const addCartList = data => {
  return axios.post(config.addCartList, data)
}
/* 商品详情 */
export const goodDetail = params => {
  return axios.get(config.goodDetail + params)
}
