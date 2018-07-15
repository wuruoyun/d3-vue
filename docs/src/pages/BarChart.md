# Bar Chart

Original D3 demo at [https://bl.ocks.org/mbostock/3885304](https://bl.ocks.org/mbostock/3885304)

```html
<template>
  <d3-cartesian class="demo" :width="850" :height="450" :axisX="axisX" :axisY="axisY">
    <d3-bars :data="data" x="letter" y="frequency" slot-scope="props" v-bind="props"/>
  </d3-cartesian>
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
        options: { padding: 0.1 }
      },
      axisY: {
        type: 'Linear',
        domain: [],
        options: {
          ticks: { count: 10, specifier: '%'} 
        }
      }
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
