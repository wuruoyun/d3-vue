<template>
  <g :class="axisClass" :transform="transform"></g>
</template>

<script>
import * as d3 from 'd3'
import CartesianChild from '../mixins/CartesianChild'
import Text from './Text.vue'

export default {
  mixins: [ CartesianChild ],
  components: { 'd3-text': Text },
  props: {
    type: {
      type: String,
      default: 'Linear'
    },
    title: {
      type: String,
      required: false
    },
    location: {
      type: String,
      default: 'Bottom'
    },
    options: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    isX () {
      return this.location === 'Bottom' || this.location === 'Top'
    },
    isY () {
      return this.location === 'Left' || this.location === 'Right'
    },
    axisClass () {
      return `axis axis--${this.isX ? 'x' : 'y'}`
    },
    transform () {
      if (this.location === 'Bottom') {
        return `translate(0,${this.height})`
      } else if (this.location === 'Right') {
        return `translate(${this.width},0)`
      }
    },
    scale () {
      return this.isX ? this.scaleX: this.scaleY
    }
  },
  watch: {
    scaleX (val) {
      if (this.isX) {
        this.update()
      }
    },
    scaleY (val) {
      if (this.isY) {
        this.update()
      }
    },
    location (val) {
      this.update()
    }
  },
  methods: {
    update () {
      const { type, title, location, scale, options, width } = this
      const axis = d3[`axis${location}`](scale)
      if (options) {
        switch (type) {
          case 'Linear':
          case 'Log':
            const { ticks, tickSize, tickPadding } = options
            if (ticks) axis.ticks(ticks.count, ticks.specifier)
            if (tickSize) axis.tickSize(tickSize)
            if (tickPadding) axis.tickPadding(tickPadding)
            break
        }
      }
      const g = d3.select(this.$el).call(axis)

      if (title) {
        switch (location) {
          case 'Left':
            if (options && options.titleLastTick) {
              g.select('.tick:last-of-type text')
                .select(function() { return this.parentNode.appendChild(this.cloneNode()) })
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
              g.select(".tick:last-of-type text")
                .select(function() { return this.parentNode.appendChild(this.cloneNode()) })
                .attr('class', 'label')
                .attr('fill', 'black')
                .attr("y", -3)
                .attr("dy", null)
                .text(title)
            } else {
              g.append('text')
                .attr('class', 'label')
                .attr('fill', 'black')
                .attr("x", width)
                .attr("y", -6)
                .style("text-anchor", "end")
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
