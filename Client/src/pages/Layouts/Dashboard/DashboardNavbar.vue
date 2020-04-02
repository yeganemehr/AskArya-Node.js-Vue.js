<template>
  <base-nav
    v-model="showMenu"
    class="navbar-absolute top-navbar"
    type="custom"
    :transparent="true"
  >
    <ul class="navbar-nav">
      <!-- <a class="navbar-brand d-none d-md-block" href="/">اسک آریا</a> -->
      <base-dropdown
        tag="li"
        title-tag="a"
        class="nav-item"
        menu-classes="dropdown-navbar"
      >
        <a
          slot="title"
          href="#"
          class="dropdown-toggle nav-link"
          data-toggle="dropdown"
          aria-expanded="true"
        >
          <div class="row d-flex align-items-center d-lg-none">
            <!-- Home -->
            <li class="nav-link border-bottom d-none d-md-block">
              <router-link to="/home" class="nav-item dropdown-item"
                >خانه</router-link
              >
            </li>
            <li class="nav-item border-bottom d-md-none">
              <a class="nav-link" href="/home">خانه</a>
            </li>

            <!-- Dashboard -->
            <li class="nav-link border-bottom d-none d-md-block">
              <router-link to="/dashboard" class="nav-item dropdown-item"
                >پنل کاربری</router-link
              >
            </li>
            <li class="nav-item border-bottom d-md-none">
              <a class="nav-link" href="/dashboard">پنل کاربری</a>
            </li>

            <!-- Our Courses -->
            <li class="nav-link border-bottom d-none d-md-block">
              <router-link to="/courses" class="nav-item dropdown-item"
                >دوره های آموزشی</router-link
              >
            </li>
            <li class="nav-item border-bottom d-md-none">
              <a class="nav-link" href="/courses">دوره های آموزشی</a>
            </li>

            <!-- My Courses -->
            <li class="nav-link border-bottom d-none d-md-block">
              <router-link to="/mycourses" class="nav-item dropdown-item"
                >در حال یادگیری</router-link
              >
            </li>
            <li class="nav-item border-bottom d-md-none">
              <a class="nav-link" href="/mycourses">در حال یادگیری</a>
            </li>

            <!-- Tickets -->
            <li class="nav-link border-bottom d-none d-md-block">
              <router-link to="/tickets" class="nav-item dropdown-item"
                >پشتیبانی</router-link
              >
            </li>
            <li class="nav-item border-bottom d-md-none">
              <a class="nav-link" href="/tickets">پشتیبانی</a>
            </li>

            <!-- Admin Page -->
            <li v-if="isAdmin" class="nav-link border-bottom d-none d-md-block">
              <router-link to="/managementpage" class="nav-item dropdown-item"
                >پنل مدیریت</router-link
              >
            </li>
            <li v-if="isAdmin" class="nav-item border-bottom d-md-none">
              <a class="nav-link" href="/managementpage">پنل مدیریت</a>
            </li>

            <!-- LOGOUT BUTTON -->
            <li class="logout-button text-right">
              <router-link to="#" @click.native="logoutListener"
                >خروج</router-link
              >
            </li>
          </div>
        </a>
      </base-dropdown>
    </ul>
  </base-nav>
</template>
<script>
import { BaseNav } from '@/components';
import backend from '../../../backend';

export default {
  components: {
    BaseNav,
  },
  data() {
    return {
      showMenu: false,
      activeNotifications: false,
      searchModalVisible: false,
      searchQuery: '',
    };
  },
  computed: {
    isAdmin() {
      return this.$root.$data.user && this.$root.$data.user.admin;
    },
  },
  methods: {
    toggleNavbar() {
      document.body.classList.toggle('nav-open');
      this.showMenu = !this.showMenu;
    },
    closeMenu() {
      document.body.classList.remove('nav-open');
      this.showMenu = false;
    },
    toggleNotificationDropDown() {
      this.activeNotifications = !this.activeNotifications;
    },
    closeDropDown() {
      this.activeNotifications = false;
    },

    // toggleMenu() {
    //   this.showMenu = !this.showMenu;
    // },
    // closeMenu() {
    //   document.body.classList.remove('nav-open');
    //   this.showMenu = false;
    // },
    logoutListener(e) {
      e.preventDefault();
      backend.get('logout').then((response) => {
        if (response.data.status !== 'success') {
          return this.$notify({
            type: 'danger',
            message: 'درخواست شما توسط سرور رد شد',
          });
        }
        // cookie.removeItem('session_askarya');
        // cookie.removeItem('remember_token');
        localStorage.removeItem('remember_token');
        window.location.href = '/';
      });
    },
    beforeDestroy() {
      this.closeMenu();
    },
    beforeRouteUpdate(to, from, next) {
      // Close the mobile menu first then transition to next page
      if (this.showMenu) {
        this.closeMenu();
        setTimeout(() => {
          next();
        }, this.menuTransitionDuration);
      } else {
        next();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.navbar-nav li a {
  font-size: 1em !important;
  color: #000 !important;
  font-size: 1.15em !important;
  text-align: right !important;
}

.navbar-collapse .navbar-nav .nav-link a {
  padding: 0.9em 0 !important;
}

.navbar-nav li {
  color: rgb(29, 29, 29) !important;
  width: 100% !important;
}

.border-bottom {
  border-bottom: 1px solid #c7c7c765 !important;
}

.logout-button {
  padding-top: 1em !important;
  padding-bottom: 1em !important;
  font-family: IranSansBold !important;
}

.navbar .navbar-brand {
  color: #000 !important;
  font-family: IranSansBold !important;
}

.dropdown-item.active {
  color: rgb(255, 0, 98) !important;
  font-family: IranSansBold !important;
  text-decoration: none !important;
  background-color: transparent !important;
}

.dropdown-item:hover,
.dropdown-item:focus {
  background-color: transparent !important;
}

.rtl .dropdown-toggle:after {
  margin-right: 0.255em !important;
  margin-left: 0 !important;
  display: none !important;
}

///////////////////////////

.top-navbar {
  top: 0px !important;
}

.dropdown-menu {
  &.dropdown-navbar {
    &::before {
      left: 29px !important;
      right: auto !important;
    }
    .dropdown-item {
      color: #9a9a9a !important;
      background-color: transparent !important;
    }
  }
}
</style>
