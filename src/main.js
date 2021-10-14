import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css';
import {
  Button, Card, Form, FormItem, Input, Select, Option, Switch, Tabs, TabPane, Radio, RadioGroup, RadioButton,
} from "element-ui"

Vue.config.productionTip = false
Vue.use(Button);
Vue.use(Card);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Option);
Vue.use(Input);
Vue.use(Select);
Vue.use(Switch);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(RadioButton);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
