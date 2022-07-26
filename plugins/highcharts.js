import Vue from 'vue'
import HighchartsVue from 'highcharts-vue'
import Highcharts from 'highcharts'

Highcharts.setOptions({
  lang: {
    decimalPoint: '.',
    thousandsSep: ','
  }
})

Vue.use(HighchartsVue)
