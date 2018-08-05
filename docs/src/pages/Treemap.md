# Treemap

Original D3 demo at [https://bl.ocks.org/mbostock/4063582](https://bl.ocks.org/mbostock/4063582)

```html
<template>
  <div class="demo">
    <d3-treemap :width="930" :height="550" :data="data" :nameFn="nameFn"
      :valueFn="picked === 'size' ? sumBySize : sumByCount"
      :labelFn="labelFn" :colorFn="colorFn"/>
    <input type="radio" value="size" v-model="picked"><label>Size</label>
    <input type="radio" value="count" v-model="picked"><label>Count</label>
  </div>
</template>

<script>
import * as d3 from 'd3'
import data from '../../data/flare.json'

export default {
  data () {
    return { picked: 'size' }
  },
  created () {
    this.data = data
    this.nameFn = node => node.name,
    this.labelFn = node => node.name.split(/(?=[A-Z][^A-Z])/g)
    const fader = color => d3.interpolateRgb(color, "#fff")(0.2)
    this.colorFn = d3.scaleOrdinal(d3.schemePaired.map(fader))
    this.sumBySize = node => node.size
    this.sumByCount = function(node) { return node.children ? 0 : 1 }
  }
}
</script>

<style lang="scss" scoped>
.demo /deep/ {
  svg {
    font: 10px sans-serif;
  }
}
</style>
<!-- treemap-demo.vue -->
```
