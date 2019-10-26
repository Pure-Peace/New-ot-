<template>
  <div style="min-height: 100%; padding: 30px 0; margin-top: 10px;">
    <transition
      name="faded"
      mode="out-in"
    >
      <router-view />
    </transition>
  </div>
</template>

<script>

export default {
  components: {
  },
  data () {
    return {
    }
  },
  methods: {

  }
}
</script>

<style>
.faded-enter {
  opacity: 0;
}
.faded-enter-active {
  transition: .5s ease-in-out;

}
.faded-enter-to {

}
.faded-leave {

}
.faded-leave-active {
  transition: .5s ease-in-out;
}
.faded-leave-to {
  opacity: 0;
  transform: translate(20px, 0);
}
</style>
