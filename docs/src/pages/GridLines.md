# Grid Lines

Original D3 demo at [https://bl.ocks.org/d3noob/c506ac45617cf9ed39337f99f8511218](https://bl.ocks.org/d3noob/c506ac45617cf9ed39337f99f8511218)

```html
<template>
  <d3-cartesian class="demo" :width="900" :height="450" :x="x" :y="y">
    <template slot-scope="props">
      <d3-grid-lines orientation="Horizontal" :options="gridLineOptions" v-bind="props"/>
      <d3-grid-lines orientation="Vertical" :options="gridLineOptions" v-bind="props"/>
      <d3-line :data="data" x="date" y="close" v-bind="props"/>
    </template>
    <d3-axis slot="south" orientation="Bottom" slot-scope="props" v-bind="props"/>
    <d3-axis slot="west" orientation="Left" slot-scope="props" v-bind="props"/>
  </d3-cartesian>
</template>

<script>
import * as d3 from 'd3'
import '../../data/stock.csv'
const parseTime = d3.timeParse("%d-%b-%y")

export default {
  data () {
    return {
      x: { type: 'Time', domain: [] },
      y: { type: 'Linear', domain: [] },
      data: null,
      gridLineOptions: { ticks: { count: 5 } }
    }
  },
  created () {
    d3.csv('stock.csv',
      d => {
        d.date = parseTime(d.date)
        d.close = +d.close
        return d
      }).then(data => {
        this.x.domain = d3.extent(data, d => d.date)
        this.y.domain = [0, d3.max(data, d => d.close)]
        this.data = data
      })
  }
}
</script>

<style lang="scss" scoped>
.demo /deep/ {
  .line {
    fill: none;
    stroke: steelblue;
    stroke-width: 2px;
  }
  .grid {
    line {
      stroke: lightgrey;
      stroke-opacity: 0.7;
      shape-rendering: crispEdges;
    }
    path {
      stroke-width: 0;
    }
  }
}
</style>
<!-- grid-lines-demo.vue -->
````
