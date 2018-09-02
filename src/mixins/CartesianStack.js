import * as d3 from 'd3'
import CartesianChild from './CartesianChild'

export default {
  mixins: [ CartesianChild ],
  props: {
    data: {
      type: Array,
      default: () => []
    },
    x: {
      type: String | Function,
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
    stack () {
      return d3.stack().keys(this.keys)
    }
  },
  watch: {
    data (val) {
      this.update()
    }
  },
  methods: {
    update () {
      // sub-element should override this method
    }
  },
  mounted () {
    if (this.data) {
      this.update()
    }
  }
}
