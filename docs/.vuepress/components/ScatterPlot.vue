<template>
  <d3-cartesian class="demo" :width="860" :height="450" :x="x" :y="y">
    <template slot-scope="props">
      <d3-points :data="data" x="sepalWidth" y="sepalLength" :color="colorFn" :size="3.5" v-bind="props"/>
      <d3-legend :data="species" label="name" color="color" align="right" :x="800"/>
    </template>
    <d3-axis slot="south" orientation="Bottom" title="Sepal Width (cm)" slot-scope="props" v-bind="props"/>
    <d3-axis slot="west" orientation="Left" title="Sepal Length (cm)" slot-scope="props" v-bind="props"/>
  </d3-cartesian>
</template>

<script>
import * as d3 from 'd3'

export default {
  data () {
    return {
      data: null,
      x: { type: 'Linear', domain: [] },
      y: { type: 'Linear', domain: [] },
      colorFn: null,
      species: []
    }
  },
  created () {
    d3.tsv('/data/flower-info.tsv', d => {
      d.sepalLength = +d.sepalLength
      d.sepalWidth = +d.sepalWidth
      return d
    }).then(data => {
      this.x.domain = d3.extent(data, d => d.sepalWidth)
      this.y.domain = d3.extent(data, d => d.sepalLength)
      this.data = data

      const species = [...new Set(data.map(f => f.species))]
      const colorScale = d3.scaleOrdinal(d3.schemeCategory10).domain(species)
      this.species = species.map(s => {
        return { name: s, color: colorScale(s) }
      })
      this.colorFn = d => colorScale(d.species)
    })
  }
}
</script>

<style lang="scss" scoped>
.demo /deep/ {
  .axis path,
  .axis line {
    fill: none;
    stroke: #000;
    shape-rendering: crispEdges;
  }
  .point {
    stroke: #000;
  }
}
</style>
