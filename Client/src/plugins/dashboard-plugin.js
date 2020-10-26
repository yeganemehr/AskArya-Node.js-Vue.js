// Polyfills for js features used in the Dashboard but not supported in some browsers (mainly IE)
import 'src/polyfills';
import Notifications from 'src/components/NotificationPlugin';
import VeeValidate from 'vee-validate';
import GlobalComponents from './globalComponents';
import GlobalDirectives from './globalDirectives';
// import RTLPlugin from './RTLPlugin';

// Element ui language configuration
import lang from 'element-ui/lib/locale/lang/en';
import locale from 'element-ui/lib/locale';
locale.use(lang);

// asset imports
import 'src/assets/sass/black-dashboard-pro.scss';
import 'src/assets/css/nucleo-icons.css';
import 'src/assets/css/custom.css';
import 'src/assets/css/demo.css';

export default {
  install(Vue) {
    Vue.use(GlobalComponents);
    Vue.use(GlobalDirectives);
    // Vue.use(RTLPlugin);
    Vue.use(Notifications);
    Vue.use(VeeValidate, { fieldsBagName: 'veeFields' });
    Vue.use(require('jalali-moment'));
  },
};
