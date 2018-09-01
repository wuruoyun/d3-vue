import QuickStart from '../pages/doc/QuickStart.md'
import Cartesian from '../pages/doc/Cartesian.md'

export default [
  { path: 'quick-start', component: QuickStart },
  { path: 'cartesian', component: Cartesian },
  { path: '', redirect: 'quick-start' }
]
