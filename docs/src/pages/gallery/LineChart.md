# Line Chart

Original D3 demo at [https://bl.ocks.org/mbostock/3884955](https://bl.ocks.org/mbostock/3884955)

```html
<template>
  <d3-cartesian class="demo" :margin="margin" :width="900" :height="450" :x="x" :y="y">
    <template slot-scope="props">
      <d3-line v-for="city in cities" :key="city.id" :data="city.values" x="date" y="temperature"
        :color="city.color" :curveFn ="curveFn" v-bind="props"/>
    </template>
    <template slot="east" slot-scope="props">
      <d3-text v-for="city in cities" :key="city.id" style="font:10px sans-serif;" :x="3"
        :y="props.scale(city.values[city.values.length - 1].temperature)" dy="0.35em">
        {{ city.id }}</d3-text>
    </template>
    <d3-axis slot="south" class="axis--x" orientation="Bottom" slot-scope="props" v-bind="props"/>
    <d3-axis slot="west" orientation="Left" title="Temperature, ºF" slot-scope="props" v-bind="props"/>
  </d3-cartesian>
</template>

<script>
import * as d3 from 'd3'
import '../../../data/city-temperature.tsv'
const parseTime = d3.timeParse("%Y%m%d")

export default {
  data () {
    return {
      margin: { top: 20, right: 100, bottom: 20, left: 20 },
      x: { type: 'Time', domain: [] },
      y: { type: 'Linear', domain: [] },
      curveFn: d3.curveBasis,
      cities: null
    }
  },
  created () {
    d3.tsv('city-temperature.tsv',
      (d, _, columns) => {
        d.date = parseTime(d.date)
        for (let i = 1, n = columns.length, c; i < n; ++i) d[c = columns[i]] = +d[c]
        return d
      }).then(data => {
        const cities = data.columns.slice(1)
          .map(id => {
            return {
              id: id,
              values: data.map(d => {
                return { date: d.date, temperature: d[id] }
              })
            }
          })
        this.x.domain = d3.extent(data, d => d.date)
        this.y.domain = [
          d3.min(cities, c => d3.min(c.values, d => d.temperature)),
          d3.max(cities, c => d3.max(c.values, d => d.temperature))
        ]
        const colorScale = d3.scaleOrdinal(d3.schemeCategory10)
        colorScale.domain(cities.map(c => c.id))
        cities.forEach(c => c.color = colorScale(c.id))
        this.cities = cities
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
    stroke-width: 1.5px;
  }
}
</style>
<!-- line-chart-demo.vue -->
````
