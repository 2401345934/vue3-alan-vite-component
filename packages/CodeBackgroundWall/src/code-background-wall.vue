<script setup name="CodeBackgroundWall" lang="ts">
import { onMounted, ref } from 'vue';
const cvs = ref(null)
const props = defineProps({
  // 宽度
  width: {
    type: Number,
    default: 300,
  },
  // 高度
  height: {
    type: Number,
    default: 300,
  },
  // 步长 控制速度
  step: {
    type: Number,
    default: 0.02,
  },
  // 颜色
  color: {
    type: String,
    default: 'green',
  },
});

onMounted(() => {
  const el: any = cvs.value
  el.width = props.width
  el.height = props.height
  const c = el.getContext('2d')
  const text = 'qwertyuiopasdfghjklzxcvbnm'
  c.font = '14px 微软雅黑'
  const bl = 20
  const startRates = {}
  const rates = {}
  const endRates = {}
  const textObj = {}
  const animate = () => {
    c.clearRect(0, 0, props.width, props.height)
    for (let i = 0; i < props.width; i += bl) {
      c.beginPath()
      const gradient = c.createLinearGradient(0, 0, 0, props.height);
      const s1 = 0.2 * Math.random()
      const s2 = 0.8 * Math.random()
      // 调整速度
      const step = props.step
      rates[i] = rates[i] || -s1
      startRates[i] = startRates[i] || s2
      endRates[i] = endRates[i] || 0
      gradient.addColorStop(startRates[i] < 0 ? 0 : startRates[i], '#000');
      gradient.addColorStop(rates[i] < 0 ? 0 : rates[i], props.color);
      gradient.addColorStop(endRates[i], '#000');
      c.fillStyle = gradient
      for (let j = 0; j < props.height; j += bl) {
        textObj[`${i}-${j}`] = textObj[`${i}-${j}`] || text[parseInt((Math.random() * text.length) as any)]
        c.fillText(textObj[`${i}-${j}`], i, j)
      }
      startRates[i] += step
      rates[i] += step
      endRates[i] += step
      if (startRates[i] > 1) {
        startRates[i] = -s2
      }
      if (rates[i] > 1) {
        if (startRates[i] === -s2) {
          rates[i] = -s1
        } else {
          rates[i] = 1
        }
      }
      if (endRates[i] > 1) {
        if (rates[i] === -s1 && startRates[i] === -s2) {
          endRates[i] = step
        } else {
          endRates[i] = 1
        }
      }
    }
    requestAnimationFrame(animate)
  }
  animate()
});
</script>

<template>
  <canvas ref="cvs"
          id="cvs"
          :height="height"
          :width="width"
          class="cvs"></canvas>
</template>

<style scoped lang="scss">
.cvs {
  background-color: #000;
}
</style>
