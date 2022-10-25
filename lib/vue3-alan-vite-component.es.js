import { defineComponent, ref, onMounted, openBlock, createElementBlock, createElementVNode, Fragment, renderList, normalizeClass, renderSlot } from "vue";
var starrySky_vue_vue_type_style_index_0_scoped_true_lang = "";
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _hoisted_1$1 = { class: "starry-sky-bg" };
const _hoisted_2 = { class: "stars" };
const __default__$2 = {
  alanComponentName: "StarrySky"
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  ...__default__$2,
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
      return openBlock(), createElementBlock("div", _hoisted_1$1, [
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
var StarrySky = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-63922582"]]);
StarrySky.install = (App) => {
  App.component(StarrySky.__name, StarrySky);
};
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
var digitalScroll_vue_vue_type_style_index_0_scoped_true_lang = "";
const __default__$1 = {
  alanComponentName: "DigitalScroll"
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  ...__default__$1,
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
      const DigitScrollSource = new DigitScroll({
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
var DigitalScroll = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-50e30a4e"]]);
DigitalScroll.install = (App) => {
  App.component(DigitalScroll.alanComponentName, DigitalScroll);
};
var button_vue_vue_type_style_index_0_scoped_true_lang = "";
const _hoisted_1 = ["disabled"];
const __default__ = {
  alanComponentName: "AlanButton"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
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
      ], 10, _hoisted_1);
    };
  }
});
var AlanButton = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-31590c5a"]]);
AlanButton.install = (App) => {
  App.component(AlanButton.alanComponentName, Button);
};
var index$1 = "";
const components = [StarrySky, DigitalScroll, AlanButton];
const install = (App) => {
  components.forEach((item) => {
    App.component(item.alanComponentName, item);
  });
};
var index = { install };
export { AlanButton, DigitalScroll, StarrySky, index as default };
