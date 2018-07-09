# Bar Chart

Original D3 demo at [https://bl.ocks.org/mbostock/3885304](https://bl.ocks.org/mbostock/3885304)

```html
<template>
  <d3-root class="demo" :width="800" :height="450">
    <d3-cartesian :margin="margin" :width="800" :height="450"
      :axisX="axisX" :axisY="axisY" slot-scope="props" v-bind="props">
      <d3-bars :data="data" x="letter" y="frequency" slot-scope="props" v-bind="props"/>
    </d3-cartesian>
  </d3-root>
</template>

<script>
import * as d3 from 'd3'
import '../../data/letter-frequency.tsv'

export default {
  data () {
    return {
      data: null,
      axisX: {
        type: 'Band',
        domain: [],
        options: {
          padding: 0.1
        }
      },
      axisY: {
        type: 'Linear',
        domain: [],
        options: {
          ticks: { count: 10, specifier: '%'} 
        }
      },
      margin: {top: 20, right: 20, bottom: 30, left: 40}
    }
  },
  created () {
    d3.tsv('letter-frequency.tsv', d => {
      d.frequency = +d.frequency
      return d
    }).then(data => {
      this.axisX.domain = data.map(d => d.letter)
      this.axisY.domain = [0, d3.max(data, d => d.frequency)]
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
<!-- bar-chart-demo.vue -->
```
