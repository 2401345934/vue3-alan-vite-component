var ut = Object.defineProperty;
var mt = (n, t, e) => t in n ? ut(n, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : n[t] = e;
var B = (n, t, e) => (mt(n, typeof t != "symbol" ? t + "" : t, e), e);
import { defineComponent as y, ref as D, onMounted as M, openBlock as v, createElementBlock as _, createElementVNode as g, Fragment as $, renderList as Z, normalizeClass as E, renderSlot as it, useSlots as gt, onBeforeUnmount as ft, createCommentVNode as nt, normalizeStyle as j, toDisplayString as P, reactive as pt, unref as I, withDirectives as et, vShow as st, createTextVNode as vt, pushScopeId as _t, popScopeId as yt, createStaticVNode as bt } from "vue";
const wt = { class: "starry-sky-bg" }, xt = { class: "stars" }, kt = y({
  name: "StarrySky"
}), St = /* @__PURE__ */ y({
  ...kt,
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
  setup(n) {
    const t = n, e = D();
    return M(() => {
      e.value.forEach((i) => {
        let l = 0.1 + Math.random() * 1, c = t.distance + Math.random() * 300;
        i.style.transformOrigin = `0 0 ${c}px`, i.style.transform = `translate3d(0,0,-${c}px) rotateY(${Math.random() * 360}deg) rotateX(${Math.random() * -50}deg) scale(${l},${l})`;
      });
    }), (s, i) => (v(), _("div", wt, [
      g("div", xt, [
        (v(!0), _($, null, Z(n.starsCount, (l) => (v(), _("div", {
          key: l,
          class: "star",
          ref_for: !0,
          ref_key: "star",
          ref: e
        }))), 128))
      ])
    ]));
  }
});
const C = (n, t) => {
  const e = n.__vccOpts || n;
  for (const [s, i] of t)
    e[s] = i;
  return e;
}, R = /* @__PURE__ */ C(St, [["__scopeId", "data-v-b65fb403"]]);
R.install = (n) => {
  n.component(R.name, R);
};
class Mt {
  constructor() {
    this.duration = 0, this.maxD = 15, this.count = 15, this.gumVideo = document.querySelector("#gum"), this.gumVideo2 = document.querySelector("#gum2"), this.recordButton = document.querySelector("#record"), this.playButton = document.querySelector("#play"), this.downloadButton = document.querySelector("#download"), this.tEL = document.getElementById("tEl");
    const t = {
      audio: !0,
      video: {
        facingMode: "user",
        width: 400,
        //视频宽度
        height: 400,
        //视频高度
        frameRate: 60
        //每秒60帧
      }
    };
    location.protocol === "https:" || location.hostname === "localhost" || (alert("getUserMedia() 必须在https或localhost下使用"), location.protocol = "HTTPS"), this.recordButton.onclick = () => this.toggleRecording(), this.playButton.onclick = () => this.play(), this.downloadButton.onclick = () => this.download(), this.gumVideo2.width = t.video.width, this.gumVideo2.height = t.video.height, this.getUserMedia(t, (s) => {
      this.recordButton.disabled = !1, this.stream = s, this.gumVideo.srcObject = s;
    }, (s) => {
      s.message === "Permission denied" && alert("您已经禁止使用摄像头，请到设置-通用-微信存储空间-管理微信存储空间-点击‘清理其他微信账号聊天数据’"), console.log("navigator.getUserMedia error: ", s);
    });
  }
  // 获取摄像头流媒体
  getUserMedia(t, e, s) {
    const i = window.navigator;
    i.mediaDevices && i.mediaDevices.getUserMedia ? i.mediaDevices.getUserMedia(t).then(e).catch(s) : i.webkitGetUserMedia ? i.webkitGetUserMedia(t, e, s) : i.mozGetUserMedia ? i.mozGetUserMedia(t, e, s) : i.getUserMedia && i.getUserMedia(t, e, s);
  }
  // 开始录制的事件
  toggleRecording() {
    const t = this.tEL;
    this.recordButton.textContent === "开始录制" ? (t.innerHTML = "", this.startRecording(), clearInterval(this.intervalId), t.innerHTML = "剩余时间：" + this.count + "秒", this.count--, this.intervalId = setInterval(() => {
      t.innerHTML = "剩余时间：" + this.count + "秒", this.count <= 0 ? (clearInterval(this.intervalId), this.duration = this.maxD - this.count, this.count = this.maxD, this.stopRecording(), this.recordButton.textContent = "开始录制", this.downloadButton.disabled = !1, this.playButton.disabled = !1) : this.count--;
    }, 1e3)) : (clearInterval(this.intervalId), this.duration = this.maxD - this.count, this.count = this.maxD, this.stopRecording(), this.recordButton.textContent = "开始录制", this.playButton.disabled = !1, this.downloadButton.disabled = !1);
  }
  // 开始录制
  startRecording() {
    const t = !!(/Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent));
    this.recordedBlobs = [];
    const e = {
      audioBitsPerSecond: 128e3,
      videoBitsPerSecond: 25e5,
      mimeType: t ? "video/mp4" : "video/webm"
    };
    try {
      this.mediaRecorder = new MediaRecorder(this.stream, e);
    } catch (s) {
      alert("MediaRecorder创建失败: " + s + ". mimeType: " + e.mimeType);
      return;
    }
    this.recordButton.textContent = "结束录制", this.downloadButton.disabled = !0, this.playButton.disabled = !0, this.mediaRecorder.ondataavailable = (s) => {
      s.data && s.data.size > 0 && this.recordedBlobs.push(s.data);
    }, this.mediaRecorder.onstop = (s) => {
      console.log("Recorder stopped: ", s);
    }, this.mediaRecorder.start(10);
  }
  // 停止录制
  stopRecording() {
    tEl.innerHTML = "录制完成", this.mediaRecorder.stop();
  }
  // 下载视频
  download() {
    const t = new Blob(this.recordedBlobs, { type: "video/mp4" }), e = document.createElement("a");
    e.setAttribute("download", Date.now() + ".mp4"), e.href = URL.createObjectURL(t), e.click();
  }
  // 点击播放
  play() {
    const { recordedBlobs: t, gumVideo2: e } = this, s = new Blob(t, { type: "video/mp4" }), i = parseInt(s.size / 1024);
    let l = "";
    i < 1024 ? l = i + "KB" : l = (i / 1024).toFixed(2) + "MB", alert("播放时长：" + this.duration + "秒, 大小：" + l);
    const c = URL.createObjectURL(s);
    e.style.display = "", e.src = c;
  }
}
function Ct(n, t, e) {
  let s, i, l, c, a = 0;
  e = e || {};
  let o = function() {
    let r = (/* @__PURE__ */ new Date()).getTime();
    a = e.leading === !1 ? 0 : r, s = null, c = n.apply(i, l), s || (i = l = null);
  };
  return function() {
    i = this, l = arguments;
    let r = (/* @__PURE__ */ new Date()).getTime();
    !a && e.leading === !1 && (a = r);
    let f = t - (r - a);
    return f <= 0 || f > t ? (clearTimeout(s), s = null, a = r, c = n.apply(i, l), s || (i = l = null)) : !s && e.trailing !== !1 && (s = setTimeout(o, f)), c;
  };
}
const ot = () => {
  const n = document.documentElement.scrollTop || document.body.scrollTop;
  n > 0 && (window.requestAnimationFrame(ot), window.scrollTo(0, n - n / 8));
}, Tt = (n = window) => ({
  x: n.pageXOffset !== void 0 ? n.pageXOffset : n.scrollLeft,
  y: n.pageYOffset !== void 0 ? n.pageYOffset : n.scrollTop
});
class It {
  constructor(t) {
    if (this.container = document.querySelector(t.container), !this.container)
      throw Error("no container");
    this.container.style.overflow = "hidden", this.container.style.display = "flex", this.rollHeight = parseInt(getComputedStyle(this.container).height) || 30, this.container.style.height = this.rollHeight + "px";
  }
  roll(t) {
    this.initDigitEle(t), [...this.container.querySelectorAll(".single-num")].forEach((s, i) => {
      let c = Number(this.numberArr[i]);
      0 >= c && (c = c + 10);
      let a = 0;
      const o = document.createDocumentFragment();
      for (; c >= a; ) {
        const r = document.createElement("div");
        r.innerHTML = a % 10, a++, o.appendChild(r);
      }
      s.innerHTML = "", s.appendChild(o), s.style.cssText += "-webkit-transition-duration:0s;-webkit-transform:translateY(0)", setTimeout(() => {
        s.style.cssText += `-webkit-transition-duration:1s;-webkit-transform:translateY(${-(c - 0) * this.rollHeight}px);`;
      }, 50);
    });
  }
  // 初始化容器
  initDigitEle(t) {
    const e = t.toString().split(""), s = document.createDocumentFragment();
    e.forEach((i) => {
      const l = document.createElement("div");
      /[0-9]/.test(i) ? (l.className = "single-num", l.style.height = this.rollHeight + "px", l.style.lineHeight = this.rollHeight + "px") : (l.innerHTML = i, l.className = "no-move", l.style.verticalAlign = "bottom"), s.appendChild(l);
    }, []), this.container.innerHTML = "", this.container.appendChild(s), this.numberArr = e.filter((i) => /[0-9]/.test(i));
  }
}
function Et() {
  const n = Math.floor(Math.random() * 256), t = Math.floor(Math.random() * 256), e = Math.floor(Math.random() * 256);
  return `rgb(${n},${t},${e})`;
}
let $t = class {
  constructor(t) {
    this.images = {}, this.bl = 2, this.cvs = t.el, this.bl = t.bl, this.ctx = this.cvs.getContext("2d"), this.cvs.width = this.cvs.width * this.bl, this.cvs.height = this.cvs.height * this.bl, this.renderList = t.renderList, this.draw();
  }
  // 绘制函数
  async draw() {
    const { ctx: t, renderList: e } = this, s = e.filter((i) => i.type === "image").map((i) => i.src);
    await this.loadImgs(s), e.forEach((i) => {
      i.align && (t.textAlign = i.align), i.type === "image" ? (t.beginPath(), t.save(), i.clipCircle && (t.lineWidth = i.clipLineWidth, t.strokeStyle = i.clipStrokeStyle, t.arc((i.x + i.width / 2) * this.bl, (i.y + i.width / 2) * this.bl, i.width / 2 * this.bl, 0, Math.PI * 2), t.stroke(), t.clip()), t.drawImage(this.images[i.src], i.x * this.bl, i.y * this.bl, i.width * this.bl, i.height * this.bl), t.restore()) : i.type === "text" && (t.fillStyle = i.fillStyle, t.font = `${i.fontSize * this.bl}px 宋体`, t.fillText(i.text, i.x * this.bl, i.y * this.bl));
    });
  }
  // 加载多张图
  async loadImgs(t) {
    for (let e = 0; e < t.length; e++)
      await this.loadImg(t[e]);
  }
  // 加载单张图
  async loadImg(t) {
    return new Promise((e, s) => {
      const i = new Image();
      i.src = t, i.onload = () => {
        this.images[t] = i, e(i);
      };
    });
  }
};
const Dt = Ct, Bt = Tt, Pt = ot, Rt = It, Lt = Et, At = Mt, Ft = $t, Wt = y({
  name: "DigitalScroll"
}), Nt = /* @__PURE__ */ y({
  ...Wt,
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
  setup(n) {
    const t = n;
    return M(() => {
      new Rt({
        container: "#digital-scroll"
        // container 要操作的DOM节点
      }).roll(t.targetNumber);
    }), (e, s) => (v(), _("div", {
      class: E(n.targetClass),
      id: "digital-scroll"
    }, null, 2));
  }
});
const L = /* @__PURE__ */ C(Nt, [["__scopeId", "data-v-4ba702c7"]]);
L.install = (n) => {
  n.component(L.name, L);
};
const Ht = ["disabled"], Ut = y({
  name: "AlanButton"
}), Ot = /* @__PURE__ */ y({
  ...Ut,
  props: {
    type: {
      type: String,
      default: "default"
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    block: {
      type: Boolean,
      default: !1
    }
  },
  setup(n) {
    return (t, e) => (v(), _("button", {
      disabled: n.disabled,
      class: E(["btn", n.block && "block", n.disabled && "disabled", n.type])
    }, [
      it(t.$slots, "default", {}, void 0, !0)
    ], 10, Ht));
  }
});
const J = /* @__PURE__ */ C(Ot, [["__scopeId", "data-v-0a207a33"]]);
J.install = (n) => {
  n.component(J.name, Button);
};
const Yt = ["height", "width"], qt = y({
  name: "CodeBackgroundWall"
}), Vt = /* @__PURE__ */ y({
  ...qt,
  props: {
    // 宽度
    width: {
      type: Number,
      default: 300
    },
    // 高度
    height: {
      type: Number,
      default: 300
    },
    // 步长 控制速度
    step: {
      type: Number,
      default: 0.02
    },
    // 颜色
    color: {
      type: String,
      default: "green"
    }
  },
  setup(n) {
    const t = n, e = D(null);
    return M(() => {
      const s = e.value;
      s.width = t.width, s.height = t.height;
      const i = s.getContext("2d"), l = "qwertyuiopasdfghjklzxcvbnm";
      i.font = "14px 微软雅黑";
      const c = 20, a = {}, o = {}, r = {}, f = {}, x = () => {
        i.clearRect(0, 0, t.width, t.height);
        for (let d = 0; d < t.width; d += c) {
          i.beginPath();
          const k = i.createLinearGradient(0, 0, 0, t.height), b = 0.2 * Math.random(), w = 0.8 * Math.random(), u = t.step;
          o[d] = o[d] || -b, a[d] = a[d] || w, r[d] = r[d] || 0, k.addColorStop(a[d] < 0 ? 0 : a[d], "#000"), k.addColorStop(o[d] < 0 ? 0 : o[d], t.color), k.addColorStop(r[d], "#000"), i.fillStyle = k;
          for (let m = 0; m < t.height; m += c)
            f[`${d}-${m}`] = f[`${d}-${m}`] || l[parseInt(Math.random() * l.length)], i.fillText(f[`${d}-${m}`], d, m);
          a[d] += u, o[d] += u, r[d] += u, a[d] > 1 && (a[d] = -w), o[d] > 1 && (a[d] === -w ? o[d] = -b : o[d] = 1), r[d] > 1 && (o[d] === -b && a[d] === -w ? r[d] = u : r[d] = 1);
        }
        requestAnimationFrame(x);
      };
      x();
    }), (s, i) => (v(), _("canvas", {
      ref_key: "cvs",
      ref: e,
      id: "cvs",
      height: n.height,
      width: n.width,
      class: "cvs"
    }, null, 8, Yt));
  }
});
const A = /* @__PURE__ */ C(Vt, [["__scopeId", "data-v-a79a1cda"]]);
A.install = (n) => {
  n.component(A.name, A);
};
const jt = {
  key: 0,
  class: "alan-back-top-content"
}, Xt = y({
  name: "AlanBackTop"
}), zt = /* @__PURE__ */ y({
  ...Xt,
  props: {
    visibilityHeight: {
      type: Number,
      default: 400
    }
  },
  emits: ["goTopCompleteCb"],
  setup(n, { emit: t }) {
    const e = n, s = !!gt().default, i = D(!1);
    M(() => {
      window.addEventListener("scroll", Dt(() => {
        c();
      }, 250));
    }), ft(() => {
      window.removeEventListener("scroll", () => {
      });
    });
    const l = () => {
      Pt(), t("goTopCompleteCb");
    }, c = () => {
      i.value = Bt().y >= e.visibilityHeight;
    };
    return (a, o) => (v(), _("div", {
      class: "alan-back-top",
      onClick: l
    }, [
      g("div", {
        class: E(["warp", i.value && "visibilityH"])
      }, [
        s ? nt("", !0) : (v(), _("div", jt, " 返回 ")),
        it(a.$slots, "default", {}, void 0, !0)
      ], 2)
    ]));
  }
});
const F = /* @__PURE__ */ C(zt, [["__scopeId", "data-v-1aa3adee"]]);
F.install = (n) => {
  n.component(F.name, F);
};
const Gt = {
  name: "DynamicCard",
  props: {
    cardList: {
      type: Array,
      default: []
    },
    // 0：列表
    // 1:乱序扇形
    // 2:正序扇形
    shape: {
      type: Number,
      default: 1
    },
    // 是否需要键盘控制
    isKeyboardControl: {
      type: Boolean,
      default: !1
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
      const n = new Array(this.cardList.length).fill(1);
      this.cards = n.map((t, e) => this.computedStyle(e, this.cardList.length || 0));
    },
    resetData(n) {
      this.style = n, this.initData();
    },
    computedStyle(n, t) {
      const e = this.shape, s = {
        "--max-index": t + 1,
        "--bg-color": Lt(),
        "--card-index": n
      };
      if (e === 0)
        s.left = `${16 * ++n}px`;
      else if (e === 1) {
        let i = 0;
        n % 2 === 1 ? i = t - n : i = n - t, s["--rotate-deg"] = i + "deg";
      } else {
        let c = 48 / t * n - 48 / 2;
        s["--rotate-deg"] = c + "deg";
      }
      return s;
    },
    addIndex() {
      this.activeIndex < this.cards.length - 1 ? this.activeIndex++ : this.activeIndex = 0;
    },
    lessIndex() {
      this.activeIndex > 0 ? this.activeIndex-- : this.activeIndex = this.cards.length - 1;
    },
    keyboardDeal(n) {
      if (document.activeElement !== document.body)
        return;
      const t = /* @__PURE__ */ new Map([
        [38, "addIndex"],
        [40, "lessIndex"],
        [37, "lessIndex"],
        [39, "addIndex"]
      ]);
      t.get(n.keyCode) && this[t.get(n.keyCode)]();
    }
  }
}, Jt = { class: "AnimationCards" }, Kt = { class: "demo-content" }, Qt = { class: "animation-cards-box" }, Zt = ["onClick"], te = { class: "text-span" };
function ee(n, t, e, s, i, l) {
  return v(), _("div", Jt, [
    g("div", Kt, [
      g("div", Qt, [
        (v(!0), _($, null, Z(i.cards, (c, a) => (v(), _("div", {
          class: E(["animation-card", { "is-active": i.activeIndex === a, "is-clutter": !!e.shape, "is-list": !e.shape }]),
          key: a,
          style: j(c),
          onClick: (o) => i.activeIndex = i.activeIndex === a ? -1 : a
        }, [
          g("span", te, P(e.cardList[a].text), 1)
        ], 14, Zt))), 128))
      ])
    ])
  ]);
}
const W = /* @__PURE__ */ C(Gt, [["render", ee], ["__scopeId", "data-v-24fe0273"]]);
W.install = (n) => {
  n.component(W.name, W);
};
const se = { class: "camera_outer" }, ie = ["width", "height"], ne = ["width", "height"], oe = {
  key: 0,
  class: "img_bg_camera"
}, ae = /* @__PURE__ */ g("h2", null, "效果预览", -1), le = ["src"], re = { class: "button" }, ce = y({
  name: "TakingPictures"
}), N = /* @__PURE__ */ Object.assign(ce, {
  props: {
    autoGetCompetence: {
      type: Boolean,
      default: !1
    }
  },
  setup(n) {
    const t = n, e = pt({
      videoWidth: 250,
      videoHeight: 350,
      imgSrc: "",
      thisCancas: null,
      thisContext: null,
      thisVideo: null,
      openVideo: !1
    });
    M(() => {
      t.autoGetCompetence && s();
    });
    const s = () => {
      e.thisCancas = document.getElementById("canvasCamera"), e.thisContext = e.thisCancas.getContext("2d"), e.thisVideo = document.getElementById("videoCamera"), e.thisVideo.style.display = "block", navigator.mediaDevices === void 0 && (navigator.mediaDevices = {}), navigator.mediaDevices.getUserMedia === void 0 && (navigator.mediaDevices.getUserMedia = function(a) {
        var o = navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.getUserMedia;
        return o ? new Promise(function(r, f) {
          o.call(navigator, a, r, f);
        }) : Promise.reject(
          new Error("getUserMedia is not implemented in this browser")
        );
      });
      const c = {
        audio: !1,
        video: {
          width: e.videoWidth,
          height: e.videoHeight,
          transform: "scaleX(-1)"
        }
      };
      navigator.mediaDevices.getUserMedia(c).then(function(a) {
        "srcObject" in e.thisVideo ? e.thisVideo.srcObject = a : e.thisVideo.src = window.URL.createObjectURL(a), e.thisVideo.onloadedmetadata = function(o) {
          e.thisVideo.play();
        };
      }).catch((a) => {
        console.log(a);
      });
    }, i = () => {
      e.thisContext.drawImage(
        e.thisVideo,
        0,
        0,
        e.videoWidth,
        e.videoHeight
      );
      const c = e.thisCancas.toDataURL("image/png");
      e.imgSrc = c;
    }, l = () => {
      e.thisVideo.srcObject.getTracks()[0].stop();
    };
    return (c, a) => (v(), _("div", se, [
      g("video", {
        id: "videoCamera",
        width: e.videoWidth,
        height: e.videoHeight,
        autoplay: ""
      }, null, 8, ie),
      g("canvas", {
        style: { display: "none" },
        id: "canvasCamera",
        width: e.videoWidth,
        height: e.videoHeight
      }, null, 8, ne),
      e.imgSrc ? (v(), _("div", oe, [
        ae,
        g("img", {
          src: e.imgSrc,
          alt: "",
          class: "tx_img"
        }, null, 8, le)
      ])) : nt("", !0),
      g("div", re, [
        g("button", {
          onClick: a[0] || (a[0] = (o) => s()),
          type: "primary"
        }, "打开摄像头"),
        g("button", {
          onClick: a[1] || (a[1] = (o) => l()),
          type: "warning"
        }, "关闭摄像头"),
        g("button", {
          onClick: a[2] || (a[2] = (o) => i()),
          type: "success"
        }, "拍照")
      ])
    ]));
  }
});
N.install = (n) => {
  n.component(N.name, N);
};
const at = (n) => (_t("data-v-0e9f2553"), n = n(), yt(), n), de = { class: "container flex-row j_c" }, he = { class: "container-box" }, ue = { class: "box-lines" }, me = { class: "left" }, ge = { class: "right" }, fe = { class: "box-pan" }, pe = /* @__PURE__ */ at(() => /* @__PURE__ */ g("div", { class: "box-shadow" }, null, -1)), ve = { class: "bottom-center" }, _e = { class: "container-title" }, ye = /* @__PURE__ */ at(() => /* @__PURE__ */ g("text", null, "C", -1)), be = y({
  name: "TherMometer"
}), we = /* @__PURE__ */ Object.assign(be, {
  props: {
    show: {
      type: Boolean,
      default: !1
      //展示过渡效果
    },
    data: {
      type: Object,
      default: () => {
      },
      required: !0
    }
  },
  setup(n) {
    const t = n;
    let e = parseInt(t.data.max) / 4, s = [], i = parseInt(t.data.value) / parseInt(t.data.max), l = 0;
    parseInt(t.data.value) > parseInt(t.data.warn) && (l = (parseInt(t.data.value) - parseInt(t.data.warn)) / parseInt(t.data.max));
    for (let c = 0; c < 5; c++)
      s.unshift(e * c);
    return (c, a) => (v(), _("section", de, [
      g("div", he, [
        g("div", ue, [
          (v(!0), _($, null, Z(I(s), (o, r) => (v(), _("div", {
            key: r,
            class: "line-item flex-row j_b"
          }, [
            g("div", me, P(o), 1),
            g("div", ge, P(o), 1)
          ]))), 128))
        ]),
        g("div", fe, [
          pe,
          g("div", {
            class: E([
              "bottom-circle",
              n.show && (n.data.value >= 0 ? "active" : "trans")
            ])
          }, null, 2),
          et(g("div", ve, [
            g("div", {
              class: E(["active", I(i) >= 0.94 && "br", n.show && "trans"]),
              style: j({ "--per": I(i) < 1 ? I(i) : 1 })
            }, [
              et(g("div", {
                class: E(["bottom-warn", I(i) >= 0.94 && "br"]),
                style: j({ "--per": I(l) < 1 ? I(l) : 1 })
              }, null, 6), [
                [st, n.data.value > n.data.warn]
              ])
            ], 6)
          ], 512), [
            [st, n.data.value >= 0]
          ])
        ])
      ]),
      g("div", _e, [
        vt(P(n.data.value) + "°", 1),
        ye
      ])
    ]));
  }
}), H = /* @__PURE__ */ C(we, [["__scopeId", "data-v-0e9f2553"]]);
H.install = (n) => {
  n.component(H.name, H);
};
const xe = { id: "canvas" }, ke = y({
  name: "YuanWar"
}), U = /* @__PURE__ */ y({
  ...ke,
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
  setup(n) {
    const t = n;
    return M(() => {
      const e = document.getElementById("canvas"), s = e.getContext("2d"), i = t.width, l = t.height;
      e.height = l, e.width = i;
      const c = (u, m) => Math.sqrt(Math.pow(u.x - m.x, 2) + Math.pow(u.y - m.y, 2)) < u.radius + m.radius;
      function a(u, m, p, h, S) {
        s.beginPath(), s.arc(u, m, p, 0, 2 * Math.PI), s.shadowColor = S ? h : "", s.shadowBlur = S ? p : 0, s.fillStyle = h, s.fill();
      }
      class o {
        constructor() {
          this.hp = 100, this.x = 200, this.y = 200, this.color = "purple";
        }
        draw() {
          a(this.x, this.y, 16, this.color, !0);
        }
      }
      class r {
        constructor(m) {
          this.angle = m, this.damage = 3, this.x = 200, this.y = 200, this.speed = 4, this.state = 1, this.color = "yellow", this.radius = 4;
        }
        move() {
          this.x += Math.cos(this.angle * Math.PI / 180) * this.speed, this.y += Math.sin(this.angle * Math.PI / 180) * this.speed;
        }
        draw() {
          this.state && a(this.x, this.y, this.radius, this.color, !0);
        }
        intersectionDetection(m) {
          const p = m.find((h) => h.state && c(h, this));
          p && (this.state = 0, p.hurt(this));
        }
      }
      class f {
        constructor() {
          this.x = -10, this.y = 200, this.speed = 0.2, this.color = "red", this.state = 1, this.radius = 6, this.hp = 3;
        }
        draw() {
          this.state && a(this.x, this.y, this.radius, this.color, !0);
        }
        move() {
          this.x += this.speed;
        }
        hurt(m) {
          this.hp -= m.damage, this.hp <= 0 && (this.state = 0);
        }
      }
      const x = (u, m) => {
        const p = Math.sqrt(u * u + m * m), h = Math.asin(m / p) * 180 / Math.PI;
        return +(u > 0 ? h : 180 - h).toFixed(2);
      };
      class d {
        constructor() {
          this.angle = 0, this.x = 0, this.y = 0, this.moveHandler = this._moveHandler.bind(this);
        }
        _moveHandler(m) {
          const p = e.getClientRects()[0], h = m.pageX - (p == null ? void 0 : p.x), S = m.pageY - (p == null ? void 0 : p.y);
          this.x = h, this.y = S, this.angle = x(h - 200, S - 200);
        }
        on() {
          document.addEventListener("mousemove", this.moveHandler);
        }
        off() {
          document.removeEventListener("mousemove", this.moveHandler);
        }
      }
      const k = 30, b = 300;
      ({
        bulletCD: 0,
        enemyCD: 0,
        start() {
          this.king = new o(), this.enemies = [], this.bullets = [], this.mouse = new d(), this.mouse.on(), this.loop();
        },
        loop() {
          requestAnimationFrame(() => this.loop()), this.draw(), this.move(), this.intersectionDetection(), this.cd();
        },
        cd() {
          this.bulletCD-- < 1 && (this.bullets.push(new r(this.mouse.angle)), this.bulletCD = k), this.enemyCD-- < 1 && (this.enemies.push(new f()), this.enemyCD = b);
        },
        intersectionDetection() {
          this.bullets.forEach((u) => {
            u.intersectionDetection(this.enemies);
          });
        },
        draw() {
          s.clearRect(0, 0, i, l), this.king.draw(), this.enemies.forEach((u) => u.draw()), this.bullets.forEach((u) => u.draw());
        },
        move() {
          this.enemies.forEach((u) => u.move()), this.bullets.forEach((u) => u.move());
        }
      }).start();
    }), (e, s) => (v(), _("canvas", xe));
  }
});
U.install = (n) => {
  n.component(U.name, U);
};
const Se = ["width", "height"], Me = y({
  name: "Clocks"
}), K = /* @__PURE__ */ Object.assign(Me, {
  props: {
    width: {
      type: Number,
      default: 500
    },
    height: {
      type: Number,
      default: 500
    },
    backgroundColor: {
      type: String,
      default: "#03303a"
    }
  },
  setup(n) {
    const t = n;
    return M(() => {
      let e = document.getElementById("canvas"), s = e.getContext("2d");
      s.strokeStyle = "#7FFFD4", s.lineWidth = 3, s.shadowBlur = 5, s.shadowColor = "#7FFFD4";
      let i = 0, l = 0, c = 0, a = "", o = e.getContext("2d"), r = e.getContext("2d");
      o.lineWidth = 1, o.shadowBlur = 0, o.shadowColor = "#F0F8FF";
      function f() {
        p(), u(), d(), k(), b(), w(), x();
      }
      function x() {
        r.save(), r.translate(250, 250), r.beginPath(), r.fillStyle = "#7FFFD4", r.font = "30px Helvetica";
        for (let h = 0; h < 60; h++)
          if (h % 5 == 0) {
            r.lineWidth = 5;
            let S = Math.sin(h * 6 * 2 * Math.PI / 360) * 195, T = -Math.cos(h * 6 * 2 * Math.PI / 360) * 195;
            r.fillText(h == 0 ? 12 : h / 5, h == 0 ? -15 : S - 10, h == 0 ? -185 : h <= 30 ? T + 5 : T + 10);
          }
        r.stroke(), r.closePath(), r.restore();
      }
      function d() {
        o.save(), o.translate(250, 250), o.rotate(i / 60 * 2 * Math.PI), o.beginPath(), o.strokeStyle = "#AFEEEE", o.lineWidth = 1, o.lineJoin = "bevel", o.miterLimit = 10, o.moveTo(0, 30), o.lineTo(3, -175), o.lineTo(13, -165), o.lineTo(0, -210), o.lineTo(-13, -165), o.lineTo(-3, -175), o.lineTo(0, 30), o.stroke(), o.closePath(), o.restore();
      }
      function k() {
        o.save(), o.translate(250, 250), o.rotate(l * 6 * Math.PI / 180), o.beginPath(), o.strokeStyle = "#20B2AA", o.lineWidth = 1, o.lineJoin = "bevel", o.miterLimit = 10, o.moveTo(0, 20), o.lineTo(3, -145), o.lineTo(10, -135), o.lineTo(0, -180), o.lineTo(-10, -135), o.lineTo(-3, -145), o.lineTo(0, 20), o.stroke(), o.closePath(), o.restore();
      }
      function b() {
        o.save(), o.translate(250, 250), o.rotate(c * 30 * Math.PI / 180), o.beginPath(), o.strokeStyle = "#87CEFA", o.lineWidth = 1, o.lineJoin = "bevel", o.miterLimit = 10, o.moveTo(0, 20), o.lineTo(3, -110), o.lineTo(10, -100), o.lineTo(0, -150), o.lineTo(-10, -100), o.lineTo(-3, -110), o.lineTo(0, 20), o.stroke(), o.closePath(), o.restore();
      }
      function w() {
        o.beginPath(), o.fillStyle = "black", o.arc(250, 250, 3, 0, 2 * Math.PI), o.stroke();
      }
      function u() {
        for (let h = 0; h < 60; h++)
          o.save(), o.translate(250, 250), o.rotate(h / 60 * 2 * Math.PI), o.beginPath(), o.strokeStyle = "#7FFFD4", o.moveTo(0, -250), o.lineWidth = h % 5 == 0 ? 5 : 2, o.lineTo(0, -230), o.stroke(), o.closePath(), o.restore();
        o.beginPath(), o.arc(250, 250, 230, 0, 2 * Math.PI), o.stroke();
      }
      function m(h) {
        let S, T = Math.PI / 180;
        return h == 0 ? S = 270 * T : S = h * T, S;
      }
      function p() {
        let h = /* @__PURE__ */ new Date(), S = h.toLocaleDateString(), T = h.toLocaleTimeString(), lt = h.getDay(), rt = h.getHours(), ct = h.getMinutes(), dt = h.getSeconds(), ht = h.getMilliseconds(), X = dt + ht / 1e3, z = ct + X / 60, tt = rt + z / 60;
        switch (i = X, l = z, c = tt, lt) {
          case 1:
            a = "一";
            break;
          case 2:
            a = "二";
            break;
          case 3:
            a = "三";
            break;
          case 4:
            a = "四";
            break;
          case 5:
            a = "五";
            break;
          case 6:
            a = "六";
            break;
          case 0:
            a = "日";
            break;
        }
        const G = s.createRadialGradient(250, 250, 5, 250, 250, 300);
        G.addColorStop(0, "#03303a"), G.addColorStop(1, "#03303a"), s.fillStyle = G, s.fillRect(0, 0, t.width, t.height), s.beginPath(), s.strokeStyle = "#87CEFA", s.arc(250, 250, 215, m(0), m(tt * 30 - 90)), s.stroke(), s.beginPath(), s.strokeStyle = "#20B2AA", s.arc(250, 250, 220, m(0), m(z * 6 - 90)), s.stroke(), s.beginPath(), s.strokeStyle = "#AFEEEE", s.arc(250, 250, 225, m(0), m(X * 6 - 90)), s.stroke(), s.font = "25px Helvetica Bold", s.fillStyle = "#7FFFD4", s.fillText(S + "/星期" + a, 150, 230), s.font = "23px Helvetica Bold", s.fillStyle = "#7FFFD4", s.fillText(T, 190, 280);
      }
      setInterval(f, 60);
    }), (e, s) => (v(), _("canvas", {
      id: "canvas",
      width: n.width,
      height: n.height
    }, null, 8, Se));
  }
});
K.install = (n) => {
  n.component(K.name, Button);
};
const Ce = { class: "layui-body" }, Te = /* @__PURE__ */ bt('<div id="container" data-v-56e5dfd0><video id="gum" autoplay muted data-v-56e5dfd0></video><div class="controls" data-v-56e5dfd0><button id="record" disabled data-v-56e5dfd0>开始录制</button><button id="play" disabled data-v-56e5dfd0>播放</button><button id="download" disabled data-v-56e5dfd0>下载</button><span id="tEl" data-v-56e5dfd0></span></div><video id="gum2" controls="controls" autoplay style="display:none;" data-v-56e5dfd0></video></div>', 1), Ie = [
  Te
], Ee = y({
  name: "VideoRecording"
}), $e = /* @__PURE__ */ Object.assign(Ee, {
  setup(n) {
    return M(() => {
      new At();
    }), (t, e) => (v(), _("div", Ce, Ie));
  }
}), O = /* @__PURE__ */ C($e, [["__scopeId", "data-v-56e5dfd0"]]);
O.install = (n) => {
  n.component(O.name, O);
};
const De = y({
  name: "Spotlight"
}), Q = /* @__PURE__ */ Object.assign(De, {
  props: {
    width: {
      type: Number,
      default: 500
    },
    height: {
      type: Number,
      default: 500
    }
  },
  setup(n) {
    const t = n;
    return M(() => {
      document.querySelector("style").append(`canvas {
        position: fixed;
        left:0;
        top: 0;
        z-index: 9999;
        pointer-events: none;
    }`), document.body.appendChild(document.createElement("canvas"));
      const e = document.querySelector("canvas"), s = e.getContext("2d");
      e.width = t.width, e.height = t.height;
      const i = {
        x: 0,
        y: 0,
        r: 50
      };
      document.onmousemove = (c) => {
        i.x = c.clientX, i.y = c.clientY, l();
      };
      const l = () => {
        s.beginPath(), s.clearRect(0, 0, e.width, e.height);
        var c = s.createRadialGradient(i.x, i.y, i.r, i.x, i.y, i.r * 3);
        c.addColorStop(0, "#fff"), c.addColorStop(1, "rgba(0, 0, 0, 0.5)"), s.fillStyle = c, s.fillRect(0, 0, e.width, e.height);
      };
      l();
    }), (e, s) => null;
  }
});
Q.install = (n) => {
  n.component(Q.name, Button);
};
const Be = ["width", "height"], Pe = y({
  name: "DrawImage"
}), Re = /* @__PURE__ */ y({
  ...Pe,
  props: {
    width: {
      type: Number,
      default: () => 500
    },
    height: {
      type: Number,
      default: () => 500
    },
    bl: {
      type: Number,
      default: () => 5
    },
    renderList: {
      type: Array,
      default: () => []
    }
  },
  setup(n) {
    const t = n, e = D("");
    M(() => {
      new Ft({
        el: e.value,
        bl: t.bl,
        renderList: t.renderList
      });
    });
    const s = () => {
      const i = document.createElement("a");
      i.href = e.value.toDataURL("image/png"), i.setAttribute("download", "canvas.png"), i.click();
    };
    return (i, l) => (v(), _($, null, [
      g("canvas", {
        ref_key: "cvs",
        ref: e,
        id: "cvs",
        width: n.width,
        height: n.height,
        style: j(`width:${n.width}px`)
      }, null, 12, Be),
      g("div", null, [
        g("button", {
          onClick: l[0] || (l[0] = (c) => s())
        }, "下载图片")
      ])
    ], 64));
  }
});
const Y = /* @__PURE__ */ C(Re, [["__scopeId", "data-v-e12a0a84"]]);
Y.install = (n) => {
  n.component(Y.name, Y);
};
const Le = y({
  name: "CanvasAutograph"
}), q = /* @__PURE__ */ Object.assign(Le, {
  props: {
    config: {
      type: Object,
      default: {
        width: 400,
        // 宽度
        height: 200,
        // 高度
        lineWidth: 3,
        // 线宽
        strokeStyle: "red",
        // 线条颜色
        lineCap: "round",
        // 设置线条两端圆角
        lineJoin: "round"
        // 线条交汇处圆角
      }
    }
  },
  setup(n) {
    const t = n, e = D("null");
    let s = null, i = null;
    M(() => {
      var d, k;
      s = e.value, s.width = (d = t.config) == null ? void 0 : d.width, s.height = (k = t.config) == null ? void 0 : k.height, s.style.border = "1px solid #000", i = s.getContext("2d"), i.fillStyle = "transparent", i.fillRect(
        0,
        // x 轴起始绘制位置
        0,
        // y 轴起始绘制位置
        t.config.width,
        // 宽度
        t.config.height
        // 高度
      );
      const a = {
        offsetX: 0,
        // 偏移量
        offsetY: 0,
        endX: 0,
        // 坐标
        endY: 0
      }, o = /Mobile|Android|iPhone/i.test(navigator.userAgent), r = (b) => {
        const { offsetX: w, offsetY: u, pageX: m, pageY: p } = o ? b.changedTouches[0] : b;
        a.offsetX = w, a.offsetY = u, a.endX = m, a.endY = p, i.beginPath(), i.lineWidth = t.config.lineWidth, i.strokeStyle = t.config.strokeStyle, i.lineCap = t.config.lineCap, i.lineJoin = t.config.lineJoin, i.moveTo(a.endX, a.endY), window.addEventListener(o ? "touchmove" : "mousemove", f);
      }, f = (b) => {
        const { pageX: w, pageY: u } = o ? b.changedTouches[0] : b;
        a.endX = w, a.endY = u, i.lineTo(w, u), i.stroke();
      }, x = () => {
        i.closePath(), window.removeEventListener("mousemove", f);
      };
      window.addEventListener(o ? "touchstart" : "mousedown", r), window.addEventListener(o ? "touchend" : "mouseup", x);
    });
    const l = () => {
      i.clearRect(0, 0, t.config.width, t.config.height);
    }, c = () => {
      s.toBlob((a) => {
        const o = Date.now().toString(), r = document.createElement("a");
        r.download = `${o}.png`, r.href = URL.createObjectURL(a), r.click(), r.remove();
      });
    };
    return (a, o) => (v(), _($, null, [
      g("canvas", {
        ref_key: "refs",
        ref: e
      }, null, 512),
      g("div", null, [
        g("button", {
          onClick: o[0] || (o[0] = (r) => l())
        }, "取消"),
        g("button", {
          onClick: o[1] || (o[1] = (r) => c())
        }, "保存")
      ])
    ], 64));
  }
});
q.install = (n) => {
  n.component(q.name, q);
};
const Ae = /* @__PURE__ */ g("button", null, "点击开始", -1), Fe = {
  ref: "canvas",
  class: "canvas"
}, We = y({
  name: "RedPacketRain"
}), V = /* @__PURE__ */ Object.assign(We, {
  setup(n) {
    return M(() => {
      const t = document.querySelector(".canvas");
      t.width = "400", t.height = "400";
      const e = t.width;
      if (t.getContext) {
        let c = function() {
          let r = new i(1, 3, o(0, e - 50), 0, t.clientWidth, t.clientHeight);
          r.draw(), l.push(r), setInterval(() => {
            let f = new i(1, 3, o(0, e - 50), 0, t.clientWidth, t.clientHeight);
            f.draw(), l.push(f);
          }, 500), a();
        }, a = function() {
          s.clearRect(0, 0, t.clientWidth, t.clientHeight);
          for (let r = 0; r < l.length; r++)
            l[r].y >= t.height ? (l.splice(r, 1), l[r].move(), l[r].draw()) : (l[r].move(), l[r].draw());
          window.requestAnimationFrame(a);
        }, o = function(r, f) {
          return Math.ceil(Math.random() * (f - r) + r);
        };
        const s = t.getContext("2d");
        class i {
          constructor(f, x, d, k, b, w, u = 50, m = 50, p = "red") {
            this.speedY = x, this.speedX = f, this.x = d, this.y = k, this.boxWidth = b, this.boxHeight = w, this.width = u, this.height = m, this.color = p;
          }
          draw() {
            s.strokeStyle = this.color, s.strokeRect(this.x, this.y, this.width, this.height);
          }
          move() {
            this.y += this.speedY;
          }
        }
        let l = [];
        document.querySelector("button").onclick = c, document.querySelector(".canvas").onclick = function(r) {
          const f = r.clientX - t.offsetLeft, x = r.clientY - t.offsetTop;
          for (let d = 0; d < l.length; d++)
            if (l[d].x <= f && l[d].x + l[d].width >= f && l[d].y <= x && l[d].y + l[d].height >= x) {
              console.log(l[d]), l[d].color = "green";
              continue;
            }
        };
      }
    }), (t, e) => (v(), _($, null, [
      Ae,
      g("canvas", Fe, " 浏览器版本较低 ", 512)
    ], 64));
  }
});
V.install = (n) => {
  n.component(V.name, V);
};
class Ne {
  //初始化
  constructor(t, e) {
    //水印文字
    B(this, "waterTexts", []);
    //需要添加水印的dom集合
    B(this, "needAddWaterTextElementIds", null);
    //保存添加水印的dom
    B(this, "saveNeedAddWaterMarkElement", []);
    t && t.length != 0 ? this.waterTexts = t : this.waterTexts = ["水印文字哈哈哈哈", "2022-12-08"], this.needAddWaterTextElementIds = Array.isArray(e) ? e : [e];
  }
  //开始添加水印
  startWaterMark() {
    const t = this;
    this.needAddWaterTextElementIds ? this.needAddWaterTextElementIds.forEach((e) => {
      let s = document.getElementById(e);
      t.saveNeedAddWaterMarkElement.push(s);
    }) : this.saveNeedAddWaterMarkElement = Array.from(document.getElementsByTagName("img")), this.saveNeedAddWaterMarkElement.forEach((e) => {
      t.startWaterMarkToElement(e);
    });
  }
  //添加水印到到dom对象
  startWaterMarkToElement(t) {
    let e = t.nodeName;
    ["IMG", "img"].indexOf(e) != -1 ? this.addWaterMarkToImg(t) : this.addWaterMarkToNormalEle(t);
  }
  //给图片添加水印
  async addWaterMarkToImg(t) {
    t.complete || await new Promise((e) => {
      t.onload = e;
    }), this.addWaterMarkToNormalEle(t);
  }
  //给普通dom对象添加水印
  addWaterMarkToNormalEle(t) {
    const e = this;
    let s = document.createElement("canvas");
    s.width = t.width ? t.width : t.clientWidth, s.height = t.height ? t.height : t.clientHeight;
    let i = s.getContext("2d"), c = Math.max(s.height, s.width) / 25;
    i.font = c + 'px "微软雅黑"', i.fillStyle = "rgba(195,195,195,1)", i.textAlign = "left", i.textBaseline = "top", i.save();
    let a = -Math.PI / 10, o = s.height * Math.tan(Math.abs(a)), r = (s.width - o) * Math.tan(Math.abs(a));
    i.translate(-o / 2, r / 2), i.rotate(a);
    let f = 0, x = 0, d = c / 2;
    for (; x < s.height; ) {
      let k = 0;
      for (; f < s.width; ) {
        let b = 0, w = 0;
        this.waterTexts.forEach((u, m) => {
          w += m * (d + c);
          let p = e.drawWater(i, u, f, x + w), h = p.x + p.width;
          b = h > b ? h : b, k = w;
        }), f = b + 20;
      }
      f = 0, x += k + (d + c + s.height / 5);
    }
    i.restore(), this.addCanvas(s, t);
  }
  //绘制水印
  drawWater(t, e, s, i) {
    t.fillText(e, s, i);
    let l = t.measureText(e), c = l.width, a = l.height;
    return { x: s, y: i, width: c, height: a };
  }
  //添加canvas到当前标签的父标签上
  addCanvas(t, e) {
    let s = document.createElement("div");
    e.warterMark = s, this.resetCanvasPosition(e), s.appendChild(t), e.parentElement.insertBefore(s, e);
  }
  //重新计算位置
  resetCanvasPosition(t) {
    t.warterMark && (t.parentElement.style.cssText = "position: relative;", t.warterMark.style.cssText = "position: absolute;top: 0px;left: 0px;pointer-events:none");
  }
}
const He = ({
  fullscreenFlag: n,
  className: t
}) => {
  const e = document.fullscreen || document.webkitIsFullScreen || document.mozFullScreen, s = t ? document.querySelector(`.${t}`) : document.body;
  if (s && !n) {
    let i = s.requestFullscreen || s.mozRequestFullScreen || s.webkitRequestFullScreen || s.msRequestFullscreen;
    i && i.call(s);
  }
  if (document && e && n) {
    let i = document.exitFullscreen || document.mozCancelFullScreen || document.webkitCancelFullScreen || document.msExitFullscreen;
    i && i.call(document);
  }
}, Ue = {
  WaterMark: Ne,
  useToggleFullscreen: He
};
const Oe = [R, L, J, A, F, H, U, W, N, O, K, Q, Y, q, V], Ye = (n) => {
  Oe.forEach((t) => {
    n.component(t.name, t);
  });
}, Xe = { install: Ye, Utils: Ue };
export {
  F as AlanBackTop,
  J as AlanButton,
  q as CanvasAutograph,
  K as Clocks,
  A as CodeBackgroundWall,
  L as DigitalScroll,
  Y as DrawImage,
  W as DynamicCard,
  V as RedPacketRain,
  Q as Spotlight,
  R as StarrySky,
  N as TakingPictures,
  H as TherMometer,
  Ue as Utils,
  O as VideoRecording,
  U as YuanWar,
  Xe as default
};
