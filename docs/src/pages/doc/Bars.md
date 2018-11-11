# Bars

`Bars` component represents a group of bars in `Cartesian` component. It should be added to the `default` slot in `Cartesian` component, which provies several required props, such as `scaleX`, `scaleY`,`width` and `height`.

The orientation of bars is determined by the two scales. If `scaleX` has numeric domain while `scaleY` has text domain, the bars will be horizontal. Otherwise, it will be vertical.

> Demo: [Bar Chart](#/gallery/bar-chart), [Brushing Bar Chart](#/gallery/brushing-bar-chart)

## Props

Name             | Type       | Default      | Required | Description
---------------- | ---------- | ------------ | -------- | -----------------------
`scaleX`         | Function   |              | true     | D3 scale object, usually set by its parent `Cartesian` component
`scaleY`         | Function   |              | true     | D3 scale object, usually set by its parent `Cartesian` component
`width`          | Number     |              | true     | The width of the charting area, usually set by its parent `Cartesian` component
`height`         | Number     |              | true     | The height of the charting area, usually set by its parent `Cartesian` component
`data`           | Array      | []           |          | The data for the bars (one element for each bar)
`x`              | String or Function | 'x'          |          | A Function to retrieve the X value from `data`. A String 'abc' is equivalent to Function `d => d['abc']`.
`y`              | String or Function | 'y'          |          | A Function to retrieve the Y value from `data`. A String 'abc' is equivalent to Function `d => d['abc']`.

## Slots

None

## Events

None

## Methods

None