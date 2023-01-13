<script setup>
import { VideoRecording, DrawImage, StarrySky, Spotlight, Clocks, DynamicCard, DigitalScroll, TakingPictures, AlanButton, CodeBackgroundWall, AlanBackTop, TherMometer, YuanWar, CanvasAutograph, RedPacketRain, Utils } from '../packages/index';
import { ref, reactive, onMounted } from 'vue';

const cardList = ref([
  {
    text: '哈喽哈喽哈喽哈喽1'
  },
  {
    text: '哈喽哈喽哈喽哈喽2'
  },
  {
    text: '哈喽哈喽哈喽哈喽21'
  },
  {
    text: '哈喽哈喽哈喽哈喽31'
  },
])
const goTopCompleteCb = () => { }

const reactiveProps = reactive({
  renderList: [
    {
      type: 'image',
      src: '/examples/assets/zj-bg.jpeg',
      width: 500,
      height: 500,
      x: 0,
      y: 0
    },
    {
      type: 'image',
      src: '/examples/assets/hongbao.png',
      clipCircle: true,
      clipLineWidth: 10,
      clipStrokeStyle: '#ffffff',
      width: 60,
      height: 60,
      x: 180,
      y: 20
    },
    {
      type: 'text',
      text: '我的名字我的名字',
      align: 'center',
      fontSize: 20,
      fillStyle: '#333',
      x: 100,
      y: 120
    },
    {
      type: 'image',
      src: '/examples/assets/clock.png',
      width: 80,
      height: 80,
      x: 0,
      y: 150
    }
  ]
})

onMounted(() => {
  let waterMark = new Utils.WaterMark(['水印文字哈哈哈哈', '2022-12-08'], ['img', 'img2'])
  waterMark.startWaterMark();

})
</script>

<template>
  <div>
    <!-- 待加水印的IMG -->
    <div style="width: 300px;height: 300px;background-color:aqua;"
         id="img"
         src=""
         class="aaa"
         @click="() => {
           Utils.useToggleFullscreen({
             fullscreenFlag: false,
             className: 'aaa'
           })
         }"
         alt=""></div>
    <img style="width: 300px;height: 300px;background-color:aqua;"
         id="img2"
         src="https://img1.baidu.com/it/u=127418552,3790075701&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1670864400&t=de455188639e15eb04792ce3e3003370"
         alt="" />
  </div>
  <!-- <RedPacketRain></RedPacketRain> -->
  <!-- <CanvasAutograph></CanvasAutograph> -->
  <!-- <DrawImage :renderList="reactiveProps.renderList"></DrawImage> -->
  <!-- <Spotlight></Spotlight> -->
  <!-- <Clocks></Clocks> -->
  <!-- <VideoRecording></VideoRecording> -->
  <!-- <TakingPictures></TakingPictures> -->
  <!-- <DynamicCard :shape="0"
               :cardList="cardList"></DynamicCard> -->
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
  <!-- <AlanBackTop @goTopCompleteCb="goTopCompleteCb"></AlanBackTop> -->
  <div class="h"></div>
</template>

<style scoped>
.h {
  height: 200vh;
}
</style>
