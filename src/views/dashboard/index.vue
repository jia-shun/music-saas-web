<template>
  <div class="block">
    <div class="login" :style="'background-image:url(' + Background + ');height:1100px'" />
  </div></template>

<script>
import Background from '@/assets/image/wallhaven-2ky5k9.png'

export default {
  name: 'Home',
  data() {
    return {
      Background: Background
    }
  }
}
</script>

<style lang="scss" scoped>
.block {
  display: block;
}
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-size: cover;
}
</style>
