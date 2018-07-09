import * as components from './components'

const install = (Vue, options = {}) => {
  let prefix = options.prefix
  if (!prefix || prefix.length === 0) prefix = 'd3'
  for (let key in components) {
    Vue.component(prefix + key, components[key])
  }
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export { install }
