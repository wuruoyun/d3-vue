# Line Chart

Original D3 demo at [https://bl.ocks.org/mbostock/3884955](https://bl.ocks.org/mbostock/3884955)

```html
<template>
  <d3-cartesian :margin="margin" :width="850" :height="450"
    :axisX="axisX" :axisY="axisY">
    <template slot-scope="props">
      <d3-group v-for="city in cities" :key="city.id">
        <d3-line :data="city.values" x="date" y="temperature"
          :color="city.color" :curveFn ="curveFn" v-bind="props"/>
        <d3-text :x="props.width + 3"
          :y="props.scaleY(city.values[city.values.length - 1].temperature)"
          dy="0.35em" style="font:10px sans-serif;">
          {{ city.id }}
        </d3-text>
      </d3-group>
    </template>
  </d3-cartesian>
</template>

<script>
import * as d3 from 'd3'
import '../../data/city-temperature.tsv'
const parseTime = d3.timeParse("%Y%m%d")

export default {
  data () {
    return {
      margin: { top: 20, right: 100, bottom: 20, left: 20 },
      axisX: { type: 'Time', domain: [] },
      axisY: { type: 'Linear', title: "Temperature, ºF", domain: [] },
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
        this.axisX.domain = d3.extent(data, d => d.date)
        this.axisY.domain = [
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
    stroke: steelblue;
    stroke-width: 1.5px;
  }
}
</style>
<!-- line-chart-demo.vue -->
````
