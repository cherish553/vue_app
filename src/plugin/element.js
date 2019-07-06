import { Upload, Message, Checkbox, MessageBox, CheckboxGroup, Dialog, Input, Button, RadioGroup, Radio } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
export default {
  install (Vue) {
    Vue.use(Checkbox)
      .use(CheckboxGroup)
      .use(Dialog)
      .use(Input)
      .use(Button)
      .use(RadioGroup)
      .use(Radio)
      .use(Upload)
    Vue.prototype.$message = Message
    Vue.prototype.$prompt = MessageBox.prompt
  }
}
