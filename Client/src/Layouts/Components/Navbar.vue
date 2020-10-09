<template>
  <base-nav
    v-model="showMenu"
    type="custom"
    :transparent="false"
    menu-classes
    class="auth-navbar sticky-top"
  >
    <div slot="brand" class="navbar-wrapper">
      <router-link to="/" class="d-none d-md-block">
        <img src="/img/askarya-logo.png" width="110" alt="Ask Arya Logo" />
      </router-link>

      <a href="/home" class="d-md-none">
        <img src="/img/askarya-logo.png" width="110" alt="Ask Arya Logo" />
      </a>
    </div>
    <ul class="navbar-nav">
      <!-- Home -->
      <router-link class="nav-item d-none d-md-block" tag="li" to="/">
        <a :class="getNavClass('home')">{{ 'خانه' }}</a>
      </router-link>

      <li class="nav-item d-md-none">
        <a class="nav-link" href="/">خانه</a>
      </li>

      <!-- Courses -->
      <router-link class="nav-item d-none d-md-block" tag="li" to="/courses">
        <a :class="getNavClass('courses')">{{ 'دوره‌ های غیر حضوری' }}</a>
      </router-link>
      <li class="nav-item d-md-none">
        <a class="nav-link" href="/courses">دوره‌ های غیر حضوری</a>
      </li>

      <!-- Private Classes -->
      <router-link
        class="nav-item d-none d-md-block"
        tag="li"
        to="/privateclasses"
      >
        <a :class="getNavClass('privateclasses')">{{ 'کلاس های حضوری' }}</a>
      </router-link>
      <li class="nav-item d-md-none">
        <a class="nav-link" href="/privateclasses">کلاس های حضوری</a>
      </li>

      <!-- Contact Us -->
      <router-link class="nav-item d-none d-md-block" tag="li" to="/contact">
        <a :class="getNavClass('contact')">{{ 'تماس با ما' }}</a>
      </router-link>
      <li class="nav-item d-md-none">
        <a class="nav-link" href="/contact">تماس با ما</a>
      </li>

      <!-- Dashboard -->
      <li v-if="this.$root.$data.user !== undefined" class="nav-item d-md-none">
        <a class="nav-link" href="/dashboard">
          <img class="photo ml-2" :src="userAvatar" />
          پروفایل من</a
        >
      </li>

      <!-- Ticket Support -->
      <li class="nav-item d-md-none">
        <a
          v-if="this.$root.$data.user !== undefined && !isAdmin"
          class="nav-link"
          href="/tickets"
        >
          <i class="fas fa-headset ml-2"></i>
          پشتیبانی</a
        >

        <a
          v-if="this.$root.$data.user !== undefined && isAdmin"
          class="nav-link"
          href="/ticketoverview"
        >
          <i class="fas fa-headset ml-2"></i>
          پشتیبانی</a
        >
      </li>

      <li v-if="isAdmin" class="nav-item d-md-none">
        <a class="nav-link" href="/managementpage">
          <i class="fas fa-tools ml-2"></i>
          پنل مدیریت
        </a>
      </li>

      <li v-if="this.$root.$data.user !== undefined" class="nav-item d-md-none">
        <router-link class="nav-link" to="#" @click.native="logoutListener">
          <i class="fas fa-sign-out-alt ml-2"></i>
          خروج
        </router-link>
      </li>
    </ul>

    <ul class="navbar-nav mr-auto d-none d-md-block ipad-fix dropdown-box">
      <div class="row">
        <div v-if="this.$root.$data.user !== undefined">
          <div class="row">
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
                <div class="user-item d-none d-md-block">
                  <div class="row pl-4">
                    <div class="photo avatar">
                      <img :src="userAvatar" />
                    </div>
                    <div
                      class="d-flex align-items-center pr-3 profile-link-text"
                    >
                      <p class="px-1">پروفایل من</p>
                      <i class="i-chevron fas fa-chevron-down"></i>
                    </div>
                  </div>
                </div>
              </a>

              <li class="nav-link px-2">
                <router-link to="/dashboard" class="nav-item dropdown-item">
                  <i class="far fa-user pl-2"></i>
                  پنل کاربری
                </router-link>
              </li>

              <li class="nav-link">
                <router-link to="/courses" class="nav-item dropdown-item">
                  <i class="fas fa-university pl-2"></i>
                  دوره های آموزشی
                </router-link>
              </li>

              <li class="nav-link">
                <router-link
                  v-if="isAdmin"
                  to="/ticketoverview"
                  class="nav-item dropdown-item"
                >
                  <i class="fas fa-headset pl-2"></i>
                  پشتیبانی
                </router-link>

                <router-link
                  v-else
                  to="/tickets"
                  class="nav-item dropdown-item"
                >
                  <i class="fas fa-headset pl-2"></i>
                  پشتیبانی
                </router-link>
              </li>

              <li v-if="isAdmin" class="nav-link">
                <router-link
                  to="/managementpage"
                  class="nav-item dropdown-item"
                >
                  <i class="fas fa-tools pl-2"></i>
                  پنل مدیریت
                </router-link>
              </li>

              <li class="nav-link nav-link-exit">
                <router-link
                  class="nav-item dropdown-item"
                  to="#"
                  @click.native="logoutListener"
                >
                  <i class="fas fa-sign-out-alt pl-2"></i>
                  خروج
                </router-link>
              </li>
            </base-dropdown>
          </div>
        </div>
        <div class="row login-register-buttons" v-else>
          <!-- Register Button -->
          <div class="auth-button-mobile">
            <router-link class="d-none d-md-block" to="/register">
              <base-button
                native-type="submit"
                type="danger"
                class="btn-simple btn btn-signin"
                >ثبت نام</base-button
              >
            </router-link>
            <a class="d-md-none" href="/register">
              <base-button
                native-type="submit"
                type="warning"
                class="btn-simple btn btn-signin"
              >
                <i class="far fa-user ml-2"></i>
                ثبت نام</base-button
              >
            </a>
          </div>

          <!-- Login Button -->
          <div class="auth-button-mobile">
            <router-link to="/login" class="d-none d-md-block">
              <base-button
                native-type="submit"
                type="info"
                class="btn-simple btn"
                >ورود کاربر</base-button
              >
            </router-link>
            <a class="d-md-none" href="/login">
              <base-button
                native-type="submit"
                type="info"
                class="btn-simple btn"
                >ورود کاربر</base-button
              >
            </a>
          </div>
        </div>
      </div>
    </ul>
  </base-nav>
</template>

<script>
// import { CollapseTransition } from 'vue2-transitions';
import { BaseNav } from 'src/components';

import backend from '../../backend';

export default {
  components: {
    // CollapseTransition,
    BaseNav,
  },
  computed: {
    title() {
      return `${this.$route.name} Page`;
    },
    userAvatar() {
      return (
        (this.$root.$data.user ? this.$root.$data.user.avatar : undefined) ||
        '/img/default-avatar.png'
      );
    },
    isAdmin() {
      return this.$root.$data.user && this.$root.$data.user.admin;
    },
  },
  data() {
    return {
      showMenu: false,
      menuTransitionDuration: 250,
      pageTransitionDuration: 200,
    };
  },
  methods: {
    getNavClass(nav) {
      let classes = 'nav-link';
      let isActive = false;
      switch (nav) {
        case 'home':
          isActive = this.$route.name == 'Home';
          break;
        case 'privateclasses':
          isActive = this.$route.name == 'PrivateClasses';
          break;
        case 'courses':
          isActive = this.$route.name == 'Courses';
          break;
        case 'contact':
          isActive = this.$route.name == 'Contact';
          break;
        case 'profile':
          isActive = this.$route.name == 'Profile';
          break;
      }
      if (isActive) {
        classes += ' text-custom';
      }
      return classes;
    },
    toggleNavbar() {
      document.body.classList.toggle('nav-open');
      this.showMenu = !this.showMenu;
    },
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
    closeMenu() {
      document.body.classList.remove('nav-open');
      this.showMenu = false;
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
};
</script>

<style scoped lang="scss">
.text-custom {
  color: #ef476f !important;
  font-size: 0.95em !important;
  font-family: IranSansBold !important;
}

.dropdown-menu .dropdown-item:hover {
  color: #a053ee !important;
}

.dropdown-box {
  padding-left: 3.5rem !important;
}

.navbar-collapse .navbar-nav .nav-link {
  color: #000;
  padding-left: 0 !important;
  padding-right: 0 !important;
}
.dropdown-item.active {
  color: #ef476f !important;
  background-color: transparent !important;
}
.user-item {
  padding-right: 2em !important;
}
.dropdown-toggle[aria-expanded='true']:after {
  display: none !important;
}

.dropdown-toggle[aria-expanded='true']:after {
  display: none !important;
}
.profile-link-text {
  p,
  .fas {
    font-size: 0.95em !important;
    color: rgb(20, 20, 20) !important;
  }
}
.navbar-nav li i {
  font-size: 1em !important;
  margin-right: 10px !important;
  margin-left: 4px !important;
  align-content: right !important;
}
.i-custom {
  margin-right: 8px !important;
}
.i-chevron {
  margin-right: 3px !important;
}
.navbar-nav li {
  font-size: 1.2em !important;
}

.nav-item,
.dropdown-item {
  background: transparent !important;
}

.navbar-nav li a {
  padding: 10px 0 10px 10px !important;
  font-size: 0.95em;
}
.navbar-collapse .navbar-nav .nav-link .dropdown-item {
  font-size: 0.95em !important;
}

.btn-signin {
  color: #ef476f;
  border: 1px solid #ef476f !important;
}

.btn {
  font-weight: inherit !important;
}
p,
.copyright {
  font-size: 0.85rem !important;
}
.content-custom {
  background-color: #ffffff !important;
  background-attachment: fixed !important;
}
.usertitle {
  color: #0f7bf7 !important;
  font-size: 1.1rem !important;
  font-family: IranSansBold !important;
}
.navbar-collapse .navbar-nav .nav-link .dropdown-item {
  font-size: 0.85em !important;
  border-bottom: 1px solid #fcfcfc !important;
}

.dropdown-menu .dropdown-item {
  color: black;
}

.navbar-collapse .navbar-nav .nav-link .dropdown-item:hover {
  color: #ef476f !important;
}

.navbar-collapse .navbar-nav .nav-link-exit .dropdown-item {
  color: rgb(49, 49, 49) !important;
  border-bottom: 1px solid #fcfcfc00 !important;
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
  font-size: 1.1rem !important;
  color: white !important;
}
.navbar.auth-navbar {
  top: 0 !important;
  background-color: #fff !important;
  font-family: IranSans !important;
}

@media (max-width: 768px) {
  .navbar-nav {
    font-size: 1.08rem !important;
    color: #fff !important;
    padding: 24px 0 0 0 !important;
  }
  .navbar-nav li {
    padding: 4px 0 !important;
    border-bottom: 1px solid #e4e4e463 !important;
    font-size: 1.05em !important;
  }

  li:last-child {
    border-bottom: 1px solid #e4e4e400 !important;
  }

  .login-register-buttons {
    padding-bottom: 7px !important;
  }

  .auth-button-mobile {
    font-size: 1em !important;
    padding-right: 1em !important;
  }
}

@media (min-width: 768px) {
  .navbar-nav {
    float: none !important;
  }
}

@media only screen and (min-width: 1150px) {
  .navbar-nav li {
    font-size: 1.2em !important;
    padding: 0 20px !important;
  }
}
</style>
