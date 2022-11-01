<script >
export default {
  alanComponentName: "Clocks",
};
</script>
<script setup name="Clocks" >
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
  backgroundColor: {
    type: String,
    default: '#03303a',
  },
});

onMounted(() => {
  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");
  ctx.strokeStyle = '#7FFFD4';
  ctx.lineWidth = 3;
  ctx.shadowBlur = 5;
  ctx.shadowColor = '#7FFFD4';
  let milliseconds = 0;
  let minutes = 0;
  let hour = 0;
  let date = "";
  let ctxBack = canvas.getContext("2d");
  let numBack = canvas.getContext("2d");
  //Number	
  ctxBack.lineWidth = 1;
  ctxBack.shadowBlur = 0;
  ctxBack.shadowColor = '#F0F8FF';

  function pageInit () {
    showTime();
    showBack();
    drawSecPin();
    drawMinPin();
    drawHouPin();
    setPoint();
    setNum();
  }

  function setNum () {
    numBack.save();
    numBack.translate(250, 250);
    numBack.beginPath();
    numBack.fillStyle = '#7FFFD4';
    numBack.font = "30px Helvetica";
    for (let i = 0; i < 60; i++) {
      if (i % 5 == 0) {
        numBack.lineWidth = 5;
        let xPoint = Math.sin(i * 6 * 2 * Math.PI / 360) * 195;
        let yPoint = -Math.cos(i * 6 * 2 * Math.PI / 360) * 195;
        numBack.fillText(i == 0 ? 12 : i / 5, i == 0 ? -15 : xPoint - 10, i == 0 ? -185 : i <= 30 ? yPoint + 5 : yPoint + 10);
      }
    }
    numBack.stroke();
    numBack.closePath();
    numBack.restore();
  }
  // 绘制秒针
  function drawSecPin () {
    ctxBack.save();
    ctxBack.translate(250, 250);
    ctxBack.rotate(milliseconds / 60 * 2 * Math.PI);
    ctxBack.beginPath();
    ctxBack.strokeStyle = '#AFEEEE';
    ctxBack.lineWidth = 1;
    ctxBack.lineJoin = "bevel";
    ctxBack.miterLimit = 10;
    ctxBack.moveTo(0, 30);
    ctxBack.lineTo(3, -175);
    ctxBack.lineTo(13, -165);
    ctxBack.lineTo(0, -210);
    ctxBack.lineTo(-13, -165);
    ctxBack.lineTo(-3, -175);
    ctxBack.lineTo(0, 30);
    ctxBack.stroke();
    ctxBack.closePath();
    ctxBack.restore();
  }
  // 绘制分针
  function drawMinPin () {
    ctxBack.save();
    ctxBack.translate(250, 250);
    ctxBack.rotate(minutes * 6 * Math.PI / 180);
    ctxBack.beginPath();
    ctxBack.strokeStyle = '#20B2AA';
    ctxBack.lineWidth = 1;
    ctxBack.lineJoin = "bevel";
    ctxBack.miterLimit = 10;
    ctxBack.moveTo(0, 20);
    ctxBack.lineTo(3, -145);
    ctxBack.lineTo(10, -135);
    ctxBack.lineTo(0, -180);
    ctxBack.lineTo(-10, -135);
    ctxBack.lineTo(-3, -145);
    ctxBack.lineTo(0, 20);
    ctxBack.stroke();
    ctxBack.closePath();
    ctxBack.restore();
  }
  // 绘制时针
  function drawHouPin () {
    ctxBack.save();
    ctxBack.translate(250, 250);
    ctxBack.rotate(hour * 30 * Math.PI / 180);
    ctxBack.beginPath();
    ctxBack.strokeStyle = '#87CEFA';
    ctxBack.lineWidth = 1;
    ctxBack.lineJoin = "bevel";
    ctxBack.miterLimit = 10;
    ctxBack.moveTo(0, 20);
    ctxBack.lineTo(3, -110);
    ctxBack.lineTo(10, -100);
    ctxBack.lineTo(0, -150);
    ctxBack.lineTo(-10, -100);
    ctxBack.lineTo(-3, -110);
    ctxBack.lineTo(0, 20);
    ctxBack.stroke();
    ctxBack.closePath();
    ctxBack.restore();
  }

  function setPoint () {
    ctxBack.beginPath();
    ctxBack.fillStyle = 'black';
    ctxBack.arc(250, 250, 3, 0, 2 * Math.PI);
    ctxBack.stroke();
  }

  function showBack () {
    for (let i = 0; i < 60; i++) {
      ctxBack.save();
      ctxBack.translate(250, 250);
      ctxBack.rotate(i / 60 * 2 * Math.PI);
      ctxBack.beginPath();
      ctxBack.strokeStyle = '#7FFFD4';
      ctxBack.moveTo(0, -250);
      ctxBack.lineWidth = i % 5 == 0 ? 5 : 2;
      ctxBack.lineTo(0, -230);
      ctxBack.stroke();
      ctxBack.closePath();
      ctxBack.restore();
    }
    ctxBack.beginPath();
    ctxBack.arc(250, 250, 230, 0, 2 * Math.PI);
    ctxBack.stroke();
  }

  function degToRad (degree) {
    let result;
    let factor = Math.PI / 180;
    if (degree == 0) {
      result = 270 * factor;
    } else {
      result = degree * factor;
    }
    return result;
  }

  function showTime () {
    let now = new Date();
    let today = now.toLocaleDateString();
    let time = now.toLocaleTimeString();
    let day = now.getDay();
    let hrs = now.getHours();
    let min = now.getMinutes();
    let sec = now.getSeconds();
    let mil = now.getMilliseconds();
    let smoothsec = sec + (mil / 1000);
    let smoothmin = min + (smoothsec / 60);
    let hours = hrs + (smoothmin / 60);
    milliseconds = smoothsec;
    minutes = smoothmin;
    hour = hours;
    switch (day) {
      case 1:
        date = '一'
        break;
      case 2:
        date = '二'
        break;
      case 3:
        date = '三'
        break;
      case 4:
        date = '四'
        break;
      case 5:
        date = '五'
        break;
      case 6:
        date = '六'
        break;
      case 0:
        date = '日'
        break;
    }
    //Background
    const gradient = ctx.createRadialGradient(250, 250, 5, 250, 250, 300);
    gradient.addColorStop(0, "#03303a");
    gradient.addColorStop(1, "#03303a");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, props.width, props.height);
    //Hours
    ctx.beginPath();
    ctx.strokeStyle = '#87CEFA';
    ctx.arc(250, 250, 215, degToRad(0), degToRad((hours * 30) - 90));
    ctx.stroke();
    //Minutes
    ctx.beginPath();
    ctx.strokeStyle = '#20B2AA';
    ctx.arc(250, 250, 220, degToRad(0), degToRad(smoothmin * 6 - 90));
    ctx.stroke();
    //Seconds
    ctx.beginPath();
    ctx.strokeStyle = '#AFEEEE';
    ctx.arc(250, 250, 225, degToRad(0), degToRad(smoothsec * 6 - 90));
    ctx.stroke();
    //Date
    ctx.font = "25px Helvetica Bold";
    ctx.fillStyle = '#7FFFD4';
    ctx.fillText(today + "/星期" + date, 150, 230);
    //Time
    ctx.font = "23px Helvetica Bold";
    ctx.fillStyle = '#7FFFD4';
    //ctx.fillText(time+":"+mil, 160, 280);
    ctx.fillText(time, 190, 280);
  }
  setInterval(pageInit, 60);
})

</script>

<template>
   <canvas id="canvas" :width="width" :height="height"></canvas>
</template>

<style scoped lang="scss">
</style>
