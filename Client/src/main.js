import Vue from 'vue';
import DashboardPlugin from './plugins/dashboard-plugin';
import App from './App.vue';

// router setup
import backend from './backend';
import router from './routes/router';
import CKEditor from '@ckeditor/ckeditor5-vue';
import VuePlyr from 'vue-plyr';
import NProgress from 'nprogress';
import VueMeta from 'vue-meta';
var VueScrollTo = require('vue-scrollto');
// import ElementUI from 'element-ui';
// import '@fortawesome/fontawesome-free/css/all.css';
// import '@fortawesome/fontawesome-free/js/all.js';

// plugin setup
Vue.use(DashboardPlugin);
Vue.use(VueScrollTo);
Vue.use(CKEditor);
Vue.use(VuePlyr);
Vue.use(NProgress);
Vue.use(VueMeta);

// Vue.use(ElementUI);

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
      episodes: response.data.episodes
    });
  })
  .catch(() => {
    start({
      user: undefined
    });
  });
