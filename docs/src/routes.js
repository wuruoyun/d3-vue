import QuickStart from './pages/QuickStart.md'
import BarChart from './pages/BarChart.md'
import Choropleth from './pages/Choropleth.md'
import DensityContour from './pages/DensityContour.md'
import LineChart from './pages/LineChart.md'
import PieChart from './pages/PieChart.md'
import ScatterPlot from './pages/ScatterPlot.md'

export default [
  { path: '/quick-start', component: QuickStart },
  { path: '/bar-chart', component: BarChart },
  { path: '/choropleth', component: Choropleth },
  { path: '/density-contour', component: DensityContour },
  { path: '/line-chart', component: LineChart },
  { path: '/pie-chart', component: PieChart },
  { path: '/scatter-plot', component: ScatterPlot },
  { path: '*', redirect: '/quick-start' }
]
