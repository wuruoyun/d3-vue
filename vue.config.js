module.exports = {
  chainWebpack: config => {
    config.externals({
      d3: 'd3',
      'topojson-client': 'topojson-client'
    })
  }
}
