# Cartesian

Cartesian serves as the top-level component for charts that use Cartesian coordinate system. It contains children component such as lines, points, axis, etc. It creates the D3 scales for X and Y based on configuration prop, and injects the scales, along with other data, into the components in its slots via slot scope.

```html
<template>
  <d3-cartesian :width="800" :height="250" :x="{ type: 'Linear', domain: [0, 100] }"
    :y="{ type: 'Linear', domain: [0, 100] }">
    <template slot-scope="props">
      <d3-line :data="data" v-bind="props"/>
      <d3-points :data="data" v-bind="props"/>
    </template>
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
<!-- cartesian-demo.vue -->
```

## Props

Name             | Type       | Default      | Required | Description
---------------- | ---------- | ------------ | -------- | -----------------------
`x`              | Object     |              | true     | Configration for X scale, such as `{ type: 'Linear', domain: [0, 100]}`
`y`              | Object     |              | true     | Configration for Y scale, such as `{ type: 'Linear', domain: [0, 100]}`
`margin`         | Object     | `{ top: 20, right: 20, bottom: 30, left: 30 }` |          | Margin around the chart content area
`zoom`           | String     |              |          | Eable zoom at given orientation. Supported values: 'x', 'y', or 'xy'

## Slots

Slot             | Slot Props       | Description
---------------- | ---------------- | -----------------------
`default`        | `scaleX`, `scaleY`, `width`, `height` | The content area of the chart.
`north`          | `scale`, `width`, `height` | The north region in the chart margin. The `scale` is for X axis.
`east`           | `scale`, `width`, `height` | The east region in the chart margin. The `scale` is for Y axis.
`south`          | `scale`, `width`, `height` | The south region in the chart margin. The `scale` is for X axis.
`west`           | `scale`, `width`, `height` | The west region in the chart margin. The `scale` is for Y axis.

## Events

Event            | Payload         | Description
---------------- | --------------- | -----------------------
`zoom`           | `{ x: [x1, x2], y: [y1, y2]}` | When zoom occurs in the chart. The `x` and `y` are the new domain ranges after zooming took place.

## Methods

Name             | Params            | Description
---------------- | ----------------- | -----------------------
`zoomTo`         | `{ x: [x1, x2], y: [y1, y2]}` | Zoom to the given domain range
`zoomToX`        | `[x1, x2]`        | Zoom to the given X domain range
`zoomToY`        | `[y1, y2]`        | Zoom to the given Y domain range
`resetZoom`      | `x`, `y`, or `xy` | Reset zoom in the specified orientation
