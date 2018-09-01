import QuickStart from '../pages/doc/QuickStart.md'
import Axis from '../pages/doc/Axis.md'
import Cartesian from '../pages/doc/Cartesian.md'

export default [
  { path: 'quick-start', component: QuickStart },
  { path: 'axis', component: Axis },
  { path: 'cartesian', component: Cartesian },
  { path: '', redirect: 'quick-start' }
]
