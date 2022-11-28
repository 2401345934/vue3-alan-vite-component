<script setup name="AlanBackTop" lang="ts">
import { useSlots, onMounted, onBeforeUnmount, ref, } from 'vue';
import { useThrottle, useGetScrollPosition, useScrollToTop } from "../../Shard"
//判断<slot/>是否有传值
const slotDefault = !!useSlots().default;
const visibilityH = ref<boolean>(false)

const props = defineProps({
  visibilityHeight: {
    type: Number,
    default: 400,
  },
});

const parentEmits = defineEmits(['goTopCompleteCb'])

onMounted(() => {
  window.addEventListener('scroll', useThrottle(() => {
    scrollLoadMore()
  }, 250)) // 监听页面滚动
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', () => { })
})

// click
const handleBackTop = () => {
  useScrollToTop();
  parentEmits('goTopCompleteCb')
}

/**
  * 监听滚动条
* */
const scrollLoadMore = () => {
  visibilityH.value = useGetScrollPosition().y >= props.visibilityHeight
}

</script>
<template>
  <div class="alan-back-top"
       @click="handleBackTop">
    <!-- 如果传递了插槽 就不展示自带样式 -->
    <div :class="['warp', visibilityH && 'visibilityH']">
      <div class="alan-back-top-content"
           v-if="!slotDefault">
        返回
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.alan-back-top {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: #000000d9;
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5715;
  list-style: none;
  font-feature-settings: "tnum";
  position: fixed;
  right: 100px;
  bottom: 50px;
  z-index: 10;
  width: 60px;
  height: 60px;
  cursor: pointer;
}

.alan-back-top-content {
  width: 60px;
  height: 60px;
  overflow: hidden;
  color: #fff;
  text-align: center;
  background-color: #00000073;
  border-radius: 30px;
  transition: all .3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.warp {
  opacity: 0;
  transition: all .3s;
}

.visibilityH {
  opacity: 1;
}
</style>
