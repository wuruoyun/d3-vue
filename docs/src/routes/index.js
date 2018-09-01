import GalleryPage from '../pages/GalleryPage.vue'
import DocPage from '../pages/DocPage.vue'
import galleryRoutes from './gallery'
import docRoutes from './doc'

export default [
  {
    path: '/gallery',
    component: GalleryPage,
    children: galleryRoutes
  }, {
    path: '/doc',
    component: DocPage,
    children: docRoutes
  }, {
    path: '*', redirect: '/doc'
  }
]
