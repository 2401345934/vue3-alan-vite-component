<script setup name="DigitalScroll">
import { onMounted } from 'vue';
import DigitScroll from "./shard"

const props = defineProps({
	targetNumber: {
		type: Number,
		default: () => 300,
	},
  targetClass: {
    type: String,
    default: () => 'digital-scroll',
  }
});

onMounted(() => {
  // 初始化实例
    const DigitScrollSource = new DigitScroll({
      container: '#digital-scroll',
      // container 要操作的DOM节点
    });
    DigitScrollSource.roll(props.targetNumber);
});
</script>

<template>
	<div :class="targetClass" id="digital-scroll"></div>
</template>

<style scoped lang="scss">
.digital-scroll {
  color: #fff;

}
</style>
