<template>
  <div style="padding: 10px 100px;">
    <div style="background-color: #1E1E1E; width: 85%;padding: 24px 24px; border-radius: 14px;margin: 0 auto;">
      <a-divider style="font-size:28px; font-weight: bold; margin: 50px auto; color: #F2F2F2;">
        Ranking
      </a-divider>

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
          <a
            target="_blank"
            class="this-link"
            :href="`https://osu.ppy.sh/u/${record.user_id}`"
          >
            去主页
          </a>
          <a-divider type="vertical" />
          <a class="this-link">
            肛了
          </a>
          <a-divider type="vertical" />
          <a class="this-link">
            加好友
          </a>
        </template>
      </a-table>
    </div>
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
  width: '28%',
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
      pagination: {},
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
    handleTableChange (pagination) {
      const pager = { ...this.pagination }
      pager.current = pagination.current
      this.pagination = pager
      this.nowPage = pager.current
      this.fetch()
      // this.fetch({
      // results: pagination.pageSize,
      // page: pagination.current
      // })
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
          ary[i].ranking = i + 1 + (this.nowPage - 1) * 30
        }
        pagination.total = responseData.total_page * 30
        pagination.showSizeChanger = false
        pagination.pageSize = 30
        this.pagination = pagination
        this.data = ary
        this.loading = false
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
</style>
