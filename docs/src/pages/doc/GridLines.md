# GridLines

`GridLines` component represents the grid lines in `Cartesian` component. It should be added to the `default` slot in `Cartesian` component, which provies several required props, such as `scaleX`, `scaleY`,`width` and `height`. Two of this components with different orientation can be added to the same `Cartesian` component to form crossing grid lines.

> Demo: [Grid Lines](#/gallery/grid-lines), [Candlestick chart](#/gallery/candle-stick)

## Props

Name             | Type       | Default      | Required | Description
---------------- | ---------- | ------------ | -------- | -----------------------
`scaleX`         | Function   |              | true     | D3 scale object, usually set by its parent `Cartesian` component
`scaleY`         | Function   |              | true     | D3 scale object, usually set by its parent `Cartesian` component
`width`          | Number     |              | true     | The width of the charting area, usually set by its parent `Cartesian` component
`height`         | Number     |              | true     | The height of the charting area, usually set by its parent `Cartesian` component
`orientation`    | String     | 'Horizontal' |          | The orientation of the grid lines
`option`         | Object     |              |          | Configuration, like `{ count: 5 }`

## Slots

None

## Events

None

## Methods

None