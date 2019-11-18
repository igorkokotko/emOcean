import Vue from 'vue'

import './styles/quasar.styl'
import '@quasar/extras/material-icons/material-icons.css'
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
  QSpace,
  QMenu,
  QSpinnerBars,
  QTooltip,
  QSelect,
  Notify
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
    QSpace,
    QMenu,
    QSpinnerBars,
    QTooltip,
    QSelect,
    Notify
  },
  directives: {
  },
  plugins: {
    Notify
  }
})
