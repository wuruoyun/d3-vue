# Density Contour

Original D3 demo at [https://bl.ocks.org/mbostock/7f5f22524bd1d824dd53c535eda0187f](https://bl.ocks.org/mbostock/7f5f22524bd1d824dd53c535eda0187f)

```html
<template>
  <d3-cartesian class="demo" :width="860" :height="550" :x="x" :y="y">
    <d3-contour :data="data" x="carat" y="price" :colorFn="colorFn" slot-scope="props" v-bind="props"/>
    <d3-axis slot="south" orientation="Bottom" title="Carats" titleLastTick :config="configX"
      slot-scope="props" v-bind="props"/>
    <d3-axis slot="west" orientation="Left" title="Price (USD)" titleLastTick :config="configY"
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
      y: { type: 'Log', domain: [3e2, 2e4] },
      configX: axis => axis.ticks(null, '.1f'),
      configY: axis => axis.ticks(null, '.1s'),
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
