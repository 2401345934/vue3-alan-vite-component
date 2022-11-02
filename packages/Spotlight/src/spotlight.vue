<script >
export default {
  alanComponentName: "Spotlight",
};
</script>
<script setup name="Spotlight" >
import { onMounted } from 'vue';
const props = defineProps({
  width: {
    type: Number,
    default: 500,
  },
  height: {
    type: Number,
    default: 500,
  },
});
onMounted(() => {
  document.querySelector('style').append(`canvas {
        position: fixed;
        left:0;
        top: 0;
        z-index: 9999;
        pointer-events: none;
    }`)
  document.body.appendChild(document.createElement('canvas'))
  const cvs = document.querySelector('canvas')
  const ctx = cvs.getContext('2d')
  cvs.width = props.width
  cvs.height = props.height
  const p = {
    x: 0,
    y: 0,
    r: 50
  }
  document.onmousemove = e => {
    p.x = e.clientX
    p.y = e.clientY
    render()
  }
  const render = () => {
    ctx.beginPath()
    ctx.clearRect(0, 0, cvs.width, cvs.height)
    var radial = ctx.createRadialGradient(p.x, p.y, p.r, p.x, p.y, p.r * 3);
    radial.addColorStop(0, '#fff');
    radial.addColorStop(1, 'rgba(0, 0, 0, 0.5)');
    ctx.fillStyle = radial;
    ctx.fillRect(0, 0, cvs.width, cvs.height);
  }
  render()
})
</script>

<template>
</template>

<style scoped lang="scss">
</style>
