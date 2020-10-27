<template>
  <b-navbar sticky="true" toggleable="lg" type="light">
    <b-navbar-brand class="mr-3" to="/">
      <img src="/img/askarya-logo.png" width="100" alt="Ask Arya Logo" />
    </b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item exact active-class="text-custom" to="/">خانه</b-nav-item>
        <hr />

        <b-nav-item active-class="text-custom" to="/courses"
          >دوره‌ های غیر حضوری</b-nav-item
        >

        <hr />
        <b-nav-item active-class="text-custom" to="/privateclasses"
          >کلاس های حضوری</b-nav-item
        >

        <hr />

        <b-nav-item active-class="text-custom" to="/contact"
          >تماس با ما</b-nav-item
        >

        <b-button
          v-if="!this.$root.$data.user"
          block
          class="btn-login-mobile my-3 d-lg-none"
          type="submit"
          href="/login"
        >
          <i class="far fa-user pl-2"></i>
          ورود کاربر</b-button
        >

        <div v-if="this.$root.$data.user !== undefined">
          <b-nav-item
            active-class="text-custom"
            to="/dashboard"
            class="mr-4 d-lg-none"
            ><i class="far fa-user pl-3"></i> پنل کاربری</b-nav-item
          >

          <b-nav-item
            active-class="text-custom"
            to="/courses"
            class="mr-4 d-lg-none"
            ><i class="fas fa-university pl-3"></i> دوره های آموزشی</b-nav-item
          >

          <b-nav-item
            active-class="text-custom"
            v-if="isAdmin"
            to="/ticketoverview"
            class="mr-4 d-lg-none"
          >
            <i class="fas fa-headset pl-3"></i> پشتیبانی</b-nav-item
          >

          <b-nav-item
            active-class="text-custom"
            v-else
            to="/tickets"
            class="mr-4 d-lg-none"
          >
            <i class="fas fa-headset pl-3"></i>
            پشتیبانی</b-nav-item
          >

          <b-nav-item
            active-class="text-custom"
            v-if="isAdmin"
            to="/managementpage"
            class="mr-4 d-lg-none"
          >
            <i class="fas fa-tools pl-3"></i>
            پنل مدیریت</b-nav-item
          >

          <b-nav-item
            active-class="text-custom"
            @click="logoutListener"
            href="#"
            class="mr-4 d-lg-none"
          >
            <i class="fas fa-sign-out-alt pl-3"></i> خروج</b-nav-item
          >
        </div>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <div class="d-none d-lg-block mr-auto">
        <b-navbar-nav
          v-if="this.$root.$data.user !== undefined"
          class="mr-auto ml-5"
        >
          <div class="row pl-4">
            <img class="avatar" :src="userAvatar" />
          </div>
          <b-nav-item-dropdown text="پروفایل من" left>
            <b-dropdown-item to="/dashboard">
              <i class="far fa-user pl-3"></i>
              پنل کاربری
            </b-dropdown-item>
            <hr />
            <b-dropdown-item to="/courses">
              <i class="fas fa-university pl-3"></i>
              دوره های آموزشی
            </b-dropdown-item>
            <hr />
            <b-dropdown-item v-if="isAdmin" to="/ticketoverview">
              <i class="fas fa-headset pl-3"></i>
              پشتیبانی
            </b-dropdown-item>

            <b-dropdown-item v-else to="/tickets">
              <i class="fas fa-headset pl-3"></i>
              پشتیبانی
            </b-dropdown-item>
            <hr />

            <b-dropdown-item v-if="isAdmin" to="/managementpage">
              <i class="fas fa-tools pl-3"></i>
              پنل مدیریت
            </b-dropdown-item>
            <hr />

            <b-dropdown-item @click.native="logoutListener" href="#">
              <i class="fas fa-sign-out-alt pl-3 pb-2"></i>
              خروج
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav v-else class="mr-auto">
          <b-button
            class="my-1 my-sm-0 ml-2 btn-login"
            type="submit"
            to="/login"
            >ورود کاربر</b-button
          >

          <b-button
            class="my-1 my-sm-0 ml-5 btn-reg"
            type="submit"
            to="/register"
          >
            ثبت نام</b-button
          >
        </b-navbar-nav>
      </div>
    </b-collapse>
  </b-navbar>
</template>

<script>
import backend from '../../backend';

export default {
  components: {},
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

  methods: {
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
};
</script>

<style scoped lang="scss">
.navbar {
  box-shadow: 0 5px 2px -2px rgba(0, 0, 0, 0.04) !important;
  background: white !important;
}

.navbar-light .navbar-toggler {
  border-color: rgba(0, 0, 0, 0) !important;
}

.navbar-nav {
  text-align: right;
}

.nav-link {
  padding-right: 2.5em !important;
  font-size: 1em !important;
}

.nav-link:hover {
  i {
    color: #ef476f !important;
  }
}

.avatar {
  width: 29px;
  height: 29px;
  border-radius: 50% !important;
  margin-top: 5px;
}

a {
  color: rgb(31, 31, 31) !important;
}

.text-custom {
  color: #ff0249 !important;
}

a:hover {
  color: #ef476f !important;
  text-decoration: none;
}

a:active {
  color: #ef476f !important;
}

i {
  color: rgb(54, 47, 47);
}

.btn {
  padding: 7px 19px;
  font-size: 0.9em;
  border-radius: 8px;
}

.btn-reg {
  background: #ed5786;
  border: 1px solid #ed5786;
  color: #fff !important;
}

.btn-reg:hover,
.btn-reg:focus {
  background: #fff !important;
  color: #ed5786 !important;
  border: 1px dashed #ed5786 !important;
}

.btn-login {
  background: #047afb !important;
  border: 1px dashed #047afb !important;
  color: #fff !important;
}

.btn-login:hover {
  background: transparent !important;
  color: #047afb !important;
}

.btn-secondary:not(:disabled):not(.disabled).active {
  background: #fff !important;
  border: 1px dashed #06d6a0 !important;
  color: #06d6a0 !important;
}

.btn-secondary:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(130, 138, 145, 0) !important;
  box-shadow: 0 0 0 0.2rem rgba(255, 255, 255, 0) !important;
}

hr {
  padding: 0 !important;
  margin: 0 !important;
  border-top: 1px solid rgba(0, 0, 0, 0.02);
}

@media (max-width: 1000px) {
  .navbar-nav {
    padding-right: 0 !important;
  }

  .nav-link {
    font-size: 1.15em !important;
    padding: 1.1em 1em !important;
  }

  .btn-login-mobile {
    .nav-link {
      padding: 0.7em !important;
    }
    background-color: #ed5786 !important;
    background: #ed5786 !important;
    border: 1px solid #ffe0ea !important;
    color: #fff !important;
    text-align: center;
    border-radius: 10px;
    padding: 13px 10px !important;
    a,
    .far {
      color: #fff !important;
    }
  }

  .btn-login-mobile:active {
    color: #fff !important;
  }
}
</style>
