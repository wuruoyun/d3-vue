import Introduction from '../pages/gallery/Introduction.md'
import AreaChart from '../pages/gallery/AreaChart.md'
import BarChart from '../pages/gallery/BarChart.md'
import BrushAndZoom from '../pages/gallery/BrushAndZoom.md'
import BrushAndZoomII from '../pages/gallery/BrushAndZoomII.md'
import Choropleth from '../pages/gallery/Choropleth.md'
import CandleStick from '../pages/gallery/CandleStick.md'
import DensityContour from '../pages/gallery/DensityContour.md'
import GridLines from '../pages/gallery/GridLines.md'
import GroupedBars from '../pages/gallery/GroupedBars.md'
import LineChart from '../pages/gallery/LineChart.md'
import MissingData from '../pages/gallery/MissingData.md'
import PieChart from '../pages/gallery/PieChart.md'
import ScatterPlot from '../pages/gallery/ScatterPlot.md'
import StackedArea from '../pages/gallery/StackedArea.md'
import StackedBars from '../pages/gallery/StackedBars.md'
import Treemap from '../pages/gallery/Treemap.md'

export default [
  { path: 'introduction', component: Introduction },
  { path: 'area-chart', component: AreaChart },
  { path: 'bar-chart', component: BarChart },
  { path: 'brush-and-zoom', component: BrushAndZoom },
  { path: 'brush-and-zoom-ii', component: BrushAndZoomII },
  { path: 'candle-stick', component: CandleStick },
  { path: 'choropleth', component: Choropleth },
  { path: 'density-contour', component: DensityContour },
  { path: 'grid-lines', component: GridLines },
  { path: 'grouped-bars', component: GroupedBars },
  { path: 'line-chart', component: LineChart },
  { path: 'missing-data', component: MissingData },
  { path: 'pie-chart', component: PieChart },
  { path: 'scatter-plot', component: ScatterPlot },
  { path: 'stacked-area', component: StackedArea },
  { path: 'stacked-bars', component: StackedBars },
  { path: 'treemap', component: Treemap },
  { path: '', redirect: 'introduction' }
]
