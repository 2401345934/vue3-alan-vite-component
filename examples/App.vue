<script setup>
import { StarrySky,DigitalScroll } from '../packages/index';
</script>

<template>
	<starry-sky :stars-count="1111" :distance="1000" />
	<digital-scroll :targetNumber="1234" targetClass="class"></digital-scroll>
</template>

<style scoped>
.class {
  color: #fff;
}
</style>
