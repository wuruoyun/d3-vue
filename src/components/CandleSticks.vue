<template>
  <g class="candle-sticks" stroke-linecap="round" stroke="black">
    <g v-for="(d, i) in data" :key="keyFn ? keyFn(d) : i" 
      :transform="`translate(${scaleX(d.date)},0)`" :stroke="colorFn(d)"
      class="candle-stick">
      <line :y1="scaleY(d.low)" :y2="scaleY(d.high)"/>
      <line :y1="scaleY(d.open)" :y2="scaleY(d.close)" :stroke-width="scaleX.bandwidth()"/>
    </g>
  </g>
</template>

<script>
import * as d3 from 'd3'
import CartesianArray from '../mixins/CartesianArray'

export default {
  mixins: [ CartesianArray ],
  props: {
    colorFn: {
      type: Function,
      default: d => {
        return d.open > d.close ? d3.schemeSet1[0]
          : d.close > d.open ? d3.schemeSet1[2]
          : d3.schemeSet1[8]
      }
    }
  }
}
</script>
