<template>
  <div
    style="padding: 30px 60px;"
  >
    <div style="margin: 20px auto 0 auto; width: 85%; text-align: center; height: 100%; padding: 60px; border-radius: 8px 8px 0 0; background-color: #272023; box-shadow: 2px 4px 4px 0 rgba(0, 0, 0, 0.1), 0 6px 6px 0 rgba(0, 0, 0, 0.1);">
      <div style="font-size: 42px; font-weight: lighter;">
        Cost 计算器
      </div>
      <div style="font-size: 16px; font-weight: lighter; padding: 25px 0;  color: #E8DBDB;">
        选择公式，输入玩家名字或id，就可以即时计算cost啦~
      </div>
    </div>

    <div style="margin: 0 auto; width: 85%; text-align: center; padding: 20px 70px 20px 70px; border-radius: 0 0 8px 8px; background-color: #231D20; box-shadow: 2px 4px 4px 0 rgba(0, 0, 0, 0.1), 0 6px 6px 0 rgba(0, 0, 0, 0.1);">
      <div style="margin-top: 20px;">
        <div
          v-if="currentResult"
          class="tourney-group-item non-image-item"
          style="border: 1px solid #41393C; margin: 50px auto; width: 70%; height: auto; display: flex;"
        >
          <div>
            <div
              style="background-size: cover !important; height: 150px; border-radius: 6px 6px 0 0; filter: brightness(.4) blur(0px);"
              :style="`background-image: url(https://a.ppy.sh/${currentResult.osuid}?.jpg); `"
            />
            <div style="text-align: center; font-size: 14px; font-weight: 600; cursor: default;">
              {{ currentResult.osuname }}
            </div>
            <div>{{ currentResult.cost }}</div>
          </div>

          <div>
            <div
              v-for="(item, idx) in currentResult.plusPP"
              :key="idx"
            >
              {{ idx }}: {{ item }}
            </div>
          </div>
        </div>

        <div
          v-if="currentFormular"
          class="tourney-group-item non-image-item"
          style="border: 1px solid #41393C; margin: 0 auto; width: 70%; height: auto;"
        >
          <div style="position: relative; height: 60px;">
            <div style="font-size: 22px; position: absolute; z-index: 1; left: 20px; top: 15px; text-shadow: 0 1px 3px rgba(0,0,0,.75); font-weight: normal;">
              <span>{{ currentFormular.name }}</span>

              <span style="margin-left: 13px; font-size: 12px; font-weight: lighter;">{{ currentFormular.nick_name }}</span>
            </div>
            <div style="font-size: 14px; position: absolute; z-index: 1; right: 15px; top: 15px; text-shadow: 0 1px 3px rgba(0,0,0,.9); background-color: rgba(0,0,0,.26); padding: 3px 10px; border-radius: 16px;">
              {{ currentFormular.version }}
            </div>
            <div style="font-size: 12px; position: absolute; z-index: 1; right: 60px; top: 17px; text-shadow: 0 1px 3px rgba(0,0,0,.9); background-color: rgba(50,226,123,.43); padding: 3px 10px; border-radius: 16px;">
              {{ currentFormular.public?'公开':'未公开' }}
            </div>
          </div>

          <div style="padding: 20px 10px; width: 100%; background-color: #2E262A; font-size: 18px; text-shadow: 0 1px 3px rgba(0,0,0,.75); font-weight: lighter;">
            {{ currentFormular.content }}
          </div>

          <div style="position: relative; height: 65px;">
            <a-tooltip title="访问主页">
              <a-avatar
                class="small-avatar"
                icon="user"
                :src="`https://a.ppy.sh/${currentFormular.creator_id}?.jpg`"
                style="position: absolute; z-index: 1; left: 16px; bottom: 15px; background-color: #grey; transition: .2s ease-in-out;cursor: pointer;user-select: none;"
                @click="openLink(currentFormular.creator_id)"
              />
            </a-tooltip>
            <div
              style="background-color: rgba(243,81,81,.43); font-size: 12px; position: absolute; z-index: 0; left: 39px; bottom: 14px; text-shadow: 0 1px 3px rgba(0,0,0,.9); padding: 2px 12px; border-radius: 0 12px 12px 0;"
            >
              创建于 {{ currentFormular.create_time.slice(0, 10) }}
            </div>
            <div style="font-weight: lighter; position: absolute; z-index: 1; right: 15px; bottom: 12px; text-shadow: 0 1px 3px rgba(0,0,0,.75);">
              <span style="font-size: 13px; ">{{ currentFormular.remark }}</span>
            </div>
          </div>
        </div>

        <div
          v-else
          class="tourney-group-item non-image-item"
          style="border: 1px solid #41393C; margin: 0 auto; width: 70%; height: 200px; text-align: center; line-height: 200px;"
        >
          <span style="padding: 20px; width: 100%; background-color: #2E262A; font-size: 18px; text-shadow: 0 1px 3px rgba(0,0,0,.75); font-weight: lighter;">
            当您选择公式后，便可在此处看到公式详细信息~
          </span>
        </div>

        <a-spin :spinning="calculating">
          <div style="padding: 40px 0;">
            <div style="padding: 10px 0; font-size: 12px; min-width: 360px; max-width: 34%; margin: 0 auto;">
              <a-select
                :value="nowValue"
                style="width: 100%;"
                placeholder="请选择一条公式"
                @change="handleChange"
              >
                <a-select-opt-group label="我创建的公式">
                  <a-select-option
                    v-for="(item, idx) in formularsMy"
                    :key="idx"
                    :value="item.formula_id"
                  >
                    <span>{{ item.full_name }}</span>
                    <span style="margin: 0 10px;">-</span>
                    <span style="font-size: 12px; color: grey;">{{ item.nick_name }}</span>
                    <span style="margin: 0 5px;" />
                  </a-select-option>
                </a-select-opt-group>

                <a-select-opt-group label="可用的公式">
                  <a-select-option
                    v-for="(item, idx) in formularsPublic"
                    :key="idx"
                    :value="item.formula_id"
                  >
                    <span>{{ item.full_name }}</span>
                    <span style="margin: 0 10px;">-</span>
                    <span style="font-size: 12px; color: grey;">{{ item.nick_name }}</span>
                    <span style="margin: 0 5px;" />
                  </a-select-option>
                </a-select-opt-group>
              </a-select>
            </div>

            <div style="padding: 10px 0; font-size: 12px; min-width: 360px; max-width: 34%; margin: 0 auto;">
              <input
                ref="userKey"
                placeholder="在这里输入玩家osuid或玩家名"
                style="margin-top: 10px; transition: .8s ease; width: 100%; outline: none; background: #1F1F1F; border: 0px solid rgba(204, 174, 112, 0.8); border-radius: 6px; padding: 14px 10px;"
                :style="warning?'border: 2px solid #F1C40F;':'border: 2px solid #D1C3C3;'"
              >
            </div>

            <div style="margin-top: 50px; margin-bottom: 10px; display: flex; font-weight: bold; font-size: 12px;">
              <span
                class="login-action-button button-pink"
                style="margin: 0 auto; min-width: 20%; line-height: 30px;"
                @click="costCalculate"
              >
                即刻查询~
                <a-icon
                  style="margin-left: 4px; color: #FFFFFF;"
                  type="heart"
                />
              </span>
            </div>
          </div>
        </a-spin>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import $backend from '@/apis/backend'

export default {
  data () {
    return {
      warning: false,
      formularsPublic: [],
      formularsMy: [],
      calculateResults: {},
      currentFormular: null,
      currentResult: null,
      nowValue: undefined,
      calculating: false
    }
  },
  computed: {
    ...mapGetters(['loginStatus', 'osuid', 'token', 'authorize'])
  },
  mounted () {
    this.getFormulars()
  },
  methods: {
    handleChange (formularId) {
      var res
      res = this.formularsPublic.find(item => item.formula_id === formularId)
      if (!res) {
        res = this.formularsMy.find(item => item.formula_id === formularId)
      }
      this.currentFormular = res
      this.nowValue = formularId
    },
    costCalculate () {
      if (this.$refs.userKey && this.$refs.userKey.value) {
        const userKey = this.$refs.userKey.value
        if (userKey === '') {
          this.$message.warning('请输入玩家osuid或者osu用户名在提交呀...owo')
          this.warning = true
          setTimeout(() => {
            this.warning = false
          }, 2400)
        } else {
          var data = {
            formulaKey: this.nowValue,
            userKey: userKey
          }
          this.calculating = true
          $backend.costCalculator(
            data
          ).then(responseData => {
            this.calculating = false
            if (responseData.status === 1) {
              this.$message.success(responseData.message)
              this.currentResult = responseData.data
            } else {
              this.$message.error(responseData.message)
            }
          }).catch(error => {
            this.calculating = false
            console.log(error.message)
          })
        }
      } else {
        this.$message.warning('请输入玩家osuid或者osu用户名在提交呀...owo')
        this.warning = true
        setTimeout(() => {
          this.warning = false
        }, 2400)
      }
    },
    openLink (osuid) {
      window.open(`https://osu.ppy.sh/${osuid}`, '_blank')
    },
    getFormulars () {
      var token
      var osuid
      if (this.authorize) {
        token = this.token
        osuid = this.osuid
      }
      $backend.getCostFormulas(
        token, osuid
      ).then(responseData => {
        this.formularsPublic = responseData.data.public
        this.formularsMy = responseData.data.my

        this.currentFormular = this.formularsPublic[0]
        this.nowValue = '1'
      }).catch(error => {
        console.log(error.message)
      })
    }
  }
}

</script>

<style>
.cost-formular {
  font-weight: lighter; font-size: 20px; text-shadow: 0 1px 6px #2A2A2A; margin: 10px 10px; background-color: rgb(39, 32, 35); padding: 15px; box-shadow: 0 0 2px 1px rgba(0,0,0,0.1); border-radius: 6px;
}
  .small-avatar{
    box-shadow: 0 0 0 2px rgba(243, 81, 81, 0.43);
  }
  .small-avatar:hover{
    box-shadow: 0 0 0 3px rgba(172, 169, 144, 0.43);
  }
</style>
