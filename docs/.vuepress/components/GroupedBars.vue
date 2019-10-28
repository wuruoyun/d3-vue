<template>
  <d3-cartesian class="demo" :margin="margin" :width="860" :height="450" :x="x" :y="y">
    <template slot-scope="props">
      <d3-grouped-bars :data="data" x="State" :keys="keys" :colorFn="colorFn" v-bind="props"/>
      <d3-legend class="legend" :data="legendItems" label="name" color="color" align="right" :x="800"/>
    </template>
    <d3-axis slot="south" orientation="Bottom" slot-scope="props" v-bind="props"/>
    <d3-axis slot="west" orientation="Left" :config="configY" title="Population"
      slot-scope="props" v-bind="props"/>
  </d3-cartesian>
</template>

<script>
import * as d3 from 'd3'

export default {
  data () {
    return {
      margin: { top: 20, right: 10, bottom: 30, left: 30 },
      x: { type: 'Band', domain: [], config: scale => scale.paddingInner(0.1) },
      y: { type: 'Linear', domain: [0, 1] },
      data: [],
      keys: [],
      configY: axis => axis.ticks(null, 's')
    }
  },
  computed: {
    colorFn () {
      return d3.scaleOrdinal().domain(this.keys)
        .range(['#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56', '#d0743c', '#ff8c00'])
    },
    legendItems () {
      return this.keys.map(k => {
        return { name: k, color: this.colorFn(k) }
      }).reverse()
    }
  },
  created () {
    d3.csv('/data/state-population-short.csv',
      (d, index, columns) => {
        for (let i = 1; i < columns.length; ++i) {
          d[columns[i]] = +d[columns[i]]
        }
        return d
      }).then(data => {
        const keys = data.columns.slice(1)
        this.x.domain = data.map(d => d.State)
        this.y.domain = [0, d3.max(data, d => d3.max(keys, key => d[key]))]
        this.data = data
        this.keys = keys
      })
  }
}
</script>

<style lang="scss" scoped>
.demo /deep/ {
  .legend {
    font-size: 11px;
    font-family: sans-serif;
  }
  .axis path {
    display: none;
  }
}
</style>
