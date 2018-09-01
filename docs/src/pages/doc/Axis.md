# Axis

Axis are usually added to one of the margin slots in `Cartesian`, which in turn provies several required props to the axis.

```html
<template>
  <d3-cartesian width="900" height="100"
    :x="{type: 'Time', domain: [new Date(2015, 0, 1), new Date(2018, 0, 1)]}"
    :y="{type: 'Linear', domain: [0, 100]}">
    <d3-axis slot="south" orientation="Bottom" slot-scope="props" v-bind="props"/>
    <d3-axis slot="west" orientation="Left" :options="{ticks: {count: 3}}" slot-scope="props" v-bind="props"/>
  </d3-cartesian>
</template>
<!-- axis-demo.vue -->
```

## Props

Name             | Type       | Default      | Required | Description
---------------- | ---------- | ------------ | -------- | -----------------------
`scale`          | Function   |              | true     | D3 scale object, usually set by its parent `Cartesian` component
`orientation`    | String     | 'Bottom'     | true     | Orientation of the ticks. Supported values: 'Bottom', 'Left', 'Right', 'Top'
`title`          | String     |              |          | Title of the axis
`width`          | Number     |              |          | The width of the axis painting area, usually set by its parent `Cartesian` component
`height`         | Number     |              |          | The height of the axis painting area, usually set by its parent `Cartesian` component
`options`        | Object     |              |          | Extra options for the axis

## Slots

None

## Events

None

## Methods

None
