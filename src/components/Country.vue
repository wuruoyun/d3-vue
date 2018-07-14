<template>
  <g ref="country" class="country"></g>
</template>

<script>
import * as d3 from 'd3'
import * as topojson from 'topojson'

export default {
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
      const g = d3.select(this.$refs.country)
      const county = g.append("g")
        .attr("class", "counties")
        .selectAll("path")
        .data(topojson.feature(data, data.objects.counties).features)
        .enter().append("path")
        .attr("fill", countyColorFn)
        .attr("d", path)
      if (titleFn) {
        county.append("title").text(titleFn);
      }

      g.append("path")
        .datum(topojson.mesh(data, data.objects.states, (a, b) => a !== b))
        .attr("class", "states")
        .attr("d", path);
    }
  },
  mounted () {
    this.update()
  }
}
</script>


