import '@fortawesome/fontawesome-free/css/all.css'
import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'animate.css/animate.min.css'

Vue.use(Vuetify)

const opts = {
  theme: {
    themes: {
      light: {
        primary: '#009688',
        secondary: '#00bcd4',
        accent: '#2196f3',
        error: '#f44336',
        warning: '#ff5722',
        info: '#03a9f4',
        success: '#4caf50'
      }
    }
  }
}

export default new Vuetify(opts)
