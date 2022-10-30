<script setup>
import { StarrySky, DynamicCard,DigitalScroll, AlanButton, CodeBackgroundWall, AlanBackTop, TherMometer,YuanWar } from '../packages/index';

const goTopCompleteCb = () => { }
</script>

<template>
  <DynamicCard :shape="0"></DynamicCard>
  <!-- <YuanWar></YuanWar> -->
  <!-- <starry-sky :stars-count="888"
              :distance="1000" /> -->
  <!-- <TherMometer :show="true"
               :data="{
                 max: 50,
                 min: 0,
                 value: 60,
                 warn: 10,
               }" /> -->
  <!-- <digital-scroll :targetNumber="1234" targetClass="class"></digital-scroll>
  <alan-button disabled  type="primary">111</alan-button>
  <CodeBackgroundWall></CodeBackgroundWall> -->
  <AlanBackTop @goTopCompleteCb="goTopCompleteCb"></AlanBackTop>
  <div class="h"></div>
</template>

<style scoped>
.h {
  height: 200vh;
}
</style>
