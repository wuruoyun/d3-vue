# Brush & Zoom

Original D3 demo at [https://bl.ocks.org/mbostock/34f08d5e11952a80609169b7917d4172](https://bl.ocks.org/mbostock/34f08d5e11952a80609169b7917d4172)

```html
<template>
  <d3-root :width="850" :height="450">
    <d3-cartesian :margin="margin" :width="850" :height="350" :axisX="axisX" :axisY="axisY">
      <d3-area :data="data" x="date" y="price" :curveFn ="curveFn" slot-scope="props" v-bind="props"/>
    </d3-cartesian>
    <d3-cartesian :margin="margin" :width="850" :height="100" :y="350" :axisX="axisX" :axisY="axisY2">
      <d3-area :data="data" x="date" y="price" :curveFn ="curveFn" slot-scope="props" v-bind="props"/>
    </d3-cartesian>
  </d3-root>
</template>

<script>
import * as d3 from 'd3'
import '../../data/sp500.csv'
const parseDate = d3.timeParse("%b %Y")

export default {
  data () {
    return {
      margin: { top: 20, right: 20, bottom: 30, left: 40 },
      axisX: { type: 'Time', domain: [] },
      axisY: { type: 'Linear', domain: [] },
      curveFn: d3.curveMonotoneX,
      data: []
    }
  },
  computed: {
    axisY2 () {
      return Object.assign({}, this.axisY, { display: 'none' })
    }
  },
  created () {
    d3.csv('sp500.csv',
      d => {
        d.date = parseDate(d.date)
        d.price = +d.price
        return d
      }).then(data => {
        this.axisX.domain = d3.extent(data, d => d.date)
        this.axisY.domain = [0, d3.max(data, d => d.price)]
        this.data = data
      })
  }
}
</script>

<style lang="scss" scoped>
.demo /deep/ {
  .axis--x path {
    display: none;
  }
  .line {
    fill: none;
    stroke: steelblue;
    stroke-width: 1.5px;
  }
}
</style>
<!-- area-chart-demo.vue -->
````
