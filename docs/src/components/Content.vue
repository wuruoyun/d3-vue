<template>
  <main>
    <app-sidebar :sections="sections"/>
    <section class="content">
      <article class="markdown-section">
        <router-view></router-view>
        <app-footer />
      </article>
    </section>
  </main>
</template>

<script>
import SideBar from './SideBar.vue'
import Footer from './Footer.vue'

export default {
  components: {
    'app-sidebar': SideBar,
    'app-footer': Footer
  },
  props: {
    sections: {
      type: Array,
      required: true
    }
  }
}
</script>
