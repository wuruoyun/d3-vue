# Density Contour

Original D3 demo at [https://bl.ocks.org/mbostock/7f5f22524bd1d824dd53c535eda0187f](https://bl.ocks.org/mbostock/7f5f22524bd1d824dd53c535eda0187f)

```html
<template>
  <d3-cartesian class="demo" :width="900" :height="550" :x="x" :y="y">
    <d3-contour :data="data" x="carat" y="price" :colorFn="colorFn" slot-scope="props" v-bind="props"/>
    <d3-axis slot="south" orientation="Bottom" title="Carats" :options="optionsX"
      slot-scope="props" v-bind="props"/>
    <d3-axis slot="west" orientation="Left" title="Price (USD)" :options="optionsY"
      slot-scope="props" v-bind="props"/>
  </d3-cartesian>
</template>

<script>
import * as d3 from 'd3'
import '../../../data/diamonds.tsv'

export default {
  data () {
    return {
      data: null,
      x: { type: 'Log', domain: [2e-1, 5e0] },
      optionsX: {
        ticks: { count: null, specifier: ".1f"},
        titleLastTick: true
      },
      y: { type: 'Log', domain: [3e2, 2e4] },
      optionsY: {
        ticks: { count: null, specifier: ".1s"},
        titleLastTick: true
      },
      colorFn: null
    }
  },
  created () {
    d3.tsv('diamonds.tsv', d => {
      d.carat = +d.carat
      d.price = +d.price
      return d
    }).then(data => {
      this.data = data
      const colorScale = d3.scaleSequential(d3.interpolateYlGnBu)
          .domain([0, 1.8]) // Points per square pixel
      this.colorFn = d => colorScale(d.value)
    })
  }
}
</script>

<style lang="scss" scoped>
.demo /deep/ {
  .domain {
    display: none;
  }
  .axis .label {
    font-weight: bold;
  }
}
</style>
<!-- density-contour-demo.vue -->
````
