<template>
  <svg class="cartesian" :width="width" :height="height">
    <g :transform="transform">
      <g clip-path="url(#content-clip)">
        <slot :scaleX="scaleX"
          :scaleY="scaleY"
          :width="contentWidth"
          :height="contentHeight"/>
      </g>
      <axis v-if="showAxisX"
        :type="axisX.type"
        :title="axisX.title"
        :location="axisLocationX"
        :options="axisX.options"
        :scaleX="scaleX"
        :scaleY="scaleY"
        :width="contentWidth"
        :height="contentHeight"/>
      <axis v-if="showAxisY"
        :type="axisY.type"
        :title="axisY.title"
        :location="axisLocationY"
        :options="axisY.options"
        :scaleX="scaleX"
        :scaleY="scaleY"
        :width="contentWidth"
        :height="contentHeight"/>
      <rect v-if="zoom"
        ref="zoom"
        class="zoom"
        :width="contentWidth"
        :height="contentHeight"/>
    </g>
    <defs>
      <clipPath id="content-clip">
        <rect :width="contentWidth" :height="contentHeight"/>
      </clipPath>
    </defs>
  </svg>
</template>

<script>
import * as d3 from 'd3'
import Region from '../mixins/Region'
import Axis from './Axis.vue'

export default {
  mixins: [ Region ],
  components: { Axis },
  props: {
    axisX: {
      type: Object,
      required: true,
      validator: (value) => {
        const { type, domain } = value
        return type && domain
      }
    },
    axisY: {
      type: Object,
      required: true,
      validator: (value) => {
        const { type, domain } = value
        return type && domain
      }
    },
    margin: {
      type: Object,
      default: () => {
        return { top: 20, right: 20, bottom: 30, left: 30 }
      }
    },
    zoom: {
      type: String, // x, y, xy
      required: false
    }
  },
  data () {
    return {
      prefScaleX: null,
      prefScaleY: null
    }
  },
  computed: {
    domainX () {
      return this.axisX.domain
    },
    domainY () {
      return this.axisY.domain
    },
    defaultScaleX () {
      const scale = this.buildScale(this.axisX)
      return scale.domain(this.domainX).rangeRound([0, this.contentWidth])
    },
    defaultScaleY () {
      const scale = this.buildScale(this.axisY)
      return scale.domain(this.domainY).rangeRound([this.contentHeight, 0])
    },
    scaleX () {
      return this.prefScaleX ? this.prefScaleX : this.defaultScaleX
    },
    scaleY () {
      return this.prefScaleY ? this.prefScaleY : this.defaultScaleY
    },
    showAxisX () {
      return this.axisX.display !== 'none'
    },
    showAxisY () {
      return this.axisY.display !== 'none'
    },
    axisLocationX () {
      return this.axisX.display === 'secondary' ? 'Top' : 'Bottom'
    },
    axisLocationY () {
      return this.axisY.display === 'secondary' ? 'Right' : 'Left'
    }
  },
  methods: {
    buildScale (axis) {
      const { type, options } = axis
      const scale = d3[`scale${type}`]()
      if (options) {
        switch (type) {
          case 'Band':
            const { padding } = options
            if (padding) scale.padding(padding)
            break
        }
      }
      return scale
    },
    resetZoom () {
      this.prefScaleX = null
      this.prefScaleY = null
    }
  },
  mounted () {
    const { zoom } = this
    if (zoom) {
      const { contentWidth, contentHeight } = this
      const zoomFn = d3.zoom()
        .scaleExtent([1, Infinity])
        .translateExtent([[0, 0], [contentWidth, contentHeight]])
        .extent([[0, 0], [contentWidth, contentHeight]])
        .on('zoom', () => {
          const t = d3.event.transform
          if (zoom === 'x') {
            this.prefScaleX = t.rescaleX(this.defaultScaleX)
            this.$emit('zoom', {
              x: this.prefScaleX.domain()
            })
          } else if (zoom === 'y') {
            this.prefScaleY = t.rescaleY(this.defaultScaleY)
            this.$emit('zoom', {
              y: this.prefScaleY.domain()
            })
          } else {
            this.prefScaleX = t.rescaleX(this.defaultScaleX)
            this.prefScaleY = t.rescaleY(this.defaultScaleY)
            this.$emit('zoom', {
              x: this.prefScaleX.domain(),
              y: this.prefScaleY.domain()
            })            
          }
        })
      d3.select(this.$refs.zoom).call(zoomFn)
    }
  }
}
</script>

<style scoped>
.zoom {
  cursor: move;
  fill: none;
  pointer-events: all;
}
</style>
