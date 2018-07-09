<template>
  <g ref="points"></g>
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
      const color = this.color || 'orange'
      return typeof color === 'function' ? color : d => color
    }
  },
  methods: {
    update () {
      if (!this.data) return

      const points = d3.select(this.$el).selectAll('.point')
        .data(this.data, this.keyFn)

      points.exit()
        .transition().duration(500)
        .attr('r', 0)
        .remove()

      if (this.animated) {
        points.enter().append('circle')
          .attr('class', 'point')
          .attr('r', 0)
          .attr('fill', this.colorFn)
          .attr('cx', this.scaledXFn)
          .attr('cy', this.scaledYFn)
          .merge(points)
          .transition().duration(500)
          .attr('r', this.size)
          .attr('cx', this.scaledXFn)
          .attr('cy', this.scaledYFn)
      } else {
        points.enter().append('circle')
          .attr('class', 'point')
          .attr('r', this.size)
          .attr('fill', this.colorFn)
          .attr('cx', this.scaledXFn)
          .attr('cy', this.scaledYFn)
      }
    }
  },
  mounted () {
    this.update()
  }
}
</script>
