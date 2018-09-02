<template>
  <app-content :sections="sections"/>
</template>

<script>
import Content from '../components/Content.vue'

export default {
  components: {
    'app-content': Content
  },
  data () {
    return {
      sections: [
        {
          title: 'Introduction',
          pages: [
            { to: 'introduction', title: 'Introduction' }
          ]
        },
        {
          title: 'Basic Demo',
          pages: [
            { to: 'area-chart', title: 'Area Chart' },
            { to: 'bar-chart', title: 'Bar Chart' },
            { to: 'line-chart', title: 'Line Chart' },
            { to: 'pie-chart', title: 'Pie Chart' },
            { to: 'scatter-plot', title: 'Scatter Plot' }
          ]
        },
        {
          title: 'Intermediate Demo',
          pages: [
            { to: 'brush-and-zoom', title: 'Brush & Zoom' },
            { to: 'brush-and-zoom-ii', title: 'Brush & Zoom II' },
            { to: 'candle-stick', title: 'Candlestick Chart' },
            { to: 'choropleth', title: 'Choropleth' },
            { to: 'density-contour', title: 'Density Contour' },
            { to: 'grid-lines', title: 'Grid Lines' },
            { to: 'missing-data', title: 'Missing Data' },
            { to: 'stacked-area', title: 'Stacked Area' },
            { to: 'treemap', title: 'Treemap' }
          ]
        }
      ]
    }
  }
}
</script>
