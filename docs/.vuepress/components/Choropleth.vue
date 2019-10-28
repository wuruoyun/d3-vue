<template>
  <d3-country class="demo" :width="860" :height="600" :data="us" :countyColorFn="colorFn">
    <d3-color-bar :x="580" :y="20" :colorScale="color" :domain="[1, 10]"
      title="Unemployment rate" :tickFormat="(x, i) => i ? x : x + '%'"/>
  </d3-country>
</template>

<script>
import * as d3 from 'd3'

export default {
  data () {
    return {
      us: null,
      color: null,
      colorFn: null
    }
  },
  created () {
    const unemployment = d3.map()
    this.color = d3.scaleThreshold().domain(d3.range(2, 10)).range(d3.schemeBlues[9])
    
    Promise.all([
      d3.json('https://d3js.org/us-10m.v1.json'),
      d3.tsv('/data/unemployment.tsv', d => unemployment.set(d.id, +d.rate))
    ]).then(values => {
      this.us = values[0]
      this.colorFn = d => this.color(unemployment.get(d.id))
    })
  }
}
</script>

<style lang="scss" scoped>
.demo /deep/ {
  .counties {
    fill: none;
  }
  .states {
    fill: none;
    stroke: #fff;
    stroke-linejoin: round;
  }
}
</style>
