# Cartesian

`Cartesian` component serves as the top-level container for charts that use Cartesian coordinate system. It contains children component such as `Area`, `Line`, `Points`, `Axis`, etc. It creates the D3 scales for X and Y based on configuration prop, and injects the scales, along with other props, into its children components via slot scope.

> Demo: [Area Chart](#/gallery/area-chart), [Bar Chart](#/gallery/bar-chart), [Line Chart](#/gallery/line-chart), [Scatter Plot](#/gallery/scatter-plot)

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
