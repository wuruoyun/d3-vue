import QuickStart from '../pages/doc/QuickStart.md'
import Area from '../pages/doc/Area.md'
import Axis from '../pages/doc/Axis.md'
import Cartesian from '../pages/doc/Cartesian.md'
import Line from '../pages/doc/Line.md'
import Points from '../pages/doc/Points.md'

export default [
  { path: 'quick-start', component: QuickStart },
  { path: 'area', component: Area },
  { path: 'axis', component: Axis },
  { path: 'cartesian', component: Cartesian },
  { path: 'line', component: Line },
  { path: 'points', component: Points },
  { path: '', redirect: 'quick-start' }
]
