import QuickStart from './pages/QuickStart.md'
import ScatterPlot from './pages/ScatterPlot.md'
import LineChart from './pages/LineChart.md'
import BarChart from './pages/BarChart.md'

export default [
  { path: '/quick-start', component: QuickStart },
  { path: '/scatter-plot', component: ScatterPlot },
  { path: '/line-chart', component: LineChart },
  { path: '/bar-chart', component: BarChart },
  { path: '*', redirect: '/quick-start' }
]
