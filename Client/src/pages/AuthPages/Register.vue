<template>
  <div class="auth-section d-flex align-items-center">
    <div class="container card auth-box px-3">
      <form @submit="checkForm" id="register-form">
        <h1 class="auth-title text-primary py-4">ثبت نام</h1>
        <div class="row">
          <div class="col-12">
            <base-input
              class="text-rtl pb-1"
              placeholder="نام و نام خانوادگی"
              v-model="name"
              :required="true"
              :error="fieldErrors.name"
            ></base-input>
          </div>

          <div class="col-12 text-rtl">
            <base-input
              class="text-rtl pb-1"
              placeholder="پست الکترونیک"
              v-model="email"
              autocomplete="username"
              :required="true"
              :error="fieldErrors.email"
            ></base-input>
          </div>

          <div class="col-12 text-rtl">
            <base-input
              class="text-rtl"
              placeholder="کلمه عبور"
              autocomplete="new-password"
              type="password"
              v-model="password"
              :required="true"
              :error="fieldErrors.password"
            ></base-input>
          </div>
        </div>
        <div class="text-right pb-2">
          <base-checkbox
            v-model="terms"
            class="pb-3"
            :class="{
              'has-danger': fieldErrors.terms !== undefined,
              'terms-checkbox': true
            }"
          >
            <router-link class="tc" to="/terms">
              <!-- <i class="fas fa-info-circle pl-1"></i> -->
              شرایط را قبول دارم
            </router-link>
          </base-checkbox>
        </div>

        <!-- <div class="text-center pt-3">
            <a :href="googleAuthUrl">
              <h4 class="googleicon">
                <i class="fab fa-google icon"></i>
              </h4>
            </a>
            <p class="google-text">شما میتوانید بدون ثبت نام با اکانت گوگل وارد سایت شوید.</p>
          </div>-->

        <!-- <div class="d-flex justify-content-center py-3">
            <vue-recaptcha :sitekey="sitekey" @verify="verifyRecaptcha"></vue-recaptcha>
          </div>-->
        <div class="text-right pt-2" v-if="formErrors.length">
          <p class="pb-1 text-danger font-weight-bold">
            لطفا اشتباهات زیر را تصحیح کنید:
          </p>
          <ul>
            <li v-for="(error, key) in formErrors" :key="key">{{ error }}</li>
          </ul>
        </div>
        <base-button
          nativeType="submit"
          type="primary"
          :loading="loading"
          block
          size="lg"
          class="mt-4 animation-on-hover"
          >ثبت نام</base-button
        >
        <a :href="googleAuthUrl">
          <base-button
            block
            type="primary"
            class="btn-simple animation-on-hover mb-4"
          >
            <i class="fab fa-google icon"></i>
          </base-button>
        </a>
      </form>
    </div>
  </div>
</template>
<script>
// import VueRecaptcha from 'vue-recaptcha';
import backend from '../../backend';
// import config from '../../config';
import { BaseCheckbox } from 'src/components';
import Swal from 'sweetalert';

export default {
  components: {
    BaseCheckbox
    // VueRecaptcha
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
      // sitekey: config.recaptcha.sitekey,
      // recaptcha: '',
      googleAuthUrl: '/auth/google'
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
      const errorHandler = response => {
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
          password: this.password
          // 'g-recaptcha-response': this.recaptcha
        })
        .then(response => {
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
              button: 'بسیار خوب'
            });
          } else {
            this.$root.$data.user = response.data.user;
            Swal({
              icon: 'success',
              title: `شما با موفقیت ثبت نام کردید!`,
              className: 'text-center',
              text: '',
              button: 'بسیار خوب'
            });
            // this.$router.push(this.$route.query.backTo || '/');
            this.$router.push(this.$route.query.backTo || '/dashboard');
          }
        })
        .catch(error => {
          this.loading = false;
          errorHandler(error.response);
        });
    }
  },
  mounted() {
    // this.createRecaptcha();
    if (this.$route.query.hasOwnProperty('backTo')) {
      this.googleAuthUrl += `?backTo=${this.$route.query.backTo}`;
    }
  }
  // destroyed() {
  //   document.getElementById('recaptchaScript').remove();
  // },
};
</script>

<style lang="scss" scoped>
.auth-section {
  min-height: 85vh;
  background-color: #a961f4;
}

.auth-box {
  max-width: 350px;
  margin-right: auto;
  margin-left: auto;
}

.auth-title {
  font-size: 2.8em;
  font-family: IranSansBold;
  text-align: center;
}

.card-title {
  font-size: 2em !important;
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

.footer-link {
  font-size: 0.9rem !important;
  color: rgba(0, 0, 0, 0.6) !important;
  font-family: IranSans !important;
}

.footer-link:hover {
  color: #cc51e1 !important;
}


</style>
