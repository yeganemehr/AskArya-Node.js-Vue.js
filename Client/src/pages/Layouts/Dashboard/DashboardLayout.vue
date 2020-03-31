<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <div class="container text-right">
      <notifications></notifications>
    </div>
    <side-bar :background-color="sidebarBackground">
      <template slot="links">
        <sidebar-item
          :link="{
            name: 'پنل کاربری',
            icon: 'far fa-user',
            path: '/dashboard',
          }"
        ></sidebar-item>
        <sidebar-item
          :link="{
            name: 'همه دوره‌ها',
            path: '/courses',
            icon: 'fas fa-university',
          }"
        ></sidebar-item>
        <sidebar-item
          :link="{
            name: 'در حال یادگیری',
            path: '/mycourses',
            icon: 'fas fa-graduation-cap',
          }"
        ></sidebar-item>

        <sidebar-item
          :link="{ name: 'پشتیبانی', path: '/tickets', icon: 'fas fa-headset' }"
        ></sidebar-item>

        <sidebar-item
          v-if="isAdmin"
          :link="{
            name: 'پنل مدیریت',
            path: '/managementpage',
            icon: 'fas fa-tools',
          }"
        ></sidebar-item>

        <hr class="line mt-4" />

        <div class="pr-4 text-right d-flex align-items-center">
          <i class="fas fa-power-off"></i>
          <router-link
            class="nav-item dropdown-item exitButton"
            to="#"
            @click.native="logoutListener"
            >خروج</router-link
          >
        </div>
      </template>
    </side-bar>
    <div class="main-panel" :data="sidebarBackground">
      <dashboard-navbar></dashboard-navbar>
      <router-view name="header"></router-view>
      <div
        :class="{ content: !$route.meta.hideContent }"
        @click="toggleSidebar"
      >
        <zoom-center-transition :duration="200" mode="out-in">
          <!-- your content here -->
          <router-view></router-view>
        </zoom-center-transition>
      </div>
      <content-footer v-if="!$route.meta.hideFooter"></content-footer>
    </div>
  </div>
</template>

<script>
import backend from '../../../backend';
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';
import DashboardNavbar from './DashboardNavbar.vue';
import ContentFooter from './ContentFooter.vue';
import { ZoomCenterTransition } from 'vue2-transitions';

function hasElement(className) {
  return document.getElementsByClassName(className).length > 0;
}

function initScrollbar(className) {
  if (hasElement(className)) {
    new PerfectScrollbar(`.${className}`);
  } else {
    // try to init it later in case this component is loaded async
    setTimeout(() => {
      initScrollbar(className);
    }, 100);
  }
}

export default {
  components: {
    DashboardNavbar,
    ContentFooter,
    ZoomCenterTransition,
  },
  data() {
    return {
      sidebarBackground: 'red', //vue|blue|orange|green|red|primary
    };
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
    initScrollbar() {
      let docClasses = document.body.classList;
      let isWindows = navigator.platform.startsWith('Win');
      if (isWindows) {
        // if we are on windows OS we activate the perfectScrollbar function
        initScrollbar('sidebar');
        initScrollbar('sidebar-wrapper');

        docClasses.add('perfect-scrollbar-on');
      } else {
        docClasses.add('perfect-scrollbar-off');
      }
    },
    logoutListener(e) {
      e.preventDefault();
      backend.get('logout').then((response) => {
        if (response.data.status !== 'success') {
          return this.$notify({
            type: 'danger',
            message: 'درخواست شما توسط سرور رد شد',
          });
        }
        localStorage.removeItem('remember_token');
        window.location.href = '/';
      });
    },
  },
  computed: {
    isAdmin() {
      return this.$root.$data.user && this.$root.$data.user.admin;
    },
  },

  metaInfo: {
    title: 'پنل کاربری | سبک آموزشی ما متناسب با استاندارهای اروپا میباشد.',
    titleTemplate:
      'پنل کاربری | سبک آموزشی ما متناسب با استاندارهای اروپا میباشد.',
    htmlAttrs: {
      lang: 'fa',
      amp: true,
    },

    meta: [
      // OpenGraph data (Most widely used)
      { property: 'og:title', content: 'اسک آریا' },
      { property: 'og:site_name', content: 'اسک آریا' },
      { property: 'og:type', content: 'website' },
      {
        property: 'og:url',
        content: 'https://www.ask-arya.com/',
      },
      {
        property: 'og:image',
        content:
          'https://www.ask-arya.com/img/Ask Arya LOGO 2019 - 200x200 - OPT.png',
      },
      {
        property: 'og:description',
        content:
          'ما از سريع ترین روش و متد آموزشی استفاده میکنیم که با استانداردهای آموزشی اروپا طراحی شده، تا یادگیری برای شما آسانتر و موثر تر واقع شود.',
      },
      { itemprop: 'name', content: 'اسک آریا' },
      {
        itemprop: 'description',
        content:
          'ما از سريع ترین روش و متد آموزشی استفاده میکنیم که با استانداردهای آموزشی اروپا طراحی شده، تا یادگیری برای شما آسانتر و موثر تر واقع شود.',
      },
    ],
    link: [{ rel: 'canonical', href: 'https://www.ask-arya.com/' }],
  },
};
</script>

<style lang="scss" scoped>
.exitButton {
  font-size: 1em;
  color: #fff !important;
  padding: 0 !important;
  margin: 0 !important;

  .fas {
    color: #fff !important;
  }
}

.line {
  border-top: 1px solid rgba(255, 255, 255, 0.178) !important;
}

.content {
  background-color: #f5f8fa !important;
  min-height: 80vh !important;
}
.sidebar
  .nav
  li.active
  > a[data-toggle='collapse']
  + div
  .nav
  .active
  a
  .sidebar-normal {
  font-family: IranSansBold !important;
  font-size: 1rem !important;
  color: white !important;
}

.rtl .sidebar .nav a {
  font-size: 1rem !important;
  color: rgba(255, 255, 255, 0.8) !important;
  font-family: IranSans !important;
}

.sidebar .nav li.active > a:not([data-toggle='collapse']) p {
  font-size: 1.2rem !important;
  font-family: IranSansBold !important;
}

.dropdown-item:hover,
.dropdown-item:active {
  background-color: transparent !important;
}

$scaleSize: 0.95;
@keyframes zoomIn95 {
  from {
    opacity: 0 !important;
    transform: scale3d($scaleSize, $scaleSize, $scaleSize);
  }
  to {
    opacity: 1 !important;
  }
}

.main-panel .zoomIn {
  animation-name: zoomIn95 !important;
}

@keyframes zoomOut95 {
  from {
    opacity: 1 !important;
  }
  to {
    opacity: 0;
    transform: scale3d($scaleSize, $scaleSize, $scaleSize) !important;
  }
}

.main-panel .zoomOut {
  animation-name: zoomOut95 !important;
}
</style>
