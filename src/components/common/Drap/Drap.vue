<template>
    <div class="box"
         @mousedown="down($event)" @touchstart="down($event)"
         @mousemove="move($event)" @touchmove="move($event)"
         @mouseend="end($event)" @touchend="end($event)"
         id="box"
         @click="goToRouter()"
    >
      <img src="./apply.png" alt="">
    </div>
</template>

<script>
import router from '@/router'
import {PARTNER} from '@/models'
import { MessageBox } from 'mint-ui'

export default {
  name: 'Drap',
  components: {
    MessageBox
  },
  data () {
    return {
      flags: false,
      position: {
        x: 0,
        y: 0
      },
      nx: '',
      ny: '',
      dx: '',
      dy: '',
      xPum: '',
      yPum: '',
      per_info: ''
    }
  },
  methods: {
    down (e) {
      this.flags = true
      let touch
      if (e.touches) {
        touch = e.touches[0]
      } else {
        touch = e
      }
      let moveDiv = document.getElementById('box')
      this.position.x = touch.clientX
      this.position.y = touch.clientY
      this.dx = moveDiv.offsetLeft
      this.dy = moveDiv.offsetTop
    },
    move (e) {
      let moveDiv = document.getElementById('box')
      if (this.flags) {
        let touch
        if (e.touches) {
          touch = event.touches[0]
        } else {
          touch = e
        }
        this.nx = touch.clientX - this.position.x
        this.ny = touch.clientY - this.position.y
        this.xPum = this.dx + this.nx
        this.yPum = this.dy + this.ny
        if (this.xPum < 0) {
          this.xPum = 0
        } else if (this.yPum < 0) {
          this.yPum = 0
        }
        moveDiv.style.left = this.xPum + 'px'
        moveDiv.style.top = this.yPum + 'px'
        // 阻止页面的滑动默认事件
        document.addEventListener('touchmove', e.preventDefault(), false)
        return false
      }
    },
    end (e) {
      this.flags = false
    },
    goToRouter (val) {
      PARTNER.getMsg().then(res => {
        console.log(res)
        if (res.data.retCode === 0) {
          this.per_info = res.data.data
          if (this.per_info.rule === 15) {
            MessageBox.alert('请先进行个人信息认证', '注意', {
              closeOnClickModal: false
            }).then(action => {
              this.$router.push({name: 'user.setup'})
            })
          } else {
            router.push({name: 'enroll', query: {isIdentified: true}})
          }
        }
      })
    }
  }
}
</script>

<style scoped>
  .box1 {
    width: 100%;
    height: 100%;
    display: inline-block;
    z-index: 100;
    position: fixed;
  }
  .box {
    width: 1rem;
    height: 1rem;
    position: fixed;
    top: 75%;
    left: 36%;
  }
  .box img {
    width: 1.95rem;
  }
</style>
