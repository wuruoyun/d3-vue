export default {
  props: {
    width: {
      type: Number | String,
      default: 600
    },
    height: {
      type: Number | String,
      default: 400
    },
    margin: {
      type: Object,
      default: () => {
        return { top: 0, right: 0, bottom: 0, left: 0 }
      }
    }
  },
  data () {
    return {
      x: 0,
      y: 0
    }
  },
  computed: {
    transform () {
      const { margin, x, y } = this
      if (margin.left + x !== 0 || margin.top + y !== 0) {
        return `translate(${margin.left + x},${margin.top + y})`
      }
    },
    contentWidth () {
      const { left, right } = this.margin
      return this.width - left - right
    },
    contentHeight () {
      const { top, bottom } = this.margin
      return this.height - top - bottom
    }
  }
}
