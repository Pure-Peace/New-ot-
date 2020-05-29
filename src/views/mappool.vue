<template>
  <div style="padding: 10px 100px; width: 90%; margin: 60px auto; color: #FAFAFA;">
    <div style="background: #272023; border: 1px solid #362F32; border-radius: 8px;">
      <div style="min-height: 282px; display: flex;">
        <img
          :src="require('../assets/mappool.jpg')"
          style="border-radius: 8px 0 0 8px;"
        >
        <div style="font-weight: lighter; flex: 1; position: relative;">
          <div style="background: #31262B; padding: 15px 25px; border-radius: 0 8px 0 0; ">
            <span style="font-size: 24px;">图池</span><span style="font-size: 14px; margin-left: 5px;">/ Mappool</span>
          </div>
          <div style="padding: 28px; line-height: 26px;">
            在这里，您可以找到各种各样的图池~
            <br>
            这里的图池都是由玩家精挑细选的众多Beatmaps组合而成，您可以自由选择，然后享受其中……
            <br>
            当然，每个人的口味并不相同，您可以给图池评分，同时也可以向图池创建者提建议。
            <br>
            不过，选图是一个辛苦的过程，所以请酌情评分哦~
            <br>
            最后，欢迎您在这里提交自己的图池！
          </div>
          <div style="position: absolute; bottom: 20px; right: 40px; padding: 20px; border-radius: 8px;">
            <span
              class="my-button-span my-hover1"
              style="background-color: rgb(234, 81, 151); box-shadow: rgb(134, 56, 91) 0px 4px, rgb(0, 0, 0) 0px 2px 2px;"
            >
              创建图池
            </span>
            <span
              class="my-button-span my-hover2"
              style="margin-left: 15px; background-color: rgb(16, 139, 221); box-shadow: rgb(11, 83, 131) 0px 4px, rgb(0, 0, 0) 0px 2px 2px;"
            >
              图池管理
            </span>
          </div>
        </div>
      </div>
    </div>

    <a-spin :spinning="initing">
      <div>
        <div style="width: 90%; margin: 50px auto 0 auto; border-radius: 8px 8px 0 0; background-color: #272023; display: flex; justify-content: center;">
          <div style="width: 90%;">
            <a-divider
              id="target"
              style="font-size: 26px; font-weight: normal; margin: 40px auto 0 auto; color: #F2F2F2;"
            >
              <span
                class="act-button"
                style="user-select: none;"
                @click="draw"
              >
                <span>{{ !showSearch ? '图池搜索': '~关闭搜索~' }}</span>
                <a-icon
                  style="margin-left: 2px; transition: opacity .3s ease, font-size .3s ease;"
                  :style="!showSearch?'opacity:100;':'opacity:0; width: 0px; font-size: 12px;'"
                  type="search"
                />
              </span>
            </a-divider>

            <div
              style="transition: .6s ease; over-flow: hidden;"
              :style="showSearch?'opacity:100; margin: 40px 0 48px 0;':'opacity:0; margin: 10px 0 10px 0; visibility:hidden;'"
            >
              <div style="text-align:center; vertical-align:middle;">
                <span style="position: relative;">
                  <input
                    ref="searchText"
                    size="large"
                    class="my-input"
                    placeholder="输入图池全名或创建者id来搜索"
                    :style="showSearch?'':'opacity:0; height: 0;padding:0;'"
                    @keypress.enter="handleSearch"
                  >
                  <a-icon
                    class="act-button"
                    style="position: absolute; top: -2px; right: 0px;  font-weight: bold;"
                    :style="showSearch?'opacity:100; font-size: 24px;':'opacity:0; font-size: 12px;'"
                    type="search"
                    @click="handleSearch"
                  />
                </span>
              </div>
            </div>
          </div>
        </div>

        <div
          class="block-content"
          style="background: #201C1C; margin-top: 0; border-radius: 0 0 8px 8px; padding: 30px 30px 0 30px; border: 1px solid #41393D; transition: .4s ease;"
          :style="showSearch === true ? 'width: 90%' : 'width: 100%'"
        >
          <div style="height: 20px; margin: 15px 0;">
            <span style="font-size: 12px; padding: 6px 12px; border-radius: 16px; font-weight: lighter; background-color: rgba(50,226,123,.2); user-select: none;">
              <span style="margin-right: 3px;">已显示</span>
              <span>{{ showing.length }}</span>
              <span style="margin: 0 2px;">/</span>
              <span>{{ pools.length }}</span>
            </span>
            <span
              class="my-upload"
              @click="showMyUpload"
            >
              我创建的图池
            </span>
          </div>
          <div
            v-if="showing.length < 1"
            style="text-align: center;"
          >
            诶，啥也没有找到哦...？
          </div>
          <div
            v-else
            style="display: flex; flex-wrap: wrap; margin-left: 36px;"
          >
            <div
              v-for="(pool, idx) in showing"
              :key="idx"
              class="pool-main"
              style="text-shadow: 0 1px 3px rgba(0,0,0,.9); margin-top: 20px;"
              @click="mappoolDetail(pool)"
            >
              <div style="font-size: 13px; position: absolute; right: 20px; top: 15px; background-color: rgba(0, 0, 0, 0.1); padding: 4px 15px; border-radius: 40px;">
                <span>推荐</span>
                <span style="margin-left: 5px;">{{ getNumbFormated(pool.recommendElo) }} elo</span>
              </div>
              <a
                :href="`/poolDetail/${pool.name}`"
                target="_blank"
                style="font-size: 12px; position: absolute; bottom: 15px; right: 95px; padding: 3px 12px; color: #FAFAFA;"
                class="my-upload"
                @click.stop=""
              >
                Link
              </a>
              <div
                style="font-size: 12px; position: absolute; bottom: 15px; right: 20px; padding: 3px 12px; border-radius: 40px;"
                :style="`background-color: ${colorGetter(pool.status)};`"
              >
                {{ pool.status }}
              </div>
              <div style="position: absolute; left: 20px; bottom: 15px; display: flex;">
                <a-tooltip>
                  <a-avatar
                    class="small-avatar"
                    icon="user"
                    :src="`https://a.ppy.sh/${pool.creator}?.jpg`"
                    style="background-color: #grey; transition: .2s ease-in-out;cursor: pointer;user-select: none;"
                    @click="openLink(pool.creator)"
                  />
                  <div slot="title">
                    <a :href="`https://osu.ppy.sh/users/${pool.creator}`">访问主页</a>
                  </div>
                </a-tooltip>
                <div
                  style="margin: 10px 0 0 -10px; background-color: rgba(243,81,81,.43); font-size: 12px; text-shadow: 0 1px 3px rgba(0,0,0,.9); padding: 2px 12px 2px 16px; border-radius: 0 12px 12px 0;"
                >
                  创建者
                </div>
              </div>
              <div style="font-size: 20px;">
                {{ pool.name }}
              </div>
              <div style="margin-left: 0; font-size: 12px; margin-top: 6px;">
                <a-rate
                  v-model="pool.rating"
                  disabled
                  style="font-size: 12px; margin-right: 10px;"
                />
                <span>已有{{ pool.ratingCount }}人评分</span>
              </div>
            </div>
          </div>
          <div
            style="text-align: center; margin-top: 50px; padding-bottom: 20px;"
          >
            <div
              class="show-more"
              @click="handleShowMore"
            >
              {{ showMore }}
            </div>
          </div>
        </div>
      </div>
    </a-spin>

    <div style="position: relative; border: 1px solid #5C4951; font-weight: lighter; background-color: #201C1C; padding: 35px 40px; margin-top: 30px; border-radius: 8px; box-shadow: 4px 4px 4px 0 rgba(0, 0, 0, 0.04), 0 6px 6px 0 rgba(0, 0, 0, 0.04);">
      <div style="font-size: 24px;  padding: 10px 30px; display: inline-block; border-left: 2px solid #66BB6A;">
        <span>推荐图池</span>
        <span style="margin: 0 8px; font-size: 14px;">/</span>
        <span style="font-size: 14px;">Recommend</span>
      </div>

      <div
        style="border-radius: 4px; display: flex; flex-wrap: wrap; padding: 30px 0;"
      >
        <div
          v-for="(pool, idx) in showing.filter(pool => pool.status !== 'Pending')"
          :key="idx"
          style="margin-left: 36px; width: 44%;"
        >
          <div
            class="pool-main"
            style="text-shadow: 0 1px 3px rgba(0,0,0,.9); margin-top: 20px; width: 100%; border-radius: 8px 8px 0 0;"
            @click="mappoolDetail(pool)"
          >
            <div style="font-size: 13px; position: absolute; right: 20px; top: 15px; background-color: rgba(0, 0, 0, 0.1); padding: 4px 15px; border-radius: 40px;">
              <span>推荐</span>
              <span style="margin-left: 5px;">{{ getNumbFormated(pool.recommendElo) }} elo</span>
            </div>
            <div
              style="font-size: 12px; position: absolute; bottom: 15px; right: 20px; padding: 3px 12px; border-radius: 40px;"
              :style="`background-color: ${colorGetter(pool.status)}`"
            >
              {{ pool.status }}
            </div>
            <a
              :href="`/poolDetail/${pool.name}`"
              target="_blank"
              style="font-size: 12px; position: absolute; bottom: 15px; right: 95px; padding: 3px 12px; color: #FAFAFA;"
              class="my-upload"
              @click.stop=""
            >
              Link
            </a>
            <div style="position: absolute; left: 20px; bottom: 15px; display: flex;">
              <a-tooltip>
                <a-avatar
                  class="small-avatar"
                  icon="user"
                  :src="`https://a.ppy.sh/${pool.creator}?.jpg`"
                  style="background-color: #grey; transition: .2s ease-in-out;cursor: pointer;user-select: none;"
                  @click.stop="openLink(pool.creator)"
                />
                <div slot="title">
                  <a :href="`https://osu.ppy.sh/users/${pool.creator}`">访问主页</a>
                </div>
              </a-tooltip>
              <div
                style="margin: 10px 0 0 -10px; background-color: rgba(243,81,81,.43); font-size: 12px; text-shadow: 0 1px 3px rgba(0,0,0,.9); padding: 2px 12px 2px 16px; border-radius: 0 12px 12px 0;"
              >
                创建者
              </div>
            </div>
            <div style="font-size: 20px;">
              {{ pool.name }}
            </div>
            <div style="margin-left: 0; font-size: 12px; margin-top: 6px;">
              <a-rate
                v-model="pool.rating"
                disabled
                style="font-size: 12px; margin-right: 10px;"
              />
              <span>已有{{ pool.ratingCount }}人评分</span>
            </div>
          </div>
          <div style="margin: -1px 0 0 20px; padding: 15px 20px; background-color: #221C1F; font-weight: lighter; width: 100%; border-radius: 0 0 8px 8px ; border: 1px solid #41393D;">
            <div style="position: relative;">
              <div>
                推荐原因：值得推荐！
              </div>
              <div style="display: flex; position: absolute; right: 0; top: -6px;">
                <a-tooltip>
                  <a-avatar
                    class="small-avatar"
                    icon="user"
                    :src="`https://a.ppy.sh/5084172?.jpg`"
                    style="background-color: #grey; transition: .2s ease-in-out;cursor: pointer;user-select: none;"
                    @click="openLink(pool.creator)"
                  />
                  <div slot="title">
                    <a :href="`https://osu.ppy.sh/users/5084172`">访问主页</a>
                  </div>
                </a-tooltip>
                <div
                  class="recommer-color"
                  style="margin: 10px 0 0 -10px; font-size: 12px; text-shadow: 0 1px 3px rgba(0,0,0,.9); padding: 2px 12px 2px 16px; border-radius: 0 12px 12px 0;"
                >
                  推荐者
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div style="position: relative; border: 1px solid #5C4951; font-weight: lighter; background-color: #201C1C; padding: 35px 40px; margin-top: 30px; border-radius: 8px; box-shadow: 4px 4px 4px 0 rgba(0, 0, 0, 0.04), 0 6px 6px 0 rgba(0, 0, 0, 0.04);">
      <div style="font-size: 24px;  padding: 10px 30px; display: inline-block; border-left: 2px solid #66BB6A;">
        <span>图池创作者</span>
        <span style="margin: 0 8px; font-size: 14px;">/</span>
        <span style="font-size: 14px;">Creators</span>
      </div>

      <div
        style="padding: 30px; border-radius: 4px; display: flex; flex-wrap: wrap;"
      >
        <a-tooltip
          v-for="(uploader) in uploaders"
          :key="uploader"
          :title="osuPlayers[uploader] && osuPlayers[uploader].osuname || uploader"
        >
          <div class="star-uploader">
            <div>
              <img
                style="border-radius: 8px 8px 0 0; width: 140px; height: 140px;"
                :src="`http://a.ppy.sh/${uploader}?.jpg`"
              >
            </div>
            <div style="padding: 12px 10px; text-align: center; background-color: rgba(0,0,0,0.1);">
              <a :href="`https://osu.ppy.sh/users/${uploader}`">{{ osuPlayers[uploader] && osuPlayers[uploader].osuname || uploader }}</a>
            </div>
          </div>
        </a-tooltip>
      </div>
    </div>

    <div style="border-left: 6px solid #362F32 ;border-right: 6px solid #362F32 ;background: #272023; padding: 45px 20px; margin: 60px auto 30px auto; text-align: center; width: 100%; border-radius: 6px;">
      <div style="font-size: 32px; font-weight: lighter; color: #F2F2F2;">
        没有想要的图池？
      </div>
      <div style="margin-top: 10px; margin-bottom: 40px;font-weight: lighter; font-size: 16px; color: #DDD0D5;">
        <span>您可以选择创建自己的图池，让大家一起来玩~！</span>
      </div>
      <div>
        <span
          class="my-button-span my-hover1"
          style="background-color: #EA5197; box-shadow: 0 4px #86385b, 0 2px 2px #000;"
        >
          创建属于您自己的图池
        </span>
        <span
          class="my-button-span my-hover2"
          style="margin-left: 15px; background-color: rgb(16, 139, 221); box-shadow: rgb(11, 83, 131) 0px 4px, rgb(0, 0, 0) 0px 2px 2px;"
        >
          图池管理
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { MapPool } from '@/apis/elo-mappool-client'
import $backend from '@/apis/backend'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      initing: true,
      pools: [],
      showing: [],
      showSearch: false,
      inDraw: false,
      dataTemp: [],
      uploaders: [],
      osuPlayers: {}

    }
  },
  computed: {
    ...mapGetters(['loginStatus', 'osuid']),
    showMore () {
      return (this.showing.length < this.pools.length) ? '显示更多' : '已显示全部！'
    }

  },
  async mounted () {
    await this.getPools()
  },
  methods: {
    async getPools () {
      const result = await new MapPool().getPools()
      var item
      if (result) {
        for (let i = 0; i < result.length; i++) {
          item = result[i]
          this.uploaders.push(item.creator)
          this.getOsuName(item.creator)
        }
      }
      this.showing = result.slice(0, 8)
      this.pools = result
      this.initing = false
    },
    mappoolDetail (pool) {
      this.$router.push({ name: 'poolDetail', params: { pool, poolName: pool.name } })
    },
    colorGetter (status) {
      const colorData = {
        Pending: 'rgba(244,213,135,.43)',
        Overjoy: 'rgba(233, 132, 132,.43)',
        Ranked: 'rgba(50,226,123,.43)',
        Tourney: 'rgba(50,226,123,.43)'
      }
      return colorData[status] || colorData.Pending
    },
    draw () {
      if (this.inDraw !== true) {
        this.inDraw = true
        if (this.dataTemp.length > 0 && this.showSearch === true) {
          this.showing = this.dataTemp
          this.dataTemp = []
          this.$refs.searchText.value = ''
        }
        this.showSearch = !this.showSearch
        setTimeout(() => {
          this.inDraw = false
        }, 700)
      }
    },
    handleShowMore () {
      const showing = this.showing.length
      const all = this.pools.length
      if (showing < all) {
        this.showing = this.pools.slice(0, showing + 4)
      }
    },
    getNumbFormated (num) {
      const done = (num.toString().indexOf('.') !== -1) ? num.toLocaleString() : num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
      return done
    },
    openLink (osuid) {
      window.open(`https://osu.ppy.sh/users/${osuid}`, '_blank')
    },
    showMyUpload () {
      if (this.loginStatus && this.osuid) {
        if (this.showSearch !== true) this.draw()
        this.$refs.searchText.value = this.osuid
        this.handleSearch('', this.osuid)
      } else {
        this.$message.warning('登录otsu后才能看到您创建的图池哦~')
      }
    },
    getOsuName (osuid) {
      try {
        if (osuid) {
          const result = this.osuPlayers[osuid]
          if (!result) {
            this.osuPlayers[osuid] = $backend.getOsuData(osuid).then(
              res => {
                const result = res
                this.osuPlayers[osuid] = result
              }
            )
          }
        }
      } catch {
      }
    },
    handleSearch (e, searchKey) {
      if (!searchKey) {
        searchKey = this.$refs.searchText.value
      }
      if (searchKey && searchKey.length > 0) {
        this.initing = true
        if (this.dataTemp.length === 0) {
          this.dataTemp = this.showing
        }
        const results = []
        let pool
        for (let i = 0; i < this.pools.length; i++) {
          pool = this.pools[i]
          if (pool.name.toLowerCase().search(searchKey.toLowerCase()) !== -1) {
            results.push(pool)
          } else if (pool.creator.toString() === searchKey || pool.submitter.toString() === searchKey) {
            results.push(pool)
          }
        }
        if (results.length > 0) {
          this.showing = results
          this.$message.success(`为您找到${results.length}个与关键字"${searchKey}"相关的图池`)
        } else {
          this.showing = results
          this.$message.warning(`没有找到与关键字"${searchKey}"相关的结果哦~`)
        }
      } else {
        this.$message.warning('请输入搜索关键字哦~')
      }
      setTimeout(() => {
        this.initing = false
      }, 300)
    }
  }
}

</script>

<style scoped>
  .my-button-span {
    text-shadow: 0 0px 3px #000000;
    user-select: none;
    display: inline-block;
    padding: 8px 42px;
    border-radius: 4px;
    margin-left: 10px;
    background-image: url('~@/assets/button.svg');
    background-attachment:scroll;
    background-size: 150%;
    background-position-x: 0px;
    cursor: pointer;
    transition: .2s ease;
  }
  .my-hover1:hover {
    background-color: #F071AB !important;
    background-position-x: -20px !important;
  }
  .my-hover1:active {
    box-shadow: 0 1px #86385b, 0 2px 2px #000 !important;
    transform: translateY(2px);
  }
  .my-hover2:hover {
    background-color: #3DA3E7 !important;
    background-position-x: -20px !important;
  }
  .my-hover2:active {
    box-shadow: 0 1px #0B5383, 0 2px 2px #000 !important;
    transform: translateY(2px);
  }
  .block-content {
    background-color: #201C1C;
    width: 90%;
    min-width: 620px;
    padding: 36px 24px;
    border-radius: 14px;
    margin: 30px auto;
  }

  .big-title {
    border-left: 3px solid #362F32;
    background: #272023;
    padding: 15px 40px;
    font-size: 22px;
    font-weight: lighter;
    border-radius: 8px;
  }

  .pool-main {
    box-shadow: 4px 4px 4px 0 rgba(0, 0, 0, 0.04), 0 6px 6px 0 rgba(0, 0, 0, 0.04);
    background: #272023;
    margin-left: 20px;
    padding: 20px;
    height: 160px;
    border-radius: 8px;
    cursor: pointer;
    transition: .2s ease;
    border: 1px solid #362F32 ;
    font-weight: lighter;
    position: relative;
    width: 46%;
    min-width: 46%;
  }

  .pool-main:hover {
    box-shadow: 4px 4px 4px 0 rgba(0, 0, 0, 0.1), 0 6px 6px 0 rgba(0, 0, 0, 0.1);
    border: 1px solid #5D5156 !important;
  }

  .show-more {
    background-color: #31262B;
    border-radius: 4px;
    padding: 10px 30px;
    user-select: none;
    cursor: pointer;
    transition: .4s ease;
    width: 80%;
    margin: 0 auto;
    text-shadow: 0 1px 3px rgba(0,0,0,.9);
    box-shadow: 4px 4px 4px 0 rgba(0, 0, 0, 0.04), 0 6px 6px 0 rgba(0, 0, 0, 0.04);
  }

  .show-more:hover {
    background-color: #372B31;
    box-shadow: 4px 4px 4px 0 rgba(0, 0, 0, 0.1), 0 6px 6px 0 rgba(0, 0, 0, 0.1);
  }

  .show-more:active {
    background-color: #271F23;
  }

  .star-uploader {
    margin-left: 20px;
    border: 1px solid #41393D;
    border-radius: 8px;
    background-color: #272023;
    font-weight: lighter;
    box-shadow: 4px 4px 4px 0 rgba(0, 0, 0, 0.04), 0 6px 6px 0 rgba(0, 0, 0, 0.04);
    cursor: pointer;
    transition: .4s ease;
  }

  .star-uploader:hover {
    transform: translateY(-4px);
    border: 1px solid #5D5156 !important;
  }

  .recommer-color {
    background-color: rgba(243, 81, 230, 0.43);
  }

  .pink-color {
    background-color: rgba(185, 88, 120, 0.425);
  }

  .my-upload {
    margin-left: 10px;
    font-size: 12px;
    padding: 6px 12px;
    border-radius: 16px;
    font-weight: lighter;
    user-select: none;
    background-color: rgba(185, 88, 120, 0.425);
    transition: .4s ease;
    cursor: pointer;
  }

  .my-upload:hover {
    background-color: rgba(196, 116, 142, 0.425);
  }

  .my-upload:active {
    background-color: rgba(185, 88, 120, 0.24);
  }

  a {
    color: #FAFAFA;
  }
</style>
