<template>
  <div class="widget-vip px-3 mb-5 text-center">
    <p class="vip-title pt-3">
      <i class="fas fa-unlock pl-2 icon w-100"></i>
      عضویت ویژه
    </p>
    <p class="vip-desc text-center pb-3">
      با خریداری این پنل کاربری شما میتوانید به ویدیوهای ویژه سایت به بطور کامل
      دسترسی داشته باشید.
    </p>

    <b-dropdown
      v-if="this.$root.$data.user !== undefined"
      block
      offset="15px"
      no-flip
      text="عضویت"
      class="custom-dropdown pb-3"
    >
      <b-dropdown-item class="dropdown-item" href="#" @click.prevent="payment">
        <i class="fa fa-star pl-2"></i>
        ماهانه -
        <span>39</span> هزار تومان
      </b-dropdown-item>
      <hr />
      <b-dropdown-item
        class="dropdown-item"
        href="#"
        @click.prevent="payment(4)"
      >
        <i class="fa fa-star pl-2"></i>
        ۴ ماهه
        <span>139</span> هزار تومان
      </b-dropdown-item>
      <hr />
      <b-dropdown-item
        class="dropdown-item"
        href="#"
        @click.prevent="payment(12)"
      >
        <i class="fa fa-star pl-2"></i>
        یکساله -
        <span>309</span> هزار تومان
      </b-dropdown-item>
    </b-dropdown>
  </div>
</template>

<script>
import { Select, Option } from 'element-ui';
import backend from '../../backend';
import moment from 'jalali-moment';
import Swal from 'sweetalert';

export default {
  components: {
    [Select.name]: Select,
    [Option.name]: Option,
  },
  data() {
    return {
      selects: {
        simple: '',
        vip: [
          { value: 'vip1', label: 'ماهانه - 39 هزار تومان' },
          { value: 'vip2', label: '۴ ماهه - 139 هزار تومان' },
          { value: 'vip3', label: 'یکساله - 309 هزار تومان' },
        ],
      },
    };
  },
  methods: {
    payment(plan = 1) {
      backend.post('/vip/payment', { plan }).then((response) => {
        if (response.data.status == 'success') {
          window.location.href = response.data.redirect;
        } else {
          Swal({
            title: 'خطا',
            text: `در حال حاضر امکان ارتباط با درگاه پرداخت وجود ندارد.`,
            icon: 'warning',
          });
        }
      });
    },
  },
  mounted() {
    if (
      this.$route.query.hasOwnProperty('Authority') &&
      this.$route.query.hasOwnProperty('Status')
    ) {
      const authority = this.$route.query.Authority;
      const status = this.$route.query.Status;
      if (status !== 'OK') {
        Swal({
          title: 'تراکنش ناموفق',
          text: `تراکنش شما با موفقیت پرداخت نشد. درصورتی که مبلغی از حساب بانکی شما کسر شده، توسط سیستم بانکی طی 48 ساعت آینده مرجوع خواهد شد.`,
          icon: 'warning',
          button: 'بسیار خوب',
        });
      } else {
        backend
          .post(`vip/payment/verification`, { status, authority })
          .then((response) => {
            this.$root.$data.user.vipTime = response.data.vipTime;
            Swal({
              title: 'تراکنش موفق',
              text: `اکانت شما تا ${moment(response.data.vipTime)
                .locale('fa')
                .format('YYYY/MM/DD')} تمدید شد.`,
              icon: 'success',
            });
          })
          .catch((response) => {
            Swal({
              title: 'تراکنش ناموفق',
              text: `تراکنش شما با موفقیت پرداخت نشد.\nدرصورتی که مبلغی از حساب بانکی شما کسر شده، توسط سیستم بانکی طی 48 ساعت آینده مرجوع خواهد شد.`,
              icon: 'warning',
            });
          });
        this.$router.push('/dashboard');
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.widget-vip {
  background-image: linear-gradient(270deg, #ad1deb, #6e72fc);
  border-radius: 15px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.17), 0 10px 10px rgba(0, 0, 0, 0.14);
}

.vip-title {
  font-size: 1.6em !important;
  color: white !important;
  text-align: center;
  font-family: IranSansBold !important;

  .icon {
    font-size: 1.5em;
    padding-bottom: 8px;
  }
}

.vip-desc {
  font-size: 0.95em;
  color: rgba(255, 255, 255, 0.9) !important;
}

/deep/ .dropdown-toggle {
  color: #fff !important;
  background-color: #ef476f !important;
  border: #ef476f !important;
  border-radius: 10px;
}

/deep/ .dropdown.show .dropdown-menu {
  border: 1px dashed #d8d8d8 !important;
}

/deep/ .dropdown-menu .dropdown-item {
  color: #181818;
  font-size: 1em;
  font-family: IranSans;
  padding: 10px 11px 7px 11px !important;

  span {
    color: #ef476f;
    font-family: IranSansBold !important;
    font-size: 1.2em;
  }

  i {
    color: #ff00802c;
  }
}

/deep/ .dropdown-menu .dropdown-item:first-child {
  padding-top: 3px !important;
}

hr {
  padding: 0 !important;
  margin: 0 !important;
  border-top: 1px dashed #d1d1d1 !important;
}

.select-danger.el-select .el-input input {
  background-color: #b42e5b !important;
  border-color: transparent !important;
}

@media (max-width: 880px) {
  .widget-vip {
    margin-right: 2.5em;
    margin-left: 2.5em;
  }
}

@media (max-width: 678px) {
  .dropdown-prices {
    text-align: center !important;
    padding-bottom: 15px;
  }
  .vip-title {
    font-size: 1.8em !important;
  }
}
</style>
