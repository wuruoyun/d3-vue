<template>
  <g ref="bars"></g>
</template>

<script>
import * as d3 from 'd3'
import CartesianArray from '../mixins/CartesianArray'

export default {
  mixins: [ CartesianArray ],
  props: {
    animated: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    orientation () {
      return (typeof this.scaleX.domain()[0] === 'number'
        && typeof this.scaleY.domain()[0] === 'string')
        ? 'horizontal' : 'vertical'
    }
  },
  methods: {
    update () {
      const { data, scaleX, scaleY, width, height, xFn, yFn } = this

      if (!data) return

      const bars = d3.select(this.$el).selectAll('.bar').data(data, this.keyFn)

      bars.exit().remove()

      if (this.orientation === 'vertical') {
        if (this.animated) {
          bars.enter().append('rect')
            .attr('class', 'bar')
            .attr('x', d => scaleX(xFn(d)))
            .attr('y', d => height)
            .attr('width', scaleX.bandwidth())
            .attr('height', 0)
            .merge(bars)
            .transition().duration(500)
            .attr('y', d => scaleY(yFn(d)))
            .attr('height', d => height - scaleY(yFn(d)))
        } else {
          bars.enter().append('rect')
            .attr('class', 'bar')
            .attr('x', d => scaleX(xFn(d)))
            .attr('y', d => scaleY(yFn(d)))
            .attr('width', scaleX.bandwidth())
            .attr('height', d => height - scaleY(yFn(d)))
        }
      } else {
        if (this.animated) {
          bars.enter().append('rect')
            .attr('class', 'bar')
            .attr('x', d => 0)
            .attr('y', d => scaleY(yFn(d)))
            .attr('width', 0)
            .attr('height', scaleY.bandwidth())
            .merge(bars)
            .transition().duration(500)
            .attr('width', d => scaleX(xFn(d)))
        } else {
          bars.enter().append('rect')
            .attr('class', 'bar')
            .attr('x', d => scaleX(xFn(d)))
            .attr('y', d => scaleY(yFn(d)))
            .attr('width', d => scaleX(xFn(d)))
            .attr('height', scaleY.bandwidth())
        }
      }
    }
  },
  mounted () {
    this.update()
  }
}
</script>
