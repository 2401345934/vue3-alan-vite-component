<script setup>
import { VideoRecording,StarrySky, DynamicCard,DigitalScroll, TakingPictures, AlanButton, CodeBackgroundWall, AlanBackTop, TherMometer,YuanWar } from '../packages/index';
import { ref } from 'vue';

const cardList = ref([
  {
    text:'哈喽哈喽哈喽哈喽1'
  },
  {
    text:'哈喽哈喽哈喽哈喽2'
  },
  {
    text:'哈喽哈喽哈喽哈喽21'
  },
  {
    text:'哈喽哈喽哈喽哈喽31'
  },
])
const goTopCompleteCb = () => { }
</script>

<template>
  <!-- <VideoRecording></VideoRecording> -->
  <!-- <TakingPictures></TakingPictures> -->
  <DynamicCard :shape="0" :cardList="cardList"></DynamicCard>
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
