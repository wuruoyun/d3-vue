<template>
  <div style="height:100%;">
    <app-header/>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from './components/Header.vue'

export default {
  components: {
    'app-header': Header
  }
}
</script>
