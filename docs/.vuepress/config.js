module.exports = {
  base: '/',
  title: 'D3-Vue',
  description: 'Just playing around',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Components', link: '/components/' },
      { text: 'Github', link: 'https://github.com/wuruoyun/d3-vue' },
    ],
    sidebar: [
      {
        title: 'Introduction',
        collapsable: false,
        children: [
          'introduction/guide'
        ]
      },
      {
        title: 'Components',
        collapsable: false,
        children: [
          'components/Area',
          'components/Axis',
          'components/Bars',
          'components/Cartesian',
          'components/GridLines',
          'components/Line',
          'components/Points',
          'components/Text'
        ]
      },
      {
        title: 'Gallery',
        collapsable: false,
        children: [
          'gallery/AreaChart',
          'gallery/BarChart',
          'gallery/BrushAndZoom',
          'gallery/BrushAndZoomII',
          'gallery/BrushingBarChart',
          'gallery/CandleStick',
          'gallery/Choropleth',
          'gallery/DensityContour',
          'gallery/GridLines',
          'gallery/GroupedBars',
          'gallery/LineChart',
          'gallery/MissingData',
          'gallery/PieChart',
          'gallery/ScatterPlot',
          'gallery/StackedArea',
          'gallery/StackedBars',
          'gallery/Treemap'
        ]
      }
    ]
  },
  markdown: {
    lineNumbers: true
  }
}