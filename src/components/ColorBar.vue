<template>
  <g ref="colorBar" :transform="transform"/>
</template>

<script>
import * as d3 from 'd3'

export default {
  props: {
    x: {
      type: Number,
      default: 0
    },
    y: {
      type: Number,
      default: 0
    },
    colorScale: {
      type: Function,
      required: true
    },
    domain: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      required: false
    },
    tickFormat: {
      type: Function,
      required: false
    }
  },
  computed: {
    transform () {
      const { x, y } = this
      if (x !== 0 || y !== 0) {
        return `translate(${x},${y})`
      }
    }
  },
  methods: {
    update () {
      const { colorScale, domain, title, tickFormat } = this
      const x = d3.scaleLinear().domain(domain).rangeRound([0, 260])
      const g = d3.select(this.$refs.colorBar)
      
      g.selectAll('rect')
        .data(colorScale.range().map(d => {
            d = colorScale.invertExtent(d)
            if (d[0] == null) d[0] = x.domain()[0]
            if (d[1] == null) d[1] = x.domain()[1]
            return d
          }))
        .enter().append('rect')
          .attr('height', 8)
          .attr('x', d => x(d[0]))
          .attr('width', d => x(d[1]) - x(d[0]))
          .attr('fill', d => colorScale(d[0]))

      if (title) {
        g.append('text')
            .attr('class', 'caption')
            .attr('x', x.range()[0])
            .attr('y', -6)
            .attr('fill', '#000')
            .attr('text-anchor', 'start')
            .attr('font-weight', 'bold')
            .text(title)
      }

      g.call(d3.axisBottom(x)
        .tickSize(13)
        .tickFormat(tickFormat)
        .tickValues(colorScale.domain()))
        .select('.domain')
        .remove()
    }
  },
  mounted () {
    this.update()
  }
}
</script>
