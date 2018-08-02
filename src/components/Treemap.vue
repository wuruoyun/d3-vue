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
    labelFn: {
      type: String,
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
    }
  },
  watch: {
    data (val) {
      this.update()
    }
  },
  methods: {
    update () {
      const { data, pie, colorFn, labelFn, treemap } = this

      if (!data) return

      const fader = color => d3.interpolateRgb(color, "#fff")(0.2)
      const color = d3.scaleOrdinal(d3.schemePaired.map(fader))
      const format = d3.format(",d")

      const root = d3.hierarchy(data)
          .eachBefore(d => {
            d.data.id = (d.parent ? d.parent.data.id + "." : "") + d.data.name
          })
          .sum(sumBySize)
          .sort((a, b) => {
            return b.height - a.height || b.value - a.value
          })

      treemap(root);

      const cell = d3.select(this.$refs.content).selectAll("g")
        .data(root.leaves())
        .enter().append("g")
          .attr("transform", d => `translate(${d.x0},${d.y0})`)

      cell.append("rect")
          .attr("id", d => d.data.id)
          .attr("width", d => d.x1 - d.x0)
          .attr("height", d => d.y1 - d.y0)
          .attr("fill", d => color(d.parent.data.id));

      cell.append("clipPath")
          .attr("id", d => "clip-" + d.data.id)
        .append("use")
          .attr("xlink:href", d => "#" + d.data.id);

      cell.append("text")
          .attr("clip-path", d => "url(#clip-" + d.data.id + ")")
        .selectAll("tspan")
          .data(d => d.data.name.split(/(?=[A-Z][^A-Z])/g))
        .enter().append("tspan")
          .attr("x", 4)
          .attr("y", (d, i) => 13 + i * 10)
          .text(d => d);

      cell.append("title")
          .text(d => d.data.id + "\n" + format(d.value));
    }
  },
  mounted () {
    this.update()
  }
}
</script>
