import Vue from 'vue';
import VueRouter from 'vue-router';
import RouterPrefetch from 'vue-router-prefetch';
import DashboardPlugin from './plugins/dashboard-plugin';
import App from './App.vue';

// router setup
import backend from './backend';
import router from './routes/router';
import './registerServiceWorker';
import CKEditor from '@ckeditor/ckeditor5-vue';
import VuePlyr from 'vue-plyr';
import NProgress from 'nprogress';
import VueMeta from 'vue-meta';
import * as Sentry from '@sentry/browser';
import * as Integrations from '@sentry/integrations';

Sentry.init({
  dsn: 'https://e46a63f841914aa59158d01f88e1cf85@sentry.io/1869694',
  integrations: [new Integrations.Vue({ Vue, attachProps: true })]
});

var VueScrollTo = require('vue-scrollto');

// plugin setup
Vue.use(RouterPrefetch);
Vue.use(VueRouter);
Vue.use(DashboardPlugin);
Vue.use(VueScrollTo);
Vue.use(CKEditor);
Vue.use(VuePlyr);
Vue.use(NProgress);
Vue.use(VueMeta);

// element ui language configuration
import lang from 'element-ui/lib/locale/lang/en';
import locale from 'element-ui/lib/locale';
locale.use(lang);

import 'src/assets/sass/black-dashboard-pro.scss';
import 'nprogress/nprogress.css';
import './assets/sass/nprogress.scss';

function start(data) {
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    render: h => h(App),
    router,
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
