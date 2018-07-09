<template>
  <svg :width="width" :height="height">
    <slot/>
  </svg>
</template>

<script>
export default {
  props: {
    width: {
      type: Number,
      default: 600
    },
    height: {
      type: Number,
      default: 400
    }
  }
}
</script>
