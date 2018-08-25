import QuickStart from './pages/QuickStart.md'
import AreaChart from './pages/AreaChart.md'
import BarChart from './pages/BarChart.md'
import BrushAndZoom from './pages/BrushAndZoom.md'
import BrushAndZoomII from './pages/BrushAndZoomII.md'
import Choropleth from './pages/Choropleth.md'
import CandleStick from './pages/CandleStick.md'
import DensityContour from './pages/DensityContour.md'
import GridLines from './pages/GridLines.md'
import LineChart from './pages/LineChart.md'
import MissingData from './pages/MissingData.md'
import PieChart from './pages/PieChart.md'
import ScatterPlot from './pages/ScatterPlot.md'
import Treemap from './pages/Treemap.md'

export default [
  { path: '/quick-start', component: QuickStart },
  { path: '/area-chart', component: AreaChart },
  { path: '/bar-chart', component: BarChart },
  { path: '/brush-and-zoom', component: BrushAndZoom },
  { path: '/brush-and-zoom-ii', component: BrushAndZoomII },
  { path: '/candle-stick', component: CandleStick },
  { path: '/choropleth', component: Choropleth },
  { path: '/density-contour', component: DensityContour },
  { path: '/grid-lines', component: GridLines },
  { path: '/line-chart', component: LineChart },
  { path: '/missing-data', component: MissingData },
  { path: '/pie-chart', component: PieChart },
  { path: '/scatter-plot', component: ScatterPlot },
  { path: '/treemap', component: Treemap },
  { path: '*', redirect: '/quick-start' }
]
