<template>
  <section class="auth-section d-flex align-items-center">
    <div class="container">
      <card class="shadow">
        <form @submit="checkForm">
          <h1 class="auth-title">ورود</h1>
          <div class="container text-center">
            <p class="registration-title">
              اگر در اسک آریا حساب ندارید، ثبت نام کنید:
            </p>
            <router-link to="/register">
              <b-button size="sm" class="btn-create">
                <i class="fas fa-user-plus pl-2"></i>
                ایجاد حساب کاربری
              </b-button>
            </router-link>
          </div>

          <hr />

          <div class="row">
            <div class="col-12 mb-3">
              <b-input
                class="text-rtl pb-2"
                placeholder="پست الکترونیک"
                autocomplete="username"
                v-model="email"
                :required="true"
                :error="fieldErrors.email"
              ></b-input>
            </div>

            <div class="col-12">
              <b-input
                class="text-rtl"
                placeholder="کلمه عبور"
                type="password"
                autocomplete="current-password"
                v-model="password"
                :required="true"
                :error="fieldErrors.password"
              ></b-input>
            </div>
          </div>
          <b-form-checkbox
            class="py-3 text-right label"
            name="remember"
            :checked="remember"
            @input="
              () => {
                remember = !remember;
              }
            "
          >
            یادآوری ورود
          </b-form-checkbox>

          <!-- <div class="text-center pb-2">
            <a :href="googleAuthUrl">
              <h4 class="googleicon">
                <i class="fab fa-google icon"></i>
              </h4>
            </a>
            <p class="google-text">شما میتوانید با اکانت گوگل وارد سایت شوید</p>
          </div>-->
          <!-- <div class="py-2 d-flex justify-content-center">
            <vue-recaptcha :sitekey="sitekey" @verify="verifyRecaptcha"></vue-recaptcha>
          </div>-->
          <div class="text-right error-section" v-if="formErrors.length">
            <p class="error-title">لطفا اشتباهات زیر را تصحیح کنید:</p>
            <ul>
              <li class="error" v-for="(error, key) in formErrors" :key="key">
                {{ error }}
              </li>
            </ul>
          </div>

          <base-button
            nativeType="submit"
            class="btn mt-3"
            :loading="loading"
            block
            >ورود</base-button
          >

          <b-button :href="googleAuthUrl" block class="btn-google mt-2">
            <i class="fab fa-google pl-3"></i>
            عضویت سریع با حساب گوگل
          </b-button>

          <!-- <h6 class="pull-left pt-3">
            <router-link class="footer-link" :to="registerUrl"
              >فرم عضویت</router-link
            >
          </h6> -->

          <h6 class="text-center mt-3">
            <router-link to="/contact" class="footer-link"
              >رمز عبور را فراموش کرده ام</router-link
            >
          </h6>
        </form>
      </card>
    </div>
  </section>
</template>

<script>
import backend from '../../backend';
import Swal from 'sweetalert';

// import VueRecaptcha from 'vue-recaptcha';
// import config from '../../config';

export default {
  // components: { VueRecaptcha },
  data() {
    return {
      fieldErrors: {},
      email: null,
      password: null,
      formErrors: [],
      loading: false,
      remember: false,
      googleAuthUrl: '/auth/google',
      registerUrl: '/register',
      // sitekey: config.recaptcha.sitekey,
      // recaptcha: ''
    };
  },
  methods: {
    // verifyRecaptcha(response) {
    //   this.recaptcha = response;
    // },
    // createRecaptcha() {
    //   const script = document.createElement('script');
    //   script.setAttribute('async', '');
    //   script.setAttribute('defer', '');
    //   script.id = 'recaptchaScript';
    //   script.src =
    //     'https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit';
    //   document.getElementsByTagName('head')[0].appendChild(script);
    // },
    checkForm(e) {
      e.preventDefault();
      this.fieldErrors = {};
      this.formErrors = [];
      let haveError = false;

      if (!this.email) {
        this.fieldErrors.email = 'ایمیل مورد نیاز است';
        haveError = true;
      }
      if (!this.password) {
        this.fieldErrors.password = 'رمز عبور مورد نیاز است';
        haveError = true;
      }
      if (haveError) {
        return;
      }
      const errorHandler = (response) => {
        if (response && response.data && response.data.status === 'error') {
          this.formErrors = Array.isArray(response.data.data)
            ? response.data.data
            : [response.data.data];
          return;
        }
      };
      this.loading = true;
      backend
        .post('login', {
          email: this.email,
          password: this.password,
          remember: this.remember ? 1 : 0,
          // 'g-recaptcha-response': this.recaptcha
        })
        .then((response) => {
          this.loading = false;
          if (response.data.status === 'error') {
            errorHandler(response);
            return;
          }
          this.$root.$data.user = response.data.data.user;
          this.$notify({
            type: 'success',
            message: `شما با موفقیت وارد شدید!`,
            icon: 'tim-icons icon-bell-55',
          });
          this.$router.push(this.$route.query.backTo || 'dashboard');
        })
        .catch((error) => {
          this.loading = false;
          errorHandler(error.response);
        });
    },
  },
  mounted() {
    // this.createRecaptcha();
    if (this.$route.query.hasOwnProperty('backTo')) {
      this.googleAuthUrl += `?backTo=${this.$route.query.backTo}`;
      this.registerUrl += `?backTo=${this.$route.query.backTo}`;
    }
    if (this.$route.query.hasOwnProperty('error') && this.$route.query.error) {
      if (
        [
          'متاسفانه چنین لینک فعال سازی وجود ندارد',
          'مهلت استفاده از این لینک به پایان رسیده است',
          'این لینک قبلا مورد استفاده قرار گرفته است',
        ].indexOf(this.$route.query.error) !== -1
      ) {
        Swal({
          icon: 'error',
          title: 'خطا',
          className: 'swal-text-center',
          text: this.$route.query.error,
        });
        this.$router.push({
          query: Object.assign({}, this.$route.query, { error }),
        });
      }
    }
  },
  // destroyed() {
  //   document.getElementById('recaptchaScript').remove();
  // },
};
</script>

<style lang="scss" scoped>
.auth-section {
  height: 9vh !important;
  background: linear-gradient(225deg, #d223e9f6, #5e62dff1);
}

.card {
  width: 330px !important;
  margin-right: auto;
  margin-left: auto;
  margin-bottom: 0;
  border-radius: 10px;
}

.auth-title {
  font-size: 2em;
  font-family: IranSansBold;
  text-align: center;
  color: #ed5786;
}

.registration-title {
  font-size: 0.85em;
  color: #616161;
  margin: 2em 0 0.5em 0;
}

.error-section {
  .error-title {
    font-family: IranSansBold !important;
    color: #c5003e;
    font-size: 0.9em;
    padding: 8px 0 0 0 !important;
  }

  .error {
    font-size: 0.8em;
    padding: 0 !important;
  }
}

.icon {
  font-size: 1.5rem;
  color: #d557d9 !important;
}

.icon:hover {
  color: #d957b2 !important;
}

.google-text {
  font-size: 0.8rem;
  color: rgb(167, 167, 167) !important;
}

.tc {
  color: rgb(49, 49, 49);
  font-size: 1.15em;
}

.btn {
  background: #ed5786;
  border: 1px dashed #ed5786;
  border-radius: 8px;
  font-size: 0.9em;
  padding: 7px;
  color: #fff;
}

.btn:hover {
  background: #c40743;
}

.btn-create {
  background: #06d6a0;
  border: #06d6a0 !important;
  padding: 4px 8px;
  font-size: 0.8em;
}

.btn-create:hover {
  background: #00aa7d;
  border: #00aa7d !important;
}

.btn-google {
  background: #047afb;
  border: 1px dashed #047afb !important;
  color: #fff;

  .icon {
    font-size: 1em !important;
    color: #fff !important;
    margin: 0 !important;
    padding: 0 !important;
  }
}

.btn-google:hover {
  background: #0063c5;
  color: #fff;
  text-decoration: none !important;

  a {
    text-decoration: none !important;
  }

  .icon {
    color: #0063c5 !important;
  }
}

.footer-link {
  font-size: 0.85rem !important;
  color: rgba(0, 0, 0, 0.5) !important;
  font-family: IranSans !important;
}

.label {
  font-size: 0.9em !important;
}

.footer-link:hover {
  color: #cc51e1 !important;
}

@media only screen and (min-width: 1500px) {
  .auth-section {
    min-height: 73vh;
  }
}

@media (max-width: 320px) {
  .auth-section {
    height: 100vh !important;
  }

  .registration-title {
    font-size: 0.9em !important;
  }
}
</style>
