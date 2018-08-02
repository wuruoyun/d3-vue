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
    y: {
      type: String | Function,
      default: 'y'
    },
    k: {
      type: String | Function,
      required: false
    }
  },
  computed: {
    xFn () {
      const { x } = this
      return typeof x === 'function' ? x : d => d[x]
    },
    yFn () {
      const { y } = this
      return typeof y === 'function' ? y : d => d[y]
    },
    keyFn () {
      const { k } = this
      if (k) return typeof k === 'function' ? k : d => d[k]
    },
    scaledXFn () {
      return d => this.scaleX(this.xFn(d))
    },
    scaledYFn () {
      return d => this.scaleY(this.yFn(d))
    },
    scales () {
      return { x: this.scaleX, y: this.scaleY }
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
