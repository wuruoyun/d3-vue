# Points

`Points` component represents a group of points in `Cartesian` component. It should be added to the `default` slot in `Cartesian` component, which provies several required props, such as `scaleX`, `scaleY`,`width` and `height`.

> Demo: [Scatter Plot](#/gallery/scatter-plot), [Brush & Zoom II](#/gallery/brush-and-zoom-ii), [Missing Data](#/gallery/missing-data)

## Props

Name             | Type       | Default      | Required | Description
---------------- | ---------- | ------------ | -------- | -----------------------
`scaleX`         | Function   |              | true     | D3 scale object, usually set by its parent `Cartesian` component
`scaleY`         | Function   |              | true     | D3 scale object, usually set by its parent `Cartesian` component
`width`          | Number     |              | true     | The width of the axis painting area, usually set by its parent `Cartesian` component
`height`         | Number     |              | true     | The height of the axis painting area, usually set by its parent `Cartesian` component
`data`           | Array      | []           |          | The data for the area
`x`              | String or Function | 'x'          |          | A Function to retrieve the X value from `data`. A String 'abc' is equivalent to Function `d => d['abc']`.
`y`              | String or Function | 'y'          |          | A Function to retrieve the Y value from `data`. A String 'abc' is equivalent to Function `d => d['abc']`.
`color`          | String or Function | 'steelblue'  |          | A Function to retrieve the color of individual point. A String 'abc' is equivalent to Function `d => 'abc'`.
`size`           | Number     | `5`          |          | The size of points
`animated`       | Boolean    | `false`      |          | Whether the points are animated

## Slots

None

## Events

None

## Methods

None