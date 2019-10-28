<template>
  <d3-cartesian class="demo" :margin="margin" :width="860" :height="450" :x="x" :y="y">
    <template #default="props">
      <d3-line v-for="city in cities" :key="city.id" :data="city.values" x="date" y="temperature"
        :color="city.color" :curveFn ="curveFn" v-bind="props"/>
    </template>
    <template #east="props">
      <d3-text v-for="city in cities" :key="city.id" style="font:10px sans-serif;" :x="3"
        :y="props.scale(city.values[city.values.length - 1].temperature)" dy="0.35em">
        {{ city.id }}</d3-text>
    </template>
    <template #south="props">
      <d3-axis class="axis--x" orientation="Bottom" v-bind="props"/>
    </template>
    <template #west="props">
      <d3-axis orientation="Left" title="Temperature, ºF" v-bind="props"/>
    </template>
  </d3-cartesian>
</template>

<script>
import * as d3 from 'd3'
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
    d3.tsv('/data/city-temperature.tsv',
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
