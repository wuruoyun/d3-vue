# Axis

Axis is the visual representation of scales. It is usually added to one of the margin slots in `Cartesian` component, which provies several required props, such as `scale`, `width` and `height` to the axis.

```html
<template>
  <d3-cartesian width="800" height="150"
    :x="{ type: 'Time', domain: [new Date(2015, 0, 1), new Date(2018, 0, 1)] }"
    :y="{ type: 'Linear', domain: [0, 100] }">
    <d3-axis slot="south" orientation="Bottom" title="X title" slot-scope="props" v-bind="props"/>
    <d3-axis slot="west" orientation="Left" title="Y title" :options="{ ticks: { count: 4 } }"
      slot-scope="props" v-bind="props"/>
    </d3-cartesian>
</template>
<!-- axis-demo.vue -->
```

## Props

Name             | Type       | Default      | Required | Description
---------------- | ---------- | ------------ | -------- | -----------------------
`scale`          | Function   |              | true     | D3 scale object, usually set by its parent `Cartesian` component
`width`          | Number     |              | true     | The width of the axis painting area, usually set by its parent `Cartesian` component
`height`         | Number     |              | true     | The height of the axis painting area, usually set by its parent `Cartesian` component
`orientation`    | String     | 'Bottom'     |          | Orientation of the ticks. Supported values: 'Bottom', 'Left', 'Right', 'Top'
`title`          | String     |              |          | Title of the axis, only valid if `orientation` is 'Bottom' or 'Left'
`options`        | Object     |              |          | Extra options for the axis

## Slots

None

## Events

None

## Methods

None
