<template>
  <g class="legend" :transform="transform">
    <rect :width="size" :height="size" :transform="iconTransform" :fill="color"/>
    <text dy="1em" :style="textStyle" :transform="textTransform">
      <slot></slot>
    </text>
  </g>
</template>

<script>
export default {
  props: {
    size: {
      type: Number,
      default: 12
    },
    color: {
      type: String,
      default: 'grey'
    },
    align: {
      type: String,
      default: 'left'
    },
    transform: {
      type: String,
      required: false
    }
  },
  computed: {
    iconTransform () {
      if (this.align === 'right') return `translate(${-this.size},0)`
      else return null
    },
    textTransform () {
      const dx = this.size + 6
      return this.align === 'right'
        ? `translate(${-dx},0)` : `translate(${dx},0)`
    },
    textStyle () {
      if (this.align === 'right') return 'text-anchor:end;'
      else return null
    }
  }
}
</script>
