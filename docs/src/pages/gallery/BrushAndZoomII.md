# Brush & Zoom II

Original D3 demo at [https://bl.ocks.org/mbostock/f48fcdb929a620ed97877e4678ab15e6](https://bl.ocks.org/mbostock/f48fcdb929a620ed97877e4678ab15e6).

```html
<template>
  <d3-cartesian ref="cartesian" class="demo" :margin="margin" :width="width" :height="height" :x="x" :y="y">
    <template slot-scope="props">
      <d3-points :data="data" :x="d => d[0]" :y="d => d[1]" :color="colorFn" :size="2.5"
        animated v-bind="props"/>
      <d3-brush ref="brush" orientation="xy" @end="brushEnd" v-bind="props"/>/>
    </template>
    <d3-axis slot="south" orientation="Top" transform="translate(0,-10)" :options="optionsX"
      slot-scope="props" v-bind="props"/>
    <d3-axis slot="west" orientation="Right" transform="translate(10,0)" :options="optionsY"
      slot-scope="props" v-bind="props"/>
  </d3-cartesian>
</template>

<script>
import * as d3 from 'd3'

export default {
  data () {
    return {
      width: 860, height: 500,
      margin: { top: 0, right: 0, bottom: 0, left: 0},
      x: { type: 'Linear', domain: [] },
      y: { type: 'Linear', domain: [] },
      optionsX: { ticks: { count: 12 } },
      optionsY: null,
      colorFn: null,
      data: []
    }
  },
  methods: {
    brushEnd (domain) {
      if (domain) {
        this.$refs.cartesian.zoomTo(domain)
        this.$refs.brush.reset()
      } else {
        this.$refs.cartesian.resetZoom()
      }
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
    this.x.domain = [-4.5, 4.5]
    this.y.domain = [-4.5 * k, 4.5 * k]
    this.optionsY = { ticks: { count: 12 * k } }

    const colorScale = d3.scaleOrdinal(d3.schemeCategory10)
    this.colorFn = d => colorScale(d[2])
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
<!-- brush-and-zoom-ii-demo.vue -->
````
