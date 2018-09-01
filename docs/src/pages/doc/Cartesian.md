# Cartesian

Cartesian serves as the top-level contains for charts that use Cartesian coordinate system.

```html
<d3-cartesian class="demo" :margin="margin" :width="900" :height="450" :x="x" :y="y">
  <d3-line :data="data" slot-scope="props" v-bind="props"/>
</d3-cartesian>
```

## Props

Name             | Type       | Default      | Required | Description
---------------- | ---------- | ------------ | -------- | -----------------------
`x`              | Object     |              | true     | Configration for X scale, such as `{ type: 'Linear', domain: [0, 100]}`
`y`              | Object     |              | true     | Configration for Y scale, such as `{ type: 'Linear', domain: [0, 100]}`
`margin`         | Object     | `{ top: 20, right: 20, bottom: 30, left: 30 }` |          | Margin around the chart content area
`zoom`           | String     |              |          | Eable zoom at given orientation. Supported values: 'x', 'y', or 'xy'

## Slots

Slot             | Description
---------------- | -----------------------
`default`        | The content area of the chart
`north`          | The north region in the chart margin
`east`           | The east region in the chart margin
`south`          | The south region in the chart margin
`west`           | The west region in the chart margin

## Events

Event            | Params          | Description
---------------- | --------------- | -----------------------
`zoom`           | `x, y`          | When zoom occurs in the chart. The `x` and `y` are in domain unit

## Methods

Name             | Params            | Description
---------------- | ----------------- | -----------------------
`zoomTo`         | `{ x: [x1, x2], y: [y1, y2]}` | Zoom to the given domain range
`zoomToX`        | `[x1, x2]`        | Zoom to the given X domain range
`zoomToY`        | `[y1, y2]`        | Zoom to the given Y domain range
`resetZoom`      | `x`, `y`, or `xy` | Reset zoom in the specified orientation
