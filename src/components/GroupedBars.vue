<template>
  <g class="grouped-bars"></g>
</template>

<script>
import * as d3 from 'd3'
import CartesianChild from '../mixins/CartesianChild'

export default {
  mixins: [ CartesianChild ],
  props: {
    data: {
      type: Array,
      default: () => []
    },
    x: {
      type: [String, Function],
      default: 'x'
    },
    keys: {
      type: Array,
      required: true
    },
    colorFn: {
      type: Function,
      required: false
    }
  },
  computed: {
    xFn () {
      const { x } = this
      return typeof x === 'function' ? x : d => d[x]
    },
    innerScaleX () {
      const { keys, scaleX } = this
      return d3.scaleBand()
        .padding(0.05).domain(keys).rangeRound([0, scaleX.bandwidth()])
    },
    stackedData () {
      const { data, stack } = this
      if (data) return stack(data)
      else return null
    },
    colorFnByKey () {
      const { colorFn, keys } = this
      if (colorFn) return colorFn.domain(keys)
      else return null
    }
  },
  watch: {
    data () {
      this.update()
    }
  },
  methods: {
    update () {
      if (!this.data) return

      const { scaleX, scaleY, innerScaleX, xFn, colorFn, keys } = this
      d3.select(this.$el).selectAll('g')
        .data(this.data)
        .enter().append('g')
          .attr('transform', d => `translate(${scaleX(xFn(d))},0)`)
        .selectAll('rect')
        .data(d => keys.map(key => {
          return { key: key, value: d[key] }
        }))
        .enter().append('rect')
          .attr('x', d => innerScaleX(d.key))
          .attr('y', d => scaleY(d.value))
          .attr('width', innerScaleX.bandwidth())
          .attr('height', d => this.height - scaleY(d.value))
          .attr('fill', d => colorFn(d.key))
    }
  },
  mounted () {
    if (this.data) {
      this.update()
    }
  }
}
</script>
