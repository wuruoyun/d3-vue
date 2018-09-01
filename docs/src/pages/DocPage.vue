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
          title: 'Getting started',
          pages: [
            { to: 'quick-start', title: 'Quick start' }
          ]
        }, {
          title: 'Components',
          pages: [
            { to: 'axis', title: 'Axis' },
            { to: 'cartesian', title: 'Cartesian' }
          ]
        }
      ]
    }
  }
}
</script>
