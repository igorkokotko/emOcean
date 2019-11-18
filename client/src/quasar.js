import Vue from 'vue'

import './styles/quasar.styl'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/fontawesome-v5/fontawesome-v5.css'
import {
  Quasar,
  QLayout,
  QHeader,
  QFooter,
  QDrawer,
  QPageContainer,
  QPage,
  QToolbar,
  QToolbarTitle,
  QBtn,
  QIcon,
  QForm,
  QInput,
  QSelect,
  QAvatar,
  QList,
  QItem,
  QItemSection,
  QItemLabel,
  QSpinnerBars,
  QTooltip,
  Notify,
  QTabs,
  QTab,
  QRouteTab,
  QTabPanels,
  QTabPanel,
  QScrollArea,
  QSplitter,
  QCard,
  QCardSection,
  QCardActions
} from 'quasar'

Vue.use(Quasar, {
  config: {
  },
  components: {
    QLayout,
    QHeader,
    QFooter,
    QDrawer,
    QPageContainer,
    QPage,
    QToolbar,
    QToolbarTitle,
    QBtn,
    QIcon,
    QForm,
    QInput,
    QSelect,
    QAvatar,
    QList,
    QItem,
    QItemSection,
    QItemLabel,
    QSpinnerBars,
    QTooltip,
    Notify,
    QTabs,
    QTab,
    QRouteTab,
    QTabPanels,
    QTabPanel,
    QScrollArea,
    QSplitter,
    QCard,
    QCardSection,
    QCardActions
  },
  directives: {
  },
  plugins: {
    Notify
  }
})
