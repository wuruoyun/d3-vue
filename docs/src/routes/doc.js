import QuickStart from '../pages/doc/QuickStart.md'
import Area from '../pages/doc/Area.md'
import Axis from '../pages/doc/Axis.md'
import Bars from '../pages/doc/Bars.md'
import Cartesian from '../pages/doc/Cartesian.md'
import GridLines from '../pages/doc/GridLines.md'
import Line from '../pages/doc/Line.md'
import Points from '../pages/doc/Points.md'
import Text from '../pages/doc/Text.md'

export default [
  { path: 'quick-start', component: QuickStart },
  { path: 'area', component: Area },
  { path: 'axis', component: Axis },
  { path: 'bars', component: Bars },
  { path: 'cartesian', component: Cartesian },
  { path: 'grid-lines', component: GridLines },
  { path: 'line', component: Line },
  { path: 'points', component: Points },
  { path: 'text', component: Text },
  { path: '', redirect: 'quick-start' }
]
