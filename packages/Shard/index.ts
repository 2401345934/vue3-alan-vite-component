
class RecordingVideo {
  // 播放时长
  duration = 0
  // 录制流媒体
  mediaRecorder
  // 录制的数据
  recordedBlobs
  // 倒计时interlval
  intervalId
  // 摄像头流媒体
  stream
  // 录制时长
  maxD = 15
  // 倒计时初始值
  count = 15
  // 页面dom
  gumVideo: any = document.querySelector('#gum')
  gumVideo2: any = document.querySelector('#gum2')
  recordButton: any = document.querySelector('#record')
  playButton: any = document.querySelector('#play')
  downloadButton: any = document.querySelector('#download')
  tEL: any = document.getElementById('tEl')
  constructor() {
    const constraints = {
      audio: true,
      video: {
        facingMode: "user",
        width: 400,//视频宽度
        height: 400,//视频高度
        frameRate: 60,//每秒60帧
      }
    }
    const isSecureOrigin = location.protocol === 'https:' || location.hostname === 'localhost'
    if (!isSecureOrigin) {
      alert('getUserMedia() 必须在https或localhost下使用')
      location.protocol = 'HTTPS'
    }
    this.recordButton.onclick = () => this.toggleRecording()
    this.playButton.onclick = () => this.play()
    this.downloadButton.onclick = () => this.download()
    this.gumVideo2.width = constraints.video.width
    this.gumVideo2.height = constraints.video.height
    // 获取摄像头流媒体
    this.getUserMedia(constraints, (stream) => {
      // 摄像头流媒体成功回调
      this.recordButton.disabled = false
      this.stream = stream
      this.gumVideo.srcObject = stream
    }, (error) => {
      // 摄像头流媒体失败回调
      if (error.message === 'Permission denied') {
        alert('您已经禁止使用摄像头，请到设置-通用-微信存储空间-管理微信存储空间-点击‘清理其他微信账号聊天数据’')
      }
      console.log('navigator.getUserMedia error: ', error)
    })

  }
  // 获取摄像头流媒体
  getUserMedia(constraints, success, error) {
    const navigator: any = window.navigator
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      //最新的标准API
      navigator.mediaDevices.getUserMedia(constraints).then(success).catch(error)
    } else if (navigator.webkitGetUserMedia) {
      //webkit核心浏览器
      navigator.webkitGetUserMedia(constraints, success, error)
    } else if (navigator.mozGetUserMedia) {
      //firfox浏览器
      navigator.mozGetUserMedia(constraints, success, error)
    } else if (navigator.getUserMedia) {
      //旧版API
      navigator.getUserMedia(constraints, success, error)
    }
  }
  // 开始录制的事件
  toggleRecording() {
    const tEl = this.tEL
    if (this.recordButton.textContent === '开始录制') {
      tEl.innerHTML = ''
      this.startRecording()
      clearInterval(this.intervalId)
      tEl.innerHTML = '剩余时间：' + this.count + '秒'
      this.count--
      this.intervalId = setInterval(() => {
        tEl.innerHTML = '剩余时间：' + this.count + '秒'
        if (this.count <= 0) {
          clearInterval(this.intervalId)
          this.duration = this.maxD - this.count
          this.count = this.maxD
          this.stopRecording()
          this.recordButton.textContent = '开始录制'
          this.downloadButton.disabled = false
          this.playButton.disabled = false
        } else {
          this.count--
        }

      }, 1000)
    } else {
      clearInterval(this.intervalId)

      this.duration = this.maxD - this.count
      this.count = this.maxD
      this.stopRecording()
      this.recordButton.textContent = '开始录制'
      this.playButton.disabled = false
      this.downloadButton.disabled = false
    }
  }
  // 开始录制
  startRecording() {
    const isSafari = !(!(/Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent)))

    this.recordedBlobs = []
    const options = {
      audioBitsPerSecond: 128000,
      videoBitsPerSecond: 2500000,
      mimeType: isSafari ? 'video/mp4' : 'video/webm'
    }
    try {
      this.mediaRecorder = new MediaRecorder(this.stream, options)
    } catch (e) {
      alert('MediaRecorder创建失败: ' + e + '. mimeType: ' + options.mimeType)
      return
    }
    this.recordButton.textContent = '结束录制'
    this.downloadButton.disabled = true
    this.playButton.disabled = true

    // 录制中
    this.mediaRecorder.ondataavailable = event => {
      if (event.data && event.data.size > 0) {
        this.recordedBlobs.push(event.data)
      }
    }
    // 录制结束回调
    this.mediaRecorder.onstop = event => {
      console.log('Recorder stopped: ', event)
    }
    // 开始录制
    this.mediaRecorder.start(10);
  }
  // 停止录制
  stopRecording() {
    tEl.innerHTML = '录制完成'
    this.mediaRecorder.stop()
  }
  // 下载视频
  download() {
    const blob = new Blob(this.recordedBlobs, { type: 'video/mp4' })
    const a = document.createElement('a')
    a.setAttribute('download', Date.now() + '.mp4')
    a.href = URL.createObjectURL(blob)
    a.click()
  }
  // 点击播放
  play() {
    const { recordedBlobs, gumVideo2 } = this
    const blob = new Blob(recordedBlobs, { type: 'video/mp4' })
    const size = parseInt(blob.size / 1024)
    let strSize = ''
    if (size < 1024) {
      strSize = size + 'KB'
    } else {
      strSize = (size / 1024).toFixed(2) + 'MB'
    }
    alert('播放时长：' + this.duration + '秒, 大小：' + strSize)
    const videoURL = URL.createObjectURL(blob)
    gumVideo2.style.display = ''
    gumVideo2.src = videoURL

  }

}


/*
 * 节流
 * */

/**
 * 节流
 * @param   {function}  func        传入函数
 * @param   {number}    wait        表示时间窗口的间隔
 * @param   {object}    options     如果想忽略开始边界上的调用，传入{leading: false}。
 *                                  如果想忽略结尾边界上的调用，传入{trailing: false}
 * @returns {function}              返回客户调用函数   返回客户调用函数
 */
function throttle(func: Function, wait: number, options?: any) {
  let timeout
  let context
  let args
  let result
  let previous = 0
  options = options || {}
  // 延时执行函数
  let later = function () {
    let now = new Date().getTime()
    // 首次执行时，如果设定了开始边界不执行选项，将上次执行时间设定为当前时间。
    previous = options.leading === false ? 0 : now
    timeout = null
    result = func.apply(context, args)
    if (!timeout) context = args = null
  }
  return function () {
    context = this
    // eslint-disable-next-line prefer-rest-params
    args = arguments
    let now = new Date().getTime()
    if (!previous && options.leading === false) previous = now
    let remaining = wait - (now - previous)
    // 延迟时间间隔remaining小于等于0，表示上次执行至此所间隔时间已经超过一个时间窗口
    // remaining大于时间窗口wait，表示客户端系统时间被调整过
    if (remaining <= 0 || remaining > wait) {
      clearTimeout(timeout)
      timeout = null
      previous = now
      result = func.apply(context, args)
      if (!timeout) context = args = null
      // 如果延迟执行不存在，且没有设定结尾边界不执行选项
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining)
    }
    return result
  }
}


// 平滑返回顶部
const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 8);
  }
};
// 获取距离顶部的距离
const getScrollPosition = (el: any = window) => ({
  x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
  y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop
});


class DigitScroll {
  container: any
  rollHeight: number
  numberArr: any[]
  constructor(options: { container: string }) {
    //获取容器的DOM，没有则抛出错误
    this.container = document.querySelector(options.container);
    if (!this.container) {
      throw Error('no container');
    }
    this.container.style.overflow = 'hidden';
    this.container.style.display = 'flex';
    //可视容器高度 也是滚动间隔距离,容器要设置高度，否则默认30px
    this.rollHeight = parseInt(getComputedStyle(this.container).height) || 30;
    this.container.style.height = this.rollHeight + 'px';
  }
  roll(num: number) {
    // 将传入的要滚动的数字拆分后初始化每一位数字的容器
    this.initDigitEle(num);
    const numEles = this.container.querySelectorAll('.single-num');
    // 遍历生成每一位数字的滚动队列，如滚动到7，则生成内容为0，1，2，3，4，5，6，7的7个div，用于滚动动画
    [...numEles].forEach((numEle, index) => {
      const curNum = 0;
      let targetNum = Number(this.numberArr[index]);
      if (curNum >= targetNum) {
        targetNum = targetNum + 10;
      }
      let cirNum = curNum;
      // 文档碎片，拼凑好后一次性插入节点中
      const fragment = document.createDocumentFragment();
      // 生成从0到目标数字对应的div
      while (targetNum >= cirNum) {
        const ele: any = document.createElement('div');
        ele.innerHTML = cirNum % 10;
        cirNum++;
        fragment.appendChild(ele);
      }
      numEle.innerHTML = '';
      numEle.appendChild(fragment);
      //重置位置
      numEle.style.cssText += '-webkit-transition-duration:0s;-webkit-transform:translateY(0)';
      setTimeout(() => {
        numEle.style.cssText += `-webkit-transition-duration:1s;-webkit-transform:translateY(${-(targetNum - curNum) * this.rollHeight
          }px);`;
      }, 50);
    });
  }
  // 初始化容器
  initDigitEle(num) {
    // 数字拆分位数
    const numArr = num.toString().split('');
    // 文档碎片，拼凑好后一次性插入节点中
    const fragment = document.createDocumentFragment();
    numArr.forEach((item) => {
      const el = document.createElement('div');
      // 数字是要滚动的，非数字如.是不滚动的
      if (/[0-9]/.test(item)) {
        el.className = 'single-num';
        el.style.height = this.rollHeight + 'px';
        el.style.lineHeight = this.rollHeight + 'px';
      } else {
        el.innerHTML = item;
        el.className = 'no-move';
        el.style.verticalAlign = 'bottom';
      }
      // el.style.float='left';
      fragment.appendChild(el);
    }, []);
    this.container.innerHTML = '';
    this.container.appendChild(fragment);
    // 存储滚动的数字
    this.numberArr = numArr.filter((item) => /[0-9]/.test(item));
  }
}

function randomRgbColor(): string {
  const r = Math.floor(Math.random() * 256); //随机生成256以内r值
  const g = Math.floor(Math.random() * 256); //随机生成256以内g值
  const b = Math.floor(Math.random() * 256); //随机生成256以内b值
  return `rgb(${r},${g},${b})`; //返回rgb(r,g,b)格式颜色
}

// 图片合并
class DrawImage {
  images = {}
  cvs
  ctx
  renderList
  bl = 2
  constructor(config) {
    this.cvs = config.el
    this.bl = config.bl
    this.ctx = this.cvs.getContext('2d')
    this.cvs.width = this.cvs.width * this.bl
    this.cvs.height = this.cvs.height * this.bl
    this.renderList = config.renderList
    this.draw()
  }
  // 绘制函数
  async draw() {
    const { ctx, renderList } = this
    const urls = renderList.filter(v => v.type === 'image').map(v => v.src)
    await this.loadImgs(urls)
    renderList.forEach(v => {
      v.align && (ctx.textAlign = v.align)
      if (v.type === 'image') {
        ctx.beginPath()
        ctx.save()
        if (v.clipCircle) {
          ctx.lineWidth = v.clipLineWidth
          ctx.strokeStyle = v.clipStrokeStyle
          ctx.arc((v.x + v.width / 2) * this.bl, (v.y + v.width / 2) * this.bl, v.width / 2 * this.bl, 0, Math.PI * 2)
          ctx.stroke()
          ctx.clip()
        }

        ctx.drawImage(this.images[v.src], v.x * this.bl, v.y * this.bl, v.width * this.bl, v.height * this.bl)
        ctx.restore()
      } else if (v.type === 'text') {
        ctx.fillStyle = v.fillStyle
        ctx.font = `${v.fontSize * this.bl}px 宋体`
        ctx.fillText(v.text, v.x * this.bl, v.y * this.bl)
      }
    })
  }
  // 加载多张图
  async loadImgs(urls) {
    for (let i = 0; i < urls.length; i++) {
      await this.loadImg(urls[i])
    }
  }
  // 加载单张图
  async loadImg(url) {
    return new Promise((resolve, reject): void => {
      const img = new Image()
      img.src = url
      img.onload = () => {
        this.images[url] = img
        resolve(img)
      }
    })
  }
}

const useThrottle = throttle
const useGetScrollPosition = getScrollPosition
const useScrollToTop = scrollToTop
const useDigitScroll = DigitScroll
const useRandomRgbColor = randomRgbColor
const useRecordingVideo = RecordingVideo
const useDrawImage = DrawImage

export { useThrottle, useGetScrollPosition, useScrollToTop, useRandomRgbColor, useRecordingVideo, useDigitScroll, useDrawImage }



