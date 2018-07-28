<template>
  <g class="brush"></g>
</template>

<script>
import * as d3 from 'd3'
import CartesianChild from '../mixins/CartesianChild'

export default {
  mixins: [ CartesianChild ],
  props: {
    orientation: {
      type: String, // x, y, xy
      default: 'x'
    }
  },
  data () {
    return {
      silent: false,
      rangeX: null,
      rangeY: null
    }
  },
  computed: {
    brushFn () {
      const { orientation, width, height } = this
      let brush
      switch (orientation) {
        case 'x':
          brush = d3.brushX().extent([[0, 0], [width, height]])
            .on('brush end', this.brushedX)
          break
        case 'y':
          brush = d3.brushY().extent([[0, 0], [width, height]])
            .on('brush end', this.brushedY)
          break
        default:
          brush = d3.brush().extent([[0, 0], [width, height]])
            .on('brush end', this.brushed)
          break
      }
      return brush
    }
  },
  methods: {
    moveTo (domain) {
      const { orientation, scaleX, scaleY } = this
      switch (orientation) {
        case 'x':
          this.rangeX = [scaleX(domain[0]), scaleX(domain[1])]
          break
        case 'y':
          this.rangeY = [scaleY(domain[0]), scaleY(domain[1])]
          break
        default:
          this.rangeX = [scaleX(domain.x[0]), scaleX(domain.x[1])]
          this.rangeY = [scaleY(domain.y[0]), scaleY(domain.y[1])]
          break
      }
      this.silent = true // disable brusher listener
      this.update()
      this.silent = false // resume brush listener
    },
    brushedX () {
      if (this.silent) return
      const { scaleX } = this
      const selection = d3.event.selection || scaleX.range()
      const x = selection.map(scaleX.invert, scaleX)
      this.$emit('brushed', x)
    },
    brushedY () {
      if (this.silent) return
      const { scaleY } = this
      const selection = d3.event.selection || scaleY.range()
      const y = selection.map(scaleY.invert, scaleY)
      this.$emit('brushed', [y[1], y[0]])
    },
    brushed () {
      if (this.silent) return
      const { scaleX, scaleY } = this
      const s = d3.event.selection
      const selectionX = [s[0][0], s[1][0]] || scaleX.range()
      const selectionY = [s[0][1], s[1][1]] || scaleY.range()
      const x = selectionX.map(scaleX.invert, scaleX)
      const y = selectionY.map(scaleY.invert, scaleY)
      this.$emit('brushed', { x, y: [y[1], y[0]] })
    },
    update () {
      const { $el, brushFn, rangeX, rangeY } = this
      if (rangeX && rangeY) {
        d3.select($el).call(brushFn)
          .call(brushFn.move, [
            [rangeX[0], rangeY[1]],
            [rangeX[1], rangeY[0]]
          ])
      } else if (rangeX) {
        d3.select($el).call(brushFn)
          .call(brushFn.move, [rangeX[0], rangeX[1]])
      } else if (rangeY) {
        d3.select($el).call(brushFn)
          .call(brushFn.move, [rangeY[1], rangeY[0]])
      }
    }
  },
  watch: {
    brushFn (val) {
      this.update()
    }
  },
  mounted () {
    this.update()
  }
}
</script>
