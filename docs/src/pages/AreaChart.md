# Area Chart

Original D3 demo at [https://bl.ocks.org/mbostock/3883195](https://bl.ocks.org/mbostock/3883195)

```html
<template>
  <d3-cartesian :margin="margin" :width="850" :height="450" :axisX="axisX" :axisY="axisY">
    <template slot-scope="props">
      <d3-area :data="data" x="date" y="close" v-bind="props"/>
    </template>
  </d3-cartesian>
</template>

<script>
import * as d3 from 'd3'
import '../../data/appl-stock.tsv'
const parseTime = d3.timeParse("%d-%b-%y")

export default {
  data () {
    return {
      margin: { top: 20, right: 20, bottom: 30, left: 50 },
      axisX: { type: 'Time', domain: [] },
      axisY: { type: 'Linear', title: "Price ($)", domain: [] },
      data: []
    }
  },
  created () {
    d3.tsv('appl-stock.tsv',
      d => {
        d.date = parseTime(d.date)
        d.close = +d.close
        return d
      }).then(data => {
        this.axisX.domain = d3.extent(data, d => d.date)
        this.axisY.domain = [0, d3.max(data, d => d.close)]
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
