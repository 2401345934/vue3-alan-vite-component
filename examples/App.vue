<script setup>
import { StarrySky,DigitalScroll,Button } from '../packages/index';

</script>

<template>
	<starry-sky :stars-count="888" :distance="1000" />
	<digital-scroll :targetNumber="1234" targetClass="class"></digital-scroll>
  <Button  type="primary">111</Button>
</template>

<style scoped>
.class {
  color: #fff;
}
</style>
