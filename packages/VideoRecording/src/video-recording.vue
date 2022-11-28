<script setup name="VideoRecording" >
import { onMounted } from 'vue';
import { useRecordingVideo } from '../../Shard';
onMounted(() => {
  new useRecordingVideo()
})
</script>
<template>
  <div class="layui-body">
    <div id="container">
      <video id="gum"
             autoplay
             muted></video>
      <div class="controls">
        <button id="record"
                disabled>开始录制</button>
        <button id="play"
                disabled>播放</button>
        <button id="download"
                disabled>下载</button>
        <span id="tEl"></span>
      </div>
      <video id="gum2"
             controls="controls"
             autoplay
             style="display:none"></video>
    </div>
  </div>
</template>
<style scoped>
#container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.controls {
  padding: 0 10px;
}
</style>