<template>
  <div style="padding: 10px 100px; margin-top: 80px;">
    <div v-if="initFailed">
      加载失败了哦
    </div>
    <div v-else>
      <div
        style="padding: 30px 40px; border-radius: 8px; width: 90%; margin: 0 auto;"
      >
        <div
          v-if="pool"
          style="background-color: #272023; border-radius: 8px; border: 1px solid #5C4951; box-shadow: 4px 4px 4px 0 rgba(0, 0, 0, 0.04), 0 6px 6px 0 rgba(0, 0, 0, 0.04);"
        >
          <div
            v-once
            style="display: flex; align-items: center; background-color: #31262B; padding: 30px 50px; border-radius: 8px 8px 0 0;"
          >
            <div
              style="font-size: 14px; padding: 5px 16px; border-radius: 40px; background-color: rgba(0, 0, 0, 0.1);"
              :style="`border: 1px solid ${colorGetter(pool.status)}; color: ${colorGetter(pool.status)};`"
            >
              {{ pool.status }}
            </div>
            <div style="font-size: 28px; margin: 0 30px; color: #FCF8FA;">
              {{ poolName }}
            </div>
            <div

              style="font-size: 14px; background-color: rgba(0, 0, 0, 0.1); padding: 5px 15px; border-radius: 4px;"
              :style="`border: 1px solid ${eloColorGetter(pool.recommendElo)}; color: ${eloColorGetter(pool.recommendElo)};`"
            >
              <span>推荐</span>
              <span style="margin-left: 4px;">{{ getNumbFormated(pool.recommendElo) }} elo+</span>
            </div>
            <div style="font-weight: lighter; font-size: 12px; color: #F2EAEE; margin-left: 30px;">
              更新时间：2020年4月29日 00:00:00
            </div>
          </div>

          <div style="display: flex; align-items: center; font-weight: lighter; padding: 40px 60px;">
            <div
              v-if="allMapInitialed"
              style="padding: 10px 0;"
            >
              <div style="display: flex;">
                <div
                  style="padding: 5px 15px; border-radius: 40px; font-weight: lighter; margin: 5px 0; font-size: 14px; background-color: rgba(0, 0, 0, 0.1); display: inline-block; vertical-align: middle; text-align: center;"
                  :style="`border: 1px solid #e57373; color: #e57373`"
                >
                  <span style="font-weight: normal;">图池结构</span>
                </div>
                <div style="margin-left: 10px;" />
                <div
                  v-for="(modPool, modName) in (Object.keys(modsSort).length > 0 ? modsSort : {NM:[],HD:[],DT:[],HR:[],TB:[]})"
                  :key="modName"
                  style="margin-left: 10px; "
                >
                  <div
                    style="padding: 4px 14px; border-radius: 4px; margin-right: 15px; font-weight: lighter; margin: 7px 0; font-size: 13px; background-color: rgba(0, 0, 0, 0.1); display: inline-block; vertical-align: middle; text-align: center;"
                    :style="`border: 1px solid ${getModColor(modName)}; color: ${getModColor(modName)}`"
                  >
                    <span>
                      <span style="font-weight: bold;">{{ modName }}:</span>
                      <span style="margin-left: 5px;">{{ modPool.length }}</span>
                      <span style="font-size: 12px; margin-left: 5px;">({{ (modPool.length / maps.length * 100).toFixed() }}%)</span>
                    </span>
                  </div>
                </div>
              </div>

              <div style="display: flex; margin-top: 30px;">
                <div
                  style="padding: 5px 15px; border-radius: 40px; font-weight: lighter; margin: 5px 0; font-size: 14px; background-color: rgba(0, 0, 0, 0.1); display: inline-block; vertical-align: middle; text-align: center;"
                  :style="`border: 1px solid #CE93D8; color: #CE93D8`"
                >
                  <span>地图信息</span>
                </div>
                <div style="background-color: rgba(0, 0, 0, 0.1); padding: 10px; margin-left: 20px; border-radius: 8px;">
                  <span>地图数:</span>
                  <span style="margin-left: 6px; color: #F0F4C3;">{{ maps.length }}</span>
                </div>
                <div style="background-color: rgba(0, 0, 0, 0.1); padding: 10px; margin-left: 10px; border-radius: 8px;">
                  <span>平均星数:</span>
                  <span style="margin-left: 6px; color: #F0F4C3;">{{ mapsData.avgStars.toFixed(2) }}</span>
                  <span style="font-size: 12px; margin-left: 6px;">
                    ( <span style="color: #A5D6A7;">Aim: {{ mapsData.avgAim.toFixed(2) }}</span> /
                    <span style="color: #80CBC4;">Spd: {{ mapsData.avgSpd.toFixed(2) }}</span> )
                  </span>
                </div>
                <div style="margin-left: 10px; background-color: rgba(0, 0, 0, 0.1); padding: 10px; border-radius: 8px;">
                  <span>平均bpm:</span>
                  <span style="margin-left: 6px; color: #E1BEE7;">{{ mapsData.avgBpm.toFixed(2) }}</span>
                </div>
                <div style="margin-left: 10px; background-color: rgba(0, 0, 0, 0.1); padding: 10px; border-radius: 8px;">
                  <span>平均AR:</span>
                  <span style="margin-left: 6px; color: #ffcdd2;">{{ mapsData.avgAR.toFixed(2) }}</span>
                </div>
                <div style="margin-left: 10px; background-color: rgba(0, 0, 0, 0.1); padding: 10px; border-radius: 8px;">
                  <span>平均时长:</span>
                  <span style="margin-left: 6px; color: #BBDEFB;">{{ secondToMinute(mapsData.avgLength) }}</span>
                </div>
                <div style="margin-left: 10px; background-color: rgba(0, 0, 0, 0.1); padding: 10px; border-radius: 8px;">
                  <span>总时长:</span>
                  <span style="margin-left: 6px; color: #C8E6C9;">{{ secondToMinute(mapsData.totalLength) }}</span>
                </div>
              </div>

              <div style="display: flex; margin-top: 30px;">
                <div
                  style="padding: 5px 15px; border-radius: 40px; font-weight: lighter; margin: 5px 0; font-size: 14px; background-color: rgba(0, 0, 0, 0.1); display: inline-block; vertical-align: middle; text-align: center;"
                  :style="`border: 1px solid #81C784; color: #81C784`"
                >
                  <span>地图类型</span>
                </div>
                <div style="margin-left: 10px;" />
                <div
                  v-for="(mapCount, mapType) in (mapsData.mapCounts)"
                  :key="mapType"
                  style="margin-left: 10px; "
                >
                  <div
                    style="padding: 4px 14px; border-radius: 4px; margin-right: 15px; font-weight: lighter; margin: 7px 0; font-size: 13px; background-color: rgba(0, 0, 0, 0.1); display: inline-block; vertical-align: middle; text-align: center;"
                    :style="`border: 1px solid ${getMapColor(mapType)}; color: ${getMapColor(mapType)}`"
                  >
                    <span>
                      <span style="font-weight: bold;">{{ mapType }}:</span>
                      <span style="margin-left: 5px;">{{ mapCount }}</span>
                    </span>
                  </div>
                </div>
                <div style="padding: 4px;">
                  <a-tooltip title="*Ranked包括Approved在内，而Unranked包括了Pending、WIP和Graveyard！">
                    <a-icon
                      style="float: right; padding: 0 2px; margin: 10px 4px;"
                      type="question-circle"
                      class="act-button"
                    />
                  </a-tooltip>
                </div>
              </div>
            </div>
            <div
              v-else
              style="width: 500px; font-size: 12px;"
            >
              正在加载地图信息...
              <a-progress
                :stroke-width="6"
                stroke-color="#28AA5F"
                :percent="Math.round(mapsData.readyMaps / maps.length * 100)"
              />
            </div>
          </div>
        </div>

        <div
          v-if="pool"
          style="position: relative; border: 1px solid #5C4951; font-weight: lighter; background-color: #272023; padding: 35px 40px; margin-top: 30px; border-radius: 8px; box-shadow: 4px 4px 4px 0 rgba(0, 0, 0, 0.04), 0 6px 6px 0 rgba(0, 0, 0, 0.04);"
        >
          <div style="font-size: 24px;  padding: 10px 30px; display: inline-block; border-left: 2px solid #66BB6A;">
            <span>评分</span>
            <span style="margin: 0 8px; font-size: 14px;">/</span>
            <span style="font-size: 14px;">Rating</span>
          </div>
          <div style="margin-left: 20px; border-radius: 8px; padding: 30px; padding-bottom: 10px;">
            <div style="padding: 10px;">
              当前图池共有 {{ pool.ratingCount }} 人给出了评分，图池的总体评价为：
            </div>
            <div style="padding: 20px 40px; margin-left: 40px;">
              <div
                v-if="pool.ratingCount > 0"
                style="font-size: 28px; background-color: rgba(0, 0, 0, 0.1); display: inline-block; padding: 15px 40px; border-radius: 4px;"
              >
                {{ pool.rating }}分，“{{ ratingLevel[pool.rating - 1] }}”
              </div>
              <div
                v-else
                style="font-size: 28px; background-color: rgba(0, 0, 0, 0.1); display: inline-block; padding: 15px 40px; border-radius: 4px;"
              >
                暂时还没有人评分哦，快抢沙发~
              </div>
            </div>
            <div style="margin-top: 20px;">
              <div style="background-color: rgba(0, 0, 0, 0.1); padding: 15px 40px; display: flex; border-radius: 8px; align-items: center;">
                <div style="flex: 1;">
                  <a-rate
                    v-model="myRating"
                    :allow-clear="false"
                    style="font-size: 28px; flex: 1;"
                    :tooltips="ratingLevel"
                  />
                  <span style="font-size: 12px; font-weight: lighter; padding: 0 10px;">您为这张图池打{{ myRating }}星：{{ ratingLevel[myRating - 1] }}</span>
                </div>

                <div>
                  <span style="font-size: 12px; margin: 0 10px;">选图不易，但欢迎您进行客观、公正的评分，帮助选图者改进图池~</span>
                  <span
                    class="my-button-span my-hover1"
                    style="background-color: rgb(234, 81, 151); box-shadow: rgb(134, 56, 91) 0px 4px, rgb(0, 0, 0) 0px 2px 2px;"
                    @click="submitRating"
                  >
                    提交评分
                  </span>
                </div>
              </div>
            </div>
            <div style="position: absolute; top: 12%; right: 10%; border-radius: 8px; padding: 10px; display: flex; ">
              <div style="width: 45px; height: 45px; box-shadow: 4px 4px 4px 0 rgba(0, 0, 0, 0.04), 0 6px 6px 0 rgba(0, 0, 0, 0.04); border-radius: 50%;">
                <img
                  style="width: 45px; height: 45px; border-radius: 50%; border: 2px solid #FFCA28; box-shadow: 4px 4px 4px 0 rgba(0, 0, 0, 0.04), 0 6px 6px 0 rgba(0, 0, 0, 0.04);"
                  src="https://a.ppy.sh/5084172?.jpg"
                >
              </div>
              <div
                id="box"
                style="max-width: 220px;max-height: 80px;"
              >
                <div style="overflow: hidden;">
                  {{ '很棒的图池！'.length > 24 ? '很棒的图池！'.slice(0, 24) : '很棒的图池！' }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="pool"
          style="position: relative; border: 1px solid #5C4951; background-color: #272023; padding: 35px 40px; margin-top: 30px; border-radius: 8px; box-shadow: 4px 4px 4px 0 rgba(0, 0, 0, 0.04), 0 6px 6px 0 rgba(0, 0, 0, 0.04);"
        >
          <div style="margin: 20 auto;">
            <div
              style="font-size: 24px; font-weight: lighter; padding: 10px 30px; displa: inline-block; border-left: 2px solid #66BB6A;"
            >
              <span>简介</span>
              <span style="margin: 0 8px; font-size: 14px;">/</span>
              <span style="font-size: 14px;">Description</span>
            </div>
            <div style="margin-left: 20px; margin-top: 30px; border-radius: 8px; padding: 30px; white-space:normal; word-break:break-all; word-wrap:break-word;">
              {{ pool.description }}
            </div>
          </div>

          <div style="margin: 20px auto;">
            <div style="font-size: 24px; font-weight: lighter; padding: 10px 30px; display: inline-block; border-left: 2px solid #66BB6A;">
              <span>贡献者</span>
              <span style="margin: 0 8px; font-size: 14px;">/</span>
              <span style="font-size: 14px;">Contributor</span>
            </div>
            <div style="display: flex; margin-left: 20px; margin-top: 30px; border-radius: 8px; padding: 30px; padding-bottom: 0; white-space:normal; word-break:break-all; word-wrap:break-word;">
              <a-tooltip :title="pool.creator">
                <div class="star-uploader">
                  <div>
                    <img
                      style="border-radius: 8px 8px 0 0; height: 160px; border-bottom: 1px solid #41393D;"
                      :src="`http://a.ppy.sh/${pool.creator}?.jpg`"
                    >
                  </div>
                  <div style="background-color: rgba(0,0,0,0.1); padding: 14px 10px; text-align: center; border-bottom: 1px solid #41393D;">
                    {{ `Prophet` }}
                  </div>
                  <div style="background-color: rgba(0,0,0,0.1); padding: 8px 10px; text-align: center; font-weight: lighter; font-size: 12px; color: #A5D6A7;">
                    {{ `“图池创建者”` }}
                  </div>
                </div>
              </a-tooltip>
              <a-tooltip :title="pool.submitter">
                <div class="star-uploader">
                  <div>
                    <img
                      style="border-radius: 8px 8px 0 0; height: 160px;"
                      :src="`http://a.ppy.sh/${pool.submitter}?.jpg`"
                    >
                  </div>
                  <div style="background-color: rgba(0,0,0,0.1); padding: 14px 10px; text-align: center; border-bottom: 1px solid #41393D;">
                    {{ `Explosive` }}
                  </div>
                  <div style="background-color: rgba(0,0,0,0.1); padding: 8px 10px; text-align: center; font-weight: lighter; font-size: 12px; color: #F48FB1;">
                    {{ `“最后提交者”` }}
                  </div>
                </div>
              </a-tooltip>
            </div>
          </div>
        </div>

        <div
          v-if="pool"
          style="position: relative; border: 1px solid #5C4951; background-color: #272023; padding: 35px 40px; margin-top: 30px; border-radius: 8px; box-shadow: 4px 4px 4px 0 rgba(0, 0, 0, 0.04), 0 6px 6px 0 rgba(0, 0, 0, 0.04);"
        >
          <div style="margin: 0 auto;">
            <div
              style="font-size: 24px; font-weight: lighter; padding: 10px 30px; displa: inline-block; border-left: 2px solid #66BB6A;"
            >
              <span>发表评论</span>
              <span style="margin: 0 8px; font-size: 14px;">/</span>
              <span style="font-size: 14px;">Post a comment</span>
            </div>
            <div style="margin-left: 20px; margin-top: 10px; padding: 30px;">
              <div style=" display: flex; padding: 40px 60px; border-radius: 8px;">
                <a-avatar
                  :size="64"
                  icon="user"
                  style="background-color: #e57373;"
                />

                <div style="flex: 1; padding: 10px 20px;">
                  <textarea
                    v-model="inputComment"
                    class="input-textaera"
                    placeholder="发表一条友善的评论吧！"
                  />
                </div>
              </div>
              <div style="margin-top: 10px;">
                <div style="background-color: rgba(0, 0, 0, 0.1); padding: 15px 40px; display: flex; border-radius: 8px; align-items: center;">
                  <div style="flex: 1;">
                    <a-rate
                      v-model="myRating"
                      :allow-clear="false"
                      style="font-size: 28px;"
                      :tooltips="ratingLevel"
                    />
                    <span style="font-size: 12px; font-weight: lighter; padding: 0 10px;">您为这张图池打{{ myRating }}星：{{ ratingLevel[myRating - 1] }}</span>
                  </div>

                  <div>
                    <span style="font-size: 12px; font-weight: lighter; padding: 0 10px;">已输入{{ inputComment.length }}字</span>
                    <span
                      class="my-button-span my-hover1"
                      style="background-color: rgb(234, 81, 151); box-shadow: rgb(134, 56, 91) 0px 4px, rgb(0, 0, 0) 0px 2px 2px;"
                      @click="submitRating"
                    >
                      打分并评论
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          v-if="pool"
          style="position: relative; border: 1px solid #5C4951; background-color: #272023; padding: 35px 40px; margin-top: 30px; border-radius: 8px; box-shadow: 4px 4px 4px 0 rgba(0, 0, 0, 0.04), 0 6px 6px 0 rgba(0, 0, 0, 0.04);"
        >
          <div style="margin-top: 10px;">
            <div
              style="font-size: 24px; font-weight: lighter; padding: 10px 30px; displa: inline-block; border-left: 2px solid #66BB6A;"
            >
              <span>评论列表</span>
              <span style="margin: 0 8px; font-size: 14px;">/</span>
              <span style="font-size: 14px;">Comments</span>
            </div>
            <div style="margin-left: 20px; padding: 10px 30px;">
              <div style="padding: 20px 40px; border-radius: 8px;">
                <div style="padding: 30px 10px; padding-bottom: 10px; border-bottom: 1px dashed #493A40; margin-bottom: 20px;">
                  <div style="display: flex;">
                    <div style="width: 45px; height: 45px; box-shadow: 4px 4px 4px 0 rgba(0, 0, 0, 0.04), 0 6px 6px 0 rgba(0, 0, 0, 0.04); border-radius: 50%;">
                      <img
                        style="width: 45px; height: 45px; border-radius: 50%; border: 2px solid #FFCA28; box-shadow: 4px 4px 4px 0 rgba(0, 0, 0, 0.04), 0 6px 6px 0 rgba(0, 0, 0, 0.04);"
                        src="https://a.ppy.sh/5084172?.jpg"
                      >
                    </div>
                    <div
                      id="box"
                      style="width: 90%;"
                    >
                      <div style="word-wrap:break-word;">
                        非常好非常好！非常好非常好！非常好非常好！非常好非常好！非常好非常好！非常好非常好！非常好非常好！非常好非常好！非常好非常好！非常好非常好！非常好非常好！非常好非常好！非常好非常好！非常好非常好！非常好非常好！非常好非常好！非常好非常好！
                      </div>
                    </div>
                  </div>
                  <div style="margin-top: 50px; padding: 10px 20px; font-weight: lighter; font-size: 12px; display: flex; align-items: center;">
                    <div style="flex: 1;">
                      <a-rate
                        :default-value="5"
                        style="font-size: 14px;"
                        disabled
                      />
                      <span style="margin-left: 10px;">图池评分：{{ myRating }}星，{{ ratingLevel[myRating -1] }}</span>
                    </div>
                    <div style="">
                      评论于2020年4月29日 04:58:55
                    </div>
                    <div style="padding: 0 12px;">
                      /
                    </div>
                    <div class="line-button reply-button">
                      回复此评论
                    </div>
                    <div style="padding: 0 5px;" />
                    <div class="line-button delete-button">
                      删除此评论
                    </div>
                  </div>
                  <div style="margin-left: 20px; margin-top: 30px; padding: 20px 30px; border-top: 1px dashed #493A40; ">
                    <div style="display: flex; padding: 10px 60px; border-radius: 8px; align-items: center; margin-top: 10px;">
                      <a-avatar
                        :size="50"
                        icon="user"
                        style="background-color: #9575CD;"
                      />

                      <div style="flex: 1; padding: 20px;">
                        <textarea
                          v-model="inputComment"
                          class="input-textaera"
                          placeholder="回复@PurePeace："
                        />
                      </div>
                      <div>
                        <span
                          class="my-button-span my-hover1"
                          style="background-color: rgb(234, 81, 151); box-shadow: rgb(134, 56, 91) 0px 4px, rgb(0, 0, 0) 0px 2px 2px;"
                          @click="submitRating"
                        >
                          回复
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style="margin-top: 30px;">
        <div
          v-for="(modPool, modName) in modsSort"
          :key="modName"
          style="padding: 20px; margin-bottom: 20px;"
          :style="`background-color: ${getModColor(modName)};`"
        >
          <div>{{ modName }}</div>
          <div
            v-for="(beatmap, modPoolIdx) in modPool"
            :key="modPoolIdx"
            style="background-color: orange; padding: 20px; margin-bottom: 20px;"
          >
            {{ beatmap }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { MapPool } from '@/apis/elo-mappool-client'

export default {
  data () {
    return {
      initing: false,
      mapPool: new MapPool({ autoComplete: true }),
      pool: undefined,
      poolName: undefined,
      maps: [],
      modsSort: {},
      initFailed: false,
      allMapInitialed: false,
      inputComment: '',
      myRating: 5,
      mapsData: {
        avgStars: 0,
        avgBpm: 0,
        avgLength: 0,
        avgSpd: 0,
        avgAim: 0,
        avgAR: 0,
        mapCounts: {
          Ranked: 0,
          Loved: 0,
          Qualified: 0,
          Unranked: 0
        },
        totalLength: 0,
        readyMaps: 0
      },
      ratingLevel: ['难以言喻...', '褒贬不一。', '多半好评~', '特别好评！', '好评如潮！！']
    }
  },
  watch: {
    maps: {
      deep: true,
      handler: function (mapsChanged, beforeChanged) {
        var item
        var data = {
          avgStars: 0,
          avgBpm: 0,
          avgLength: 0,
          avgSpd: 0,
          avgAim: 0,
          avgAR: 0,
          mapCounts: {
            Ranked: 0,
            Loved: 0,
            Qualified: 0,
            Unranked: 0
          },
          totalLength: 0,
          readyMaps: 0
        }
        for (let i = 0; i < mapsChanged.length; i++) {
          item = mapsChanged[i]
          if (item.banchoResultReady === true) {
            data.readyMaps += 1
            data.avgStars += item.difficulty.rating
            data.avgBpm += item.bpm
            data.avgSpd += item.difficulty.speed
            data.avgAim += item.difficulty.aim
            data.avgAR += item.difficulty.approach
            if (item.approvalStatus === 'Ranked') data.mapCounts.Ranked += 1
            else if (item.approvalStatus === 'Qualified') data.mapCounts.Qualified += 1
            else if (item.approvalStatus === 'Approved') data.mapCounts.Ranked += 1
            else data.mapCounts.Unranked += 1
            data.totalLength += item.length.total
          }
        }
        data.avgStars = data.avgStars / data.readyMaps
        data.avgBpm = data.avgBpm / data.readyMaps
        data.avgLength = data.totalLength / data.readyMaps
        data.avgSpd = data.avgSpd / data.readyMaps
        data.avgAim = data.avgAim / data.readyMaps
        data.avgAR = data.avgAR / data.readyMaps
        this.mapsData = data
        this.allMapInitialed = (data.readyMaps === this.maps.length)
      }
    }
  },
  mounted () {
    const params = this.$route.params
    if (params) {
      this.initPage(params)
    } else {
      this.$message.warning('打开页面时未传入地图信息哦，无法进行查找~')
      this.initFailed = true
    }
  },
  methods: {
    secondToMinute (s) {
      var h
      h = Math.floor(s / 60).toFixed()
      s = (s % 60).toFixed()
      h = (h.length === 1) ? '0' + h : h
      s = (s.length === 1) ? '0' + s : s
      return h + ':' + s
    },
    getMapColor (mapType) {
      const colors = {
        'Ranked': '#64B5F6',
        'Loved': '#e57373',
        'Qualified': '#80CBC4',
        'Unranked': '#FFCC80'
      }
      return colors[mapType] || colors['Unranked']
    },
    eloColorGetter (elo) {
      const colors = [
        [200, '#FFEE58'],
        [400, '#D4E157'],
        [600, '#9CCC65'],
        [800, '#66BB6A'],
        [1000, '#26A69A'],
        [1200, '#26C6DA'],
        [1400, '#42A5F5'],
        [1600, '#7986CB'],
        [1800, '#9575CD'],
        [2000, '#ef5350']
      ]
      var targetColor
      for (let i = 0; i < colors.length; i++) {
        let item = colors[i]
        if (elo >= item[0]) {
          targetColor = item[1]
        }
      }
      return targetColor
    },
    submitRating () {
      this.$message.success(`成功提交了对图池"${this.poolName}"的评分！`)
    },
    colorGetter (status) {
      const colors = {
        'Pending': '#FFD54F',
        'Overjoy': '#ef5350',
        'Ranked': '#28AA5F',
        'Tourney': '#28AA5F'
      }
      return colors[status] || colors['Pending']
    },
    getModColor (modName) {
      const colors = {
        'NM': '#90A4AE',
        'HD': '#EEB62A',
        'HR': '#ef5350',
        'FM': '#42A5F5',
        'DT': '#9575CD',
        'TB': '#4CAF50',
        'UN': '#9E9E9E'
      }
      return colors[modName] || colors['UN']
    },
    getNumbFormated (num) {
      let done = (num.toString().indexOf('.') !== -1) ? num.toLocaleString() : num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
      return done
    },
    async initPage (params) {
      this.initing = true
      this.poolName = params.poolName || params.pool.name
      this.pool = await this.mapPool.getPool({ name: this.poolName })
      if (this.pool) {
        console.log(this.pool)
        this.poolName = this.pool.name
        await this.getMaps()
        this.initing = false
      } else {
        this.$message.warning('数据加载失败，请重试！')
        this.showMsg('warning', '请求出错了哦！')
        this.initFailed = true
      }
    },
    async getMaps () {
      var modsSort = {}
      var map
      var mod
      const maps = await this.pool.api.getMapsInPool(this.pool)
      if (!maps) throw new Error('未能获得地图信息哦，请稍后重试')
      for (let i = 0; i < maps.length; i++) {
        map = maps[i] || {}
        map.data = {}
        mod = map.mod || 'UN'
        if (!modsSort[mod]) modsSort[mod] = [map]
        else modsSort[mod].push(map)
      }
      this.maps = maps
      this.modsSort = modsSort
      console.log(maps)
      console.log(modsSort)
      return true
    },
    showMsg (icon, title, content) {
      if (icon === 'smile') {
        icon = <a-icon type="smile" style="color: #108ee9" />
      } else if (icon === 'success') {
        icon = <a-icon type="check-circle" style="color: #2ECC71" />
      } else if (icon === 'warning') {
        icon = <a-icon type="warning" style="color: #F5B041" />
      } else if (icon === 'error') {
        icon = <a-icon type="close-circle" style="color: red" />
      } else {
        icon = <a-icon type="info-circle" style="color: #108ee9" />
      }
      this.$notification.open({
        message: title,
        description: content,
        icon: icon,
        duration: 20,
        placement: 'bottomRight',
        style: {
          width: '500px',
          marginLeft: `${335 - 500}px`
        }
      })
    }
  }
}

</script>

<style scoped>
 #box{
     position: relative;
     top: 6px;
     left: 18px;
     background-color: rgba(0, 0, 0, 0.17);
     -moz-border-radius: 12px;
     -webkit-border-radius: 12px;
     border-radius: 12px;
     padding: 12px 17px;
     font-weight: lighter;
     box-shadow: 4px 4px 4px 0 rgba(0, 0, 0, 0.04), 0 6px 6px 0 rgba(0, 0, 0, 0.04);
 }
 #box:before{
     position: absolute;
     content: "";
     width: 0;
     height: 0;
     right: 100%;
     top: 15px;
     border-top: 6px solid transparent;
     border-right: 12px solid rgba(0, 0, 0, 0.17);
     border-bottom: 8px solid transparent;
 }
   .star-uploader {
    margin: 0 20px;
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

  .line-button {
    transition: .4s ease;
    cursor: pointer;
    user-select: none;
    border-radius: 4px;
    background-color: rgba(0,0,0,0.1);
    padding: 4px 10px;
  }

  .reply-button {
    border: 1px solid #81C784;
    color: #81C784;
  }

  .reply-button:hover {
    border: 1px solid #8CD68F;
    color: #8CD68F;

  }

  .reply-button:active {
    border: 1px solid #74B577;
    color: #74B577;
  }

  .delete-button {
    border: 1px solid #e57373;
    color: #e57373;
  }

  .delete-button:hover {
    border: 1px solid #F37979;
    color: #F37979;
  }

  .delete-button:active {
    border: 1px solid #D16969;
    color: #D16969;
  }

  .input-textaera {
    width: 100%;
    font-weight: lighter;
    border: 1px solid #5C4951;
    border-radius: 4px;
    background: transparent;
    padding: 12px; outline: none;
    transition: .4s ease;
  }

  .input-textaera:hover {
    border: 1px solid #735763;
    box-shadow: 0 0 10px rgba(115, 87, 99, 0.3)
  }

  .input-textaera:focus {
    border: 1px solid #735763;
    box-shadow: 0 0 10px rgba(115, 87, 99, 0.3)
  }
</style>
