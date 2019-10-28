<template>
  <d3-pie class="demo" :width="860" :height="450" :outerRadius="200"
    :data="data" label="age" value="population" color="color"/>
</template>

<script>
import * as d3 from 'd3'

const colorScale = d3.scaleOrdinal([
  "#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"
])

export default {
  data () {
    return {
      data: null
    }
  },
  created () {
    d3.csv('/data/age-population.csv', d => {
      d.population = +d.population
      return d
    }).then(data => {
      data.forEach(d => d.color = colorScale(d.age))
      this.data = data
    })
  }
}
</script>

<style lang="scss" scoped>
.demo /deep/ {
  .arc text {
    font: 10px sans-serif;
    text-anchor: middle;
  }
  .arc path {
    stroke: #fff;
  }
}
</style>
