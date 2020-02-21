// 基础url
// const BaseUrl = 'http://mrh.rfinfo.com.cn' // 线上
const BaseUrl = 'http://www.mrhmr.com' // 测试
const ShopUrl = 'http://shopqrm.mrhmr.com' // 测试
// const ShopUrl = 'http://shopqr.mrhmr.com' // 线上
// 七牛图片域名
const IMG_PREFIX = 'http://mrhmr.com/'
// 七牛生成缩略图后缀  -- 这里必须使用正方形，否则日记图片会变形
const ImgThumbnailPostfix = '?imageView/1/w/400/h/400'
// 高德地图 key
const MapKey = '3e6be1290f87ac92e528d9ec4a026c9b'
// 地图限定城市
const MapCityName = '北京'
// 整形类型type转换对应
const TYPE_NAME_MAP = {
  '0': '整形',
  '1': '单项整形',
  '2': '代言人',
  '3': '微整',
  '4': '植发'
}
export { BaseUrl, ShopUrl, IMG_PREFIX, MapKey, MapCityName, TYPE_NAME_MAP, ImgThumbnailPostfix }
