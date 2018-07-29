<template>
  <g fill="none" stroke="#000" :stroke-width="0.5" stroke-join="round"></g>
</template>

<script>
import * as d3 from 'd3'
import CartesianArray from '../mixins/CartesianArray'

export default {
  mixins: [ CartesianArray ],
  props: {
    colorFn: {
      type: Function,
      required: false
    }
  },
  methods: {
    update () {
      if (!this.data) return

      const { width, height, scaledXFn, scaledYFn, colorFn } = this

      d3.select(this.$el).selectAll('path')
        .data(d3.contourDensity()
          .x(scaledXFn)
          .y(scaledYFn)
          .size([width, height])
          .bandwidth(10)(this.data))
        .enter().append('path')
        .attr('fill', colorFn)
        .attr('d', d3.geoPath())
    }
  },
  mounted () {
    this.update()
  }
}
</script>
