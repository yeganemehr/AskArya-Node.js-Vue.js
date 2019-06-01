import Vue from 'vue';
import DashboardPlugin from './plugins/dashboard-plugin';
import App from './App.vue';

// router setup
import router from './routes/router';
import CKEditor from '@ckeditor/ckeditor5-vue';
import backend from './backend';
import VuePlyr from 'vue-plyr';
import VueParticles from 'vue-particles';
import NProgress from 'nprogress';

// plugin setup
Vue.use(DashboardPlugin);
Vue.use(CKEditor);
Vue.use(VueParticles);
Vue.use(VuePlyr);
Vue.use(NProgress);

import 'vue-plyr/dist/vue-plyr.css';
import 'nprogress/nprogress.css';
import './assets/sass/nprogress.scss';

import store from './store';

function start(data) {
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    render: h => h(App),
    router,
    store,
    data
  });
}
backend
  .get('/home')
  .then(response => {
    start({
      user: response.data.user,
      topCourses: response.data.topCourses,
      topPosts: response.data.topPosts,
      seconds: response.data.seconds,
      courses: response.data.courses,
      episodes: response.data.episodes,
    });
  })
  .catch(() => {
    start({
      user: undefined
    });
  });
