<template>
  <svg class="pie" :width="width" :height="height">
    <g ref="content" :transform="transform">
      <slot :width="contentWidth" :height="contentHeight"></slot>
    </g>
  </svg>
</template>

<script>
import * as d3 from 'd3'
import Region from '../mixins/Region'

export default {
  mixins: [ Region ],
  props: {
    data: {
      type: Array,
      default: () => []
    },
    label: {
      type: String,
      default: 'label'
    },
    value: {
      type: String,
      default: 'value'
    },
    color: {
      type: String,
      default: 'color'
    },
    outerRadius: {
      type: Number,
      default: 300
    },
    innerRadius: {
      type: Number,
      default: 0
    }
  },
  computed: {
    transform () { // override the transform from mixin
      const x = this.margin.left + this.contentWidth / 2
      const y = this.margin.top + this.contentHeight / 2
      return `translate(${x},${y})`
    },
    pie () {
      return d3.pie().sort(null).value(d => d[this.value])
    },
    pathFn () {
      const { outerRadius, innerRadius } = this
      return d3.arc().outerRadius(outerRadius).innerRadius(innerRadius)
    },
    labelFn () {
      const { outerRadius, innerRadius } = this
      const r = Math.max(outerRadius - 40, (outerRadius + innerRadius) / 2)
      return d3.arc().outerRadius(r).innerRadius(r)
    }
  },
  watch: {
    data (val) {
      this.update()
    }
  },
  methods: {
    update () {
      const { data, pie, pathFn, labelFn } = this

      if (!data) return

      const arc = d3.select(this.$refs.content).selectAll('.arc')
        .data(pie(data))
        .enter().append("g")
        .attr("class", "arc")

      arc.append("path")
        .attr("d", pathFn)
        .attr("fill", d => d.data[this.color])

      arc.append("text")
          .attr("transform", d => `translate(${labelFn.centroid(d)})`)
          .attr("dy", "0.35em")
          .text(d => d.data[this.label]);
        }
  },
  mounted () {
    this.update()
  }
}
</script>
