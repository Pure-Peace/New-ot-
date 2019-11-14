<template>
  <div style="padding: 10px 100px;">
    <div style="background-color: #1E1E1E; width: 85%; min-width: 620px; padding: 24px 24px; border-radius: 14px;margin: 0 auto;">
      <div>
        <a-divider style="font-size:28px; font-weight: bold; margin: 50px auto 0 auto; color: #F2F2F2;">
          <span
            class="act-button"
            @click="draw"
          >
            <span>Ranking</span>
            <a-icon
              style="margin-left: 2px; transition: opacity .3s ease, font-size .3s ease;"
              :style="!showSearch?'opacity:100;':'opacity:0; width: 0px; font-size: 12px;'"
              type="search"
            />
          </span>
        </a-divider>

        <div
          style="transition: .6s ease; over-flow: hidden;"
          :style="showSearch?'opacity:100;margin: 48px 0 60px 0;':'opacity:0;margin: 20px 0 20px 0;visibility:hidden;'"
        >
          <div style="text-align:center;vertical-align:middle;">
            <a-spin :spinning="searching">
              <span style="position: relative;">
                <input
                  ref="searchText"
                  size="large"
                  class="my-input"
                  placeholder="输入用户名或id来搜索"
                  :style="showSearch?'':'opacity:0; height: 0;padding:0;'"
                  @keypress.enter="handleSearch"
                >
                <a-icon
                  class="act-button"
                  style="position: absolute; top: -2px; right: 12px;  font-weight: bold;"
                  :style="showSearch?'opacity:100; font-size: 24px;':'opacity:0; font-size: 12px;'"
                  type="search"
                  @click="handleSearch"
                />
              </span>
            </a-spin>
          </div>
        </div>
      </div>

      <a-table
        :columns="columns"
        :row-key="record => record.username"
        :data-source="data"
        :pagination="pagination"
        :loading="loading"
        style="width: 100% !important;"
        :bordered="false"
        @change="handleTableChange"
      >
        <template
          slot="customRender"
          slot-scope="text"
        >
          <span v-if="searchText">
            <template v-for="(fragment, i) in text.toString().split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))">
              <mark
                v-if="fragment.toLowerCase() === searchText.toLowerCase()"
                :key="i"
                class="highlight"
              >{{ fragment }}</mark>
              <template v-else>{{ fragment }}</template>
            </template>
          </span>
          <template v-else>
            {{ text }}
          </template>
        </template>
        <template
          slot="rank"
          slot-scope="rank"
        >
          <span
            class="ranking"
            :style="colors[rank]"
          ><span style="font-size: 14px;"># </span>{{ rank }}</span>
        </template>
        <template
          slot="username"
          slot-scope="username, record"
        >
          <a-popover placement="topLeft">
            <template slot="title">
              <span style="font-size: 18px;">{{ record.username }}</span>
            </template>
            <template slot="content">
              <a-spin v-if="popovering">
                <a-icon
                  slot="indicator"
                  type="loading"
                  style="font-size: 24px;"
                  spin
                />
              </a-spin>
              <div
                v-else
                style="font-weight: bold;font-size: 14px;"
              >
                <p
                  v-for="(keyword, description) in userResults"
                  :key="description"
                >
                  {{ description }}：{{ userInfo[keyword] }}
                </p>
              </div>
            </template>
            <a
              class="blacklink ranking"
              @mouseover="popoverShow(record.user_id)"
            >
              {{ username }}
            </a>
          </a-popover>
        </template>
        <template
          slot="elo"
          slot-scope="elo"
        >
          <a-statistic
            class="ranking"
            value-style="color: #D4B98B;font-weight: 500; font-size: 19px;"
            :value="elo"
            :precision="2"
          />
        </template>

        <template
          slot="avatar"
          slot-scope="avatar, record"
        >
          <a-tooltip
            placement="left"
            title="查看头像"
          >
            <a
              target="_blank"
              :href="`${record.avatar}`"
            >
              <a-avatar
                :size="50"
                icon="user"
                :src="avatar"
                style="margin: 10px auto"
              />
            </a>
          </a-tooltip>
        </template>
        <template
          slot="operation"
          slot-scope="text, record"
        >
          <div style="display: flex;">
            <a
              target="_blank"
              class="this-link"
              :href="`https://osu.ppy.sh/u/${record.user_id}`"
            >
              去主页
            </a>
            <span class="my-devider">|</span>
            <a class="this-link">
              肛了
            </a>
            <span class="my-devider">|</span>
            <a class="this-link">
              加好友
            </a>
          </div>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
import $backend from '../backend'

const columns = [{
  title: 'Rank',
  dataIndex: 'rank',
  sorter: (a, b) => a.rank - b.rank,
  width: '15%',
  scopedSlots: { customRender: 'rank' }
}, {
  title: 'Avatar',
  dataIndex: 'avatar',
  width: '10%',
  scopedSlots: { customRender: 'avatar' }
}, {
  title: 'Name',
  dataIndex: 'username',
  width: '28%',
  scopedSlots: {
    customRender: 'username' }
}, {
  title: 'Elo',
  dataIndex: 'elo',
  width: '28%',
  scopedSlots: { customRender: 'elo' },
  sorter: (a, b) => a.elo - b.elo
},
{
  title: '操作',
  dataIndex: 'operation',
  scopedSlots: { customRender: 'operation' }
}]

export default {
  data () {
    return {
      data: [],
      dataTemp: [],
      pagination: {},
      pageTotal: 1,
      showSearch: false,
      searching: false,
      inDraw: false,
      loading: false,
      userInfo: '',
      popovering: true,
      userInfos: {},
      colors: {
        1: 'color: #FF6453',
        2: 'color: #58D68D',
        3: 'color: #2DABFF'
      },
      nowPage: 1,
      columns,
      userResults: {
        'PP': 'pp_raw',
        '全球排名': 'pp_rank',
        '游玩次数': 'playcount',
        '准确率': 'accuracy',
        '等级': 'level',
        '总分': 'total_score',
        '注册时间': 'join_date'
      }
    }
  },
  mounted () {
    this.fetch()
  },
  methods: {
    draw () {
      if (this.inDraw !== true) {
        this.inDraw = true
        if (this.dataTemp.length > 0 && this.showSearch === true) {
          this.data = this.dataTemp
          this.pagination.total = this.pageTotal
        }
        this.showSearch = !this.showSearch
        setTimeout(() => {
          this.inDraw = false
        }, 700)
      }
    },
    handleSearch () {
      if (this.$refs.searchText.value.length > 0) {
        this.searching = true
        this.loading = true
        $backend.searchRanking(
          this.$refs.searchText.value
        ).then(responseData => {
          this.dataTemp = this.data.splice(0, this.data.length)
          this.data = responseData
          this.searching = false
          this.loading = false
          this.pagination.total = responseData.length
        }).catch(error => {
          this.error = error.message
          console.log(this.error)
          this.searching = false
          this.loading = false
        })
      } else {
        this.nowPage = 1
        this.pagination.current = 1
        this.fetch()
      }
    },
    handleTableChange (pagination) {
      const pager = { ...this.pagination }
      pager.current = pagination.current
      this.pagination = pager
      this.nowPage = pager.current
      this.fetch()
    },
    pagechange () {

    },
    fetch () {
      // real request
      this.loading = true
      $backend.fetchRanking(
        this.nowPage
      ).then(responseData => {
        const pagination = { ...this.pagination }
        let ary = []
        for (let idx in responseData.data) {
          ary.push(responseData.data[idx])
        }
        for (let i = 0; i < ary.length; i++) {
          ary[i].rank = i + 1 + (this.nowPage - 1) * 30
        }
        this.pageTotal = responseData.total_page * 30
        pagination.total = this.pageTotal
        pagination.showSizeChanger = false
        pagination.pageSize = 30
        this.pagination = pagination
        this.data = ary
        this.loading = false
      }).catch(error => {
        this.error = error.message
      })
    },
    popoverShow (userId) {
      this.popovering = true
      this.userInfo = ''
      if (this.userInfos[userId] === undefined) {
        $backend.getOsuUserData(userId).then(responseData => {
          this.popovering = false
          this.userInfos[userId] = responseData
          this.userInfo = this.userInfos[userId]
        }).catch(error => {
          this.error = error.message
        })
      } else {
        this.popovering = false
        this.userInfo = this.userInfos[userId]
      }
    }
  }
}
</script>

<style scoped>
  .item {
    margin-bottom: 18px;
  }
  .head {
    margin-bottom: 40px;
  }
  .ranking {
    font-size: 19px;
    color: #FFFDF3;
  }
  .small {
    font-size: 16px;
  }
  .blacklink {
    color: #F2F2F2;
  }
  a.blacklink:hover {
    color: #FF3D3D;
  }
  .this-link {
  font-size: 14px;
  font-weight: lighter;
  color: #E0B8CA;
  }
  .this-link:hover {
    color: #FFECF5;
  }
  .act-button {
    cursor: pointer;
    transition: all 0.3s;
    user-select: none;
    padding: 0;
  }
  .act-button:hover {
    color: #E0B8CA;
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
  .my-devider {
     color: #CCAE70; font-weight:lighter; padding: 0 6px; user-select: none;
  }
</style>
