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

            style="display: flex; align-items: center; background-color: #31262B; padding: 30px 50px; border-radius: 8px 8px 0 0;"
          >
            <div
              v-once
              style="font-size: 14px; padding: 5px 16px; border-radius: 40px; background-color: rgba(0, 0, 0, 0.1);"
              :style="`border: 1px solid ${colorGetter(pool.status)}; color: ${colorGetter(pool.status)};`"
            >
              {{ pool.status }}
            </div>
            <div style="font-size: 28px; margin: 0 30px; color: #FCF8FA;">
              {{ poolName }}
            </div>
            <div
              v-once
              style="font-size: 14px; background-color: rgba(0, 0, 0, 0.1); padding: 5px 15px; border-radius: 4px;"
              :style="`border: 1px solid ${eloColorGetter(pool.recommendElo)}; color: ${eloColorGetter(pool.recommendElo)};`"
            >
              <span style="font-size: 12px;">推荐</span>
              <span style="margin-left: 4px; font-size:">{{ getNumbFormated(pool.recommendElo) }} elo+</span>
            </div>
            <div

              style="margin-left: 10px; font-size: 14px; background-color: rgba(0, 0, 0, 0.1); padding: 5px 15px; border-radius: 4px;"
              :style="`border: 1px solid ${getStageColor(currentStrage)}; color: ${getStageColor(currentStrage)};`"
            >
              <span>{{ currentStrage }}</span>
            </div>
            <span style="font-weight: lighter; font-size: 12px; color: #F2EAEE; margin-left: 20px; ">
              2020年4月29日 00:00:00
            </span>
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
                  v-for="(modPool, modName) in (Object.keys(currentShowMapSort).length > 0 ? currentShowMapSort : {NM:[],HD:[],DT:[],HR:[],TB:[]})"
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
                  <span style="margin-left: 6px; color: #F0F4C3;">{{ mapsData[currentStrage].avgStars.toFixed(2) }}</span>
                  <span style="font-size: 12px; margin-left: 6px;">
                    ( <span style="color: #A5D6A7;">Aim: {{ mapsData[currentStrage].avgAim.toFixed(2) }}</span> /
                    <span style="color: #80CBC4;">Spd: {{ mapsData[currentStrage].avgSpd.toFixed(2) }}</span> )
                  </span>
                </div>
                <div style="margin-left: 10px; background-color: rgba(0, 0, 0, 0.1); padding: 10px; border-radius: 8px;">
                  <span>平均bpm:</span>
                  <span style="margin-left: 6px; color: #E1BEE7;">{{ mapsData[currentStrage].avgBpm.toFixed(2) }}</span>
                </div>
                <div style="margin-left: 10px; background-color: rgba(0, 0, 0, 0.1); padding: 10px; border-radius: 8px;">
                  <span>平均AR:</span>
                  <span style="margin-left: 6px; color: #ffcdd2;">{{ mapsData[currentStrage].avgAR.toFixed(2) }}</span>
                </div>
                <div style="margin-left: 10px; background-color: rgba(0, 0, 0, 0.1); padding: 10px; border-radius: 8px;">
                  <span>平均时长:</span>
                  <span style="margin-left: 6px; color: #BBDEFB;">{{ secondToMinute(mapsData[currentStrage].avgLength) }}</span>
                </div>
                <div style="margin-left: 10px; background-color: rgba(0, 0, 0, 0.1); padding: 10px; border-radius: 8px;">
                  <span>总时长:</span>
                  <span style="margin-left: 6px; color: #C8E6C9;">{{ secondToMinute(mapsData[currentStrage].totalLength) }}</span>
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
                  v-for="(mapCount, mapType) in (mapsData[currentStrage].mapCounts)"
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

              <div style="display: flex; margin-top: 30px;">
                <div
                  style="padding: 5px 15px; border-radius: 40px; font-weight: lighter; margin: 5px 0; font-size: 14px; background-color: rgba(0, 0, 0, 0.1); display: inline-block; vertical-align: middle; text-align: center;"
                  :style="`border: 1px solid #FFD54F; color: #FFD54F`"
                >
                  <span>阶段选择</span>
                </div>
                <div style="margin-left: 10px;" />
                <div
                  v-for="(stageName, stageIdx) in Object.keys(stageSort)"
                  :key="stageIdx"
                  style="margin-left: 10px; "
                >
                  <a-tooltip :title="`单击将图池切换到“${stageName}”阶段`">
                    <div
                      class="stage-button"
                      :style="`border: 1px solid ${getStageColor(stageName)}; color: ${getStageColor(stageName)};`"
                      @click="changeCurrentStage(stageName)"
                    >
                      <span>
                        <span style="font-weight: normal;">{{ stageName }}</span>
                        <span style="margin-left: 5px;">({{ stageSort[stageName].total }})</span>
                      </span>
                    </div>
                  </a-tooltip>
                </div>
                <div style="padding: 4px;">
                  <a-tooltip title="*括号内的数字代表被标记为此阶段的地图数量">
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
                :percent="Math.round(mapsData['总览'].readyMaps / maps.length * 100)"
              />
            </div>
          </div>
        </div>

        <div style="margin-top: 30px;">
          <div
            v-for="(modPool, modName) in currentShowMapSort"
            :key="modName"
            style="padding: 35px 40px; margin-bottom: 20px; border-radius: 8px; box-shadow: 4px 4px 4px 0 rgba(0, 0, 0, 0.04), 0 6px 6px 0 rgba(0, 0, 0, 0.04); background-color: #201C1C;"
            :style="`border: 1px solid ${getModColor(modName)}99;`"
          >
            <div
              style="font-size: 24px; font-weight: lighter; padding: 10px 30px;"
              :style="`border-left: 2px solid ${getModColor(modName)};`"
            >
              <span>{{ modName }}</span>
              <span style="margin: 0 8px; font-size: 14px;">/</span>
              <span style="font-size: 14px;">{{ getModFullName(modName) }}</span>
              <div style="float: right; font-size: 12px;">
                <span>{{ modPool.length }}张地图</span>
                <span style="margin: 0 8px; font-size: 12px;" />
                <span
                  class="open-all-button"
                  @click="openAllBeatmap(modName, modPool)"
                >展开全部</span>
              </div>
            </div>
            <div
              v-for="(beatmap, modPoolIdx) in modPool"
              :key="modPoolIdx"
            >
              <div
                :id="modName + beatmap.index"
                :ref="modName + beatmap.index"
                :style="`border: 2px solid ${getModColor(modName)}B2;`"
                class="beatmap-in-pool"
                style="width: 900px; height: 100px;"
                @click="beatmapItemOnClick(modName + beatmap.index)"
              >
                <div
                  v-if="beatmap.beatmapSetId"
                  :ref="modName + beatmap.index + 'cover'"
                  class="beatmap-cover"
                  :style="`background-image: url(https://assets.ppy.sh/beatmaps/${beatmap.beatmapSetId}/covers/cover.jpg?);`"
                />
                <div
                  style="top: 32px; left: 30px; padding: 4px 10px; border-radius: 40px; font-size: 13px; background-color: rgba(0, 0, 0, 0.2);"
                  :style="`border: 2px solid ${getModColor(modName)}; color: ${getModColor(modName)}`"
                  class="beatmap-in-pool-item"
                  @click.stop=""
                >
                  <span style="font-weight: bold;">{{ modName }}{{ beatmap.index }}</span>
                </div>

                <div
                  style="top: 24px; left: 80px; padding: 10px 25px; font-size: 20px;"
                  class="beatmap-in-pool-item"
                  @click.stop=""
                >
                  <a-tooltip
                    v-if="beatmap.banchoResultReady"
                    :title="`${beatmap.artist} / ${beatmap.title}`"
                  >
                    <a
                      :href="`https://osu.ppy.sh/beatmaps/${beatmap.id}`"
                      target="_blank"
                      class="turn-color-link"
                    >
                      <span style="font-size: 13px; font-weight: normal;">{{ beatmap.artist.slice(0,26) }}{{ beatmap.artist.length > 26 ? '...' : '' }}</span>
                      <span style="margin: 0 10px;">/</span>
                      <span>{{ beatmap.title.slice(0,30) }}{{ beatmap.title.length > 30 ? '...' : '' }}</span>
                    </a>
                  </a-tooltip>
                  <div v-else>
                    地图{{ beatmap.id }}加载中...
                  </div>
                </div>

                <div
                  style="top: 33px; right: 76px; font-size: 13px; background-color: rgba(0, 0, 0, 0.2); border-radius: 40px;"
                  class="beatmap-in-pool-item"
                  @click.stop=""
                >
                  <div
                    v-if="beatmap.banchoResultReady"
                    style="padding: 4px 10px; border-radius: 40px;"
                    :style="`border: 1px solid ${getStageColor(beatmap.stage)}; color: ${getStageColor(beatmap.stage)}`"
                  >
                    <span style="font-weight: bold;">{{ beatmap.stage }}</span>
                  </div>
                  <div v-else>
                    加载中...
                  </div>
                </div>

                <div
                  style="top: 35px; right: 30px; font-size: 13px; background-color: rgba(0, 0, 0, 0.2); border-radius: 40px; user-select: none; cursor: pointer;"
                  class="beatmap-in-pool-item"
                >
                  <div
                    style="padding: 4px 8px; border-radius: 40px;"
                  >
                    <a-icon
                      :ref="modName + beatmap.index + 'arrow'"
                      class="turn-color-link"
                      type="down"
                      style="font-size: 12px; transition: .6s ease;"
                    />
                  </div>
                </div>

                <div
                  style="top: 247px; right: 50%; font-size: 13px; background-color: rgba(0, 0, 0, 0.4); border-radius: 8px 8px 0 0; user-select: none; cursor: pointer;"
                  class="beatmap-in-pool-item"
                  @click.stop="beatmapShowMore(modName + beatmap.index)"
                >
                  <a-tooltip title="附加菜单">
                    <div
                      style="padding: 0 12px; border-radius: 8px 8px 0 0;"
                    >
                      <a-icon
                        :ref="modName + beatmap.index + 'arrow-more'"
                        class="turn-color-link"
                        type="down"
                        style="font-size: 13px; transition: .6s ease;"
                      />
                    </div>
                  </a-tooltip>
                </div>

                <div

                  class="beatmap-in-pool-item"
                  style="top: 93px; left: 0; width: 100%; padding: 5px;"
                >
                  <div
                    v-if="beatmap.banchoResultReady"
                    style="display: flex; margin: 0 auto; justify-content: center;"
                    @click.stop=""
                  >
                    <div style="background-color: rgba(0,0,0,0.3); padding: 6px 10px; margin-left: 10px; border-radius: 4px;">
                      <div style="font-size: 12px; font-weight: bold; color: #C8E6C9;">
                        CS
                      </div>
                      <div style="margin-top: 3px;">
                        {{ beatmap.difficulty.size }}
                      </div>
                    </div>
                    <div style="background-color: rgba(0,0,0,0.3); padding: 6px 10px; margin-left: 10px; border-radius: 4px;">
                      <div style="font-size: 12px; font-weight: bold; color: #F8BBD0;">
                        AR
                      </div>
                      <div style="margin-top: 3px;">
                        {{ beatmap.difficulty.approach }}
                      </div>
                    </div>
                    <div style="background-color: rgba(0,0,0,0.3); padding: 6px 10px; margin-left: 10px; border-radius: 4px;">
                      <div style="font-size: 12px; font-weight: bold; color: #FFECB3;">
                        OD
                      </div>
                      <div style="margin-top: 3px;">
                        {{ beatmap.difficulty.overall }}
                      </div>
                    </div>
                    <div style="background-color: rgba(0,0,0,0.3); padding: 6px 10px; margin-left: 10px; border-radius: 4px;">
                      <div style="font-size: 12px; font-weight: bold; color: #BBDEFB;">
                        HP
                      </div>
                      <div style="margin-top: 3px;">
                        {{ beatmap.difficulty.drain }}
                      </div>
                    </div>
                    <div style="background-color: rgba(0,0,0,0.3); padding: 6px 10px; margin-left: 10px; border-radius: 4px;">
                      <div style="font-size: 12px; font-weight: bold; color: #E1BEE7;">
                        BPM
                      </div>
                      <div style="margin-top: 3px;">
                        {{ beatmap.bpm.toFixed(0) }}
                      </div>
                    </div>
                    <div style="background-color: rgba(0,0,0,0.3); padding: 6px 10px; margin-left: 20px; border-radius: 4px;">
                      <div style="font-size: 12px; font-weight: bold;">
                        难度
                      </div>
                      <div style="margin-top: 3px;">
                        <span>{{ beatmap.difficulty.rating.toFixed(2) }} <a-icon type="star" /></span>
                        <span style="font-size: 12px; margin-left: 4px;">(
                          <span style="color: #A5D6A7;">Aim: {{ beatmap.difficulty.aim.toFixed(2) }}</span> /
                          <span style="color: #80CBC4;">Spd: {{ beatmap.difficulty.speed.toFixed(2) }}</span> )
                        </span>
                      </div>
                    </div>
                    <div style="background-color: rgba(0,0,0,0.3); padding: 6px 10px; margin-left: 10px; border-radius: 4px;">
                      <div style="font-size: 12px; font-weight: bold; color: #C5CAE9;">
                        长度
                      </div>
                      <div style="margin-top: 3px;">
                        {{ secondToMinute(beatmap.length.total) }} ( {{ secondToMinute(beatmap.length.drain) }} )
                      </div>
                    </div>
                    <div style="background-color: rgba(0,0,0,0.3); padding: 6px 10px; margin-left: 10px; border-radius: 4px;">
                      <div style="font-size: 12px; font-weight: bold;">
                        物件数
                      </div>
                      <div style="margin-top: 3px;">
                        {{ beatmap.objects.normal }}
                      </div>
                    </div>
                    <div style="background-color: rgba(0,0,0,0.3); padding: 6px 10px; margin-left: 10px; border-radius: 4px;">
                      <div style="font-size: 12px; font-weight: bold; color: #FFCCBC;">
                        最大连击
                      </div>
                      <div style="margin-top: 3px;">
                        {{ beatmap.maxCombo }}x
                      </div>
                    </div>
                  </div>
                  <div
                    v-else
                    style="display: flex; justify-content: center;"
                  >
                    地图{{ beatmap.id }}加载中...
                  </div>
                </div>

                <div
                  class="beatmap-in-pool-item"
                  style="top: 165px; left: 5%; width: 90%; padding: 5px;"
                >
                  <div
                    v-if="beatmap.banchoResultReady"
                    style="display: flex; justify-content: center;"
                    @click.stop=""
                  >
                    <div style="background-color: rgba(0,0,0,0.4); padding: 8px; margin-left: 10px; border-radius: 4px;">
                      <div style="font-size: 12px; font-weight: bold; color: #F8BBD0;">
                        难度名
                      </div>
                      <div style="margin-top: 3px;">
                        {{ beatmap.version }}
                      </div>
                    </div>

                    <div style="background-color: rgba(0,0,0,0.4); padding: 8px; margin-left: 10px; border-radius: 4px;">
                      <div style="font-size: 12px; font-weight: bold;">
                        作者
                      </div>

                      <div style="margin-top: 3px;">
                        {{ beatmap.creator }}
                      </div>
                    </div>

                    <div style="background-color: rgba(0,0,0,0.4); padding: 8px; margin-left: 10px; border-radius: 4px;">
                      <div style="font-size: 12px; font-weight: bold;">
                        Bid
                      </div>

                      <div style="margin-top: 3px;">
                        {{ beatmap.id }}
                      </div>
                    </div>

                    <div style="background-color: rgba(0,0,0,0.4); padding: 8px; margin-left: 10px; border-radius: 4px;">
                      <div
                        style="font-size: 12px; font-weight: bold;"

                        :style="`color: ${getMapColor(beatmap.approvalStatus)};`"
                      >
                        状态
                      </div>

                      <div
                        style="margin-top: 3px;"
                      >
                        {{ beatmap.approvalStatus }}
                      </div>
                    </div>
                  </div>
                  <div
                    v-else
                    style="display: flex; justify-content: center;"
                  >
                    加载中...
                  </div>
                </div>
              </div>
              <div
                v-if="beatmap.banchoResultReady"
                :ref="modName + beatmap.index + 'more'"
                :style="`border: 2px solid ${getModColor(modName)}B2;`"
                class="beatmap-in-pool"
                style="width: 680px; position: relative; height: 0px; opacity: 0; transition: .5s ease; margin-top: -20px;"
              >
                <div style="display: flex; position: absolute; top: 28px; left: 0; z-index: 5; justify-content: center; width: 89%">
                  <a-tooltip title="通过Sayobot镜像站下载地图">
                    <a
                      style="color: #BBDEFB;border-radius: 4px; background-color: rgba(0,0,0,0.4); padding: 6px 12px; font-size: 13px; margin-left: 20px;"
                      target="_blank"
                      :href="`https://osu.sayobot.cn/osu.php?s=${beatmap.beatmapSetId}`"
                    >Sayo镜像下载</a>
                  </a-tooltip>
                  <a-tooltip title="从osu官网下载这张地图">
                    <a
                      style="color: #FFF9C4; border-radius: 4px; background-color: rgba(0,0,0,0.4); padding: 6px 12px; font-size: 13px; margin-left: 20px;"
                      target="_blank"
                      :href="`https://osu.ppy.sh/beatmapsets/${beatmap.beatmapSetId}/download`"
                    >官网下载</a>
                  </a-tooltip>
                  <a-tooltip title="通过osu!Direct下载地图（会启动游戏，需要supporter）">
                    <a
                      style="border-radius: 4px; background-color: rgba(0,0,0,0.4); padding: 6px 12px; font-size: 13px; margin-left: 20px;"
                      :href="`osu://b/${beatmap.id}`"
                    >osu!Direct</a>
                  </a-tooltip>
                  <a-tooltip title="直接在网页上看auto游玩这张地图！">
                    <a
                      style="color: #E1BEE7; font-weight: normal; border-radius: 4px; background-color: rgba(0,0,0,0.4); padding: 6px 12px; font-size: 13px; margin-left: 20px;"
                      target="_blank"
                      :href="`http://osugame.online/preview.html?sid=${beatmap.beatmapSetId}&bid=${beatmap.id}`"
                    >在线预览</a>
                  </a-tooltip>
                </div>
                <div style="display: flex; position: absolute; top: 24px; right: 20px; z-index: 5;">
                  <a-tooltip>
                    <a-avatar
                      class="selector-avatar"
                      icon="user"
                      shape="square"
                      :src="`https://a.ppy.sh/${beatmap.selector}?.jpg`"
                      style="background-color: rgba(0,0,0,0.4); transition: .2s ease-in-out;cursor: pointer;user-select: none;"
                      @click="openLink(beatmap.selector)"
                    />
                    <div slot="title">
                      <a
                        :href="`https://osu.ppy.sh/users/${beatmap.selector}`"
                        target="_blank"
                      >{{ osuPlayers[beatmap.selector] && osuPlayers[beatmap.selector].osuname || beatmap.selector }}</a>
                    </div>
                  </a-tooltip>
                  <div

                    style="display: flex; align-items: center; background-color: rgba(0,0,0,0.4); margin: 10px 0 0 -10px; font-size: 12px; text-shadow: 0 1px 3px rgba(0,0,0,.9); padding: 2px 12px 2px 16px; border-radius: 0 12px 12px 0;"
                  >
                    <a
                      :href="`https://osu.ppy.sh/users/${beatmap.selector}`"
                      target="_blank"
                    >选图者</a>
                  </div>
                </div>
                <div
                  v-if="beatmap.beatmapSetId"
                  :ref="modName + beatmap.index + 'cover'"
                  class="beatmap-cover beatmap-cover-more"
                  :style="`background-image: url(https://assets.ppy.sh/beatmaps/${beatmap.beatmapSetId}/covers/cover.jpg?); position: absolute; top: 0; left: 0;`"
                />
              </div>
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
                <span style="color: #F48FB1;">{{ pool.rating }}星</span>，“{{ ratingLevel[parseInt(pool.rating.toFixed(0)) - 1] }}”
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
                  <span
                    v-if="myRating != 0"
                    style="font-size: 12px; font-weight: lighter; padding: 0 10px;"
                  >您为这张图池打{{ myRating }}星：{{ ratingLevel[myRating - 1] }}</span>
                  <span
                    v-else
                    style="font-size: 12px; font-weight: lighter; padding: 0 10px;"
                  >您还没有为这个图池选择星级哦~</span>
                </div>

                <div>
                  <span style="font-size: 12px; margin: 0 10px;">选图不易，请酌情评分哦~</span>
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
            <div
              v-if="comments.length > 0"
              style="position: absolute; top: 12%; right: 10%; border-radius: 8px; padding: 10px; display: flex; "
            >
              <div style="width: 45px; height: 45px; box-shadow: 4px 4px 4px 0 rgba(0, 0, 0, 0.04), 0 6px 6px 0 rgba(0, 0, 0, 0.04); border-radius: 50%;">
                <img
                  style="width: 45px; height: 45px; border-radius: 50%; border: 2px solid #FFCA28; box-shadow: 4px 4px 4px 0 rgba(0, 0, 0, 0.04), 0 6px 6px 0 rgba(0, 0, 0, 0.04);"
                  :src="`https://a.ppy.sh/${comments[0].submitter}?.jpg`"
                >
              </div>
              <div
                id="box"
                style="max-width: 220px;max-height: 80px;"
              >
                <div style="overflow: hidden;">
                  {{ comments[0].comment.length > 24 ? comments[0].comment.slice(0, 24) : comments[0].comment }}
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
                    {{ osuPlayers[pool.creator] && osuPlayers[pool.creator].osuname || pool.creator }}
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
                    {{ osuPlayers[pool.submitter] && osuPlayers[pool.submitter].osuname || pool.submitter }}
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
          <a-spin :spinning="commenting">
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
                      <span
                        v-if="myRating != 0"
                        style="font-size: 12px; font-weight: lighter; padding: 0 10px;"
                      >您为这张图池打{{ myRating }}星：{{ ratingLevel[myRating - 1] }}</span>

                      <span
                        v-else
                        style="font-size: 12px; font-weight: lighter; padding: 0 10px;"
                      >您还没有为这个图池选择星级哦~</span>
                    </div>

                    <div>
                      <span style="font-size: 12px; font-weight: lighter; padding: 0 10px;">已输入{{ inputComment.length }}字</span>
                      <span
                        class="my-button-span my-hover1"
                        style="background-color: rgb(234, 81, 151); box-shadow: rgb(134, 56, 91) 0px 4px, rgb(0, 0, 0) 0px 2px 2px;"
                        @click="submitComment(0)"
                      >
                        提交评论
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </a-spin>
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
            <div
              v-if="comments.length > 0"
              style="margin-left: 20px; padding: 10px 30px; padding-top: 40px;"
            >
              <a-spin :spinning="deleting">
                <div
                  v-for="(comment, commentIdx) in comments"
                  :key="commentIdx"
                  style="padding: 10px 40px; border-radius: 8px;"
                >
                  <div style="padding: 10px 10px; padding-bottom: 10px; border-bottom: 1px dashed #493A40; margin-bottom: 20px;">
                    <div style="display: flex;">
                      <a-tooltip :title="'查看主页'">
                        <div style="width: 45px; height: 45px; box-shadow: 4px 4px 4px 0 rgba(0, 0, 0, 0.04), 0 6px 6px 0 rgba(0, 0, 0, 0.04); border-radius: 50%;">
                          <img
                            style="width: 45px; height: 45px; border-radius: 50%; border: 2px solid #FFCA28; box-shadow: 4px 4px 4px 0 rgba(0, 0, 0, 0.04), 0 6px 6px 0 rgba(0, 0, 0, 0.04);"
                            :src="`https://a.ppy.sh/${comment.submitter}?.jpg`"
                          >
                        </div>
                      </a-tooltip>
                      <div
                        id="box"
                        style="max-width: 90%;"
                      >
                        <div style="word-wrap:break-word;">
                          {{ (comment.reply === 0 ? '：' : `回复@${osuPlayers[sucker(comment)] && osuPlayers[sucker(comment)].osuname || sucker(comment)}：`) + comment.comment }}
                        </div>
                      </div>
                    </div>
                    <div style="margin-top: 50px; padding: 10px 20px; font-weight: lighter; font-size: 12px; display: flex; align-items: center;">
                      <div style="flex: 1;">
                        <span>#{{ comment.id }}</span>
                        <span style="margin: 0 10px;">|</span>
                        <a-tooltip :title="'查看主页'">
                          <a :href="`https://osu.ppy.sh/users/${comment.submitter}`">{{ osuPlayers[comment.submitter] && osuPlayers[comment.submitter].osuname || comment.submitter }} / {{ comment.submitter }}</a>
                        </a-tooltip>
                        <a-rate
                          v-if="false"
                          :default-value="5"
                          style="font-size: 14px;"
                          disabled
                        />
                        <span
                          v-if="false"
                          style="margin-left: 10px;"
                        >图池评分：{{ 5 }}星，{{ ratingLevel[5 -1] }}</span>
                      </div>
                      <div style="">
                        评论于 {{ comment.timestamp }}
                      </div>
                      <div
                        style="padding: 0 12px;"
                      >
                        /
                      </div>
                      <div
                        class="line-button reply-button"
                        @click="replyThisComment(comment)"
                      >
                        回复此评论
                      </div>
                      <div
                        style="padding: 0 5px;"
                      />
                      <div
                        class="line-button delete-button"
                        @click="deleteThisComment(comment)"
                      >
                        删除此评论
                      </div>
                    </div>

                    <div
                      v-if="replyOpening === comment.id"
                      style="margin-left: 20px; margin-top: 30px; padding: 20px 30px; border-top: 1px dashed #493A40; "
                    >
                      <a-spin :spinning="commenting">
                        <div style="display: flex; padding: 10px 60px; border-radius: 8px; align-items: center; margin-top: 10px;">
                          <a-avatar
                            :size="50"
                            icon="user"
                            style="background-color: #9575CD;"
                          />

                          <div style="flex: 1; padding: 20px;">
                            <textarea
                              v-model="replyComment"
                              class="input-textaera"
                              :placeholder="`回复@${osuPlayers[comment.submitter] && osuPlayers[comment.submitter].osuname || comment.submitter}(#${comment.id})：`"
                            />
                          </div>
                          <div>
                            <span
                              class="my-button-span my-hover1"
                              style="background-color: rgb(234, 81, 151); box-shadow: rgb(134, 56, 91) 0px 4px, rgb(0, 0, 0) 0px 2px 2px;"
                              @click="submitComment(comment.id)"
                            >
                              回复
                            </span>
                          </div>
                        </div>
                      </a-spin>
                    </div>
                  </div>
                </div>
              </a-spin>
            </div>
            <div
              v-else
              style="font-size: 24px; text-align: center; padding: 40px;"
            >
              暂时没有评论，快抢沙发。
            </div>
          </div>
        </div>
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
      audio: new Audio(),
      initing: false,
      mapPool: new MapPool({ autoComplete: true }),
      pool: undefined,
      poolName: undefined,
      maps: [],
      stageSort: {},
      currentShowMapSort: {},
      osuPlayers: {},
      comments: [],
      currentStrage: '总览',
      initFailed: false,
      allMapInitialed: false,
      inputComment: '',
      replyComment: '',
      myRating: 5,
      commenting: false,
      deleting: false,
      replyOpening: -1,
      mapsData: {
        '总览': {
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
      },
      ratingLevel: ['难以言喻...', '褒贬不一。', '多半好评~', '特别好评！', '好评如潮！！']
    }
  },
  computed: {
    ...mapGetters(['loginStatus', 'osuid', 'token'])
  },
  watch: {
    currentStrage (val) {
      this.currentShowMapSort = this.stageSort[val].maps
      if (!this.mapsData[val]) this.mapsData[val] = this.mapDataCalculator(this.stageSort[val].mapList)
      this.$message.success(`已将图池“${this.poolName}”切换到“${val}”阶段显示`)
    },
    maps: {
      deep: true,
      handler: function (mapList) {
        const data = this.mapDataCalculator(mapList)
        this.mapsData['总览'] = data
        this.allMapInitialed = (data.readyMaps === this.maps.length)
      }
    },
    loginStatus (val) {
      this.refreshRating()
    }
  },
  mounted () {
    const params = this.$route.params
    if (params) {
      this.initPage(params)
      this.refreshComments()
    } else {
      this.$message.warning('打开页面时未传入地图信息哦，无法进行查找~')
      this.initFailed = true
    }
  },
  methods: {
    sucker (comment) {
      try {
        return this.comments.filter(item => item.id === comment.reply)[0].submitter
      } catch {

      }
    },
    getReply (replyId) {
      var item
      for (let i = 0; i < this.comments.length; i++) {
        item = this.comments[i]
        if (item.id === replyId) {
          return item
        }
      }
    },
    replyThisComment (comment) {
      if (this.loginStatus) {
        this.replyOpening = comment.id
      } else {
        this.$message.warning('回复此评论前请先登录~')
      }
    },
    deleteThisComment (comment) {
      if (this.loginStatus) {
        const that = this
        this.$confirm({
          title: `(#${comment.id}) 确定要删除这条评论吗？`,
          content: '请确认您的操作，评论删除后不可恢复哦~',
          okText: '确定删除',
          okType: 'danger',
          cancelText: '取消',
          onOk () {
            that.deleting = true
            $backend.handleDeleteMappoolComment(
              comment.id, { 'osuid': that.osuid, 'X-OtsuToken': that.token }
            ).then(
              res => {
                that.refreshComments()
                that.deleting = false
                that.$message.success(`成功删除了图池"${that.poolName}"中的评论(#${comment.id})！`)
              }
            ).catch(
              error => {
                console.log(error)
                that.deleting = false
                that.$message.error(`删除失败了哦，您无法删除此条评论~（如权限不足）`)
              }
            )
          },
          onCancel () {

          }
        })
      } else {
        this.$message.warning('要删除评论得先登录才行哦~')
      }
    },
    openAllBeatmap (modName, modPool) {
      var beatmap
      for (let i = 0; i < modPool.length; i++) {
        beatmap = modPool[i]
        this.beatmapItemOnClick(modName + beatmap.index, true)
      }
    },
    refreshComments () {
      $backend.handleGetMappoolComments(this.poolName).then(
        res => {
          this.comments = res
          for (let i in res) {
            this.getOsuName(res[i].submitter)
          }
        }
      ).catch(error => {
        console.log(error)
        this.$message.error(`咦，刷新评论失败了"${error}"`)
      })
    },
    refreshRating () {
      var headers = { 'osuid': 0, 'X-OtsuToken': 0 }
      if (this.loginStatus) {
        headers = { 'osuid': this.osuid, 'X-OtsuToken': this.token }
      }
      $backend.getMappoolRating(this.poolName, headers).then(
        res => {
          if (res) {
            this.myRating = res.my_rating
            this.pool.rating = res.avg
            this.pool.ratingCount = res.counts
          }
        }
      ).catch(
        error => {
          console.log(error)
          this.$message.error(`咦，刷新评分失败了"${error}"`)
        }
      )
    },
    submitComment (reply = 0) {
      var tip
      if (this.loginStatus) {
        if ((reply === 0 && this.inputComment.length >= 4) || (reply !== 0 && this.replyComment.length >= 4)) {
          this.commenting = true
          const content = (reply === 0 && this.inputComment) || (reply !== 0 && this.replyComment)
          $backend.handleSubmitMappoolComment(
            this.poolName, { comment: content, reply }, { 'osuid': this.osuid, 'X-OtsuToken': this.token }
          ).then(
            res => {
              if (reply !== 0) {
                this.replyOpening = -1
                this.replyComment = ''
              } else {
                this.inputComment = ''
              }
              this.refreshComments()
              this.commenting = false
              if (reply === 0) tip = `成功提交了对图池"${this.poolName}"的评论！`
              else tip = `成功提交了对评论(#${reply})的回复`
              this.$message.success(tip)
            }
          ).catch(
            error => {
              console.log(error)
              this.commenting = false
              this.$message.error(`咦，提交评论失败了呢"${error}"`)
            }
          )
        } else {
          this.$message.warning('评论最少需要4个字或以上哦，请不要提交无意义的评论~')
        }
      } else {
        this.$message.warning(`要提交评论请先登录哦~`)
      }
    },
    submitRating () {
      if (this.loginStatus) {
        if (this.myRating <= 5 && this.myRating > 0) {
          $backend.handleSubmitMappoolRating(
            this.poolName, { 'rating': this.myRating }, { 'osuid': this.osuid, 'X-OtsuToken': this.token }
          ).then(
            res => {
              this.refreshRating()
              this.$message.success(`成功！您对图池"${this.poolName}"打了${this.myRating}分！`)
            }
          ).catch(
            error => {
              console.log(error)
              this.$message.error(`咦，提交评分失败了呢"${error}"`)
            }
          )
        } else {
          this.$message.warning('评分必须是在1-5之间的合法分数哦，请重新选择星星~')
        }
      } else {
        this.$message.warning(`要提交评分请先登录哦~`)
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
    beatmapShowMore (refName) {
      let beatmapItemDom = this.$refs[refName][0]
      let beatmapItemArrowMoreDom = this.$refs[refName + 'arrow-more'][0]
      let beatmapItemMoreDom = this.$refs[refName + 'more'][0]

      if (!beatmapItemDom.showMoreFlag) {
        beatmapItemArrowMoreDom.style.transform = 'rotate(180deg)'
        beatmapItemMoreDom.style.height = '90px'
        beatmapItemMoreDom.style.width = '700px'
        beatmapItemMoreDom.style.opacity = '1'
        beatmapItemMoreDom.style.marginTop = '20px'
        beatmapItemDom.showMoreFlag = true
      } else {
        beatmapItemArrowMoreDom.style.transform = 'rotate(0deg)'
        beatmapItemMoreDom.style.height = '0px'
        beatmapItemMoreDom.style.width = '680px'
        beatmapItemMoreDom.style.opacity = '0'
        beatmapItemMoreDom.style.marginTop = '-20px'
        beatmapItemDom.showMoreFlag = false
      }
    },
    beatmapItemOnClick (refName, allTrue = false) {
      let beatmapItemDom = this.$refs[refName][0]
      let beatmapItemArrowDom = this.$refs[refName + 'arrow'][0]

      let beatmapItemCoverDom = this.$refs[refName + 'cover'][0]

      if (!beatmapItemDom.openFlag) {
        beatmapItemDom.style.height = '270px'
        beatmapItemArrowDom.style.transform = 'rotate(180deg)'

        beatmapItemCoverDom.className += ' beatmap-cover-opened'

        beatmapItemDom.openFlag = true
      } else if (!allTrue) {
        beatmapItemDom.style.height = '100px'
        beatmapItemArrowDom.style.transform = 'rotate(0deg)'

        beatmapItemCoverDom.className = 'beatmap-cover'

        beatmapItemDom.openFlag = false
        if (beatmapItemDom.showMoreFlag) this.beatmapShowMore(refName)
      }
    },
    openLink (osuid) {
      window.open(`https://osu.ppy.sh/users/${osuid}`, '_blank')
    },
    mapDataCalculator (mapList) {
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

      for (let i = 0; i < mapList.length; i++) {
        item = mapList[i]
        if (item.banchoResultReady === true) data.readyMaps += 1
      }

      if (data.readyMaps === this.maps.length) {
        for (let i = 0; i < mapList.length; i++) {
          item = mapList[i]
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
        data.avgStars = data.avgStars / data.readyMaps
        data.avgBpm = data.avgBpm / data.readyMaps
        data.avgLength = data.totalLength / data.readyMaps
        data.avgSpd = data.avgSpd / data.readyMaps
        data.avgAim = data.avgAim / data.readyMaps
        data.avgAR = data.avgAR / data.readyMaps
      }
      return data
    },
    changeCurrentStage (stageName) {
      this.currentStrage = stageName
    },
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

    colorGetter (status) {
      const colors = {
        'Pending': '#FFD54F',
        'Overjoy': '#ef5350',
        'Ranked': '#28AA5F',
        'Tourney': '#28AA5F'
      }
      return colors[status] || colors['Pending']
    },
    getModFullName (modName) {
      const fullName = {
        'NM': 'No-Mod',
        'HD': 'Hidden',
        'HR': 'HardRock',
        'FM': 'FreeMod',
        'DT': 'DoubleTime',
        'TB': 'TieBreaker',
        'UN': 'UnknownMod'
      }
      return fullName[modName] || fullName['UN']
    },
    getStageColor (stageName) {
      const colors = {
        '总览': '#C5CAE9',
        '小组赛': '#81C784',
        '季后赛': '#9575CD'
      }
      return colors[stageName] || colors['小组赛']
    },
    getModColor (modName) {
      const colors = {
        'NM': '#BBDEFB',
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
        this.poolName = this.pool.name
        this.getOsuName(this.pool.submitter)
        this.getOsuName(this.pool.creator)
        this.refreshRating()

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
      var stageSort = {}
      var map
      var mod
      var stage
      var stageMaps
      const maps = await this.pool.api.getMapsInPool(this.pool)
      if (!maps) throw new Error('未能获得地图信息哦，请稍后重试')
      for (let i = 0; i < maps.length; i++) {
        map = maps[i] || {}
        mod = map.mod || 'UN'
        stage = map.stage || '未知'

        if (map.selector) this.getOsuName(map.selector)

        if (!stageSort[stage]) stageSort[stage] = [map]
        else stageSort[stage].push(map)

        if (!modsSort[mod]) modsSort[mod] = [map]
        else modsSort[mod].push(map)
      }

      for (let i in stageSort) {
        stageMaps = stageSort[i] || {}
        var tempModsSort = {}
        for (let v = 0; v < stageMaps.length; v++) {
          map = stageMaps[v] || {}
          mod = map.mod || 'UN'
          if (!tempModsSort[mod]) tempModsSort[mod] = [map]
          else tempModsSort[mod].push(map)
        }
        stageSort[i] = { maps: tempModsSort, total: stageMaps.length, mapList: stageMaps }
      }
      this.maps = maps
      stageSort['总览'] = { maps: modsSort, total: maps.length, mapList: maps }
      this.stageSort = stageSort
      this.modsSort = modsSort
      this.currentShowMapSort = modsSort
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
  .beatmap-in-pool-item {
    position: absolute;
    text-shadow: 0 1px 3px rgba(0,0,0,.75);
    z-index: 1;
  }

  .beatmap-in-pool {
    position: relative;
    margin: 20px auto;
    border-radius: 8px;
    text-shadow: 0 1px 3px rgba(0,0,0,.75);
    font-weight: lighter;
    transition: .4s ease, height .6s ease;
    box-shadow: 4px 4px 8px 6px rgba(0, 0, 0, 0.1), 0 6px 6px 0 rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }

  .beatmap-cover {
    width: 100%;
    height: 100%;
    border-radius: 8px;
    filter: brightness(.5) blur(0px);
    background-position: 50% 50%;
    background-size: auto 270px;
    background-repeat: no-repeat;
    transition: .4s ease;
  }

  .beatmap-in-pool:hover {
    transform: translateY(-4px);
    box-shadow: 4px 4px 4px 6px rgba(0, 0, 0, 0.2), 0 6px 6px 0 rgba(0, 0, 0, 0.2);
  }

  .beatmap-in-pool:hover .beatmap-cover {
    filter: brightness(.6) blur(0px);
  }

  .beatmap-in-pool:hover .beatmap-cover-opened {
    filter: brightness(.4) blur(4px);
  }

  .beatmap-cover-opened {
    filter: brightness(.45) blur(0px);
  }

  .beatmap-in-pool:hover .beatmap-cover-more {
    filter: brightness(.4) blur(4px);
  }

  .beatmap-cover-more:hover {
    filter: brightness(.4) blur(4px);
  }

  .beatmap-cover-more {
    filter: brightness(.35) blur(2px);
  }

  .stage-button {
    padding: 4px 14px;
    border-radius: 4px;
    margin-right: 15px;
    font-weight: lighter;
    margin: 7px 0;
    font-size: 13px;
    background-color: rgba(0, 0, 0, 0.1);
    display: inline-block;
    vertical-align: middle;
    text-align: center;
    user-select: none;
    cursor: pointer;
    transition: .4s ease;
    filter: brightness(.9);
  }

  .stage-button:hover {
    filter: brightness(1);
  }

  .stage-button:active {
    filter: brightness(.7);
  }

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
    min-height: 100px;
  }

  .input-textaera:hover {
    border: 1px solid #735763;
    box-shadow: 0 0 10px rgba(115, 87, 99, 0.3)
  }

  .input-textaera:focus {
    border: 1px solid #735763;
    box-shadow: 0 0 10px rgba(115, 87, 99, 0.3)
  }

  .open-all-button {
    border-radius: 20px;
    padding: 6px 10px;
    border: 1px solid rgb(231, 216, 221);
    color: rgb(231, 216, 221);
    font-size: 12px;
    transition: .4s ease;
    user-select: none;
    cursor: pointer;
    background-color:rgba(0, 0, 0, 0.1);
  }

  .open-all-button:hover {
    border: 1px solid #F4D9E2;
    color: #F4D9E2;
  }

  .open-all-button:active {
    border: 1px solid #D5BBC4;
    color: #D5BBC4;
  }

  a {
    color: #FAFAFA;
  }

  .selector-avatar {
    height: 35px;
    width: 35px;
    box-shadow: 0 0 0 2px rgba(0,0,0,0.4);
  }

  .selector-avatar:hover{
    box-shadow: 0 0 0 3px rgba(106, 62, 196, 0.698);
  }
</style>
