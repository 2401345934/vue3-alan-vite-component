class DigitScroll {
  constructor(options) {
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
  roll(num) {
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
export default DigitScroll