import 'vant/lib/index.css'
import { ImagePreview, DatetimePicker, Button, Field, Cell, CellGroup, Toast, Tabbar, TabbarItem, PullRefresh, List, Dialog } from 'vant'
export default {
  install (Vue) {
    Vue.use(Button)
      .use(Field)
      .use(Cell)
      .use(CellGroup)
      .use(Toast)
      .use(Tabbar)
      .use(TabbarItem)
      .use(PullRefresh)
      .use(List)
      .use(Dialog)
      .use(DatetimePicker)
      .use(ImagePreview)
  }
}
