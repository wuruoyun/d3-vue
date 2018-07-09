<template>
  <path fill="none" :stroke="color" :d="path"></path>
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
      const path = d3.line()
        .x(this.scaledXFn)
        .y(this.scaledYFn)

      if (this.curveFn) path.curve(this.curveFn)
      if (this.definedFn) path.defined(this.definedFn)
      return path(this.data)
    }
  }
}
</script>
