<template>
  <div class="demo">
    <d3-cartesian ref="cartesian" :margin="margin" :width="860" :height="350"
      :x="x" :y="y" zoom="x" @zoom="zoomed">
      <template #default="props">
        <d3-area :data="data" x="date" y="price" :curveFn ="curveFn" v-bind="props"/>
      </template>
      <template #south="props">
        <d3-axis orientation="Bottom" v-bind="props"/>
      </template>
      <template #west="props">
        <d3-axis orientation="Left" v-bind="props"/>
      </template>
    </d3-cartesian>
    <d3-cartesian :margin="margin" :width="860" :height="100" :x="x2" :y="y">
      <template #default="props">
        <d3-area :data="data" x="date" y="price" :curveFn ="curveFn" v-bind="props"/>
        <d3-brush ref="brush" orientation="x" @brush="brushed" @end="brushed" v-bind="props"/>
      </template>
      <template #south="props">
        <d3-axis orientation="Bottom" v-bind="props"/>
      </template>
    </d3-cartesian>
  </div>
</template>

<script>
import * as d3 from 'd3'
const parseDate = d3.timeParse("%b %Y")

export default {
  data () {
    return {
      margin: { top: 20, right: 20, bottom: 30, left: 40 },
      x: { type: 'Time', domain: [] },
      y: { type: 'Linear', domain: [] },
      x2: { type: 'Time', domain: [] },
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
    d3.csv('/data/sp500.csv',
      d => {
        d.date = parseDate(d.date)
        d.price = +d.price
        return d
      }).then(data => {
        const domainX = d3.extent(data, d => d.date)
        const domainY = [0, d3.max(data, d => d.price)]
        this.x.domain = domainX
        this.y.domain = domainY
        this.x2.domain = domainX
        this.data = data
        this.$nextTick(() => {
          this.$refs.brush.moveTo(this.x2.domain)
        })
      })
  }
}
</script>
