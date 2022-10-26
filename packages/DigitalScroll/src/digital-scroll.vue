<script lang="ts">
export default {
  alanComponentName: "DigitalScroll",
};
</script>
<script setup name="DigitalScroll" lang="ts">
import { onMounted } from 'vue';
import { useDigitScroll } from "../../Shard"

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
    const DigitScrollSource = new useDigitScroll({
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
