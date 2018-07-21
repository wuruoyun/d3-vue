# Density Contour

Original D3 demo at [https://bl.ocks.org/mbostock/7f5f22524bd1d824dd53c535eda0187f](https://bl.ocks.org/mbostock/7f5f22524bd1d824dd53c535eda0187f)

```html
<template>
  <d3-cartesian class="demo" :width="850" :height="550" :axisX="axisX" :axisY="axisY">
    <template slot-scope="props">
      <d3-contour :data="data" x="carat" y="price" :colorFn="colorFn" v-bind="props"/>
    </template>
  </d3-cartesian>
</template>

<script>
import * as d3 from 'd3'
import '../../data/diamonds.tsv'

export default {
  data () {
    return {
      data: null,
      axisX: {
        type: 'Log',
        title: 'Carats',
        domain: [2e-1, 5e0],
        options: {
          ticks: { count: null, specifier: ".1f"}
        }
      },
      axisY: {
        type: 'Log',
        title: 'Price (USD)',
        domain: [3e2, 2e4],
        options: {
          ticks: { count: null, specifier: ".1s"}
        }
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
}
</style>
<!-- scatter-plot-demo.vue -->
````
