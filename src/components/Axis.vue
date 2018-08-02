<template>
  <g class="axis"></g>
</template>

<script>
import * as d3 from 'd3'
import Text from './Text.vue'

export default {
  components: { 'd3-text': Text },
  props: {
    title: {
      type: String,
      required: false
    },
    orientation: {
      type: String,
      default: 'Bottom'
    },
    scale: {
      type: Function,
      required: true
    },
    width: {
      type: Number,
      required: true
    },
    height: {
      type: Number,
      required: true
    },
    options: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    axis () {
      const { orientation, scale, options } = this
      const axis = d3[`axis${orientation}`](scale)
      if (options) {
        const { ticks, tickSize, tickPadding } = options
        if (ticks) axis.ticks(ticks.count, ticks.specifier)
        if (tickSize) axis.tickSize(tickSize)
        if (tickPadding) axis.tickPadding(tickPadding)
      }
      return axis
    }
  },
  watch: {
    axis (val) {
      const { title, orientation, axis, options } = this
      d3.select(this.$el).transition().call(axis)
    },
    title (val) {
      this.update()
    },
    options (val) {
      this.update()
    }
  },
  methods: {
    update () {
      const { title, orientation, axis, options } = this
      const g = d3.select(this.$el).call(axis)

      if (title) {
        switch (orientation) {
          case 'Left':
            if (options && options.titleLastTick) {
              g.select('.tick:last-of-type text')
                .select(function () { return this.parentNode.appendChild(this.cloneNode()) })
                .attr('class', 'label')
                .attr('x', 3)
                .attr('text-anchor', 'start')
                .text(title)
            } else {
              g.append('text')
                .attr('class', 'label')
                .attr('transform', 'rotate(-90)')
                .attr('fill', 'black')
                .attr('y', 6)
                .attr('dy', '.71em')
                .style('text-anchor', 'end')
                .text(title)
            }
            break
          case 'Bottom':
            if (options && options.titleLastTick) {
              g.select('.tick:last-of-type text')
                .select(function () { return this.parentNode.appendChild(this.cloneNode()) })
                .attr('class', 'label')
                .attr('fill', 'black')
                .attr('y', -3)
                .attr('dy', null)
                .text(title)
            } else {
              g.append('text')
                .attr('class', 'label')
                .attr('fill', 'black')
                .attr('x', this.width)
                .attr('y', -6)
                .style('text-anchor', 'end')
                .text(title)
            }
            break
        }
      }
    }
  },
  mounted () {
    this.update()
  }
}
</script>
