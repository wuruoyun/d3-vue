# Line

`Line` component represents a single line in `Cartesian` component. It should be added to the `default` slot in `Cartesian` component, which provies several required props, such as `scaleX`, `scaleY`,`width` and `height`. Multiple of this components can be added to the same `Cartesian` component to form multi-line chart.

> Demo: [Line Chart](/gallery/LineChart), [Grid Lines](/gallery/GridLines), [Missing Data](/gallery/MissingData)

## Props

Name             | Type       | Default      | Required | Description
---------------- | ---------- | ------------ | -------- | -----------------------
`scaleX`         | Function   |              | true     | D3 scale object, usually set by its parent `Cartesian` component
`scaleY`         | Function   |              | true     | D3 scale object, usually set by its parent `Cartesian` component
`width`          | Number     |              | true     | The width of the charting area, usually set by its parent `Cartesian` component
`height`         | Number     |              | true     | The height of the charting area, usually set by its parent `Cartesian` component
`data`           | Array      | []           |          | The data that defines the X and Y values for the points on the line (one element for each point)
`x`              | String or Function | 'x'          |          | A Function to retrieve the X value from `data`. A String 'abc' is equivalent to Function `d => d['abc']`.
`y`              | String or Function | 'y'          |          | A Function to retrieve the Y upper value from `data`. A String 'abc' is equivalent to Function `d => d['abc']`.
`color`          | String     | 'steelblue'  |          | Color of the line
`curveFn`        | Function   |              |          | D3 curve function, such as `d3.curveMonotoneX`
`definedFn`      | Function   |              |          | A function that takes an element from `data` and returns `true` if the data element should be included and `false` otherwise.

## Slots

None

## Events

None

## Methods

None