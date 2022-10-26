<script setup>
import { StarrySky,DigitalScroll, AlanButton,CodeBackgroundWall,AlanBackTop } from '../packages/index';

const goTopCompleteCb = () => {}
</script>

<template>
  <div class="h"></div>
	<starry-sky :stars-count="888" :distance="1000" />
	<!-- <digital-scroll :targetNumber="1234" targetClass="class"></digital-scroll>
  <alan-button disabled  type="primary">111</alan-button>
  <CodeBackgroundWall></CodeBackgroundWall> -->
  <AlanBackTop  @goTopCompleteCb="goTopCompleteCb"></AlanBackTop>
</template>

<style scoped>
.h {
  height: 200vh;
}
</style>
