
<script>
import { useRandomRgbColor } from "../../Shard"
export default {
  alanComponentName: "DynamicCard",
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
    isKeyboardControl:{
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      activeIndex: -1,
      cards: []
    };
  },
  watch:{
    shape: function(){
      this.initData()
    }
  },
  created () {
    this.initData();
  },
  mounted () {
    this.isKeyboardControl && window.addEventListener("keyup", this.keyboardDeal);
  },
  unmounted () {
    this.isKeyboardControl && window.removeEventListener("keyup", this.keyboardDeal);
  },
  methods: {
    initData () {
      const arr = new Array(this.cardList.length).fill(1);
      this.cards = arr.map((_, index) => {
        return this.computedStyle(index, this.cardList.length || 0);
      });
    },
    resetData (style) {
      this.style = style;
      this.initData();
    },
    computedStyle (index, length) {
      const style = this.shape;
      const defaultStyles = {
        "--max-index": length + 1,
        "--bg-color": useRandomRgbColor(),
        "--card-index": index
      };

      if (style === 0) {
        defaultStyles["left"] = `${16 * ++index}px`;
      } else if (style === 1) {
        let rotate = 0;
        if (index % 2 === 1) {
          rotate = length - index;
        } else {
          rotate = index - length;
        }
        defaultStyles["--rotate-deg"] = rotate + "deg";
      } else {
        const tangle = 48;
        const unitArc = tangle / length;
        let rotate = unitArc * index - 48 / 2;
        defaultStyles["--rotate-deg"] = rotate + "deg";
      }

      return defaultStyles;
    },
    addIndex () {
      if (this.activeIndex < this.cards.length - 1) {
        this.activeIndex++;
      } else {
        this.activeIndex = 0;
      }
    },
    lessIndex () {
      if (this.activeIndex > 0) {
        this.activeIndex--;
      } else {
        this.activeIndex = this.cards.length - 1;
      }
    },
    keyboardDeal (e) {
      if (document.activeElement !== document.body) return;
      const keyMap = new Map([
        [38,'addIndex'],
        [40,'lessIndex'],
        [37,'lessIndex'],
        [39,'addIndex'],
      ])
      keyMap.get(e.keyCode) && this[keyMap.get(e.keyCode)]()
    },

  }
};
</script>

<template>
  <div class="AnimationCards">
    <div class="demo-content">
      <div class="animation-cards-box">
        <div v-for="(styles, index) in cards"
             :class="['animation-card', { 'is-active': activeIndex === index, 'is-clutter': !!shape, 'is-list': !shape }]"
             :key="index"
             :style="styles"
             @click="activeIndex = activeIndex === index ? -1 : index">
          <span class="text-span">{{cardList[index].text}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.demo-content {
  margin: 20px auto;
  width: 50vw;
  height: 400px;
}

.animation-cards-box {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 20px;
  position: relative;
  perspective: 1px;

  ::-webkit-scrollbar {
    height: 0;
  }

  .animation-card {
    min-width: 200px;
    background-color: var(--bg-color);
    border-radius: 8px;
    cursor: pointer;
    position: absolute;
    top: 20px;
    bottom: 20px;
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.8);
    transition: all ease-in-out 0.2s;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 32px;
    font-weight: bold;
    color: #ffffff;
    z-index: var(--card-index);

    .text-span {
      margin: 0 20px;
    }
    &.is-list {
      animation: reject ease-in-out 0.4s;

      &:hover {
        &~.animation-card {
          transform: translateX(24px);
        }
      }

      &.is-active {
        z-index: var(--max-index);
        animation: eject ease-in-out 0.8s;
        transform: translateX(calc(var(--max-index) * 20px - var(--card-index) * 20px - 40px));
      }
    }

    &.is-clutter {
      transform: translateX(0%) rotate(var(--rotate-deg));
      transform-origin: bottom center;

      &.is-active {
        animation: rotation ease-in-out 0.8s;
        transform: translateX(calc(220%)) rotate(0deg);
        z-index: var(--max-index);
      }
    }
  }
}

@keyframes eject {
  50% {
    transform: translateX(calc(-100% - 20px)) rotate(-20deg);
  }
}

@keyframes reject {
  50% {
    transform: translateX(calc(100% + 20px)) rotate(10deg);
  }
}

@keyframes rotation {
  0% {
    transform: translateX(0%) rotate(var(--rotate-deg));
    z-index: var(--card-index);
  }

  60% {
    transform: translateX(calc(230%)) rotate(2deg);
  }

  70% {
    transform: translateX(calc(210%)) rotate(-2deg);
  }

  80% {
    transform: translateX(calc(225%)) rotate(1deg);
  }

  90% {
    transform: translateX(calc(215%)) rotate(-1deg);
    z-index: var(--card-index);
  }

  100% {
    transform: translateX(calc(220%)) rotate(0deg);
    z-index: var(--max-index);
  }
}
</style>
