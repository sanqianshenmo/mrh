<template>
  <div class="expert-intro-wrapper">
    <!-- 循环医生头部 -->
    <DoctorListIntro :doctor="doctorIntro">
      <a class="expert-btn-phone expert-btn-phone-pos" :href="'tel:' + telNum">电话咨询</a>
    </DoctorListIntro>
    <div class="expert-intro">
      <p class="expert-intro-title">-- 擅长领域 --</p>
      <p class="expert-intro-content" v-if="doctor.skill !== null">{{doctor.skill}}</p>
      <p class="expert-intro-content" v-if="doctor.skill === null">暂无数据</p>
    </div>
    <div class="expert-intro">
      <p class="expert-intro-title">-- 专家介绍 --</p>
      <p class="expert-intro-content pb-20" v-if="doctor.intro !== null">{{doctor.intro}}</p>
      <p class="expert-intro-content" v-if="doctor.intro === null">暂无数据</p>
    </div>
  </div>
</template>

<script>
/*
  引入这一层的原因：循环数据时，将每个对象分发到DoctorList组件，从而避免对于 不存在该层时，动态化 组装DoctorListIntro自定义所需要的数据（隔离了与原数据的关系）
  使用该组件的页面：专家列表
*/
import DoctorListIntro from '@/components/doctor/DoctorListIntro/DoctorListIntro'

export default {
  name: 'DoctorList',
  components: {
    DoctorListIntro
  },
  props: {
    doctor: {
      type: Object,
      default () {
        return {
          id: '1',
          name: 'xxx',
          job: '',
          grade: 0,
          avatar: '8246642822264867977.jpg',
          hospital: '美美美联盟平台',
          skill: '擅长领域',
          intro: '简介',
          phone: '',
          selectPrice: '0',
          caseAvatars: [], // 案例头像 无
          caseNum: 0 // 选择该医生的人数
        }
      }
    }
  },
  computed: {
    doctorIntro () {
      const info = {
        id: null,
        avatar: null,
        name: '姓名',
        job: '职位',
        hospital: '医院',
        grade: 0,
        selectPrice: '0', // 点赞费用
        caseAvatars: [], // 案例头像集合
        caseNum: '?' // 选择该医生的人数
      }
      // 自定义字段 与 接口数字字段名的对应
      // 转换表的意义，前后端开发进度不一致，或者说同步开发时使用了不同的字段，甚至数据结构不一致
      const transformMapTable = {
        id: 'id',
        avatar: 'avatar',
        name: 'name',
        job: 'job',
        hospital: 'hospital',
        grade: 'grade',
        selectPrice: 'selectPrice', // 点赞费用
        caseAvatars: 'userList',
        caseNum: 'caseNum' // 选择该医生的人数
      }
      /* to do 可以一个映射合并函数 基础函数 结合映射表 */
      for (let key in info) {
        if (info.hasOwnProperty(key)) {
          let doctorKey = transformMapTable[key]
          if (this.doctor[doctorKey]) {
            // 提取出案例头像
            if (doctorKey === 'userList') {
              let userList = this.doctor[doctorKey]
              userList.forEach(item => {
                info[key].push(item.avatar)
              })
            } else {
              info[key] = this.doctor[doctorKey]
            }
          }
        }
      }
      return info
    }
  },
  data () {
    return {
      telNum: '4000916868'
    }
  }
}
</script>

<style>
/* 医师介绍 */
.expert-intro-wrapper{
  margin-top: .2rem;
  padding-left:.2rem;
  padding-right:.2rem;
  background-color: #fff;
}
.expert-intro-wrapper:last-of-type{
  padding-bottom: .2rem;
}
.expert-intro{
  text-align: center;
  background-color: #fff;
}
.expert-intro-title{
  margin-top: .4rem;
  line-height: 1;
  font-size: .27rem;
  color:rgb(34,34,34);
}
.expert-intro-content{
  margin-top: .34rem;
  margin-top: .4rem;
  line-height:1.6;
  font-size: .24rem;
  text-align: left;
  color:rgb(102,102,102);
}
/* 医生电话 */
.expert-btn-phone{
  display: inline-block;
  border-radius: .08rem;
  text-align: center;
  width: 1.7rem;
  height: .7rem;
  line-height: .7rem;
  font-size: .28rem;
  color: #fff;
  background-color:rgb(188,122,255);
}
.expert-btn-phone-pos{
  position: absolute;
  right: 0;
  top: .5rem;
}
</style>
