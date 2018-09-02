<template>
  <g class="stacked-areas"></g>
</template>

<script>
import * as d3 from 'd3'
import CartesianStack from '../mixins/CartesianStack'

export default {
  mixins: [ CartesianStack ],
  props: {
    curveFn: {
      type: Function,
      required: false
    }
  },
  computed: {
    area () {
      const area = d3.area()
        .x(d => this.scaleX(this.xFn(d.data)))
        .y0(d => this.scaleY(d[0]))
        .y1(d => this.scaleY(d[1]))
      if (this.curveFn) area.curve(this.curveFn)
      return area
    }
  },
  methods: {
    update () {
      if (!this.data) return

      const { data, stack, keys, area, colorFn } = this
      const layer = d3.select(this.$el).selectAll('.layer')
        .data(stack(data))
        .enter().append('g')
          .attr('class', 'layer')

      colorFn.domain(keys)
      layer.append('path')
          .attr('class', 'area')
          .style('fill', d => colorFn(d.key))
          .attr('d', area)
    }
  }
}
</script>
