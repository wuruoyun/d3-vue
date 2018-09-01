# Axis

Axis are usually added to one of the margin slots in `Cartesian`.

```html
<d3-cartesian :x="x" :y="y">
  <d3-axis slot="south" orientation="Bottom" slot-scope="props" v-bind="props"/>
  <d3-axis slot="west" orientation="Left" slot-scope="props" v-bind="props"/>
</d3-cartesian>
```

## Props

Name             | Type       | Default      | Required | Description
---------------- | ---------- | ------------ | -------- | -----------------------
`scale`          | Function   |              | true     | D3 scale object, usually set by its parent `Cartesian` component
`orientation`    | String     | 'Bottom'     | true     | Orientation of the ticks. Supported values: 'Bottom', 'Left', 'Right', 'Top'
`title`          | String     |              |          | Title of the axis
`width`          | Number     |              |          | The width of the axis painting area, usually set by its parent `Cartesian` component
`height`         | Number     |              |          | The height of the axis painting area, usually set by its parent `Cartesian` component
`options`        | Object     |              |          | Extra options for the axis

## Slots

None

## Events

None

## Methods

None
