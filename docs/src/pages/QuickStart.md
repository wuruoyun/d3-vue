# Quick Start

This library may be used directly if you find the components needs your needs.

Alternatively, you may use the components as example to build your own.

## Install

```bash
npm install d3-vue --save
```

## Use the library

```javascript
// main.js
import Vue from 'vue'
import * as d3v from 'd3-vue'

Vue.use(d3v);
```

### No Conflict

All components will be installed with `d3` prefix by default, you can add any prefix 
to them to avoid conflicts with other libs if needed.

For example:

```javascript
Vue.use(d3v, { prefix: 'abc' });
```

Results in:

* Components such as `<d3-axis>` becomes `<abc-axis>`