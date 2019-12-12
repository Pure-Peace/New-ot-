<template>
  <div>
    <div class="intro-container">
      <div class="intro-left">
        <div style="margin-bottom: 30px; padding-left: 5px;">
          <span style="padding: 5px 5px; border-radius: 20px; background-color: #313131;user-select: none;">
            <span
              v-for="(sts, idx) in statusSet"
              :key="idx"
              class="the-item"
              style="padding: 0 5px;font-size:12px; font-weight: lighter;"
            >
              <span
                style="font-size: 14px; font-weight: normal; padding: 0 5px;"
                :style="`color: ${colorSet[idx]};`"
              >
                {{ sts.value }}
              </span>
              {{ sts.name }}
            </span>
          </span>
        </div>
        <div style="font-size: 38px;">
          {{ loginStatus ? osuname : 'Hi' }}，{{ loginStatus ? '欢迎回来~!' : '欢迎来到o!t~' }}
        </div>
        <div style="padding: 5px 0;min-height: 120px;">
          我们是o!t，一个为您提供多种osu!比赛服务的小站。
          无论是报名参加比赛，还是查看比赛统计，甚至是举办您个人的osu!比赛，o!t都希望能够帮助您更愉快的完成这些事情。
          在这里，您可以发现自己所喜爱的比赛，然后通过它遇到您可爱的队友，最后将ta变为你的好朋（基）友。
          同时，我们还为您提供了ELO系统，让您在osu!比赛中也能感受到天梯上分的乐趣！
        </div>
        <div
          v-if="loginStatus"
          style="height: 80px; padding: 40px 0;"
        >
          <span
            class="my-button-span my-hover1"
            style="background-color: #EA5197; box-shadow: 0 4px #86385b, 0 2px 2px #000;"
          >
            我的比赛
          </span>
          <span
            class="my-button-span my-hover2"
            style="margin-left: 15px;background-color:#108BDD; box-shadow: 0 4px #0B5383, 0 2px 2px #000;"
          >
            寻找比赛
          </span>
        </div>
        <div
          v-else
          style="height: 80px; padding: 40px 0;"
        >
          <span
            class="my-button-span my-hover1"
            style="background-color: #EA5197; box-shadow: 0 4px #86385b, 0 2px 2px #000;"
            @click="openLoginLink()"
          >
            立即加入o!t
          </span>
          <span
            class="my-button-span my-hover2"
            style="margin-left: 15px;background-color:#108BDD; box-shadow: 0 4px #0B5383, 0 2px 2px #000;"
            @click="$router.push({ path: '/tourney' })"
          >
            比赛战报
          </span>
        </div>
      </div>
      <div
        class="intro-right"
      />
    </div>

    <div style="border-radius: 6px; background: #272023; padding: 15px 20px;display: flex;width: 75%; margin: 0 auto;justify-content: space-between;">
      <a-tooltip
        placement="top"
        title="ELO总分排行top 1"
      >
        <div
          style="background: #272023; font-size: 24px; font-weight: lighter; padding: 20px;"
          class="the-item"
        >
          <a-icon
            type="crown"
            style="font-size: 28px;"
          />
          <span style="margin-left: 5px;">
            {{ recentBoard.eloTop.name }}
          </span>
          <div style="font-size: 14px; text-align: right;">
            {{ getNumbFormated(recentBoard.eloTop.elo) }} ELO
          </div>
        </div>
      </a-tooltip>

      <a-tooltip
        placement="top"
        title="近期冠军队伍"
      >
        <div
          style="background: #272023; font-size: 24px; font-weight: lighter; padding: 20px; text-align: center;"
          class="the-item"
        >
          <a-icon
            type="trophy"
            style="font-size: 28px;"
          />
          <span style="margin-left: 5px; ">
            Team {{ recentBoard.champion.team }}: {{ recentBoard.champion.leaderName }}
          </span>
          <div style="font-size: 14px; text-align: right;">
            {{ recentBoard.champion.tournament }} Champion
          </div>
        </div>
      </a-tooltip>

      <a-tooltip
        placement="top"
        title="ELO上升实力排行top 1"
      >
        <div
          style="background: #272023; font-size: 24px; font-weight: lighter; padding: 20px;"
          class="the-item"
        >
          <a-icon
            type="up"
            style="font-size: 28px;"
          />
          <span style="margin-left: 5px;">
            {{ recentBoard.eloRiseTop.name }}
          </span>
          <div style="font-size: 14px; text-align: right;">
            {{ recentBoard.eloRiseTop.rise }} Pt
          </div>
        </div>
      </a-tooltip>
    </div>

    <div style="border-left: 6px solid #362F32 ;background: #272023; padding: 15px 20px; margin-top: 50px;">
      <div style="font-size: 24px; font-weight: lighter; margin-left: 140px; ">
        看板
        <div style="font-size: 14px; margin-left: 8px;">
          news
        </div>
      </div>
    </div>

    <div style="border-left: 6px solid #362F32 ;background-color: rgba(39, 32, 35, 0.8);box-shadow: 0 1px 1px #121212;border-radius: 6px;width: 75%;margin: 50px auto 0 auto;border-radius: 6px;height: 430px;">
      <div style="display: flex;height:100%;">
        <div style="background-color: rgba(39, 32, 35, 0.8);width:100%;border-radius: 6px 0 0 6px; padding: 0 0;">
          <div
            style="position:relative;box-shadow: 4px -2px 4px #1D1D1D;border-radius: 6px 0 0 0;user-select: none;width: 900px;height: 220px;background-repeat: no-repeat;background-position: center;background-size: cover;overflow: hidden;"
            :style="'background: linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6)), url('+ require('../assets/cover.jpg') +');'"
          >
            <div style="text-shadow: 0 0px 3px #000000;;padding: 25px 0 0 30px; font-size: 22px; font-weight: lighter;">
              <span>{{ announcements[ancIndex].title }}</span>
              <span style="padding: 0 15px;">|</span>
              <span>{{ announcements[ancIndex].type }}</span>
            </div>
            <div style="position: absolute; right:0; top: 180px; text-align: right;text-shadow: 0 0px 3px #000000;padding: 0px 30px; font-size: 16px; font-weight: lighter;">
              <span style="margin-left: 0px;">{{ announcements[ancIndex].datetime }}</span>
            </div>
          </div>
          <div style="position: relative;height: 210px;padding: 20px 20px;color: #DADADA;">
            {{ announcements[ancIndex].content.length>230?announcements[ancIndex].content.slice(0,230)+'...':announcements[ancIndex].content }}
            <div style="position: absolute; bottom: 30px; right: 30px;">
              <a
                v-if="announcements[ancIndex].link"
                :href="announcements[ancIndex].link.href"
                class="anc-button"
              >{{ announcements[ancIndex].link.title }}</a>
            </div>
          </div>
        </div>
        <div style="position:relative; box-shadow: -1px 0 4px #1D1D1D;padding: 20px 40px 0 40px; background-color: #2A2427; border-radius: 0 6px 6px 0;flex-flow: column; display: flex;align-items: flex-end;justify-content: center;">
          <div style="position: absolute; right: 20px; top: 20px; color: #E0E0E0; font-size: 14px; font-weight: lighter;">
            {{ ancIndex + 1 }} / {{ announcements.length }}
          </div>
          <div
            v-for="(item,idx) in announcements"
            :key="idx"
            :style="ancIndex===idx?'color: #CCAE70;background-color: #322B2E;':''"
            class="anc-item"
            @click="ancIndex=idx"
          >
            {{ item.title }}
          </div>
        </div>
      </div>
    </div>

    <div style="background: #272023; padding: 30px 20px; margin: 60px auto 0 auto; text-align: center;">
      <div style="font-size: 28px; font-weight: lighter;">
        进行中的比赛
      </div>
      <div style="margin-bottom: 20px;font-weight: lighter;">
        <span v-if="tournaments.length > 0">当前正在举办的比赛共有
          <span style="font-size: 26px;">
            {{ tournaments.length }}
          </span>
          个，您可以通过点击下方按钮去查看所有记录在案的比赛
        </span>
        <span v-else>
          当前没有正在举办的比赛哦，请您关注网站以持续获得更多比赛情报~
        </span>
      </div>
      <div>
        <a-button type="link">
          更多比赛 »
        </a-button>
      </div>
    </div>

    <div style="display: flex; flex-flow:row wrap; justify-content: center; margin: 0 auto; width: 75%;">
      <div
        v-for="(tou,idx) in tournaments"
        :key="idx"
        class="my-card"
        :style="'border-top: 5px solid' + cardTopColor[tou.status.name] + '!important;'"
      >
        <div style="font-size: 22px; padding: 15px 20px; min-height: 63px; color: #EEEEEE;">
          {{ tou.title }}
        </div>
        <div
          class="my-card-image"
          :style="'background: url('+ require('../assets/cover.jpg') +');'"
        />

        <div>
          <span style="color: #BFBFBF;display: block;padding: 20px 20px;">
            {{ tou.content }}
          </span>
        </div>
        <div style="position: absolute; bottom: 20px; left: 20px;">
          <div
            v-for="(btn,btidx) in cardButton[tou.status.name]"
            :key="btidx"
            class="my-card-button"
            :class="'my-card-button-' + tou.status.name"
            :style="getCardButtonStyle(cardButton[tou.status.name].length, btidx)"
          >
            {{ btn.title }}
          </div>
        </div>
        <div style="position: absolute; bottom: 20px; right: 20px;">
          <div style="padding: 8px 2px; font-size: 12px; color: #F4F4F4;">
            {{ tou.status.describe }}
          </div>
        </div>
      </div>
    </div>

    <div style="border-left: 6px solid #362F32 ;border-right: 6px solid #362F32 ;background: #272023; padding: 45px 20px; margin: 60px auto 30px auto; text-align: center; width: 75%; border-radius: 6px;">
      <div style="font-size: 32px; font-weight: lighter; color: #F2F2F2;">
        {{ !logined?'感觉不错嘛':'没有想要的比赛？' }}
      </div>
      <div style="margin-top: 10px; margin-bottom: 40px;font-weight: lighter; font-size: 16px; color: #DDD0D5;">
        <span>{{ !logined?'那就别再干坐着啦，马上点击下方的按钮在 o!t 注册吧，开启您的 osu! 比赛之旅~':'啊啊啊...您可以选择查看更多比赛，或者是创建一个属于您自己的比赛哦~' }}</span>
      </div>
      <div v-if="!logined">
        <span
          class="my-button-span my-hover1"
          style="background-color: #EA5197; box-shadow: 0 4px #86385b, 0 2px 2px #000; margin: 0;"
        >
          现在就加入o!t
        </span>
      </div>
      <div v-else>
        <span
          class="my-button-span my-hover1"
          style="background-color: #EA5197; box-shadow: 0 4px #86385b, 0 2px 2px #000;"
        >
          查看更多比赛
        </span>
        <span
          class="my-button-span my-hover2"
          style="margin-left: 15px;background-color:#108BDD; box-shadow: 0 4px #0B5383, 0 2px 2px #000;"
        >
          创建我的比赛
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import $backend from '../backend'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      ancIndex: 0,
      logined: true,
      statusSet: undefined,
      recentBoard: {
        eloTop: {
          name: '加载中',
          elo: '...'
        },
        champion: {
          team: '...',
          leaderName: '暂无数据',
          tournament: '...'
        },
        eloRiseTop: {
          name: '加载中',
          rise: '...'
        }
      },
      cardTopColor: {
        pending: '#58D68D',
        processing: '#F4D03F',
        finished: '#EC7063'
      },
      cardButton: {
        pending: [
          {
            title: '去看看',
            link: ''
          },
          {
            title: '报名',
            link: ''
          }
        ],
        processing: [
          {
            title: '总览',
            link: ''
          },
          {
            title: '赛程',
            link: ''
          },
          {
            title: '分组',
            link: ''
          }
        ],
        finished: [
          {
            title: '查看赛果',
            link: ''
          }
        ]
      },
      announcements: [
        {
          title: '服务器故障',
          type: '信息',
          content: '如果您看到了本条消息，说明服务器后端接口出现故障，请您等待恢复，谢谢',
          datetime: '现在',
          cover: '',
          link: null
        },
        {
          title: 'ELO系统上线啦',
          type: '网站新闻',
          content: 'elo系统测试中...',
          datetime: '2019年9月26日 00:00:00',
          cover: '',
          link: {
            href: '',
            title: '去看看'
          }
        },
        {
          title: '看板测试',
          type: '测试',
          content: '这是一条测试消息',
          datetime: '2019年11月10日 16:27:00',
          link: null
        }
      ],
      colorSet: [
        '#EA5197',
        '#3498DB',
        '#2ECC71'
      ],
      tournaments: [
        {
          title: 'OCLB S10',
          content: '这里是内容呀',
          status: {
            name: 'pending',
            describe: '报名中'
          },
          img: ''
        },
        {
          title: 'OCLC S8',
          content: '这里是内容呢',
          status: {
            name: 'processing',
            describe: '进行中'
          },
          img: ''
        },
        {
          title: 'MP4 S1',
          content: '这里是内容哦',
          status: {
            name: 'finished',
            describe: '已完赛'
          },
          img: ''
        },
        {
          title: '测试比赛',
          content: '这里是内容哦',
          status: {
            name: 'finished',
            describe: '已完赛'
          },
          img: ''
        },
        {
          title: '测试比赛',
          content: '这里是内容哦',
          status: {
            name: 'processing',
            describe: '进行中'
          },
          img: ''
        },
        {
          title: '测试比赛',
          content: '这里是内容哦',
          status: {
            name: 'pending',
            describe: '休赛期'
          },
          img: ''
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['loginStatus', 'osuname'])
  },
  mounted () {
    this.getHomeStatus()
    this.getRecentBoard()
    this.getNews()
  },
  methods: {
    openLoginLink () {
      window.location.href = this.global.osuOAuthLink + this.$route.name
    },
    goRanking () {
      this.$router.push({ path: '/ranking' })
    },
    getCardButtonStyle (length, index) {
      let style = ''
      if (index === 0) {
        style += 'border-radius: 4px 0 0 4px;'
        if (length > 1) {
          style += 'border-right: none;'
        } else if (index === length - 1) {
          style += 'border-radius: 4px;'
        }
      } else if (index === length - 1) {
        style += 'border-radius: 0 4px 4px 0;'
      } else {
        style += 'border-right: none;'
      }
      return style
    },
    getHomeStatus () {
      $backend.fetchHomeStatus(
      ).then(res => {
        this.statusSet = res
      }).catch(error => {
        this.error = error.message
        console.log(this.error)
      })
    },
    getNumbFormated (num) {
      let done = (num.toString().indexOf('.') !== -1) ? num.toLocaleString() : num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
      return done
    },
    getRecentBoard () {
      $backend.fetchRecentBoard(
      ).then(res => {
        res.champion = {
          team: 'X',
          leaderName: '暂无数据',
          tournament: '!!'
        }
        this.recentBoard = res
      }).catch(error => {
        this.error = error.message
        console.log(this.error)
      })
    },
    getNews () {
      $backend.fetchNews(
      ).then(res => {
        this.announcements = res
      }).catch(error => {
        this.error = error.message
        console.log(this.error)
      })
    }
  }
}
</script>

<style>
  @media screen and (max-width: 1150px) {
    .intro-right {
      display: none;
    }
    .intro-left {
      width: 100% !important;
      padding-right: 50px;
    }
    .intro-container {
      height: auto !important;
    }
  }
  .intro-left {
    height: 100%;
    width: 60%;
    display: flex;
    flex-direction: column;
    color: #FFFFFF;
    padding-left: 50px;
    justify-content: center;
  }
  .intro-right {
    background-repeat: no-repeat;
    height: 520px;
    width: 510px;
    background-image: url('~@/assets/intro.png');
  }
  .title {
    font-size: 32px;
  }
  .intro-container {
    background-color: rgba(39, 32, 35, 0.8);
    box-shadow: 0 1px 1px #121212;
    border-radius: 6px;
    width: 75%;
    margin: 50px auto;
    border-radius: 6px;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    height: 400px;
  }
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
  .the-item {
  color: #F6F6F6;
  transition: .4s ease;
  cursor: pointer;
  }
  .the-item:hover {
    color: #E0B8CA;
  }
  .my-card {
    height: 390px;
    width: 340px;
    background-color: #272023;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.1), 0 6px 6px 0 rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    margin-left: 60px;
    vertical-align: top;
    border: 1px solid #362F32 ;
    transition: .4s ease;
    cursor: pointer;
    position: relative;
    margin-top: 60px;
  }
  .my-card:hover {
    border: 1px #5D5156 solid;
    box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.2), 0 8px 16px 0 rgba(0, 0, 0, 0.19);
  }
  .my-card:hover .my-card-image {
    filter: brightness(0.9);
  }
  .my-card-image {
    user-select: none;
    width: 100%;
    min-height: 140px;
    background-repeat: no-repeat !important;
    background-position: center !important;
    background-size: cover !important;
    overflow: hidden;
    filter: brightness(0.6);
    transition: .4s ease;
  }
  .my-card-button {
    border: 1px #3B3437 solid;
    color: #FFFFFF;
    text-shadow: 0 0px 3px #000000;
    padding: 6px 12px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    cursor: pointer;
    transition: .4s ease;
    user-select: none;

  }
  .my-card-button-pending:hover {
    background-color: #229954;
  }
  .my-card-button-processing:hover {
    background-color: #F1C40F;
  }
  .my-card-button-finished:hover {
    background-color: #E74C3C;
  }
  .anc-item {
    font-size: 16px;
    font-weight:lighter;
    cursor: pointer;
    user-select:none;
    width: 450px;
    height: 50px;
    line-height:30px;
    padding: 10px 12px;
    background-color: #2E282B;
    text-align:center;
    border-radius: 6px;
    margin-bottom: 25px;
    transition: .4s ease;
  }
  .anc-item:hover {
    background-color: #322B2E;
  }
  .anc-button {
    border-radius: 6px;
    border: 1px solid #CDC3C3;
    padding: 5px 15px;
    cursor: pointer;
    color: #DADADA;
    user-select: none;
  }
  .anc-button:hover {
    border: 1px solid #BFB5B5;
    color: #BFB5B5;
  }
</style>
