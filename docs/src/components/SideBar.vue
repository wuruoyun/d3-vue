<template>
  <aside class="sidebar">
    <h1>
      <a class="app-name-link" data-nosearch="" href="/">D3 Vue</a>
    </h1>
    <div class="sidebar-nav">
      <ul>
        <li v-for="section in sections" :key="section.title">
          <p>{{section.title}}</p>
          <ul>
            <router-link v-for="page in section.pages"
              tag="li" active-class="active" :key="page.title" :to="page.to">
              <a>{{page.title}}</a>
            </router-link>
          </ul>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script>
export default {
  data () {
    return {
      sections: [
        {
          title: 'Getting started',
          pages: [
            { to: 'quick-start', title: 'Quick start' }
          ]
        },
        {
          title: 'Basic Demo',
          pages: [
            { to: '/bar-chart', title: 'Bar Chart' },
            { to: '/line-chart', title: 'Line Chart' },
            { to: '/pie-chart', title: 'Pie Chart' },
            { to: '/scatter-plot', title: 'Scatter Plot' }
          ]
        },
        {
          title: 'Intermediate Demo',
          pages: [
            { to: '/choropleth', title: 'Choropleth' }
          ]
        }
      ]
    }
  }
}
</script>
