<template>
  <g class="box-layout" :transform="transform">
    <slot :parentWidth="finalWidth" :parentHeight="finalHeight"></slot>
  </g>
</template>

<script>
import Region from '../mixins/Region'

export default {
  mixins: [ Region ],
  props: {
    orientation: {
      type: String,
      default: 'horizontal'
    },
    parentWidth: {
      type: Number,
      required: false
    },
    parentHeight: {
      type: Number,
      required: false
    }
  },
  computed: {
    finalWidth () {
      const { width, parentWidth } = this
      return typeof width === 'number'
        ? width
        : parentWidth * parseFloat(width) / 100
    },
    finalHeight () {
      const { height, parentHeight } = this
      return typeof height === 'number'
        ? height
        : parentHeight * parseFloat(height) / 100
    }
  },
  created () {
    console.log('created', this.orientation, this.$parent, this.$children)
  },
  mounted () {
    const { orientation, $children } = this
    if ($children.length > 1) {
      if (orientation === 'horizontal') {
        let totalWidth = 0
        $children.forEach((c, i) => {
          c.x += totalWidth
          totalWidth += c.finalWidth
        })
      } else {
        let totalHeight = 0
        $children.forEach((c, i) => {
          c.y += totalHeight
          totalHeight += c.finalHeight
        })
      }
    }
  }
}
</script>
