# Treemap

Original D3 demo at [https://bl.ocks.org/mbostock/4063582](https://bl.ocks.org/mbostock/4063582)

```html
<template>
  <d3-treemap class="demo" :width="930" :height="550" :data="data"/>
</template>

<script>
import * as d3 from 'd3'
import data from '../../data/flare.json'

export default {
  data () {
    return {
      data
    }
  }
}
</script>

<style lang="scss" scoped>
.demo /deep/ {
  font: 10px sans-serif;
}
</style>
<!-- pie-chart-demo.vue -->
```
