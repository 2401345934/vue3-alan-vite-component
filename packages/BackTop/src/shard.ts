
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
/*
 * 使用方式：useThrottle(() => {})
 * */

const useThrottle = throttle
const useGetScrollPosition = getScrollPosition
const useScrollToTop = scrollToTop

export { useThrottle, useGetScrollPosition, useScrollToTop }

