<template>
  <svg class="country" :width="width" :height="height">
    <g :transform="transform">
      <g ref="map" :transform="scale !== 1 ? `scale(${scale})` : null"/>
      <slot></slot>
    </g>
  </svg>
</template>

<script>
import * as d3 from 'd3'
import * as topojson from 'topojson'
import Region from '../mixins/Region'

export default {
  mixins: [ Region ],
  props: {
    data: {
      type: Object
    },
    countyColorFn: {
      type: Function,
      default: () => 'none'
    },
    titleFn: {
      type: Function,
      required: false
    }
  },
  data () {
    return {
      scale: 1
    }
  },
  watch: {
    data (val) {
      this.update()
    }
  },
  methods: {
    update () {
      const { data, countyColorFn, titleFn } = this
      if (!data) return

      const path = d3.geoPath()
      const g = d3.select(this.$refs.map)
      const county = g.append('g')
        .attr('class', 'counties')
        .selectAll('path')
        .data(topojson.feature(data, data.objects.counties).features)
        .enter().append('path')
        .attr('fill', countyColorFn)
        .attr('d', path)
      if (titleFn) {
        county.append('title').text(titleFn)
      }

      g.append('path')
        .datum(topojson.mesh(data, data.objects.states, (a, b) => a !== b))
        .attr('class', 'states')
        .attr('d', path)

      const { width, height } = this.$refs.map.getBoundingClientRect()
      const widthRatio = this.contentWidth / width
      const heightRatio = this.contentHeight / height
      this.scale = Math.min(widthRatio, heightRatio)
    }
  },
  mounted () {
    this.update()
  }
}
</script>
