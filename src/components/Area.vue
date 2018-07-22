<template>
  <path class="area" :fill="color" :d="path"></path>
</template>

<script>
import * as d3 from 'd3'
import CartesianArray from '../mixins/CartesianArray'

export default {
  mixins: [ CartesianArray ],
  props: {
    color: {
      type: String,
      default: 'steelblue'
    },
    y0: {
      type: String | Function,
      default: () => {
        return d => 0
      }
    },
    definedFn: {
      type: Function,
      required: false
    }
  },
  computed: {
    y0Fn () {
      const { y0 } = this
      return typeof y0 === 'function' ? y0 : d => d[y0]
    },
    scaledY0Fn () {
      return d => this.scaleY(this.y0Fn(d))
    },
    path () {
      const area = d3.area()
        .x(this.scaledXFn)
        .y0(this.scaledY0Fn)
        .y1(this.scaledYFn)
      
      if (this.definedFn) area.defined(this.definedFn)
      return area(this.data)
    }
  }
}
</script>
