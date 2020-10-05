<template>
  <div class="widget-vip px-3 mb-5 text-center">
    <p class="vip-title pt-3">
      <i class="fas fa-unlock pl-2 icon w-100"></i>
      عضویت ویژه
    </p>
    <p class="vip-desc text-center py-3">
      با خریداری این پنل کاربری شما میتوانید به ویدیوهای ویژه سایت به بطور کامل
      دسترسی داشته باشید.
    </p>
    <div
      v-if="this.$root.$data.user !== undefined"
      class="dropdown-prices pb-3"
    >
      <base-dropdown
        title="عضویت"
        title-classes="btn btn-success animation-on-hover px-5"
      >
        <a class="dropdown-item" href="#" @click.prevent="payment">
          ماهانه -
          <span>39</span> هزار تومان
        </a>
        <a class="dropdown-item" href="#" @click.prevent="payment(4)">
          ۴ ماهه
          <span>139</span> هزار تومان
        </a>
        <a class="dropdown-item" href="#" @click.prevent="payment(12)">
          یکساله -
          <span>309</span> هزار تومان
        </a>
      </base-dropdown>
    </div>
  </div>
</template>

<script>
import { BaseDropdown } from 'src/components';
import { Select, Option } from 'element-ui';
import backend from '../../backend';
import moment from 'jalali-moment';
import Swal from 'sweetalert';

export default {
  components: {
    BaseDropdown,
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
  // background-image: linear-gradient(270deg, #e2aa3b, #fcf6ba);
  background-image: linear-gradient(270deg, #ad1deb, #6e72fc);
  border-radius: 15px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.17), 0 10px 10px rgba(0, 0, 0, 0.14);
}

.vip-title {
  font-size: 1.7em !important;
  color: white !important;
  text-align: center;
  font-family: IranSansBold !important;
  .icon {
    font-size: 1.7em;
    padding-bottom: 8px;
  }
}

.vip-desc {
  font-size: 1.1em;
  color: rgba(255, 255, 255, 0.9) !important;
}

.dropdown-menu .dropdown-item {
  color: #181818;
  font-size: 1em;
  font-family: IranSans;

  span {
    color: #260574;
    font-family: IranSansBold;
    font-size: 1.2em;
  }
}

.select-danger.el-select .el-input input {
  background-color: #b42e5b !important;
  border-color: transparent !important;
}

@media (max-width: 680px) {
  .dropdown-prices {
    text-align: center !important;
    padding-bottom: 15px;
  }
  .vip-title {
    font-size: 1.8em !important;
  }

  .vip-desc {
    font-size: 1.3em;
  }
}
</style>
