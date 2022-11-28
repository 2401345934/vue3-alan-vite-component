<script setup name="TakingPictures">
import { reactive, onMounted } from 'vue';

const props = defineProps({
  autoGetCompetence: {
    type: Boolean,
    default: false,
  },
});
const state = reactive({
  videoWidth: 250,
  videoHeight: 350,
  imgSrc: "",
  thisCancas: null,
  thisContext: null,
  thisVideo: null,
  openVideo: false,
})
onMounted(() => {
  props.autoGetCompetence && getCompetence(); //进入页面就调用摄像头
})
// 调用权限（打开摄像头功能）
const getCompetence = () => {
  state.thisCancas = document.getElementById("canvasCamera");
  state.thisContext = state.thisCancas.getContext("2d");
  state.thisVideo = document.getElementById("videoCamera");
  state.thisVideo.style.display = "block";
  // 获取媒体属性，旧版本浏览器可能不支持mediaDevices，我们首先设置一个空对象
  if (navigator.mediaDevices === undefined) {
    navigator.mediaDevices = {};
  }
  // 一些浏览器实现了部分mediaDevices，我们不能只分配一个对象
  // 使用getUserMedia，因为它会覆盖现有的属性。
  // 这里，如果缺少getUserMedia属性，就添加它。
  if (navigator.mediaDevices.getUserMedia === undefined) {
    navigator.mediaDevices.getUserMedia = function (constraints) {
      // 首先获取现存的getUserMedia(如果存在)
      var getUserMedia =
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.getUserMedia;
      // 有些浏览器不支持，会返回错误信息
      // 保持接口一致
      if (!getUserMedia) {
        //不存在则报错
        return Promise.reject(
          new Error("getUserMedia is not implemented in this browser")
        );
      }
      // 否则，使用Promise将调用包装到旧的navigator.getUserMedia
      return new Promise(function (resolve, reject) {
        getUserMedia.call(navigator, constraints, resolve, reject);
      });
    };
  }
  const constraints = {
    audio: false,
    video: {
      width: state.videoWidth,
      height: state.videoHeight,
      transform: "scaleX(-1)",
    },
  };
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(function (stream) {
      // 旧的浏览器可能没有srcObject
      if ("srcObject" in state.thisVideo) {
        state.thisVideo.srcObject = stream;
      } else {
        // 避免在新的浏览器中使用它，因为它正在被弃用。
        state.thisVideo.src = window.URL.createObjectURL(stream);
      }
      state.thisVideo.onloadedmetadata = function (e) {
        state.thisVideo.play();
      };
    })
    .catch((err) => {
      console.log(err);
    });
}
//  绘制图片（拍照功能）
const setImage = () => {
  // canvas画图
  state.thisContext.drawImage(
    state.thisVideo,
    0,
    0,
    state.videoWidth,
    state.videoHeight
  );
  // 获取图片base64链接
  const image = state.thisCancas.toDataURL("image/png");
  state.imgSrc = image; //赋值并预览图片
}
// 关闭摄像头
const stopNavigator = () => {
  state.thisVideo.srcObject.getTracks()[0].stop();
}

</script>
<template>
  <div class="camera_outer">
    <video id="videoCamera"
           :width="state.videoWidth"
           :height="state.videoHeight"
           autoplay></video>
    <canvas style="display: none"
            id="canvasCamera"
            :width="state.videoWidth"
            :height="state.videoHeight"></canvas>
    <div v-if="state.imgSrc"
         class="img_bg_camera">
      <h2>效果预览</h2>
      <img :src="state.imgSrc"
           alt
           class="tx_img" />
    </div>
    <div class="button">
      <button @click="getCompetence()"
              type="primary">打开摄像头</button>
      <button @click="stopNavigator()"
              type="warning">关闭摄像头</button>
      <button @click="setImage()"
              type="success">拍照</button>
    </div>
  </div>
</template>
<style scoped>

</style>