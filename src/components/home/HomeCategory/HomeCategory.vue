<template>
  <ul class="home-menu-wrapper">
    <li @click="goCatergory(menu.id)" class="home-menu-item" v-for="menu in menus" :key="menu.id">

      <img :src="menu.imgsrc" alt="菜单图片" title="导航分类">
      <span>{{menu.txt}}</span>
    </li>
  </ul>
</template>

<script>
// import router from '@/router'
import {PARTNER} from '@/models'
export default {
  name: 'HomeCategory',
  data () {
    return {
      per_info: ''
    }
  },
  props: {
    menus: {
      type: Array
    }
  },
  methods: {
    goCatergory (id) {
      console.log(id)
      const ID_ROUTES_TABLE = {
        '1': 'shaping',
        '2': 'place', // place
        '3': 'expert',
        '4': 'hospital',
        '5': 'beauty', // meiren
        '6': 'beauty', // liren
        '7': 'beauty', // jipin
        '8': 'join'
      }
      /* if (id === '4') {
        if (this.per_info.rule === 15 || this.per_info.rule === 16) {
          router.push('/user/alliance')
        } else if (this.per_info.rule === 17) {
          if (this.per_info.is_shop === 0) {
            router.push('/user/alliance')
          } else {
            router.push('/user/show')
          }
        } else {
          router.push('/user/alliance')
        }
        return
      } */
      if (id === '4') {
        window.location.href = 'https://q.eqxiu.com/s/6ySCPiRz'
        return
      }
      // 跳转
      if (ID_ROUTES_TABLE[id]) {
        this.$router.push({name: ID_ROUTES_TABLE[id]})
      }
    }
  },
  created () {
    PARTNER.getMsg()
      .then(res => {
        console.log(res)
        if (res.data.retCode === 0) {
          this.per_info = res.data.data
          console.log(this.per_info)
        }
      })
  }
}
</script>

<style scoped>
.home-menu-wrapper {
  padding-left:.4rem;
  padding-right:.4rem;
  padding-bottom: .4rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.home-menu-item {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 1.2rem;
  /* height: 1.4rem; */
  font-size: 0;
}
.home-menu-item img {
  height: 1rem;
  width: 1rem;
  font-size: .24rem;
}
.home-menu-item span {
  margin-top: .20rem;
  line-height:1;
  font-size: .26rem;
  color: rgb(102,102,102)
}
</style>
