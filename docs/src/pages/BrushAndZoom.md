# Brush & Zoom

Original D3 demo at [https://bl.ocks.org/mbostock/34f08d5e11952a80609169b7917d4172](https://bl.ocks.org/mbostock/34f08d5e11952a80609169b7917d4172)

```html
<template>
  <div class="demo">
    <d3-cartesian ref="cartesian" :margin="margin" :width="850" :height="350"
      :axisX="axisX" :axisY="axisY" zoom="x" @zoom="zoomed">
      <d3-area :data="data" x="date" y="price" :curveFn ="curveFn" slot-scope="props" v-bind="props"/>
    </d3-cartesian>
    <d3-cartesian :margin="margin" :width="850" :height="100" :axisX="axisX2" :axisY="axisY2">
      <template slot-scope="props">
        <d3-area :data="data" x="date" y="price" :curveFn ="curveFn" v-bind="props"/>
        <d3-brush ref="brush" orientation="x" @brushed="brushed" v-bind="props"/>
      </template>
    </d3-cartesian>
  </div>
</template>

<script>
import * as d3 from 'd3'
import '../../data/sp500.csv'
const parseDate = d3.timeParse("%b %Y")

export default {
  data () {
    return {
      margin: { top: 20, right: 20, bottom: 30, left: 40 },
      axisX: { type: 'Time', domain: [] },
      axisY: { type: 'Linear', domain: [] },
      axisX2: { type: 'Time', domain: [] },
      axisY2: { type: 'Linear', domain: [], display: 'none' },
      curveFn: d3.curveMonotoneX,
      data: []
    }
  },
  methods: {
    zoomed (domain) {
      this.$refs.brush.moveTo(domain)
    },
    brushed (domain) {
      this.$refs.cartesian.zoomToX(domain)
    }
  },
  created () {
    d3.csv('sp500.csv',
      d => {
        d.date = parseDate(d.date)
        d.price = +d.price
        return d
      }).then(data => {
        const domainX = d3.extent(data, d => d.date)
        const domainY = [0, d3.max(data, d => d.price)]
        this.axisX.domain = domainX
        this.axisY.domain = domainY
        this.axisX2.domain = domainX
        this.axisY2.domain = domainY
        this.data = data
        this.$nextTick(() => {
          this.$refs.brush.moveTo(this.axisX2.domain)
        })
      })
  }
}
</script>
<!-- brush-and-zoom-demo.vue -->
````
