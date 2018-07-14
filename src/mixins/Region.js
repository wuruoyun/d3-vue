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
        return { top: 20, right: 20, bottom: 30, left: 30 }
      }
    }
  },
  computed: {
    transform () {
      return `translate(${this.margin.left},${this.margin.top})`
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
