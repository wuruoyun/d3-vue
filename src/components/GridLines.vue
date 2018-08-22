<template>
  <g class="grid"></g>
</template>

<script>
import * as d3 from 'd3'

export default {
  props: {
    orientation: {
      type: String,
      default: 'Horizontal'
    },
    scaleX: {
      type: Function,
      required: true
    },
    scaleY: {
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
      const { orientation, scaleX, scaleY, width, height, options } = this
      const axis = orientation === 'Horizontal'
        ? d3['axisLeft'](scaleY) : d3['axisBottom'](scaleX)
      if (options) {
        const { count } = options
        if (count) axis.ticks(count)
      }
      const tickSize = orientation === 'Horizontal' ? -width : height
      axis.tickSize(tickSize).tickFormat('')
      return axis
    }
  },
  watch: {
    axis (val) {
      this.update()
    },
    options (val) {
      this.update()
    }
  },
  methods: {
    update () {
      d3.select(this.$el).call(this.axis)
    }
  },
  mounted () {
    this.update()
  }
}
</script>
