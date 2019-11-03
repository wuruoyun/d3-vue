[![Netlify Status](https://api.netlify.com/api/v1/badges/54bae512-b505-496d-bbcf-e0c34e54c4b8/deploy-status)](https://app.netlify.com/sites/naughty-hugle-b3dc24/deploys)

# d3-vue

> A Vue component library for visualization with [D3](https://d3js.org/).

Documentation at [here](https://naughty-hugle-b3dc24.netlify.com/)

## Build Setup

```bash
# install dependencies
npm install

# serve doc app with hot reload
npm run docs:dev

# build for production with minification
npm run build
```

## Basic Demo

The following is an example of using the library directly in a simple HTML page, which is available in the root folder. However, the library is more suitable for app with many different plots, rather than the simple use case below.

```html
<!DOCTYPE html>
<html>
  <head><title>Simple Client Demo</title></head>
  <body>
    <div id="app">
      <d3-cartesian :x="x" :y="y" :width="600" :height="300">
        <template #default="props">
          <d3-area :data="points" v-bind="props"/>
        </template>
        <template #south="props">
          <d3-axis v-bind="props"/>
        </template>
        <template #west="props">
          <d3-axis orientation="Left" v-bind="props"/>
        </template>
      </d3-cartesian>
    </div>
  </body>

  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  <script src="https://d3js.org/d3.v5.js"></script>
  <script src="dist/d3-vue.umd.js"></script>
  <script>
    var app = new Vue({
      el: '#app',
      data: {
        x: { type: 'Linear', domain: [0, 10] },
        y: { type: 'Linear', domain: [0, 10] },
        points: []
      },
      created () {
        for (let i = 0; i <= 10; i++) {
          this.points.push({x: i, y: Math.random() * 10})
        }
      }
    })
  </script>
</html>
```

## License

[MIT](LICENSE).
