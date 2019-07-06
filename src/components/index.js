import input from './cherish-input'
import commonTop from './cherish-common-top'
import top from './cherish-top'
import bottom from './cherish-bottom'
import bottomDialog from './cherish-bottom-dialog'
import modal from './cherish-modal'

const cherish = {
  install (Vue) {
    Vue.component('cherishInput', input)
    Vue.component('cherishCommonTop', commonTop)
    Vue.component('cherishBottom', bottom)
    Vue.component('cherishTop', top)
    Vue.component('cherishBottomDialog', bottomDialog)
    Vue.component('cherishModal', modal)
  }
}

export default cherish
