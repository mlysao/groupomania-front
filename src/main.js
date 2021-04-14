import Vue from 'vue'
import App from './App.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import http from './http'
import router from './router'
import moment from 'moment'

Vue.config.productionTip = false
Vue.prototype.$http = http

Vue.filter('formatDate', function(value) {
    if (value) {
        return moment(String(value)).format('DD/MM/YYYY [à] hh:mm')
    }
})

Vue.filter('duration', function (value) {
    if (value) {
        const start = moment.now();
        const end = moment(value);
        if (end.diff(start, 'days') === 0) {
            return "NEW"
        }
    }
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
