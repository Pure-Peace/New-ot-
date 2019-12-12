<template>
  <div>
    <div
      style="transition: .6s ease; height: 190px;"
    >
      <div
        style="height: 100%; background-size: cover;filter: blur(60px); transition: 1.5s linear;"
        :style="'background-image: url('+ require('../assets/' + imgSet[currentIdx]) +');background-position:'+ imageX + 'px ' + imageY + 'px;'"
      />
      <div
        style="position: relative; top: -120px; height: 185px; transition: .6s ease;"
      >
        <div style="position: relative; top: 60px; left: 100px;  max-width: 80%; user-select: none;">
          <div style="font-size:33px;font-weight:bold;color:#FFFFFF;text-shadow: 0 1px 6px #2A2A2A;">
            Welcome to o!t
          </div>
          <div style="margin-left: 15px;font-size:14px;font-weight:bold;color:#FFFFFF;text-shadow: 0 1px 6px #2A2A2A;">
            —— A magical osu! tournament platform
          </div>
        </div>
      </div>
    </div>
    <div
      class="the-navbar"
      style="filter: blur(1px); z-index: 555; background:linear-gradient(to bottom, rgba(172,57,109,0.8),rgba(172,57,109,0.4)); top: -2px; box-shadow: 0 0 1px 2px rgba(0,0,0,0);"
      :style="scrollFlag === true? 'height:57px;background:linear-gradient(to bottom, rgba(172,57,109,0.95),rgba(172,57,109,0.8));' : 'height: 87px;'"
    />
    <div
      class="the-navbar"
      :style="scrollFlag === true? 'height:55px;background:linear-gradient(to bottom, rgba(172,57,109,0.9),rgba(172,57,109,0.5));' : 'height: 85px;'"
    >
      <div
        style="transition: .4s ease;"
        :style="scrollFlag === true? 'margin-right: 50px;' : 'margin-right: 200px;'"
        @click="jumpTo('home')"
      >
        <span
          class="the-item"
          style="text-align: center; line-height: 31px; transition: .4s ease;letter-spacing: 4px; user-select: none;"
          :style="scrollFlag === true? 'font-size: 22px;' : 'font-size: 28px;'"
        >
          o!t
        </span>
      </div>
      <a-menu
        v-model="routeName"
        theme="light"
        mode="horizontal"
        style="border:0px !important; background:rgba(255,255,255,0); font-size: 14px; font-weight: 500; transition: .4s ease;"
        :style="scrollFlag === true? 'line-height: 52px;':'line-height: 82px; '"
      >
        <a-menu-item
          v-for="item in routes.filter(item => item.show===true)"
          :key="item.name"
          style="width: 50px; padding: 0 10px; margin: 0 10px;"
          @click="jumpTo(item.name)"
        >
          {{ item.title }}
        </a-menu-item>
      </a-menu>
      <user-wrapper :avatar-size="scrollFlag === true? 38 : 64" />
    </div>
  </div>
</template>

<script>
import userWrapper from './userWrapper'
import routes from '../routes'
import Bus from '@/bus'

export default {
  components: {
    userWrapper
  },
  data () {
    return {
      scrollFlag: false,
      routes: routes,
      routeName: this.global.routeName ? this.global.routeName : this.routeName,
      imageX: 80,
      imageY: 800,
      lastMouseX: 0,
      lastMouseY: 0,
      currentIdx: Math.floor(Math.random() * this.global.topNavImgSet.length),
      imgSet: this.global.topNavImgSet,
      towards: Math.floor(Math.random() * 4)
    }
  },
  beforeCreate () {
    Bus.$on('navChange', (routeName) => {
      this.routeName = [routeName]
    })
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
    window.addEventListener('mousemove', this.handleMousemove)
    setInterval(() => {
      this.currentIdx = Math.floor(Math.random() * 3)
      this.imageX = 80
      this.imageY = 800
      let lastTowards = this.towards
      this.towards = Math.floor(Math.random() * 4)
      if (this.towards === lastTowards) {
        switch (lastTowards) {
          case 0:
            this.towards = 1
            break
          case 1:
            this.towards = 0
            break
          case 2:
            this.towards = 3
            break
          case 3:
            this.towards = 2
            break
        }
      }
    }, 30000)
    // setInterval(() => {
    // switch (this.towards) {
    // case 0:
    // this.imageX -= 40
    // break
    // case 1:
    // this.imageX += 40
    // break
    // case 2:
    //   this.imageY -= 40
    //   break
    // case 3:
    //   this.imageY += 40
    //   break
    // }
    // }, 1000)
  },
  methods: {
    jumpTo (name) {
      this.$router.push({ name: name })
    },
    handleScroll () {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop > 100) {
        this.scrollFlag = true
      } else {
        this.scrollFlag = false
      }
    },
    handleMousemove (e) {
      let nowMouseX = e.clientX || e.pageX || e.x
      let nowMouseY = e.clientY || e.pageY || e.y
      if (this.lastMouseX !== 0 || this.lastMouseY !== 0) {
        this.imageX -= (nowMouseX - this.lastMouseX) / 4
        this.imageY -= (nowMouseY - this.lastMouseY) / 3
      }
      this.lastMouseX = nowMouseX
      this.lastMouseY = nowMouseY
    }
  }
}
</script>

<style>
.the-navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 556;
  transition: .5s ease-in-out;
  display: flex;
  justify-content: center;
  align-items:center;
  color: #F3F3F3;
}
.the-item {
  font-size: 15px;
  font-weight: 500;
  padding: 14px 14px;
  color: #F6F6F6;
  transition: .4s ease;
  cursor: pointer;
}
.the-item:hover {
  color: #E0B8CA;
}
</style>
