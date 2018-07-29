# Brush & Zoom II

Original D3 demo at [https://bl.ocks.org/mbostock/f48fcdb929a620ed97877e4678ab15e6](https://bl.ocks.org/mbostock/f48fcdb929a620ed97877e4678ab15e6)

```html
<template>
  <d3-cartesian ref="cartesian" class="demo" :margin="margin" :width="width" :height="height"
    :axisX="axisX" :axisY="axisY">
    <d3-points :data="data" :x="d => d[0]" :y="d => d[1]" :color="colorFn" :size="2.5"
      slot-scope="props" v-bind="props"/>
  </d3-cartesian>
</template>

<script>
import * as d3 from 'd3'
import '../../data/sp500.csv'
const parseDate = d3.timeParse("%b %Y")

export default {
  data () {
    return {
      width: 900, height: 500,
      margin: { top: 0, right: 0, bottom: 0, left: 0},
      axisX: { type: 'Linear', domain: [] },
      axisY: { type: 'Linear', domain: [] },
      colorFn: null,
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
    const random = d3.randomNormal(0, 0.2),
      sqrt3 = Math.sqrt(3),
      points0 = d3.range(300).map(() => [random() + sqrt3, random() + 1, 0]),
      points1 = d3.range(300).map(() => [random() - sqrt3, random() + 1, 1]),
      points2 = d3.range(300).map(() => [random(), random() - 1, 2])
    this.data = d3.merge([points0, points1, points2])

    const k = this.height / this.width
    this.axisX.domain = [-4.5, 4.5]
    this.axisY.domain = [-4.5 * k, 4.5 * k]
    this.axisX.options = { ticks: { count: 12 } }
    this.axisY.options = { ticks: { count: 12 * k } }

    const colorScale = d3.scaleOrdinal(d3.schemeCategory10)
    this.colorFn = d => colorScale(d[2])
  }
}
</script>
<!-- brush-and-zoom-ii-demo.vue -->
````
