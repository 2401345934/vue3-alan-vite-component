import { ref, onMounted, openBlock, createElementBlock, createElementVNode, Fragment, renderList } from "vue";
var starrySky_vue_vue_type_style_index_0_scoped_true_lang = "";
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _hoisted_1$1 = { class: "starry-sky-bg" };
const _hoisted_2$1 = { class: "stars" };
const _sfc_main$1 = {
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
        createElementVNode("div", _hoisted_2$1, [
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
};
var StarrySky = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-2e7b542e"]]);
StarrySky.install = (App) => {
  App.component(StarrySky.__name, StarrySky);
};
var digitalScroll_vue_vue_type_style_index_0_scoped_true_lang = "";
const _hoisted_1 = { class: "starry-sky-bg" };
const _hoisted_2 = { class: "stars" };
const _sfc_main = {
  __name: "digital-scroll",
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
      return openBlock(), createElementBlock("div", _hoisted_1, [
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
};
var DigitalScroll = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-7f718d13"]]);
DigitalScroll.install = (App) => {
  App.component(DigitalScroll.__name, DigitalScroll);
};
const components = [StarrySky, DigitalScroll];
const install = (App) => {
  components.forEach((item) => {
    App.component(item.__name, item);
  });
};
var index = { install };
export { DigitalScroll, StarrySky, index as default };
