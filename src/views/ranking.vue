<template>
  <div style="padding: 10px 100px;">
    <a-card>
      <div slot="title">
        <img
          src="https://gw.alipayobjects.com/mdn/mpaas_user/afts/img/A*KsfVQbuLRlYAAAAAAAAAAABjAQAAAQ/original"
          style="float: right;"
        >
        <a-breadcrumb>
          <a-breadcrumb-item>Home</a-breadcrumb-item>
          <a-breadcrumb-item>ELO Ranking</a-breadcrumb-item>
          <a-breadcrumb-item>Index</a-breadcrumb-item>
        </a-breadcrumb>

        <div style="font-size: 21px; font-weight:bold; margin-top: 13px;">
          About ELO System
        </div>
        <p style="font-size: 14px; color: grey; margin-top: 10px;">
          将比赛数据统计得出的结果，与赛图难度无关，更多介绍后续会添加。
        </p>
        <p style="font-size: 14px; color: grey;">
          如有问题欢迎反馈
        </p>
      </div>
      <a-tooltip placement="top">
        <template slot="title">
          <span>好像没开放...</span>
        </template>

        <a style="margin-right: 20px;">
          <img
            src="https://gw.alipayobjects.com/zos/rmsportal/MjEImQtenlyueSmVEfUD.svg"
          >
          详细说明
        </a>
      </a-tooltip>
      <a-divider type="vertical" />
      <a-tooltip placement="top">
        <template slot="title">
          <span>确实没开放...</span>
        </template>

        <a style="margin-left: 20px; margin-right: 20px;">
          <img
            src="https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbGuyLb.svg"
          >
          Deranker名单
        </a>
      </a-tooltip>
      <a-divider type="vertical" />
      <a-tooltip placement="top">
        <template slot="title">
          <span>当然没有...</span>
        </template>

        <a style="margin-left: 20px;">
          <img
            src="https://gw.alipayobjects.com/zos/rmsportal/NbuDUAuBlIApFuDvWiND.svg"
          >
          额外信息
        </a>
      </a-tooltip>
    </a-card>
    <div style="margin: 70px auto; width: 640px;">
      <a-input-search
        v-ant-ref="c => searchInput = c"
        placeholder="输入玩家ID以查找"
        enter-button
        size="large"
        @search="onSearch"
      />
    </div>
    <a-divider style="font-size:28px; font-weight: bold; margin: 70px auto; color: #1E1E1E;">
      Ranking
    </a-divider>
    <a-table
      :columns="columns"
      :row-key="record => record.username"
      :data-source="data"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
    >
      <div
        slot="filterDropdown"
        slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }"
        class="custom-filter-dropdown"
      >
        <a-input
          v-ant-ref="c => searchInput = c"
          :placeholder="`搜索 ${column.title}`"
          :value="selectedKeys[0]"
          style="width: 208px; margin-bottom: 8px; display: block;"
          @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
          @pressEnter="() => handleSearch(selectedKeys, confirm)"
        />
        <a-button
          type="primary"
          icon="search"
          size="medium"
          style="width: 90px; margin-right: 8px"
          @click="() => handleSearch(selectedKeys, confirm)"
        >
          搜索
        </a-button>
        <a-button
          size="medium"
          style="width: 90px"
          @click="() => handleReset(clearFilters)"
        >
          重置
        </a-button>
      </div>
      <a-icon
        slot="filterIcon"
        slot-scope="filtered"
        type="search"
        :style="{ color: filtered ? '#108ee9' : undefined }"
      />
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
        slot="ranking"
        slot-scope="ranking"
      >
        <span
          class="ranking"
          :style="colors[ranking]"
        >#{{ ranking }}</span>
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
          >{{ username }}</a>
        </a-popover>
      </template>
      <template
        slot="elo"
        slot-scope="elo"
      >
        <span
          class="ranking"
          style="color: #1890FF;"
        >{{ elo }}</span>
      </template>
      <template
        slot="last_tourney"
        slot-scope="last_tourney"
      >
        <a-tag
          color="orange"
          style="font-size:13px;"
        >
          {{ last_tourney }}
        </a-tag>
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
        <a
          target="_blank"
          :href="`https://osu.ppy.sh/u/${record.user_id}`"
        >去主页</a>
        <a-divider type="vertical" />
        <a>肛了</a>
        <a-divider type="vertical" />
        <a>加好友</a>
      </template>
    </a-table>
  </div>
</template>

<script>
import $backend from '../backend'

const columns = [{
  title: 'Rank',
  dataIndex: 'ranking',
  sorter: (a, b) => a.ranking - b.ranking,
  width: '15%',
  scopedSlots: { customRender: 'ranking' }
}, {
  title: 'Avatar',
  dataIndex: 'avatar',
  width: '10%',
  scopedSlots: { customRender: 'avatar' }
}, {
  title: 'Name',
  dataIndex: 'username',
  width: '20%',
  scopedSlots: {
    filterDropdown: 'filterDropdown',
    filterIcon: 'filterIcon',
    customRender: 'username' },
  onFilter: (value, record) => record.username.toLowerCase().includes(value.toLowerCase()),
  onFilterDropdownVisibleChange: (visible) => {
    if (visible) {
      setTimeout(() => {
        this.searchInput.focus()
      }, 0)
    }
  }
}, {
  title: 'Elo',
  dataIndex: 'elo',
  width: '20%',
  scopedSlots: { customRender: 'elo' },
  sorter: (a, b) => a.elo - b.elo
}, {
  title: 'LastTourney',
  dataIndex: 'last_tourney',
  scopedSlots: {
    filterDropdown: 'filterDropdown',
    filterIcon: 'filterIcon',
    customRender: 'last_tourney' },
  width: '20%',
  onFilter: (value, record) => record.last_tourney.toLowerCase().includes(value.toLowerCase()),
  onFilterDropdownVisibleChange: (visible) => {
    if (visible) {
      setTimeout(() => {
        this.searchInput.focus()
      }, 0)
    }
  }
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
      pagination: {},
      loading: false,
      userInfo: '',
      popovering: true,
      userInfos: {},
      colors: {
        1: 'color: #F26262',
        2: 'color: #F39C12',
        3: 'color: #3998E7',
        4: 'color: #39C680'
      },
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
    handleTableChange (pagination) {
      const pager = { ...this.pagination }
      pager.current = pagination.current
      this.pagination = pager
      // this.fetch({
      // results: pagination.pageSize,
      // page: pagination.current
      // })
    },
    fetch () {
      // real request
      this.loading = true
      $backend.fetchIndex(
        // block
      ).then(responseData => {
        const pagination = { ...this.pagination }
        pagination.total = responseData.index.length
        pagination.showSizeChanger = true
        this.loading = false
        this.data = responseData.index
        for (let i = 0; i < this.data.length; i++) {
          this.data[i].ranking = i + 1
        }
        this.pagination = pagination
      }).catch(error => {
        this.error = error.message
      })
    },
    onSearch () {
      const h = this.$createElement
      this.$info({
        title: '是这样的：',
        content: h('div', {}, [
          h('p', '现在不需要这个操作，'),
          h('p', '可以直接按表头上的小放大镜按钮就可以搜索！'),
          h('p', '可以直接按表头上的小放大镜按钮就可以搜索！')
        ]),
        onOk () {}
      })
    },
    handleSearch (selectedKeys, confirm) {
      confirm()
      this.searchText = selectedKeys[0]
    },

    handleReset (clearFilters) {
      clearFilters()
      this.searchText = ''
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
    font-weight: 700;
    font-size: 19px;
  }
  .small {
    font-size: 16px;
  }
  .blacklink {
    color: #3E3E3E;
  }
  a.blacklink:hover {
    color: #FF3D3D;
  }
</style>
