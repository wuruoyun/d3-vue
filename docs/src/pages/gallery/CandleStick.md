# Candlestick Chart

Original D3 demo at [https://beta.observablehq.com/@mbostock/d3-candlestick-chart](https://beta.observablehq.com/@mbostock/d3-candlestick-chart)

```html
<template>
  <d3-cartesian class="demo" :margin="margin" :width="860" :height="450" :x="x" :y="y">
    <template slot-scope="props">
      <d3-grid-lines orientation="Horizontal" v-bind="props"/>
      <d3-candle-sticks :data="data" v-bind="props"/>
    </template>
    <d3-axis slot="south" orientation="Bottom" :config="configX" slot-scope="props" v-bind="props"/>
    <d3-axis slot="west" orientation="Left" :config="configY" slot-scope="props" v-bind="props"/>
  </d3-cartesian>
</template>

<script>
import * as d3 from 'd3'
import '../../../data/appl-stock-candle.csv'
const parseDate = d3.timeParse("%Y-%m-%d")

export default {
  data () {
    return {
      margin: { top: 20, right: 20, bottom: 30, left: 40 },
      x: { type: 'Band', domain: [], config: scale => scale.padding(0.2) },
      y: { type: 'Linear', domain: [] },
      configX: null,
      configY: null,
      data: []
    }
  },
  created () {
    d3.csv('appl-stock-candle.csv', d => {
      return {
        date: parseDate(d["Date"]),
        high: +d["High"],
        low: +d["Low"],
        open: +d["Open"],
        close: +d["Close"]
      }
    }).then(data => {
      data = data.slice(-120)
      this.x.domain = d3.timeDay.range(data[0].date, +data[data.length - 1].date + 1)
        .filter(d => d.getDay() !== 0 && d.getDay() !== 6)
      this.configX = axis => {
        axis.tickFormat(d3.timeFormat("%-m/%-d")),
        axis.tickValues(d3.timeMonday.every(1).range(data[0].date, data[data.length - 1].date))
      }
      this.y.domain = [d3.min(data, d => d.low), d3.max(data, d => d.high)]
      this.configY = axis => {
        axis.tickFormat(d3.format("$~f"))
        axis.tickValues(d3.scaleLinear().domain(this.y.domain).ticks())
      }
      this.data = data
    })
  }
}
</script>

<style lang="scss" scoped>
.demo /deep/ {
  .axis path {
    display: none;
  }
}
</style>
<!-- candlestick-chart-demo.vue -->
````
