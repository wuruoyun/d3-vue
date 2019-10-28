<template>
  <d3-cartesian :width="860" :height="450" :x="x" :y="y">
    <d3-area :data="data" x="date" y="close" slot-scope="props" v-bind="props"/>
    <d3-axis slot="south" orientation="Bottom" slot-scope="props" v-bind="props"/>
    <d3-axis slot="west" orientation="Left" title="Price ($)" slot-scope="props" v-bind="props"/>
  </d3-cartesian>
</template>

<script>
import * as d3 from 'd3'
const parseTime = d3.timeParse("%d-%b-%y")

export default {
  data () {
    return {
      x: { type: 'Time', domain: [] },
      y: { type: 'Linear', domain: [] },
      data: []
    }
  },
  created () {
    d3.tsv('/data/appl-stock.tsv',
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
