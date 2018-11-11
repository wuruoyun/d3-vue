# Axis

`Axis` component is the visual representation of scales. It is usually added to one of the margin slots in `Cartesian` component, which provides several required props, such as `scale`, `width` and `height` to the axis.

> Demo: [Area Chart](#/gallery/area-chart), [Bar Chart](#/gallery/bar-chart), [Line Chart](#/gallery/line-chart), [Scatter Plot](#/gallery/scatter-plot)

## Props

Name             | Type       | Default      | Required | Description
---------------- | ---------- | ------------ | -------- | -----------------------
`scale`          | Function   |              | true     | D3 scale object, usually set by its parent `Cartesian` component, based on which slot this axis is added to.
`width`          | Number     |              | true     | The width of the axis painting area, usually set by its parent `Cartesian` component, based on which slot this axis is added to.
`height`         | Number     |              | true     | The height of the axis painting area, usually set by its parent `Cartesian` component, based on which slot this axis is added to.
`orientation`    | String     | 'Bottom'     |          | Orientation of the ticks. Supported values: 'Bottom', 'Left', 'Right', 'Top'
`title`          | String     |              |          | Title of the axis, only valid if `orientation` is 'Bottom' or 'Left'
`titleLastTick`  | Boolean    | `false`      |          | Position the title at the last tick
`config`         | Function   |              |          | The D3 `axis` object created internally is passed to this function for further configuration.

## Slots

None

## Events

None

## Methods

None
