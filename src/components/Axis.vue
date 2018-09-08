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
    config: {
      type: Function,
      required: false
    },
    titleLastTick: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    axis () {
      const { orientation, scale, options, config } = this
      const axis = d3[`axis${orientation}`](scale)
      if (config) config(axis)
      return axis
    }
  },
  watch: {
    axis (val) {
      d3.select(this.$el).transition().call(val)
    },
    title (val) {
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
            if (this.titleLastTick) {
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
            if (this.titleLastTick) {
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
