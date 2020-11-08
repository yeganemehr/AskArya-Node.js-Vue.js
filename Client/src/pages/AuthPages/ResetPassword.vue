<template>
  <div class="auth-section d-flex align-items-center">
    <div class="container">
      <card class="shadow">
        <form @submit="checkForm">
          <h1 class="auth-title text-primary py-4">بازیابی پسورد</h1>
          <div class="pt-4">
            <label class="pull-right">پست الکترونیک</label>
            <base-input
              placeholder="پست الکترونیک"
              autocomplete="username"
              v-model="email"
              :required="true"
              :error="fieldErrors.email"
            ></base-input>
          </div>
          <div class="pt-4">
            <label class="pull-right">کلمه عبور جدید</label>
            <base-input
              type="password"
              v-model="password"
              :required="true"
              :error="fieldErrors.password"
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

export default {
  data() {
    return {
      fieldErrors: {},
      email: null,
      password: null,
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
      if (!this.password) {
        this.fieldErrors.password = 'کلمه عبور جدید مورد نیاز است.';
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
        .post('password/reset/' + this.$route.params.token, {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          this.loading = false;
          if (response.data.status === 'error') {
            errorHandler(response);
            return;
          }
        })
        .catch((error) => {
          this.loading = false;
          errorHandler(error.response);
        });
      window.location.href = '/login';
      // this.$router.push(this.$route.query.backTo || 'login');
    },
  },
};
</script>

<style scoped>
.auth-section {
  height: 90vh !important;
  background: linear-gradient(225deg, #d223e9f6, #5e62dff1);
}

.card {
  width: 330px !important;
  margin-right: auto;
  margin-left: auto;
}

.auth-title {
  font-size: 2.4em;
  font-family: IranSansBold;
  text-align: center;
  margin: 0;
}
</style>
