# Line Chart

Original D3 demo at [https://bl.ocks.org/mbostock/4060606](https://bl.ocks.org/mbostock/4060606)

```html
<template>
  <d3-country class="demo" :width="960" :height="600"
    :data="us" :countyColorFn="colorFn"/>
</template>

<script>
import * as d3 from 'd3'
import '../../data/unemployment.tsv'

export default {
  data () {
    return {
      us: null,
      colorFn: null
    }
  },
  created () {
    const unemployment = d3.map()
    const color = d3.scaleThreshold()
      .domain(d3.range(2, 10)).range(d3.schemeBlues[9])

    Promise.all([
      d3.json('https://d3js.org/us-10m.v1.json'),
      d3.tsv('unemployment.tsv', d => unemployment.set(d.id, +d.rate))
    ]).then(values => {
      this.us = values[0]
      this.colorFn = d => color(d.rate = unemployment.get(d.id))
    })
  }
}
</script>

<style lang="scss" scoped>
.demo /deep/ {
  .counties {
    fill: none;
  }
  .states {
    fill: none;
    stroke: #fff;
    stroke-linejoin: round;
  }
}
</style>
<!-- choropleth-demo.vue -->
````
