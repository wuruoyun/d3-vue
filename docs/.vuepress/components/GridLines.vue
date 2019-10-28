<template>
  <d3-cartesian class="demo" :width="860" :height="450" :x="x" :y="y">
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
const parseTime = d3.timeParse("%d-%b-%y")

export default {
  data () {
    return {
      x: { type: 'Time', domain: [] },
      y: { type: 'Linear', domain: [] },
      data: null,
      gridLineOptions: { count: 5 }
    }
  },
  created () {
    d3.csv('/data/stock.csv',
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
    stroke-width: 2px;
  }
}
</style>
