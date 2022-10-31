import { defineComponent, ref, onMounted, openBlock, createElementBlock, createElementVNode, Fragment, renderList, normalizeClass, renderSlot, useSlots, onBeforeUnmount, createCommentVNode, normalizeStyle, toDisplayString, reactive, unref, withDirectives, vShow, createTextVNode, pushScopeId, popScopeId, createStaticVNode } from "vue";
var starrySky_vue_vue_type_style_index_0_scoped_true_lang = "";
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _hoisted_1$8 = { class: "starry-sky-bg" };
const _hoisted_2$4 = { class: "stars" };
const __default__$8 = {
  alanComponentName: "StarrySky"
};
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  ...__default__$8,
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
      return openBlock(), createElementBlock("div", _hoisted_1$8, [
        createElementVNode("div", _hoisted_2$4, [
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
var StarrySky = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__scopeId", "data-v-63922582"]]);
StarrySky.install = (App) => {
  App.component(StarrySky.__name, StarrySky);
};
class RecordingVideo {
  constructor() {
    this.duration = 0;
    this.maxD = 15;
    this.count = 15;
    this.gumVideo = document.querySelector("#gum");
    this.gumVideo2 = document.querySelector("#gum2");
    this.recordButton = document.querySelector("#record");
    this.playButton = document.querySelector("#play");
    this.downloadButton = document.querySelector("#download");
    this.tEL = document.getElementById("tEl");
    const constraints = {
      audio: true,
      video: {
        facingMode: "user",
        width: 400,
        height: 400,
        frameRate: 60
      }
    };
    const isSecureOrigin = location.protocol === "https:" || location.hostname === "localhost";
    if (!isSecureOrigin) {
      alert("getUserMedia() \u5FC5\u987B\u5728https\u6216localhost\u4E0B\u4F7F\u7528");
      location.protocol = "HTTPS";
    }
    this.recordButton.onclick = () => this.toggleRecording();
    this.playButton.onclick = () => this.play();
    this.downloadButton.onclick = () => this.download();
    this.gumVideo2.width = constraints.video.width;
    this.gumVideo2.height = constraints.video.height;
    this.getUserMedia(constraints, (stream) => {
      this.recordButton.disabled = false;
      this.stream = stream;
      this.gumVideo.srcObject = stream;
    }, (error) => {
      if (error.message === "Permission denied") {
        alert("\u60A8\u5DF2\u7ECF\u7981\u6B62\u4F7F\u7528\u6444\u50CF\u5934\uFF0C\u8BF7\u5230\u8BBE\u7F6E-\u901A\u7528-\u5FAE\u4FE1\u5B58\u50A8\u7A7A\u95F4-\u7BA1\u7406\u5FAE\u4FE1\u5B58\u50A8\u7A7A\u95F4-\u70B9\u51FB\u2018\u6E05\u7406\u5176\u4ED6\u5FAE\u4FE1\u8D26\u53F7\u804A\u5929\u6570\u636E\u2019");
      }
      console.log("navigator.getUserMedia error: ", error);
    });
  }
  getUserMedia(constraints, success, error) {
    const navigator2 = window.navigator;
    if (navigator2.mediaDevices && navigator2.mediaDevices.getUserMedia) {
      navigator2.mediaDevices.getUserMedia(constraints).then(success).catch(error);
    } else if (navigator2.webkitGetUserMedia) {
      navigator2.webkitGetUserMedia(constraints, success, error);
    } else if (navigator2.mozGetUserMedia) {
      navigator2.mozGetUserMedia(constraints, success, error);
    } else if (navigator2.getUserMedia) {
      navigator2.getUserMedia(constraints, success, error);
    }
  }
  toggleRecording() {
    const tEl2 = this.tEL;
    if (this.recordButton.textContent === "\u5F00\u59CB\u5F55\u5236") {
      tEl2.innerHTML = "";
      this.startRecording();
      clearInterval(this.intervalId);
      tEl2.innerHTML = "\u5269\u4F59\u65F6\u95F4\uFF1A" + this.count + "\u79D2";
      this.count--;
      this.intervalId = setInterval(() => {
        tEl2.innerHTML = "\u5269\u4F59\u65F6\u95F4\uFF1A" + this.count + "\u79D2";
        if (this.count <= 0) {
          clearInterval(this.intervalId);
          this.duration = this.maxD - this.count;
          this.count = this.maxD;
          this.stopRecording();
          this.recordButton.textContent = "\u5F00\u59CB\u5F55\u5236";
          this.downloadButton.disabled = false;
          this.playButton.disabled = false;
        } else {
          this.count--;
        }
      }, 1e3);
    } else {
      clearInterval(this.intervalId);
      this.duration = this.maxD - this.count;
      this.count = this.maxD;
      this.stopRecording();
      this.recordButton.textContent = "\u5F00\u59CB\u5F55\u5236";
      this.playButton.disabled = false;
      this.downloadButton.disabled = false;
    }
  }
  startRecording() {
    const isSafari = !!(/Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent));
    this.recordedBlobs = [];
    const options = {
      audioBitsPerSecond: 128e3,
      videoBitsPerSecond: 25e5,
      mimeType: isSafari ? "video/mp4" : "video/webm"
    };
    try {
      this.mediaRecorder = new MediaRecorder(this.stream, options);
    } catch (e) {
      alert("MediaRecorder\u521B\u5EFA\u5931\u8D25: " + e + ". mimeType: " + options.mimeType);
      return;
    }
    this.recordButton.textContent = "\u7ED3\u675F\u5F55\u5236";
    this.downloadButton.disabled = true;
    this.playButton.disabled = true;
    this.mediaRecorder.ondataavailable = (event) => {
      if (event.data && event.data.size > 0) {
        this.recordedBlobs.push(event.data);
      }
    };
    this.mediaRecorder.onstop = (event) => {
      console.log("Recorder stopped: ", event);
    };
    this.mediaRecorder.start(10);
  }
  stopRecording() {
    tEl.innerHTML = "\u5F55\u5236\u5B8C\u6210";
    this.mediaRecorder.stop();
  }
  download() {
    const blob = new Blob(this.recordedBlobs, { type: "video/mp4" });
    const a = document.createElement("a");
    a.setAttribute("download", Date.now() + ".mp4");
    a.href = URL.createObjectURL(blob);
    a.click();
  }
  play() {
    const { recordedBlobs, gumVideo2 } = this;
    const blob = new Blob(recordedBlobs, { type: "video/mp4" });
    const size = parseInt(blob.size / 1024);
    let strSize = "";
    if (size < 1024) {
      strSize = size + "KB";
    } else {
      strSize = (size / 1024).toFixed(2) + "MB";
    }
    alert("\u64AD\u653E\u65F6\u957F\uFF1A" + this.duration + "\u79D2, \u5927\u5C0F\uFF1A" + strSize);
    const videoURL = URL.createObjectURL(blob);
    gumVideo2.style.display = "";
    gumVideo2.src = videoURL;
  }
}
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
function randomRgbColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r},${g},${b})`;
}
const useThrottle = throttle;
const useGetScrollPosition = getScrollPosition;
const useScrollToTop = scrollToTop;
const useDigitScroll = DigitScroll;
const useRandomRgbColor = randomRgbColor;
const useRecordingVideo = RecordingVideo;
var digitalScroll_vue_vue_type_style_index_0_scoped_true_lang = "";
const __default__$7 = {
  alanComponentName: "DigitalScroll"
};
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  ...__default__$7,
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
var DigitalScroll = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-35598430"]]);
DigitalScroll.install = (App) => {
  App.component(DigitalScroll.alanComponentName, DigitalScroll);
};
var button_vue_vue_type_style_index_0_scoped_true_lang = "";
const _hoisted_1$7 = ["disabled"];
const __default__$6 = {
  alanComponentName: "AlanButton"
};
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  ...__default__$6,
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
      ], 10, _hoisted_1$7);
    };
  }
});
var AlanButton = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-466500e7"]]);
AlanButton.install = (App) => {
  App.component(AlanButton.alanComponentName, Button);
};
var codeBackgroundWall_vue_vue_type_style_index_0_scoped_true_lang = "";
const _hoisted_1$6 = ["height", "width"];
const __default__$5 = {
  alanComponentName: "CodeBackgroundWall"
};
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  ...__default__$5,
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
      }, null, 8, _hoisted_1$6);
    };
  }
});
var CodeBackgroundWall = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-377a0a92"]]);
CodeBackgroundWall.install = (App) => {
  App.component(CodeBackgroundWall.alanComponentName, CodeBackgroundWall);
};
var backTop_vue_vue_type_style_index_0_scoped_true_lang = "";
const _hoisted_1$5 = {
  key: 0,
  class: "alan-back-top-content"
};
const __default__$4 = {
  alanComponentName: "AlanBackTop"
};
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  ...__default__$4,
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
          !slotDefault ? (openBlock(), createElementBlock("div", _hoisted_1$5, " \u8FD4\u56DE ")) : createCommentVNode("", true),
          renderSlot(_ctx.$slots, "default", {}, void 0, true)
        ], 2)
      ]);
    };
  }
});
var BackTop = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-7ec40d52"]]);
BackTop.install = (App) => {
  App.component(BackTop.alanComponentName, BackTop);
};
var dynamicCard_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$4 = {
  alanComponentName: "DynamicCard",
  props: {
    cardList: {
      type: Array,
      default: []
    },
    shape: {
      type: Number,
      default: 1
    },
    isKeyboardControl: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      activeIndex: -1,
      cards: []
    };
  },
  watch: {
    shape: function() {
      this.initData();
    }
  },
  created() {
    this.initData();
  },
  mounted() {
    this.isKeyboardControl && window.addEventListener("keyup", this.keyboardDeal);
  },
  unmounted() {
    this.isKeyboardControl && window.removeEventListener("keyup", this.keyboardDeal);
  },
  methods: {
    initData() {
      const arr = new Array(this.cardList.length).fill(1);
      this.cards = arr.map((_, index2) => {
        return this.computedStyle(index2, this.cardList.length || 0);
      });
    },
    resetData(style) {
      this.style = style;
      this.initData();
    },
    computedStyle(index2, length) {
      const style = this.shape;
      const defaultStyles = {
        "--max-index": length + 1,
        "--bg-color": useRandomRgbColor(),
        "--card-index": index2
      };
      if (style === 0) {
        defaultStyles["left"] = `${16 * ++index2}px`;
      } else if (style === 1) {
        let rotate = 0;
        if (index2 % 2 === 1) {
          rotate = length - index2;
        } else {
          rotate = index2 - length;
        }
        defaultStyles["--rotate-deg"] = rotate + "deg";
      } else {
        const tangle = 48;
        const unitArc = tangle / length;
        let rotate = unitArc * index2 - 48 / 2;
        defaultStyles["--rotate-deg"] = rotate + "deg";
      }
      return defaultStyles;
    },
    addIndex() {
      if (this.activeIndex < this.cards.length - 1) {
        this.activeIndex++;
      } else {
        this.activeIndex = 0;
      }
    },
    lessIndex() {
      if (this.activeIndex > 0) {
        this.activeIndex--;
      } else {
        this.activeIndex = this.cards.length - 1;
      }
    },
    keyboardDeal(e) {
      if (document.activeElement !== document.body)
        return;
      const keyMap = /* @__PURE__ */ new Map([
        [38, "addIndex"],
        [40, "lessIndex"],
        [37, "lessIndex"],
        [39, "addIndex"]
      ]);
      keyMap.get(e.keyCode) && this[keyMap.get(e.keyCode)]();
    }
  }
};
const _hoisted_1$4 = { class: "AnimationCards" };
const _hoisted_2$3 = { class: "demo-content" };
const _hoisted_3$3 = { class: "animation-cards-box" };
const _hoisted_4$2 = ["onClick"];
const _hoisted_5$2 = { class: "text-span" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$4, [
    createElementVNode("div", _hoisted_2$3, [
      createElementVNode("div", _hoisted_3$3, [
        (openBlock(true), createElementBlock(Fragment, null, renderList($data.cards, (styles, index2) => {
          return openBlock(), createElementBlock("div", {
            class: normalizeClass(["animation-card", { "is-active": $data.activeIndex === index2, "is-clutter": !!$props.shape, "is-list": !$props.shape }]),
            key: index2,
            style: normalizeStyle(styles),
            onClick: ($event) => $data.activeIndex = $data.activeIndex === index2 ? -1 : index2
          }, [
            createElementVNode("span", _hoisted_5$2, toDisplayString($props.cardList[index2].text), 1)
          ], 14, _hoisted_4$2);
        }), 128))
      ])
    ])
  ]);
}
var DynamicCard = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render], ["__scopeId", "data-v-df89694c"]]);
DynamicCard.install = (App) => {
  App.component(DynamicCard.alanComponentName, DynamicCard);
};
const _hoisted_1$3 = { class: "camera_outer" };
const _hoisted_2$2 = ["width", "height"];
const _hoisted_3$2 = ["width", "height"];
const _hoisted_4$1 = {
  key: 0,
  class: "img_bg_camera"
};
const _hoisted_5$1 = /* @__PURE__ */ createElementVNode("h2", null, "\u6548\u679C\u9884\u89C8", -1);
const _hoisted_6$1 = ["src"];
const _hoisted_7$1 = { class: "button" };
const __default__$3 = {
  alanComponentName: "TakingPictures"
};
const _sfc_main$3 = /* @__PURE__ */ Object.assign(__default__$3, {
  __name: "taking-pictures",
  props: {
    autoGetCompetence: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    const props = __props;
    const state = reactive({
      videoWidth: 250,
      videoHeight: 350,
      imgSrc: "",
      thisCancas: null,
      thisContext: null,
      thisVideo: null,
      openVideo: false
    });
    onMounted(() => {
      props.autoGetCompetence && getCompetence();
    });
    const getCompetence = () => {
      state.thisCancas = document.getElementById("canvasCamera");
      state.thisContext = state.thisCancas.getContext("2d");
      state.thisVideo = document.getElementById("videoCamera");
      state.thisVideo.style.display = "block";
      if (navigator.mediaDevices === void 0) {
        navigator.mediaDevices = {};
      }
      if (navigator.mediaDevices.getUserMedia === void 0) {
        navigator.mediaDevices.getUserMedia = function(constraints2) {
          var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.getUserMedia;
          if (!getUserMedia) {
            return Promise.reject(
              new Error("getUserMedia is not implemented in this browser")
            );
          }
          return new Promise(function(resolve, reject) {
            getUserMedia.call(navigator, constraints2, resolve, reject);
          });
        };
      }
      const constraints = {
        audio: false,
        video: {
          width: state.videoWidth,
          height: state.videoHeight,
          transform: "scaleX(-1)"
        }
      };
      navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
        if ("srcObject" in state.thisVideo) {
          state.thisVideo.srcObject = stream;
        } else {
          state.thisVideo.src = window.URL.createObjectURL(stream);
        }
        state.thisVideo.onloadedmetadata = function(e) {
          state.thisVideo.play();
        };
      }).catch((err) => {
        console.log(err);
      });
    };
    const setImage = () => {
      state.thisContext.drawImage(
        state.thisVideo,
        0,
        0,
        state.videoWidth,
        state.videoHeight
      );
      const image = state.thisCancas.toDataURL("image/png");
      state.imgSrc = image;
    };
    const stopNavigator = () => {
      state.thisVideo.srcObject.getTracks()[0].stop();
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$3, [
        createElementVNode("video", {
          id: "videoCamera",
          width: state.videoWidth,
          height: state.videoHeight,
          autoplay: ""
        }, null, 8, _hoisted_2$2),
        createElementVNode("canvas", {
          style: { "display": "none" },
          id: "canvasCamera",
          width: state.videoWidth,
          height: state.videoHeight
        }, null, 8, _hoisted_3$2),
        state.imgSrc ? (openBlock(), createElementBlock("div", _hoisted_4$1, [
          _hoisted_5$1,
          createElementVNode("img", {
            src: state.imgSrc,
            alt: "",
            class: "tx_img"
          }, null, 8, _hoisted_6$1)
        ])) : createCommentVNode("", true),
        createElementVNode("div", _hoisted_7$1, [
          createElementVNode("button", {
            onClick: _cache[0] || (_cache[0] = ($event) => getCompetence()),
            type: "primary"
          }, "\u6253\u5F00\u6444\u50CF\u5934"),
          createElementVNode("button", {
            onClick: _cache[1] || (_cache[1] = ($event) => stopNavigator()),
            type: "warning"
          }, "\u5173\u95ED\u6444\u50CF\u5934"),
          createElementVNode("button", {
            onClick: _cache[2] || (_cache[2] = ($event) => setImage()),
            type: "success"
          }, "\u62CD\u7167")
        ])
      ]);
    };
  }
});
_sfc_main$3.install = (App) => {
  App.component(_sfc_main$3.alanComponentName, _sfc_main$3);
};
var therMometer_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId = (n) => (pushScopeId("data-v-bbe49660"), n = n(), popScopeId(), n);
const _hoisted_1$2 = { class: "container flex-row j_c" };
const _hoisted_2$1 = { class: "container-box" };
const _hoisted_3$1 = { class: "box-lines" };
const _hoisted_4 = { class: "left" };
const _hoisted_5 = { class: "right" };
const _hoisted_6 = { class: "box-pan" };
const _hoisted_7 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("div", { class: "box-shadow" }, null, -1));
const _hoisted_8 = { class: "bottom-center" };
const _hoisted_9 = { class: "container-title" };
const _hoisted_10 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("text", null, "C", -1));
const __default__$2 = {
  alanComponentName: "TherMometer"
};
const _sfc_main$2 = /* @__PURE__ */ Object.assign(__default__$2, {
  __name: "ther-mometer",
  props: {
    show: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      default: () => {
      },
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    let step = parseInt(props.data.max) / 4, stepList = [], currPer = parseInt(props.data.value) / parseInt(props.data.max), warnPer = 0;
    if (parseInt(props.data.value) > parseInt(props.data.warn)) {
      warnPer = (parseInt(props.data.value) - parseInt(props.data.warn)) / parseInt(props.data.max);
    }
    for (let i = 0; i < 5; i++) {
      stepList.unshift(step * i);
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("section", _hoisted_1$2, [
        createElementVNode("div", _hoisted_2$1, [
          createElementVNode("div", _hoisted_3$1, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(unref(stepList), (item, index2) => {
              return openBlock(), createElementBlock("div", {
                key: index2,
                class: "line-item flex-row j_b"
              }, [
                createElementVNode("div", _hoisted_4, toDisplayString(item), 1),
                createElementVNode("div", _hoisted_5, toDisplayString(item), 1)
              ]);
            }), 128))
          ]),
          createElementVNode("div", _hoisted_6, [
            _hoisted_7,
            createElementVNode("div", {
              class: normalizeClass([
                "bottom-circle",
                __props.show && (__props.data.value >= 0 ? "active" : "trans")
              ])
            }, null, 2),
            withDirectives(createElementVNode("div", _hoisted_8, [
              createElementVNode("div", {
                class: normalizeClass(["active", unref(currPer) >= 0.94 && "br", __props.show && "trans"]),
                style: normalizeStyle({ "--per": unref(currPer) < 1 ? unref(currPer) : 1 })
              }, [
                withDirectives(createElementVNode("div", {
                  class: normalizeClass(["bottom-warn", unref(currPer) >= 0.94 && "br"]),
                  style: normalizeStyle({ "--per": unref(warnPer) < 1 ? unref(warnPer) : 1 })
                }, null, 6), [
                  [vShow, __props.data.value > __props.data.warn]
                ])
              ], 6)
            ], 512), [
              [vShow, __props.data.value >= 0]
            ])
          ])
        ]),
        createElementVNode("div", _hoisted_9, [
          createTextVNode(toDisplayString(__props.data.value) + "\xB0", 1),
          _hoisted_10
        ])
      ]);
    };
  }
});
var TherMometer = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-bbe49660"]]);
TherMometer.install = (App) => {
  App.component(TherMometer.alanComponentName, TherMometer);
};
const _hoisted_1$1 = { id: "canvas" };
const __default__$1 = {
  alanComponentName: "YuanWar"
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  ...__default__$1,
  __name: "yuan-war",
  props: {
    width: {
      type: Number,
      default: () => 800
    },
    height: {
      type: Number,
      default: () => 800
    }
  },
  setup(__props) {
    const props = __props;
    onMounted(() => {
      const canvas = document.getElementById("canvas");
      const ctx = canvas.getContext("2d");
      const WIDTH = props.width;
      const HEIGHT = props.height;
      canvas.height = HEIGHT;
      canvas.width = WIDTH;
      const intersectionDetection = (circle, anotherCircle) => {
        const distance = Math.sqrt(Math.pow(circle.x - anotherCircle.x, 2) + Math.pow(circle.y - anotherCircle.y, 2));
        return distance < circle.radius + anotherCircle.radius;
      };
      function drawCircle(cx, cy, radius, color, shadow) {
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
        ctx.shadowColor = shadow ? color : "";
        ctx.shadowBlur = shadow ? radius : 0;
        ctx.fillStyle = color;
        ctx.fill();
      }
      class King {
        constructor() {
          this.hp = 100;
          this.x = 200;
          this.y = 200;
          this.color = "purple";
        }
        draw() {
          drawCircle(this.x, this.y, 16, this.color, true);
        }
      }
      class Bullet {
        constructor(angle) {
          this.angle = angle;
          this.damage = 3;
          this.x = 200;
          this.y = 200;
          this.speed = 4;
          this.state = 1;
          this.color = "yellow";
          this.radius = 4;
        }
        move() {
          this.x += Math.cos(this.angle * Math.PI / 180) * this.speed;
          this.y += Math.sin(this.angle * Math.PI / 180) * this.speed;
        }
        draw() {
          if (!this.state)
            return;
          drawCircle(this.x, this.y, this.radius, this.color, true);
        }
        intersectionDetection(enemies) {
          const intersectionEnemy = enemies.find((enemy) => {
            return enemy.state && intersectionDetection(enemy, this);
          });
          if (intersectionEnemy) {
            this.state = 0;
            intersectionEnemy.hurt(this);
          }
        }
      }
      class Enemy {
        constructor() {
          this.x = -10;
          this.y = 200;
          this.speed = 0.2;
          this.color = "red";
          this.state = 1;
          this.radius = 6;
          this.hp = 3;
        }
        draw() {
          if (!this.state)
            return;
          drawCircle(this.x, this.y, this.radius, this.color, true);
        }
        move() {
          this.x += this.speed;
        }
        hurt(bullet) {
          this.hp -= bullet.damage;
          if (this.hp <= 0) {
            this.state = 0;
          }
        }
      }
      const computeAngle = (x, y) => {
        const distance = Math.sqrt(x * x + y * y);
        const angle = Math.asin(y / distance) * 180 / Math.PI;
        return +(x > 0 ? angle : 180 - angle).toFixed(2);
      };
      class Mouse {
        constructor() {
          this.angle = 0;
          this.x = 0;
          this.y = 0;
          this.moveHandler = this._moveHandler.bind(this);
        }
        _moveHandler(e) {
          const clientRect = canvas.getClientRects()[0];
          const x = e.pageX - clientRect.x;
          const y = e.pageY - clientRect.y;
          this.x = x;
          this.y = y;
          this.angle = computeAngle(x - 200, y - 200);
        }
        on() {
          document.addEventListener("mousemove", this.moveHandler);
        }
        off() {
          document.removeEventListener("mousemove", this.moveHandler);
        }
      }
      const BULLET_CD = 30;
      const ENEMY_CD = 300;
      const game = {
        bulletCD: 0,
        enemyCD: 0,
        start() {
          this.king = new King();
          this.enemies = [];
          this.bullets = [];
          this.mouse = new Mouse();
          this.mouse.on();
          this.loop();
        },
        loop() {
          requestAnimationFrame(() => this.loop());
          this.draw();
          this.move();
          this.intersectionDetection();
          this.cd();
        },
        cd() {
          if (this.bulletCD-- < 1) {
            this.bullets.push(new Bullet(this.mouse.angle));
            this.bulletCD = BULLET_CD;
          }
          if (this.enemyCD-- < 1) {
            this.enemies.push(new Enemy());
            this.enemyCD = ENEMY_CD;
          }
        },
        intersectionDetection() {
          this.bullets.forEach((bullet) => {
            bullet.intersectionDetection(this.enemies);
          });
        },
        draw() {
          ctx.clearRect(0, 0, WIDTH, HEIGHT);
          this.king.draw();
          this.enemies.forEach((enemy) => enemy.draw());
          this.bullets.forEach((bullet) => bullet.draw());
        },
        move() {
          this.enemies.forEach((enemy) => enemy.move());
          this.bullets.forEach((bullet) => bullet.move());
        }
      };
      game.start();
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("canvas", _hoisted_1$1);
    };
  }
});
_sfc_main$1.install = (App) => {
  App.component(_sfc_main$1.alanComponentName, _sfc_main$1);
};
var videoRecording_vue_vue_type_style_index_0_scoped_true_lang = "";
const _hoisted_1 = { class: "layui-body" };
const _hoisted_2 = /* @__PURE__ */ createStaticVNode('<div id="container" data-v-4929f652><video id="gum" autoplay muted data-v-4929f652></video><div class="controls" data-v-4929f652><button id="record" disabled data-v-4929f652>\u5F00\u59CB\u5F55\u5236</button><button id="play" disabled data-v-4929f652>\u64AD\u653E</button><button id="download" disabled data-v-4929f652>\u4E0B\u8F7D</button><span id="tEl" data-v-4929f652></span></div><video id="gum2" controls="controls" autoplay style="display:none;" data-v-4929f652></video></div>', 1);
const _hoisted_3 = [
  _hoisted_2
];
const __default__ = {
  alanComponentName: "VideoRecording"
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __name: "video-recording",
  setup(__props) {
    onMounted(() => {
      new useRecordingVideo();
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, _hoisted_3);
    };
  }
});
var VideoRecording = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-4929f652"]]);
VideoRecording.install = (App) => {
  App.component(VideoRecording.alanComponentName, VideoRecording);
};
var index$1 = "";
const components = [StarrySky, DigitalScroll, AlanButton, CodeBackgroundWall, BackTop, TherMometer, _sfc_main$1, DynamicCard, _sfc_main$3, VideoRecording];
const install = (App) => {
  components.forEach((item) => {
    App.component(item.alanComponentName, item);
  });
};
var index = { install };
export { BackTop as AlanBackTop, AlanButton, CodeBackgroundWall, DigitalScroll, DynamicCard, StarrySky, _sfc_main$3 as TakingPictures, TherMometer, VideoRecording, _sfc_main$1 as YuanWar, index as default };
