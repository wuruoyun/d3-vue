# Stacked Area Chart

Original D3 demo at [https://bl.ocks.org/mbostock/3885211](https://bl.ocks.org/mbostock/3885211)

```html
<template>
  <d3-cartesian :margin="margin" :width="860" :height="450" :x="x" :y="y">
    <d3-stacked-area :data="data" x="date" :keys="keys" :colorFn="colorFn"
      slot-scope="props" v-bind="props"/>
    <d3-axis slot="south" orientation="Bottom" slot-scope="props" v-bind="props"/>
    <d3-axis slot="west" orientation="Left" :options="options" slot-scope="props" v-bind="props"/>
  </d3-cartesian>
</template>

<script>
import * as d3 from 'd3'
import '../../../data/browser-share.tsv'
const parseDate = d3.timeParse("%Y %b %d")

export default {
  data () {
    return {
      margin: { top: 20, right: 20, bottom: 30, left: 40 },
      x: { type: 'Time', domain: [] },
      y: { type: 'Linear', domain: [0, 1] },
      data: [],
      keys: [],
      colorFn: d3.scaleOrdinal(d3.schemeCategory10),
      options: { ticks: { count: 10, specifier: '%' } }
    }
  },
  created () {
    d3.tsv('browser-share.tsv',
      (d, index, columns) => {
        d.date = parseDate(d.date);
        for (let i = 1, n = columns.length; i < n; ++i)
          d[columns[i]] = d[columns[i]] / 100
        return d
      }).then(data => {
        this.x.domain = d3.extent(data, d => d.date)
        this.data = data
        this.keys = data.columns.slice(1)
      })
  }
}
</script>
<!-- stacked-area-chart-demo.vue -->
````
