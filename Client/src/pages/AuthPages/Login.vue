<template>
  <div class="auth-section d-flex align-items-center">
    <div class="container px-3">
      <card class="shadow">
        <form @submit="checkForm">
          <h1 class="auth-title text-primary py-4">ورود</h1>
          <div class="row">
            <div class="col-12">
              <base-input
                class="text-rtl pb-2"
                placeholder="پست الکترونیک"
                autocomplete="username"
                v-model="email"
                :required="true"
                :error="fieldErrors.email"
              ></base-input>
            </div>

            <div class="col-12">
              <base-input
                class="text-rtl"
                placeholder="کلمه عبور"
                type="password"
                autocomplete="current-password"
                v-model="password"
                :required="true"
                :error="fieldErrors.password"
              ></base-input>
            </div>
          </div>
          <div class="text-right pb-3">
            <base-checkbox
              class="pb-3"
              name="remember"
              :checked="remember"
              @input="
                () => {
                  remember = !remember;
                }
              "
            >
              <p>یادآوری ورود</p>
            </base-checkbox>
          </div>

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
          <div class="text-right pt-2" v-if="formErrors.length">
            <p class="pb-1 text-danger font-weight-bold">
              لطفا اشتباهات زیر را تصحیح کنید:
            </p>
            <ul>
              <li v-for="(error, key) in formErrors" :key="key">{{ error }}</li>
            </ul>
          </div>

          <div slot="footer">
            <base-button
              type="primary"
              nativeType="submit"
              class="animation-on-hover"
              size="lg"
              :loading="loading"
              block
              >ورود</base-button
            >
          </div>

          <a :href="googleAuthUrl">
            <base-button
              block
              type="primary"
              class="btn-simple animation-on-hover"
            >
              <i class="fab fa-google icon"></i>
            </base-button>
          </a>

          <!-- <h6 class="pull-left pt-3">
            <router-link class="footer-link" :to="registerUrl"
              >فرم عضویت</router-link
            >
          </h6> -->

          <h6 class="text-center my-4">
            <router-link to="/forgotpassword" class="footer-link"
              >رمز عبور را فراموش کرده ام</router-link
            >
          </h6>
        </form>
      </card>
    </div>
  </div>
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
  height: 90vh;
  background: linear-gradient(225deg, #d223e9f6, #5e62dff1);
}

.card {
  width: 400px !important;
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
