<template>
  <svg class="cartesian" :width="width" :height="height">
    <g :transform="transform">
      <g>
        <slot name="north"
          :scale="scaleX"
          :width="contentWidth"
          :height="margin.top"/>
      </g>
      <g :transform="`translate(${contentWidth},0)`">
        <slot name="east"
          :scale="scaleY"
          :width="margin.right"
          :height="contentHeight"/>
      </g>
      <g :transform="`translate(0,${contentHeight})`">
        <slot name="south"
          :scale="scaleX"
          :width="contentWidth"
          :height="margin.bottom"/>
      </g>
      <g>
        <slot name="west"
          :scale="scaleY"
          :width="margin.left"
          :height="contentHeight"/>
      </g>
      <g class="content-area" :clip-path="zoom ? 'url(#content-clip)' : null">
        <slot :scaleX="scaleX"
          :scaleY="scaleY"
          :width="contentWidth"
          :height="contentHeight"/>
      </g>
      <rect v-if="zoom"
        ref="zoom"
        style="cursor:move;fill:none;pointer-events:all;"
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
    x: {
      type: Object,
      required: true,
      validator: (value) => {
        const { type, domain } = value
        return type && domain
      }
    },
    y: {
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
      prefScaleY: null,
      silent: false
    }
  },
  computed: {
    domainX () {
      return this.x.domain
    },
    domainY () {
      return this.y.domain
    },
    defaultScaleX () {
      const scale = this.buildScale(this.x)
      return scale.domain(this.domainX).rangeRound([0, this.contentWidth])
    },
    defaultScaleY () {
      const scale = this.buildScale(this.y)
      return scale.domain(this.domainY).rangeRound([this.contentHeight, 0])
    },
    scaleX () {
      return this.prefScaleX ? this.prefScaleX : this.defaultScaleX
    },
    scaleY () {
      return this.prefScaleY ? this.prefScaleY : this.defaultScaleY
    }
  },
  methods: {
    buildScale (axis) {
      const { type, configFn } = axis
      const scale = d3[`scale${type}`]()
      if (configFn) configFn(scale)
      return scale
    },
    zoomToX (domain) {
      const { zoom, defaultScaleX, contentWidth } = this
      if (zoom && zoom !== 'x') {
        console.error('Interactive zoom is not x.')
      } else {
        this.prefScaleX = defaultScaleX.copy().domain(domain)
        if (zoom) {
          const x = [defaultScaleX(domain[0]), defaultScaleX(domain[1])]
          this.silent = true
          d3.select(this.$refs.zoom).call(this.zoomFn.transform, d3.zoomIdentity
            .scale(contentWidth / (x[1] - x[0]))
            .translate(-x[0], 0))
          this.silent = false
        }
      }
    },
    zoomToY (domain) {
      const { zoom, defaultScaleY, contentHeight } = this
      if (zoom && zoom !== 'y') {
        console.error('Interactive zoom is not y.')
      } else {
        this.prefScaleY = defaultScaleY.copy().domain(domain)
        if (zoom) {
          const y = [defaultScaleY(domain[0]), defaultScaleY(domain[1])]
          this.silent = true
          d3.select(this.$refs.zoom).call(this.zoomFn.transform, d3.zoomIdentity
            .scale(contentHeight / (y[0] - y[1]))
            .translate(0, -y[1]))
          this.silent = false
        }
      }
    },
    zoomTo (domain) {
      const { zoom, defaultScaleX, defaultScaleY, contentWidth, contentHeight } = this
      if (zoom) {
        console.error('Interactive zoom is not disabled.')
      } else {
        this.prefScaleX = defaultScaleX.copy().domain(domain.x)
        this.prefScaleY = defaultScaleY.copy().domain(domain.y)
        if (zoom) {
          const x = [defaultScaleX(domain.x[0]), defaultScaleX(domain.x[1])]
          const y = [defaultScaleY(domain.y[0]), defaultScaleY(domain.y[1])]
          this.silent = true
          d3.select(this.$refs.zoom).call(this.zoomFn.transform, d3.zoomIdentity
            .scale(contentWidth / (x[1] - x[0]), contentHeight / (y[0] - y[1]))
            .translate(-x[0], -y[1]))
          this.silent = false
        }
      }
    },
    resetZoom (orientation) {
      switch (orientation) {
        case 'x':
          this.prefScaleX = null
          break
        case 'y':
          this.prefScaleY = null
          break
        default:
          this.prefScaleX = null
          this.prefScaleY = null
          break
      }
    },
    zoomed () {
      const { zoom } = this
      const t = d3.event.transform
      if (zoom === 'x') {
        this.prefScaleX = t.rescaleX(this.defaultScaleX)
        if (!this.silent) this.$emit('zoom', this.prefScaleX.domain())
      } else if (zoom === 'y') {
        this.prefScaleY = t.rescaleY(this.defaultScaleY)
        if (!this.silent) this.$emit('zoom', this.prefScaleY.domain())
      } else {
        this.prefScaleX = t.rescaleX(this.defaultScaleX)
        this.prefScaleY = t.rescaleY(this.defaultScaleY)
        if (!this.silent) {
          this.$emit('zoom', {
            x: this.prefScaleX.domain(),
            y: this.prefScaleY.domain()
          })
        }
      }
    }
  },
  mounted () {
    const { zoom } = this
    if (zoom) {
      const { contentWidth, contentHeight } = this
      this.zoomFn = d3.zoom()
        .scaleExtent([1, Infinity])
        .translateExtent([[0, 0], [contentWidth, contentHeight]])
        .extent([[0, 0], [contentWidth, contentHeight]])
        .on('zoom', this.zoomed)
      d3.select(this.$refs.zoom).call(this.zoomFn)
    }
  }
}
</script>
