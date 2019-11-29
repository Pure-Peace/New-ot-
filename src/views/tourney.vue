<template>
  <div style="padding: 10px 100px; margin-top: 80px;">
    <a-spin :spinning="initing">
      <div style="background-color: #1E1E1E; width: 85%; min-width: 620px; padding: 24px 24px; border-radius: 14px;margin: 0 auto;">
        <div>
          <a-divider style="font-size:28px; font-weight: bold; margin: 50px auto 0 auto; color: #F2F2F2;">
            <span
              class="act-button"
              @click="draw"
            >
              <span>{{ showSearch === true ? '返回' : 'Tourneys' }}</span>
              <a-icon
                style="margin-left: 2px; transition: opacity .3s ease, font-size .3s ease;"
                :style="!showSearch?'opacity:100;':'opacity:0; width: 0px; font-size: 12px;'"
                type="search"
              />
            </span>
          </a-divider>

          <div
            style="transition: .6s ease; over-flow: hidden;"
            :style="showSearch?'opacity:100;margin: 48px 0 60px 0;':'opacity:0;margin: 20px 0 20px 0; visibility:hidden;'"
          >
            <div style="text-align:center;vertical-align:middle;">
              <a-spin :spinning="searching">
                <span style="position: relative;">
                  <input
                    ref="searchText"
                    size="large"
                    class="my-input"
                    placeholder="输入比赛名或比赛id来搜索"
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
              </a-spin>
            </div>
          </div>
        </div>

        <a-spin :spinning="searching">
          <div style="padding: 0 30px; ">
            <div
              v-for="(item, idx) in tourneys.slice((pageIdx - 1) * countPerPage, pageIdx * countPerPage)"
              :key="idx"
              style="transition: 1s ease;"
            >
              <a-spin :spinning="item.loading">
                <div
                  class="tourney-item"
                  @click="viewTourney(item.match_id, (idx + 1) + (pageIdx - 1) * countPerPage)"
                >
                  <div>
                    <div style="font-size: 18px; font-weight: lighter; width: 300px;">
                      {{ item.tourney_name }}
                      <span style="font-size: 14px; font-weight: normal; color: #AFA6A6; margin-left: 4px;">/
                        <a
                          style="margin-left: 4px; transition: .4s ease; color: #AFA6A6"
                          class="link-spn"
                          :href="`https://osu.ppy.sh/community/matches/${item.match_id}`"
                        >
                          比赛链接
                        </a>
                      </span>
                    </div>
                    <div style="font-weight: lighter; color: #DADADA">
                      {{ item.time.slice(0, 10) }}
                    </div>
                  </div>
                  <div
                    style="position: absolute; right: 30px; top: 40%; transition: .4s ease; color: #ECECEC;"
                    class="link-spn"
                  >
                    {{ item.active===true?'收起':'详情' }}
                    <a-icon
                      :type="item.active===true?'up':'down'"
                      style="margin-left: 4px;"
                    />
                  </div>
                </div>

                <div
                  v-if="item.active===true"
                  style="border-radius: 6px; background-color: transparent; padding: 15px 30px; margin-bottom: 20px; transition: .4s ease;"
                >
                  <div
                    v-for="(match, matchId) in matchInfo[item.match_id].result"
                    :key="matchId"
                  >
                    <div style="padding: 20px; background-color: #2D2529; margin-bottom: 15px; border-radius: 12px;  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.1), 0 6px 6px 0 rgba(0, 0, 0, 0.1);">
                      <div
                        class="match-map-info"
                      >
                        <div style="position: absolute; bottom: 0; left: 0; z-index: 1; padding: 15px 25px; font-size: 23px; text-shadow: 0 1px 3px rgba(0,0,0,.75); font-weight: lighter;">
                          <a
                            :href="`https://osu.ppy.sh/beatmaps/${match.map_id}`"
                            class="turn-color-link"
                          >
                            <span style="font-size: 18px; font-weight: normal;">{{ match.map_artist }}</span>
                            <span> / {{ match.map_title }} </span>
                          </a>
                        </div>
                        <div style="position: absolute; bottom: 0; right: 0; z-index: 1; padding: 15px 25px; font-size: 22px; text-shadow: 0 1px 3px rgba(0,0,0,.75); font-weight: lighter;">
                          <a-icon
                            type="play-circle"
                            style="text-shadow: 0 1px 3px rgba(0,0,0,.75);"
                          /> Played with {{ getMainMods(match.result) }}
                        </div>
                        <div style="position: absolute; top: 0; right: 0; z-index: 1; font-size: 16px; padding: 15px 25px; text-shadow: 0 1px 3px rgba(0,0,0,.75); font-weight: lighter;">
                          {{ match.difficulty_rating }} <a-icon type="star" />
                        </div>
                        <div style="position: absolute; top: 0; left: 0; z-index: 1; padding: 15px 20px; font-size: 14px; text-shadow: 0 1px 3px rgba(0,0,0,.75); font-weight: lighter;">
                          开始于 {{ match.start_time }} / UTC+8
                        </div>
                        <div
                          :style="`background: url(${match.map_covers['cover']}) center;`"
                          class="match-map-image"
                        />
                      </div>

                      <div style="display: flex; justify-content:center; flex-wrap: wrap;">
                        <div
                          v-for="color in ['blue', 'red', 'none']"
                          :key="color"
                          style="float: left;"
                        >
                          <div
                            v-for="(player, pIdx) in match.result.filter(it => { return it.team_color === color }).sort((a, b) => { return b.score - a.score })"
                            :id="`team-${color}-${pIdx+1}`"
                            :key="pIdx"
                            class="match-player-info"
                            :style="player.team_color === 'blue' ? 'border-left: 4px solid #3498DB !important; border-radius: 6px 0 0 6px;' : player.team_color === 'red' ? 'border-right: 4px solid #BB1177 !important; border-radius: 0 6px 6px 0' : 'border-left: 4px solid #28B463 !important; border-radius: 6px; min-width: 1000px; padding: 20px 40px;'"
                          >
                            <!--蓝队&solo-->
                            <a-avatar
                              v-if="player.team_color === 'blue' || player.team_color === 'none'"
                              icon="user"
                              class="t-user-avatar"
                              :size="45"
                              :src="`https://a.ppy.sh/${player.user_id}?.jpg`"
                              :style="player.team_color === 'none'? 'box-shadow: 0 0 0 2px #28B463;' : 'box-shadow: 0 0 0 2px #63B7F0;'"
                            />
                            <div
                              v-if="player.team_color === 'blue' || player.team_color === 'none'"
                              style="min-width: 170px; overflow: hidden; margin-left: 15px;"
                            >
                              <a
                                class="user-link"
                                style="float: left;"
                                :style="player.team_color === 'none'? 'color: #28B463;' : 'color: #63B7F0;'"
                                :href="`https://osu.ppy.sh/users/${player.user_id}`"
                              >
                                {{ player.username }}
                              </a>
                            </div>

                            <a-tooltip
                              v-if="player.team_color === 'blue' || player.team_color === 'none'"
                              title="输出(Damage)"
                            >
                              <div
                                style="margin-right: 15px; min-width: 100px; text-align: right; font-weight: lighter; font-size: 16px;"
                              >
                                {{ getNumbFormated(player.score) }}
                              </div>
                            </a-tooltip>

                            <a-tooltip
                              v-if="player.team_color === 'blue' || player.team_color === 'none'"
                              title="准确率(Accuracy)"
                            >
                              <div
                                style="margin-right: 15px; min-width: 80px; text-align: right; font-weight: lighter;"
                              >
                                {{ Number(player.accuracy*100).toFixed(2) + '%' }}
                              </div>
                            </a-tooltip>

                            <a-tooltip
                              v-if="player.team_color === 'blue' || player.team_color === 'none'"
                              title="RP值"
                            >
                              <div
                                style="min-width: 80px; text-align: right; font-weight: bold;"
                                :style="player.rank_point>0?'color: #CB4335;':'color: #1ABC9C;'"
                              >
                                {{ `${player.rank_point>0?'+':''}${Number(player.rank_point * 9850).toFixed(0)}` }}
                              </div>
                            </a-tooltip>

                            <!--红队-->
                            <a-tooltip
                              v-if="player.team_color === 'red'"
                              title="RP值"
                            >
                              <div

                                style="min-width: 80px; text-align: left; font-weight: bold;"
                                :style="player.rank_point>0?'color: #CB4335;':'color: #1ABC9C;'"
                              >
                                {{ `${player.rank_point>0?'+':''}${Number(player.rank_point * 9850).toFixed(0)}` }}
                              </div>
                            </a-tooltip>

                            <a-tooltip
                              v-if="player.team_color === 'red'"
                              title="准确率(Accuracy)"
                            >
                              <div
                                style="margin-left: 15px; min-width: 80px; font-weight: lighter;"
                              >
                                {{ Number(player.accuracy*100).toFixed(2) + '%' }}
                              </div>
                            </a-tooltip>
                            <a-tooltip
                              v-if="player.team_color === 'red'"
                              title="输出(Damage)"
                            >
                              <div
                                style="margin-left: 15px; min-width: 100px; font-weight: lighter;  font-size: 16px;"
                              >
                                {{ getNumbFormated(player.score) }}
                              </div>
                            </a-tooltip>

                            <div
                              v-if="player.team_color === 'red'"
                              style="min-width: 170px; overflow: hidden;"
                              :style="player.team_color === 'blue' ? 'margin-left: 15px;' : 'margin-right: 15px;' "
                            >
                              <a
                                class="user-link"
                                style="color: #F1948A;"
                                :style="player.team_color === 'red' ? 'float: right;' : ''"
                                :href="`https://osu.ppy.sh/users/${player.user_id}`"
                              >
                                {{ player.username }}
                              </a>
                            </div>

                            <a-avatar
                              v-if="player.team_color === 'red'"
                              icon="user"
                              class="t-user-avatar"
                              :size="45"
                              :src="`https://a.ppy.sh/${player.user_id}?.jpg`"
                              style="box-shadow: 0 0 0 2px #BB1177;"
                            />
                          </div>
                        </div>
                        <div style="clear: both;" />
                      </div>
                    </div>
                  </div>
                </div>
              </a-spin>
            </div>
          </div>
        </a-spin>
        <!--div style="padding: 30px;">
        <span
          v-if="tourneys.length > countPerPage && pageIdx * countPerPage < tourneys.length"
          class="change-page-btn"
          @click="pageIdx += 1"
        >
          下一页
        </span>
        <span
          v-if="pageIdx > 1"
          class="change-page-btn"
          @click="pageIdx -= 1"
        >
          上一页
        </span>
      </div-->
        <div style="padding: 30px 50px; float: right; margin-bottom: 20px;">
          <a-pagination
            :total="tourneys.length"
            show-size-changer
            show-quick-jumper
            :page-size="countPerPage"
            :page-size-options="['10', '20', '30', '40']"
            @showSizeChange="(current, pageSize)=>{countPerPage = pageSize}"
            @change="(page, pageSize)=>{pageIdx = page}"
          />
        </div>
        <div style="clear: both;" />
      </div>
    </a-spin>
  </div>
</template>

<script>
import $backend from '@/backend'

export default {
  data () {
    return {
      pageIdx: 1,
      countPerPage: 10,
      tourneys: [],
      matchInfo: {},
      initing: true,
      showSearch: false,
      searching: false,
      inDraw: false,
      dataTemp: [],
      idxTemp: 1
    }
  },
  mounted () {
    this.fetchTourneys()
  },
  methods: {
    fetchTourneys () {
      $backend.fetchTourneyList(
      ).then(responseData => {
        let item = responseData.sort((a, b) => { return b.match_id - a.match_id })
        for (let idx = 0; idx < item.length; idx++) {
          item[idx].loading = false
          item[idx].active = false
        }
        this.tourneys = item
        this.initing = false
      }).catch(error => {
        console.log(error.message)
        this.fetchTourneys()
      })
    },
    viewTourney (matchId, idx) {
      idx -= 1
      if (this.tourneys[idx].active === true) {
        this.tourneys[idx].active = false
      } else if (!this.matchInfo[matchId]) {
        this.tourneys[idx].loading = true
        $backend.fetchMatchInfo(
          matchId
        ).then(responseData => {
          this.matchInfo[matchId] = responseData
          console.log(this.matchInfo)
          this.tourneys[idx].active = true
          this.tourneys[idx].loading = false
        }).catch(error => {
          console.log(error.message)
          this.viewTourney(matchId, idx)
        })
      } else {
        this.tourneys[idx].active = true
      }
    },
    getNumbFormated (num) {
      let done = (num.toString().indexOf('.') !== -1) ? num.toLocaleString() : num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
      return done
    },
    handleSearch () {
      if (this.$refs.searchText) {
        if (this.$refs.searchText.value.length > 0) {
          this.searching = true
          if (this.dataTemp.length === 0) {
            this.dataTemp = this.tourneys
            this.idxTemp = this.pageIdx
          }
          let results = []
          let tourney
          for (let i = 0; i < this.dataTemp.length; i++) {
            tourney = this.dataTemp[i]
            if (tourney['tourney_name'].toLowerCase().search(this.$refs.searchText.value.toLowerCase()) !== -1) {
              results.push(tourney)
            }
          }
          if (results.length > 0) {
            this.tourneys = results
            this.pageIdx = 1
            this.$message.success(`为您找到${results.length}场与关键字"${this.$refs.searchText.value}"相关的比赛`)
          } else {
            this.$message.warning(`没有找到与关键字"${this.$refs.searchText.value}"相关的结果哦~`)
          }
        } else {
          this.$message.warning('请输入搜索关键字哦~')
        }
        setTimeout(() => {
          this.searching = false
        }, 300)
      }
    },
    draw () {
      if (this.inDraw !== true) {
        this.inDraw = true
        if (this.dataTemp.length > 0 && this.showSearch === true) {
          this.tourneys = this.dataTemp
          this.pageIdx = this.idxTemp
          this.dataTemp = []
        }
        this.showSearch = !this.showSearch
        setTimeout(() => {
          this.inDraw = false
        }, 700)
      }
    },
    getMainMods (players) {
      let results = {}
      let real = ''
      let mods
      for (let i = 0; i < players.length; i++) {
        mods = players[i].mods.split(',')
        for (let b = 0; b < mods.length; b++) {
          if (mods[b] === '') {
            mods[b] = 'Nomod'
          }
          if (mods[b] in results) {
            results[mods[b]] += 1
          } else {
            results[mods[b]] = 1
          }
        }
      }
      for (let r in results) {
        if (results[r] === players.length) {
          real += r
        }
      }
      if (real === '') {
        real = 'Nomod'
      }
      return real
    }
  }
}

</script>

<style>
.tourney-item {
  padding: 20px 20px;
  background-color: #272023;
  margin-bottom: 10px;
  border: 1px solid #362F32 ;
  transition: .4s ease;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.1), 0 6px 6px 0 rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  cursor: pointer;
  user-select: none;
  position: relative;
}
.tourney-item:hover {
  border: 1px solid #5D5156 !important;
  border-left: 6px solid #5D5156 !important;
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.2), 0 8px 16px 0 rgba(0, 0, 0, 0.19) !important;
}
.match-player-info {
  border-top: 1px solid #302A2C;
  border-bottom: 1px solid #302A2C;
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.1);
  margin-bottom: 12px;
  padding: 20px;
  align-items: center;
  justify-content: space-between;
  display: flex;
  background-color: #272023;
  transition: .4s ease;
}
.match-player-info:hover {
  border-top: 1px solid #5D5156;
  border-bottom: 1px solid #5D5156;
  transform: translateY(-2px);
}

.match-map-image {
  border-radius: 12px;
  background-position-x: 50%;
  background-position-y: 50%;
  background-size: cover;
  background-repeat: no-repeat;
  height: 200px;
  transition: .6s ease;
  filter: brightness(.4) blur(0px);
}

.match-map-info {
    min-width: 900px;

  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.1), 0 6px 6px 0 rgba(0, 0, 0, 0.1);
  position: relative;
  border-radius: 12px;
  background: transparent;
  margin: 30px auto; width: 70%;
}

.match-map-info:hover .match-map-image {
  filter: brightness(.6) blur(0px) !important;
}

.change-page-btn {
  cursor: pointer;
  user-select: none;
  padding: 15px 20px;
  border-radius: 6px;
  border: 1px solid #362F32;
  transition: .4s ease;
  margin-right: 20px;
}
.change-page-btn:hover {
  border: 1px solid #5D5156 !important;

}
.link-spn:hover {
  color: #FAD7A0 !important;
}
.user-link {
  padding: 2px 5px;
  font-weight: 550;
  font-size: 15px;
  transition: .4s ease;
}
.user-link:hover {
  color: #F9E79F !important;
}

.t-user-avatar {
  background-color: grey;
  transition: .3s ease-in-out;
  cursor: pointer;
  user-select: none;
}

.t-user-avatar:hover {
  box-shadow: 0 0 0 3px #F9E79F !important;
}
.turn-color-link {
  color: #FAFAFA;
}
.turn-color-link:hover {
  color: #F2C2DA;
}
  .my-input {
    transition: all .6s ease;
    height: 50px;
    width: 46%;
    outline:none;
    background: rgba(34, 34, 34, 0.1);
    border: 2px solid rgba(204, 174, 112, 0.8);
    border-radius: 6px;
    padding: 10px 45px 10px 10px;
  }
  .my-input:hover {
    border-color: rgba(204, 174, 112, 0.9);
  }
  .my-input:focus {
    border-color: rgb(211, 179, 116);
  }
</style>
