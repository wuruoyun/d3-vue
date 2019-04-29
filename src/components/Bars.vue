<template>
  <g class="bars">
    <template v-if="orientation === 'vertical'">
      <rect v-for="(d, i) in data" :key="keyFn ? keyFn(d) : i"
        class="bar" :x="scaleX(xFn(d))" :y="scaleY(yFn(d))"
        :width="scaleX.bandwidth()" :height="height - scaleY(yFn(d))">
      </rect>
    </template>
    <template v-else>
      <rect v-for="(d, i) in data" :key="keyFn ? keyFn(d) : i"
        class="bar" :x="scaleX(xFn(d))" :y="scaleY(yFn(d))"
        :width="scaleX(xFn(d))" :height="scaleY.bandwidth()">
      </rect>
    </template>
  </g>
</template>

<script>
import CartesianArray from '../mixins/CartesianArray'

export default {
  mixins: [ CartesianArray ],
  computed: {
    orientation () {
      return (typeof this.scaleX.domain()[0] === 'number' &&
        typeof this.scaleY.domain()[0] === 'string')
        ? 'horizontal' : 'vertical'
    }
  }
}
</script>
