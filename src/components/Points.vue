<template>
  <g class="points"></g>
</template>

<script>
import * as d3 from 'd3'
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
    },
    animated: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    colorFn () {
      const { color } = this
      return typeof color === 'function' ? color : d => color
    }
  },
  watch: {
    scales () {
      const { scaledXFn, scaledYFn, animated } = this
      let points = d3.select(this.$el).selectAll('.point')
      if (animated) points = points.transition()
      points.attr('cx', scaledXFn).attr('cy', scaledYFn)
    }
  },
  methods: {
    update () {
      if (!this.data) return

      const { data, keyFn, size, colorFn, scaledXFn, scaledYFn } = this
      let points = d3.select(this.$el).selectAll('.point')
        .data(data, keyFn)

      points.exit()
        .transition().duration(500)
        .attr('r', 0)
        .remove()

      points = points.enter().append('circle')
          .attr('class', 'point')
          .attr('fill', colorFn)
          .attr('cx', scaledXFn)
          .attr('cy', scaledYFn)

      if (this.animated) {
        points.attr('r', 0)
          .merge(points)
          .transition()
          .attr('r', size)
          .attr('cx', scaledXFn)
          .attr('cy', scaledYFn)
      } else {
        points.attr('r', size)
      }
    }
  },
  mounted () {
    this.update()
  }
}
</script>
