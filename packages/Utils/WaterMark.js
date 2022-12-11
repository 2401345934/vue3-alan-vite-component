class WaterMark {
  //水印文字
  waterTexts = []
  //需要添加水印的dom集合
  needAddWaterTextElementIds = null
  //保存添加水印的dom
  saveNeedAddWaterMarkElement = []
  //初始化
  constructor(waterTexts, needAddWaterTextElementIds) {
    if (waterTexts && waterTexts.length != 0) {
      this.waterTexts = waterTexts
    } else {
      this.waterTexts = ['水印文字哈哈哈哈', '2022-12-08']
    }
    this.needAddWaterTextElementIds = Array.isArray(needAddWaterTextElementIds) ? needAddWaterTextElementIds : [needAddWaterTextElementIds]
  }

  //开始添加水印
  startWaterMark () {
    const self = this
    if (this.needAddWaterTextElementIds) {
      this.needAddWaterTextElementIds.forEach((id) => {
        let el = document.getElementById(id)
        self.saveNeedAddWaterMarkElement.push(el)
      })
    } else {
      this.saveNeedAddWaterMarkElement = Array.from(document.getElementsByTagName('img'))
    }
    this.saveNeedAddWaterMarkElement.forEach((el) => {
      self.startWaterMarkToElement(el)
    })
  }

  //添加水印到到dom对象
  startWaterMarkToElement (el) {
    let nodeName = el.nodeName
    if (['IMG', 'img'].indexOf(nodeName) != -1) {
      //图片，需要加载完成进行操作
      this.addWaterMarkToImg(el)
    } else {
      //普通，直接添加
      this.addWaterMarkToNormalEle(el)
    }
  }

  //给图片添加水印
  async addWaterMarkToImg (img) {
    if (!img.complete) {
      await new Promise((resolve) => {
        img.onload = resolve
      })
    }
    this.addWaterMarkToNormalEle(img)
  }

  //给普通dom对象添加水印
  addWaterMarkToNormalEle (el) {
    const self = this
    let canvas = document.createElement('canvas')
    canvas.width = el.width ? el.width : el.clientWidth
    canvas.height = el.height ? el.height : el.clientHeight
    let ctx = canvas.getContext('2d')
    let maxSize = Math.max(canvas.height, canvas.width)
    let font = (maxSize / 25)
    ctx.font = font + 'px "微软雅黑"'
    ctx.fillStyle = "rgba(195,195,195,1)"
    ctx.textAlign = "left"
    ctx.textBaseline = "top"
    ctx.save()
    let angle = -Math.PI / 10.0
    //进行平移，计算平移的参数
    let translateX = (canvas.height) * Math.tan(Math.abs(angle))
    let translateY = (canvas.width - translateX) * Math.tan(Math.abs(angle))
    ctx.translate(-translateX / 2.0, translateY / 2.0)
    ctx.rotate(angle)
    //起始坐标
    let x = 0
    let y = 0
    //一组文字之间间隔
    let sepY = (font / 2.0)
    while (y < canvas.height) {
      //当前行的y值
      let rowCurrentMaxY = 0
      while (x < canvas.width) {
        let totleMaxX = 0
        let currentY = 0
        //绘制水印
        this.waterTexts.forEach((text, index) => {
          currentY += (index * (sepY + font))
          let rect = self.drawWater(ctx, text, x, y + currentY)
          let currentMaxX = (rect.x + rect.width)
          totleMaxX = (currentMaxX > totleMaxX) ? currentMaxX : totleMaxX
          rowCurrentMaxY = currentY
        })
        x = totleMaxX + 20
      }
      //重置x，y值
      x = 0
      y += (rowCurrentMaxY + (sepY + font + (canvas.height / 5)))
    }
    ctx.restore()
    //添加canvas
    this.addCanvas(canvas, el)
  }

  //绘制水印
  drawWater (ctx, text, x, y) {
    //绘制文字
    ctx.fillText(text, x, y)
    //计算尺度
    let textRect = ctx.measureText(text)
    let width = textRect.width
    let height = textRect.height
    return { x, y, width, height }
  }

  //添加canvas到当前标签的父标签上
  addCanvas (canvas, el) {
    //创建div(canvas需要依赖一个div进行位置设置)
    let warterMarDiv = document.createElement('div')
    //关联水印dom对象
    el.warterMark = warterMarDiv
    //添加样式
    this.resetCanvasPosition(el)
    //添加水印
    warterMarDiv.appendChild(canvas)
    //添加到父标签
    el.parentElement.insertBefore(warterMarDiv, el)
  }

  //重新计算位置
  resetCanvasPosition (el) {
    if (el.warterMark) {
      //设置父标签的定位
      el.parentElement.style.cssText = `position: relative;`
      //设施水印载体的定位
      el.warterMark.style.cssText = 'position: absolute;top: 0px;left: 0px;pointer-events:none'
    }
  }
}

export default WaterMark