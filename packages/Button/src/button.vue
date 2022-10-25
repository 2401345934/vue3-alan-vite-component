<script lang="ts">
export default {
  alanComponentName: "AlanButton",
};
</script>
<script setup name="AlanButton" lang="ts">
defineProps({
  type: {
    type: String,
    default: 'default',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  block: {
    type: Boolean,
    default: false,
  },

});
// block	将按钮宽度调整为其父宽度的选项	boolean	false
// danger	设置危险按钮	boolean	false	2.2.0
// disabled	按钮失效状态	boolean	false	
// ghost	幽灵属性，使按钮背景透明	boolean	false	
// href	点击跳转的地址，指定此属性 button 的行为和 a 链接一致	string	-	
// htmlType	设置 button 原生的 type 值，可选值请参考 HTML 标准	string	button	
// icon	设置按钮的图标类型	v-slot	-	
// loading	设置按钮载入状态	boolean | { delay: number }	false	
// shape	设置按钮形状	default | circle | round	'default'	
// size	设置按钮大小	large | middle | small	middle	
// target	相当于 a 链接的 target 属性，href 存在时生效	string	-	
// type	设置按钮类型	primary  | default	default	

</script>

<template>
  <button :disabled="disabled"
          :class="['btn', block && 'block', disabled && 'disabled' , type]"
          >
    <slot></slot>
  </button>
</template>

<style scoped lang="scss">
.btn {
  line-height: 1.5715;
  position: relative;
  display: inline-block;
  font-weight: 400;
  white-space: nowrap;
  text-align: center;
  background-image: none;
  border: 1px solid transparent;
  box-shadow: 0 2px #00000004;
  cursor: pointer;
  transition: all .3s cubic-bezier(.645, .045, .355, 1);
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  touch-action: manipulation;
  height: 32px;
  padding: 4px 15px;
  font-size: 14px;
  border-radius: 2px;
  color: #000000d9;
  border-color: #d9d9d9;
  background: #fff;
  border: none
}

.disabled {
  color: #00000040;
  border-color: #d9d9d9;
  background: #f5f5f5;
  text-shadow: none;
  box-shadow: none;
}

.block {
  display: block;
  width: 100%;
}

.primary {
  border-color: var(--alan-primary-color);
  background: var(--alan-primary-color);
  text-shadow: 0 -1px 0 rgb(0 0 0 / 12%);
  box-shadow: 0 2px #0000000b;
  color: #fff;
}
</style>
