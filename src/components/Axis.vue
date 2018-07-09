<template>
  <g ref="axis" :class="axisClass" :transform="transform">
    <template v-if="title">
      <d3-text v-if="isY" :x="0" :y="6" dy="0.71em" :rotate="-90">
        {{ title }}
      </d3-text>
      <d3-text v-if="isX" :x="width" :y="-6" style="text-anchor:end;">
        {{ title }}
      </d3-text>
    </template>
  </g>
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
      if (this.isX) {
        return this.scaleX
      } else {
        return this.scaleY
      }
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
      const { type, location, scale, options } = this
      const axis = d3[`axis${location}`](scale)
      if (options) {
        switch (type) {
          case 'Linear':
            const { ticks } = options
            if (ticks) axis.ticks(ticks.count, ticks.specifier)
            break
        }
      }
      d3.select(this.$refs.axis).call(axis)
    }
  },
  mounted () {
    this.update()
  }
}
</script>
