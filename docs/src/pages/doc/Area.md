# Area

`Area` component represents a single area in `Cartesian` component. It should be added to the `default` slot in `Cartesian` component, which provies several required props, such as `scaleX`, `scaleY`,`width` and `height`.

```html
<template>
  <d3-cartesian width="800" height="200" :x="{ type: 'Linear', domain: [0, 100] }"
    :y="{ type: 'Linear', domain: [0, 100] }">
    <d3-area :data="data" slot-scope="props" v-bind="props"/>
    <d3-axis slot="south" orientation="Bottom" slot-scope="props" v-bind="props"/>
    <d3-axis slot="west" orientation="Left" slot-scope="props" v-bind="props"/>
  </d3-cartesian>
</template>
<script>
export default {
  created () {
    this.data = [ { x: 10, y: 20 }, { x: 30, y: 40 }, { x: 60, y: 50 }, { x: 90, y: 95 } ]
  }
}
</script>
<!-- area-demo.vue -->
```

## Props

Name             | Type       | Default      | Required | Description
---------------- | ---------- | ------------ | -------- | -----------------------
`scaleX`         | Function   |              | true     | D3 scale object, usually set by its parent `Cartesian` component
`scaleY`         | Function   |              | true     | D3 scale object, usually set by its parent `Cartesian` component
`width`          | Number     |              | true     | The width of the axis painting area, usually set by its parent `Cartesian` component
`height`         | Number     |              | true     | The height of the axis painting area, usually set by its parent `Cartesian` component
`data`           | Array      | []           |          | The data for the area
`x`              | String or Function | 'x'          |          | A Function to retrieve the X value from `data`. A String 'abc' is equivalent to Function `d => d['abc']`.
`y`              | String or Function | 'y'          |          | A Function to retrieve the Y upper value from `data`. A String 'abc' is equivalent to Function `d => d['abc']`.
`y0`             | String or Function | `d => 0`     |          | A Function to retrieve the lower Y value from `data`. A String 'abc' is equivalent to Function `d => d['abc']`.
`color`          | String     | 'steelblue'  |          | Color to fill the area
`curveFn`        | Function   |              |          | D3 curve function, such as `d3.curveMonotoneX`
`definedFn`      | Function   |              |          | A function that takes an element from `data` and returns `true` if the data element should be included and `false` otherwise.

## Slots

None

## Events

None

## Methods

None