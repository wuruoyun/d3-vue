# Scatter Plot

Original D3 demo at [https://bl.ocks.org/mbostock/3887118](https://bl.ocks.org/mbostock/3887118)

```html
<template>
  <d3-cartesian class="demo" :width="850" :height="450" :axisX="axisX" :axisY="axisY">
    <template slot-scope="props">
      <d3-points :data="data" x="sepalWidth" y="sepalLength" :color="colorFn"
        :size="3.5" v-bind="props"/>
      <d3-legend :data="species" label="name" color="color" align="right" :x="800"/>
    </template>
  </d3-cartesian>
</template>

<script>
import * as d3 from 'd3'
import '../../data/flower-info.tsv'

export default {
  data () {
    return {
      data: null,
      axisX: {
        type: 'Linear',
        title: 'Sepal Width (cm)',
        domain: []
      },
      axisY: {
        type: 'Linear',
        title: 'Sepal Length (cm)',
        domain: []
      },
      colorFn: null,
      species: []
    }
  },
  created () {
    d3.tsv('flower-info.tsv', d => {
      d.sepalLength = +d.sepalLength
      d.sepalWidth = +d.sepalWidth
      return d
    }).then(data => {
      this.axisX.domain = d3.extent(data, d => d.sepalWidth)
      this.axisY.domain = d3.extent(data, d => d.sepalLength)
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
<!-- scatter-plot-demo.vue -->
````
