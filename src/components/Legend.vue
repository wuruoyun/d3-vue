<template>
  <g :transform="transform">
    <legend-item v-for="(item,i) in data" :key="labelFn(item)"
      :size="size"
      :color="colorFn(item)"
      :align="align"
      :transform="transformItem(i)">
      {{ labelFn(item) }}
    </legend-item>
  </g>
</template>

<script>
import * as d3 from 'd3'
import LegendItem from './LegendItem.vue'

export default {
  components: { LegendItem },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    size: {
      type: Number,
      default: 18
    },
    label: {
      type: String | Function,
      required: true
    },
    color: {
      type: String | Function,
      required: false
    },
    x: {
      type: Number,
      default: 10
    },
    y: {
      type: Number,
      default: 10
    },
    align: {
      type: String,
      default: 'left'
    }
  },
  computed: {
    labelFn () {
      const label = this.label
      return typeof label === 'function' ? label : d => d[label]
    },
    colorFn () {
      const color = this.color || 'orange'
      return typeof color === 'function' ? color : d => d[color]
    },
    transform () {
      return `translate(${this.x},${this.y})`
    }
  },
  methods: {
    transformItem (index) {
      return `translate(0,${index * (this.size + 2)})`
    }
  }
}
</script>
