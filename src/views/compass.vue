<template>
  <div
    style="padding: 30px 60px;"
  >
    <div style="margin: 0 auto 60px auto; width: 85%; text-align: center; height: 67vh; padding: 20px 40px 20px 40px; border-radius: 8px; background-color: #231D20; box-shadow: 2px 4px 4px 0 rgba(0, 0, 0, 0.1), 0 6px 6px 0 rgba(0, 0, 0, 0.1);">
      <div
        style="display: flex; flex-wrap: wrap; padding: 20px 10px; border-radius: 6px;"
      >
        <div
          v-for="(item, idx) in funcs"
          :key="idx"
          class="tourney-group-item non-image-item"
          style="border: 1px solid #41393C; margin-left: 8px;"
          @click="$router.push({name: item.name})"
        >
          <div style="font-size: 22px; position: absolute; z-index: 1; left: 20px; top: 15px; text-shadow: 0 1px 3px rgba(0,0,0,.75); font-weight: normal;">
            {{ item.title }}
          </div>
          <div style="font-size: 14px; position: absolute; z-index: 1; right: 15px; top: 15px; text-shadow: 0 1px 3px rgba(0,0,0,.9); background-color: rgba(0,0,0,.26); padding: 3px 10px; border-radius: 16px;">
            {{ item.name }}
          </div>
          <div
            style="font-size: 12px; position: absolute; z-index: 1; left: 16px; bottom: 12px; text-shadow: 0 1px 3px rgba(0,0,0,.9); padding: 2px 11px; border-radius: 12px;"
            :style="item.status === '可用'?'background-color: rgba(50,226,123,.43);': item.status === '正在测试'?'background-color: rgba(244,208,63,.43);':'background-color: rgba(243,81,81,.43);'"
          >
            {{ item.status }}
          </div>
          <div style="font-weight: lighter; position: absolute; z-index: 1; right: 15px; bottom: 10px; text-shadow: 0 1px 3px rgba(0,0,0,.75);">
            <span style="font-size: 13px; ">{{ item.description }}</span>
          </div>
          <div
            class="tourney-group-image"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  components: {
  },
  data () {
    return {
      funcs: [
        {
          title: '对局信息',
          name: 'matches',
          description: '查找一条mplink的elo信息',
          status: '可用'
        },
        {
          title: 'Cost 计算器',
          name: 'cost',
          description: '计算玩家在任意公式下的cost',
          status: '可用'
        },
        {
          title: '账户设置',
          name: 'setting',
          description: '设置你的o!tsu账户信息',
          status: '可用'
        },
        {
          title: 'elo百科',
          name: 'wiki',
          description: '有啥不懂的就进来看看吧',
          status: '可用'
        },
        {
          title: '匹配大厅',
          name: 'lobby',
          description: '就是匹配大厅',
          status: '正在施工'
        },
        {
          title: '聊天室',
          name: 'lobby',
          description: '在这里口嗨',
          status: '正在测试'
        }
      ]
    }
  },
  mounted () {
  },
  methods: {

  }
}

</script>

<style>
.tourney-group-item {
  box-shadow: 4px 4px 4px 0 rgba(0, 0, 0, 0.04), 0 6px 6px 0 rgba(0, 0, 0, 0.04);
  overflow: hidden;
  position: relative;
  background-color: #272023;
  border-radius: 6px;
  margin-right: 10px;
  margin-bottom: 20px;
  width: 320px;
  height: 145px;
  transition: .4s ease;
  cursor: pointer;
}
.tourney-group-item:hover {
  box-shadow: 4px 4px 4px 0 rgba(0, 0, 0, 0.1), 0 6px 6px 0 rgba(0, 0, 0, 0.1);
  /*transform: translateY(-2px);*/

}
.non-image-item:hover {
  border: 1px solid #5D5156 !important;
}
.tourney-group-item:hover .tourney-group-image {
  filter: brightness(.5) blur(0px);
}
.tourney-group-image {
  filter: brightness(.4) blur(0px);
  background-position:center;
  background-size: cover;
  background-repeat:no-repeat;
  width: 320px; height: 145px;
  border-radius: 6px;
   transition: .4s ease;
}
</style>
