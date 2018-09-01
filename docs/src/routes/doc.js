import QuickStart from '../pages/doc/QuickStart.md'
import Area from '../pages/doc/Area.md'
import Axis from '../pages/doc/Axis.md'
import Cartesian from '../pages/doc/Cartesian.md'
import Line from '../pages/doc/Line.md'

export default [
  { path: 'quick-start', component: QuickStart },
  { path: 'area', component: Area },
  { path: 'axis', component: Axis },
  { path: 'cartesian', component: Cartesian },
  { path: 'line', component: Line },
  { path: '', redirect: 'quick-start' }
]
