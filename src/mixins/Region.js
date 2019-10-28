export default {
  props: {
    width: {
      type: Number,
      default: 600
    },
    height: {
      type: Number,
      default: 400
    },
    margin: {
      type: Object,
      default: () => {
        return { top: 0, right: 0, bottom: 0, left: 0 }
      }
    }
  },
  computed: {
    transform () {
      const { margin } = this
      if (margin.left !== 0 || margin.top !== 0) {
        return `translate(${margin.left},${margin.top})`
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
