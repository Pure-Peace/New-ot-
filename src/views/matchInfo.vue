<template>
  <div style="padding: 30px 100px;">
    <div
      v-if="loading"
    >
      <div
        style="text-align: center; padding: 120px 60px; transition: 2s ease; border-radius: 10px; user-select: none;"
        :style="status===1?'background-color: #2874A6;':status===-1?'background-color: red;':'background-color: #251F21;'"
      >
        <div style="padding-top: 40px;">
          <a-icon
            style="font-size: 96px;"
            :type="iconType"
            :spin="iconType==='sync'?true:false"
          />
        </div>
        <div
          style="font-size: 42px; padding-top: 40px; padding-bottom: 20px; font-weight: lighter;"
        >
          {{ bigTitle }}
        </div>
        <div style="padding-bottom: 40px; font-size: 18px; font-weight: lighter; color: #E8DBDB;">
          <a-icon
            :type="smallIconType"
            style="margin-right: 2px;"
          />
          {{ smallTitle }}
        </div>
      </div>
    </div>
    <div
      v-else
      style="margin: 0 170px; border-radius: 6px; background-color: transparent; padding: 15px 30px; margin-bottom: 20px; transition: .4s ease;"
    >
      <div style="margin: 20px auto 0 auto; text-align: center; height: 100%; padding: 50px 100px; border-radius: 8px 8px 0 0; background-color: #272023; box-shadow: 2px 4px 4px 0 rgba(0, 0, 0, 0.1), 0 6px 6px 0 rgba(0, 0, 0, 0.1);">
        <div style="font-size: 42px; font-weight: lighter;">
          <a
            style="color: #FAFAFA;"
            :href="`https://osu.ppy.sh/community/matches/${$route.params.matchId}`"
            target="_blank"
          >mplink!</a>
        </div>
        <div style="font-size: 16px; font-weight: lighter; padding: 25px 0; color: #E8DBDB;">
          <a
            style="color: #E8DBDB;"
            :href="`https://osu.ppy.sh/community/matches/${$route.params.matchId}`"
            target="_blank"
          >到osu!官网查看这场比赛的详细信息</a>
        </div>
      </div>
      <div style="margin-top: 30px; padding: 30px; background-color: #2D2529; margin-bottom: 15px; border-radius: 12px;  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.1), 0 6px 6px 0 rgba(0, 0, 0, 0.1);">
        <div style="font-size: 18px; font-weight: lighter; padding: 15px 30px;" />

        <div style="display: flex; justify-content:center; flex-wrap: wrap;">
          <div
            class="match-player-info"
            style="margin-bottom: 10px; font-size: 12px; font-weight: bold; color: #E7E0E0; text-align: right; border-left: 4px solid #AEA1A1 !important; border-radius: 6px; min-width: 840px; padding: 20px 40px; margin-bottom: 5px;"
          >
            <span style="width: 270px;" />
            <span style="min-width: 100px;">全局输出</span>
            <span style="min-width: 100px;">场均输出</span>
            <span style="min-width: 80px;">场均准确率</span>
            <span style="min-width: 80px;">elo变化</span>
          </div>
          <div
            v-for="(gplayer, gplayerIdx) in matchInfo.damage"
            :key="gplayerIdx"
            class="match-player-info"
            style="border-left: 4px solid #28B463 !important; border-radius: 6px; min-width: 840px; padding: 15px 40px; margin-bottom: 5px;"
          >
            <a-avatar
              icon="user"
              class="t-user-avatar"
              :size="42"
              :src="`https://a.ppy.sh/${gplayer.user_id}?.jpg`"
              style="box-shadow: 0 0 0 2px #28B463;"
            />
            <div
              style="min-width: 170px; overflow: hidden; margin-left: 15px;"
            >
              <a
                class="user-link"
                style="float: left;color: #28B463;"
                :href="`https://osu.ppy.sh/users/${gplayer.user_id}`"
                target="_blank"
              >
                {{ gplayer.username }}
              </a>
            </div>

            <a-tooltip
              title="总输出(Damage)"
            >
              <div
                style="margin-right: 15px; min-width: 100px; text-align: right; font-weight: lighter; font-size: 14px;"
              >
                {{ getNumbFormated(gplayer.total_damage) }}
              </div>
            </a-tooltip>

            <a-tooltip
              title="平均输出(AvgDamage)"
            >
              <div
                style="margin-right: 15px; min-width: 100px; text-align: right; font-weight: lighter; font-size: 14px;"
              >
                {{ getNumbFormated(gplayer.avg_damage) }}
              </div>
            </a-tooltip>

            <a-tooltip
              title="平均准确率(AvgAccuracy)"
            >
              <div
                style="margin-right: 15px; min-width: 80px; text-align: right; font-weight: lighter;"
              >
                {{ Number(gplayer.avg_acc*100).toFixed(2) + '%' }}
              </div>
            </a-tooltip>

            <a-tooltip
              title="elo增减"
            >
              <div
                style="min-width: 80px; text-align: right; font-weight: bold;"
                :style="matchInfo.elo_change[gplayer.user_id]>0?'color: #CB4335;':'color: #1ABC9C;'"
              >
                {{ matchInfo.elo_change[gplayer.user_id]>0?'+':'' }}{{ matchInfo.elo_change[gplayer.user_id] }}
              </div>
            </a-tooltip>
          </div>
        </div>
      </div>
      <div
        v-for="(match, matchId) in matchInfo.result"
        :key="matchId"
      >
        <div style="padding: 20px; background-color: #2D2529; margin-bottom: 15px; border-radius: 12px;  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.1), 0 6px 6px 0 rgba(0, 0, 0, 0.1);">
          <div
            class="match-map-info"
          >
            <div style="position: absolute; bottom: 0; left: 0; z-index: 1; padding: 15px 25px; font-size: 23px; text-shadow: 0 1px 3px rgba(0,0,0,.75); font-weight: lighter;">
              <a-tooltip :title="`${match.map_artist} / ${match.map_title}`">
                <a
                  :href="`https://osu.ppy.sh/beatmaps/${match.map_id}`"
                  target="_blank"
                  class="turn-color-link"
                >
                  <span style="font-size: 18px; font-weight: normal;">{{ match.map_artist.slice(0,26) }}{{ match.map_artist.length > 26 ? '...' : '' }}</span>
                  <span> / {{ match.map_title.slice(0,30) }}{{ match.map_title.length > 30 ? '...' : '' }} </span>
                </a>
              </a-tooltip>
            </div>
            <div style="position: absolute; bottom: 0; right: 0; z-index: 1; padding: 15px 25px; font-size: 20px; text-shadow: 0 1px 3px rgba(0,0,0,.75); font-weight: lighter;">
              <a-tooltip :title="playing === match.map_covers ? '停止播放' : '播放歌曲预览'">
                <a-icon
                  :type="playing === match.map_covers ? 'pause-circle' : 'play-circle'"
                  class="turn-color-link"
                  style="text-shadow: 0 1px 3px rgba(0,0,0,.75); transition: .4s ease; cursor: pointer; font-size: 22px;"
                  @click="audioPlay(match.map_covers)"
                />
              </a-tooltip>
              Played with {{ match.public_mod === '' ? 'Nomod' : match.public_mod }}
            </div>
            <div style="position: absolute; top: 0; right: 0; z-index: 1; font-size: 16px; padding: 15px 25px; text-shadow: 0 1px 3px rgba(0,0,0,.75); font-weight: lighter;">
              {{ match.difficulty_rating }} <a-icon type="star" />
            </div>
            <div style="position: absolute; top: 0; left: 0; z-index: 1; padding: 15px 20px; font-size: 14px; text-shadow: 0 1px 3px rgba(0,0,0,.75); font-weight: lighter;">
              开始于 {{ match.start_time }} / UTC+8
            </div>
            <div
              :style="`background: url(https://assets.ppy.sh/beatmaps/${match.map_covers}/covers/cover.jpg?) center;`"
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
                :style="player.team_color === 'blue' ? 'border-left: 4px solid #3498DB !important; border-radius: 6px 0 0 6px;' : player.team_color === 'red' ? 'border-right: 4px solid #BB1177 !important; border-radius: 0 6px 6px 0' : 'border-left: 4px solid #28B463 !important; border-radius: 6px; min-width: 840px; padding: 20px 40px;'"
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
                    target="_blank"
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
                  title="发挥评价"
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
                  title="发挥评价"
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
                    target="_blank"
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
  </div>
</template>

<script>
import $backend from '@/apis/backend'

export default {

  data () {
    return {
      audio: new Audio(),
      playing: null,
      loading: true,
      matchInfo: {},
      iconType: 'sync',
      smallIconType: 'heart',
      smallTitle: 'Please wait for a moment...',
      status: 0,
      bigTitle: '正在加载比赛数据...',
      timeout: undefined

    }
  },
  beforeMount () {
    if (this.$route.params && this.$route.params.matchId) {
      $backend.fetchMatchInfo(
        this.$route.params.matchId
      ).then(responseData => {
        if (responseData.damage.length > 0) {
          responseData.damage = responseData.damage.sort((a, b) => { return b.total_damage - a.total_damage })
          this.matchInfo = responseData
          this.loading = false
        } else {
          this.failed('没有找到这场比赛啦...', '(,,•́ . •̀,,) No matches found...')
          this.$message.error('没有找到这场比赛的历史信息，页面稍后将自动跳转...')
          setTimeout(() => {
            this.$router.push({ name: 'matches' })
          }, 2400)
        }
      }).catch(error => {
        console.log(error.message)
        this.failed('╥﹏╥ 请求失败啦...', error.message)
      })
    }
  },
  methods: {
    failed (bigTitle, smallTitle) {
      this.status = -1
      this.bigTitle = bigTitle
      this.smallTitle = smallTitle
      this.iconType = 'exclamation-circle'
      this.smallIconType = 'fire'
    },
    getNumbFormated (num) {
      let done = (num.toString().indexOf('.') !== -1) ? num.toLocaleString() : num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
      return done
    },
    audioPlay (mapCoverLink) {
      let mapId = mapCoverLink
      if (this.playing === mapId) {
        this.audio.pause()
        this.playing = null
      } else {
        this.playing = mapId
        this.audio.src = `https://b.ppy.sh/preview/${mapId}.mp3`
        this.audio.play()
        this.audio.addEventListener('ended', () => { this.playing = null })
      }
    }
  }
}

</script>

<style>

</style>
