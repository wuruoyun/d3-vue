<template>
  <svg class="treemap" :width="width" :height="height">
    <g ref="content" :transform="transform">
      <slot :width="contentWidth" :height="contentHeight"></slot>
    </g>
  </svg>
</template>

<script>
import * as d3 from 'd3'
import Region from '../mixins/Region'

function sumByCount(d) {
  return d.children ? 0 : 1;
}

function sumBySize(d) {
  return d.size;
}

export default {
  mixins: [ Region ],
  props: {
    data: {
      type: Object,
      required: true
    },
    nameFn: {
      type: Function,
      default: node => node.name
    },
    labelFn: {
      type: Function,
      required: false
    },
    valueFn: {
      type: Function,
      required: false
    },
    colorFn: {
      type: Function,
      required: false
    }
  },
  computed: {
    treemap () {
      return d3.treemap()
        .tile(d3.treemapResquarify)
        .size([this.contentWidth, this.contentHeight])
        .round(true)
        .paddingInner(1)
    },
    root () {
      const root = d3.hierarchy(this.data)
        .eachBefore(d => {
          d.data.id = (d.parent ? d.parent.data.id + "." : "") + this.nameFn(d.data)
        })
      return root
    }
  },
  watch: {
    valueFn (val) {
      this.treemap(this.root.sum(val))
      const cell = d3.select(this.$refs.content).selectAll("g")
      cell.transition().attr("transform", d => `translate(${d.x0},${d.y0})`)
        .select("rect")
          .attr("width", d => d.x1 - d.x0)
          .attr("height", d => d.y1 - d.y0)
    }
  },
  methods: {
    update () {
      const { data, valueFn, colorFn, labelFn, root } = this

      if (!data) return

      root.sum(valueFn).sort((a, b) => b.height - a.height || b.value - a.value)
      this.treemap(root)

      const cell = d3.select(this.$refs.content).selectAll("g")
        .data(root.leaves())
        .enter().append("g")
          .attr("transform", d => `translate(${d.x0},${d.y0})`)

      cell.append("rect")
          .attr("id", d => d.data.id)
          .attr("width", d => d.x1 - d.x0)
          .attr("height", d => d.y1 - d.y0)
          .attr("fill", d => colorFn(d.parent.data.id))

      cell.append("clipPath")
          .attr("id", d => "clip-" + d.data.id)
        .append("use")
          .attr("xlink:href", d => "#" + d.data.id)

      cell.append("text")
          .attr("clip-path", d => "url(#clip-" + d.data.id + ")")
        .selectAll("tspan")
          .data(d => labelFn(d.data))
        .enter().append("tspan")
          .attr("x", 4)
          .attr("y", (d, i) => 13 + i * 10)
          .text(d => d)

      const format = d3.format(",d")
      cell.append("title")
          .text(d => d.data.id + "\n" + format(d.value))
    }
  },
  mounted () {
    this.update()
  }
}
</script>
