<template>
  <g class="cartesian" :transform="transform">
    <axis v-if="showAxisX"
      :type="axisX.type"
      :title="axisX.title"
      :location="axisLocationX"
      :options="axisX.options"
      :scaleX="scaleX"
      :scaleY="scaleY"
      :width="contentWidth"
      :height="contentHeight"/>
    <axis v-if="showAxisY"
      :type="axisY.type"
      :title="axisY.title"
      :location="axisLocationY"
      :options="axisY.options"
      :scaleX="scaleX"
      :scaleY="scaleY"
      :width="contentWidth"
      :height="contentHeight"/>
    <slot :scaleX="scaleX"
      :scaleY="scaleY"
      :width="contentWidth"
      :height="contentHeight"/>
  </g>
</template>

<script>
import * as d3 from 'd3'
import Region from '../mixins/Region'
import Axis from './Axis.vue'

export default {
  mixins: [ Region ],
  components: { Axis },
  props: {
    axisX: {
      type: Object,
      required: true,
      validator: (value) => {
        const { type, domain } = value
        return type && domain
      }
    },
    axisY: {
      type: Object,
      required: true,
      validator: (value) => {
        const { type, domain } = value
        return type && domain
      }
    }
  },
  computed: {
    domainX () {
      return this.axisX.domain
    },
    domainY () {
      return this.axisY.domain
    },
    scaleX () {
      const scale = this.scale(this.axisX)
      return scale.domain(this.domainX).rangeRound([0, this.contentWidth])
    },
    scaleY () {
      const scale = this.scale(this.axisY)
      return scale.domain(this.domainY).rangeRound([this.contentHeight, 0])
    },
    showAxisX () {
      return this.axisX.display !== 'none'
    },
    showAxisY () {
      return this.axisY.display !== 'none'
    },
    axisLocationX () {
      return this.axisX.display === 'secondary' ? 'Top' : 'Bottom'
    },
    axisLocationY () {
      return this.axisY.display === 'secondary' ? 'Right' : 'Left'
    }
  },
  methods: {
    scale (axis) {
      const { type, options } = axis
      const scale = d3[`scale${type}`]()
      if (options) {
        switch (type) {
          case 'Band':
            const { padding } = options
            if (padding) scale.padding(padding)
            break
        }
      }
      return scale
    }
  }
}
</script>
