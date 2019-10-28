<template>
  <div class = "demo">
    <d3-cartesian :width="860" :height="450" :x="x" :y="y">
      <template #default="props">
        <d3-bars :data="dataZoomed" x="date" y="price" v-bind="props"/>
      </template>
      <template #south="props">
        <d3-axis class="axis--x" orientation="Bottom" :config="configX"
          v-bind="props"/>
      </template>
      <template #west="props">
        <d3-axis orientation="Left" v-bind="props"/>
      </template>
    </d3-cartesian>
    <d3-cartesian class="navigator" :width="860" :height="100" :x="x2" :y="y">
      <template #default="props">
        <d3-bars :data="data" x="date" y="price" v-bind="props"/>
        <d3-brush ref="brush" orientation="x" @brush="brushed" @end="brushed" v-bind="props"/>
      </template>
    </d3-cartesian>
  </div>
</template>

<script>
import * as d3 from 'd3'

export default {
  data () {
    return {
      data: null,
      dataZoomed: null,
      x: { type: 'Band', domain: [], config: scale => scale.padding(0.1) },
      y: { type: 'Linear', domain: [] },
      x2: { type: 'Band', domain: [], config: scale => scale.padding(0.1) }
    }
  },
  computed: {
    configX () {
      if (this.data) {
        const multiplier = Math.ceil(this.x.domain.length / 5)
        const tickValues = this.x.domain.filter((d, i) => i % multiplier === 0)
        return axis => axis.tickValues(tickValues)
      }
    }
  },
  methods: {
    brushed (domain) {
      this.x.domain = domain
      let start, end
      if(domain.length > 1) {
        start = domain[0]
        end = domain[domain.length - 1] + 1
      } else { 
        start = 0
        end = this.data.length
      }
      this.dataZoomed = this.data.slice(start, end);
    }
  },
  created () {
    const data = []
    for (let i = 0; i < 300; i++) {
      data.push({
        date: i,
        price: Math.floor(Math.random() * 600)
      });
    }
    this.data = data
    this.dataZoomed = data
    this.x.domain = data.map(d => d.date)
    this.x2.domain = data.map(d => d.date)
    this.y.domain = [0, d3.max(data, d => d.price)]
  }
}
</script>

<style lang="scss" scoped>
.demo /deep/ {
  .bar {
    fill: steelblue;
  }
  .bar:hover {
    fill: brown;
  }
  .axis--x path {
    display: none;
  }
  .navigator {
    .bar {
      fill: grey;
      opacity: 0.5;
    }
  }
}
</style>
