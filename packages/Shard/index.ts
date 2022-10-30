
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
        const ele = document.createElement('div');
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


const useThrottle = throttle
const useGetScrollPosition = getScrollPosition
const useScrollToTop = scrollToTop
const useDigitScroll = DigitScroll
const useRandomRgbColor = randomRgbColor

export { useThrottle, useGetScrollPosition, useScrollToTop, useRandomRgbColor, useDigitScroll }

