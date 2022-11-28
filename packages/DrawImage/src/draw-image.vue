<script setup name="DrawImage" lang="ts">
import { onMounted, ref } from 'vue';
import { useDrawImage } from "../../Shard"
const cvs: any = ref('')
const props = defineProps({
  width: {
    type: Number,
    default: () => 500,
  },
  height: {
    type: Number,
    default: () => 500,
  },
  bl: {
    type: Number,
    default: () => 5,
  },
  renderList: {
    type: Array,
    default: () => [],

  }
});
onMounted(() => {
  new useDrawImage({
    el: cvs.value,
    bl: props.bl,
    renderList: props.renderList
  })
});
const download = () => {
  const a = document.createElement('a')
  a.href = cvs.value.toDataURL('image/png')
  a.setAttribute('download', 'canvas.png')
  a.click()
}
</script>

<template>
  <canvas ref="cvs"
          id="cvs"
          :width="width"
          :height="height"
          :style="`width:${width}px`"></canvas>
  <div><button @click="download()">下载图片</button></div>
</template>

<style scoped lang="scss">
.digital-scroll {
  color: #fff;

}
</style>
