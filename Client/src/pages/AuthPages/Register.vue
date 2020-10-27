<template>
  <div class="auth-section d-flex align-items-center">
    <!-- <div class="auth-section pt-4"> -->
    <div class="container">
      <card class="shadow">
        <form @submit="checkForm" id="register-form">
          <h1 class="auth-title mb-4">ثبت نام</h1>

          <div class="row">
            <div class="col-12 mb-3">
              <b-input
                class="text-rtl pb-1"
                placeholder="نام و نام خانوادگی"
                v-model="name"
                :required="true"
                :error="fieldErrors.name"
              ></b-input>
            </div>

            <div class="col-12 text-rtl mb-3">
              <b-input
                class="text-rtl pb-1"
                placeholder="پست الکترونیک"
                v-model="email"
                autocomplete="username"
                :required="true"
                :error="fieldErrors.email"
              ></b-input>
            </div>

            <div class="col-12 text-rtl">
              <b-input
                class="text-rtl"
                placeholder="کلمه عبور"
                autocomplete="new-password"
                type="password"
                v-model="password"
                :required="true"
                :error="fieldErrors.password"
              ></b-input>
            </div>
          </div>
          <div class="text-right">
            <b-form-checkbox
              v-model="terms"
              class="my-3"
              :class="{
                'has-danger': fieldErrors.terms !== undefined,
                'terms-checkbox': true,
              }"
            >
              <router-link class="tc" to="/terms">
                <i class="fas fa-info-circle pl-1"></i>
                شرایط را قبول دارم
              </router-link>
            </b-form-checkbox>
          </div>

          <!-- <div class="text-center pt-3">
            <a :href="googleAuthUrl">
              <h4 class="googleicon">
                <i class="fab fa-google icon"></i>
              </h4>
            </a>
            <p class="google-text">شما میتوانید بدون ثبت نام با اکانت گوگل وارد سایت شوید.</p>
          </div>-->

          <div class="d-flex justify-content-center container">
            <vue-recaptcha
              :sitekey="sitekey"
              @verify="verifyRecaptcha"
            ></vue-recaptcha>
          </div>
          <div class="text-right error-section pt-1" v-if="formErrors.length">
            <p class="error-title">لطفا اشتباهات زیر را تصحیح کنید:</p>
            <ul>
              <li class="error" v-for="(error, key) in formErrors" :key="key">
                {{ error }}
              </li>
            </ul>
          </div>

          <base-button
            nativeType="submit"
            :loading="loading"
            block
            class="mt-3 btn btn-reg"
            >ثبت نام</base-button
          >
          <b-button :href="googleAuthUrl" block class="btn-google">
            <i class="fab fa-google pl-2"></i>
            عضویت سریع با حساب گوگل
          </b-button>
        </form>
      </card>
    </div>
  </div>
</template>

<script>
import backend from '../../backend';
// import { BaseCheckbox } from 'src/components';
import Swal from 'sweetalert';

import config from '../../config';
import VueRecaptcha from 'vue-recaptcha';

export default {
  components: {
    // BaseCheckbox,
    VueRecaptcha,
  },
  data() {
    return {
      fieldErrors: {},
      name: null,
      email: null,
      password: null,
      formErrors: [],
      loading: false,
      terms: false,
      googleAuthUrl: '/auth/google',
      sitekey: config.recaptcha.sitekey,
      recaptcha: '',
    };
  },
  methods: {
    verifyRecaptcha(response) {
      this.recaptcha = response;
    },
    createRecaptcha() {
      const script = document.createElement('script');
      script.setAttribute('async', '');
      script.setAttribute('defer', '');
      script.id = 'recaptchaScript';
      script.src =
        'https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit';
      document.getElementsByTagName('head')[0].appendChild(script);
    },
    checkForm(e) {
      e.preventDefault();
      this.fieldErrors = {};
      this.formErrors = [];
      let haveError = false;

      if (!this.name) {
        this.fieldErrors.name = 'نام شما مورد نیاز است';
        haveError = true;
      }
      if (!this.email) {
        this.fieldErrors.email = 'ایمیل شما مورد نیاز است.';
        haveError = true;
      }
      if (!this.password) {
        this.fieldErrors.password = 'رمز عبور شما مورد نیاز است';
        haveError = true;
      }
      if (!this.terms) {
        this.fieldErrors.terms = true;
        this.formErrors.push('پذیرش شرایط ما لازم است!');
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
        .post('register', {
          name: this.name,
          email: this.email,
          password: this.password,
          'g-recaptcha-response': this.recaptcha,
        })
        .then((response) => {
          this.loading = false;
          if (response.data.status === 'error') {
            errorHandler(response);
            return;
          }
          if (
            typeof response.data.data === 'string' &&
            response.data.data ===
              'ایمیل حاوی لینک فعال سازی به ایمیل شما ارسال شد'
          ) {
            Swal({
              icon: 'success',
              title: `شما با موفقیت ثبت نام کردید!`,
              text:
                'ایمیل حاوی لینک فعال سازی به ایمیل شما ارسال شد. بعد از تایید آدرس ایمیل میتوانید از قسمت ورود با اطلاعاتی که وارد کردید وارد شوید.',
              className: 'text-center',
              button: 'بسیار خوب',
            });
          } else {
            this.$root.$data.user = response.data.user;
            Swal({
              icon: 'success',
              title: `شما با موفقیت ثبت نام کردید!`,
              className: 'text-center',
              text: '',
              button: 'بسیار خوب',
            });
            // this.$router.push(this.$route.query.backTo || '/');
            this.$router.push(this.$route.query.backTo || '/dashboard');
          }
        })
        .catch((error) => {
          this.loading = false;
          errorHandler(error.response);
        });
    },
  },
  mounted() {
    this.createRecaptcha();
    if (this.$route.query.hasOwnProperty('backTo')) {
      this.googleAuthUrl += `?backTo=${this.$route.query.backTo}`;
    }
  },
  destroyed() {
    document.getElementById('recaptchaScript').remove();
  },
};
</script>

<style lang="scss" scoped>
.auth-section {
  height: 92vh !important;
  background: linear-gradient(225deg, #d223e9f6, #5e62dff1);
}

.card {
  width: 330px !important;
  margin-right: auto;
  margin-left: auto;
  margin-bottom: 0;
  border-radius: 10px;
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

.auth-title {
  font-size: 2em;
  font-family: IranSansBold;
  text-align: center;
  color: #ed5786;
}

.btn {
  background: #ed5786;
  border: 1px dashed #ed5786 !important;
  border-radius: 8px;
  font-size: 0.9em;
  padding: 7px;
  color: #fff;
}

.btn:hover {
  background: #c40743;
}

.btn-google {
  background: #047afb;
  border: 1px dashed #047afb !important;
  color: #fff;

  .icon {
    font-size: 1em;
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

.google-text {
  font-size: 0.8rem;
  color: rgb(167, 167, 167) !important;
}

.tc {
  color: rgb(39, 39, 39);
  font-size: 0.9em !important;
}

.tc:hover {
  color: #555 !important;
  text-decoration: none;
}

.footer-link {
  font-size: 0.9rem !important;
  color: rgba(0, 0, 0, 0.6) !important;
  font-family: IranSans !important;
}

.footer-link:hover {
  color: #ed5786 !important;
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
