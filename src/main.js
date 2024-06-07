import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import {createBootstrap} from 'bootstrap-vue-next'

import App from './App.vue'
import router from './router'
import VueSidebarMenu from 'vue-sidebar-menu'
import VueGoogleMaps from '@fawmi/vue-google-maps';

import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'

library.add(faUserSecret)

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueSidebarMenu)
app.use(createBootstrap({components: true, directives: true})) // Change this line

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(VueGoogleMaps, {
    load: {
      key: 'AIzaSyB98h_-EG9eFZxjlVeRJ2cD1yMH-v1KGqI',
    },
});

app.mount('#app')
