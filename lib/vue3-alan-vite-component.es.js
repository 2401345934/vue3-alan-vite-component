import { defineComponent, ref, onMounted, openBlock, createElementBlock, createElementVNode, Fragment, renderList, normalizeClass, renderSlot, useSlots, onBeforeUnmount, createCommentVNode } from "vue";
var starrySky_vue_vue_type_style_index_0_scoped_true_lang = "";
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _hoisted_1$3 = { class: "starry-sky-bg" };
const _hoisted_2 = { class: "stars" };
const __default__$4 = {
  alanComponentName: "StarrySky"
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  ...__default__$4,
  __name: "starry-sky",
  props: {
    starsCount: {
      type: Number,
      default: () => 800
    },
    distance: {
      type: Number,
      default: () => 800
    }
  },
  setup(__props) {
    const props = __props;
    const star = ref();
    onMounted(() => {
      let starArr = star.value;
      starArr.forEach((item) => {
        let speed = 0.1 + Math.random() * 1;
        let thisDistance = props.distance + Math.random() * 300;
        item.style.transformOrigin = `0 0 ${thisDistance}px`;
        item.style.transform = `translate3d(0,0,-${thisDistance}px) rotateY(${Math.random() * 360}deg) rotateX(${Math.random() * -50}deg) scale(${speed},${speed})`;
      });
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$3, [
        createElementVNode("div", _hoisted_2, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(__props.starsCount, (item) => {
            return openBlock(), createElementBlock("div", {
              key: item,
              class: "star",
              ref_for: true,
              ref_key: "star",
              ref: star
            });
          }), 128))
        ])
      ]);
    };
  }
});
var StarrySky = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-63922582"]]);
StarrySky.install = (App) => {
  App.component(StarrySky.__name, StarrySky);
};
function throttle(func, wait, options) {
  let timeout;
  let context;
  let args;
  let result;
  let previous = 0;
  options = options || {};
  let later = function() {
    let now = new Date().getTime();
    previous = options.leading === false ? 0 : now;
    timeout = null;
    result = func.apply(context, args);
    if (!timeout)
      context = args = null;
  };
  return function() {
    context = this;
    args = arguments;
    let now = new Date().getTime();
    if (!previous && options.leading === false)
      previous = now;
    let remaining = wait - (now - previous);
    if (remaining <= 0 || remaining > wait) {
      clearTimeout(timeout);
      timeout = null;
      previous = now;
      result = func.apply(context, args);
      if (!timeout)
        context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
}
const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 8);
  }
};
const getScrollPosition = (el = window) => ({
  x: el.pageXOffset !== void 0 ? el.pageXOffset : el.scrollLeft,
  y: el.pageYOffset !== void 0 ? el.pageYOffset : el.scrollTop
});
class DigitScroll {
  constructor(options) {
    this.container = document.querySelector(options.container);
    if (!this.container) {
      throw Error("no container");
    }
    this.container.style.overflow = "hidden";
    this.container.style.display = "flex";
    this.rollHeight = parseInt(getComputedStyle(this.container).height) || 30;
    this.container.style.height = this.rollHeight + "px";
  }
  roll(num) {
    this.initDigitEle(num);
    const numEles = this.container.querySelectorAll(".single-num");
    [...numEles].forEach((numEle, index2) => {
      const curNum = 0;
      let targetNum = Number(this.numberArr[index2]);
      if (curNum >= targetNum) {
        targetNum = targetNum + 10;
      }
      let cirNum = curNum;
      const fragment = document.createDocumentFragment();
      while (targetNum >= cirNum) {
        const ele = document.createElement("div");
        ele.innerHTML = cirNum % 10;
        cirNum++;
        fragment.appendChild(ele);
      }
      numEle.innerHTML = "";
      numEle.appendChild(fragment);
      numEle.style.cssText += "-webkit-transition-duration:0s;-webkit-transform:translateY(0)";
      setTimeout(() => {
        numEle.style.cssText += `-webkit-transition-duration:1s;-webkit-transform:translateY(${-(targetNum - curNum) * this.rollHeight}px);`;
      }, 50);
    });
  }
  initDigitEle(num) {
    const numArr = num.toString().split("");
    const fragment = document.createDocumentFragment();
    numArr.forEach((item) => {
      const el = document.createElement("div");
      if (/[0-9]/.test(item)) {
        el.className = "single-num";
        el.style.height = this.rollHeight + "px";
        el.style.lineHeight = this.rollHeight + "px";
      } else {
        el.innerHTML = item;
        el.className = "no-move";
        el.style.verticalAlign = "bottom";
      }
      fragment.appendChild(el);
    }, []);
    this.container.innerHTML = "";
    this.container.appendChild(fragment);
    this.numberArr = numArr.filter((item) => /[0-9]/.test(item));
  }
}
const useThrottle = throttle;
const useGetScrollPosition = getScrollPosition;
const useScrollToTop = scrollToTop;
const useDigitScroll = DigitScroll;
var digitalScroll_vue_vue_type_style_index_0_scoped_true_lang = "";
const __default__$3 = {
  alanComponentName: "DigitalScroll"
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  ...__default__$3,
  __name: "digital-scroll",
  props: {
    targetNumber: {
      type: Number,
      default: () => 300
    },
    targetClass: {
      type: String,
      default: () => "digital-scroll"
    }
  },
  setup(__props) {
    const props = __props;
    onMounted(() => {
      const DigitScrollSource = new useDigitScroll({
        container: "#digital-scroll"
      });
      DigitScrollSource.roll(props.targetNumber);
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(__props.targetClass),
        id: "digital-scroll"
      }, null, 2);
    };
  }
});
var DigitalScroll = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-35598430"]]);
DigitalScroll.install = (App) => {
  App.component(DigitalScroll.alanComponentName, DigitalScroll);
};
var button_vue_vue_type_style_index_0_scoped_true_lang = "";
const _hoisted_1$2 = ["disabled"];
const __default__$2 = {
  alanComponentName: "AlanButton"
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  ...__default__$2,
  __name: "button",
  props: {
    type: {
      type: String,
      default: "default"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    block: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("button", {
        disabled: __props.disabled,
        class: normalizeClass(["btn", __props.block && "block", __props.disabled && "disabled", __props.type])
      }, [
        renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ], 10, _hoisted_1$2);
    };
  }
});
var AlanButton = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-466500e7"]]);
AlanButton.install = (App) => {
  App.component(AlanButton.alanComponentName, Button);
};
var codeBackgroundWall_vue_vue_type_style_index_0_scoped_true_lang = "";
const _hoisted_1$1 = ["height", "width"];
const __default__$1 = {
  alanComponentName: "CodeBackgroundWall"
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  ...__default__$1,
  __name: "code-background-wall",
  props: {
    width: {
      type: Number,
      default: 300
    },
    height: {
      type: Number,
      default: 300
    },
    step: {
      type: Number,
      default: 0.02
    },
    color: {
      type: String,
      default: "green"
    }
  },
  setup(__props) {
    const props = __props;
    const cvs = ref(null);
    onMounted(() => {
      const el = cvs.value;
      el.width = props.width;
      el.height = props.height;
      const c = el.getContext("2d");
      const text = "qwertyuiopasdfghjklzxcvbnm";
      c.font = "14px \u5FAE\u8F6F\u96C5\u9ED1";
      const bl = 20;
      const startRates = {};
      const rates = {};
      const endRates = {};
      const textObj = {};
      const animate = () => {
        c.clearRect(0, 0, props.width, props.height);
        for (let i = 0; i < props.width; i += bl) {
          c.beginPath();
          const gradient = c.createLinearGradient(0, 0, 0, props.height);
          const s1 = 0.2 * Math.random();
          const s2 = 0.8 * Math.random();
          const step = props.step;
          rates[i] = rates[i] || -s1;
          startRates[i] = startRates[i] || s2;
          endRates[i] = endRates[i] || 0;
          gradient.addColorStop(startRates[i] < 0 ? 0 : startRates[i], "#000");
          gradient.addColorStop(rates[i] < 0 ? 0 : rates[i], props.color);
          gradient.addColorStop(endRates[i], "#000");
          c.fillStyle = gradient;
          for (let j = 0; j < props.height; j += bl) {
            textObj[`${i}-${j}`] = textObj[`${i}-${j}`] || text[parseInt(Math.random() * text.length)];
            c.fillText(textObj[`${i}-${j}`], i, j);
          }
          startRates[i] += step;
          rates[i] += step;
          endRates[i] += step;
          if (startRates[i] > 1) {
            startRates[i] = -s2;
          }
          if (rates[i] > 1) {
            if (startRates[i] === -s2) {
              rates[i] = -s1;
            } else {
              rates[i] = 1;
            }
          }
          if (endRates[i] > 1) {
            if (rates[i] === -s1 && startRates[i] === -s2) {
              endRates[i] = step;
            } else {
              endRates[i] = 1;
            }
          }
        }
        requestAnimationFrame(animate);
      };
      animate();
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("canvas", {
        ref_key: "cvs",
        ref: cvs,
        id: "cvs",
        height: __props.height,
        width: __props.width,
        class: "cvs"
      }, null, 8, _hoisted_1$1);
    };
  }
});
var CodeBackgroundWall = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-377a0a92"]]);
CodeBackgroundWall.install = (App) => {
  App.component(CodeBackgroundWall.alanComponentName, CodeBackgroundWall);
};
var backTop_vue_vue_type_style_index_0_scoped_true_lang = "";
const _hoisted_1 = {
  key: 0,
  class: "alan-back-top-content"
};
const __default__ = {
  alanComponentName: "AlanBackTop"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  __name: "back-top",
  props: {
    visibilityHeight: {
      type: Number,
      default: 400
    }
  },
  emits: ["goTopCompleteCb"],
  setup(__props, { emit: parentEmits }) {
    const props = __props;
    const slotDefault = !!useSlots().default;
    const visibilityH = ref(false);
    onMounted(() => {
      window.addEventListener("scroll", useThrottle(() => {
        scrollLoadMore();
      }, 250));
    });
    onBeforeUnmount(() => {
      window.removeEventListener("scroll", () => {
      });
    });
    const handleBackTop = () => {
      useScrollToTop();
      parentEmits("goTopCompleteCb");
    };
    const scrollLoadMore = () => {
      visibilityH.value = useGetScrollPosition().y >= props.visibilityHeight;
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "alan-back-top",
        onClick: handleBackTop
      }, [
        createElementVNode("div", {
          class: normalizeClass(["warp", visibilityH.value && "visibilityH"])
        }, [
          !slotDefault ? (openBlock(), createElementBlock("div", _hoisted_1, " \u8FD4\u56DE ")) : createCommentVNode("", true),
          renderSlot(_ctx.$slots, "default", {}, void 0, true)
        ], 2)
      ]);
    };
  }
});
var BackTop = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-7ec40d52"]]);
BackTop.install = (App) => {
  App.component(BackTop.alanComponentName, BackTop);
};
var index$1 = "";
const components = [StarrySky, DigitalScroll, AlanButton, CodeBackgroundWall, BackTop];
const install = (App) => {
  components.forEach((item) => {
    App.component(item.alanComponentName, item);
  });
};
var index = { install };
export { BackTop as AlanBackTop, AlanButton, CodeBackgroundWall, DigitalScroll, StarrySky, index as default };