<template>
  <g class="stacked-bars"></g>
</template>

<script>
import * as d3 from 'd3'
import CartesianStack from '../mixins/CartesianStack'

export default {
  mixins: [ CartesianStack ],
  methods: {
    update () {
      if (!this.data) return

      const { stackedData, colorFnByKey, scaleX, scaleY } = this
      const layer = d3.select(this.$el).selectAll('g')
        .data(stackedData)
        .enter().append('g')
          .attr('fill', d => colorFnByKey(d.key))
        .selectAll('rect')
          .data(d => d)
        .enter().append('rect')
          .attr('x', d => scaleX(this.xFn(d.data)))
          .attr('y', d => scaleY(d[1]))
          .attr('height', d => scaleY(d[0]) - scaleY(d[1]))
          .attr('width', scaleX.bandwidth())
    }
  }
}
</script>
