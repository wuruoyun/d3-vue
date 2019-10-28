<template>
  <d3-cartesian class="demo" :width="860" :height="450" :x="x" :y="y">
    <template #default="props">
      <d3-bars :data="data" x="letter" y="frequency" v-bind="props"/>
    </template>
    <template #south="props">
      <d3-axis class="axis--x" orientation="Bottom" v-bind="props"/>
    </template>
    <template #west="props">
      <d3-axis orientation="Left" :config="configY" v-bind="props"/>
    </template>
  </d3-cartesian>
</template>

<script>
import * as d3 from 'd3'

export default {
  data () {
    return {
      data: null,
      x: { type: 'Band', domain: [], config: scale => scale.padding(0.1) },
      y: { type: 'Linear', domain: [] },
      configY: axis => axis.ticks(10, '%')
    }
  },
  created () {
    d3.tsv('/data/letter-frequency.tsv', d => {
      d.frequency = +d.frequency
      return d
    }).then(data => {
      this.x.domain = data.map(d => d.letter)
      this.y.domain = [0, d3.max(data, d => d.frequency)]
      this.data = data
    })
  }
}
</script>

<style lang="scss" scoped>
.demo /deep/ {
  .bar {
    fill: steelblue;
  }
  .bar:hover {
    fill: brown;
  }
  .axis--x path {
    display: none;
  }
}
</style>
