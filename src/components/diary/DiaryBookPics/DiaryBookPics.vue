<template>
 <div>
  <!-- 比较富于多变化 -->
  <!-- 样式分类
    1. 1张 一个方形
    2. 两张 并列
    3. 3张  一大两少
    4. 4张 方形
    5. 2+3
    6. 3 + 3张小图
  -->
  <div class="diary-content-pics-1" v-if="num === 1">
    <img :src="imgs[0]" alt="">
  </div>
  <div class="diary-content-pics-2" v-if="num === 2">
    <img :src="imgs[0]" alt="">
    <img :src="imgs[1]" alt="">
  </div>
  <div class="diary-content-pics-3" v-if="num === 3">
    <div class="diary-content-pics-3-left">
      <img :src="imgs[0]" alt="">
    </div>
    <div class="diary-content-pics-3-right">
      <div class="diary-content-pics-3-box">
        <img :src="imgs[1]" alt="">
      </div>
      <div class="num3-right-mt diary-content-pics-3-box">
        <img :src="imgs[2]" alt="">
      </div>
    </div>
  </div>
  <div class="diary-content-pics-4" v-if="num === 4">
    <div class="diary-content-pics-2">
      <img :src="imgs[0]" alt="">
      <img :src="imgs[1]" alt="">
    </div>
    <div class="diary-content-pics-2 mt-10">
      <img :src="imgs[2]" alt="">
      <img :src="imgs[3]" alt="">
    </div>
  </div>
  <div class="diary-content-pics-5" v-if="num === 5">
    <div class="diary-content-pics-2">
      <img :src="imgs[0]" alt="">
      <img :src="imgs[1]" alt="">
    </div>
    <div class="diary-content-pics-row-3 mt-10">
      <img :src="imgs[2]" alt="">
      <img :src="imgs[3]" alt="">
      <img :src="imgs[4]" alt="">
    </div>
  </div>
  <div class="diary-content-pics-6" v-if="num === 6">
    <div class="diary-content-pics-3">
      <div class="diary-content-pics-3-left">
        <img :src="imgs[0]" alt="">
      </div>
      <div class="diary-content-pics-3-right">
        <img :src="imgs[1]" alt="">
        <img class="mt-10" :src="imgs[2]" alt="">
      </div>
    </div>
    <div class="diary-content-pics-row-3 mt-10">
      <img :src="imgs[3]" alt="">
      <img :src="imgs[4]" alt="">
      <img :src="imgs[5]" alt="">
    </div>
  </div>
  <div class="diary-content-pics-7" v-if="num === 7">
    <div class="diary-content-pics-2">
      <img :src="imgs[0]" alt="">
      <img :src="imgs[1]" alt="">
    </div>
    <div class="diary-content-pics-2 mt-10">
      <img :src="imgs[2]" alt="">
      <img :src="imgs[3]" alt="">
    </div>
    <div class="diary-content-pics-row-3 mt-10">
      <img :src="imgs[4]" alt="">
      <img :src="imgs[5]" alt="">
      <img :src="imgs[6]" alt="">
    </div>
  </div>
  <div class="diary-content-pics-8" v-if="num === 8">
    <div class="diary-content-pics-2">
      <img :src="imgs[0]" alt="">
      <img :src="imgs[1]" alt="">
    </div>
    <div class="diary-content-pics-row-3 mt-10">
      <img :src="imgs[2]" alt="">
      <img :src="imgs[3]" alt="">
      <img :src="imgs[4]" alt="">
    </div>
    <div class="diary-content-pics-row-3 mt-10">
      <img :src="imgs[5]" alt="">
      <img :src="imgs[6]" alt="">
      <img :src="imgs[7]" alt="">
    </div>
  </div>
  <div class="diary-content-pics-9" v-if="num === 9">
    <div class="diary-content-pics-row-3">
      <img :src="imgs[0]" alt="">
      <img :src="imgs[1]" alt="">
      <img :src="imgs[2]" alt="">
    </div>
    <div class="diary-content-pics-row-3 mt-10">
      <img :src="imgs[3]" alt="">
      <img :src="imgs[4]" alt="">
      <img :src="imgs[5]" alt="">
    </div>
    <div class="diary-content-pics-row-3 mt-10">
      <img :src="imgs[6]" alt="">
      <img :src="imgs[7]" alt="">
      <img :src="imgs[8]" alt="">
    </div>
  </div>
 </div>
</template>

<script>
import {IMG_PREFIX, ImgThumbnailPostfix} from '@/common/config/config.js'

export default {
  name: 'DiaryBookPics',
  props: {
    pics: {
      type: Object,
      default () {
        return {
          num: 0, // 图片数量
          imgs: [] // 上传的图片集合
        }
      }
    }
  },
  computed: {
    num () {
      return this.pics.num
    },
    imgs () {
      let imgs = []
      imgs = this.pics.imgs.map(item => {
        return IMG_PREFIX + item + ImgThumbnailPostfix
      })
      return imgs
    }
  }
}
</script>

<style>
.num3-right-mt{
  margin-top: .06rem;
}
 /* 主体照片 */
.diary-content-pics-1{
  border-radius: .08rem;
  width: 5.82rem;
  height: 5.82rem;
  overflow: hidden;
}
.diary-content-pics-1 img{
  width: 100%;
  background-color: rgba(215, 86, 228, 1);
}
.diary-content-pics-2{
  border-radius: .08rem;
  height: 2.87rem;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
}
.diary-content-pics-2 img{
  width: 2.87rem;
  height: 2.87rem;
  border-radius: .08rem;
  background-color: rgba(215, 86, 228, 1);
}
.diary-content-pics-3{
  border-radius: .08rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.diary-content-pics-3-left{
  border-radius: .08rem;
  width: 3.86rem;
  height: 3.86rem;
  overflow: hidden;
  background-color: rgba(215, 86, 228, 1);
}
.diary-content-pics-3-left img{
  border-radius: .08rem;
  width: 100%;
}
.diary-content-pics-3-right{
  width: 1.88rem;
}
.diary-content-pics-3-right img{
  width: 100%;
}
/* 3个时 右侧的图片包裹层--防止图片变形 */
.diary-content-pics-3-box{
  height: 1.9rem;
  width: 1.9rem;
  border-radius: .08rem;
  overflow: hidden;
  background-color: rgba(215, 86, 228, 1);
}
/* diary-content-pics-2 +  diary-content-pics-2 */
.diary-content-pics-4{

}
/* 图片横向3组件 =>5、6、7、8、9图*/
.diary-content-pics-row-3{
  border-radius: .08rem;
  display: flex;
  justify-content: space-between;
}
.diary-content-pics-row-3 img{
  border-radius: .08rem;
  width: 1.88rem;
  height: 1.88rem;
  background-color: rgba(215, 86, 228, 1);
}
/* diary-content-pics-2 +  diary-content-pics-3 */
.diary-content-pics-5{

}
/* 4+3构成7 */
/* 2+2+3构成7 */
/* 2+3+3构成8 */
</style>
