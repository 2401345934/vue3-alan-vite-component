<script setup>
import { StarrySky,DigitalScroll,Button as AlanButton } from '../packages/index';

</script>

<template>
	<starry-sky :stars-count="888" :distance="1000" />
	<digital-scroll :targetNumber="1234" targetClass="class"></digital-scroll>
  <alan-button  type="primary">111</alan-button>
</template>

<style scoped>
.class {
  color: #fff;
}
</style>
