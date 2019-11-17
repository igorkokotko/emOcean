import Vue from 'vue'

import './styles/quasar.styl'
import '@quasar/extras/material-icons/material-icons.css'
import {
  Quasar,
  QLayout,
  QHeader,
  QDrawer,
  QPageContainer,
  QPage,
  QToolbar,
  QToolbarTitle,
  QBtn,
  QIcon,
  QInput,
  QSelect,
  QAvatar,
  QList,
  QItem,
  QItemSection,
  QItemLabel,
  QForm,
  Notify
} from 'quasar'

Vue.use(Quasar, {
  config: {},
  components: {
    QLayout,
    QHeader,
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
    QItemLabel
  },
  directives: {
  },
  plugins: {
    Notify
  }
})
