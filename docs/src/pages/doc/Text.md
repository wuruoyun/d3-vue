# Text

`Text` component represents a singe line text in `Cartesian` component. It should be added to the `default` slot or any of the margin slots in `Cartesian` component as title or ad hoc labels. Multiple of this components can be added to the same `Cartesian` component.

> Demo: [Line Chart](#/gallery/line-chart)

## Props

Name             | Type       | Default      | Required | Description
---------------- | ---------- | ------------ | -------- | -----------------------
`x`              | Number     | 20           |          | X position of the text anchor
`y`              | Number     | 20           |          | Y position of the text anchor
`dx`             | Number     |              |          | Delta X position of the text anchor
`dy`             | Number     |              |          | Delta Y position of the text anchor
`rotate`         | Number     |              |          | Rotate angle of the text line
`color`          | String     | 'black'      |          | Color of the text


## Slots

Slot             | Slot Props       | Description
---------------- | ---------------- | -----------------------
`default`        |                  | The text content


## Events

None

## Methods

None