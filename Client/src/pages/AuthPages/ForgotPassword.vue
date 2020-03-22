<template>
  <div class="auth-section d-flex align-items-center">
    <div class="container">
      <card class="shadow">
        <form @submit="checkForm">
          <h1 class="auth-title text-primary py-4">بازیابی پسورد</h1>
          <p class="subtitle text-center">
            با استفاده از این فرم میتوانید پسورد خود را بازیابی کنید.
          </p>
          <div class="pt-4">
            <label class="pull-right">پست الکترونیک</label>
            <base-input
              class="text-ltr"
              autocomplete="username"
              v-model="email"
              :required="true"
              :error="fieldErrors.email"
            ></base-input>
          </div>

          <div class="text-right" v-if="formErrors.length">
            <b>لطفا اشتباهات زیر را تصحیح کنید:</b>
            <ul>
              <li v-for="(error, key) in formErrors" :key="key">
                {{ error }}
              </li>
            </ul>
          </div>
          <div slot="footer">
            <base-button
              type="primary"
              nativeType="submit"
              class="mb-3"
              size="lg"
              :loading="loading"
              block
              >بازیابی پسورد</base-button
            >
          </div>
        </form>
      </card>
    </div>
  </div>
</template>
<script>
import backend from '../../backend';
import Swal from 'sweetalert';

export default {
  data() {
    return {
      fieldErrors: {},
      email: null,
      formErrors: [],
      loading: false,
    };
  },
  methods: {
    checkForm(e) {
      e.preventDefault();
      this.fieldErrors = {};
      this.formErrors = [];
      let haveError = false;

      if (!this.email) {
        this.fieldErrors.email = 'ایمیل مورد نیاز است';
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
        .post('password/email', {
          email: this.email,
        })
        .then((response) => {
          this.loading = false;
          if (response.data.status === 'error') {
            errorHandler(response);
            return;
          }
          {
            Swal({
              icon: 'success',
              title: `ایمیل حاوی لینک پسورد به ایمیل شما ارسال شد`,
              className: 'text-center',
              button: 'بسیار خوب',
            });
          }
          // alert("ایمیل حاوی لینک پسورد به ایمیل شما ارسال شد");
          // this.$router.push(this.$route.query.backTo || 'login');
        })
        .catch((error) => {
          this.loading = false;
          errorHandler(error.response);
        });
      window.location.href = '/login';
    },
  },
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
  font-size: 2.4em;
  font-family: IranSansBold;
  text-align: center;
  margin: 0;
}

.subtitle {
  color: #696969f6 !important;
}
</style>
