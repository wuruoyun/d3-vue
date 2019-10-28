<template>
  <text :transform="transform" :x="x" :y="y" :dx="dx" :dy="dy" :fill="color">
    <slot></slot>
  </text>
</template>

<script>
export default {
  props: {
    x: {
      type: Number,
      default: 20
    },
    y: {
      type: Number,
      default: 20
    },
    dx: {
      type: [Number, String],
      required: false
    },
    dy: {
      type: [Number, String],
      required: false
    },
    rotate: {
      type: Number,
      required: false
    },
    color: {
      type: String,
      default: 'black'
    },
    text: {
      type: String,
      default: ''
    }
  },
  computed: {
    transform () {
      if (this.rotate) {
        return `rotate(${this.rotate})`
      } else {
        return null
      }
    }
  }
}
</script>
