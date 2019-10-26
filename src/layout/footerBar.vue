<template>
  <div class="foot">
    <div
      style="background-color: #2B2226; padding: 24px 50px; width: 100%;"
    >
      <div
        style="text-align: center; font-size: 16px; padding: 6px 0 16px 0;"
      >
        <span
          v-for="(item, index) in links"
          :key="index"
          :style="index !== 0? 'margin-left: 250px;': ''"
        >
          <a
            :href="item.link"
            class="this-link"
          >{{ item.title }}</a>
        </span>
      </div>
      <div style="padding: 18px 0 0 0;">
        PurePeace, Explosive powered 2019
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      links: [
        { title: '关于我们',
          link: '#'
        },
        { title: '服务器状态',
          link: '#'
        },
        { title: '隐私政策',
          link: '#'
        },
        { title: '服务条款',
          link: '#'
        }
      ]

    }
  }
}
</script>

<style >
.foot{
  display: flex;
  text-align: center;
  color: #A38F98;
  font-family: "Microsoft YaHei";
  /*letter-spacing: 3px;*/
  font-size: 12px;
  font-weight: lighter;
  clear: both;
}
.this-link {
  font-size: 12px;
  font-weight: 700;
  color: #FFFFFF;
}
.this-link:hover {
  color: #E0B8CA;
}
</style>
