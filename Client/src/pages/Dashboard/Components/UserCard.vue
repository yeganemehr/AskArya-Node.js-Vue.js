<template>
  <section class="box">
    <card class="card-user">
      <h1 class="card-title pt-2">مشخصات کاربری</h1>
      <p class="card-text"></p>
      <div class="author text-center">
        <img class="avatar" :src="userAvatar" alt="Users Profile Image" />
        <h2 class="title">
          {{ user.name }}
          <br />
          <span class="emailText px-1">{{ user.email }}</span>
        </h2>

        <div v-if="!showForm">
          <p class="description pb-2">
            <i class="fas fa-check tick px-2"></i>
            {{ user.admin ? 'مدیر' : 'دانشجو' }} -
            <span class="description" :class="user.active ? 'tick' : 'cross'">{{
              user.active ? 'فعال' : 'غیر فعال'
            }}</span>
          </p>
          <p class="description pb-3">
            <i
              class="fas px-2"
              :class="isVIP ? 'fa-check tick' : 'fa-times cross'"
            ></i>
            {{ 'وضعیت عضویت ویژه' }} -
            <span class="description" :class="isVIP ? 'tick' : 'cross'">{{
              isVIP ? 'فعال' : 'غیر فعال'
            }}</span>
          </p>
          <div class="row d-flex justify-content-center pb-4">
            <div class="pt-3 px-2">
              <b-button
                @click="showForm = !showForm"
                native-type="submit"
                size="sm"
                class="btn-edit"
              >
                <i class="fas fa-pencil-alt pl-2"></i>
                {{ 'ویرایش مشخصات' }}
              </b-button>
            </div>
            <div class="pt-3">
              <b-button
                native-type="submit"
                to="/courses"
                size="sm"
                class="btn-vip"
              >
                <i class="fas fa-unlock pl-2"></i>
                {{ 'شارژ عضویت ویژه' }}
              </b-button>
            </div>
          </div>
        </div>
      </div>
      <!-- Edit Profile Section -->
      <div v-if="showForm" class="editUserForm">
        <form @submit.prevent="updateProfile">
          <div v-if="formErrors.length">
            <b>لطفا اشتباهات زیر را تصحیح کنید:</b>
            <ul>
              <li v-for="(error, key) in formErrors" :key="key">{{ error }}</li>
            </ul>
          </div>
          <div class="row">
            <div class="col-md-6">
              <label class="pull-right">
                <span class="red">*</span>نام و نام خانوادگی</label
              >
              <b-form-input
                type="text"
                placeholder="نام جدید خود را وارد کنید"
                v-model="name"
                :error="fieldErrors.name"
              ></b-form-input>
            </div>

            <div class="col-md-6">
              <label class="pull-right"
                ><span class="red">*</span>پسورد جدید</label
              >
              <b-form-input
                type="password"
                placeholder="پسورد جدید خود را وارد کنید"
                v-model="password"
                :error="fieldErrors.password"
              ></b-form-input>
            </div>

            <div class="col-md-12 text-ltr my-4">
              <label class="pull-right">
                <span class="red">(غیر قابل تغییر)</span> پست الکترونیک</label
              >
              <b-form-input
                disabled
                type="email"
                placeholder="info@ask-arya.com"
                v-model="email"
                :error="fieldErrors.email"
              ></b-form-input>
            </div>

            <div v-if="isAdmin" class="col-md-5 mb-3">
              <b-form-file
                placeholder="+ آپلود عکس"
                drop-placeholder="+ آپلود عکس"
                @change="onAvatarChange"
              />
            </div>
            <div class="col-12 mb-3">
              <base-button block native-type="submit" class="btn btn-info"
                >ثبت تغییرات</base-button
              >
            </div>
          </div>
        </form>
      </div>
    </card>
  </section>
</template>

<script>
import backend from '../../../backend';
// import { ImageUpload } from 'src/components/index';

export default {
  components: {
    // ImageUpload,
  },
  props: ['user'],
  data() {
    return {
      showForm: false,
      formErrors: [],
      loading: false,
      fieldErrors: {},
      name: this.$root.$data.user.name,
      email: this.$root.$data.user.email,
      lang: this.$root.$data.user.lang,
      avatar: null,
      password: '',
    };
  },
  computed: {
    isVIP() {
      return this.user.vipTime && new Date(this.user.vipTime) > new Date();
    },
    userAvatar() {
      return this.user.avatar || '/img/default-avatar.png';
    },
    isAdmin() {
      return this.$root.$data.user && this.$root.$data.user.admin;
    },
  },
  methods: {
    updateProfile() {
      this.fieldErrors = {};
      this.formErrors = [];
      let haveError = false;

      if (!this.email) {
        this.fieldErrors.email = 'ایمیل مورد نیاز';
        haveError = true;
      }
      if (!this.name) {
        this.fieldErrors.name = 'نام مورد نیاز';
        haveError = true;
      }
      if (this.password && this.password.length < 8) {
        this.fieldErrors.password = 'کلمه عبور نمیتواند کمتر از 8 حرف باشد';
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
      var formData = new FormData();
      formData.append('name', this.name);
      formData.append('email', this.email);
      formData.append('lang', this.lang);
      if (this.avatar) {
        formData.append('avatar', this.avatar, this.avatar.name);
      }
      if (this.password) {
        formData.append('password', this.password);
      }
      backend
        .put('profile', formData)
        .then((response) => {
          this.loading = false;
          if (response.data.status === 'error') {
            errorHandler(response);
            return;
          }
          this.$root.$data.user = response.data.user;
          this.$notify({
            type: 'success',
            message: `مشخصات شما با موفقیت به روز شده!`,
            icon: 'tim-icons icon-bell-55',
          });
          window.location.href = '/dashboard';
        })
        .catch((error) => {
          this.loading = false;
          errorHandler(error.response);
        });
    },
    onAvatarChange(file) {
      this.avatar = file;
    },
  },
};
</script>

<style lang="scss" scoped>
.box {
  height: 100% !important;
}

.card-user {
  height: 100% !important;
  background-color: #ffffff !important;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='576' height='576' viewBox='0 0 800 800'%3E%3Cg fill='none' stroke='%23fafafa' stroke-width='1'%3E%3Cpath d='M769 229L1037 260.9M927 880L731 737 520 660 309 538 40 599 295 764 126.5 879.5 40 599-197 493 102 382-31 229 126.5 79.5-69-63'/%3E%3Cpath d='M-31 229L237 261 390 382 603 493 308.5 537.5 101.5 381.5M370 905L295 764'/%3E%3Cpath d='M520 660L578 842 731 737 840 599 603 493 520 660 295 764 309 538 390 382 539 269 769 229 577.5 41.5 370 105 295 -36 126.5 79.5 237 261 102 382 40 599 -69 737 127 880'/%3E%3Cpath d='M520-140L578.5 42.5 731-63M603 493L539 269 237 261 370 105M902 382L539 269M390 382L102 382'/%3E%3Cpath d='M-222 42L126.5 79.5 370 105 539 269 577.5 41.5 927 80 769 229 902 382 603 493 731 737M295-36L577.5 41.5M578 842L295 764M40-201L127 80M102 382L-261 269'/%3E%3C/g%3E%3Cg fill='%23fafafa'%3E%3Ccircle cx='769' cy='229' r='5'/%3E%3Ccircle cx='539' cy='269' r='5'/%3E%3Ccircle cx='603' cy='493' r='5'/%3E%3Ccircle cx='731' cy='737' r='5'/%3E%3Ccircle cx='520' cy='660' r='5'/%3E%3Ccircle cx='309' cy='538' r='5'/%3E%3Ccircle cx='295' cy='764' r='5'/%3E%3Ccircle cx='40' cy='599' r='5'/%3E%3Ccircle cx='102' cy='382' r='5'/%3E%3Ccircle cx='127' cy='80' r='5'/%3E%3Ccircle cx='370' cy='105' r='5'/%3E%3Ccircle cx='578' cy='42' r='5'/%3E%3Ccircle cx='237' cy='261' r='5'/%3E%3Ccircle cx='390' cy='382' r='5'/%3E%3C/g%3E%3C/svg%3E") !important;
}

.card {
  border: 1px solid transparent;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.04), 0 10px 10px rgba(0, 0, 0, 0.04) !important;
}

.custom-width {
  width: 400px !important;
  margin-right: auto;
  margin-left: auto;
}

.card-user .avatar {
  width: 7em !important;
  height: 7em !important;
  border-radius: 50%;
  margin-bottom: 1em;
}

.btn-edit {
  background: #d62828;
  border-radius: 10px;
  border: #d62828;
}

.btn-edit:hover {
  background: #9c0d0d;
  border: #9c0d0d;
}

.btn-vip {
  background: #06d6a0;
  border-radius: 10px;
  border: #06d6a0;
  padding: 0 !important;
}

.btn-vip:hover {
  background: #00946c;
  border: #00946c;
}

.card-title {
  font-size: 1.1rem;
  font-family: IranSansBold;
  color: black !important;
  text-align: right;
}

.title {
  font-size: 2em !important;
  font-family: IranSansBold, sans-serif !important;
  letter-spacing: 0 !important;
}

.custom-file-label {
  text-align: left !important;
}

.btn {
  padding: 10px 15px !important;
}

.btn-info {
  background: #3a61b4 !important;
}

.white-content .full-page .description {
  color: #5a5a5a;
  font-size: 1em !important;
  margin: 0 !important;
}

.emailText {
  font-size: 1rem !important;
  font-family: Arial, Helvetica, sans-serif !important;
  font-weight: normal !important;
  letter-spacing: 0 !important;
  color: #757575;
}

.tick {
  color: #57c09a !important;
}
.cross,
.red {
  color: #ff0000 !important;
}

@media (max-width: 680px) {
  .box {
    height: 95% !important;
  }
}
</style>
