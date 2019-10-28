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
    curveFn: {
      type: Function,
      required: false
    },
    definedFn: {
      type: Function,
      required: false
    }
  },
  computed: {
    path () {
      const area = d3.area()
        .x(this.scaledXFn)
        .y0(() => this.scaleY(0))
        .y1(this.scaledYFn)

      if (this.curveFn) area.curve(this.curveFn)
      if (this.definedFn) area.defined(this.definedFn)
      return area(this.data)
    }
  }
}
</script>
