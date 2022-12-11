<script setup  name="RedPacketRain" >
import { onMounted } from "vue"
onMounted(() => {
  const canvas = document.querySelector('.canvas');
  canvas.width = '400';
  canvas.height = '400'
  const cwidth = canvas.width;
  if (canvas.getContext) {
    const ctx = canvas.getContext('2d');
    // 生成对象的类
    class Ball {
      constructor(speedX, speedY, x, y, boxWidth, boxHeight, width = 50, height = 50, color = 'red') {
        this.speedY = speedY; //初始速度
        this.speedX = speedX; //初始速度
        this.x = x; //圆出现的x轴坐标
        this.y = y; //圆出现的的y坐标
        this.boxWidth = boxWidth;
        this.boxHeight = boxHeight;
        this.width = width;
        this.height = height;
        this.color = color;
      }

      draw () {
        ctx.strokeStyle = this.color;
        ctx.strokeRect(this.x, this.y, this.width, this.height);
      }

      move () {
        this.y += this.speedY
      }

    }


    // 红包雨数组
    let arr = []

    function start () {

      let ball = new Ball(1, 3, getRandom(0, cwidth - 50), 0, canvas.clientWidth, canvas.clientHeight)
      ball.draw()
      arr.push(ball)
      setInterval(() => {
        let ball = new Ball(1, 3, getRandom(0, cwidth - 50), 0, canvas.clientWidth, canvas.clientHeight)
        ball.draw()
        arr.push(ball)
      }, 500)
      move()
    }

    // 开始动画
    function move () {
      ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)
      for (let i = 0; i < arr.length; i++) {
        // 判断是否走出屏幕,删除此对象
        if (arr[i].y >= canvas.height) {
          arr.splice(i, 1)
          arr[i].move()
          arr[i].draw()
        } else {
          arr[i].move()
          arr[i].draw()
        }
      }
      window.requestAnimationFrame(move)
    }


    //点击开始按钮
    document.querySelector('button').onclick = start


    // 判断是否点中此红包

    document.querySelector('.canvas').onclick = function (e) {
      const clickX = e.clientX - canvas.offsetLeft
      const clickY = e.clientY - canvas.offsetTop
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].x <= clickX && arr[i].x + arr[i].width >= clickX && arr[i].y <= clickY && arr[i].y + arr[i].height >= clickY) {
          console.log(arr[i])
          arr[i].color = 'green'
          continue
        }
      }
    }

    // 随机工具
    function getRandom (min, max) {
      return Math.ceil(Math.random() * (max - min) + min)
    }

  }
})
</script>
<template>
  <button>点击开始</button>
  <canvas ref="canvas"
          class="canvas">
    浏览器版本较低
  </canvas>
</template>

<style scoped lang="scss">

</style>
