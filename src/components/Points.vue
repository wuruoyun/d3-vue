<template>
  <g class="points">
    <circle v-for="(d, i) in data" :key="keyFn ? keyFn(d) : i"
      class="point" :r="size" :fill="colorFn(d)" :cx="scaledXFn(d)" :cy="scaledYFn(d)"/>
  </g>
</template>

<script>
import CartesianArray from '../mixins/CartesianArray'

export default {
  mixins: [ CartesianArray ],
  props: {
    size: {
      type: Number,
      default: 5
    },
    color: {
      type: String | Function,
      required: false
    }
  },
  computed: {
    colorFn () {
      const { color } = this
      return typeof color === 'function' ? color : d => color
    }
  }
}
</script>
