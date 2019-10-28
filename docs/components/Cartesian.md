# Cartesian

`Cartesian` component serves as the top-level component for all charts that use Cartesian coordinate system. It may contain children component such as `Area`, `Line`, `Points`, `Axis`, etc. It creates the D3 scales for X and Y axis and injects them, along with other props, into its children components via slot scope.

Zooming in X, Y or both direction is supported if both X and Y are using continuous scales. It is done by setting a smaller domain range to the corresponding scales.

> Demo: [Area Chart](/gallery/AreaChart), [Bar Chart](/gallery/BarChart), [Line Chart](/gallery/LineChart), [Scatter Plot](/gallery/ScatterPlot)

## Props

Name             | Type       | Default      | Required | Description
---------------- | ---------- | ------------ | -------- | -----------------------
`x`              | Object     |              | true     | Configration for X scale, such as `{ type: 'Linear', domain: [0, 100]}`
`y`              | Object     |              | true     | Configration for Y scale, such as `{ type: 'Linear', domain: [0, 100]}`
`margin`         | Object     | `{ top: 20, right: 20, bottom: 30, left: 30 }` |          | Margin around the chart content area. Each side of the margin has a slot to put components, such as Axis.
`zoom`           | String     |              |          | Eable zoom at given orientation. Supported values: 'x', 'y', or 'xy'

## Slots

Slot             | Slot Props       | Description
---------------- | ---------------- | -----------------------
`default`        | `scaleX`, `scaleY`, `width`, `height` | The content area of the chart. The `width` and `height` are of this content area rather than the root SVG.
`north`          | `scale`, `width`, `height` | The north region in the chart margin. The `scale` is for X axis.
`east`           | `scale`, `width`, `height` | The east region in the chart margin. The `scale` is for Y axis.
`south`          | `scale`, `width`, `height` | The south region in the chart margin. The `scale` is for X axis.
`west`           | `scale`, `width`, `height` | The west region in the chart margin. The `scale` is for Y axis.

## Events

Event            | Payload         | Description
---------------- | --------------- | -----------------------
`zoom`           | `{ x: [x1, x2], y: [y1, y2]}` if zoom mode is 'xy', `[x1, x2]` if zoom mode is 'x', `[y1, y2]` if zoom mode is 'y' | When zoom occurs in the chart. The `x1`, `y1`, etc. are the new domain ranges after zooming took place.

## Methods

Name             | Params            | Description
---------------- | ----------------- | -----------------------
`zoomTo`         | `{ x: [x1, x2], y: [y1, y2]}` | Zoom to the given domain range
`zoomToX`        | `[x1, x2]`        | Zoom to the given X domain range
`zoomToY`        | `[y1, y2]`        | Zoom to the given Y domain range
`resetZoom`      | `x`, `y`, or `xy` | Reset zoom in the specified orientation
