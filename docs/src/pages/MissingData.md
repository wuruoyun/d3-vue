# Missing data

Original D3 demo at [https://bl.ocks.org/mbostock/3035090](https://bl.ocks.org/mbostock/3035090)

```html
<template>
  <d3-cartesian class="demo" :margin="margin" :width="850" :height="450" :axisX="axisX" :axisY="axisY">
    <template slot-scope="props">
      <d3-line :data="data" x="x" y="y" :definedFn="d => d" v-bind="props"/>
      <d3-area :data="data" x="x" y="y" :definedFn="d => d" v-bind="props"/>
      <d3-points :data="filtered" x="x" y="y" :size="3.5" v-bind="props"/>
    </template>
  </d3-cartesian>
</template>

<script>
import * as d3 from 'd3'

export default {
  data () {
    return {
      margin: { top: 30, right: 30, bottom: 30, left: 30 },
      axisX: { type: 'Linear', domain: [0, 1] },
      axisY: { type: 'Linear', domain: [0, 1] },
      data: []
    }
  },
  computed: {
    filtered () {
      return this.data.filter(d => d)
    }
  },
  created () {
    this.data = d3.range(40).map(function(i) {
      return i % 5 ? {x: i / 39, y: (Math.sin(i / 3) + 2) / 4} : null;
    })
  }
}
</script>

<style lang="scss" scoped>
.demo /deep/ {
  .area {
    fill: lightsteelblue;
  }
  .line {
    fill: none;
    stroke: steelblue;
    stroke-width: 1.5px;
  }
  .point {
    fill: white;
    stroke: steelblue;
    stroke-width: 1.5px;
  }
}
</style>
<!-- line-with-missing-data-demo.vue -->
````
