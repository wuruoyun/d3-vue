# Quick Start

This library may be used directly if you find the components needs your needs. As the documentation is still a work in progress, you may directly refer to the demo codes in [gallery](/gallery) for reference.

Alternatively, you may use the components as example to build your own.

## Install

```bash
npm install d3 @wuruoyun/d3-vue --save
```

If you use `Country` component:

```bash
npm install topojson --save
```

## Use the library

```javascript
// main.js
import Vue from 'vue'
import * as d3v from '@wuruoyun/d3-vue'

Vue.use(d3v)
```

### No Conflict

All components will be installed with `d3` prefix by default, you can add any prefix 
to them to avoid conflicts with other libs if needed.

For example:

```javascript
Vue.use(d3v, { prefix: 'abc' })
```

Results in:

* Components such as `<d3-axis>` becomes `<abc-axis>`